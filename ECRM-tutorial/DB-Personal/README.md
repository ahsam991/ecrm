# ECRM Report Queries — README

## Overview

This repository/documentation contains production-grade PostgreSQL report queries for the `ecrm_prod` database.

Schemas used:

* `ecrm`
* `apsis_data`
* `settings`

Database engine:

* PostgreSQL (AWS RDS Read Replica)

Primary report categories:

1. Daily Contact Survey Report
2. Live Observation Report (Joint Call)
3. Call Checkback Report
4. Call Center Report
5. OTP Verification Analysis Report

Reference documentation source: fileciteturn14file0

---

# Database Connection

| Parameter   | Value                |
| ----------- | -------------------- |
| Database    | `ecrm_prod`          |
| Engine      | PostgreSQL           |
| Schema      | `ecrm`, `apsis_data` |
| Environment | AWS RDS Read Replica |

> Use only `SELECT` queries on the replica connection.

---

# Location Hierarchy

The location hierarchy is self-referential using `ecrm.locations.parent`.

| Type | Name               |
| ---- | ------------------ |
| 1    | Region             |
| 2    | Area               |
| 3    | Territory          |
| 5    | Distributors Point |
| 6    | Route              |
| 7    | Cluster            |
| 8    | Outlet             |

Standard hierarchy:

```sql
Outlet -> Cluster -> Route -> Point -> Territory -> Area -> Region
```

Standard join structure:

```sql
LEFT JOIN ecrm.locations l_outlet
       ON source.location_id = l_outlet.id
      AND l_outlet.type = 8

LEFT JOIN ecrm.locations l_cluster
       ON l_outlet.parent = l_cluster.id
      AND l_cluster.type = 7

LEFT JOIN ecrm.locations l_route
       ON l_cluster.parent = l_route.id
      AND l_route.type = 6

LEFT JOIN ecrm.locations l_point
       ON l_route.parent = l_point.id
      AND l_point.type = 5

LEFT JOIN ecrm.locations l_territory
       ON l_point.parent = l_territory.id
      AND l_territory.type = 3

LEFT JOIN ecrm.locations l_area
       ON l_territory.parent = l_area.id
      AND l_area.type = 2

LEFT JOIN ecrm.locations r
       ON l_area.parent = r.id
      AND r.type = 1
```

---

# 1. Daily Contact Survey Report

## Source Tables

| Table                           | Purpose               |
| ------------------------------- | --------------------- |
| `ecrm.contacts`                 | Primary contact table |
| `ecrm.contact_survey_data_maps` | Survey responses      |
| `ecrm.locations`                | Location hierarchy    |
| `ecrm.user_infos`               | BR full name          |
| `ecrm.campaigns`                | Campaign information  |

## Primary Join

```sql
JOIN ecrm.contact_survey_data_maps cs
     ON c.id = cs.contact_id
```

## Pivot Logic

```sql
MAX(
    CASE
        WHEN cs.question = 'question_key'
        THEN cs.answer
    END
)
```

## Important Notes

* One row = one contact
* Survey data is stored row-wise and pivoted using `CASE WHEN + MAX()`
* Location chain starts from `contacts.location_id`

---

# 2. Live Observation Report (Joint Call)

## Source Tables

| Table                               | Purpose                 |
| ----------------------------------- | ----------------------- |
| `ecrm.joint_calls`                  | Joint call records      |
| `ecrm.joint_calls_survey_data_maps` | Survey answers          |
| `ecrm.users`                        | Supervisor and BR users |
| `apsis_data.distributorspoint`      | Distributor reference   |
| `apsis_data.company`                | Company information     |

## User Mapping

| Role       | Source       |
| ---------- | ------------ |
| Supervisor | `jc.user_id` |
| BR / FF    | `jc.ff_id`   |

## Survey Join

```sql
LEFT JOIN ecrm.joint_calls_survey_data_maps jcs
       ON jc.id = jcs.joint_call_id
```

## apsis_data Join

```sql
LEFT JOIN apsis_data.distributorspoint dp
       ON l_point.name = dp.name

LEFT JOIN apsis_data.company co
       ON dp.dsid = co.id
```

## Important Notes

* `jc.user_id` = Supervisor
* `jc.ff_id` = BR / Field Force
* Cross-schema join uses point name matching
* Mixed-case survey key exists:

```sql
showing_Global_stories
```

---

# 3. Call Checkback Report

## Source Tables

| Table                                      | Purpose                       |
| ------------------------------------------ | ----------------------------- |
| `ecrm.supervisor_contacts`                 | Supervisor verification calls |
| `ecrm.supervisor_contact_survey_data_maps` | Survey answers                |
| `ecrm.contacts`                            | Original BR contact           |
| `apsis_data.distributorspoint`             | Distributor mapping           |

## Four-Key Composite Match

This report depends on a strict 4-column match.

```sql
LEFT JOIN ecrm.contacts c
       ON sc.contact = c.contact_no
      AND sc.br_id = c.user_id
      AND sc.campaign_id = c.campaign_id
      AND sc.contact_date = c.contact_date
```

## Important Notes

* If any one key fails, location becomes NULL
* Location data comes from `contacts`
* apsis_data join is ID-based here

```sql
LEFT JOIN apsis_data.distributorspoint dp
       ON po.source_id = dp.id
```

* Survey key differs from Joint Call report:

```sql
showing_global_series
```

---

# 4. Call Center Report

## Source Tables

| Table                                 | Purpose                |
| ------------------------------------- | ---------------------- |
| `ecrm.consumer_dialer_list`           | Primary dialer records |
| `ecrm.consumer_dialer_br_assignments` | BR assignments         |
| `ecrm.consumer_dialer_contacts`       | Contact activity       |
| `ecrm.consumer_dialer_survey_maps`    | Survey answers         |

## Core Join Flow

```sql
consumer_dialer_list
    -> consumer_dialer_br_assignments
    -> consumer_dialer_contacts
    -> consumer_dialer_survey_maps
```

## Assignment Join

```sql
LEFT JOIN ecrm.consumer_dialer_br_assignments cdba
       ON cdl.id = cdba.cdl_id
```

## Contact Join

```sql
LEFT JOIN ecrm.consumer_dialer_contacts cdc
       ON cdba.id = cdc.cdba_id
```

## Survey Join

```sql
LEFT JOIN ecrm.consumer_dialer_survey_maps cdsm
       ON cdc.id = cdsm.cdc_id
```

## Important Notes

* Uses a separate call-center workflow
* Survey questions are English-based
* Agent user comes from `cdba.br_id`
* Region is directly stored on `consumer_dialer_list.region_id`

---

# 5. OTP Verification Analysis

## Source Table

```sql
ecrm.otp_verifications
```

## Platform Types

| Platform | Response Format |
| -------- | --------------- |
| `ssl`    | JSON / Text     |
| `robi`   | XML             |

## SSL Success Detection

```sql
gateway_response ILIKE '%SUCCESSFULL%'
```

## Robi Success Detection

```sql
gateway_response ILIKE '%<StatusText>success</StatusText>%'
```

## Example Aggregation

```sql
SELECT
    contact_date,
    platform_type,
    COUNT(*) AS total
FROM ecrm.otp_verifications
GROUP BY
    contact_date,
    platform_type
```

---

# Query Standards

## Formatting Style

* Uppercase SQL keywords
* One logical section per block
* Section comments:

```sql
-- =========================================
-- SECTION NAME
-- =========================================
```

* One join per table
* Explicit alias naming
* Explicit location type filtering

---

# Common Report Patterns

## Pivot Pattern

```sql
MAX(
    CASE
        WHEN table.question = 'question_key'
        THEN table.answer
    END
)
```

## Date Filter Pattern

```sql
WHERE contact_date >= CURRENT_DATE - INTERVAL '30 days'
```

## Safe Percentage Pattern

```sql
100.0 * success_count / NULLIF(total_count, 0)
```

---

# Common Issues

## NULL Location

Usually caused by:

* Incorrect location type
* Failed parent hierarchy join
* Failed composite contact match
* Missing outlet location

## Duplicate Rows

Usually caused by:

* Survey table one-to-many expansion
* Missing GROUP BY
* Incorrect survey joins

## Missing Survey Answers

Check:

* Correct survey table
* Correct question key
* Exact case-sensitive question name

---

# Important Survey Table Mapping

| Report        | Survey Table                          |
| ------------- | ------------------------------------- |
| Daily Contact | `contact_survey_data_maps`            |
| Joint Call    | `joint_calls_survey_data_maps`        |
| Checkback     | `supervisor_contact_survey_data_maps` |
| Call Center   | `consumer_dialer_survey_maps`         |

---

# Documentation Reference

Full production documentation:

* ECRM Report Query Documentation PDF fileciteturn14file0

Prepared for:

* ECRM Reporting
* Analytics
* QA Validation
* PostgreSQL Report Development
