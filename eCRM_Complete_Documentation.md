# eCRM Complete Documentation

*BATB eCRM Platform — Business Overview & Database Schema Reference*

---

> <span style="color:red">⚠️ **সতর্কতা / Disclaimer:** The database structure documented here reflects a point-in-time snapshot and **may change in the future** as the application evolves (new columns, new tables, altered constraints, etc.). This document is **not automatically synced** with the live database — to get accurate, up-to-date information, this document must be **manually reviewed and updated** whenever the schema changes.</span>

---

## Table of Contents

- [Part I: Business Documentation](#part-i)
  - [eCRM Overview](#biz-overview)
  - [Why This Business Exists](#biz-why)
  - [How the Business is Run](#biz-how-run)
  - [Objectives](#biz-objectives)
  - [Data Collection Process](#biz-data-collection)
  - [Market & Product Analysis](#biz-market-analysis)
  - [Expected Benefits](#biz-benefits)
  - [Who Are the Users](#biz-users)
  - [BATB Products](#biz-batb-products)
  - [Joiner–Mover–Leaver (JML) Process](#biz-jml)
  - [Report Manager](#biz-report-manager)
  - [Location Hierarchy](#biz-location-hierarchy)
  - [PTR (Purchase Through Retail)](#biz-ptr)
  - [Brand Definitions and Data Mapping](#biz-brand-definitions)
  - [Types of Users](#biz-types-of-users)
  - [Agencies and Coverage](#biz-agencies)
  - [Data Storage and Analytics Architecture](#biz-architecture)
- [Part II: Database Documentation](#part-ii)
  - [Database Navigation & Table Summary](#db-nav)
  - [Module 1: User Accounts, Devices & Identity](#module-1)
  - [Module 2: Roles, Agencies & Access Control (RBAC)](#module-2)
  - [Module 3: JML & Bulk User-Assignment Workflow](#module-3)
  - [Module 4: Location & Geography Hierarchy](#module-4)
  - [Module 5: Campaigns, Targets & Field-Force Staffing](#module-5)
  - [Module 6: Products, Materials & SKU Catalogue](#module-6)
  - [Module 7: Field Contacts — Consumer & Retailer](#module-7)
  - [Module 8: Field Quality Assurance & Supervision](#module-8)
  - [Module 9: Dialer Workflows (Consumer & Retailer Outlet Call Centers)](#module-9)
  - [Module 10: Rewards, Assets & Coupons](#module-10)
  - [Module 11: Reporting & Dashboards](#module-11)
  - [Module 12: Communication & Notifications](#module-12)
  - [Module 13: Leave Management](#module-13)
  - [Module 14: AAI Audio Auditing Subsystem](#module-14)
- [Part III: Document Summary](#part-iii)
  - [What This Document Covers](#summary-covers)
  - [Recurring Architectural Patterns](#summary-patterns)
  - [Data-Quality & Schema Issues Flagged for Review](#summary-issues)
  - [Suggested Next Steps](#summary-next-steps)
  - [Document Totals](#summary-totals)

---

<a id="part-i"></a>

# Part I: Business Documentation

<a id="biz-overview"></a>

## eCRM Overview

**Owner:** BATB — British American Tobacco Bangladesh

**eCRM** is a centralized platform designed to manage consumer data, marketing activities, surveys, product insights, and campaign execution in a structured, data-driven way.

---

<a id="biz-why"></a>

## Why This Business Exists

- Smoking advertisements are **not allowed** in public media or billboards.
- Therefore, the company must **reach consumers directly** through person-to-person interactions.
- The only effective way to contact smokers is by **visiting outlets**.

---

<a id="biz-how-run"></a>

## How the Business is Run

- Multiple **campaigns** are designed with **survey questions**.
- **RAs (Retail Agents)** visit outlets and interact **one-on-one** with consumers who smoke.
- They ask questions to **collect data and preferences** from consumers.
- All consumers must be **18 years or older**.
- The data collected is used to **understand consumer behavior and preferences**.

---

<a id="biz-objectives"></a>

## Objectives

- Collect consumer and product-related data.
- Use surveys as a primary engagement and insight tool.
- Collect and analyze historical data.
- Perform competitor and internal product analysis.
- Design and execute requirement-based, campaign-wise marketing flows.

---

<a id="biz-data-collection"></a>

## Data Collection Process

- Campaign interactions (consumer details and products).
- Survey responses.
- Campaign-wise survey responses.

All collected data is stored in a centralized database for analysis and campaign planning.

---

<a id="biz-market-analysis"></a>

## Market & Product Analysis

### Competitor Analysis

The eCRM system supports competitor analysis by tracking:

- Competitor product offerings.
- Promotions and campaign trends.
- Market positioning.

This data helps in identifying gaps and opportunities in the market.

### Own Product Analysis

Internal product analysis focuses on:

- Sales trends.
- Customer engagement levels.
- Survey feedback.
- Product lifecycle stage.

### New Product Promotion

For new products, eCRM enables:

- Target audience identification.
- Survey-based validation before launch.
- Campaign testing (pilot campaigns).
- Performance tracking after launch.

---

<a id="biz-benefits"></a>

## Expected Benefits

- Better customer understanding.
- Reduced dependency on traditional advertising.
- Data-driven decision making.
- Improved product-market fit.
- Higher campaign effectiveness and ROI.

---

<a id="biz-users"></a>

## Who Are the Users

- **User:** The person who **uses the eCRM app** to conduct surveys or is involved in the system (e.g., RA, campaign manager).
- **Consumer:** The person whose **data is collected** through surveys.

---

<a id="biz-batb-products"></a>

## BATB Products

BATB works on 2 products:

- **Franchise** — Brand of BATB.
- **SOB** — Non-BATB product.

---

<a id="biz-jml"></a>

## Joiner–Mover–Leaver (JML) Process

The **Joiner–Mover–Leaver (JML)** process is implemented in the system to manage user lifecycle events in a **controlled, secure, and auditable** manner.

The JML process applies to **all management users and roles**, including but not limited to **AC, SUP, RA**, and other applicable user categories. It governs **user onboarding**, **role or access changes**, and **user deactivation or reactivation** through defined and approved workflows.

### JML Stages

1. **Joiner** — Creation and activation of a new user account.
2. **Mover** — Modification of an existing user's role or access permissions.
3. **Leaver** — Deactivation of a user account due to employee exit or role change.

### Governance and Approvals

- All JML requests are **initiated within the system**.
- Each request requires **approval according to the configured workflow**.
- All actions are **logged and auditable** to ensure compliance and security.

---

<a id="biz-report-manager"></a>

## Report Manager

### Daily Raw Report

- Provides raw campaign data generated on a daily basis.

### Call Check Back Report

- Records follow-up calls made to consumers to verify whether they were contacted, conducted as part of random quality checks.

### Live Observation Report

- Captures calls made to **RA** to ensure they are working properly and following defined processes.

### Surveys Campaign Raw Report

- In this campaign, no consumer information is taken — only questions and answers are captured, unlike the regular/Daily Raw Report campaign type.

### Call Center Report

- Used when a **second contact** with a consumer is required.
- This report supports running a **call campaign** to:
  - Make follow-up announcements, or
  - Inform the consumer about and deliver details related to a **gift or incentive**.
- Enables structured and trackable communication for repeat consumer outreach.

### Dynamic Report

- Allows creation of **dynamic reports** with configurable parameters.
- Supports selecting a **custom date range** to filter and view data.
- Enables flexible analysis without the need for fixed or predefined reports.

### 3 Most Important Tables for Reporting

- **Contacts**
- **Contact Survey Data Maps**
- **Locations**

---

<a id="biz-location-hierarchy"></a>

## Location Hierarchy

The system follows a structured location hierarchy to manage campaigns and contact points:

```
Region
  └─ Area
       └─ Territory
            └─ House
                 └─ Point
                      └─ Route
                           └─ Cluster
                                └─ Outlet   (Contact occurs here)
```

### Key Notes

- **Terminal point for contact:** **Outlet** — all consumer or retailer contacts occur at the Outlet level.
- **Campaign terminal point:**
  - Typically **Point**.
  - In some cases, **Cluster** is used as the campaign terminal point.
- **Outlet, Retailer, and POS** all refer to the same entity. **POS** stands for **Point of Sale**.
- Locations are assigned to a Cluster.

---

<a id="biz-ptr"></a>

## PTR (Purchase Through Retail)

**PTR refers to Purchase Through Retail and represents rewards or gifts provided to customers during a campaign period.**

- During a campaign, the company offers a gift or reward to the customer.
- In this context: **Gift = PTR = Reward.**
- In the database, PTR represents **giveable** items in the **Contacts** table.
- PTR details are stored in the **materials** table.
- PTR is also used to define Promotional Material Templates for campaign execution and tracking.

---

<a id="biz-brand-definitions"></a>

## Brand Definitions and Data Mapping

### Brand Types

- **Primary Brand** — The brand the customer usually smokes.
- **Secondary Brand** — The brand smoked when the primary brand is unavailable.
- **Previous Brand** — A brand the customer smoked in the past.

### Database Mapping

In the **contacts** table:

- **product** column represents the Primary Brand.
- **secondary_brand** column represents the Secondary Brand.
- **previous_brand** column represents the Previous Brand.
  - The `previous_brand` field was introduced in Q1 2025.
  - Data prior to this period will be `NULL`.

### Retrieving Brand Names

- Brand values in the **contacts** table are stored as IDs.
- To retrieve the brand names for Primary Brand, Secondary Brand, and Previous Brand, you must join the **contacts** table with the **sku_items** table **three separate times**, once for each brand reference.

---

<a id="biz-types-of-users"></a>

## Types of Users

| User Type | Role / Description | Access |
| --- | --- | --- |
| **DC** | District Coordinator | Web platform |
| **AC** | Area Coordinator | Web platform |
| **SUP** | Supervisor (RA's immediate boss; handles/escalates issues, assigns RAs) | Mobile App + Web platform |
| **RA / BR / FF** | Brand Representative / Field Force | Mobile App |

---

<a id="biz-agencies"></a>

## Agencies and Coverage

| Agency Code | Locations / Coverage |
| --- | --- |
| **Madly** | Considered as our own internal team |
| **ATMSL** | Sylhet, Dhaka South |
| **IMSL** | Dhaka North, Chittagong |
| **IMS** | Rajshahi, Barishal, Khulna |

---

<a id="biz-architecture"></a>

## Data Storage and Analytics Architecture

- Operational data is stored in **RDS / Transactional Databases**, which are relational database systems used for day-to-day transactions and core application functionality.
- For **dashboards**, **reporting**, and **faster analytical processing**, data is replicated or moved from the transactional database to **BigQuery**.
- **BigQuery is used for:**
  - High-performance queries.
  - Large-scale data analysis.
  - Dashboard and reporting workloads.
- **This separation ensures:**
  - **Optimized performance** for transactional operations.
  - **Scalable and efficient analytics** without impacting production systems.

---

<a id="part-ii"></a>

# Part II: Database Documentation

<a id="db-nav"></a>

## Database Navigation & Table Summary

The database documentation below is organized into **13 functional modules** covering every table and view in the ECRM schema. Each module groups tables that operate together in the same business workflow. Click a module name to jump to its full documentation.

### Overall Totals

| Type | Count |
| --- | --- |
| Tables | 131 |
| Views / Materialized Views | 5 |
| Reference Diagrams / Workflow Notes | 2 |
| **Total documented entries** | **138** |

### Module-Wise Breakdown

| # | Module | Tables | Views | Other | Total |
| --- | --- | --- | --- | --- | --- |
| 1 | [User Accounts, Devices & Identity](#module-1) | 13 | 0 | 0 | 13 |
| 2 | [Roles, Agencies & Access Control (RBAC)](#module-2) | 13 | 0 | 1 | 14 |
| 3 | [JML & Bulk User-Assignment Workflow](#module-3) | 6 | 0 | 0 | 6 |
| 4 | [Location & Geography Hierarchy](#module-4) | 8 | 4 | 0 | 12 |
| 5 | [Campaigns, Targets & Field-Force Staffing](#module-5) | 13 | 1 | 0 | 14 |
| 6 | [Products, Materials & SKU Catalogue](#module-6) | 9 | 0 | 1 | 10 |
| 7 | [Field Contacts — Consumer & Retailer](#module-7) | 12 | 0 | 0 | 12 |
| 8 | [Field Quality Assurance & Supervision](#module-8) | 13 | 0 | 0 | 13 |
| 9 | [Dialer Workflows (Consumer & Retailer Outlet Call Centers)](#module-9) | 8 | 0 | 0 | 8 |
| 10 | [Rewards, Assets & Coupons](#module-10) | 3 | 0 | 0 | 3 |
| 11 | [Reporting & Dashboards](#module-11) | 13 | 0 | 0 | 13 |
| 12 | [Communication & Notifications](#module-12) | 6 | 0 | 0 | 6 |
| 13 | [Leave Management](#module-13) | 2 | 0 | 0 | 2 |
| 14 | [AAI Audio Auditing Subsystem](#module-14) | 12 | 0 | 0 | 12 |
| | **Total** | **131** | **5** | **2** | **138** |

### Full Table Index (Alphabetical, with Module)

| Table / View | Type | Module |
| --- | --- | --- |
| `aai_audio_assign_maps` | Table | [Module 14: AAI Audio Auditing Subsystem](#module-14)|
| `aai_audios` | Table | [Module 14: AAI Audio Auditing Subsystem](#module-14)|
| `aai_auditor_project_maps` | Table | [Module 14: AAI Audio Auditing Subsystem](#module-14)|
| `aai_levels` | Table | [Module 14: AAI Audio Auditing Subsystem](#module-14)|
| `aai_project_level_maps` | Table | [Module 14: AAI Audio Auditing Subsystem](#module-14)|
| `aai_projects` | Table | [Module 14: AAI Audio Auditing Subsystem](#module-14)|
| `aai_projects_phrase_maps` | Table | [Module 14: AAI Audio Auditing Subsystem](#module-14)|
| `aai_question_options` | Table | [Module 14: AAI Audio Auditing Subsystem](#module-14)|
| `aai_questions` | Table | [Module 14: AAI Audio Auditing Subsystem](#module-14)|
| `aai_role_level_maps` | Table | [Module 14: AAI Audio Auditing Subsystem](#module-14)|
| `aai_verification_answer_maps` | Table | [Module 14: AAI Audio Auditing Subsystem](#module-14)|
| `aai_verified_audios` | Table | [Module 14: AAI Audio Auditing Subsystem](#module-14)|
| `agencies` | Table | [Module 2: Roles, Agencies & Access Control (RBAC)](#module-2)|
| `agency_resource_map` | Table | [Module 2: Roles, Agencies & Access Control (RBAC)](#module-2)|
| `all_locations_region_to_outlet` | View | [Module 4: Location & Geography Hierarchy](#module-4)|
| `all_old_location` | Table | [Module 4: Location & Geography Hierarchy](#module-4)|
| `app_version_control` | Table | [Module 1: User Accounts, Devices & Identity](#module-1)|
| `app_versions` | Table | [Module 1: User Accounts, Devices & Identity](#module-1)|
| `audios` | Table | [Module 12: Communication & Notifications](#module-12)|
| `audit_logs` | Table | [Module 1: User Accounts, Devices & Identity](#module-1)|
| `breakstation` | Table | [Module 4: Location & Geography Hierarchy](#module-4)|
| `breakstation_dp` | Table | [Module 4: Location & Geography Hierarchy](#module-4)|
| `bulk_assignment_ticket_status_maps` | Table | [Module 3: JML & Bulk User-Assignment Workflow](#module-3)|
| `bulk_assignment_tickets` | Table | [Module 3: JML & Bulk User-Assignment Workflow](#module-3)|
| `campaign_agency_maps` | Table | [Module 5: Campaigns, Targets & Field-Force Staffing](#module-5)|
| `campaign_callcheckback_maps` | Table | [Module 8: Field Quality Assurance & Supervision](#module-8)|
| `campaign_joint_call_maps` | Table | [Module 8: Field Quality Assurance & Supervision](#module-8)|
| `campaign_loc_ff_allocations` | Table | [Module 5: Campaigns, Targets & Field-Force Staffing](#module-5)|
| `campaign_location_maps` | Table | [Module 5: Campaigns, Targets & Field-Force Staffing](#module-5)|
| `campaign_target_config` | View | [Module 5: Campaigns, Targets & Field-Force Staffing](#module-5)|
| `campaign_target_loc_maps` | Table | [Module 5: Campaigns, Targets & Field-Force Staffing](#module-5)|
| `campaign_target_parameter_maps` | Table | [Module 5: Campaigns, Targets & Field-Force Staffing](#module-5)|
| `campaign_target_sku_maps` | Table | [Module 5: Campaigns, Targets & Field-Force Staffing](#module-5)|
| `campaign_targets` | Table | [Module 5: Campaigns, Targets & Field-Force Staffing](#module-5)|
| `campaign_theme_maps` | Table | [Module 5: Campaigns, Targets & Field-Force Staffing](#module-5)|
| `campaigns` | Table | [Module 5: Campaigns, Targets & Field-Force Staffing](#module-5)|
| `cdr_contacts` | Table | [Module 7: Field Contacts — Consumer & Retailer](#module-7)|
| `chats` | Table | [Module 12: Communication & Notifications](#module-12)|
| `consumer_dialer_br_assignments` | Table | [Module 9: Dialer Workflows (Consumer & Retailer Outlet Call Centers)](#module-9)|
| `consumer_dialer_contacts` | Table | [Module 9: Dialer Workflows (Consumer & Retailer Outlet Call Centers)](#module-9)|
| `consumer_dialer_list` | Table | [Module 9: Dialer Workflows (Consumer & Retailer Outlet Call Centers)](#module-9)|
| `consumer_dialer_survey_maps` | Table | [Module 9: Dialer Workflows (Consumer & Retailer Outlet Call Centers)](#module-9)|
| `consumers` | Table | [Module 7: Field Contacts — Consumer & Retailer](#module-7)|
| `contact_message_maps` | Table | [Module 12: Communication & Notifications](#module-12)|
| `contact_survey_data_maps` | Table | [Module 7: Field Contacts — Consumer & Retailer](#module-7)|
| `contacts` | Table | [Module 7: Field Contacts — Consumer & Retailer](#module-7)|
| `coupon_codes` | Table | [Module 10: Rewards, Assets & Coupons](#module-10)|
| `custom_queries` | Table | [Module 11: Reporting & Dashboards](#module-11)|
| `daily_checks` | Table | [Module 8: Field Quality Assurance & Supervision](#module-8)|
| `daily_material_acceptance_maps` | Table | [Module 6: Products, Materials & SKU Catalogue](#module-6)|
| `daily_material_maps` | Table | [Module 6: Products, Materials & SKU Catalogue](#module-6)|
| `dashboards` | Table | [Module 11: Reporting & Dashboards](#module-11)|
| `device_registers` | Table | [Module 1: User Accounts, Devices & Identity](#module-1)|
| `dp_region` | Table | [Module 4: Location & Geography Hierarchy](#module-4)|
| `dp_route_clusters` | View | [Module 4: Location & Geography Hierarchy](#module-4)|
| `dp_ter_area_region` | View | [Module 4: Location & Geography Hierarchy](#module-4)|
| `dynamic_report_agency_maps` | Table | [Module 11: Reporting & Dashboards](#module-11)|
| `dynamic_report_chart_maps` | Table | [Module 11: Reporting & Dashboards](#module-11)|
| `dynamic_report_parameter_maps` | Table | [Module 11: Reporting & Dashboards](#module-11)|
| `dynamic_report_role_maps` | Table | [Module 11: Reporting & Dashboards](#module-11)|
| `dynamic_reports` | Table | [Module 11: Reporting & Dashboards](#module-11)|
| `forget_password_otp_verify` | Table | [Module 1: User Accounts, Devices & Identity](#module-1)|
| `geo_location` | Table | [Module 4: Location & Geography Hierarchy](#module-4)|
| `hierarchy` | Table | [Module 4: Location & Geography Hierarchy](#module-4)|
| `iris_analyses` | Table | [Module 7: Field Contacts — Consumer & Retailer](#module-7)|
| `jml_tickets` | Table | [Module 3: JML & Bulk User-Assignment Workflow](#module-3)|
| `joint_calls` | Table | [Module 8: Field Quality Assurance & Supervision](#module-8)|
| `joint_calls_survey_data_maps` | Table | [Module 8: Field Quality Assurance & Supervision](#module-8)|
| `leave_date_maps` | Table | [Module 13: Leave Management](#module-13)|
| `leaves` | Table | [Module 13: Leave Management](#module-13)|
| `live_locations` | Table | [Module 8: Field Quality Assurance & Supervision](#module-8)|
| `locations` | Table | [Module 4: Location & Geography Hierarchy](#module-4)|
| `manpowers` | Table | [Module 5: Campaigns, Targets & Field-Force Staffing](#module-5)|
| `manual_notifications` | Table | [Module 12: Communication & Notifications](#module-12)|
| Material Distribution Workflow | Section | [Module 6: Products, Materials & SKU Catalogue](#module-6)|
| `material_campaign_maps` | Table | [Module 6: Products, Materials & SKU Catalogue](#module-6)|
| `materials` | Table | [Module 6: Products, Materials & SKU Catalogue](#module-6)|
| `messaging_report_date_maps` | Table | [Module 11: Reporting & Dashboards](#module-11)|
| `messaging_report_user_maps` | Table | [Module 11: Reporting & Dashboards](#module-11)|
| `messaging_reports` | Table | [Module 11: Reporting & Dashboards](#module-11)|
| `notifications` | Table | [Module 12: Communication & Notifications](#module-12)|
| `otp_verifications` | Table | [Module 1: User Accounts, Devices & Identity](#module-1)|
| `outlets` | Table | [Module 7: Field Contacts — Consumer & Retailer](#module-7)|
| `porichoy_infos` | Table | [Module 1: User Accounts, Devices & Identity](#module-1)|
| `preloaded_report_date_maps` | Table | [Module 11: Reporting & Dashboards](#module-11)|
| `preloaded_report_user_maps` | Table | [Module 11: Reporting & Dashboards](#module-11)|
| `preloaded_reports` | Table | [Module 11: Reporting & Dashboards](#module-11)|
| `product_categories` | Table | [Module 6: Products, Materials & SKU Catalogue](#module-6)|
| `products` | Table | [Module 6: Products, Materials & SKU Catalogue](#module-6)|
| `proximity_report` | Table | [Module 8: Field Quality Assurance & Supervision](#module-8)|
| `ptr_shifts` | Table | [Module 10: Rewards, Assets & Coupons](#module-10)|
| RBAC Relationship | Section | [Module 2: Roles, Agencies & Access Control (RBAC)](#module-2)|
| `region_area` | Table | [Module 4: Location & Geography Hierarchy](#module-4)|
| `region_dp` | View | [Module 4: Location & Geography Hierarchy](#module-4)|
| `repeat_schedule_maps` | Table | [Module 5: Campaigns, Targets & Field-Force Staffing](#module-5)|
| `retailer_contact_survey_data_map` | Table | [Module 7: Field Contacts — Consumer & Retailer](#module-7)|
| `retailer_contacts` | Table | [Module 7: Field Contacts — Consumer & Retailer](#module-7)|
| `retailer_outlet_dialer_br_assignments` | Table | [Module 9: Dialer Workflows (Consumer & Retailer Outlet Call Centers)](#module-9)|
| `retailer_outlet_dialer_contacts` | Table | [Module 9: Dialer Workflows (Consumer & Retailer Outlet Call Centers)](#module-9)|
| `retailer_outlet_dialer_list` | Table | [Module 9: Dialer Workflows (Consumer & Retailer Outlet Call Centers)](#module-9)|
| `retailer_outlet_dialer_survey_maps` | Table | [Module 9: Dialer Workflows (Consumer & Retailer Outlet Call Centers)](#module-9)|
| `role_agency_maps` | Table | [Module 2: Roles, Agencies & Access Control (RBAC)](#module-2)|
| `role_location_maps` | Table | [Module 2: Roles, Agencies & Access Control (RBAC)](#module-2)|
| `role_report_to_maps` | Table | [Module 2: Roles, Agencies & Access Control (RBAC)](#module-2)|
| `role_resource_maps` | Table | [Module 2: Roles, Agencies & Access Control (RBAC)](#module-2)|
| `role_tree_maps` | Table | [Module 2: Roles, Agencies & Access Control (RBAC)](#module-2)|
| `roles` | Table | [Module 2: Roles, Agencies & Access Control (RBAC)](#module-2)|
| `settings._cats` | Table | [Module 2: Roles, Agencies & Access Control (RBAC)](#module-2)|
| `settings.resources` | Table | [Module 2: Roles, Agencies & Access Control (RBAC)](#module-2)|
| `sku_item_price` | Table | [Module 6: Products, Materials & SKU Catalogue](#module-6)|
| `sku_items` | Table | [Module 6: Products, Materials & SKU Catalogue](#module-6)|
| `sku_product_maps` | Table | [Module 6: Products, Materials & SKU Catalogue](#module-6)|
| `sup_br_callcheckback_maps` | Table | [Module 8: Field Quality Assurance & Supervision](#module-8)|
| `sup_br_maps` | Table | [Module 8: Field Quality Assurance & Supervision](#module-8)|
| `sup_callcheckbacks` | Table | [Module 8: Field Quality Assurance & Supervision](#module-8)|
| `sup_geo_tags` | Table | [Module 8: Field Quality Assurance & Supervision](#module-8)|
| `supervisor_contact_survey_data_maps` | Table | [Module 8: Field Quality Assurance & Supervision](#module-8)|
| `supervisor_contacts` | Table | [Module 8: Field Quality Assurance & Supervision](#module-8)|
| `survey_data_maps` | Table | [Module 7: Field Contacts — Consumer & Retailer](#module-7)|
| `surveys` | Table | [Module 7: Field Contacts — Consumer & Retailer](#module-7)|
| `tap_analyses` | Table | [Module 7: Field Contacts — Consumer & Retailer](#module-7)|
| `thirdparties` | Table | [Module 1: User Accounts, Devices & Identity](#module-1)|
| `ticket_status_maps` | Table | [Module 3: JML & Bulk User-Assignment Workflow](#module-3)|
| `user_apk_maps` | Table | [Module 1: User Accounts, Devices & Identity](#module-1)|
| `user_approval_maps` | Table | [Module 2: Roles, Agencies & Access Control (RBAC)](#module-2)|
| `user_details` | Table | [Module 1: User Accounts, Devices & Identity](#module-1)|
| `user_device_maps` | Table | [Module 1: User Accounts, Devices & Identity](#module-1)|
| `user_infos` | Table | [Module 1: User Accounts, Devices & Identity](#module-1)|
| `user_sup_maps` | Table | [Module 2: Roles, Agencies & Access Control (RBAC)](#module-2)|
| `user_ticket_maps` | Table | [Module 3: JML & Bulk User-Assignment Workflow](#module-3)|
| `user_ticket_role_maps` | Table | [Module 3: JML & Bulk User-Assignment Workflow](#module-3)|
| `users` | Table | [Module 1: User Accounts, Devices & Identity](#module-1)|
| `users_agency_maps` | Table | [Module 2: Roles, Agencies & Access Control (RBAC)](#module-2)|
| `users_asset_maps` | Table | [Module 10: Rewards, Assets & Coupons](#module-10)|
| `users_camp_term_maps` | Table | [Module 5: Campaigns, Targets & Field-Force Staffing](#module-5)|
| `users_campaign_maps` | Table | [Module 5: Campaigns, Targets & Field-Force Staffing](#module-5)|
| `users_consumer_maps` | Table | [Module 7: Field Contacts — Consumer & Retailer](#module-7)|
| `whatsapp_lookups` | Table | [Module 12: Communication & Notifications](#module-12)|

---

<a id="module-1"></a>

## <span style="color:#1A5276">Module 1: User Accounts, Devices & Identity</span>

*13 item(s) in this module.*

#### <span style="color:#B9770E">Table: `users`</span>
##### Purpose

Central master table for all ECRM users, including Business Representatives (BRs), Supervisors, Area Managers, Administrators, and other system users. Because most operational modules reference this table, it is a core system entity. Campaign assignments, field activities, approvals, material distributions, authentication, and audit trails are all linked to user records.

**Primary Key:** `id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the user record. Auto-generated using the `users_id_seq1` sequence. Uniquely identifies each user within the ECRM system. |
| **username** | varchar(255) | ✓ | Unique username used to log in to the ECRM application. |
| **email** | varchar(255) | ✓ | User email address used for communication, notifications, and password recovery. |
| **user_type** | varchar(255) | ✓ | Defines the user's role or category within the application. Allowed values and business rules are managed by the application layer. |
| **password** | varchar(255) | ✓ | Hashed password used for authentication. Plain-text passwords are never stored. |
| **password_history** | varchar[] | ✓ | Stores previously used password hashes as a PostgreSQL array. Used to enforce password history and prevent recent-password reuse. |
| **pass_exp** | date | ✓ | Date when the current password expires. Used to enforce password-expiration policies. |
| **reset_stts** | boolean |  | Indicates whether the user is required or eligible to reset their password. Default: `true`. Behavior is controlled by the application. |
| **active_stts** | boolean |  | Indicates whether the user account is active. Default: `true`. Inactive users cannot access the system. |
| **is_deleted** | boolean |  | Soft-delete flag. `false` indicates an active record, while `true` indicates the record has been logically deleted without being physically removed. |
| **joining_date** | date |  | Date the user joined the organization or became active in the ECRM system. |
| **created_at** | timestamp |  | Timestamp when the record was created. Automatically populated at insertion time. Used for auditing and reporting. |
| **updated_at** | timestamp |  | Timestamp of the most recent modification. Automatically updated by the application whenever the record changes. |
| **is_locked** | boolean |  | Indicates whether the user account is locked, preventing authentication until unlocked. Default: `false`. |
| **password_reset_by** | integer (int4) |  | Identifier of the user who performed the most recent password reset. Relationships should be verified in application logic. |
| **password_reset_date** | timestamp |  | Timestamp of the most recent password reset. |
| **mfa_qr** | varchar |  | Stores the QR code (or related data) used during Multi-Factor Authentication (MFA) enrollment. |
| **mfa_enables** | boolean |  | Indicates whether MFA is enabled for the user account. Default: `false`. |
| **mfa_secret** | varchar |  | Secret key used to generate MFA one-time passwords. |
| **is_auditor** | boolean |  | Indicates whether the user has auditor privileges. Default: `false`. |
| **leaving_date** | date |  | Date the user left the organization or became inactive. |
| **last_login** | timestamp |  | Timestamp of the user's most recent successful login to the ECRM application. |
| **uid** | varchar |  | Application-specific or external user identifier used for integrations or identity mapping. Usage is defined by the application. |
| **original_user_id** | integer (int4) |  | Identifier of the original user associated with this record. Relationships and usage are managed by the application. |
| **one_id** | varchar |  | External or application-specific identifier. Meaning and validation are controlled by the application layer. |

---

##### Key Notes

- Core master table for user management across the ECRM platform.
- Authentication and authorization are primarily handled through `username`, `password`, `user_type`, and account-status fields.
- Password security is supported via hashing, password history, expiration policies, and optional MFA.
- Soft deletion uses `is_deleted` to preserve historical and audit data.
- Account lifecycle is tracked through fields such as `joining_date`, `leaving_date`, `active_stts`, `is_locked`, and `last_login`.
- Several columns (`user_type`, `password_reset_by`, `uid`, `original_user_id`, and `one_id`) have application-defined behavior and should be interpreted alongside business logic.

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| users_pkey1 | BTREE (PK) | id | Primary key lookups. |
| users_username_key1 | BTREE (UNIQUE) | username | Enforces uniqueness of `username` and speeds up login/authentication lookups. |
| idx_br_id | BTREE | id | Speeds up direct lookups by `id`. **Note:** functionally redundant with the primary key index (`users_pkey1`) — same single column, same purpose. Candidate for consolidation, similar to other duplicate-index patterns flagged elsewhere in this schema (e.g., `hierarchy_pkey`/`idx_hierarchy_id`, `locations_parent_idx`/`idx_locations_parent`). |
| idx_users_ff_list_core | BTREE | user_type, is_deleted, active_stts DESC, username, id | Composite covering index supporting the core "list field-force users" query pattern — filtering by user type and active/non-deleted status, sorted by active status descending, with username and id included for lookup/display without a table access. |

#### <span style="color:#B9770E">Table: `user_infos`</span>
##### Purpose

Stores extended personal and employment information for users in the ECRM system. It separates profile and HR-related details from authentication data, keeping the `users` table focused on login and access control. Each record corresponds to a single user.

**Primary Key:** `id`

**Foreign Key:** `user_id → users.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the user profile record. Auto-generated using the `user_infos_id_seq` sequence. Uniquely identifies each profile record. |
| **user_id (FK)** | integer (int4) | ✓ | References `users.id`. Associates the profile information with a user account in the `users` table. |
| **full_name** | varchar(255) | ✓ | Full legal name of the user as maintained in the organization's HR or ECRM system. |
| **designation** | varchar(255) |  | Job title or official designation of the user within the organization. |
| **personal_contact** | integer (int4) |  | Personal contact number of the user, typically used for emergency or personal communication. |
| **official_contact** | integer (int4) | ✓ | Official contact number assigned to the user for work-related communication. |
| **dob** | varchar(255) |  | Stores the user's date of birth. Although intended to represent a birth date, the column is currently defined as `varchar(255)` in the database. |
| **blood_group** | varchar(255) |  | User's blood group (e.g., A+, B−, O+). Maintained primarily for HR and emergency purposes. |
| **gender** | varchar(255) |  | Stores the user's gender. Allowed values and business rules are managed by the application layer. |
| **religion** | varchar(255) |  | Religion of the user, maintained for organizational or HR records where applicable. |
| **user_avatar** | varchar(255) |  | Stores the file path or URL of the user's profile image or avatar. |
| **created_at** | timestamp |  | Timestamp when the profile record was created. Automatically initialized with the current timestamp during record creation. |
| **updated_at** | timestamp |  | Timestamp of the most recent update to the profile record. Automatically maintained by the application. |
| **is_deleted** | boolean |  | Soft-delete flag. `false` indicates an active record, while `true` indicates the profile has been logically deleted without removing it from the database. |
| **employment_type** | integer (int4) |  | Indicates the user's employment category (e.g., permanent, contractual, temporary). The corresponding values are defined by the application. |

---

##### Key Notes

- This table stores **extended profile and HR-related information** for users, while authentication and account management data lives in the `users` table.
- Each profile record is linked to a user through the **`user_id`** foreign key.
- Soft deletion uses the **`is_deleted`** flag to preserve historical records.
- Audit fields are maintained through **`created_at`** and **`updated_at`**.
- The **`dob`** column is currently `varchar(255)` even though it represents a date. If feasible, changing it to `DATE` would improve integrity and validation.
- Fields such as **`gender`** and **`employment_type`** follow application-defined rules and should be interpreted accordingly.

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| user_infos_pkey | BTREE (PK) | id | Primary key lookups. |
| idx_user_infos_user_id | BTREE | user_id | Speeds up retrieving a user's profile/HR record by their `user_id` — the primary join pattern back to `users`. |

---

#### <span style="color:#B9770E">Table: `user_details`</span>
##### Purpose

Stores additional personal, residential, emergency contact, and identity verification information for users in the ECRM system. This table extends the user profile by maintaining HR-related and verification data separately from authentication information, allowing these records to be managed independently while supporting employee onboarding, compliance, and emergency contact management.

**Primary Key:** `id`

> **Note:** Although `user_id` references a user record, the database currently does **not** enforce a foreign key constraint on this column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the user detail record. Auto-generated using the `user_details_id_seq` sequence. Uniquely identifies each record. |
| **user_id** | integer (int4) | ✓ | Identifier of the associated user in the `users` table. Although this column represents the related user, no database-level foreign key constraint is currently defined. |
| **father_name** | varchar(255) |  | Full name of the user's father, maintained for HR records and identity verification purposes. |
| **mother_name** | varchar(255) |  | Full name of the user's mother, maintained for HR records and identity verification purposes. |
| **pre_address** | varchar(255) |  | Present or current residential address of the user. |
| **per_address** | varchar(255) |  | Permanent residential address of the user. |
| **emergency_contact_name** | varchar(255) |  | Full name of the person designated as the user's emergency contact. |
| **emergency_contact_num** | varchar(255) |  | Contact phone number of the designated emergency contact person. |
| **emergency_contact_relationship** | varchar(255) |  | Relationship between the emergency contact and the user, such as Father, Mother, Spouse, Sibling, or Guardian. |
| **emergency_contact_address** | varchar(255) |  | Residential address of the emergency contact person. |
| **created_at** | timestamp |  | Timestamp when the record was created. Automatically initialized with the current timestamp during record creation. |
| **updated_at** | timestamp |  | Timestamp of the most recent modification to the record. Automatically maintained by the application during updates. |
| **verification_type** | varchar |  | Type of identity document submitted for verification, such as National ID (NID), Passport, or Driving License. |
| **verification_no** | varchar |  | Identification number of the submitted verification document. |
| **verification_attachment_link** | text[] |  | Stores one or more file paths or URLs of uploaded verification documents as a PostgreSQL text array. Multiple files (e.g., front and back images of an NID card) can be associated with a single verification record. |
| **is_deleted** | boolean |  | Soft-delete flag. `false` indicates an active record, while `true` indicates the record has been logically deleted without being physically removed from the database. |

---

##### Key Notes

- This table extends the **`users`** table by storing **personal information, residential addresses, emergency contact details, and identity verification documents**.
- The **`user_id`** column identifies the corresponding user account, but the database does **not** currently enforce a foreign key relationship.
- Identity verification supports multiple document attachments through the **`verification_attachment_link`** column, which is implemented as a PostgreSQL **text array (`text[]`)**. This allows multiple files, such as the front and back images of a National ID card, to be stored for a single verification record.
- Soft deletion is implemented using the **`is_deleted`** flag, allowing records to be retained for historical and audit purposes.
- Audit information is maintained through the **`created_at`** and **`updated_at`** timestamps, enabling change tracking and reporting.
- The address fields (**`pre_address`** and **`per_address`**) are currently defined as `varchar(255)` in the database schema, limiting the maximum stored address length to 255 characters.

---

**Indexes**

| Index Name | Type | Unique | Column(s) | Purpose |
| --- | --- | --- | --- | --- |
| `user_details_pkey` | BTREE | Yes | `id` | Primary Key index. Ensures uniqueness of each user detail record and optimizes queries filtering or joining on `id`. |

#### <span style="color:#B9770E">Table: `device_registers`</span>
##### Purpose

Stores information about devices that access the ECRM system. Each record represents a device identified by a unique device identifier and contains device information, authorization status, blocking status, and login history. This table serves as the central registry for device management, enabling the application to identify, monitor, authorize, or block devices attempting to access the system.

**Primary Key:** `id`

> **Note:** Although `device_id` is referenced by other tables, the database does **not** currently enforce a foreign key constraint on this column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the device record. Auto-generated using the `device_registers_id_seq` sequence. Uniquely identifies each registered device record. |
| **device_id** | varchar(255) |  | Unique identifier of the device. Used by the application to recognize and distinguish individual devices when users attempt to access the ECRM system. |
| **model_name** | varchar(255) |  | Model name or device model reported by the client device (e.g., *Android SDK built for x86*, *Galaxy Tab S9*, *iPad Pro*). |
| **last_login** | timestamp |  | Timestamp of the most recent successful login performed from this device. |
| **brand** | varchar(255) |  | Device manufacturer or platform (e.g., Android, Samsung, Apple, Xiaomi). The exact value depends on the information reported by the client application. |
| **authorize** | boolean |  | Indicates whether the device has been approved for system access. The application uses this flag as part of its device authorization process. |
| **block** | boolean |  | Indicates whether the device has been blocked from accessing the system. A blocked device may be denied access regardless of its authorization status. |
| **created_at** | timestamp | ✓ | Timestamp when the device record was created in the system. |
| **updated_at** | timestamp | ✓ | Timestamp of the most recent update to the device record. |

---

##### Key Notes

- This table serves as the **master registry of devices** used to access the ECRM system.
- Devices may include **tablets, smartphones, emulators, or other supported client devices**.
- Each device is uniquely identified by its **`device_id`**.
- Device access is managed through the **`authorize`** and **`block`** flags according to the application's security rules.
- Login history for each device is maintained using the **`last_login`** timestamp.
- Although **`device_id`** is referenced by other tables, no database-level foreign key constraint currently exists.

---

##### Indexes

| Index Name | Type | Unique | Column(s) | Purpose |
| --- | --- | --- | --- | --- |
| `device_registers_pkey` | BTREE | Yes | `id` | Primary Key index. Ensures each device registration record has a unique identifier and provides fast lookups, joins, updates, and deletes using the `id` column. Automatically created when the primary key constraint is defined. |

#### <span style="color:#B9770E">Table: `user_device_maps`</span>
##### Purpose

Maps users to the devices they use to access the ECRM system. This table records the association between user accounts and device identifiers, allowing the application to track device usage and enforce device-level access control policies. Historical mappings are retained to support auditing and device replacement scenarios.

**Primary Key:** `id`

> **Note:** Although `user_id` and `device_id` logically reference the `users` and `device_registers` tables, the database currently does **not** enforce foreign key constraints on these columns.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the user-device mapping record. Auto-generated using the `user_device_maps_id_seq` sequence. |
| **user_id** | integer (int4) | ✓ | Identifier of the associated user account. Represents the related user in the `users` table, although no database-level foreign key constraint exists. |
| **device_id** | varchar(255) | ✓ | Unique identifier of the device associated with the user. Typically corresponds to the `device_id` stored in the `device_registers` table. |
| **is_deleted** | boolean |  | Soft-delete flag. `false` indicates an active mapping, while `true` indicates the mapping has been logically removed but retained for historical and audit purposes. |
| **created_at** | timestamp |  | Timestamp when the user-device association was created. Automatically initialized during record creation. |
| **updated_at** | timestamp |  | Timestamp of the most recent modification to the mapping record. Automatically maintained by the application. |

---

##### Key Notes

- This table records the association between **users** and the **devices** they use to access the ECRM system.
- Devices referenced in this table typically exist in the **`device_registers`** table, although this relationship is maintained by the application rather than enforced by the database.
- A user may have **multiple device mapping records** over time due to device replacement, re-registration, or use of different devices.
- A device mapped to a user is **not necessarily authorized** to access the system. Authorization and blocking decisions are determined using the corresponding record in the **`device_registers`** table.
- Soft deletion is implemented using the **`is_deleted`** flag to preserve historical mapping records for auditing and reporting.
- Together with the **`device_registers`** table, this table supports device tracking, security monitoring, and application-level access control.

---

##### Indexes

| Index Name | Type | Unique | Column(s) | Purpose |
| --- | --- | --- | --- | --- |
| `user_device_maps_pkey` | BTREE | Yes | `id` | Primary Key index. Ensures each user-device mapping record has a unique identifier and optimizes lookups, joins, updates, and deletes using the `id` column. Automatically created when the primary key constraint is defined. |

#### <span style="color:#B9770E">Table: `user_apk_maps`</span>
##### Purpose

Tracks which specific app build/version (`app_versions`) has been installed on which user's device, supporting app-version compliance tracking and device-level troubleshooting.

**Primary Key:** `id`

**Foreign Keys:** `user_id → users.id`, `apk_id → app_versions.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the install record. Auto-generated using the `user_apk_maps_id_seq` sequence. |
| **user_id (FK)** | integer (int4) | ✓ | References `users.id`. The user whose device this install record belongs to. |
| **device_id** | varchar(255) |  | Device identifier of the physical device the app was installed on (e.g., `2315f6613a7f8180`), matching the `device_id` field seen in `contacts.device_info`/`daily_checks.additional_info`. |
| **apk_id (FK)** | integer (int4) | ✓ | References `app_versions.id`. The specific app build/version installed. |
| **install_time** | timestamp | ✓ | Timestamp the app version was installed on the device. `NOT NULL`, defaults to `CURRENT_TIMESTAMP`. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |

---

##### Key Notes / Business Rules

- This table lets the application confirm **exactly which app version is installed on which user's device**, supporting forced-update enforcement (working alongside `app_versions.force`/`is_current`) and troubleshooting device-specific issues.
- **`device_id`** ties this record to the same device identifier convention used in `contacts.device_info` and `daily_checks.additional_info`, allowing cross-referencing of install history against a user's field activity on that same device.
- A user could have multiple rows over time if they've installed different app versions or used multiple devices — this table appears to be an install **history** log rather than a single current-state record per user.
- Soft deletion is handled using **`is_deleted`**.
- During reporting/compliance checks, the application generally retrieves records where:
    - `is_deleted = false`
    - `user_id` matches the target user, typically ordered by `install_time` to find the most recent install

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| user_apk_maps_pkey | BTREE (PK) | id | Primary key lookups. |
| idx_user_apk_maps_user_id | BTREE | user_id | Speeds up lookups of install history for a given user. |

---

##### Example Record

| id | user_id | device_id | apk_id | install_time | is_deleted |
| --- | --- | --- | --- | --- | --- |
| 4 | 23589 | 2315f6613a7f8180 | 1 | 2023-12-24 12:43:21.926826 | false |

---

---

#### <span style="color:#B9770E">Table: `app_versions`</span>
##### Purpose

Registry of mobile application build/release versions available for the ECRM field app, tracking which version is current, whether an update is mandatory (`force`), the APK download location, and who uploaded it. Powers the app's version-check/force-update mechanism for field devices.

**Primary Key:** `id`

**Foreign Key:** `uploaded_by → users.id` (implied; not shown as enforced in the structure provided)

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the app version record. Auto-generated using the `app_versions_id_seq` sequence. |
| **name** | varchar(255) | ✓ | Display name of the release (e.g., "eCRM Phase 3", "eCRM3 prod"). |
| **version** | varchar(255) | ✓ | Version code/string (e.g., "2013", "1003"). Enforced unique across all app versions (see index below). |
| **platform** | integer (int4) |  | Code identifying the target platform (e.g., Android/iOS). Allowed values managed by the application layer. |
| **force** | boolean (bool) | ✓ | Whether devices running an older version must update before continuing to use the app (a mandatory/forced update). `NOT NULL`, default `false`. |
| **url** | varchar(255) | ✓ | Download location of the APK file (e.g., `Production/ecrm/Apk/....apk`). |
| **uploaded_by** | integer (int4) | ✓ | Identifier of the user who uploaded this app version. No enforced FK to `users.id` shown. |
| **is_current** | boolean (bool) | ✓ | Flags whether this is the currently active/recommended version. `NOT NULL`, default `true`. **Note:** both sample records show `is_current = false`, meaning as of the data snapshot neither listed version was marked current — worth confirming a more recent version exists elsewhere in the table. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **md5** | varchar |  | MD5 checksum of the APK file, used to verify download/upload integrity. Nullable — not populated in sample data. |

---

##### Key Notes / Business Rules

- This table drives the app's **version-check and forced-update logic** — when a field device checks in, the application compares its installed `version` against the row where `is_current = true`, and if `force = true` on a newer version, the device is required to update before proceeding.
- **`is_current`** should ideally be true for exactly one active row per `platform` at any time — multiple `true` rows for the same platform would create ambiguity in which version the app should treat as canonical.
- **`version`** is enforced unique across the whole table (not just per-platform), so version strings must be globally distinct even across different platforms.
- Soft deletion is handled using **`is_deleted`**, separate from `is_current` (which tracks the "latest recommended" state rather than record validity).
- During reporting/version-check queries, the application generally retrieves records where:
    - `is_deleted = false`
    - `is_current = true`, filtered by the requesting device's `platform`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| app_versions_pkey | BTREE (PK) | id | Primary key lookups. |
| app_versions_version_key | BTREE (UNIQUE) | version | Enforces global uniqueness of version strings. |
| idx_app_versions_uploaded_by | BTREE | uploaded_by | Speeds up lookups of all versions uploaded by a given user. |

---

##### Example Records

| id | name | version | platform | force | is_current | is_deleted |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | eCRM Phase 3 | 2013 | 116 | false | false | false |
| 3 | eCRM3 prod | 1003 | 116 | false | false | false |

---

---

#### <span style="color:#B9770E">Table: `app_version_control`</span>
##### Purpose

A minimal table recording the **launch date of each numbered application version release** — simpler and more general than `app_versions` (which tracks platform-specific APK builds, force-update flags, and upload metadata), this table appears to log a higher-level version-release timeline.

**Primary Key:** `id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the version-control record. Auto-generated using the `app_version_control_id_seq` sequence. |
| **version** | integer (int4) | ✓ | The numeric version identifier of this release (e.g., `200`). |
| **launch_date** | timestamptz | ✓ | Timestamp the version was officially launched/released. Timezone-aware. |

---

##### Key Notes / Business Rules

- This table appears to be a **simple version-release timeline log**, distinct from `app_versions` (which handles platform-specific APK distribution, forced updates, and current-version flagging for field devices).
- The exact relationship between this table's `version` and `app_versions.version` (e.g., whether they share the same numbering scheme, or this tracks a broader application/backend version separate from the mobile APK) should be confirmed with the application team, since the structure alone doesn't make the distinction explicit.
- No soft-delete, update timestamp, or additional metadata columns exist — this is a minimal, append-only release log.
- During reporting, the application generally retrieves records where:
    - `version` matches the target release, or the most recent row by `launch_date` is used to determine the latest known release

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| app_version_control_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Record

| id | version | launch_date |
| --- | --- | --- |
| 1 | 200 | 2023-07-04 06:05:28.348034+00 |

#### <span style="color:#B9770E">Table: `thirdparties`</span>
##### Purpose

Registry of external third-party systems/integration partners authorized to programmatically access or write campaign data into ECRM (e.g., an outsourced vendor that checks and inserts campaign data via API). Stores each third party's authentication credentials and links to shared API documentation.

**Primary Key:** `id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the third-party record. Auto-generated using the `thirdparties_id_seq` sequence. |
| **username** | varchar |  | Login/API username assigned to this third party for authenticating against ECRM. |
| **password** | varchar |  | Hashed credential (bcrypt-style hash shown in sample data) used for authenticating this third party's API access — plain-text passwords are not stored, consistent with the hashing approach used in `users.password`. |
| **description** | varchar |  | Free-text description of who this third party is and what they do (e.g., "This a third party called softograph who checks and insert campaign data"). |
| **api_documentation_provided** | varchar[] (`_varchar`) |  | Array of links to API documentation **provided to** this third party (e.g., a Postman collection link), so they know how to integrate with ECRM's API. |
| **api_documentation_recieved** | varchar[] (`_varchar`) |  | Array of links to API documentation **received from** this third party, presumably for ECRM's developers to integrate with the third party's own systems. Nullable — not every third-party relationship is bidirectional. |
| **is_active** | boolean (bool) | ✓ | Whether this third party's access is currently active/enabled. `NOT NULL`, default `true`. |

---

##### Key Notes / Business Rules

- This table is the **registry of external API integration partners** — vendors or systems given credentialed access to insert/check campaign data programmatically, rather than through the standard ECRM user interface.
- **`api_documentation_provided`** vs **`api_documentation_recieved`** distinguishes the **direction** of documentation exchange: what ECRM has shared with the partner to help them integrate, versus what the partner has shared with ECRM for the reverse integration.
- No `is_deleted` column exists — access is managed via **`is_active`** rather than a soft-delete flag, treating deactivation (not removal) as the standard lifecycle action for a third-party integration.
- Credentials (`password`) are hashed, consistent with the security approach applied to regular ECRM users.
- During reporting/access-control checks, the application generally retrieves records where:
    - `is_active = true` when authenticating an incoming third-party API request

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| thirdparties_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Record

| id | username | description | is_active |
| --- | --- | --- | --- |
| 1 | Softograph | This a third party called softograph who checks and insert campaign data | true |

---

---

#### <span style="color:#B9770E">Table: `forget_password_otp_verify`</span>
##### Purpose

Records OTP verification attempts specifically for the **forgot-password** flow — a user requesting a password reset receives an OTP, and this table tracks its code, expiry, and verification status, separate from the general campaign-consumer OTP flow in `otp_verifications`.

**Primary Key:** `id`

> **Note:** Although `user_id` appears to reference a user record, the database does **not** currently enforce a foreign key constraint on this column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the OTP verification record. Auto-generated using the `forget_password_otp_verify_id_seq` sequence. |
| **user_id** | integer (int4) | ✓ | Identifies the user requesting the password reset. No enforced FK to `users.id`. |
| **method_type** | varchar(255) | ✓ | The channel/method used to deliver the OTP (e.g., SMS, email). Allowed values managed by the application layer. |
| **otp_code** | integer (int4) | ✓ | The one-time-password value sent to the user. |
| **otp_expire** | timestamptz | ✓ | Timestamp at which this OTP expires and can no longer be used to verify. Timezone-aware. |
| **is_verified** | boolean (bool) | ✓ | Whether the user has successfully submitted and verified this OTP. `NOT NULL`, default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This table is the **dedicated OTP verification log for the password-reset flow** — distinct from `otp_verifications` (consumer/campaign contact OTPs) and from `users.password_reset_by`/`password_reset_date` (which record the outcome of the reset itself, not the OTP verification step leading to it).
- **`otp_expire`** enforces a time-boxed validity window for each OTP — the application should reject verification attempts made after this timestamp even if the `otp_code` matches.
- A **unique constraint** on `(user_id, otp_code, is_verified)` prevents the exact same OTP/verification-state combination from being duplicated for a user, though a user could still have multiple *different* OTP codes issued over time (e.g., across repeated reset attempts).
- During reporting/verification, the application generally retrieves records where:
    - `user_id` and `otp_code` match the submitted values
    - `otp_expire` has not yet passed and `is_verified = false`, to validate a fresh reset attempt

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| forget_password_otp_verify_pkey | BTREE (PK) | id | Primary key lookups. |
| forget_password_otp_verify_user_id_otp_code_is_verified | BTREE (UNIQUE) | user_id, otp_code, is_verified | Enforces uniqueness of a user/OTP/verification-state combination and speeds up the standard OTP-check lookup. |

---

---

#### <span style="color:#B9770E">Table: `otp_verifications`</span>
##### Purpose

Records each one-time-password (OTP) verification attempt sent to a consumer's phone number during a campaign contact, including the SMS gateway response, JWT issued upon generation, and verification outcome. Supports OTP-based consumer identity confirmation used in flows like the `otp` field on `contacts`.

**Primary Key:** `(id, contact_date)` — composite

> **Note:** Although `user_id` and `cmp_id` appear to reference `users.id` and `campaigns.id` respectively, the database does **not** currently enforce foreign key constraints on either column in the structure provided.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | OTP verification record identifier. Auto-generated using the `otp_verifications_id_seq1` sequence. |
| **user_id** | integer (int4) | ✓ | Identifier of the BR/user who initiated the OTP request. No enforced FK to `users.id`. |
| **cmp_id** | integer (int4) | ✓ | Identifier of the campaign under which the OTP was sent. No enforced FK to `campaigns.id`. |
| **contact_no** | integer (int4) | ✓ | Consumer phone number the OTP was sent to. |
| **contact_date** | date | ✓ | Calendar date of the OTP request. Part of the composite primary key, following the same partitioning-style pattern used by `contacts`. |
| **code** | varchar(255) | ✓ | An internal reference/tracking code for this OTP request (e.g., "poi4EV"), distinct from the OTP value itself. |
| **otp** | varchar(255) | ✓ | The actual one-time-password value sent to the consumer (e.g., "lz1482"). |
| **jwt** | varchar(255) | ✓ | JSON Web Token issued at OTP generation time, encoding the OTP and its issue/expiry timestamps — used to validate the OTP submission without a separate server-side lookup. |
| **verify** | boolean (bool) | ✓ | Whether the OTP has been successfully verified/confirmed by the consumer. `NOT NULL`, default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **platform_type** | varchar |  | Identifies the SMS gateway/platform used to send the OTP (e.g., "ssl"). |
| **status** | integer (int4) |  | Status code of the OTP send/verification process. Default `174`. Allowed values managed by the application layer. |
| **sent_time** | timestamp |  | Timestamp the OTP SMS was actually sent via the gateway. |
| **verification_time** | timestamp |  | Timestamp the consumer successfully verified/submitted the OTP. |
| **gateway_response** | text |  | Raw JSON response from the SMS gateway, capturing delivery status, message body, and gateway-specific reference IDs — useful for troubleshooting delivery failures. |

---

##### Key Notes / Business Rules

- This table is the **audit log for OTP-based consumer verification**, capturing the full lifecycle: OTP generation (`code`, `otp`, `jwt`) → SMS dispatch (`sent_time`, `gateway_response`, `platform_type`) → consumer confirmation (`verify`, `verification_time`).
- **`jwt`** encodes the OTP and its issue/expiry time directly in the token, allowing the application to validate an OTP submission (and its expiry) without necessarily needing a fresh database round-trip.
- **`gateway_response`** stores the raw SMS provider payload — valuable for diagnosing delivery failures (e.g., confirming an SMS actually reached the carrier) but not intended for structured querying beyond ad-hoc JSON inspection.
- The composite primary key `(id, contact_date)` mirrors the same date-partitioning-style pattern used by `contacts`, `surveys`, and their child tables, suggesting this table may also be partitioned by `contact_date` even though `PARTITION BY` wasn't explicitly shown in the structure provided.
- **`status`** defaults to `174` — likely a "pending"/"sent" placeholder code, similar to the `failed_reason` default of `149` seen on `consumer_dialer_list`; the full status code catalog should be confirmed with the application team.
- During reporting, the application generally retrieves records where:
    - `contact_date` and `cmp_id` match the target campaign/date range
    - `verify = true` to measure successful OTP verification rates

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| otp_verifications_20230706_pkey | BTREE (PK) | id, contact_date | Primary key lookups; composite, consistent with the date-partitioned design pattern seen elsewhere in the schema. **Note:** the index name includes a date stamp (`20230706`), suggesting this may be a partition-specific index name rather than a stable, renamed constraint — worth confirming naming conventions with the DBA team if this pattern repeats across partitions. |

---

---

##### Example Record

| id | user_id | cmp_id | contact_no | otp | verify | status | sent_time | verification_time |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 16768272 | 1221 | 189 | 1996950369 | lz1482 | true | 200 | 2026-06-13 12:15:33 | 2026-06-13 12:16:04 |

---

---

#### <span style="color:#B9770E">Table: `porichoy_infos`</span>
##### Purpose

Stores National ID (NID) verification data retrieved from Bangladesh's "Porichoy" identity-verification service for a specific user, including biometric face-match results and full NID demographic details (name, parentage, address, national ID number) in both Bengali and English. **This integration is no longer active** — the connection to the Porichoy server has since been discontinued, so this table now represents historical verification data only.

**Primary Key:** `id`

> **Note:** Although `uid` appears to reference a user record, the database does **not** currently enforce a foreign key constraint on this column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the verification record. Auto-generated using the `porichoy_infos_id_seq` sequence. |
| **uid** | integer (int4) | ✓ | Identifies the user this NID verification belongs to. No enforced FK to `users.id`. |
| **nid_details** | jsonb | ✓ | Full NID verification payload returned by the Porichoy service: face-match result (matched flag + confidence percentage), name (Bengali and English), father's/mother's/spouse's name, gender, profession, DOB, permanent and present addresses (Bengali and English), and both current and old-format National ID numbers. |

---

##### Key Notes / Business Rules

- **This integration has been discontinued** — the ECRM connection to the Porichoy identity-verification server no longer exists. This table should be treated as a **historical archive** of NID verifications performed while the integration was active, not as a live or growing data source.
- The `nid_details` payload contains **highly sensitive personally identifiable information** (national ID numbers, full legal name, parents' names, home address) — access to this table should be tightly restricted, and any reporting or export involving this data should follow appropriate data-privacy handling.
- The **`faceMatchResult`** sub-object (matched flag + percentage) was used to confirm the user's submitted photo matched their NID record during onboarding/verification — a `matched: true` with a high percentage indicates successful identity verification at the time.
- Because the source integration is inactive, this table will **not receive new verification records** going forward unless the connection is restored — worth confirming with the application team whether identity verification now happens via a different mechanism.
- No `is_deleted` column or timestamp columns exist — this is a minimal, static historical record.

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| porichoy_infos_pkey | BTREE (PK) | id | Primary key lookups. |

---

---

---

#### <span style="color:#B9770E">Table: `audit_logs`</span>
##### Purpose

Records a general-purpose **security/activity audit trail** across the ECRM application — capturing who did what, from where, on which resource, with what payload. This is the system-wide audit log supporting compliance, security investigation, and change-tracking requirements referenced throughout the schema's various approval workflows (JML, bulk assignment, RBAC changes, etc.).

**Primary Key:** `id`

> **Note:** Although `user_id` appears to reference a user record, the database does **not** currently enforce a foreign key constraint on this column. Also note the column naming inconsistency: `createdAt`/`updatedAt` use camelCase, unlike the `created_at`/`updated_at` snake_case convention used almost universally elsewhere in this schema.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the audit log entry. Auto-generated using the `audit_logs_id_seq` sequence. |
| **user_id** | integer (int4) |  | Identifies the user who performed the logged action. No enforced FK to `users.id`. |
| **ip_address** | varchar(255) |  | IP address the action was performed from — useful for security/anomaly investigation. |
| **browser** | varchar(255) |  | Browser/client used to perform the action (e.g., "Chrome"). |
| **service** | varchar(255) |  | The internal service/module where the action occurred (e.g., "agency-manager"). |
| **resource** | varchar(255) |  | The specific resource type acted upon (e.g., "agency"). |
| **action** | varchar(255) |  | The action performed (e.g., "add", presumably also "edit"/"delete"/etc.). |
| **document** | varchar(255) |  | Identifier/reference of the specific document/record affected, if applicable. Empty in sample data. |
| **payload** | jsonb |  | The full data payload associated with the action — e.g., in sample data, the new agency being added, including its `tag`, `name`, and array of granted `resources`. |
| **createdAt** | timestamptz | ✓ | Timestamp the audit entry was created. `NOT NULL`, timezone-aware. **Note:** camelCase naming, inconsistent with the schema's general snake_case convention. |
| **updatedAt** | timestamptz | ✓ | Timestamp of the most recent update to the entry. `NOT NULL`, timezone-aware. **Note:** camelCase naming, same inconsistency. |

---

##### Key Notes / Business Rules

- This is the **system-wide audit/activity log** — capturing user, location (IP/browser), service/module, resource, action, and full payload for a broad range of administrative actions across ECRM (e.g., agency creation, as shown in sample data).
- **`payload`** captures the complete state/data of the action at the time it occurred (e.g., the full new-agency object including its resource grants) — this makes the table useful not just for "who did what" but for reconstructing exactly what changed.
- The **camelCase `createdAt`/`updatedAt`** naming stands out against the snake_case convention used almost everywhere else in this schema — likely indicates this table was built by a different team/framework (e.g., an ORM defaulting to camelCase) or added at a different point in the system's history.
- No `is_deleted` column exists — audit logs are, by nature and by compliance requirement, expected to be immutable and permanently retained.
- During reporting/security investigation, the application generally retrieves records where:
    - `user_id`, `resource`, `action`, and/or a `createdAt` date range match the target investigation scope

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| audit_logs_pkey | BTREE (PK) | id | Primary key lookups. |

---


---

<a id="module-2"></a>

## <span style="color:#1A5276">Module 2: Roles, Agencies & Access Control (RBAC)</span>

*14 item(s) in this module.*

#### <span style="color:#B9770E">Table: `agencies`</span>
##### Purpose

Stores the master list of agencies associated with the ECRM system. Agencies represent third-party organizations responsible for managing field force personnel and operational activities. This table serves as the central reference for agency information and supports agency-level data segmentation across users, campaigns, resources, and reporting.

**Primary Key:** `id`

> **Note:** Although other tables reference this table, the database currently does **not** enforce foreign key constraints. Relationships are maintained by the application.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the agency record. Auto-generated using the `agencies_id_seq` sequence. Uniquely identifies each agency. |
| **name** | varchar(255) | ✓ | Official name of the agency. Displayed throughout the application in lists, reports, and administrative screens. |
| **tag** | varchar(255) | ✓ | Short unique identifier or code representing the agency. Used by the application for identification and configuration purposes. |
| **description** | varchar(255) |  | Brief description of the agency, including organizational information or business profile. |
| **address** | varchar(255) |  | Registered or office address of the agency. |
| **email** | varchar(255) |  | Official email address of the agency for communication and administrative purposes. |
| **phone_number** | varchar(255) |  | Primary contact number of the agency. |
| **contact_person** | varchar(255) |  | Name of the primary contact person representing the agency. |
| **is_deleted** | boolean | ✓ | Soft-delete flag. `false` indicates an active agency, while `true` indicates the agency has been logically deleted and is excluded from normal operations. |
| **created_at** | timestamp | ✓ | Timestamp when the agency record was created. Automatically initialized using `NOW()`. |
| **updated_at** | timestamp | ✓ | Timestamp of the most recent modification to the agency record. Automatically maintained by the application. |
| **image** | varchar |  | Stores the file path or URL of the agency's logo or profile image. |

---

##### Key Notes

- This table serves as the **master repository of agencies** operating within the ECRM platform.
- Agencies typically represent **third-party field force service providers** responsible for managing Business Representatives (BRs), Supervisors, and other operational staff.
- Agency information is referenced throughout the application for user management, campaign assignments, resource allocation, and reporting.
- Soft deletion is implemented using the **`is_deleted`** flag, allowing historical agency records to be retained.
- The **`image`** column stores the location of the agency's uploaded logo or profile image.
- Although the database does not define foreign key constraints, this table is referenced by several application tables, including:
    - `users_agency_maps`
    - `campaign_agency_maps`
    - `agency_resource_map`
    - `role_agency_maps`

---

##### Indexes

| Index Name | Type | Unique | Column(s) | Purpose |
| --- | --- | --- | --- | --- |
| `agencies_pkey` | BTREE | Yes | `id` | Primary Key index. Ensures each agency record has a unique identifier and optimizes lookups, joins, updates, and deletes using the `id` column. Automatically created when the primary key constraint is defined. |

#### <span style="color:#B9770E">Table: `users_agency_maps`</span>
##### Purpose

Maps users to their associated agency within the ECRM system. This table establishes the organizational relationship between user accounts and agencies, enabling agency-based user management, reporting, and operational segregation. Historical mappings are preserved through soft deletion.

**Primary Key:** `id`

> **Note:** Although `user_id` and `agency_id` logically reference the `users` and `agencies` tables, the database currently does **not** enforce foreign key constraints.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the user-agency mapping record. Auto-generated using the `users_agency_maps_id_seq` sequence. |
| **user_id** | integer (int4) | ✓ | Identifier of the associated user account. Represents a user in the `users` table. |
| **agency_id** | integer (int4) | ✓ | Identifier of the associated agency. Represents an agency in the `agencies` table. |
| **is_deleted** | boolean |  | Soft-delete flag. `false` indicates an active mapping, while `true` indicates the mapping has been logically removed but retained for historical reference. |
| **created_at** | timestamp |  | Timestamp when the user-agency mapping was created. Automatically initialized with the current timestamp during record creation. |
| **updated_at** | timestamp |  | Timestamp of the most recent modification to the mapping record. Automatically maintained by the application. |

---

##### Key Notes

- This table defines the relationship between **users** and the **agencies** they belong to.
- Agency assignments are used throughout the ECRM application for organizational grouping, reporting, and operational management.
- Historical agency assignments are retained through the **`is_deleted`** flag instead of permanently deleting records.
- The database does **not** enforce foreign key constraints on **`user_id`** or **`agency_id`**; referential integrity is maintained by the application.
- A user may have multiple mapping records over time due to agency transfers, historical tracking, or organizational changes.
- Together with the **`agencies`** table, this table enables agency-based segmentation of users and supports administrative management across multiple agencies.

---

##### Indexes

| Index Name | Type | Unique | Column(s) | Purpose |
| --- | --- | --- | --- | --- |
| `users_agency_maps_pkey` | BTREE | Yes | `id` | Primary Key index. Ensures each user-agency assignment record has a unique identifier and optimizes lookups, joins, updates, and deletes using the `id` column. Automatically created when the primary key constraint is defined. |

#### <span style="color:#B9770E">Table: `agency_resource_map`</span>
##### Purpose

Bridge table granting a specific external agency access to a specific application resource (e.g., a menu/module/feature defined in `settings.resources`), mirroring the `role_resource_maps` RBAC pattern but scoped to agencies rather than roles.

**Primary Key:** `id`

**Foreign Key:** `agency_id → agencies.id`

> **Note:** Although `resource_id` appears to reference `settings.resources.id`, the database does **not** currently enforce a foreign key constraint on this column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the mapping record. Auto-generated using the `agency_resource_map_id_seq` sequence. |
| **agency_id (FK)** | integer (int4) | ✓ | References `agencies.id`. Identifies which agency this resource grant applies to. |
| **resource_id** | integer (int4) | ✓ | Intended to reference `settings.resources.id` — identifies which application resource/feature is granted. No enforced FK. |
| **delete_marker** | boolean (bool) | ✓ | Soft-delete flag. **Note:** this table uses a distinctly-named `delete_marker` column instead of the more common `is_deleted` naming convention used almost everywhere else in the schema — worth flagging as a naming inconsistency. `NOT NULL`, default `false`. |
| **created_at** | timestamp |  | Timestamp when the mapping was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. `NOT NULL`, default `false`. **Note:** this table has **two** apparent soft-delete columns (`delete_marker` and `is_deleted`) — their relationship/precedence should be clarified with the application team, as this is unusual and could indicate a schema migration artifact (e.g., `delete_marker` being a legacy column being phased out in favor of `is_deleted`, or vice versa). |

---

##### Key Notes / Business Rules

- This table is the **agency-side counterpart to the RBAC `role_resource_maps` table** — it grants an agency (rather than a role) access to specific application resources/features, independent of the user's individual role.
- **Two soft-delete columns exist on this table** (`delete_marker`, `is_deleted`) — this is a schema anomaly relative to the rest of the ECRM tables, which use `is_deleted` alone. Any query filtering "active" records should check both columns until clarified, to avoid silently including rows one flag considers deleted and the other doesn't.
- A single agency typically has many resource grants (sample data shows agency `13` granted access to resources `116`, `158`, `124`, `125`), reflecting the full set of application features that agency's users can access.
- During reporting/access-check queries, the application generally retrieves records where:
    - `is_deleted = false` (and likely `delete_marker = false`, pending confirmation)
    - `agency_id` and `resource_id` match the target agency and requested feature

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| agency_resource_map_pkey | BTREE (PK) | id | Primary key lookups. |

---

---

##### Example Records

| id | agency_id | resource_id | delete_marker | is_deleted |
| --- | --- | --- | --- | --- |
| 207 | 13 | 116 | false | false |
| 208 | 13 | 158 | false | false |
| 209 | 13 | 124 | false | false |
| 210 | 13 | 125 | false | false |

---

---

#### <span style="color:#B9770E">Table: `user_approval_maps`</span>
##### Purpose

Stores the approval history and current approval status of users within the ECRM system. Each record represents an approval workflow action, such as user onboarding, approval, rejection, or termination. The table maintains a complete audit trail of approval decisions, including the approving user, approval status, comments, timestamps, and record activity status.

**Primary Key:** `id`

> **Note:** Although `user_id` and `approved_by` logically reference records in the `users` table, the database currently does **not** enforce foreign key constraints on these columns.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the approval record. Auto-generated using the `user_approval_maps_id_seq` sequence. Uniquely identifies each approval history entry. |
| **user_id** | integer (int4) | ✓ | Identifier of the user whose account or request is being processed through the approval workflow. Represents a user in the `users` table. |
| **approved_status** | integer (int4) | ✓ | Current workflow status of the approval record. The status values are maintained in the `settings._cats` table and represent stages such as Pending, Approved, Rejected, or Terminated. |
| **approved_by** | integer (int4) | ✓ | Identifier of the user who performed the approval, rejection, or workflow action. Represents a user in the `users` table. |
| **comment** | varchar(255) |  | Optional remarks or comments provided during the approval process, such as rejection reasons or administrative notes. |
| **approved_at** | timestamp | ✓ | Timestamp when the approval workflow action was completed. |
| **is_active** | boolean |  | Indicates whether the approval record represents the user's current active approval status. `true` identifies the latest effective workflow state, while previous workflow records are typically marked as `false`. |
| **created_at** | timestamp |  | Timestamp when the approval record was created. Automatically initialized with the current timestamp during record creation. |
| **updated_at** | timestamp |  | Timestamp of the most recent modification to the approval record. Automatically maintained by the application. |
| **is_deleted** | boolean |  | Soft-delete flag. `false` indicates an active approval history record, while `true` indicates the record has been logically deleted. |

---

##### Approval Status Reference

The `approved_status` values are maintained in the `settings._cats` table.

| Status ID | Slug | Display Label | Description |
| --- | --- | --- | --- |
| **4** | `pending` | Pending | Approval request has been submitted and is awaiting review. |
| **5** | `rejected` | Rejected | Approval request has been rejected. |
| **6** | `approved` | Approved | User or request has been approved and is considered active. |
| **7** | `terminate_requested` | Terminate Requested | A termination request has been submitted and is awaiting approval. |
| **8** | `terminated` | Terminated | User has been terminated or permanently deactivated. |

---

##### Key Notes

- This table stores the **complete approval history** for each user rather than only the latest approval state.
- A single user may have **multiple approval records**, representing different stages of the approval lifecycle (e.g., Pending → Approved → Terminate Requested → Terminated).
- The **`is_active`** flag identifies the user's current effective approval status. Historical workflow records are generally retained with `is_active = false`.
- The **`approved_by`** column stores the user who performed the workflow action, such as approving, rejecting, or requesting termination.
- Approval timestamps are recorded in the **`approved_at`** column, providing a complete audit trail of workflow events.
- Soft deletion is implemented using the **`is_deleted`** flag, allowing historical approval records to be retained for auditing.
- Although the database does not enforce foreign key constraints, **`user_id`** and **`approved_by`** logically reference records in the **`users`** table and are maintained by the application.

---

##### Indexes

| Index Name | Type | Unique | Column(s) | Purpose |
| --- | --- | --- | --- | --- |
| `user_approval_maps_pkey` | BTREE | Yes | `id` | Primary Key index. Ensures each user approval record has a unique identifier and optimizes lookups, joins, updates, and deletes by `id`. Automatically created with the primary key constraint. |
| `idx_user_approval_maps_active_status_user` | BTREE | No | `approved_status`, `is_active`, `user_id` | Composite index that optimizes queries filtering user approval records by approval status, active status, and user. Commonly used to quickly retrieve a user's current approval state without scanning the entire table. |

#### <span style="color:#B9770E">Table: `settings._cats`</span>
##### Purpose

Stores configurable lookup values (master categories) used throughout the ECRM application. Instead of hardcoding status values, types, or categories within business tables, the application references records from this table. This enables centralized management of configurable values and supports consistent business logic across modules.

**Primary Key:** `id`

> **Schema:** `settings`
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the category record. Auto-generated using the `_cats_id_seq` sequence. Uniquely identifies each lookup value. |
| **parent** | integer (int4) |  | Identifier of the parent category. Used to organize lookup values into hierarchical groups. Child records inherit their category from the parent record. |
| **slug** | varchar |  | System-friendly unique identifier of the category. Used internally by the application instead of display text (e.g., `approved`, `pending`, `terminated`). |
| **display_label** | varchar |  | Human-readable label displayed throughout the application user interface (e.g., **Approved**, **Pending**, **Rejected**). |
| **status** | integer (int4) |  | Indicates the availability or status of the lookup value. Interpretation is determined by the application. |
| **createdAt** | timestamp with time zone | ✓ | Timestamp when the lookup record was created. |
| **updatedAt** | timestamp with time zone | ✓ | Timestamp of the most recent update to the lookup record. |
| **rank** | integer (int4) |  | Numeric ordering value used to control the display sequence of lookup values within the application. |

---

##### Example: Approval Status Categories

For approval workflows, the `user_approval_maps.approved_status` column references records in this table.

| ID | Slug | Display Label |
| --- | --- | --- |
| **4** | `pending` | Pending |
| **5** | `rejected` | Rejected |
| **6** | `approved` | Approved |
| **7** | `terminate_requested` | Terminate Requested |
| **8** | `terminated` | Terminated |

---

##### Key Notes

- This table serves as a **centralized master lookup repository** for configurable application values.
- Categories are organized hierarchically using the **`parent`** column, allowing multiple groups of lookup values to coexist within a single table.
- Business tables typically store the **`id`** of a lookup record rather than hardcoded text values, improving consistency and maintainability.
- The **`slug`** provides a stable, system-friendly identifier, while **`display_label`** is intended for display in the user interface.
- The **`rank`** column controls the display order of values where ordering is required.
- This table is referenced by numerous modules across the ECRM application, including user approvals, workflow statuses, configuration settings, and other lookup-driven business processes.

---

###### Hierarchical Structure

```
Parent Category
      │
      ├── Child Category 1
      ├── Child Category 2
      ├── Child Category 3
      └── Child Category N
```

For example:

```
Approval Status (Parent ID: 3)
│
├── Pending (ID: 4)
├── Rejected (ID: 5)
├── Approved (ID: 6)
├── Terminate Requested (ID: 7)
└── Terminated (ID: 8)
```

This design allows the application to manage different groups of lookup values dynamically without modifying database schemas or application code.

---

---

---

#### <span style="color:#B9770E">Table: `user_sup_maps`</span>
##### Purpose

Stores the reporting hierarchy between users in the ECRM system by mapping each user to their immediate supervisor. This table defines the organizational reporting chain used for approval workflows, data visibility, task assignments, and managerial oversight. Historical reporting relationships are preserved, allowing the system to track supervisor changes over time.

**Primary Key:** `id`

---

##### Primary Key & Relationships

**Primary Key**

- **id** → Primary key for the reporting relationship.

**Logical Relationships**

- **user_id** → `users.id` (Subordinate / Reporting User)
- **reportto_id** → `users.id` (Supervisor / Reporting Manager)

> **Note:** Both `user_id` and `reportto_id` reference the `users` table, making this a **self-referential relationship**. Although PostgreSQL defines these foreign keys, the relationship models the reporting hierarchy within the same entity rather than between separate tables.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the reporting relationship. Auto-generated using the `user_sup_maps_id_seq` sequence. Uniquely identifies each reporting assignment. |
| **user_id (FK)** | integer (int4) | ✓ | Identifier of the subordinate or reporting employee. References a user in the `users` table. |
| **reportto_id (FK)** | integer (int4) | ✓ | Identifier of the supervisor or manager to whom the user reports. References another user in the `users` table. |
| **from_date** | timestamp | ✓ | Timestamp indicating when the reporting relationship became effective. |
| **to_date** | timestamp |  | Timestamp indicating when the reporting relationship ended. A `NULL` value indicates the assignment is currently active. Historical records contain the date the assignment ended. |
| **is_current** | boolean |  | Indicates whether this record represents the user's current reporting relationship. `true` = current assignment, `false` = historical assignment. |
| **is_deleted** | boolean |  | Soft-delete flag. `false` indicates an active record, while `true` indicates the relationship has been logically deleted and retained for audit purposes. |
| **created_at** | timestamp |  | Timestamp when the reporting relationship was created. Automatically initialized with the current timestamp during record creation. |
| **updated_at** | timestamp |  | Timestamp of the most recent modification to the reporting relationship. Automatically maintained by the application. |

---

##### Key Notes / Business Rules

- This table stores the **individual reporting hierarchy** for users within the ECRM system.
- Both **`user_id`** and **`reportto_id`** reference records in the **`users`** table, creating a self-referential organizational structure.
- A user can have **multiple reporting records over time**, reflecting supervisor changes, transfers, promotions, or organizational restructuring.
- The current reporting relationship is identified by:
    - `is_current = true`
    - `is_deleted = false`
- Previous reporting relationships are retained as historical records by setting:
    - `is_current = false`
    - `to_date` to the assignment end date.
- This table supports:
    - Organizational reporting hierarchy
    - Manager-to-subordinate relationships
    - Data visibility and access control
    - Approval routing
    - Field force supervision
    - Historical reporting analysis
- The application uses this table to determine a user's immediate supervisor and reporting chain.
- This table represents the **user-level reporting hierarchy**, whereas the `role_report_to_maps` table defines reporting relationships between role types rather than individual users.

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| **user_sup_maps_pkey** | BTREE (Unique) | `id` | Primary key index ensuring uniqueness and enabling efficient retrieval by record ID. |
| **idx_user_sup_maps_user_id** | BTREE | `user_id` | Optimizes queries that retrieve reporting records for a specific user. |
| **idx_user_sup_maps_reportto_id** | BTREE | `reportto_id` | Optimizes queries that retrieve all direct reports of a particular supervisor. |
| **idx_user_sup_maps_user_current_active** | BTREE | `(user_id, is_current, is_deleted)` | Composite index optimized for retrieving the current active reporting assignment for a user. |
| **user_sup_userid_indx** | BTREE | `(user_id, is_current)` | Optimizes queries that filter reporting assignments by user and current status. |

---

---

#### <span style="color:#B9770E">Table: `roles`</span>
**Purpose:**

Defines all user roles within the ECRM system (e.g., BR, Supervisor, Area Manager, Admin). Every user is assigned exactly one role, and that role determines their permissions, accessible features, reporting hierarchy, and data visibility.

This is the foundation of the application's Role-Based Access Control (RBAC) model.

**Primary Key:** `id` (Auto-increment)

---

##### Business Role

The `roles` table is the central definition of user roles across the system.

Each role controls:

- User permissions
- Accessible menus and modules
- Reporting hierarchy
- Organizational structure
- Geographic assignment eligibility
- Agency eligibility
- Data visibility

Multiple system components reference this table to implement security and organizational policies.

---

##### Columns

| Column | Type | Required | Description |
| --- | --- | --- | --- |
| **id** | int4 | ✓ | Primary Key. Auto-incrementing unique identifier. |
| **name** | varchar(255) | Optional | Display name of the role (e.g., BR, Supervisor, Area Manager, Admin). |
| **description** | varchar(255) | Optional | Description of the role's responsibility. |
| **platform** | int4 | Optional | Platform identifier where the role is applicable (defined by application logic). |
| **active_status** | boolean | Optional | Indicates whether the role is active and available for assignment. |
| **top_ff** | boolean | Optional | Indicates whether the role is considered a top-level field-force role. |
| **is_deleted** | boolean | ✓ | Soft-delete flag. `false` = active, `true` = logically deleted. |
| **created_at** | timestamp | ✓ | Timestamp when the role was created. |
| **updated_at** | timestamp | ✓ | Timestamp of the most recent update. |
| **role_type** | int4 | Optional | Internal role classification used by application business logic. |
| **report_to** | int4 | Optional | Legacy reporting reference. Current reporting hierarchy is maintained in `role_report_to_maps`. |
| **lowest_ff** | boolean | ✓ | Indicates whether this is the lowest level field-force role (typically BR). |
| **top_mgt** | boolean | Optional | Indicates whether the role belongs to top management. |

---

##### Referenced By

- role_agency_maps
- role_location_maps
- role_report_to_maps
- role_resource_maps
- users (logical relationship)

---

##### Business Logic

- Every user has one role.
- Roles determine UI access and permissions.
- Roles participate in organizational hierarchy.
- Roles are assigned to agencies.
- Roles define geographic assignments.
- Permissions are inherited through associated resources.

---

##### Example

| Role | Description |
| --- | --- |
| BR | Field Representative |
| Supervisor | Manages BRs |
| Area Manager | Manages Supervisors |
| Admin | Full system administration |

---

##### Indexes

| Index | Type | Columns | Purpose |
| --- | --- | --- | --- |
| roles_pkey | BTREE (PK) | id | Primary key lookups. |

---

#### <span style="color:#B9770E">Table: `role_agency_maps`</span>
**Purpose:**

Maps roles to agencies, defining which agencies are allowed to use specific role types.

**Primary Key:** `id`

---

##### Business Role

Different agencies may have different organizational structures.

For example:

- Agency A → BR + Supervisor
- Agency B → BR only

This table controls which roles can exist within each agency.

---

##### Columns

| Column | Type | Description |
| --- | --- | --- |
| **id** | int4 | Primary Key |
| **role_id** | int4 | FK → roles.id |
| **agency_id** | int4 | FK → agencies.id |
| **created_at** | timestamp | Creation timestamp |
| **updated_at** | timestamp | Last update timestamp |
| **is_deleted** | boolean | Soft-delete flag |

---

##### Foreign Keys

- `role_id` → `roles.id`
- `agency_id` → `agencies.id`

---

##### Business Logic

- One agency may support multiple roles.
- One role may belong to multiple agencies.
- Filters available role types during user creation.

---

##### Indexes

| Index | Type | Columns | Purpose |
| --- | --- | --- | --- |
| role_agency_pkey | BTREE (PK) | id | Primary key lookups. |

---

#### <span style="color:#B9770E">Table: `role_location_maps`</span>
**Table ID:** #118

**Purpose:**

Assigns users (with a specific role) to one or more geographic locations. This table enforces location-based data visibility.

**Primary Key:** `id`

---

##### Business Role

This table defines **where** a user is allowed to operate.

Examples:

- Supervisor → Territory A
- Area Manager → Region X
- BR → Specific outlets

The `location` column stores an integer array (`int4[]`) containing one or more location IDs. The meaning of those IDs depends on the value of `hierarchy_offset`, which identifies the location hierarchy level (for example, Region, Area, Territory, Point, or Cluster).

---

##### Columns

| Column | Type | Description |
| --- | --- | --- |
| **id** | int4 | Primary Key |
| **assigned_by** | int4 | User who made the assignment |
| **assigned_to** | int4 | FK → users.id |
| **assigned_role** | int4 | FK → roles.id |
| **location** | int4[] | Array of assigned location IDs. The hierarchy level is determined by `hierarchy_offset`. |
| **from_date** | timestamp | Assignment start date |
| **to_date** | timestamp | Assignment end date |
| **is_current** | boolean | Active assignment indicator |
| **is_deleted** | boolean | Soft-delete flag |
| **created_at** | timestamp | Creation timestamp |
| **updated_at** | timestamp | Last update timestamp |
| **hierarchy_offset** | int4 | Indicates the hierarchy level represented by the location IDs (e.g., Region, Area, Territory, Point, Cluster). |

---

##### Foreign Keys

- `assigned_to` → `users.id`
- `assigned_role` → `roles.id`

---

##### Business Logic

- Controls geographic access.
- Users may have multiple assigned locations.
- Historical assignments are preserved.
- Used extensively in reporting and data filtering.

---

##### Indexes

| Index | Type | Columns | Purpose |
| --- | --- | --- | --- |
| role_location_maps_pkey1 | BTREE (PK) | id | Primary key lookups. |
| idx_role_location_maps_assigned_to | BTREE | assigned_to | Retrieve assignments for a user. |
| idx_role_location_maps_assigned_to_active | BTREE | assigned_to, is_current, is_deleted | Optimized lookup of active assignments. |
| idx_role_location_maps_assigned_role_active | BTREE | assigned_role, is_current, is_deleted | Retrieve active assignments by role. |
| idx_role_location_maps_location | BTREE | location | Lookup by assigned location. |
| idx_role_location_maps_location_gin | GIN | location | Efficient searches on the location array (contains/overlap operations). |
| idx_role_location_maps_is_current | BTREE | is_current | Filter active assignments. |
| idx_role_location_maps_is_deleted | BTREE | is_deleted | Filter deleted records. |

---

#### <span style="color:#B9770E">Table: `role_report_to_maps`</span>
**Purpose:**

Defines the reporting hierarchy between role types.

Unlike `user_sup_maps`, which stores actual user-to-user reporting, this table stores the organizational policy for roles.

**Primary Key:** `id`

---

##### Business Role

Defines organizational structure.

Example:

```
BR
   │
Supervisor
   │
Area Manager
   │
Regional Manager
```

---

##### Columns

| Column | Type | Description |
| --- | --- | --- |
| **id** | int4 | Primary Key |
| **role_id** | int4 | Child role |
| **report_to_id** | int4 | Parent role |
| **is_deleted** | boolean | Soft-delete flag |
| **created_at** | timestamp | Creation timestamp |
| **updated_at** | timestamp | Last update timestamp |

---

##### Foreign Keys

- `role_id` → `roles.id`
- `report_to_id` → `roles.id`

*(Self-referential relationship.)*

---

##### Business Logic

- Defines organizational reporting policy.
- Multiple child roles may report to the same parent role.
- Independent of actual user assignments.

---

##### Indexes

| Index | Type | Columns | Purpose |
| --- | --- | --- | --- |
| role_report_to_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

#### <span style="color:#B9770E">Table: `role_resource_maps`</span>
**Purpose:**

Maps roles to application resources (menus, pages, APIs, and features), implementing the permission model.

**Primary Key:** `id`

---

##### Business Role

When a user logs in:

```
User
    ↓
Role
    ↓
Role Resources
    ↓
Visible Menus
Accessible APIs
Allowed Actions
```

This table drives UI and backend authorization.

---

##### Columns

| Column | Type | Description |
| --- | --- | --- |
| **id** | int4 | Primary Key |
| **role_id** | int4 | FK → roles.id |
| **resource_id** | int4 | FK → settings.resources.id |
| **created_at** | timestamp | Creation timestamp |
| **updated_at** | timestamp | Last update timestamp |
| **is_deleted** | boolean | Soft-delete flag |

---

##### Foreign Keys

- `role_id` → `roles.id`
- `resource_id` → `settings.resources.id` *(logical relationship)*

---

##### Business Logic

- One role may have many resources.
- One resource may belong to many roles.
- Used to build application menus and enforce access permissions.

---

##### Indexes

| Index | Type | Columns | Purpose |
| --- | --- | --- | --- |
| role_resourvce_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

#### <span style="color:#B9770E">Table: `role_tree_maps`</span>
**Purpose:**

Stores a precomputed role hierarchy tree to accelerate recursive role traversal and authorization queries.

**Primary Key:** `id`

---

##### Business Role

Instead of calculating the hierarchy recursively at runtime, the system stores parent-child role relationships for fast lookups.

This improves the performance of permission inheritance and organizational reporting.

---

##### Columns

| Column | Type | Description |
| --- | --- | --- |
| **id** | int4 | Primary Key |
| **parent_id** | int4 | Parent role node identifier |
| **role_id** | int4 | Child role identifier |
| **is_deleted** | boolean | Soft-delete flag |
| **created_at** | timestamp | Creation timestamp |
| **updated_at** | timestamp | Last update timestamp |

---

##### Business Logic

- Precomputed hierarchy for performance.
- Used in authorization and reporting.
- Avoids expensive recursive queries.

---

##### Indexes

| Index | Type | Columns | Purpose |
| --- | --- | --- | --- |
| role_tree_maps_pkey | BTREE (PK) | id | Primary key lookups. |
| unique_id | BTREE (UNIQUE) | id | Ensures unique identifiers. |
| idx_role_tree_maps_parent_active | BTREE | parent_id, is_deleted, role_id | Efficient traversal of active child roles. |

---

#### <span style="color:#B9770E">Table: `settings.resources`</span>
**Purpose:**

Master catalog of all application resources (menus, pages, modules, and features) that can be secured through role-based permissions.

---

##### Business Role

Every screen, module, or feature in the application is defined as a resource.

Examples include:

- User Manager
- Role Manager
- Campaign Manager
- Organization Manager

These resources are assigned to roles through `role_resource_maps`, allowing administrators to enable or disable access without modifying application code.

---

##### Columns

| Column | Type | Description |
| --- | --- | --- |
| **id** | int4 | Primary Key. Resource identifier. |
| **display_label** | varchar | Display name shown in the UI. |
| **parent** | int4 | Parent resource ID used to build hierarchical menus. |
| **resource_type** | int4 | Internal classification of the resource (menu, page, action, etc.). |
| **created_at** | timestamp | Resource creation timestamp. |
| **updated_at** | timestamp | Last modification timestamp. |
| **is_deleted** | boolean | Soft-delete flag. |
| **resource_description** | varchar | Optional description of the resource. |
| **stts** | boolean | Indicates whether the resource is enabled. |
| **platform_type** | int4 | Platform identifier. Default value is `19`. |

---

##### Referenced By

- `role_resource_maps.resource_id`

---

##### Business Logic

- Defines all secured application resources.
- Resources can be organized into hierarchical menus using `parent`.
- Permissions are granted indirectly through role assignments.
- Supports dynamic UI generation and backend authorization.

---

##### Indexes

| Index | Type | Columns | Purpose |
| --- | --- | --- | --- |
| resources_pkey | BTREE (PK) | id | Primary key lookups. |
| resources_pk | BTREE (PK) | id | Duplicate primary key index definition maintained by the database. |

---

#### <span style="color:#B9770E">RBAC Relationship</span>
```
roles
   │
   ├── role_agency_maps ─────────► agencies
   │
   ├── role_location_maps ───────► users + locations
   │
   ├── role_report_to_maps ──────► roles
   │
   ├── role_resource_maps ───────► settings.resources
   │
   └── role_tree_maps
```

This set of tables implements the ECRM Role-Based Access Control (RBAC) framework, defining user roles, organizational hierarchy, geographic scope, agency eligibility, and feature-level permissions while enabling efficient authorization and data visibility.

---

---

---


---

<a id="module-3"></a>

## <span style="color:#1A5276">Module 3: JML & Bulk User-Assignment Workflow</span>

*6 item(s) in this module.*

#### <span style="color:#B9770E">Table: `jml_tickets`</span>
##### Purpose

Central table implementing the **Joiner–Mover–Leaver (JML) process** — the controlled, auditable workflow for managing the full user lifecycle in ECRM. A single ticket represents one lifecycle event: onboarding a **new user** (Joiner), changing an existing user's **role/access** (Mover), or **deactivating** a user due to exit or role change (Leaver). Applies to all management user categories (org_mgt / tech_support / agency_mgt) Each ticket captures the requested user's identity/employment details, the target role/hierarchy/locations, who requested it, and when it should take effect.

**Primary Key:** `id`

> **Note:** Although `assigned_role` appears to reference a role, and `locations` (an array) appears to reference `locations.id` entries, the database does **not** currently enforce foreign key constraints on either.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the JML ticket. Auto-generated using the `jml_tickets_id_seq` sequence. |
| **full_name** | varchar |  | Full name of the user this ticket concerns (relevant for Joiner/new-user tickets). |
| **official_contact** | integer (int4) |  | Official contact/phone number of the user. |
| **email** | varchar | ✓ | Official email address of the user this ticket concerns. |
| **designation** | varchar |  | Job title/designation associated with the ticket (e.g., "AM IMSL"). |
| **dob** | varchar |  | Date of birth of the user. **Note:** stored as `varchar`, not `date` — the same data-type inconsistency flagged earlier on `user_infos.dob`. |
| **username** | varchar |  | Proposed/assigned system username for the user. |
| **password** | varchar |  | Initial password value proposed for the account (e.g., for a Joiner ticket). Should be treated with the same security caution as `users.password`, though here it appears to be stored as generated plain text rather than a hash based on the sample value — worth confirming with the security team whether this is hashed, encrypted, or a one-time-use plaintext value cleared post-provisioning. |
| **lm_email** | varchar | ✓ | Email of the user's **line manager**, used for notification/approval routing in the JML workflow. |
| **execute_date** | varchar | ✓ | The date on which this ticket's action should take effect. **Note:** stored as `varchar` rather than `date` — a data-type inconsistency that could allow malformed date strings unless strictly validated at the application layer. |
| **type** | integer (int4) | ✓ | Classifies which JML stage this ticket represents — Joiner, Mover, or Leaver. Specific code-to-stage mapping managed by the application layer. |
| **created_at** | timestamp |  | Timestamp when the ticket was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **assigned_role** | integer (int4) |  | The role being assigned to the user as part of this ticket (relevant for Joiner/Mover tickets). No enforced FK. |
| **hierarchy_offset** | integer (int4) |  | Numeric offset indicating the user's position/level within the assigned role's reporting hierarchy. |
| **locations** | integer[] (`_int4`) |  | Array of `locations.id` values the user is being granted scope over as part of this ticket. No enforced FK on array contents. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **ticket_code** | varchar |  | Human-readable/external ticket reference code (e.g., "TID25356963"). |
| **requester_email** | varchar |  | Email of the person who submitted/initiated this JML ticket. |
| **one_id** | varchar |  | External/corporate identity system identifier for the user (e.g., BAT's "One ID"), mirroring `users.one_id`. |
| **account_type** | smallint (int2) | ✓ | Classification code for the type of account being created/modified. `NOT NULL`, default `177`. |
| **azure_status** | boolean (bool) | ✓ | Whether this ticket's corresponding Azure AD (or similar identity-provider) provisioning has been completed. `NOT NULL`, default `false`. |
| **requester_role** | integer (int4) |  | Role of the person who submitted the ticket, at the time of submission. |

---

##### Key Notes / Business Rules

- This table implements the **Joiner–Mover–Leaver (JML) lifecycle process**: Joiner = new account creation/activation, Mover = role/access modification for an existing user, Leaver = deactivation due to exit or role change. `type` distinguishes which of these three stages a given ticket represents.
- All JML requests are **initiated within the system** and require **approval per a configured workflow** — the approval/status trail itself is tracked in the related `ticket_status_maps` table (see below), not on this record directly.
- **`execute_date`** and **`dob`** being stored as `varchar` rather than proper `date` types is a data-integrity risk — malformed date strings would not be caught at the database level and should be validated strictly at the application layer.
- **`locations`** (array) and **`assigned_role`** define the scope and access level granted as part of a Joiner/Mover ticket — this is the direct mechanism by which a new/modified user's `role_location_maps` and role assignments ultimately get populated once the ticket is approved and executed.
- **`azure_status`** suggests JML tickets also drive identity-provider account provisioning (e.g., Azure AD), not just ECRM-internal role/access records — a ticket may be "approved" internally but still pending on the Azure side.
- All actions related to this workflow are intended to be **logged and auditable** for compliance and security — reflected in the separate status/history tracking tables (`ticket_status_maps`) rather than being overwritten in place here.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - scoped by `type` (Joiner/Mover/Leaver) and joined to `ticket_status_maps` for current approval status

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| jml_tickets_pkey | BTREE (PK) | id | Primary key lookups. |

---

---

##### Example Record

| id | full_name | designation | email | type | assigned_role | account_type | azure_status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 32 | Md Masudul Hassan Hridoy | AM IMSL | [hridoy.hassan@idirect.com.bd](mailto:hridoy.hassan@idirect.com.bd) | 156 | 280 | 27 | false |

---

---

#### <span style="color:#B9770E">Table: `ticket_status_maps`</span>
##### Purpose

Records the **approval/status history** for a `jml_tickets` record — one row per status change, preserving who made the change and any accompanying comments. This is the auditable trail supporting the JML process's governance requirement that all actions be logged and traceable.

**Primary Key:** `id`

**Foreign Key:** `created_by → users.id` (implied; not shown as enforced)

> **Note:** Although `ticket_id` appears to reference `jml_tickets.id`, the database does **not** currently enforce a foreign key constraint on this column in the structure provided.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the status record. Auto-generated using the `ticket_status_maps_id_seq` sequence. |
| **ticket_id** | integer (int4) | ✓ | Identifies the `jml_tickets` record this status entry belongs to. No enforced FK shown. |
| **status** | integer (int4) | ✓ | Coded status value at this point in the ticket's approval workflow (e.g., pending, approved, rejected — likely aligning with the same status code family used elsewhere in the schema, such as `user_approval_maps`' 4/5/6/7/8 convention). |
| **created_by (FK)** | integer (int4) | ✓ | References `users.id`. The user who performed/recorded this status change. |
| **is_active** | boolean (bool) |  | Whether this status entry represents the currently active/live status for the ticket. Default `true`. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when this status entry was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **comments** | text |  | Optional free-text comments accompanying this status change (e.g., an approver's or rejector's notes). |

---

##### Key Notes / Business Rules

- This table is the **auditable status history** for JML tickets — every approval-workflow transition (e.g., submitted → pending → approved/rejected) gets its own row rather than overwriting a single status field on `jml_tickets`, satisfying the JML governance requirement that all actions be logged.
- **`is_active`** flags which status row currently represents the ticket's live state — multiple historical status rows can exist for the same `ticket_id`, but typically only one should be `is_active = true` at a time.
- Sample data shows multiple distinct `ticket_id` values sharing the same `created_by` (`28097`) — consistent with a single approver processing a batch of JML tickets.
- Soft deletion is handled using **`is_deleted`**, separate from `is_active` (which tracks live-vs-historical status rather than record validity).
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - `is_active = true` to get each ticket's current status, or the full row set ordered by `created_at` for a complete audit trail

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| ticket_status_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

---

##### Example Records

| id | ticket_id | status | created_by | is_active |
| --- | --- | --- | --- | --- |
| 42 | 29 | 154 | 28097 | false |
| 43 | 30 | 154 | 28097 | false |
| 47 | 32 | 154 | 28097 | false |

---

---

#### <span style="color:#B9770E">Table: `user_ticket_maps`</span>
##### Purpose

Bridge table linking a `jml_tickets` record to the specific user account it concerns — separating the ticket's workflow data from the actual user-account association, allowing a ticket to be traced back to (or forward into) a concrete `users.id` record once processed.

**Primary Key:** `id`

> **Note:** Although `user_id` and `ticket_id` appear to reference `users.id` and `jml_tickets.id` respectively, the database does **not** currently enforce foreign key constraints on either column in the structure provided.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the mapping record. Auto-generated using the `user_ticket_maps_id_seq` sequence. |
| **user_id** | integer (int4) | ✓ | Identifies the user account this JML ticket is associated with. No enforced FK to `users.id`. |
| **ticket_id** | integer (int4) | ✓ | Identifies the `jml_tickets` record. No enforced FK shown. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the mapping was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This table is the **link between a JML ticket and the concrete user record it produced or modifies** — for a Joiner ticket, this connects the newly-created `users.id` back to the originating ticket; for a Mover/Leaver ticket, it connects the existing user being changed.
- This is likely the mechanism referenced in the earlier ECRM users-report documentation as the **secondary requester path via `jml_tickets` for `org_mgt`/`tech_support`/`agency_mgt` users** — this bridge table is what allows a user's approval/requester chain to be traced through the JML workflow rather than solely through `user_approval_maps`.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - `user_id` or `ticket_id` matches the target user/ticket, to trace a user's JML origin or a ticket's resulting user account

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| user_ticket_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Records

| id | user_id | ticket_id | is_deleted |
| --- | --- | --- | --- |
| 1 | 27143 | 1 | false |
| 2 | 27322 | 5 | false |
| 3 | 27324 | 4 | false |

---

---

#### <span style="color:#B9770E">Table: `user_ticket_role_maps`</span>
##### Purpose

Bridge table linking a JML ticket to a specific role context for a user — likely capturing which role a user held/was assigned to **at the time** of a given ticket action, supporting historical role-change tracing distinct from a user's current live role.

**Primary Key:** `id`

> **Note:** Although `ticket_id` and `user_id` appear to reference `jml_tickets.id` and `users.id` respectively, the database does **not** currently enforce foreign key constraints on either column in the structure provided.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the mapping record. Auto-generated using the `user_ticket_role_maps_id_seq` sequence. |
| **ticket_id** | integer (int4) | ✓ | Identifies the `jml_tickets` record this role association belongs to. No enforced FK shown. |
| **user_id** | integer (int4) | ✓ | Identifies the user this ticket/role association concerns. No enforced FK to `users.id`. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the mapping was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This table pairs a **ticket** with a **user** — structurally very similar to `user_ticket_maps`, and the precise distinction in business purpose between the two (e.g., whether this table specifically captures a Mover ticket's *previous* role association versus `user_ticket_maps`' general user-ticket link) should be confirmed with the application team, since neither table's column list makes the distinction explicit.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - `ticket_id` and/or `user_id` match the target scope

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| user_ticket_role_maps_pkey | BTREE (PK) | id | Primary key lookups. |

#### <span style="color:#B9770E">Table: `bulk_assignment_tickets`</span>
##### Purpose

Supports **bulk BR assignment during campaign onboarding** — when a supervisor needs to assign multiple Business Representatives to a role, reporting line, and set of locations all at once (e.g., staffing up a campaign), a single ticket here captures the entire batch request as a JSON payload rather than requiring one ticket per user. The ticket is then routed to **HR for approval** before the assignments take effect. 

**Primary Key:** `id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the bulk assignment ticket. Auto-generated using the `bulk_assignment_tickets_id_seq` sequence. |
| **ticket_code** | varchar(50) | ✓ | Unique human-readable reference code for the bulk ticket (e.g., "BULK56459151"). |
| **requested_by** | integer (int4) | ✓ | Identifier of the supervisor/user who submitted this bulk assignment request. No enforced FK shown to `users.id`. |
| **requested_at** | timestamp |  | Timestamp the bulk request was submitted. Defaults to `CURRENT_TIMESTAMP`. |
| **bulk_data** | jsonb | ✓ | The full bulk-assignment payload: `role_id` to assign, an array of `user_ids` (the BRs being assigned in this batch), the `reportto_id` (reporting-line manager/role), and an array of `location_ids` granting geographic scope to all users in the batch. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **requester_agency** | integer (int4) |  | Identifies the external agency the requester belongs to, if the request originated from an agency rather than an internal user. |
| **requester_email** | varchar(250) |  | Email of the person who submitted the bulk request. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |

---

##### Key Notes / Business Rules

- This table exists specifically to support **campaign-time bulk BR onboarding** — when a supervisor needs to staff up a campaign with many BRs at once, they submit a single bulk ticket rather than individually assigning each user's role, reporting line, and locations one by one.
- **`bulk_data`** encodes everything needed to execute the assignment in one shot: `role_id`, `user_ids` (array), `reportto_id`, and `location_ids` (array). The per-batch approval outcome is tracked separately in `bulk_assignment_ticket_status_maps`.
- Once submitted, the ticket is routed to **HR for approval** — the assignments described in `bulk_data` are only applied to the actual role/location tables after HR signs off.
- **`ticket_code`** is enforced unique, giving each bulk batch a stable, referenceable external identifier.
- **`requester_agency`** allows this workflow to originate from an external agency (not just internal ECRM users/supervisors).
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - joined to `bulk_assignment_ticket_status_maps` for current HR-approval status

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| bulk_assignment_tickets_pkey | BTREE (PK) | id | Primary key lookups. |
| bulk_assignment_tickets_ticket_code_key | BTREE (UNIQUE) | ticket_code | Enforces uniqueness of the external ticket reference code and speeds up lookups by code. |

---

##### Example Record

| id | ticket_code | requested_by | requester_agency | bulk_data (role_id / user count / locations) |
| --- | --- | --- | --- | --- |
| 1 | BULK56459151 | 34293 | 11 | role_id: 1, 1 user, 5 locations |

---

---

#### <span style="color:#B9770E">Table: `bulk_assignment_ticket_status_maps`</span>
##### Purpose

Tracks the **HR approval status history** for a `bulk_assignment_tickets` record. Each row represents one status entry in the approval workflow for a given bulk BR-assignment request, preserving who acted on it and any comments — giving the supervisor visibility into whether their campaign staffing request has been approved by HR.

**Primary Key:** `id`

**Foreign Key:** `ticket_id → bulk_assignment_tickets.id`

> **Note:** Although `created_by` appears to reference a user record, the database does **not** currently enforce a foreign key constraint on this column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the status record. Auto-generated using the `bulk_assignment_ticket_status_maps_id_seq` sequence. |
| **ticket_id (FK)** | integer (int4) | ✓ | References `bulk_assignment_tickets.id`. Identifies which bulk assignment ticket this status entry belongs to. |
| **status** | integer (int4) |  | Coded status value at this point in the bulk ticket's HR-approval workflow. Default `4`, likely representing a "pending" initial state. |
| **created_by** | integer (int4) | ✓ | Identifies the user (typically an HR approver) who performed/recorded this status change. No enforced FK to `users.id`. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when this status entry was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **is_active** | boolean (bool) | ✓ | Whether this status entry represents the currently active/live status for the bulk ticket. `NOT NULL`, default `true`. |
| **comments** | text |  | Optional free-text comments accompanying this status change (e.g., an HR approver's notes). Nullable — not populated in sample data. |

---

##### Key Notes / Business Rules

- This table is the **HR-approval audit trail** for bulk BR-assignment requests submitted during campaign staffing — each status change (e.g., pending → approved/rejected) gets its own row rather than overwriting a single status field on the parent ticket.
- **`status` defaulting to `4`** suggests a "pending" initial state, consistent with the same numeric convention used elsewhere in the schema for status codes.
- **`is_active`** flags the currently-live status among potentially several historical rows for the same `ticket_id` — a bulk ticket's approval history can be reconstructed in full while still allowing a quick "what's the current status" lookup.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - `is_active = true` to get a bulk ticket's current HR-approval status, or the full row set for audit history

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| bulk_assignment_ticket_status_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Records

| id | ticket_id | status | created_by | is_active |
| --- | --- | --- | --- | --- |
| 1 | 1 | 4 | 34293 | false |
| 2 | 2 | 4 | 34348 | false |


---

<a id="module-4"></a>

## <span style="color:#1A5276">Module 4: Location & Geography Hierarchy</span>

*12 item(s) in this module.*

#### <span style="color:#B9770E">Table: `locations`</span>
##### Purpose

Master **adjacency-list hierarchy** of all geographic/organizational location nodes — Region, Area, Territory, Point, Route, Cluster, and Outlet — modeled as a single self-referential tree. Each node's level is classified via `type` (FK to `hierarchy`), and its position in the tree via `parent` (self-referential FK). This is the core structure that drives role-based location scoping, campaign targeting, and field reporting across ECRM.

**Primary Key:** `id`

**Foreign Keys:** `type → hierarchy.id`, `parent → locations.id` (self-referential)

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key. Auto-generated using the `locations_id_seq` sequence. |
| **name** | varchar(255) | ✓ | Display name of the location node (e.g., a specific outlet name, route name, region name). |
| **parent** | integer (int4) |  | Self-referential FK to `locations.id`. `NULL` indicates a root-level node (typically a Region). Defines the tree structure. |
| **type (FK)** | integer (int4) | ✓ | References `hierarchy.id`. Classifies which level of the hierarchy this node represents (Region, Area, Territory, Point, Route, Cluster, Outlet). |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamptz |  | Timestamp when the record was created. Defaults to `now()`. **Note:** timezone-aware (`timestamptz`), unlike most other tables in the schema which use plain `timestamp`. |
| **updated_at** | timestamptz |  | Timestamp of the most recent update. Defaults to `now()`. Also timezone-aware. |
| **active** | boolean (bool) | ✓ | Whether this location node is currently active/in-use. Default `true`. Distinct from `is_deleted` — a node can be inactive without being deleted (e.g., a temporarily suspended outlet). |
| **source_id** | integer (int4) |  | Identifier linking this location back to an originating source system record (e.g., an outlet's ID in an external retailer database). No enforced FK — business meaning depends on the migration/source context. |

---

##### Key Notes / Business Rules

- This is the **single master hierarchy table** for all geographic and organizational scoping in ECRM — Region down to Outlet all live in one self-referential tree rather than separate tables per level.
- **`type`** determines which level a node sits at, and must be interpreted alongside `hierarchy` (e.g., `type = 8` = Outlet, `type = 1` = Region).
- **`is_deleted`** and **`active`** are two distinct flags — `is_deleted` marks a logically removed record, while `active` marks whether an existing node is currently operational.
- **`source_id`** supports cross-referencing nodes back to legacy/external systems during data migration, but is not database-enforced.
- Role-based location scoping (via `role_location_maps` and related materialized views like `all_locations_region_to_outlet`) walks this tree upward/downward using `parent`.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - `active = true`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| locations_pkey | BTREE (PK) | id | Primary key lookups. |
| locations_type_idx | BTREE | type | Speeds up filtering nodes by hierarchy level (e.g., "all Outlets"). |
| idx_locations_parent | BTREE | parent | Speeds up child-lookup traversal from a parent node. |
| locations_parent_idx | BTREE | parent | **Duplicate** of `idx_locations_parent` — same column, functionally redundant. Candidate for consolidation to reduce write overhead. |
| locations_id_idx | BTREE | id, type, is_deleted, active | Composite covering index supporting common filtered lookups by id with type/status checks. |
| idx_location_id_parent | BTREE | id, parent | Supports combined id+parent lookups, likely used in recursive CTE traversal. |

---

---

#### <span style="color:#B9770E">Table: `hierarchy`</span>
##### Purpose

Defines the **fixed set of levels** that make up the `locations` tree (Region, Area, Territory, Point, House, Route, Cluster, Outlet), including their own parent-child ordering and which levels act as a "terminal" node for the two distinct downstream location chains used in the system (field-force scoping vs. retail/outlet scoping).

**Primary Key:** `id`

**Foreign Key:** `parent → hierarchy.id` (self-referential)

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key. Auto-generated using the `hierarchy_id_seq` sequence. |
| **name** | varchar(255) | ✓ | Name of the hierarchy level (e.g., "Region", "Territory", "Outlet"). |
| **parent** | integer (int4) |  | Self-referential FK to `hierarchy.id`. Defines which level this level sits directly beneath (e.g., "Area" has `parent` = "Region"'s id). |
| **ff_terminal** | boolean (bool) | ✓ | Flags this level as the **terminal node for field-force (role/user) scoping** — i.e., roles are assigned down to this level. Default `false`. Set `true` on "Point" in current data. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. Marks a hierarchy level as deprecated/no longer in active use (e.g., "House" in current data). |
| **rtl_terminal** | boolean (bool) | ✓ | Flags this level as the **terminal node for retail/outlet scoping** — the lowest level representing a physical sellable outlet. Default `false`. Set `true` on "Outlet" in current data. |

---

##### Key Notes / Business Rules

- This is a small, largely **static configuration table** — it defines the shape of the `locations` tree rather than data itself.
- Current active chain: **Region → Area → Territory → Point → Route → Cluster → Outlet**. "Point" is flagged `ff_terminal = true` (bottom of the field-force role-assignment chain), and "Outlet" is flagged `rtl_terminal = true` (bottom of the retail/outlet chain).
- **"House"** exists in the table but is marked `is_deleted = true` — a deprecated legacy branch that once hung off "Territory" alongside "Point".
- **`ff_terminal`** and **`rtl_terminal`** are not mutually exclusive by design, but in current data only one level in the whole tree carries each flag — they mark the two distinct "bottom of scoping" points used by different parts of the application (role assignment vs. outlet-level retail reporting).
- Soft deletion is handled using **`is_deleted`**.
- During reporting/traversal, the application generally retrieves records where:
    - `is_deleted = false`
    - filtered further by `ff_terminal` or `rtl_terminal` depending on whether the query is scoping roles or scoping retail outlets

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| hierarchy_pkey | BTREE (PK) | id | Primary key lookups. |
| idx_hierarchy_id | BTREE | id | **Duplicate** of the primary key index — same single column as `hierarchy_pkey`, functionally redundant. |

---

##### Example Records

| id | name | parent | ff_terminal | is_deleted | rtl_terminal |
| --- | --- | --- | --- | --- | --- |
| 1 | Region | NULL | false | false | false |
| 2 | Area | 1 | false | false | false |
| 3 | Territory | 2 | false | false | false |
| 4 | House | 3 | false | **true** | false |
| 5 | Point | 3 | **true** | false | false |
| 6 | Route | 5 | false | false | false |
| 7 | Cluster | 6 | false | false | false |
| 8 | Outlet | 7 | false | false | **true** |

---

---

#### <span style="color:#B9770E">View: `all_locations_region_to_outlet` *(Materialized View)*</span>
##### Purpose

Flattens the recursive `locations` adjacency list into a single denormalized row per Outlet — Region through Outlet, plus a `retailer_code` and `house_id` pulled from an external retailer source table. Exists purely for **performance**: querying this materialized view avoids repeated recursive CTE traversal of `locations` for every report/dashboard that needs the full geography path for an outlet. Referenced in prior optimization work as delivering roughly a 3.4x speed improvement over the equivalent live recursive query.

**Type:** Materialized View (not a base table — no primary key)

**Underlying Sources:** `ecrm.locations` (self-joined 7×, one per hierarchy level), `manushtech_data.retailers-00-00-00` (external retailer table, joined via `rds_outlet_id`), and `ecrm.all_old_location` (legacy flat fallback, combined via `UNION`).

---

##### Column Definitions

| Column | Data Type | Description |
| --- | --- | --- |
| **region_id** | int4 | Region-level node identifier. |
| **region** | varchar | Region-level node name. |
| **area_id** | int4 | Area-level node identifier. |
| **area** | varchar | Area-level node name. |
| **territory_id** | int4 | Territory-level node identifier. |
| **territory** | varchar | Territory-level node name. |
| **house_id** | int4 | **Not** from the deprecated `hierarchy` "House" level — pulled instead from `distributor_id` on the external `manushtech_data.retailers-00-00-00` table. Represents the distributor associated with the outlet. |
| **house** | varchar | Distributor/house name, pulled from the `"House"` column on the same external retailer table. |
| **point_id** | int4 | Point-level node identifier (the field-force role-scoping terminal level). |
| **point** | varchar | Point-level node name. |
| **route_id** | int4 | Route-level node identifier. |
| **route** | varchar | Route-level node name. |
| **cluster_id** | int4 | Cluster-level node identifier. |
| **cluster** | varchar | Cluster-level node name. |
| **outlet_id** | int4 | Outlet-level node identifier (the retail-scoping terminal level). |
| **outlet** | varchar | Outlet-level node name. |
| **retailer_code** | varchar | The outlet's retailer code, sourced from `"Outlet_Code"` on the external retailer table. |
| **is_active** | bool | Whether the outlet node is active, sourced from `locations.active`. |

---

##### Key Notes / Business Rules

- Built via a left-join chain walking **Outlet → Cluster → Route → Point → Territory → Area → Region**, filtering each joined node to its expected `type` (`8, 7, 6, 5, 3, 2, 1` respectively) and requiring `ou.active = true`.
- `UNION`'d with `all_old_location`, a legacy flat table — this means the view includes both outlets already migrated into the new `locations` adjacency-list structure **and** outlets still only present in the old flat structure, bridging the ongoing location-migration process.
- This view exists to serve **reporting and dashboard queries** that need the full geography path for an outlet without paying the cost of a live recursive traversal each time.
- Because it's a **materialized** view, it must be refreshed (e.g., `REFRESH MATERIALIZED VIEW`) for changes to `locations`, `hierarchy`, or the external retailer table to be reflected — it is not live/real-time.
- The `UNION` (not `UNION ALL`) with `all_old_location` means duplicate/conflicting rows could theoretically appear for an outlet present in both sources during migration — worth monitoring until migration is complete.
- During reporting, the application generally retrieves records where:
    - `is_active = true`

---

##### Performance / Recommendations

- A lighter-weight companion view scoped only to Region → Point (`all_locations_region_to_point`) exists for queries that don't need Route/Cluster/Outlet granularity — prefer that when outlet-level detail isn't needed, to reduce join cost.
- Since this is a `UNION` (not `UNION ALL`), Postgres performs an implicit deduplication pass across the full result set — if the two sources are already known to be mutually exclusive (new vs. not-yet-migrated outlets), switching to `UNION ALL` would avoid the dedup overhead.

---

---

#### <span style="color:#B9770E">Table: `all_old_location`</span>
##### Purpose

Legacy **flat (non-hierarchical) location reference table** that stores the complete **Region → Area → Territory → House → Point → Route → Cluster → Outlet** hierarchy in a single record.

This table predates the current `locations` adjacency-list model and is retained primarily for **backward compatibility with legacy reports**. It acts as a fallback reference for outlets that have not yet been migrated into the new `locations` hierarchy.

The table is also consumed by the `all_locations_region_to_outlet` view, which combines both the new hierarchical location structure and this legacy dataset to provide a unified location reference for reporting.

To ensure historical reports continued to function correctly, this table preserves the previous location hierarchy.

Typical usage includes:

- Legacy report generation
- Historical data compatibility
- Migration validation
- Fallback location lookup

**Primary Key:** None identified — no `id` column present in the structure provided; the table appears to function as a flat reference/staging set rather than a normally keyed table.

> **Note:** No foreign key constraints are defined on any of the `*_id` columns — all relationships to `locations` or other tables are logical only, not enforced at the database level.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **region_id** | integer (int4) |  | Region-level node identifier. Not enforced against `locations.id`. |
| **region** | varchar(255) |  | Region-level node name. |
| **area_id** | integer (int4) |  | Area-level node identifier. |
| **area** | varchar(255) |  | Area-level node name. |
| **territory_id** | integer (int4) |  | Territory-level node identifier. |
| **territory** | varchar(255) |  | Territory-level node name. |
| **house_id** | integer (int4) |  | House/distributor-level node identifier. |
| **house** | varchar |  | House/distributor name. |
| **point_id** | integer (int4) |  | Point-level node identifier. |
| **point** | varchar(255) |  | Point-level node name. |
| **route_id** | integer (int4) |  | Route-level node identifier. |
| **route** | varchar(255) |  | Route-level node name. |
| **cluster_id** | integer (int4) |  | Cluster-level node identifier. |
| **cluster** | varchar(255) |  | Cluster-level node name. |
| **outlet_id** | integer (int4) |  | Outlet-level node identifier. |
| **outlet** | varchar(255) |  | Outlet-level node name. |
| **retailer_code** | varchar |  | Retailer/outlet code. |
| **is_active** | boolean (bool) |  | Whether the outlet was considered active in the legacy structure. |

---

##### Key Notes / Business Rules

- This table is a **transitional artifact** of the location-migration process — it exists to hold pre-migration flat location data until every outlet has a corresponding row in the new `locations` adjacency-list tree.
- No columns are `NOT NULL` and no primary key or foreign keys are enforced — treat this as a **staging/reference dataset**, not a normally governed operational table.
- Every `_id` field is a logical pointer only; joins against `locations.id` or other master tables should be validated carefully rather than assumed reliable.
- As migration progresses, the row count in this table should trend toward zero — a growing or static count may indicate stalled migration.
- During reporting, the application generally retrieves records where:
    - `is_active = true`

---

---

#### <span style="color:#B9770E">Table: `geo_location`</span>
##### Purpose

Stores the **effective-dated geofence center point** for a location node (per the inline comment, `location_id` refers specifically to a Cluster-level id), enabling geo-validation logic (as used in `daily_checks`) to compare a user's check-in coordinates against the correct geofence point for the correct time period — mirroring the same time-aware pattern used for SKU pricing in `sku_item_price`.

**Primary Key:** `id`

> **Note:** Although `location_id` conceptually maps to `locations.id` (specifically a Cluster-type node, per internal documentation), the database does **not** currently enforce a foreign key constraint on this column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key. Auto-generated using the `geo_location_id_seq1` sequence. |
| **location_id** | integer (int4) | ✓ | Intended to reference `locations.id` — specifically a Cluster-level node, per internal usage notes. No enforced FK. |
| **point** | geometry |  | Geofence center coordinate (PostGIS geometry, SRID 3857). **Note:** sample data shows `POINT(0 0)` ("Null Island") for several rows — likely a placeholder/unset value rather than a real coordinate, worth excluding or flagging in geo-validation logic to avoid false geofence failures. |
| **from_date** | date | ✓ | Start of this geofence point's effective period. |
| **to_date** | date |  | End of this geofence point's effective period. Defaults to the sentinel `9999-12-31` (open-ended/current), same pattern as `sku_item_price.to_date` — not `NULL`. |
| **is_current** | boolean (bool) | ✓ | Flags whether this is the presently active geofence point for the location. Default `true`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This is a **time-versioned geofence history** table, following the same effective-dating pattern as `sku_item_price`: `from_date`/`to_date` define the validity window, and `is_current` flags the active row.
- **`location_id`** is documented to represent a Cluster-level location specifically (not any arbitrary `locations` node), but this is an application-layer convention only — nothing in the schema enforces it.
- Sample data containing `POINT(0 0)` suggests some rows may hold unset/placeholder coordinates rather than genuine geofence centers — these should likely be filtered out or corrected before being used in geo-validation comparisons (e.g., in `daily_checks.geo_validated` logic), since a `(0,0)` geofence would make every real check-in fail.
- Time-aware lookup follows the same pattern as pricing: find the applicable geofence point via `WHERE check_date BETWEEN from_date AND to_date`, rather than relying solely on `is_current`, when validating historical check-ins.
- Soft deletion is not implemented on this table — no `is_deleted` column exists.
- During reporting, the application generally retrieves records where:
    - `is_current = true`
    - `location_id` matches the target Cluster

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| geo_location_pkey | BTREE (PK) | id | Primary key lookups. |
| geo_location_location_id_idx | BTREE | location_id, is_current | Speeds up the standard "current geofence for this location" lookup pattern. |

---

##### Example Records

| id | location_id | point | from_date | to_date | is_current |
| --- | --- | --- | --- | --- | --- |
| 1785466 | 1831421 | POINT(0 0) | 2026-07-09 | 9999-12-31 | true |
| 1786159 | 1831765 | POINT(0 0) | 2026-07-09 | 9999-12-31 | true |
| 1784967 | 1832512 | POINT(0 0) | 2026-07-09 | 9999-12-31 | true |

*(Note: all three sample rows share the same `from_date` of 2026-07-09 and identical `POINT(0 0)` coordinates — consistent with a bulk-insert placeholder batch rather than individually surveyed geofence points. Worth confirming with the team whether these specific rows have since been backfilled with real coordinates.)*

#### <span style="color:#B9770E">View: `region_dp`</span>
##### Purpose

Flattens the recursive `locations` adjacency list into a single denormalized row per Distributor Point (DP) — Region through DP — for direct reporting use without recursive traversal. A per note, this view is **used across multiple ECRM resources/functions** as a shared, reusable geography-lookup utility rather than being tied to a single report.

**Type:** Query/View definition (not a physical base table)

**Underlying Sources:** `ecrm.locations` (self-joined 4×, aliased `re`/`ar`/`ter`/`dp` — one per hierarchy level)

---

##### Column Definitions

| Column | Data Type | Description |
| --- | --- | --- |
| **region_id** | integer | Region-level node identifier. |
| **region_name** | varchar(255) | Region-level node name. |
| **area_id** | integer | Area-level node identifier. |
| **area_name** | varchar(255) | Area-level node name. |
| **terr_id** | integer | Territory-level node identifier. |
| **ter_name** | varchar(255) | Territory-level node name. |
| **dpid** | integer | Distributor Point (DP) identifier — a Point-level node in the `locations` hierarchy (`type = 5`). |
| **dp_name** | varchar(255) | Distributor Point (DP) name. |

---

##### Business Logic

sql

```sql
SELECT re.idAS region_id, re.nameAS region_name,    ar.idAS area_id, ar.nameAS area_name,    ter.idAS terr_id, ter.nameAS ter_name,    dp.idAS dpid, dp.nameAS dp_nameFROM ecrm.locations re, ecrm.locations ar, ecrm.locations ter, ecrm.locations dpWHERE re.id= ar.parentAND ar.id= ter.parentAND ter.id= dp.parentAND re.type=1AND ar.type=2AND ter.type=3AND dp.type=5AND re.activeISTRUEAND ar.activeISTRUEAND ter.activeISTRUEAND re.is_deletedISFALSEAND ar.is_deletedISFALSEAND ter.is_deletedISFALSEAND dp.is_deletedISFALSE;
```

- Uses an old-style **implicit cross-join with `WHERE`clause parent matching**, rather than explicit `JOIN ... ON` syntax — functionally equivalent but less readable/maintainable than the explicit-join style used in `all_locations_region_to_outlet`/`dp_ter_area_region`.
- Walks **Region → Area → Territory → DP (Point)**, filtering each aliased node to its expected `type` (`1, 2, 3, 5` respectively).
- **Note:** `re`, `ar`, and `ter` are filtered on both `active IS TRUE` and `is_deleted IS FALSE`, but **`dp` is only filtered on `is_deleted IS FALSE`** — `dp.active` is **not** checked. This means an inactive DP can still appear in this view's results as long as it isn't soft-deleted, which is an inconsistency worth flagging relative to the other three levels.

##### Key Notes / Business Rules

- **DP ("Distributor Point")** here corresponds to the `hierarchy` level with `type = 5` — i.e., what's referred to elsewhere in this schema as "Point" (the field-force role-scoping terminal level, per `hierarchy.ff_terminal`).
- This view is a **shared, reusable geography-lookup utility** referenced by multiple ECRM functions/resources — changes to its filtering logic should be considered carefully since they could affect several downstream consumers at once.
- The **inconsistent `active` filtering on `dp`** (missing relative to `re`/`ar`/`ter`) means inactive DPs are not excluded here — worth confirming with the application team whether this is intentional (e.g., DPs are rarely marked inactive in practice) or an oversight.
- No materialized-view refresh consideration applies here since this is a **plain (non-materialized) view** — it always reflects live `locations` data at query time, unlike `all_locations_region_to_outlet`.

---

##### Example Record

| region_id | region_name | area_id | area_name | terr_id | ter_name | dpid | dp_name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2 | Sylhet | 508 | Narsingdi | 1029 | Bhairab | 2414 | Kuliarchar |

---

---

#### <span style="color:#B9770E">Table: `region_area`</span>
##### Purpose

> **Limited information available.** Only two columns were provided for this table, with no ID/primary key, timestamps, or other metadata shown. Based on the column names, this appears to be a minimal mapping between an area and its parent region — but given how sparse the structure is, I'd recommend confirming the full column list with your team before treating this documentation as complete.
> 

**Primary Key:** Not identified — no `id` column shown in the structure provided.

---

##### Column Definitions (partial — based on limited structure provided)

| Column | Data Type | Description |
| --- | --- | --- |
| **parent** | integer (int4) | Presumed to reference a Region-level `locations.id`. |
| **area** | integer (int4) | Presumed to reference an Area-level `locations.id`, child of `parent`. |

---

##### Key Notes / Business Rules

- This table's exact purpose and full column list could not be confirmed from the structure provided — it may be a simple lookup/staging table mirroring part of the `locations` hierarchy for a specific reporting or filtering use case, similar in spirit to `region_dp`/`dp_region`, but scoped only to Region→Area.
- Recommend sharing the full `\d` structure (including any `id`, timestamp, or `is_deleted` columns) for a complete, non-partial documentation entry.

---

##### Example Records

| parent | area |
| --- | --- |
| 2 | 31 |
| 2 | 32 |

---

---

#### <span style="color:#B9770E">View: `dp_ter_area_region`</span>
##### Purpose

Flattens the recursive `locations` adjacency list into a single denormalized row per Distributor Point (DP) — Region through DP — functionally very similar to `region_dp`, but written with explicit `JOIN` syntax and a narrower active/deletion filter scope.

**Type:** Query/View definition (not a physical base table)

**Underlying Sources:** `ecrm.locations` (self-joined 4×, aliased `re`/`ar`/`ter`/`dp`)

---

##### Column Definitions

| Column | Data Type | Description |
| --- | --- | --- |
| **region_id** | int4 | Region-level node identifier. |
| **region_name** | varchar | Region-level node name. |
| **area_id** | int4 | Area-level node identifier. |
| **area_name** | varchar | Area-level node name. |
| **ter_id** | int4 | Territory-level node identifier. |
| **ter_name** | varchar | Territory-level node name. |
| **dp_id** | int4 | Distributor Point (DP) identifier. |
| **dp_name** | varchar | Distributor Point (DP) name. |

---

##### Business Logic

sql

```sql
SELECT re.idAS region_id, re.nameAS region_name,    ar.idAS area_id, ar.nameAS area_name,    ter.idAS ter_id, ter.nameAS ter_name,    dp.idAS dp_id, dp.nameAS dp_nameFROM ecrm.locations reJOIN ecrm.locations arON re.id= ar.parentJOIN ecrm.locations terON ar.id= ter.parentJOIN ecrm.locations dpON ter.id= dp.parentAND dp.type=5AND dp.activeISTRUEAND dp.is_deletedISFALSE;
```

- Uses explicit `JOIN ... ON` syntax to walk **Region → Area → Territory → DP**.
- **Note:** unlike `region_dp`, this view does **not** filter `re`, `ar`, or `ter` on `type`, `active`, or `is_deleted` at all — **only `dp` is filtered** (on `type = 5`, `active IS TRUE`, and `is_deleted IS FALSE`). This is the inverse gap from `region_dp` (which filtered `re`/`ar`/`ter` but not `dp.active`), and means this view could theoretically include inactive or soft-deleted Region/Area/Territory nodes in its output.

##### Key Notes / Business Rules

- This view is **functionally near-identical to `region_dp`** in intent (same four-level DP flattening), but the two views apply **different and inconsistent filtering rules** — `region_dp` checks `active`/`is_deleted` on the upper three levels but not `dp.active`; this view checks all three conditions on `dp` but nothing on the upper three levels. Having two views with the same apparent purpose but different filter logic is a data-consistency risk: they could return different result sets for the same underlying data, depending on which levels have inactive/deleted nodes.
- Recommend consolidating `region_dp` and `dp_ter_area_region` into a single canonical view (or clearly documenting why both exist and which one downstream consumers should prefer) to avoid divergent reporting results.
- **DP** here follows the same `type = 5` ("Point") convention as `region_dp`.

---

##### Example Record

*(No sample data row was provided for this specific view; refer to `region_dp`'s example, which shares the same shape.)*

---

---

#### <span style="color:#B9770E">View: `dp_route_clusters`</span>
##### Purpose

Flattens the recursive `locations` adjacency list into a single denormalized row per Cluster, walking **DP → Route → Cluster** — the lower half of the full location hierarchy, complementing `region_dp`/`dp_ter_area_region` (which cover the upper half, Region → DP).

**Type:** Query/View definition (not a physical base table)

**Underlying Sources:** `ecrm.locations` (self-joined 3×, aliased `dp`/`rt`/`cl`)

---

##### Column Definitions

| Column | Data Type | Description |
| --- | --- | --- |
| **dpid** | integer | Distributor Point (DP) identifier. |
| **dp_name** | varchar(255) | Distributor Point (DP) name. |
| **rtid** | integer | Route-level node identifier. |
| **route_name** | varchar(255) | Route-level node name. |
| **cid** | integer | Cluster-level node identifier. |
| **cluster_name** | varchar(255) | Cluster-level node name. |

---

##### Business Logic

sql

```sql
SELECT dp.idAS dpid, dp.nameAS dp_name,    rt.idAS rtid, rt.nameAS route_name,    cl.idAS cid, cl.nameAS cluster_nameFROM ecrm.locations dp, ecrm.locations rt, ecrm.locations clWHERE dp.id= rt.parentAND rt.id= cl.parentAND dp.type=5AND rt.type=6AND cl.type=7AND dp.is_deletedISFALSEAND rt.is_deletedISFALSEAND cl.is_deletedISFALSEAND dp.activeISTRUEAND rt.activeISTRUEAND cl.activeISTRUE;
```

- Uses the same **implicit cross-join with `WHERE`clause parent matching** style as `region_dp`.
- Walks **DP (Point, `type=5`) → Route (`type=6`) → Cluster (`type=7`)**, consistently filtering **all three levels** on both `active IS TRUE` and `is_deleted IS FALSE` — unlike the inconsistent filtering seen in `region_dp`/`dp_ter_area_region`.

##### Key Notes / Business Rules

- This view provides the **lower half of the location hierarchy** (DP → Route → Cluster), while `region_dp`/`dp_ter_area_region` provide the **upper half** (Region → Area → Territory → DP) — together they can be joined on `dpid` to reconstruct the full Region-to-Cluster path, similar in coverage to `all_locations_region_to_outlet` but without the Outlet level.
- Unlike its sibling views, this one applies **consistent active/deletion filtering across all three joined levels** — the most reliable of the three location-flattening views documented so far in terms of filter consistency.
- A single DP can have multiple Route→Cluster combinations underneath it (sample data shows DP 2414 "Kuliarchar" with route "406B" mapping to two different clusters) — reflecting the genuine one-to-many branching of the hierarchy at these levels.

---

##### Example Records

| dpid | dp_name | rtid | route_name | cid | cluster_name |
| --- | --- | --- | --- | --- | --- |
| 2414 | Kuliarchar | 1619771 | 406B | 1694714 | Berybad Nikly |
| 2414 | Kuliarchar | 1619771 | 406B | 1694715 | Purvo Gram Berybad |

---

---

#### <span style="color:#B9770E">Table: `dp_region`</span>
##### Purpose

A flat, pre-computed mapping of each Distributor Point (DP) to its parent Region — a lighter-weight companion to `region_dp`, providing only the Region-to-DP relationship without the intermediate Area/Territory levels. No underlying query was provided, suggesting this is a physically stored table (or materialized view) rather than a live view.

**Primary Key:** Not identified — no `id` column shown in the structure provided.

> **Note:** Column ordering in the structure provided doesn't match a typical `id`-first convention (`region_id` is listed as column 1, `re_name` as column 2), and no sequence/auto-increment default is shown — consistent with this being a denormalized reference table rather than a standard application-managed table.
> 

---

##### Column Definitions

| Column | Data Type | Description |
| --- | --- | --- |
| **region_id** | integer (int4) | Region-level node identifier. |
| **re_name** | varchar(255) | Region-level node name. |
| **dpid** | integer (int4) | Distributor Point (DP) identifier. |
| **dp_name** | varchar(255) | Distributor Point (DP) name. |

---

##### Key Notes / Business Rules

- This table provides a **simplified Region-to-DP lookup** without the Area/Territory levels present in `region_dp`/`dp_ter_area_region` — likely used where only the top and bottom of the upper hierarchy matter for a given report.
- Given the lack of any query definition, this is likely a **denormalized/pre-computed reference table** (possibly refreshed periodically from `locations`), similar in spirit to `all_old_location`, rather than a live view.
- No soft-delete or timestamp columns exist — this table appears to be a simple, replaceable snapshot rather than an audited operational record.
- A single region maps to multiple DPs (sample data shows Region 1 "Dhaka South" with DPs "Gulshan" and "Dhanmondi").

---

##### Example Records

| region_id | re_name | dpid | dp_name |
| --- | --- | --- | --- |
| 1 | Dhaka South | 2001 | Gulshan |
| 1 | Dhaka South | 2002 | Dhanmondi |

---

---

#### <span style="color:#B9770E">Table: `breakstation_dp`</span>
##### Purpose

A simple reference list of Distributor Points (DPs) that participate in the **"Breakstation"** promotional program — the same "Break Station"/"Breakstation" concept referenced in campaign survey questions elsewhere in this schema (e.g., `telling_about_break_station`, `showing_bs_av` in `campaign_joint_call_maps`/`joint_calls_survey_data_maps`), where consumers are told about a Chorki subscription/entertainment offer tied to specific outlet locations.

**Primary Key:** Not identified — no `id` column shown in the structure provided.

---

##### Column Definitions

| Column | Data Type | Description |
| --- | --- | --- |
| **dpid** | integer (int4) | Distributor Point (DP) identifier participating in the Breakstation program. |
| **dp_name** | varchar | Distributor Point (DP) name. |

---

##### Key Notes / Business Rules

- This is a **simple eligibility/reference list** of DPs where the Breakstation promotional program is active — likely used to determine whether a BR should present the Breakstation messaging/offer during a contact at an outlet under one of these DPs.
- Directly relevant to the campaign survey questions seen earlier in `campaign_joint_call_maps`/`joint_calls_survey_data_maps` (`telling_about_break_station`, `telling_about_break_station_comms`, `showing_bs_av`, `telling_about_chorki_offer`) — this table likely determines the **scope** in which those questions/messages are relevant, while the more detailed per-cluster Breakstation configuration lives in `breakstation`.
- No soft-delete, timestamp, or status columns exist here — this appears to be a simple flat reference list, with actual status/effective-dating detail captured in the related `breakstation` table instead.

---

##### Example Records

| dpid | dp_name |
| --- | --- |
| 2221 | Bogura |
| 2149 | Khulna |
| 2263 | Rajshahi-1 |
| 2016 | Manikganj |

---

---

#### <span style="color:#B9770E">Table: `breakstation`</span>
##### Purpose

Master configuration table for the **"Breakstation"** promotional program at the Cluster level — tracking which clusters have an active Breakstation, its status, effective date range, and a mapping between legacy ("old") DP/Cluster IDs and their current equivalents in the `locations` hierarchy, along with an adjacent/nearby DP reference.

**Primary Key:** Not identified — no `id` column shown in the structure provided.

> **Note:** Although `dpid` and `cid` appear to reference current `locations.id` values (Point and Cluster level respectively), and `adjucent_dp` appears to reference another DP, the database does **not** show enforced foreign key constraints on any of these columns in the structure provided.
> 

---

##### Column Definitions

| Column | Data Type | Description |
| --- | --- | --- |
| **old_dpid** | integer (int4) | Legacy/pre-migration DP identifier, preserved for historical reference. |
| **dp_name** | varchar | DP name. |
| **old_cid** | integer (int4) | Legacy/pre-migration Cluster identifier, preserved for historical reference. |
| **cname** | varchar | Cluster name. |
| **break_stts** | integer (int4) | Status code of the Breakstation at this cluster (e.g., active/inactive). Allowed values managed by the application layer. |
| **from_date** | text | Start date of this Breakstation configuration's effective period. **Note:** stored as `text`, not `date` — a data-type inconsistency versus the properly-typed date columns used almost everywhere else in the schema, similar to the issue flagged on `proximity_report`. |
| **to_date** | text | End date of this Breakstation configuration's effective period. Also stored as `text`. Empty/blank in sample data, suggesting an open-ended/current configuration. |
| **is_current** | boolean (bool) | Flags whether this is the presently active Breakstation configuration for the cluster. |
| **adjucent_dp** | integer (int4) | Identifier of a nearby/adjacent DP relative to this Breakstation's location — likely used for coverage/routing decisions when the primary DP isn't directly serviceable. |
| **dpid** | integer (int4) | Current DP identifier (post-migration), referencing `locations.id`. |
| **cid** | integer (int4) | Current Cluster identifier (post-migration), referencing `locations.id`. |

---

##### Key Notes / Business Rules

- This table is the **detailed, cluster-level configuration record for the Breakstation program**, complementing the simpler DP-level eligibility list in `breakstation_dp`.
- **`old_dpid`/`old_cid`** versus **`dpid`/`cid`** follows the same "legacy ID migration" pattern seen in `all_old_location`/`all_locations_region_to_outlet` — this table bridges a pre-migration DP/Cluster identifier scheme with the current `locations`based hierarchy, useful for historical reporting continuity.
- **`from_date`/`to_date`** being stored as `text` rather than `date` is a data-integrity risk consistent with the issue flagged on `proximity_report` — sorting/filtering by effective date requires string-to-date casting rather than native date operations, and malformed date strings wouldn't be caught at the database level.
- **`is_current`** flags the active configuration, following the same effective-dating pattern used throughout the schema (`sku_item_price`, `geo_location`, `campaign_joint_call_maps`), though here without an enforced `date` type backing it.
- **`adjucent_dp`** (note: contains a typo — "adjucent" rather than "adjacent" — consistent naming should be used if this column is ever referenced in new code) supports scenarios where routing/coverage decisions need to consider a nearby DP.
- During reporting, the application generally retrieves records where:
    - `is_current = true`
    - `break_stts` indicates an active Breakstation

---

##### Performance / Recommendations

- Recommend converting `from_date`/`to_date` to proper `date` columns to support reliable range filtering and to catch malformed date entries at the database level, consistent with the same recommendation made for `proximity_report`.

---

##### Example Records

| old_dpid | dp_name | old_cid | cname | break_stts | is_current | adjucent_dp | dpid | cid |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 39 | Mirpur-1 | 11966 | 14 No. Goal Bari | 1 | true | 9 | 2039 | 54070 |
| 16 | Manikganj | 14810 | Akij Gate Golora | 1 | true | 9 | 2016 | 55074 |


---

<a id="module-5"></a>

## <span style="color:#1A5276">Module 5: Campaigns, Targets & Field-Force Staffing</span>

*14 item(s) in this module.*

#### <span style="color:#B9770E">Table: `users_campaign_maps`</span>
##### Purpose

Stores the assignment of users to campaigns within the ECRM system. Each record represents a user's authorization to participate in a campaign and records who performed the assignment. This table acts as the primary access control mechanism for campaign participation, ensuring that only assigned users can access and perform activities within a campaign.

**Primary Key:** `id`

---

##### Primary Key & Relationships

**Primary Key**

- **id** → Primary key for the user-campaign assignment record.

**Logical Relationships**

- **user_id** → `users.id`
- **campaign_id** → `campaigns.id`
- **assigned_by** → `users.id` (Assigning User)

> **Note:** `campaign_id` has a database-level foreign key constraint. Both `user_id` and `assigned_by` logically reference the `users` table. The `assigned_by` column represents the user who created the campaign assignment, making this a dual-actor relationship.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the campaign assignment record. Auto-generated using the `users_campaign_maps_id_seq1` sequence. |
| **user_id** | integer (int4) |  | Identifier of the user assigned to the campaign. Represents a user in the `users` table. |
| **campaign_id (FK)** | integer (int4) |  | Identifier of the assigned campaign. References the `campaigns` table. |
| **assignment_date** | date |  | Date on which the user was assigned to the campaign. |
| **assigned_by** | integer (int4) |  | Identifier of the user who assigned the campaign. Represents a user in the `users` table, typically a supervisor or administrator. |
| **is_deleted** | boolean |  | Soft-delete flag. `false` indicates an active assignment record, while `true` indicates the assignment has been logically deleted and retained for audit purposes. |
| **createdAt** | timestamp with time zone | ✓ | Timestamp when the campaign assignment record was created. |
| **updatedAt** | timestamp with time zone | ✓ | Timestamp of the most recent modification to the assignment record. |
| **is_current** | boolean |  | Indicates whether this record represents the user's current campaign assignment. `true` = active assignment, `false` = historical or inactive assignment. |
| **platform_type** | integer (int4) |  | Identifies the platform or source through which the campaign assignment was created or updated. The numeric values are defined by the application configuration. |

---

##### Key Notes / Business Rules

- This table serves as the **primary campaign assignment table** for users in the ECRM system.
- A user **must have an active assignment** in this table to access and participate in a campaign through the application.
- The **`assigned_by`** column records the user who performed the assignment, providing a complete audit trail of assignment activities.
- Users may have multiple assignment records over time for the same or different campaigns.
- The current active assignment is identified by:
    - `is_current = true`
    - `is_deleted = false`
- Historical assignment records are preserved by updating **`is_current`** to `false` rather than deleting records.
- The **`platform_type`** column records the source platform responsible for creating or updating the assignment. Its numeric values are maintained by the application configuration.
- This table is commonly used for:
    - Campaign access control
    - User-to-campaign assignment management
    - Assignment history tracking
    - Audit reporting
    - Campaign participant management

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| **users_campaign_maps_pkey1** | BTREE (Unique) | `id` | Primary key index ensuring uniqueness and enabling efficient retrieval by record ID. |
| **idx_users_campaign_maps_user_id** | BTREE | `user_id` | Optimizes queries that retrieve all campaign assignments for a specific user. |
| **idx_users_campaign_maps_assigned_by** | BTREE | `assigned_by` | Optimizes queries that retrieve campaign assignments created by a particular assigning user, supporting audit and administrative reporting. |

---

---

#### <span style="color:#B9770E">Table: `campaign_agency_maps`</span>
##### Purpose

Stores the association between campaigns and agencies within the ECRM system. Each record represents an agency responsible for executing a specific campaign. This table enables campaigns to be managed by one or more agencies, supporting multi-agency campaign execution while maintaining clear organizational ownership and operational responsibility.

**Primary Key:** `id`

---

##### Primary Key & Relationships

**Primary Key**

- **id** → Primary key for the campaign-agency mapping record.

**Relationships**

- **campaign_id** → `campaigns.id`
- **agency_id** → `agencies.id`

> **Note:** Both relationships are enforced through database-level foreign key constraints.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the campaign-agency mapping record. Auto-generated using the `campaign_agency_maps_id_seq` sequence. |
| **campaign_id (FK)** | integer (int4) | ✓ | Identifier of the campaign associated with the agency. References the `campaigns` table. |
| **agency_id (FK)** | integer (int4) | ✓ | Identifier of the agency responsible for executing the campaign. References the `agencies` table. |
| **is_deleted** | boolean | ✓ | Soft-delete flag. `false` indicates an active campaign-agency relationship, while `true` indicates the mapping has been logically removed but retained for audit purposes. |
| **createdAt** | timestamp with time zone | ✓ | Timestamp when the campaign-agency mapping was created. |
| **updatedAt** | timestamp with time zone | ✓ | Timestamp of the most recent modification to the mapping record. |

---

##### Key Notes / Business Rules

- This table establishes the relationship between **campaigns** and the **agencies** responsible for executing them.
- A **single campaign may be assigned to multiple agencies**, enabling collaborative or geographically distributed campaign execution.
- Likewise, an **agency may participate in multiple campaigns** over time, resulting in a many-to-many relationship between campaigns and agencies.
- Soft deletion is implemented using the **`is_deleted`** flag, allowing campaign-agency assignments to be retired while preserving historical records.
- This table is commonly used for:
    - Campaign execution management
    - Agency assignment and allocation
    - Agency-specific campaign reporting
    - Access control and data segmentation by agency
    - Historical tracking of campaign-agency relationships
- The application typically filters active assignments using:
    - `is_deleted = false`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| **campaign_agency_maps_pkey** | BTREE (Unique) | `id` | Primary key index ensuring uniqueness and enabling efficient retrieval of campaign-agency mapping records by ID. |

---

---

---

#### <span style="color:#B9770E">Table: `campaign_location_maps`</span>
##### Purpose

Stores the geographical coverage of campaigns by mapping campaigns to their assigned operational locations. In the ECRM system, each record associates a campaign with a specific **cluster** (stored in the `locations` table), defining where campaign activities can be performed. This table controls campaign availability, field force deployment, outlet visibility, and operational coverage.

**Primary Key:** `id`

---

##### Primary Key & Relationships

**Primary Key**

- **id** → Primary key for the campaign-location mapping record.

**Relationships**

- **campaign_id** → `campaigns.id`
- **location_id** → `locations.id` (**Represents a Cluster**)

> **Note:** Although `location_id` references the `locations` table, in this table it specifically represents the **assigned cluster** for the campaign rather than an arbitrary location level.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the campaign-location mapping record. Auto-generated using the `campaign_location_maps_id_seq` sequence. |
| **campaign_id (FK)** | integer (int4) | ✓ | Identifier of the campaign associated with the location assignment. References the `campaigns` table. |
| **location_id (FK)** | integer (int4) | ✓ | Identifier of the assigned **cluster** where the campaign is operational. References the `locations` table. |
| **priority** | integer (int4) | ✓ | Defines the priority or processing order of the assigned cluster within the campaign. The application uses this value when prioritizing campaign locations. Default value is `1`. |
| **is_deleted** | boolean |  | Soft-delete flag. `false` indicates an active campaign-location assignment, while `true` indicates the mapping has been logically deleted and retained for audit purposes. |
| **created_at** | timestamp |  | Timestamp when the campaign-location mapping was created. Automatically initialized with the current timestamp during record creation. |
| **updated_at** | timestamp |  | Timestamp of the most recent modification to the mapping record. Automatically maintained by the application. |

---

##### Key Notes / Business Rules

- This table defines the **geographical scope** of campaigns within the ECRM system.
- The **`location_id`** column represents a **cluster** in the location hierarchy rather than a generic location.
- A campaign may be assigned to **multiple clusters**, allowing campaign execution across different geographical areas.
- Likewise, a cluster may participate in multiple campaigns over time, creating a many-to-many relationship between campaigns and clusters.
- Soft deletion is implemented using the **`is_deleted`** flag, allowing campaign-location assignments to be retired while preserving historical records.
- This table is commonly used for:
    - Campaign geographical coverage
    - Cluster assignment
    - Field force deployment
    - Outlet eligibility
    - Campaign planning
    - Location-based reporting
- During campaign execution, only users, outlets, and operational activities associated with the assigned clusters are considered valid for the campaign.
- The application typically filters active assignments using:
    - `is_deleted = false`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| **campaign_location_maps_pkey** | BTREE (Unique) | `id` | Primary key index ensuring uniqueness and enabling efficient retrieval by record ID. |
| **idx_campaign_location_maps_campaign_id** | BTREE | `campaign_id` | Optimizes queries that retrieve all assigned clusters for a campaign. |
| **campaign_location_maps_campaign_id_idx** | BTREE | `(campaign_id, is_deleted)` | Composite index optimized for retrieving active cluster assignments for a campaign while filtering logically deleted records. |
| **idx_campaign_location_maps_location_id** | BTREE | `location_id` | Optimizes queries that retrieve campaigns assigned to a specific cluster. |
| **idx_campaign_location_maps_is_deleted** | BTREE | `is_deleted` | Optimizes queries that frequently filter records based on their deletion status, particularly when retrieving active campaign-location mappings. |

---

---

---

#### <span style="color:#B9770E">Table: `campaign_target_loc_maps`</span>
##### Purpose

Maps campaign targets to the operational clusters where they are applicable. This table distributes a campaign's KPI targets across geographical clusters, allowing different clusters to participate in the same campaign target configuration. It enables location-based target planning, assignment, achievement tracking, and reporting.

**Primary Key:** `id`

---

##### Primary Key & Relationships

##### Primary Key

- **id** → Primary key for the campaign target-location mapping record.

###### Relationships

- **target_id** → `campaign_targets.id`
- **loc_id** → `locations.id` (**Represents a Cluster – Location Type 7**)

> **Note:** Although `loc_id` references the `locations` table, it specifically stores **Cluster IDs (Location Type = 7)**. Campaign targets are assigned at the cluster level rather than higher levels such as Region, Area, Territory, or Distributor Point.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the campaign target-location mapping. Auto-generated using the `campaign_target_loc_maps_id_seq` sequence. |
| **target_id (FK)** | integer (int4) | ✓ | Identifier of the parent campaign target. References `campaign_targets.id`. Each mapping belongs to a single campaign target configuration. |
| **loc_id (FK)** | integer (int4) | ✓ | Identifier of the assigned **Cluster (Location Type = 7)** where the campaign target applies. References `locations.id`. Used to distribute campaign targets across operational clusters. |
| **is_deleted** | boolean |  | Soft-delete flag. `false` indicates an active mapping, while `true` indicates the mapping has been logically deleted and retained for audit purposes. |
| **created_at** | timestamp |  | Timestamp when the mapping record was created. Automatically populated during record insertion. |
| **updated_at** | timestamp |  | Timestamp of the most recent modification to the mapping record. Automatically maintained by the application. |

---

##### Key Notes / Business Rules

- This table distributes campaign KPI targets across **operational clusters**.
- The **`loc_id`** field always stores **Cluster IDs (Location Type = 7)** from the `locations` table.
- A single campaign target may be assigned to **multiple clusters**.
- Likewise, a cluster may participate in multiple campaign target configurations across different campaigns or reporting periods.
- Different clusters can have separate KPI configurations through different parent records in `campaign_targets`.
- Soft deletion is implemented using the **`is_deleted`** flag, preserving historical assignments while excluding inactive mappings from operational queries.
- The table is commonly used for:
    - Cluster-level KPI planning
    - Geographic target allocation
    - Campaign deployment
    - Target achievement reporting
    - Performance analytics by cluster
- Operational queries typically retrieve active mappings using:
    - `is_deleted = false`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| **campaign_target_loc_maps_pkey** | BTREE (Unique) | `id` | Primary key index ensuring uniqueness and efficient retrieval by mapping ID. |
| **idx_ctlm_target_id** | BTREE | `(target_id, is_deleted)` | Optimizes queries that retrieve location assignments for a specific campaign target while filtering deleted records. |
| **idx_camp_target_loc_maps_target_id_deleted** | BTREE (Partial) | `target_id` (`is_deleted = false`) | Optimizes retrieval of active cluster mappings for campaign targets by indexing only non-deleted records. |

---

---

#### <span style="color:#B9770E">Table: `campaign_targets`</span>
##### Purpose

Stores the master definition of campaign performance targets (KPIs). Each record represents a target configuration for a campaign, including the target value, validity period, and activation status. This table serves as the parent entity for campaign target distribution across locations, SKUs, and KPI parameters.

**Primary Key:** `id`

---

##### Primary Key & Relationships

##### Primary Key

- **id** → Primary key for the campaign target record.

###### Relationships

- **cmp_id** → `campaigns.id`

##### Referenced By

- `campaign_target_loc_maps.target_id`
- `campaign_target_sku_maps.target_id`
- `campaign_target_parameter_maps.target_id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the campaign target record. Auto-generated using the `campaign_targets_id_seq` sequence. |
| **cmp_id (FK)** | integer (int4) | ✓ | Identifier of the campaign to which this KPI target belongs. References the `campaigns` table. |
| **target** | integer (int4) | ✓ | Numeric target value to be achieved during the campaign. Depending on the KPI configuration, this may represent contact count, sales quantity, outlet coverage, or another measurable objective. |
| **over_achivement** | boolean |  | Indicates whether achievement beyond the defined target is permitted. `true` allows performance to exceed the configured target; `false` enforces the defined target as the effective maximum for reporting purposes. |
| **is_deleted** | boolean |  | Soft-delete flag. `false` indicates an active record, while `true` marks the target as logically deleted. |
| **created_at** | timestamp |  | Timestamp when the target record was created. Automatically populated during insertion. |
| **updated_at** | timestamp |  | Timestamp of the most recent modification to the target record. |
| **from_date** | timestamp |  | Effective start date and time from which the target becomes valid. |
| **to_date** | timestamp |  | Effective end date and time of the target. A `NULL` value or default future date indicates an active or open-ended target. |
| **date** | date |  | Business date associated with the target configuration. Typically represents the operational date for which the target is defined. |
| **is_current** | boolean |  | Indicates whether this is the active version of the target. `true` represents the currently effective target, while `false` indicates a historical version retained for audit purposes. |
| **name** | varchar |  | Human-readable name of the target configuration, used for identification in the application (e.g., *Franchise - 35*, *Test 10*). |

---

##### Key Notes / Business Rules

- This is the **parent table** for all campaign KPI configurations.
- Each campaign may have multiple target definitions over time.
- Historical target versions are preserved using the **`is_current`** flag.
- The validity period is controlled through **`from_date`** and **`to_date`**.
- Location assignments and SKU assignments are maintained in separate child tables.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_current = true`
    - `is_deleted = false`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| **campaign_targets_pkey** | BTREE (Unique) | `id` | Primary key index. |
| **idx_campaign_targets_cmp_id** | BTREE (Partial) | `cmp_id` (`is_deleted = false`) | Optimizes retrieval of active targets for a campaign. |
| **idx_ct_cmp_id** | BTREE (Partial) | `cmp_id` (`is_deleted = false`) | Additional partial index supporting campaign-based target lookups. |

---

---

---

#### <span style="color:#B9770E">Table: `campaign_target_sku_maps`</span>
##### Purpose

Associates campaign targets with specific SKUs (products). This table determines which products are included under a particular campaign target, enabling SKU-level performance tracking and reporting.

**Primary Key:** `id`

---

##### Primary Key & Relationships

##### Primary Key

- **id** → Primary key for the mapping record.

###### Relationships

- **target_id** → `campaign_targets.id`
- **sku_id** → `sku_items.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the campaign target SKU mapping. |
| **target_id (FK)** | integer (int4) | ✓ | Identifier of the parent campaign target. References `campaign_targets.id`. |
| **sku_id (FK)** | integer (int4) | ✓ | Identifier of the SKU associated with the campaign target. References the SKU master table. |
| **is_deleted** | boolean |  | Soft-delete flag. `false` indicates an active mapping. |
| **created_at** | timestamp |  | Timestamp when the mapping was created. |
| **updated_at** | timestamp |  | Timestamp of the last modification. |
| **brand** | text |  | Brand category or grouping associated with the SKU. Used for product grouping and reporting. |

---

##### Key Notes / Business Rules

- One campaign target may contain multiple SKUs.
- The same SKU may participate in multiple campaign targets.
- Enables SKU-level target achievement reporting.
- Product filtering in campaign reports relies heavily on this mapping.
- Active mappings are identified by `is_deleted = false`.

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| **campaign_target_sku_maps_pkey** | BTREE (Unique) | `id` | Primary key index. |
| **idx_camp_target_sku_maps_target_sku** | BTREE | `(target_id, sku_id)` | Optimizes retrieval of SKUs associated with a campaign target and prevents expensive joins during KPI reporting. |

---

---

#### <span style="color:#B9770E">Table: `campaigns`</span>
##### Overview

The **campaigns** table is the central operational entity of the ECRM platform. It defines every field campaign executed by BATB, including its duration, survey workflow, assignment modality, geographic scope, products, media resources, business rules, validation logic, and execution configuration.

Every operational activity—consumer contacts, surveys, visits, material distribution, target tracking, user assignments, and reporting—is associated with a campaign. A user cannot perform campaign activities unless the campaign has been properly configured and assigned.

**Purpose:** Acts as the master configuration and execution container for all field campaigns. It controls **who** can execute the campaign, **where** it runs, **how** the mobile application behaves, and **what** business rules are enforced throughout the campaign lifecycle.

**Primary Key:** `id`

---

##### Columns

| Column | Type | Req | Description |
| --- | --- | --- | --- |
| **id** | int4 | ✓ | Primary Key. Auto-incrementing unique identifier for each campaign. |
| **name** | varchar(255) | ✓ | Campaign name displayed throughout the application, dashboards, and reports. Example: **BHN Touch of Gold**. |
| **version** | int4 | ✓ | Version number of the campaign configuration. Incremented whenever the survey or campaign configuration changes so mobile devices can synchronize the latest configuration. |
| **survey_flow** | jsonb | ✓ | Stores the complete survey workflow in JSON format. Includes question groups, branching logic, validations, skip logic, product selection, OTP verification, digital signature, media playback, lookup fields, interactive blocks, and submission flow. This JSON is rendered dynamically by the mobile application. |
| **parent** | int4 | Optional | Parent campaign identifier used when campaigns are organized hierarchically or created from another campaign template. |
| **from_date** | date | ✓ | Campaign start date. Field users can begin campaign activities on or after this date. |
| **to_date** | date | ✓ | Campaign end date. After this date the campaign becomes inactive unless extended. |
| **terminal_point** | int4 | ✓ | Defines the **campaign modality (location hierarchy level)** at which the campaign operates. This value references a hierarchy level rather than a specific location. Examples: **7 = Cluster**, **5 = Point**. The actual meaning depends on the hierarchy configuration. It determines the assignment level for users, campaign locations, targets, and reporting. |
| **videos** | jsonb[] | Optional | Collection of campaign video resources shown within the mobile application. Typically promotional or educational videos. |
| **images** | varchar[] | Optional | Stores image assets used during campaign execution. |
| **video_version** | int4 | Optional | Version number of campaign video resources. Used for mobile synchronization. |
| **image_version** | int4 | Optional | Version number of campaign image resources. |
| **conditions** | jsonb | Optional | Stores campaign execution rules including geo-fencing, repeat contact validation, AI audit settings, target achievement logic, cluster assignment rules, campaign limits, OTP behavior, custom validation scripts, messaging configuration, and other runtime business rules executed by the application. |
| **is_deleted** | boolean | Optional | Soft-delete flag. FALSE = Active campaign, TRUE = Deleted/Archived campaign. |
| **created_at** | timestamp | ✓ | Timestamp when the campaign was created. |
| **updated_at** | timestamp | ✓ | Timestamp when the campaign was last modified. |
| **contact_terminal_point** | int2 | Optional | Defines the hierarchy level where consumer contact records are stored. References the `hierarchy` table. |
| **type** | int2 | ✓ | Campaign type identifier. Different campaign types enable different workflows, survey behaviors, reporting logic, and application features. Business logic is maintained in the application. |
| **products** | int4[] | Optional | List of Primary Brand/Product IDs available within the campaign. Determines which products appear during survey collection. |
| **otp_conf** | jsonb | Optional | Campaign-specific OTP configuration including server validation, bypass options, retry policies, and authentication behavior. |
| **multi_ff_same_loc** | boolean | Optional | Indicates whether multiple field force users are allowed to work simultaneously within the same assigned location. |
| **secondary_brands** | int4[] | Optional | List of Secondary Brand IDs available during campaign execution. |
| **ar** | jsonb | Optional | Augmented Reality (AR) configuration used for campaigns containing interactive AR experiences. |
| **ar_version** | int4 | Optional | Version number of AR resources downloaded by mobile devices. |
| **previous_brands** | int4[] | Optional | List of Previous Brand IDs presented during consumer interviews. |
| **audio_version** | int4 | Optional | Version number of campaign audio resources. |
| **audios** | jsonb | Optional | Collection of audio resources used during campaign execution. |

---

##### Foreign Keys

| Column | References |
| --- | --- |
| **contact_terminal_point** | hierarchy.id |

> Although `parent` represents a parent campaign, no database-level foreign key currently exists.
> 

---

##### Referenced By (Incoming Relationships)

The **campaigns** table is one of the most highly connected tables in the database.

| Referencing Table | Relationship |
| --- | --- |
| campaign_agency_maps | Maps agencies responsible for executing the campaign. |
| campaign_location_maps | Defines campaign operating locations. Depending on `terminal_point`, `location_id` may represent Cluster, Point, or another hierarchy level. |
| users_campaign_maps | Assigns users to campaigns and grants campaign access. |
| users_camp_term_maps | Assigns users to specific operational locations within a campaign. |
| campaign_targets | Defines campaign KPI targets. |
| campaign_target_loc_maps | Assigns campaign targets to operational locations. |
| campaign_target_sku_maps | Assigns campaign targets to specific SKUs. |
| audios | Stores campaign audio resources. |
| campaign_callcheckback_maps | Campaign callback configuration. |
| campaign_joint_call_maps | Joint visit configuration. |
| consumer_dialer_list | Consumer dialer assignments. |
| coupon_codes | Coupon management. |
| daily_material_maps | Daily material allocation. |
| material_campaign_maps | Material assignment. |
| sup_br_maps | Supervisor–BR campaign assignments. |
| supervisor_contacts | Supervisor activity records. |

---

##### Business Logic

The **campaigns** table serves as the master configuration for campaign execution.

It defines:

- Campaign duration.
- Campaign survey workflow.
- Operational modality (Cluster, Point, etc.).
- Geographic assignment level.
- Products and brands available.
- Campaign media (videos, images, AR, audio).
- OTP validation.
- Geo-fencing.
- Repeat contact validation.
- AI audit rules.
- Target achievement configuration.
- Mobile application behavior.
- User assignment eligibility.
- Reporting configuration.

---

##### Campaign Modality (`terminal_point`)

One of the most important fields in this table is **`terminal_point`**.

Unlike a fixed location type, this field specifies **the hierarchy level where the campaign operates**.

Examples:

| terminal_point | Campaign Assignment Level |
| --- | --- |
| 7 | Cluster |
| 6 | Route *(if configured)* |
| 5 | Point |
| 4 | Distributor / House *(if configured)* |

The actual meaning depends on the values configured in the **`hierarchy`** table.

This field controls:

- User assignment level.
- Campaign location assignment.
- Target allocation.
- Consumer reporting aggregation.
- Mobile application location selection.

For example:

**Campaign A**

```
terminal_point = 7
```

Then:

- `campaign_location_maps.location_id` = Cluster ID
- `users_camp_term_maps.location_id` = Cluster ID
- `campaign_target_loc_maps.loc_id` = Cluster ID

---

**Campaign B**

```
terminal_point = 5
```

Then:

- `campaign_location_maps.location_id` = Point ID
- `users_camp_term_maps.location_id` = Point ID
- `campaign_target_loc_maps.loc_id` = Point ID

Thus, the meaning of these location fields is determined dynamically by the campaign modality rather than the database schema.

---

##### Example

Campaign **185 – BHN Touch of Gold**

Configuration includes:

- Campaign Duration: **2026-03-12 → 2026-06-03**
- Assignment Level: **Cluster (Hierarchy Level 7)**
- Dynamic survey with multiple question groups
- Product selection
- Previous Brand selection
- Secondary Brand selection
- Contact number validation
- Age validation
- OTP verification
- Digital signature
- Video playback
- Interactive application
- Material distribution
- Geo-fencing
- Repeat contact validation
- Campaign target configuration
- AI audit configuration
- Mobile synchronization using configuration versions

This demonstrates that a campaign contains not only scheduling information but also the complete operational workflow executed by the mobile application.

---

##### Indexing

| Index | Type | Purpose |
| --- | --- | --- |
| **campaigns_pkey2** | BTREE (Primary Key) | Fast lookup by campaign ID. |
| **idx_campaign_terminal_point** | BTREE | Optimizes filtering campaigns by operational hierarchy level (Cluster, Point, etc.). |
| **idx_campaign_from_date** | BTREE | Speeds searches based on campaign start date. |
| **idx_campaign_to_date** | BTREE | Speeds searches based on campaign end date. |
| **idx_campaign_parent** | BTREE | Optimizes hierarchical campaign lookups. |
| **idx_campaign_is_deleted** | BTREE | Improves filtering of active (`is_deleted = false`) campaigns. |

---

##### Key Relationships

```
campaigns
│
├── campaign_agency_maps
├── campaign_location_maps
├── campaign_targets
│   ├── campaign_target_loc_maps
│   └── campaign_target_sku_maps
├── users_campaign_maps
├── users_camp_term_maps
├── consumer_contacts
├── coupon_codes
├── daily_material_maps
├── material_campaign_maps
├── supervisor_contacts
├── joint_calls
└── reporting & analytics
```

---

##### Summary

The **campaigns** table is the heart of the ECRM system. It acts as the master configuration object that governs every aspect of field campaign execution. It defines the campaign's duration, operational hierarchy (campaign modality), survey workflow, media resources, business rules, geographic scope, user access, target configuration, and reporting behavior. Most operational tables ultimately reference this table, making it one of the most critical and highly connected entities in the entire database.

---

---

---

#### <span style="color:#B9770E">Table: `campaign_target_parameter_maps`</span>
##### Purpose

Stores additional **JSON-configurable parameters** attached to a specific campaign target (`campaign_targets.id`) — e.g., splitting a single volume/contact target into sub-segments such as "vulnerable" versus "non-vulnable" consumer counts. Extends the base target definition with flexible, campaign-specific configuration that doesn't need its own dedicated column per parameter type.

**Primary Key:** `id`

**Foreign Key:** `target_id → campaign_targets.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the parameter-configuration record. Auto-generated using the `campaign_target_parameter_maps_id_seq` sequence. |
| **target_id (FK)** | integer (int4) | ✓ | References `campaign_targets.id`. The specific campaign target this configuration extends. |
| **configuration** | jsonb | ✓ | Flexible JSON object holding additional target sub-parameters — sample data shows a segmentation split (`vulnerable`: 10, `non_vulnerable`: 5), meaning the base target's total volume is further broken down by consumer vulnerability classification. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This table extends a base `campaign_targets` record with **flexible, schema-less configuration** — rather than adding new columns to `campaign_targets` every time a new sub-parameter type is needed (e.g., vulnerability segmentation), it's captured generically in `configuration` JSON.
- The specific keys present in `configuration` (e.g., `vulnerable`, `non_vulnerable`) are **not fixed by the schema** — different targets could carry entirely different configuration shapes, so reporting on this table requires knowledge of the expected JSON keys for a given target type.
- Consistent with the earlier campaign-target documentation pattern (parent table for campaign KPI configurations, historical versions preserved via `is_current`, validity via `from_date`/`to_date`), this table is the configuration extension layer sitting alongside `campaign_targets` and `campaign_target_sku_maps`.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - `target_id` matches the target being evaluated, parsed for its specific configuration keys

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| campaign_target_parameter_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Record

| id | target_id | configuration |
| --- | --- | --- |
| 3 | 111 | {"vulnerable": 10, "non_vulnerable": 5} |

---

---

#### <span style="color:#B9770E">View: `campaign_target_config`</span>
##### Purpose

A reporting view that combines, for a given campaign target, the **full list of SKUs/products** assigned to that target (via `campaign_target_sku_maps`) with its **flexible JSON configuration** (via `campaign_target_parameter_maps`) — giving a single, ready-to-use row per target that shows both what products are in scope and any additional sub-parameter configuration, without requiring the caller to join three tables manually.

**Type:** Query/View definition (not a physical base table)

**Underlying Sources:** `ecrm.campaign_target_sku_maps` (ctsm), `ecrm.campaign_target_parameter_maps` (ctpm), `ecrm.sku_items` (si)

---

##### Column Definitions

| Column | Data Type | Description |
| --- | --- | --- |
| **target_id** | integer | The `campaign_targets.id` this row describes. |
| **products** | jsonb | A JSON array of `{id, name}` objects for every active SKU (`sku_items.is_deleted = false`) assigned to this target via `campaign_target_sku_maps`, aggregated with `jsonb_agg`. |
| **configuration** | jsonb | The target's additional JSON configuration, pulled directly from `campaign_target_parameter_maps.configuration` (left-joined, so may be `NULL` if no extended configuration exists for this target). |

---

##### Business Logic

- Joins `campaign_target_sku_maps` to `sku_items` (filtering to `si.is_deleted = false`) to resolve each assigned SKU's `id`/`sku_name` into a display-ready JSON array.
- **Left-joins** `campaign_target_parameter_maps` on `target_id`, so a target without any extended configuration still appears in this view (with `configuration = NULL`) rather than being excluded — this differs from an inner join, which would drop targets lacking parameter-map rows.
- Groups by `target_id` and `configuration`, aggregating all matching active SKUs into a single `products` array per target.

##### Key Notes / Business Rules

- This view is the **consolidated, reporting-ready representation of a campaign target's product scope and extended configuration** — sparing the caller from separately joining `campaign_target_sku_maps`, `sku_items`, and `campaign_target_parameter_maps`.
- Because the SKU join filters on `si.is_deleted = false`, a target whose SKUs have since all been soft-deleted would show an **empty products array** rather than being excluded from the view entirely (since the `configuration` join is independent).
- The `LEFT JOIN` to `campaign_target_parameter_maps` means **`configuration` can legitimately be `NULL`** for targets that don't use the extended-parameter mechanism (e.g., simple targets without vulnerability segmentation or similar sub-splits) — this is expected, not a data gap.
- During reporting, the application generally uses this view directly when rendering a campaign target's full detail (products in scope + any extended configuration) without needing separate queries.

---

##### Example Record

| target_id | products | configuration |
| --- | --- | --- |
| 1670 | [{"id": 7, "name": "Derby"}, {"id": 32, "name": "Derby Style"}, {"id": 80, "name": "Hollywood"}] | NULL |

#### <span style="color:#B9770E">Table: `campaign_theme_maps`</span>
##### Purpose

Stores the **visual branding/theme configuration** applied to a campaign's field-app UI — color scheme for primary elements, questions, titles, status bar, and a custom title-bar image — allowing each campaign to have a distinct visual identity in the app without code changes.

**Primary Key:** `id`

**Foreign Key:** `campaign_id → campaigns.id` (implied; not shown as enforced in the structure provided)

> **Note:** The underlying sequence is named `campaign_color_maps_id_seq` and the primary key constraint `campaign_color_maps_pkey`, even though the table itself is called `campaign_theme_maps` — indicating this table was originally named/modeled as `campaign_color_maps` and later renamed without the underlying sequence/constraint names being updated, similar to the `outlets`/`retailers` naming inconsistency noted elsewhere in this schema.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the theme record. Auto-generated using the `campaign_color_maps_id_seq` sequence. |
| **campaign_id** | integer (int4) | ✓ | Identifies which campaign this theme configuration applies to. No enforced FK shown to `campaigns.id`. |
| **primary_color** | varchar(255) |  | Primary brand color used throughout the campaign's app UI, as a hex code (e.g., `#0D2B63`). |
| **primary_color_light** | varchar(255) |  | Lighter variant of the primary color, likely used for secondary UI elements or hover/highlight states. |
| **question_color** | varchar(255) |  | Color applied to survey question text/elements. |
| **title_font_color** | varchar(255) |  | Font color used for titles within the app. |
| **status_bar_color** | varchar(255) |  | Color of the device status bar while the campaign app screen is active. |
| **retake_reload_color** | varchar(255) |  | Color used for "retake"/"reload" UI actions (e.g., retaking a photo or reloading a survey step). |
| **titlebar_image** | varchar(255) |  | URL/path to a custom image displayed in the app's title bar for this campaign (e.g., an S3-hosted branding image). |

---

##### Key Notes / Business Rules

- This table exists purely for **campaign-specific UI theming** — it has no soft-delete or timestamp columns, suggesting each campaign typically has a single, directly-managed theme row rather than a versioned or auditable history.
- The **naming mismatch** between the table (`campaign_theme_maps`) and its underlying sequence/constraint (`campaign_color_maps_...`) suggests this table was renamed at some point — worth confirming with the DB team whether this is purely cosmetic or if it signals a broader migration that wasn't fully completed.
- All color values are stored as hex-code strings with no format validation enforced at the database level — malformed hex values would only be caught (or not) at the application layer.
- No enforced foreign key to `campaigns.id` was shown — referential integrity for `campaign_id` depends entirely on the application layer.
- During reporting/app rendering, the application generally retrieves the theme record where:
    - `campaign_id` matches the active campaign, applying its colors and title-bar image to the field app's UI

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| campaign_color_maps_pkey | BTREE (PK) | id | Primary key lookups. **Note:** index name inconsistent with table name (`campaign_theme_maps`) — see naming note above. |

---

##### Example Record

| id | campaign_id | primary_color | question_color | title_font_color |
| --- | --- | --- | --- | --- |
| 3 | 6 | `#0D2B63` | `#9532f7` | `#e05510` |

#### <span style="color:#B9770E">Table: `manpowers`</span>
##### Purpose

Defines the **staffing plan** for a campaign — how many field-force personnel of each employment category (cycle, fixed, interim) are budgeted for the campaign, over what date range, and on which days of the week fieldwork is expected to occur. Supports headcount planning and cost/target-setting for a campaign before or during its execution.

**Primary Key:** `id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the manpower plan record. Auto-generated using the `manpowers_id_seq` sequence. |
| **cmp_name** | varchar | ✓ | Name of the campaign this staffing plan applies to (e.g., "PJ Windsor"). **Note:** stored as a free-text campaign name rather than a foreign key to `campaigns.id` — no enforced link to the campaigns table, so matching this plan to its actual campaign record relies on name matching rather than a stable key. |
| **start_date** | date | ✓ | Start date of the campaign's staffing plan/period. |
| **end_date** | date | ✓ | End date of the campaign's staffing plan/period. |
| **working_days** | jsonb | ✓ | A JSON object with one key per day of the week (Sunday–Saturday), each holding a `checked` boolean indicating whether fieldwork occurs on that day for this campaign (e.g., Friday `checked: false` for a campaign that doesn't operate on Fridays). |
| **cycle_ff** | integer (int4) |  | Budgeted headcount of "cycle" field-force personnel (a specific employment/rotation category) for this campaign. Default `0`. |
| **fixed_ff** | integer (int4) |  | Budgeted headcount of "fixed" field-force personnel for this campaign. Default `0`. |
| **interim_ff** | integer (int4) |  | Budgeted headcount of "interim"/temporary field-force personnel for this campaign. Default `0`. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This table defines the **budgeted/planned field-force headcount and working schedule** for a campaign — distinct from actual field activity captured in `contacts`/`daily_checks`, which reflects what actually happened rather than what was planned.
- **`cycle_ff`**, **`fixed_ff`**, and **`interim_ff`** together represent the total planned headcount, broken down by employment category — useful for comparing planned vs. actual staffing/coverage during a campaign.
- **`working_days`** defines which days of the week fieldwork is expected, which should inform expected-versus-actual attendance/coverage reporting (e.g., not flagging a "missing" contact on a day the campaign wasn't scheduled to run).
- **`cmp_name`** is a free-text field, not a foreign key to `campaigns.id` — linking a manpower plan to its actual campaign record depends on exact name matching, which is a data-integrity risk if campaign names are ever renamed or duplicated.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - `cmp_name` matches the target campaign, with `start_date`/`end_date` defining the applicable planning window

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| manpowers_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Performance / Recommendations

- Given `cmp_name` is the only link back to a campaign and is not enforced as a foreign key, consider adding a proper `campaign_id` foreign key column if a reliable machine join to `campaigns` is needed for reporting, rather than relying on exact string matching.

---

##### Example Record

| id | cmp_name | start_date | end_date | cycle_ff | fixed_ff | interim_ff |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | PJ Windsor | 2023-10-07 | 2023-11-15 | 158 | 315 | 0 |

---

---

#### <span style="color:#B9770E">Table: `campaign_loc_ff_allocations`</span>
##### Purpose

Defines the **budgeted field-force headcount allocated to a specific location (cluster) within a specific campaign**, broken down by employment category (cycle, fixed, interim) — the location-level granularity companion to the campaign-wide staffing plan in `manpowers`.

**Primary Key:** `id`

> **Note:** Although `cmp_id` and `loc_id` appear to reference `campaigns.id` and `locations.id` respectively, the database does **not** currently enforce foreign key constraints on either column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the allocation record. Auto-generated using the `cmp_loc_ff_allocations_id_seq` sequence. |
| **cmp_id** | integer (int4) | ✓ | Identifies the campaign this allocation applies to. No enforced FK to `campaigns.id`. |
| **loc_id** | integer (int4) | ✓ | Identifies the specific location/cluster this field-force headcount is allocated to. No enforced FK to `locations.id`. |
| **fixed_ff** | integer (int4) |  | Budgeted headcount of "fixed" field-force personnel for this campaign/location. Default `0`. |
| **cycle_ff** | integer (int4) |  | Budgeted headcount of "cycle" field-force personnel for this campaign/location. Default `0`. |
| **interim_ff** | integer (int4) |  | Budgeted headcount of "interim"/temporary field-force personnel for this campaign/location. Default `0`. |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. `NOT NULL`, default `false`. |

---

##### Key Notes / Business Rules

- This table is the **location/cluster-level breakdown** of the campaign-wide staffing plan defined in `manpowers` — while `manpowers` gives a single total headcount per employment category for the whole campaign, this table distributes that headcount across specific locations/clusters.
- The three employment-category columns (`fixed_ff`, `cycle_ff`, `interim_ff`) mirror the same categories used in `manpowers`, allowing planned-vs-actual staffing comparisons to be made at the location level rather than only campaign-wide.
- Unlike `manpowers` (which links to a campaign via a free-text `cmp_name`), this table uses `cmp_id` — though still not enforced via foreign key.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - `cmp_id` and `loc_id` match the target campaign/location for staffing/coverage analysis

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| cmp_loc_ff_allocations_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Record

| id | cmp_id | loc_id | fixed_ff | cycle_ff | interim_ff | is_deleted |
| --- | --- | --- | --- | --- | --- | --- |
| 4 | 15 | 67549 | 1 | 0 | 0 | false |

---

---

#### <span style="color:#B9770E">Table: `users_camp_term_maps`</span>
##### Purpose

Stores the assignment of users to specific terminal locations (clusters) within campaigns. Each record represents a user's assignment to a particular cluster for a defined period, enabling the ECRM system to manage field force deployment, route planning, and campaign execution at the cluster level. Historical assignments are preserved to maintain a complete record of assignment changes over time. Scheduled unassignment from a given cluster (removal from a route plan on a specific date) is tracked separately in `repeat_schedule_maps`.

**Primary Key:** `id`

**Foreign Key:** `campaign_id → campaigns.id`

> **Note:** Although only `campaign_id` has a database-level foreign key, `user_id` and `location_id` are logically related to the `users` and `locations` tables and are maintained by the application rather than enforced at the database level.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the assignment record. Auto-generated using the `users_camp_term_maps_id_seq` sequence. |
| **user_id** | integer (int4) | ✓ | Identifier of the user assigned to the campaign location. Represents a user in the `users` table. No enforced FK. |
| **campaign_id (FK)** | integer (int4) | ✓ | Identifier of the campaign to which the user is assigned. References `campaigns.id`. |
| **location_id** | integer (int4) | ✓ | Identifier of the assigned **cluster** within the campaign's location hierarchy — despite the generic column name, this represents a Cluster ID, not a general `locations` node (consistent with the same naming convention seen on `consumer_dialer_list.region_id` and `retailer_outlet_dialer_list.region_id`). Used to determine the user's operational area. No enforced FK. |
| **location_name** | varchar(255) |  | Denormalized name of the assigned cluster, populated for reporting/display purposes without requiring a join to `locations`. |
| **from_date** | date | ✓ | Date on which the assignment becomes effective. |
| **to_date** | date |  | Date on which the assignment ends. A `NULL` value or a future sentinel date indicates an active or ongoing assignment. |
| **is_current** | boolean |  | Indicates whether this record represents the user's current campaign assignment. `true` = current assignment, `false` = historical assignment. |
| **is_deleted** | boolean |  | Soft-delete flag. `false` indicates an active assignment record, while `true` indicates the record has been logically deleted. |
| **created_at** | timestamp |  | Timestamp when the assignment record was created. Automatically initialized during record creation. |
| **updated_at** | timestamp |  | Timestamp of the most recent modification to the assignment record. Automatically maintained by the application. |
| **platform_type** | integer (int4) |  | Identifies the platform/source through which the assignment was created or managed. Numeric values defined by application configuration. |

---

##### Key Notes / Business Rules

- This table assigns **users to specific clusters within campaigns**, providing location-level granularity for field force deployment.
- The **`location_id`** represents a **cluster** in the location hierarchy rather than a generic location — the same convention seen elsewhere in the schema where a generically-named column actually holds a Cluster ID.
- A user may have multiple assignment records across different campaigns or different time periods.
- Historical assignment records are preserved by setting:
    - `is_current = false`
    - `to_date` to the assignment end date
- The active assignment is identified by:
    - `is_current = true`
    - `is_deleted = false`
- Assignment periods are managed using **`from_date`** and **`to_date`**, allowing future scheduling and historical reporting.
- **`platform_type`** records the source platform responsible for creating/updating the assignment.
- Scheduled **unassignment** of a user from a cluster on a specific future date is tracked separately in `repeat_schedule_maps` (via `repeat_schedule_maps.mapping_id → users_camp_term_maps.id`), rather than being represented directly on this table.
- This table is commonly used for:
    - Campaign resource allocation
    - Cluster-wise BR assignment
    - Route planning
    - Field force deployment
    - Campaign coverage analysis
    - Historical assignment tracking
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - `is_current = true`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| users_camp_term_maps_pkey | BTREE (PK) | id | Primary key lookups. |
| users_camp_term_maps_id_idx | BTREE | id, user_id, campaign_id, is_deleted | Supports lookups involving record ID together with user, campaign, and deletion status. |
| users_camp_term_maps_user_id_idx | BTREE | user_id, campaign_id, is_deleted | Optimizes retrieval of a user's assignments within a campaign while filtering active records — likely the primary lookup pattern for this table. |
| idx_users_camp_term_maps_user_cmp_loc_deleted | BTREE (partial) | user_id, campaign_id, location_id | `WHERE is_deleted = false`. Optimizes queries retrieving a user's active cluster assignment within a specific campaign, excluding logically-deleted records — the exact pattern needed by the `user_campaign_locations_config` view's join. |

#### <span style="color:#B9770E">Table: `repeat_schedule_maps`</span>
##### Purpose

Stores the individual calendar dates on which a user's campaign-term/cluster assignment (`users_camp_term_maps`) is scheduled to be **unassigned** from that route/cluster plan — i.e., this table drives the recurring/scheduled **removal** of a user from a cluster on specific dates, rather than defining the dates they're actively scheduled to work it.

**Primary Key:** `id`

**Foreign Key:** `mapping_id → users_camp_term_maps.id` (confirmed via business context and the `user_campaign_locations_config` view's join logic; not enforced at the database level)

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the scheduled-date record. Auto-generated using the `repeat_schedule_maps_id_seq` sequence. |
| **mapping_id** | integer (int4) | ✓ | References `users_camp_term_maps.id`. Identifies which user's cluster/campaign-term assignment this unassignment schedule applies to. |
| **date** | date | ✓ | A specific calendar date on which the referenced `users_camp_term_maps` assignment is scheduled to be **unassigned/removed** from the cluster/route plan. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This table drives the **scheduled unassignment of a user from a cluster/route plan** — each row is a specific date on which a given `users_camp_term_maps` assignment is set to be dropped, separate from that assignment's own `from_date`/`to_date`/`is_current` lifecycle fields.
- **`mapping_id`** references `users_camp_term_maps.id`.
- A single `mapping_id` can have multiple scheduled unassignment dates, and multiple distinct mappings can share the same target date (e.g., a planned end-of-cycle rotation affecting several users at once).
- Soft deletion is handled using **`is_deleted`**.
- During reporting/route-plan processing, the application generally retrieves records where:
    - `is_deleted = false`
    - `date` matches the current or target processing date, to identify which `users_camp_term_maps` assignments should be unassigned/deactivated on that date

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| repeat_schedule_maps_pkey | BTREE (PK) | id | Primary key lookups. |
| repeat_schedule_maps_mapping_id_idx | BTREE | mapping_id, date, is_deleted | Speeds up the standard "is this mapping scheduled for unassignment on this date" lookup pattern. |

---

##### Example Records

| id | mapping_id | date | is_deleted |
| --- | --- | --- | --- |
| 398837 | 310531 | 2025-01-01 | false |
| 747986 | 594336 | 2025-03-20 | false |
| 747988 | 594338 | 2025-03-22 | false |

---

---


---

<a id="module-6"></a>

## <span style="color:#1A5276">Module 6: Products, Materials & SKU Catalogue</span>

*10 item(s) in this module.*

#### <span style="color:#B9770E">Table: `product_categories`</span>
##### Purpose

Self-referential hierarchy of product category tiers used to segment BATB products (e.g., brand group → price/positioning tier). A category can be a top-level node (e.g., "Franchise", "Sob") or a child node nested under another category (e.g., "Premium (Franchise)" under "Franchise"). New hierarchy levels are added purely by inserting rows with the appropriate `parent` value — no schema changes required. Used to classify `products` for brand-share and campaign-targeting reporting.

**Primary Key:** `id`

**Foreign Key:** `parent → product_categories.id` (self-referential)

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the category record. Auto-generated using the `product_categories_id_seq` sequence. |
| **name** | varchar(255) | ✓ | Display name of the category (e.g., "Franchise", "Premium (Franchise)", "VFM+ (Sob)"). **Note:** this column is `NOT NULL` in the database — it is required, not optional as previously documented. |
| **parent** | integer (int4) |  | Self-referential foreign key to `product_categories.id`. `NULL` indicates a top-level (root) category. A populated value indicates the record is a child tier nested under the referenced category. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP` at insert time. |
| **updated_at** | timestamp |  | Timestamp of the most recent update to the record. Defaults to `CURRENT_TIMESTAMP`, updated by the application on writes. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. **Note:** this column is `boolean` in the database, not `smallint` as previously documented. |

---

##### Key Notes / Business Rules

- This is a **self-referential hierarchy table** — each row optionally points to a parent category, allowing unlimited category depth (e.g., Franchise → Premium (Franchise)) without any schema change.
- Top-level brand groups (`parent = NULL`) currently include "Franchise" and "Sob"; positioning tiers (Premium, Aspirational Premium, VFM, VFM+, Low, Low Plus) are nested one level beneath these.
- Historical/deprecated branches can exist in the tree (e.g., id 32 "star" is nested under a positioning tier but flagged `is_deleted = true`) — these should not be treated as active categories in reporting.
- Used to classify `products` for brand-share and campaign-targeting analysis via `products.category`.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| product_categories_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Records

| id | name | parent | is_deleted |
| --- | --- | --- | --- |
| 1 | Franchise | NULL | false |
| 2 | Sob | NULL | false |
| 21 | Premium (Franchise) | 1 | false |
| 22 | Premium (Sob) | 2 | false |
| 33 | VFM+ (Franchise) | 1 | false |

---

---

#### <span style="color:#B9770E">Table: `products`</span>
##### Purpose

Master catalogue of BATB brand/product records. Products are the unit around which campaigns are built, targets are set, and brand share is calculated. Each product optionally belongs to a `product_categories` tier and can optionally be linked to a corresponding record in an external Apsis marketing system.

**Primary Key:** `id`

**Foreign Key:** `category → product_categories.id`

> **Note:** Although `apsis_product_id` appears to reference an `apsis_products` table, the database does **not** currently enforce a foreign key constraint on this column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the product record. Auto-generated using the `products_id_seq` sequence. |
| **name** | varchar(255) | ✓ | Product/brand name (e.g., "B&H", "JP", "PALL MALL"). **Note:** this column is `NOT NULL` — required, not optional as previously documented. |
| **category (FK)** | integer (int4) |  | References `product_categories.id`. Assigns the product to a positioning/brand-group tier. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. **Note:** boolean in the database, not `smallint`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`, maintained by the application. |
| **apsis_product_id** | integer (int4) |  | Identifier intended to link this product to a corresponding record in an external Apsis system. **No foreign key constraint is enforced** on this column at the database level. |

---

##### Key Notes / Business Rules

- This is the **master brand/product catalogue** that campaigns, targets, and brand-share calculations are built around.
- Each product is optionally classified under a `product_categories` tier via the enforced **`category`** foreign key.
- `apsis_product_id` is a **logical link only** to an external Apsis system — no foreign key is enforced, so its integrity depends entirely on the application layer and should be validated before being trusted in cross-system joins.
- Individual sellable variants (pack sizes, flavors) are attached to a product through the `sku_product_maps` bridge table, not stored directly on this table.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| products_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Records

| id | name | category | is_deleted |
| --- | --- | --- | --- |
| 11 | B&H | 21 | false |
| 12 | JP | 23 | false |
| 13 | PALL MALL | 24 | false |

---

---

#### <span style="color:#B9770E">Table: `sku_items`</span>
##### Purpose

Master list of individual sellable SKU variants — specific pack sizes, flavors, or formats of a product. Campaign targets, field surveys, and contact-level data collection operate at the SKU level (e.g., a volume target of 10,000 units refers to a specific SKU, not the parent product).

**Primary Key:** `id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the SKU record. Auto-generated using the `sku_items_id_seq` sequence. |
| **sku_serial** | varchar(255) | ✓ | Unique serial/code identifying the SKU. **Note:** `NOT NULL` — required, not optional as previously documented. Enforced unique among active records (see index below). |
| **sku_name** | varchar(255) | ✓ | Display name of the SKU (e.g., "B&H Switch", "B&H SF"). `NOT NULL` — required. |
| **item_description** | varchar(255) |  | Free-text description of the SKU item. |
| **img_url** | varchar[] (`_varchar`) |  | **Note:** this is a PostgreSQL **array** of varchar, not a single `varchar` as previously documented. Stores one or more file paths/URLs to product images (e.g., `{Production/ecrm/Images/Products/....png}`). |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. `NOT NULL`, default `false`. |
| **thumb** | varchar |  | File path/URL to a thumbnail image. **Note:** `NOT NULL` with a default of empty string (`''`) — so it's effectively always populated, just sometimes blank rather than NULL. |

---

##### Key Notes / Business Rules

- This is the **master list of sellable SKU variants** — the actual unit that campaign targets, field surveys, and contact-level data collection are measured against (not the parent product).
- `sku_serial` uniqueness is enforced **only among active records** via a partial unique index, so a soft-deleted SKU's serial can be legitimately reused by a new SKU.
- `img_url` supports multiple image references per SKU (array type), and `thumb` is always populated (defaults to empty string rather than `NULL`) — checks for "missing image" must account for both blank-string and null cases.
- A SKU is linked to its parent product(s) via `sku_product_maps`, and to its price history via `sku_item_price`.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| sku_items_pkey | BTREE (PK) | id | Primary key lookups. |
| sku_serial_delete_marker_unique | BTREE (UNIQUE, partial) | sku_serial, is_deleted | Enforces `sku_serial` uniqueness only where `is_deleted = false`, allowing serial reuse after soft-deletion. |

---

##### Example Records

| id | sku_serial | sku_name | is_deleted |
| --- | --- | --- | --- |
| 1 | 123 | B&H Switch | false |
| 2 | 18 | B&H SF | false |

---

---

#### <span style="color:#B9770E">Table: `sku_item_price`</span>
##### Purpose

Full price history for each SKU, with effective date ranges. Historical reporting (e.g., calculating revenue on a past contact/survey date) requires the price that was in effect **at that time**, not today's price — this table preserves every price change as its own row rather than overwriting.

**Primary Key:** `id`

**Foreign Key:** `sku_id → sku_items.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the price record. Auto-generated using the `sku_item_price_id_seq` sequence. |
| **sku_id (FK)** | integer (int4) | ✓ | References `sku_items.id`. **Note:** `NOT NULL` — required, not optional as previously documented. |
| **case_size** | integer (int4) |  | Number of units per case for this SKU/price record. |
| **trade_price** | numeric (float8) |  | Trade price of the SKU. **Note:** stored as `float8` (double precision), not `integer` as previously documented. |
| **vat** | numeric (float8) |  | VAT amount/rate applied to the SKU. **Note:** `float8`, not `integer`. |
| **from_date** | timestamp | ✓ | Start of this price's effective period. **Note:** `NOT NULL` — required, not optional as previously documented. |
| **to_date** | timestamp |  | End of this price's effective period. **Note:** defaults to the sentinel value `9999-12-31`, not `NULL`, to represent an open-ended/current price — check for the sentinel date rather than `IS NULL` when identifying the active price row. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **is_current** | boolean (bool) | ✓ | Flags whether this is the currently active price row. `NOT NULL`, default `true`. **Note:** boolean, not `smallint`. |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. `NOT NULL`, default `false`. **Note:** boolean, not `smallint`. |
| **mrp** | numeric (float8) | ✓ | Maximum retail price. **Note:** `NOT NULL` and `float8` — required, not optional, and not `integer` as previously documented. |
| **is_available** | boolean (bool) | ✓ | Whether the SKU is currently available at this price. `NOT NULL`, default `true`. **Note:** boolean, not `smallint`. |
| **min_volume** | integer (int4) | ✓ | Minimum order volume at this price tier. `NOT NULL`, default `1`. |
| **max_volume** | integer (int4) | ✓ | Maximum order volume at this price tier. `NOT NULL`, default `5`. |

---

##### Key Notes / Business Rules

- This is the **parent table for SKU pricing**, preserving a full price history rather than overwriting the current price — every price change (trade price, MRP, VAT, case size, volume limits) becomes its own row.
- Each SKU may have multiple price versions over time. Historical price versions are preserved using the **`is_current`** flag.
- The validity period of each price version is controlled through **`from_date`** and **`to_date`** — note `to_date` defaults to the sentinel `9999-12-31` for open-ended/current pricing rather than `NULL`.
- Historical lookups should match on the effective date range (`WHERE contact_date BETWEEN from_date AND to_date`) rather than relying on `is_current` alone, since reporting on a past transaction needs the price that was live *at that time*.
- Several numeric fields (`trade_price`, `vat`, `mrp`) are `float8`, not `integer` — relevant for rounding/precision handling in reports.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_current = true`
    - `is_deleted = false`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| sku_item_price_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Records

| id | sku_id | case_size | trade_price | mrp | from_date | to_date | is_current |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 10 | 20 | 10 | 2023-08-17 | 9999-12-31 | true |
| 2 | 2 | 10 | 20 | 12 | 2023-08-17 | 9999-12-31 | true |
| 3 | 3 | 10 | 15 | 10 | 2023-08-17 | 9999-12-31 | true |

---

---

#### <span style="color:#B9770E">Table: `sku_product_maps`</span>
##### Purpose

Many-to-many bridge table linking `products` to `sku_items`. A single product (brand) can have multiple SKUs (different pack sizes, flavors, or formats); this table captures the full set of associations.

**Primary Key:** `id`

**Foreign Keys:** `product_id → products.id`, `sku_id → sku_items.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the mapping record. Auto-generated using the `sku_product_maps_id_seq` sequence. |
| **product_id (FK)** | integer (int4) | ✓ | References `products.id`. **Note:** `NOT NULL` — required, not optional as previously documented. |
| **sku_id (FK)** | integer (int4) | ✓ | References `sku_items.id`. **Note:** `NOT NULL` — required, not optional as previously documented. |
| **created_at** | timestamp |  | Timestamp when the mapping was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. `NOT NULL`, default `false`. **Note:** boolean, not `smallint`. |

---

##### Key Notes / Business Rules

- This is the **many-to-many bridge** connecting `products` to `sku_items` — one product (brand) can have several SKU rows representing different pack sizes or variants.
- Both foreign keys (`product_id`, `sku_id`) are `NOT NULL` and enforced at the database level, making this one of the more tightly-constrained mapping tables in the schema.
- A mapping being retired (product discontinuing a specific SKU) is handled by soft-deleting the mapping row rather than deleting product or SKU records themselves.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| sku_product_maps_pkey | BTREE (PK) | id | Primary key lookups. |


---

##### Example Records

| id | product_id | sku_id |
| --- | --- | --- |
| 1 | 11 | 1 |
| 2 | 11 | 2 |
| 3 | 12 | 3 |

#### <span style="color:#B9770E">Table: `material_campaign_maps`</span>
**Purpose:**

Defines the total quantity of each material allocated to a campaign. This acts as the campaign's material inventory or budget, from which daily material assignments are made to field users.

**Primary Key:** `id` (Auto-increment)

---

##### Business Role

Before a campaign starts, administrators allocate promotional materials (e.g., Lighters, Tea, Matchbox) to the campaign.

This table stores:

- Which material belongs to which campaign
- Total allocated quantity
- Effective date range
- Current/historical allocation
- Material priority/order

This is the parent allocation table for the material distribution workflow.

---

##### Columns

| Column | Type | Required | Description |
| --- | --- | --- | --- |
| **id** | int4 | ✓ | Primary Key. Auto-incrementing unique identifier. |
| **mat_id** | int4 | ✓ | FK → `materials.id`. Material allocated to the campaign. |
| **campaign_id** | int4 | ✓ | FK → `campaigns.id`. Campaign receiving the material allocation. |
| **qty** | int4 | ✓ | Total quantity allocated for this material in the campaign. |
| **from_date** | timestamp | ✓ | Allocation start date/time. |
| **to_date** | timestamp | ✓ | Allocation end date/time. Default: `9999-12-31`, indicating an active allocation. |
| **is_current** | boolean | ✓ | Indicates the active allocation. `true` = current allocation, `false` = historical allocation. |
| **is_deleted** | boolean | ✓ | Soft delete flag. `false` = active, `true` = logically deleted. |
| **created_at** | timestamp | ✓ | Record creation timestamp. |
| **updated_at** | timestamp | ✓ | Last modification timestamp. |
| **rank** | smallint | ✓ | Display or processing priority when multiple materials exist in the campaign. Lower rank generally indicates higher priority. |

---

##### Foreign Keys

| Column | References |
| --- | --- |
| `mat_id` | materials.id |
| `campaign_id` | campaigns.id |

---

##### Business Logic

- One campaign can contain multiple materials.
- One material can be allocated to multiple campaigns.
- Quantity represents the total campaign inventory.
- Daily material assignments (`daily_material_maps`) should originate from this allocation.
- Historical allocations are preserved by setting `is_current = false` or updating `to_date`.

---

##### Example

| Campaign | Material | Qty |
| --- | --- | --- |
| Campaign 188 | Dispenser Matchstick | 12 |
| Campaign 186 | Tea | 10 |
| Campaign 186 | Lighter | 5 |

---

##### Indexes

| Index | Type | Columns | Purpose |
| --- | --- | --- | --- |
| material_campaign_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

#### <span style="color:#B9770E">Table: `materials`</span>
**Purpose:**

Master catalog of all promotional materials distributed during campaigns.

This table serves as the central repository of materials used throughout the ECRM material management workflow.

---

##### Business Role

Every promotional item (Tea, Lighter, Matchstick, Swapping Kit, etc.) is defined once in this table.

Other tables reference these material IDs for:

- Campaign allocation
- Daily assignment
- Daily acceptance
- Long-term asset mapping

---

##### Columns

| Column | Type | Required | Description |
| --- | --- | --- | --- |
| **id** | int4 | ✓ | Primary Key. Auto-incrementing unique identifier. |
| **name** | varchar | ✓ | Material name displayed throughout the application. |
| **type** | int4 | ✓ | Material type/category defined by application business logic. |
| **is_deleted** | boolean | ✓ | Soft delete flag. `false` = active material. |
| **created_at** | timestamp | ✓ | Material creation timestamp. |
| **updated_at** | timestamp | ✓ | Last modification timestamp. |
| **img_url** | varchar(255) | Optional | Image path representing the material. |

---

##### Referenced By

- daily_material_maps
- daily_material_acceptance_maps
- material_campaign_maps
- users_asset_maps

---

##### Business Logic

- Every material exists only once.
- Multiple campaigns may use the same material.
- Images are optional.
- Material type determines how the application categorizes the item.

---

##### Example

| ID | Material |
| --- | --- |
| 10 | Dispenser Matchstick |
| 22 | Tea |
| 41 | Lighter |

---

##### Indexes

| Index | Type | Columns | Purpose |
| --- | --- | --- | --- |
| materials_pkey | BTREE (PK) | id | Primary key lookups. |

---

#### <span style="color:#B9770E">Table: `daily_material_maps`</span>
**Purpose:**

Records the daily assignment of campaign materials from a supervisor or manager to an individual BR.

This table creates the operational material distribution log.

---

##### Business Role

Each day:

- Manager assigns materials
- Materials are linked to a campaign
- Assigned quantities are recorded
- Later, BR acknowledges receipt in `daily_material_acceptance_maps`

This provides complete traceability.

---

##### Columns

| Column | Type | Required | Description |
| --- | --- | --- | --- |
| **id** | int4 | ✓ | Primary Key. |
| **uid** | int4 | ✓ | FK → `users.id`. BR receiving the material. |
| **mat_id** | int4 | ✓ | FK → `materials.id`. Assigned material. |
| **qty** | int4 | ✓ | Quantity assigned. |
| **assigned_by** | int4 | ✓ | FK → `users.id`. Manager or supervisor assigning the material. |
| **assignment_date** | date | ✓ | Assignment date. |
| **assignment_time** | time | ✓ | Assignment time. |
| **updated_at** | timestamp | Optional | Last update timestamp. |
| **is_deleted** | boolean | ✓ | Soft delete flag. |
| **campaign_id** | int4 | ✓ | FK → `campaigns.id`. Campaign associated with the assignment. |

---

##### Foreign Keys

| Column | References |
| --- | --- |
| uid | users.id |
| assigned_by | users.id |
| mat_id | materials.id |
| campaign_id | campaigns.id |

---

##### Business Logic

- One record represents one material assignment.
- Same BR may receive multiple material types on the same day.
- Duplicate assignment of the same material to the same user on the same date is prevented by a unique index.
- Acts as the source record for daily material acceptance.

---

##### Example

| Assigned By | User | Material | Qty | Campaign |
| --- | --- | --- | --- | --- |
| 23579 | 2320 | Matchstick | 2 | 7 |
| 23582 | 23583 | Tea | 5 | 9 |

---

##### Indexes

| Index | Type | Columns | Purpose |
| --- | --- | --- | --- |
| daily_material_maps_pkey | BTREE (PK) | id | Primary key lookups. |
| idx_daily_material_maps_uid | BTREE | uid | Retrieve materials assigned to a user. |
| idx_daily_material_maps_assigned_by | BTREE | assigned_by | Retrieve assignments made by a manager. |
| unique_by_assigned_date_mat_id_user_id_is_deleted | UNIQUE BTREE | assignment_date, mat_id, uid, is_deleted *(where is_deleted <> true)* | Prevents duplicate material assignment for the same user, material, and date. |

---

#### <span style="color:#B9770E">Table: `daily_material_acceptance_maps`</span>
**Purpose:**

Captures the BR's confirmation that assigned materials have been physically received and records any returned quantity or discrepancies.

---

##### Business Role

After materials are assigned:

1. BR accepts the materials.
2. Acceptance is digitally recorded.
3. Returned quantities and discrepancies are tracked.

This completes the material accountability process.

---

##### Columns

| Column | Type | Required | Description |
| --- | --- | --- | --- |
| **id** | int4 | ✓ | Primary Key. |
| **uid** | int4 | ✓ | FK → `users.id`. User accepting the material. |
| **mat_id** | int4 | ✓ | FK → `materials.id`. Accepted material. |
| **qty** | int4 | ✓ | Quantity accepted. |
| **acceptance_date** | date | ✓ | Date of acceptance. |
| **acceptance_time** | time | ✓ | Time of acceptance. |
| **return_time** | timestamptz | Optional | Timestamp when unused materials were returned. |
| **return_qty** | int4 | Optional | Quantity returned. |
| **discrepancy_reason** | varchar(255) | Optional | Reason for shortages, damage, or other discrepancies. |
| **updated_at** | timestamp | Optional | Last modification timestamp. |
| **is_deleted** | boolean | ✓ | Soft delete flag. |
| **campaign_id** | int4 | Optional | FK → `campaigns.id`. Campaign associated with the acceptance. |

---

##### Foreign Keys

| Column | References |
| --- | --- |
| uid | users.id |
| mat_id | materials.id |
| campaign_id | campaigns.id *(logical relationship)* |

---

##### Business Logic

- Confirms actual receipt of assigned materials.
- Supports material return tracking.
- Enables reconciliation between assigned and accepted quantities.
- Helps identify damaged, missing, or unused materials.
- Duplicate acceptance for the same user, material, and date is prevented by a unique index.

---

##### Example

| User | Material | Accepted Qty | Campaign |
| --- | --- | --- | --- |
| 2320 | Swapping | 7 | 7 |
| 2320 | Material 12 | 10 | 7 |

---

##### Indexes

| Index | Type | Columns | Purpose |
| --- | --- | --- | --- |
| daily_material_acceptance_maps_pkey | BTREE (PK) | id | Primary key lookups. |
| idx_daily_material_acceptance_maps_uid | BTREE | uid | Retrieve material acceptance history for a user. |
| unique_by_date_mat_id_user_id_is_deleted | UNIQUE BTREE | acceptance_date, mat_id, uid, is_deleted *(where is_deleted <> true)* | Prevents duplicate acceptance records for the same user, material, and date. |

---

#### <span style="color:#B9770E">Material Distribution Workflow</span>
```
materials
      │
      ▼
material_campaign_maps
(Campaign Material Allocation)
      │
      ▼
daily_material_maps
(Daily Assignment to BR)
      │
      ▼
daily_material_acceptance_maps
(BR Confirms Receipt)
```

This workflow provides complete end-to-end traceability of promotional materials, from campaign allocation through daily distribution to final acceptance and reconciliation.

---

---

---


---

<a id="module-7"></a>

## <span style="color:#1A5276">Module 7: Field Contacts — Consumer & Retailer</span>

*12 item(s) in this module.*

#### <span style="color:#B9770E">Table: `contacts`</span>
##### Purpose

Core transactional table recording every retailer-outlet consumer contact made during a campaign — i.e., a single interaction where a Business Representative (BR) engages a consumer at an outlet, runs a survey, captures a signature/selfie/OTP, and records the outcome (brand consumed, reward given, contact success/failure). This is the central fact table underlying campaign performance reporting, brand-share analysis, and field activity tracking. Each contact belongs to exactly one outlet (`location_id`) and one campaign (`campaign_id`), and is partitioned by `contact_date` for performance at scale.

**Primary Key:** `(id, contact_date)` — composite, required by the partitioning scheme (see note below)

> **Note:** This is a **partitioned table** (`PARTITION BY RANGE (contact_date)`). Because PostgreSQL requires the partition key to be part of any unique constraint, the primary key is the composite `(id, contact_date)` rather than `id` alone — `id` is still effectively unique on its own (via the `contacts_id_seq` sequence and `idx_contact_id`), but any FK referencing this table (e.g., from `contact_survey_data_maps`, `tap_analyses`) must reference **both** `id` and `contact_date` together.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Contact identifier. Auto-generated using the `contacts_id_seq` sequence. Referred to internally as `contact_id`. |
| **otp** | varchar(255) |  | One-time password used to verify the consumer's phone number during the contact/survey flow. |
| **user_id** | integer (int4) | ✓ | Identifier of the BR/user who logged this contact. No enforced FK shown to `users.id` in the structure provided — worth confirming at the application layer. |
| **contacted_br** | varchar(255) | ✓ | Login/username string of the BR who made the contact (e.g., `brtestatmsl@ecrm-atmsl191`) — a denormalized, human-readable companion to `user_id`. |
| **campaign_id** | integer (int4) | ✓ | Identifier of the campaign this contact was made under. No enforced FK shown — critical join key for all campaign-level reporting and must always be included in any `LEAD()`/`LAG()` window partition to prevent cross-campaign bleed in duration/interval analysis. |
| **campaign_version** | varchar(255) |  | Version identifier of the campaign configuration/survey active at the time of contact — supports campaigns that evolve their survey structure over time. |
| **consumer_id** | integer (int4) | ✓ | Identifier of the consumer being contacted. |
| **contact_no** | integer (int4) |  | Consumer's phone number captured during the contact. |
| **location_id** | integer (int4) | ✓ | **Represents the outlet, not a generic location node.** Business rule: contacts occur one-to-one with a specific outlet, so this column always maps to an Outlet-level `locations.id`, despite the generic column name. |
| **contact_status** | integer (int4) |  | Outcome of the contact. Known values: `35` = successful contact, `34` = failed contact. Other values may exist and should be confirmed with the application team. |
| **signature** | varchar(255) |  | File path/reference to the consumer's captured signature image, confirming consent/completion of the contact. |
| **lat** | numeric (float8) |  | Latitude captured at the time of contact. |
| **long** | numeric (float8) |  | Longitude captured at the time of contact. |
| **radius** | numeric (float8) |  | Distance between the captured GPS point and the expected outlet location — used for geo-compliance validation, mirroring the pattern in `daily_checks`. |
| **start** | timestamptz |  | Timestamp the contact/survey interaction began. Timezone-aware. |
| **end** | timestamptz |  | Timestamp the contact/survey interaction ended. Timezone-aware. Combined with `start`, defines the interaction duration used in duration/interval analysis. |
| **additional_info** | jsonb |  | Rich JSON payload capturing the full survey interaction: block-by-block tap analysis, campaign name, image/video/audio version flags, location name, online status, and a `fresh_consumer` flag. Effectively a denormalized superset of what's normalized out into `contact_survey_data_maps` and `tap_analyses`. |
| **contact_date** | date | ✓ | Partition key. Calendar date the contact occurred. Must be included in the `LEAD()`/`LAG()` partition clause alongside `campaign_id` for any sequential/interval analysis to avoid bleed across campaigns or partition boundaries. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **product** | integer (int4) |  | **Represents the primary brand/SKU** consumed/associated with this contact — a business-friendly alias would be `primary_brand`. References `sku_items.id` (SKU level, not the parent `products` table), though no foreign key is enforced in the structure shown. |
| **giveable** | integer (int4) |  | Represents the **reward/PTR (Product Trial Reward)/gift** given to the consumer as part of the contact.material.id |
| **repeat_status** | boolean (bool) | ✓ | Flags whether this contact is a repeat contact (e.g., a follow-up on the same consumer within the campaign) versus a first-time contact. Default `false`. Included in the uniqueness constraint alongside `contact_no`/`campaign_id`/`contact_date`. |
| **secondary_brand** | integer (int4) |  | References `sku_items.id`. **Business rule:** if the primary brand/SKU (`product`) is not found or not applicable/not consumed by consumer, this records the SKU actually consumed instead. |
| **ecrm_type** | integer (int4) | ✓ | Internal classification of the contact/ECRM record type. `NOT NULL`, default `3`. Allowed values and meanings are managed by the application layer. |
| **previous_brand** | integer (int4) |  | Records the brand the consumer **previously** consumed, prior to this contact — supports brand-switching analysis. |
| **device_info** | jsonb |  | Metadata about the device used to log the contact: IMEI, brand/model, device ID, app/API/OS versions, network type, security patch level. Useful for device-based fraud detection and app-version-adoption reporting. |

---

##### Key Notes / Business Rules

- This is the **central fact table for retailer-outlet consumer contact campaigns**, alongside its child tables `contact_survey_data_maps` (normalized survey Q&A) and `tap_analyses` (UI interaction telemetry).
- The table is **range-partitioned by `contact_date`**, which drives the composite primary key `(id, contact_date)` and means all downstream FK relationships (from `contact_survey_data_maps`, `tap_analyses`) must carry `contact_date` alongside `contact_id`.
- **`location_id` always represents an outlet**, not an arbitrary location-hierarchy node — a one-to-one relationship between a contact event and the outlet it occurred at.
- **`contact_status`** of `35` = successful contact, `34` = failed contact; other codes may exist and should be verified against the application's status catalog before assuming binary success/fail.
- **Brand logic chain**: `product` (primary brand) → falls back to `secondary_brand` if primary isn't found/applicable → `previous_brand` tracks what the consumer used *before* this contact, enabling brand-switch/conversion analysis.
- **`giveable`** represents the reward/PTR/gift issued — important for reward-disbursement and cost reporting, separate from brand-consumption fields.
- When computing contact **duration** or sequencing contacts within a campaign (`LEAD()`/`LAG()`), **`campaign_id` must always be in the partition clause** alongside `contact_date`/`user_id` to prevent cross-campaign bleed — a lesson learned from prior interval-analysis work on this table.
- Casting negative time intervals (e.g., `end - start`) directly to `::TIME` can cause wraparound inflation; negative durations should be converted to absolute value, and negative intervals arising from data issues should be nulled out rather than displayed as large positive durations.
- `additional_info` duplicates much of what's normalized into `contact_survey_data_maps`/`tap_analyses` — useful for quick inspection, but the normalized child tables are the reliable source for structured per-question reporting.
- A **uniqueness constraint** on `(contact_date, campaign_id, contact_no, repeat_status)` enforces that a given phone number cannot be contacted more than once per campaign/date/repeat-status combination.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - scoped to a specific `campaign_id` and `contact_date` range
    - typically excluding a standard list of internal/test user IDs from `contacted_br`/`user_id`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| contacts_pkey | BTREE (PK) | id, contact_date | Primary key lookups; composite due to partitioning requirement. |
| contact_no_campaign_id_contact_date_repeat_status_unique | BTREE (UNIQUE) | contact_date, campaign_id, contact_no, repeat_status | Prevents duplicate contact of the same phone number within the same campaign/date/repeat-status combination. |
| contacts_contact_date_idx | BTREE | contact_date | Speeds up date-range partition pruning and reporting queries scoped by date. |
| idx_c_campaign_id | BTREE | campaign_id | Speeds up per-campaign lookups and joins. |
| idx_contact_id | BTREE | id | Speeds up direct lookups by contact id (outside the partition-aware PK path). |
| contact_userid_campignid_indx | BTREE | contact_date, campaign_id, user_id, is_deleted, repeat_status | Composite covering index for the common reporting pattern: per-BR, per-campaign, date-scoped, active-record queries. |

---

##### Example Record

| id | otp | user_id | campaign_id | location_id | contact_status | product | secondary_brand | previous_brand | contact_date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 17605951 | 123456 | 25064 | 191 | 268309 | 35 (successful) | 131 | 120 | 124 | 2026-07-10 |

---

---

#### <span style="color:#B9770E">Table: `contact_survey_data_maps`</span>
##### Purpose

Normalized, one-row-per-question storage of survey answers collected during a `contacts` interaction. While `contacts.additional_info` stores the full survey response as a single JSON blob, this table breaks each answered question out into its own row — making it straightforward to query, filter, or aggregate on specific survey questions/answers across contacts (e.g., "how many consumers selected 'Business Man/Self Employed' as profession").

**Primary Key:** `(id, contact_date)` — composite, required by the partitioning scheme

**Foreign Key:** `(contact_id, contact_date) → contacts(id, contact_date)`, `ON UPDATE CASCADE`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | serial (int4) | ✓ | Primary key for the survey-answer record. Auto-incrementing. |
| **contact_id (FK)** | integer (int4) | ✓ | References `contacts.id` (composite FK with `contact_date`). Identifies which contact this survey answer belongs to. |
| **question_id** | integer (int4) | ✓ | Numeric identifier of the survey question/block (e.g., `57` for profession, `4` for DOB) — corresponds to `block_id` in `tap_analyses`. |
| **question** | varchar(255) | ✓ | Human-readable name of the survey question (e.g., `profession`, `previous_brand`, `secondary_brand`, `product`, `giveable`). |
| **answer** | varchar(255) |  | The consumer's/BR's recorded answer to this question. Nullable — a question may be presented without a captured answer in some flows. |
| **contact_date** | date | ✓ | Partition key, mirrored from `contacts.contact_date`. Defaults to `CURRENT_DATE` if not explicitly set, though in practice it should always match the parent contact's date. |

---

##### Key Notes / Business Rules

- This table **normalizes the survey portion** of a `contacts` interaction into individual question/answer rows — one row per question answered.
- The **composite foreign key** `(contact_id, contact_date) → contacts(id, contact_date)` is a direct consequence of `contacts` being partitioned by `contact_date`; any join or insert must supply both columns together, not `contact_id` alone.
- `ON UPDATE CASCADE` means if a parent `contacts.contact_date` value is ever changed, matching rows here update automatically — insert/delete of the parent should still be handled through the application to avoid orphaned or missing survey rows.
- Several question rows conceptually duplicate first-class columns on `contacts` (e.g., `product`, `secondary_brand`, `previous_brand`, `giveable` all appear as both `contacts` columns **and** survey-answer rows here) — this table is the itemized/auditable version of the same responses, useful for question-level reporting that `contacts`' flat columns can't easily support (e.g., counting how many times a specific question was skipped).
- This table (together with `contacts` and `tap_analyses`) exists specifically for **retailer contact campaigns**.
- `answer` is stored as text regardless of the underlying question type (numeric brand ID, date, free text) — numeric/date parsing must be handled at the query or application layer.
- During reporting, the application generally retrieves records where:
    - `contact_date` and `contact_id` match the target contact(s)
    - typically filtered further by specific `question_id`/`question` for question-level analysis

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| contact_survey_data_maps_pkey | BTREE (PK) | id, contact_date | Primary key lookups; composite due to partitioning requirement. |
| idx_s_contact_id_fk | BTREE | contact_id | Speeds up retrieving all survey answers for a given contact. |

---

##### Example Records

| id | contact_id | question_id | question | answer | contact_date |
| --- | --- | --- | --- | --- | --- |
| 135662088 | 17605951 | 1 | product | 131 | 2026-07-10 |
| 135662089 | 17605951 | 2 | secondary_brand | 120 | 2026-07-10 |
| 135662098 | 17605951 | 22 | previous_brand | 124 | 2026-07-10 |
| 135662099 | 17605951 | 57 | profession | Business Man/Self Employed | 2026-07-10 |

---

#### <span style="color:#B9770E">Table: `tap_analyses`</span>
##### Purpose

Fine-grained **UI interaction telemetry** for the survey flow captured during a `contacts` interaction — records every tap/option selection made by the BR or consumer while progressing through the survey, along with the elapsed time since the survey started. Used for UX analysis (e.g., which questions take the longest to answer, where users hesitate or drop off) rather than for the business content of the answers themselves.

**Primary Key:** `id`

**Foreign Key:** `(contact_id, contact_date) → contacts(id, contact_date)`, `ON UPDATE CASCADE`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | serial (int4) | ✓ | Primary key for the tap-event record. Auto-incrementing. **Note:** unlike `contacts` and `contact_survey_data_maps`, the primary key here is `id` alone, not composite with `contact_date` — the FK to `contacts` is still composite, but the PK constraint itself doesn't include the partition column. |
| **contact_id (FK)** | integer (int4) | ✓ | References `contacts.id` (composite FK with `contact_date`). Identifies which contact interaction this tap event belongs to. |
| **survey_start_time** | timestamptz | ✓ | Timestamp the overall survey began — repeated across all tap-event rows for the same contact, serving as the reference point for `duration_from_start_survey`. |
| **duration_from_start_survey** | varchar(255) | ✓ | Elapsed time (stored as text, e.g., `0:0:41`) from `survey_start_time` to this specific tap event. Text format rather than an `interval` type — will need casting/parsing for numeric duration analysis. |
| **block_id** | varchar(255) | ✓ | Identifier of the survey question/block this tap belongs to. Corresponds to `question_id` in `contact_survey_data_maps` for numeric blocks, but can also hold non-numeric labels for structural taps (e.g., `Outlet`, `Cluster`, `submit_Btn`). |
| **question** | varchar(255) | ✓ | Name of the question/step being interacted with (e.g., `profession`, `signature`, `submit_Btn`). |
| **option** | varchar(255) | ✓ | The specific UI element tapped or the value selected at that moment (e.g., `Next`, `text`, `next_button`, `tap_on_image`, or an actual captured value like `Haider Store` for outlet-selection taps). |
| **campaign_type** | integer (int4) |  | Optional classification of the campaign type associated with this tap event. Not populated in sample data. |
| **contact_date** | date |  | Mirrors `contacts.contact_date`; part of the composite FK relationship, though nullable at the column-definition level (business practice should always populate it to match the parent contact). |

---

##### Key Notes / Business Rules

- This is a **UI/UX telemetry log**, distinct in purpose from `contact_survey_data_maps` — it captures **how** the survey was navigated (tap sequence, timing, intermediate button presses) rather than **what** was ultimately answered.
- Multiple rows can exist per question: e.g., `dob` and `name` and `signature` each show two tap rows (one for the raw input tap, one for the subsequent "next"/"agree" button tap), reflecting the actual multi-step interaction rather than a single final answer.
- `block_id`/`question` values are not strictly numeric — structural UI steps like `Outlet`, `Cluster`, and `submit_Btn` also appear as rows, alongside numeric question blocks that match `contact_survey_data_maps.question_id`.
- **`duration_from_start_survey`** is stored as free-text (`H:MM:SS`like format) rather than a proper `interval`/numeric type — must be parsed before performing any duration math or aggregation (e.g., average time-to-answer per question).
- The **primary key is `id` alone**, not composite with `contact_date`, even though the table is logically tied to the partitioned `contacts` table via a composite FK — worth flagging as an inconsistency relative to `contact_survey_data_maps`, which does use a composite PK.
- This table (together with `contacts` and `contact_survey_data_maps`) exists specifically for **retailer contact campaigns**.
- During reporting, the application generally retrieves records where:
    - `contact_id`/`contact_date` match the target contact(s)
    - typically ordered by `duration_from_start_survey` or tap sequence for funnel/drop-off analysis

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| tap_analyses_pkey | BTREE (PK) | id | Primary key lookups. |
| idx_t_contact_id_fk | BTREE | contact_id | Speeds up retrieving all tap events for a given contact. |

---

##### Example Records

| id | contact_id | duration_from_start_survey | block_id | question | option |
| --- | --- | --- | --- | --- | --- |
| 320811091 | 17605951 | 0:0:40 | 11 | giveable | 0 |
| 320811099 | 17605951 | 0:0:1 | Outlet | Outlet | Haider Store |
| 320811102 | 17605951 | 0:0:0 | Cluster | Cluster | Alam Market, Gulshan-2 |
| 320811105 | 17605951 | 0:0:42 | submit_Btn | submit_Btn | submit_Btn |

#### <span style="color:#B9770E">Table: `surveys`</span>
##### Purpose

Structurally near-identical to `contacts`, this table records consumer interaction/survey events for campaigns that operate **without requiring a pre-registered consumer record** — i.e., a survey can occur without first validating the consumer's phone number against `consumers` or `contacts`' uniqueness constraints. Same general shape as `contacts` (BR, campaign, location, GPS, device info, timing), but without the strict phone-number/campaign/date uniqueness enforcement that `contacts` applies.

**Primary Key:** `(id, contact_date)` — composite, required by the partitioning/design pattern shared with `contacts`

> **Note:** No foreign keys are enforced on `user_id`, `campaign_id`, or `location_id` in the structure provided, despite conceptually mirroring the same relationships as `contacts` (user, campaign, and outlet respectively).
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Survey identifier. Auto-generated using the `surveys_id_seq` sequence. |
| **user_id** | integer (int4) | ✓ | Identifier of the BR/user who conducted the survey. No enforced FK to `users.id`. |
| **contacted_br** | varchar(255) | ✓ | Login/username string of the BR who conducted the survey — denormalized companion to `user_id`, same pattern as `contacts.contacted_br`. |
| **campaign_id** | integer (int4) | ✓ | Identifier of the campaign this survey was conducted under. No enforced FK. |
| **campaign_version** | varchar(255) |  | Version identifier of the campaign configuration/survey active at the time. |
| **location_id** | integer (int4) | ✓ | Identifies the location/outlet where the survey occurred, following the same business convention as `contacts.location_id`. No enforced FK. |
| **contact_status** | integer (int4) |  | Outcome of the survey attempt. Likely follows the same code convention as `contacts.contact_status` (`35` = successful, `34` = failed), based on the sample record showing `35`. |
| **lat** | numeric (float8) |  | Latitude captured at the time of the survey. |
| **long** | numeric (float8) |  | Longitude captured at the time of the survey. |
| **radius** | numeric (float8) |  | Distance between the captured GPS point and the expected location — geofence compliance measure, same pattern as `contacts.radius`. |
| **start** | timestamptz |  | Timestamp the survey interaction began. Timezone-aware. |
| **end** | timestamptz |  | Timestamp the survey interaction ended. Timezone-aware. |
| **contact_date** | date | ✓ | Partition/versioning key — calendar date of the survey. Part of the composite primary key. |
| **device_info** | jsonb |  | Metadata about the device used to log the survey: IMEI, brand/model, device ID, app/API/OS versions, network type, security patch level — same structure as `contacts.device_info`. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- **This table is structurally the same "shape" as `contacts`**, but serves a **distinct business purpose**: it supports campaigns where a survey/interaction is logged **without requiring the consumer's phone number to be pre-validated or checked for uniqueness** — unlike `contacts`, there is no equivalent of `contact_no_campaign_id_contact_date_repeat_status_unique`, and no `consumer_id` column tying the survey to a `consumers` record.
- In effect: **`contacts` is for retailer/outlet campaigns requiring one-to-one, uniquely-validated consumer contact**, while **`surveys` is for campaigns that can proceed without first capturing/validating consumer identity**.
- Notably, this table does **not** carry `product`, `secondary_brand`, `previous_brand`, `giveable`, or `consumer_id` columns that `contacts` has — brand/reward data for a survey lives entirely in the normalized `survey_data_maps` answers rather than as first-class columns (e.g., sample data shows `asking_about_trialed_product` as an answer row rather than a `product` column value).
- The child table `survey_data_maps` holds the normalized question/answer detail for each survey, mirroring the `contacts`/`contact_survey_data_maps` relationship.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - scoped to a specific `campaign_id` and `contact_date` range

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| survey_pkey | BTREE (PK) | id, contact_date | Primary key lookups; composite, consistent with the partitioned design shared with `contacts`. |

---

##### Example Record

| id | user_id | contacted_br | campaign_id | location_id | contact_status | contact_date |
| --- | --- | --- | --- | --- | --- | --- |
| 58 | 34035 | ra2@ecrm-madly | 20 | 787461 | 35 | 2026-07-14 |

---

---

#### <span style="color:#B9770E">Table: `survey_data_maps`</span>
##### Purpose

Normalized, one-row-per-question storage of answers collected during a `surveys` interaction — the direct counterpart to `contact_survey_data_maps`, but linked to `surveys` instead of `contacts`.

**Primary Key:** `(id, contact_date)` — composite

**Foreign Key:** Implied `(survey_id, contact_date) → surveys(id, contact_date)`, following the same pattern as `contact_survey_data_maps`, though no explicit constraint was shown in the structure provided.

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the survey-answer record. Auto-generated using the `survey_data_maps_id_seq` sequence. |
| **survey_id** | integer (int4) | ✓ | Identifies which survey (from `surveys.id`) this answer belongs to. |
| **question_id** | integer (int4) | ✓ | Numeric identifier of the survey question (e.g., `11` = asking_about_trialed_product, `14` = option_selection). |
| **question** | varchar(255) | ✓ | Human-readable name of the survey question (e.g., `asking_about_likeability`, `asking_about_trial`). |
| **answer** | varchar(255) |  | The recorded answer to this question (e.g., "Derby FF", "Good", "Yes"). Nullable — a question may be presented without a captured answer. |
| **contact_date** | date | ✓ | Mirrors `surveys.contact_date`, and part of the composite primary key. `NOT NULL`, defaults to `CURRENT_DATE`. |

---

##### Key Notes / Business Rules

- This table **normalizes the survey portion** of a `surveys` interaction into individual question/answer rows, exactly mirroring the relationship between `contacts` and `contact_survey_data_maps`.
- Because `surveys` doesn't carry a `product`/`secondary_brand` column the way `contacts` does, brand-trial information here is captured entirely through question rows like `asking_about_trialed_product` — reporting on "what brand was trialed" for this campaign type requires querying this table rather than a flat column on `surveys`.
- Sample questions (`asking_about_trialed_product`, `asking_about_likeability`, `asking_about_trial`) suggest this survey type is oriented around **product trial and satisfaction feedback**, distinct from the brand-consumption focus of `contact_survey_data_maps`.
- This table (together with `surveys`) supports the **same general campaign pattern as retailer contacts** (one interaction, one location, one BR) but **without consumer-identity/phone-number validation** — i.e., the survey can proceed even without first capturing verified consumer information.
- During reporting, the application generally retrieves records where:
    - `survey_id` and `contact_date` match the target survey(s)
    - typically filtered further by specific `question_id`/`question` for question-level analysis

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| survey_data_maps_pkey | BTREE (PK) | id, contact_date | Primary key lookups; composite, consistent with the partitioned design pattern shared with `surveys`/`contacts`. |

---

##### Example Records

| id | survey_id | question_id | question | answer | contact_date |
| --- | --- | --- | --- | --- | --- |
| 229 | 58 | 11 | asking_about_trialed_product | Derby FF | 2026-07-14 |
| 230 | 58 | 12 | asking_about_likeability | Good | 2026-07-14 |
| 231 | 58 | 13 | asking_about_trial | Yes | 2026-07-14 |
| 232 | 58 | 14 | option_selection | Next | 2026-07-14 |

#### <span style="color:#B9770E">Table: `retailer_contacts`</span>
##### Purpose

Records a direct field contact/visit made by a BR **to an outlet itself** (e.g., the shop owner/retailer), rather than to an individual consumer — structurally very similar to `contacts`, but without any consumer-identity fields (`consumer_id`, `otp`, `previous_brand`, `secondary_brand`), since the "contacted party" here is the retail outlet, not a consumer.

**Primary Key:** `id`

> **Note:** No composite/partitioned primary key is shown here (unlike `contacts`, which uses `(id, contact_date)`), despite this table having a `contact_date` column — worth confirming with the DB team whether this table is genuinely un-partitioned or whether the partitioning structure simply wasn't captured in the structure provided.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key. Auto-generated using the `retailer_contacts_id_seq` sequence. |
| **user_id** | integer (int4) | ✓ | Identifier of the BR/user who logged this contact. No enforced FK to `users.id`. |
| **contacted_br** | varchar | ✓ | Login/username string of the BR who made the contact — denormalized companion to `user_id`, same pattern as `contacts.contacted_br`. |
| **campaign_id** | integer (int4) | ✓ | Identifier of the campaign this contact was made under. No enforced FK. |
| **campaign_version** | varchar |  | Version identifier of the campaign configuration/survey active at the time of contact. |
| **location_id** | integer (int4) | ✓ | Identifies the outlet contacted. No enforced FK to `locations.id`. |
| **contact_status** | integer (int4) | ✓ | Outcome of the contact. **Note:** `NOT NULL` here, unlike `contacts.contact_status` (nullable) — every retailer contact must record an outcome. Likely follows the same `35`/`34` success/failure convention. |
| **signature** | varchar |  | File path/reference to a captured signature confirming the visit/interaction. |
| **lat** | numeric (float8) |  | Latitude captured at the time of contact. |
| **long** | numeric (float8) |  | Longitude captured at the time of contact. |
| **radius** | numeric (float8) |  | Distance between the captured GPS point and the expected outlet location — geofence compliance measure. |
| **start** | timestamptz | ✓ | Timestamp the visit/interaction began. **Note:** `NOT NULL`, unlike `contacts.start` (nullable). |
| **end** | timestamptz | ✓ | Timestamp the visit/interaction ended. **Note:** `NOT NULL`, unlike `contacts.end` (nullable). |
| **additional_info** | jsonb | ✓ | Rich JSON payload capturing the full interaction detail. **Note:** `NOT NULL` here, unlike `contacts.additional_info` (nullable) — every retailer contact is expected to carry this payload. |
| **contact_date** | date | ✓ | Calendar date the contact occurred. |
| **device_info** | jsonb | ✓ | Metadata about the device used to log the contact. **Note:** `NOT NULL` here, unlike `contacts.device_info` (nullable). |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **giveable** | integer (int4) |  | Reward/material given to the outlet/retailer as part of this contact, mirroring `contacts.giveable`. |
| **repeat_status** | boolean (bool) |  | Flags whether this is a repeat contact to the same outlet. Default `false`. |
| **source_location** | integer (int4) | ✓ | Identifies an originating/source location context for the contact — mirrors `joint_calls.source_location`. **Note:** `NOT NULL` here (unlike the nullable `source_location` on `joint_calls`), so every retailer contact must carry this value. |

---

##### Key Notes / Business Rules

- This table records a BR's direct visit/contact **with the outlet/retailer itself** (e.g., the shop owner), not with an individual consumer — accordingly, there's no `consumer_id`, `otp`, `previous_brand`, or `secondary_brand` here, unlike `contacts`.
- Several columns that are nullable on `contacts` (`contact_status`, `start`, `end`, `additional_info`, `device_info`) are `NOT NULL` here — reflecting a stricter data-capture requirement for retailer-level visits, where every field is expected to be populated at logging time.
- **`product`** does not appear on this table (unlike `contacts.product`/`consumer_dialer_contacts.product`), consistent with this being an outlet-level interaction rather than a brand-consumption contact.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - scoped to a specific `campaign_id` and `contact_date` range

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| retailer_contacts_pkey | BTREE (PK) | id | Primary key lookups. |

---

#### <span style="color:#B9770E">Table: `retailer_contact_survey_data_map`</span>
##### Purpose

Normalized, one-row-per-question storage of survey answers collected during a `retailer_contacts` interaction — the direct counterpart to `contact_survey_data_maps`, but linked to outlet-level visits instead of consumer contacts.

**Primary Key:** `id`

**Foreign Key:** `contact_id → retailer_contacts.id` (implied; not shown as enforced)

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the survey-answer record. Auto-generated using the `retailer_contact_survey_data_map_id_seq` sequence. |
| **contact_id** | integer (int4) | ✓ | Identifies which `retailer_contacts` record this answer belongs to. No enforced FK shown. |
| **question_id** | integer (int4) | ✓ | Numeric identifier of the survey question. |
| **question** | varchar | ✓ | Human-readable name of the survey question. |
| **answer** | varchar |  | The recorded answer to this question. Nullable — a question may be presented without a captured answer. |

---

##### Key Notes / Business Rules

- This table **normalizes the survey portion** of a `retailer_contacts` interaction into individual question/answer rows, exactly mirroring the relationship between `contacts` and `contact_survey_data_maps`.
- **Note:** unlike `retailer_contacts` (which is not shown with a composite/partitioned PK), and unlike `contact_survey_data_maps` (which uses a composite `(id, contact_date)` PK to match its partitioned parent), this table uses a **simple single-column PK** (`id` alone) — consistent with `retailer_contacts` itself apparently not being date-partitioned.
- During reporting, the application generally retrieves records where:
    - `contact_id` matches the target contact(s)
    - typically filtered further by specific `question_id`/`question` for question-level analysis

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| retailer_contact_survey_data_map_pkey | BTREE (PK) | id | Primary key lookups. |

---

###### 

#### <span style="color:#B9770E">Table: `consumers`</span>
##### Purpose

Master record of individual consumers captured during campaign field activity — storing personal details (name, father's name, DOB, gender, profession), contact information, and the brand(s) associated with them at a point in time. Uses an effective-dating pattern (`from_date`/`to_date`/`is_current`) similar to `sku_item_price` and `geo_location`, allowing a consumer's profile/brand association to be versioned over time rather than overwritten.

**Primary Key:** `id`

> **Note:** Although `campaign_id` appears to reference `campaigns.id`, and `product`/`secondary_brand` appear to reference `sku_items.id` (consistent with the same columns on `contacts`), the database does **not** currently enforce foreign key constraints on any of these columns.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the consumer record. Auto-generated using the `consumers_id_seq` sequence. |
| **name** | varchar | ✓ | Full name of the consumer. |
| **fathers_name** | varchar |  | Name of the consumer's father, captured for identity/record purposes. |
| **dob** | date |  | Consumer's date of birth. this column is correctly typed as `date`. |
| **address** | varchar |  | Consumer's residential address as captured in the field. |
| **contact_no** | integer (int4) | ✓ | Consumer's phone number. |
| **profession** | varchar |  | Consumer's stated profession/occupation. |
| **gender** | varchar(255) |  | Consumer's gender. Allowed values managed by the application layer. |
| **campaign_id** | integer (int4) |  | Identifies the campaign during which this consumer record/version was captured. No enforced FK to `campaigns.id`. |
| **from_date** | timestamp | ✓ | Start of this consumer-record version's effective period. `NOT NULL`, defaults to `CURRENT_TIMESTAMP(3)` (millisecond precision). |
| **to_date** | timestamp | ✓ | End of this consumer-record version's effective period. `NOT NULL`, defaults to the sentinel `'9999-12-31 11:59:00'` for open-ended/current versions — same effective-dating pattern seen elsewhere in the schema, though here the sentinel includes a specific time component rather than midnight. |
| **is_current** | boolean (bool) | ✓ | Flags whether this is the presently active version of the consumer's record. `NOT NULL`, default `true`. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **product** | integer (int4) |  | Primary brand/SKU associated with this consumer. Likely references `sku_items.id`, consistent with the `product` column on `contacts`, though no FK is enforced. |
| **secondary_brand** | integer (int4) |  | Secondary brand/SKU associated with this consumer, following the same primary/secondary fallback pattern as `contacts.secondary_brand`. |

---

##### Key Notes / Business Rules

- This is a **versioned consumer master record** — rather than overwriting a consumer's details on update, the table can carry multiple rows per consumer over time, distinguished by `from_date`/`to_date`/`is_current`, mirroring the effective-dating pattern used in `sku_item_price` and `geo_location`.
- **`product`** and **`secondary_brand`** follow the same primary/fallback brand-tracking pattern documented on `contacts` — both are expected to reference `sku_items.id` at the SKU level, though neither relationship is enforced via foreign key here.
- **`campaign_id`** ties a consumer record to the campaign context in which it was captured, but is not database-enforced against `campaigns.id`.
- Unlike `contacts` (which links a consumer to an outlet via `location_id`), this table stores only the consumer's own biographical/contact details — the actual visit/interaction record lives in `contacts` or `surveys`.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - `is_current = true`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| consumers_pkey | BTREE (PK) | id | Primary key lookups. |
| consumers_contact_no_idx | BTREE | contact_no | Speeds up consumer lookups by phone number — the primary real-world identifier for matching a consumer across campaigns/contacts. |

---

---

---

#### <span style="color:#B9770E">Table: `users_consumer_maps`</span>
##### Purpose

Assigns a specific consumer (by phone number) to a specific user/BR for follow-up or reward disbursement within a campaign, tracking whether that assignment has been completed and, if a reward/material was involved, who it was ultimately given to.

**Primary Key:** `id`

> **Note:** Although `consumer_contact` conceptually relates to a consumer's phone number (as used elsewhere, e.g. `contacts.contact_no`), and `given_to`/`campaign_id` appear to reference `users.id`/`campaigns.id`, the database does **not** currently enforce foreign key constraints on any of these columns.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the mapping record. Auto-generated using the `users_consumer_maps_id_seq1` sequence. |
| **consumer_contact** | integer (int4) | ✓ | The consumer's phone number this mapping concerns. |
| **campaign_id** | integer (int4) | ✓ | Identifies the campaign this consumer mapping applies to. No enforced FK. |
| **contact_date** | date | ✓ | Calendar date this mapping/assignment relates to. |
| **given_to** | integer (int4) |  | Identifier of the user (e.g., a BR) to whom something (likely a reward/material) was given in connection with this consumer. No enforced FK to `users.id`. |
| **is_completed** | boolean (bool) |  | Whether this consumer assignment/task has been completed. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **reason** | varchar |  | Free-text reason, likely populated when `is_completed = false` (e.g., explaining why the task/reward disbursement wasn't completed). |

---

##### Key Notes / Business Rules

- This table tracks a **user-to-consumer assignment/task**, scoped to a campaign and date — likely used for reward/PTR disbursement tracking or targeted follow-up tasks tied to a specific consumer.
- **`given_to`** and **`reason`** together suggest this table records the outcome of an attempted hand-off (e.g., a reward given to the consumer via a specific user) — `reason` capturing why it wasn't completed if `is_completed = false`.
- No `is_deleted` column exists — records appear to be retained permanently once created.
- During reporting, the application generally retrieves records where:
    - `campaign_id` and `contact_date` match the target scope
    - `is_completed` determines whether follow-up/disbursement is outstanding

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| users_consumer_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

#### <span style="color:#B9770E">Table: `cdr_contacts`</span>
##### Purpose

A lightweight, denormalized record of consumer contacts captured specifically for **CDR campaigns** — a distinct campaign type within ECRM — storing the consumer's basic identity, brand/product, outlet, and retailer code in a single flat row rather than the fuller structure used by `contacts`/`retailer_contacts`.

**Primary Key:** `id`

> **Note:** Although `location_id` appears to reference `locations.id`, the database does **not** currently enforce a foreign key constraint on this column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the CDR contact record. Auto-generated using the `cdr_contacts_id_seq` sequence. |
| **contact_no** | integer (int4) | ✓ | Consumer's phone number. |
| **name** | varchar |  | Consumer's name. |
| **dob** | date |  | Consumer's date of birth. Correctly typed as `date` (unlike the `varchar`-typed `dob` seen on `user_infos`/`jml_tickets`). |
| **product** | smallint (int2) | ✓ | Brand/SKU associated with this contact. **Note:** stored as `smallint` here, unlike the `integer`-typed `product` column used on `contacts`/`consumer_dialer_contacts`/`retailer_outlet_dialer_contacts` — a data-type inconsistency worth flagging if this table is ever joined against those. |
| **location_id** | integer (int4) | ✓ | Identifies the outlet where this contact occurred. No enforced FK. |
| **retailer_code** | varchar | ✓ | The outlet's retailer code, denormalized here for direct reference without needing to join to `outlets`/`all_locations_region_to_outlet`. |
| **campaign_id** | smallint (int2) | ✓ | Identifies the CDR campaign this contact belongs to. **Note:** stored as `smallint` here, unlike the `integer`-typed `campaign_id` used almost everywhere else in the schema (`contacts`, `surveys`, `sup_br_maps`, etc.) — a data-type inconsistency and a potential overflow risk if campaign IDs ever exceed the `smallint` range (~32,767). |
| **created_at** | timestamp | ✓ | Timestamp when the record was created. `NOT NULL`, defaults to `CURRENT_TIMESTAMP`. |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. `NOT NULL`, default `false`. |

---

##### Key Notes / Business Rules

- This table records contacts for **CDR campaigns specifically** — a distinct campaign type from the standard retailer/consumer campaigns backing `contacts`/`retailer_contacts`. This explains its **lean, denormalized structure**: no GPS/geofence, device info, survey linkage, or start/end timing columns, since CDR campaigns evidently don't require the fuller field-activity capture used elsewhere.
- **`product`** and **`campaign_id`** being `smallint` rather than the `integer`/`int4` used consistently elsewhere in the schema are notable **data-type inconsistencies** — this could cause overflow issues if either ID space grows beyond ~32,767, and complicates direct joins against `contacts`/`sku_items`/`campaigns` without casting.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - scoped to a specific `campaign_id`/`location_id`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| cdr_contacts_pkey | BTREE (PK) | id | Primary key lookups. |

---

#### <span style="color:#B9770E">Table: `iris_analyses`</span>
##### Purpose

Records the output of an **automated eye/gaze-tracking analysis** performed during a consumer contact's video/AV presentation — specifically checking whether the consumer's eyes were open and the viewing angle at a given point in a promotional video, to verify genuine consumer engagement/attention rather than a BR simply clicking through the survey without the consumer actually watching.

**Primary Key:** `id`

**Foreign Key:** `campaign_id → campaigns.id` (implied; not shown as enforced)

> **Note:** Although `contact_id` and `user_id` appear to reference `contacts.id` and `users.id` respectively, the database does **not** currently enforce foreign key constraints on either column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the iris/gaze analysis record. Auto-generated using the `iris_analyses_id_seq` sequence. |
| **contact_id** | integer (int4) | ✓ | Identifies the parent `contacts` interaction this analysis was performed for. No enforced FK. |
| **user_id** | integer (int4) | ✓ | Identifies the BR who conducted the contact/AV presentation. No enforced FK to `users.id`. |
| **campaign_id** | integer (int4) | ✓ | Identifies the campaign this analysis relates to. No enforced FK. |
| **survey_start_time** | timestamp | ✓ | Timestamp the survey/AV presentation began, providing a reference point for `video_time`. |
| **angle** | numeric (float8) | ✓ | Measured gaze/head angle at the moment of analysis, likely used to determine whether the consumer was actually looking at the screen. |
| **av_question** | varchar | ✓ | The specific video/AV segment or prompt being shown at the time of analysis (e.g., "Please watch the product video"). |
| **is_eye_open** | boolean (bool) | ✓ | Whether the consumer's eyes were detected as open during this moment of the video — a genuine-attention/anti-fraud signal. |
| **video_time** | varchar | ✓ | Timestamp/offset within the video at which this analysis was captured (e.g., "00:03"). **Note:** stored as free-text `varchar` rather than a numeric duration or `interval` type — will need parsing for any time-based aggregation. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This table supports **automated engagement/fraud verification** during video-based campaign content — confirming a consumer's eyes were genuinely open and oriented toward the screen while a promotional AV played, rather than the BR skipping through the video unattended.
- **`angle`** and **`is_eye_open`** together form the core signal used to flag suspicious or non-genuine video-viewing sessions — a consistently closed-eye or extreme-angle reading across a contact's video segments would suggest the consumer wasn't actually watching.
- **`video_time`** being stored as free text rather than a structured duration/interval type means any time-series analysis of gaze data across a video's timeline requires string parsing at the query or application layer.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - `contact_id`/`campaign_id` match the target scope, often aggregated to flag contacts with poor/suspicious engagement signals

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| iris_analyses_pkey | BTREE (PK) | id | Primary key lookups. |

---

###### 

---

##### Example Record

| id | contact_id | user_id | campaign_id | angle | av_question | is_eye_open | video_time |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 9690 | 23589 | 18 | 0 | Please watch the product video | false | 00:03 |

---

---

#### <span style="color:#B9770E">Table: `outlets`</span>
##### Purpose

Master reference table of retail outlet/retailer records, storing detailed trade classification (channel, sub-channel, retail type, geo-class), ownership/contact details, sales/enrollment history, and geo-coordinates. Appears to be the primary source of outlet trade-classification data referenced elsewhere in the schema (e.g., feeding into location/outlet reporting alongside `locations`).

**Primary Key:** `id`

> **Note:** Although `location_id` references `locations.id`, several other numeric-coded columns (`rtid`, `channel`, `subchannel`, `tpg`, `rtltype`, `cname`, `ctype`, `gclass`, `fopp`, `dcc_scope`) appear to be foreign keys to lookup/classification tables not shown here, but none are enforced at the database level in the structure provided.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the outlet record. **Note:** `NOT NULL` with no sequence/default shown — unlike most other tables in the schema, `id` here does not appear to be auto-generated via a sequence, suggesting values may be assigned/imported from an external source rather than generated by the database. |
| **location_id (FK)** | integer (int4) |  | References `locations.id`. Links this outlet's trade/retail record to its corresponding node in the geographic hierarchy. |
| **mtime** | timestamp |  | Modification timestamp from the source/originating system for this outlet record. |
| **name** | varchar |  | Outlet's display name (e.g., "Akram Store1"). |
| **dpid** | integer (int4) |  | Distributor Point identifier — links the outlet to its assigned distributor point. |
| **rtid** | integer (int4) |  | Route identifier/code. Default `0`. |
| **channel** | integer (int4) |  | Trade channel classification code (e.g., Urban/Rural type classification). Default `0`. |
| **subchannel** | integer (int4) |  | Trade sub-channel classification code. Default `0`. |
| **tpg** | integer (int4) |  | Trade/price-group classification code. Default `0`. |
| **rtltype** | integer (int4) |  | Retail type classification code. Default `0`. |
| **cname** | integer (int4) |  | Cluster name/identifier code. Default `0`. **Note:** despite the name suggesting text, this is numeric — the actual cluster name text is stored separately in `cluster_name`. |
| **cluster_name** | varchar |  | Human-readable cluster name (e.g., "Natore"). |
| **ctype** | integer (int4) |  | Cluster type classification code. Default `0`. |
| **gclass** | integer (int4) |  | Geo-classification code (e.g., Urban/Rural). Default `0`. |
| **gtag** | varchar |  | Geo-tag descriptor (e.g., "Rail Gate" — a landmark or geo-identifying tag for the outlet's location). |
| **onature** | integer (int4) |  | Outlet nature/type classification code. Default `0`. |
| **owner** | varchar |  | Name of the outlet's owner. |
| **contact** | varchar |  | Outlet's contact phone number. |
| **pinfo** | varchar |  | Additional partner/product information text field. |
| **fopp** | integer (int4) |  | Classification code, business meaning not fully documented in structure provided — likely a franchise/ownership-program-participation flag. Default `0`. |
| **address** | varchar |  | Physical address of the outlet. |
| **enrolltime** | timestamp |  | Timestamp the outlet was enrolled/onboarded into the system. |
| **lastsaletime** | timestamp |  | Timestamp of the outlet's most recent recorded sale. |
| **stts** | integer (int4) |  | Status code of the outlet (e.g., active/inactive). Allowed values managed by the application layer. |
| **lastupdate** | timestamp |  | Timestamp of the outlet's most recent data update from its source system. |
| **smc** | varchar |  | Sales/market classification or code, business meaning not fully documented in structure provided. |
| **retailer_code** | varchar |  | Unique-ish retailer/outlet code used for cross-system identification (indexed for lookup). |
| **partner_code** | varchar |  | Code identifying an associated partner/agency for this outlet. |
| **platform_type** | varchar |  | Classification of the outlet's platform type (e.g., "TLP Channel" per sample data). |
| **platform_code** | varchar |  | Code identifying the specific platform this outlet is associated with. |
| **dcc_scope** | integer (int4) |  | Classification code, business meaning not fully documented in structure provided — possibly "Distribution/Direct Coverage Channel" scope flag. Default `0`. |
| **reporting_sub** | varchar |  | Reporting sub-classification text (e.g., "ASU 30" in sample data — matches age/segment terminology seen elsewhere in consumer segmentation work). |
| **e_lat** | numeric (float8) |  | Enrollment/reference latitude of the outlet. |
| **e_long** | numeric (float8) |  | Enrollment/reference longitude of the outlet. |

---

##### Key Notes / Business Rules

- This is the **master trade/retail classification table for physical outlets**, distinct from `locations` (which models the pure geographic/organizational hierarchy) — `outlets` carries the rich retail-specific attributes (channel, sub-channel, retail type, ownership, sales history) for a given outlet, joined back to the hierarchy via `location_id`.
- Many classification columns (`channel`, `subchannel`, `rtltype`, `ctype`, `gclass`, `cname`, `onature`, `fopp`, `dcc_scope`) are stored as **integer codes without enforced foreign keys** to their respective lookup tables — these require a separate code-to-label reference (not shown in the structure provided) to interpret meaningfully in reporting.
- **`retailer_code`** is the more human/business-facing identifier used for cross-referencing (e.g., against `all_locations_region_to_outlet.retailer_code`), while `id` is the internal primary key.
- **`enrolltime`**, **`lastsaletime`**, and **`lastupdate`** together support outlet lifecycle and activity-recency reporting (e.g., identifying dormant/inactive outlets by comparing `lastsaletime` against the current date).
- No `is_deleted` column exists on this table — outlet activity/validity should be evaluated via **`stts`** (status) rather than a soft-delete flag.
- During reporting, the application generally retrieves records where:
    - `stts` indicates an active outlet
    - joined to `locations` via `location_id` for full geographic hierarchy context

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| retailers_pkey | BTREE (PK) | id | Primary key lookups. **Note:** index name inconsistent with table name (`outlets`) — see naming note above. |
| retailer_code_idx | BTREE | retailer_code | Speeds up outlet lookups by the business-facing retailer code, the most likely external join key. |

---

---


---

<a id="module-8"></a>

## <span style="color:#1A5276">Module 8: Field Quality Assurance & Supervision</span>

*13 item(s) in this module.*

#### <span style="color:#B9770E">Table: `daily_checks`</span>
##### Purpose

Records each user's daily geo-tagged check-in/check-out events, including selfie capture, GPS location, geofence radius validation, and on-leave status. This is the operational table behind field-force attendance tracking and location-compliance auditing (e.g., confirming a BR actually checked in from within their assigned outlet's geofence).

**Primary Key:** `id`

**Foreign Key:** `user_id → users.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key. Auto-generated using the `daily_checks_id_seq1` sequence. |
| **user_id (FK)** | integer (int4) | ✓ | References `users.id`. Identifies which user performed the check. |
| **check_type** | varchar(255) | ✓ | Type of check event (e.g., `check_in`). Allowed values are managed by the application layer. |
| **check_date** | date | ✓ | Calendar date of the check event. |
| **check_time** | time | ✓ | Time of day the check event was recorded. |
| **img_url** | varchar[] (`_varchar`) |  | Array of selfie/photo references captured during the check. **Note:** in sample data this stores a stringified/escaped JSON blob rather than a clean array of URLs — appears double-encoded (a JSON object serialized as a string, then wrapped in an array). Worth validating with the application team whether this is intentional or a serialization bug. |
| **point** | geometry | ✓ | GPS coordinate (PostGIS geometry, SRID 3857) captured at the time of check. Represents where the user physically was. |
| **radius** | numeric (float8) | ✓ | Distance (likely meters) between the captured `point` and the expected/assigned location point — used to determine geofence compliance. |
| **on_time** | boolean (bool) | ✓ | Whether the check occurred within the expected scheduled time window. |
| **geo_validated** | boolean (bool) |  | Whether the captured location passed geofence validation against the expected outlet/point location. Nullable — absence may indicate validation wasn't run rather than that it failed. |
| **on_leave** | boolean (bool) | ✓ | Flags that the user was on approved leave for this date. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **additional_info** | jsonb |  | Supplementary JSON payload duplicating/extending the check event — typically includes `lat`, `long`, an `img_capture` array (type + img_url pairs), and a `mock_location` flag (fake-GPS detection). |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. Default `false`. |
| **deleted_by** | integer (int4) |  | Identifier of the user who soft-deleted this record, if applicable. No enforced FK to `users.id`. |

---

##### Key Notes / Business Rules

- This is the **operational attendance/geo-compliance log** for field-force check-in activity.
- Each check event captures **both** a structured `point`/`radius` pair and a richer `additional_info` JSON blob — the two overlap (lat/long duplicated), so reporting queries should pick one source of truth consistently rather than mixing them.
- **`mock_location`** (inside `additional_info`) flags GPS-spoofing attempts and is important for audit/fraud-detection reporting even though it isn't a first-class column.
- **`geo_validated`** and **`on_time`** together determine whether a check counts as fully compliant; `on_leave = true` should generally exclude the day from compliance/violation reporting.
- **`deleted_by`** captures who performed a soft-deletion, but is not database-enforced against `users`.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - `check_date` falls within the target reporting range for the `user_id`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| daily_checks_pkey | BTREE (PK) | id | Primary key lookups. |
| idx_daily_checks_user_id | BTREE | user_id | Speeds up per-user check history lookups. |
| daily_checks_check_date_idx | BTREE | user_id, check_date | Speeds up per-user attendance queries scoped to a date or date range — the most common reporting pattern. |

---

---

#### <span style="color:#B9770E">Table: `supervisor_contacts`</span>
##### Purpose

Records post-contact quality-assurance (QA) verification calls made by Field Force Supervisors (FFSup) to consumers who were previously contacted by a Brand Representative (BR) in the field. This is the **Call Checkback Survey** process: after a BR logs a consumer interaction in `contacts`, the system selects a subset of those contacts for random verification, and a supervisor calls the consumer to confirm the interaction genuinely took place and followed campaign guidelines. This table stores the metadata of that verification call — who made it, when, how long it lasted, and its outcome.

**Primary Key:** `id`

**Foreign Keys:** `user_id → users.id` (the supervisor making the call), `br_id → users.id` (the BR whose original contact is being verified), `campaign_id → campaigns.id`

> **Note:** This table is **not** directly foreign-keyed to `contacts`. The link back to the original BR contact is a **logical, application-level join** on a 4-key composite: consumer phone number, `br_id`, `campaign_id`, and `contact_date` — not an enforced database relationship.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the verification call record. Auto-generated using the `supervisor_contacts_id_seq` sequence. |
| **user_id (FK)** | integer (int4) | ✓ | References `users.id`. Identifies the **Field Force Supervisor (FFSup)** who made the verification call. |
| **campaign_id (FK)** | integer (int4) | ✓ | References `campaigns.id`. The campaign the original BR contact (and therefore this verification) belongs to. |
| **call_start** | timestamp | ✓ | Timestamp the supervisor's verification call began. |
| **call_end** | timestamp | ✓ | Timestamp the supervisor's verification call ended. |
| **duration** | integer (int4) | ✓ | Duration of the call in seconds, derived from `call_start`/`call_end`. |
| **contact** | integer (int4) | ✓ | The consumer's phone number that was called for verification — one of the four keys used to join back to the original `contacts` record. |
| **br_id (FK)** | integer (int4) | ✓ | References `users.id`. Identifies the **Brand Representative (BR)** whose original field contact is being verified — the second of the four join keys. |
| **contact_date** | date | ✓ | Date of the original BR contact being verified — the third join key, matched against `contacts.contact_date`. |
| **latitude** | numeric (float8) | ✓ | Latitude of the supervisor at the time the verification call was made. |
| **longitude** | numeric (float8) | ✓ | Longitude of the supervisor at the time the verification call was made. |
| **status** | integer (int4) | ✓ | Outcome status code of the verification call (e.g., `35`/`34` mirroring the successful/failed convention used in `contacts.contact_status`, based on sample data). Allowed values managed by the application layer. |
| **reason** | varchar |  | Free-text or coded reason explaining the call outcome, typically populated when a call fails or is inconclusive. |

---

##### Key Notes / Business Rules

- This table exists to power the **Call Checkback Survey**, a QA audit process distinct from the original consumer contact captured in `contacts`. Its purpose is to independently verify BR field activity — not to collect a new consumer survey.
- The workflow: a BR logs a contact in `contacts` → the system randomly selects some contacts for verification → an FFSup calls the consumer and completes a verification questionnaire → the call metadata is stored here, and the questionnaire answers are stored in `supervisor_contact_survey_data_maps`.
- **The link back to the original BR contact is a 4-key composite join** — consumer phone number (`contact`), `br_id`, `campaign_id`, and `contact_date` — matched against the corresponding columns on `contacts`. There is no enforced foreign key for this relationship, so joins must match on all four keys together to avoid false matches.
- Because the report is built around verifying BR quality, the **Call Checkback Report is anchored on `supervisor_contacts`**, not `contacts` — the supervisor's call is the unit of analysis, even though it references an underlying BR contact.
- **`user_id`** and **`br_id`** are two distinct roles referencing the same `users` table — the supervisor performing the check versus the BR being checked. These should never be confused in reporting joins.
- Business objectives served by this table: confirming BR contacts actually happened, validating the accuracy of data collected in the field, checking campaign-script/communication compliance, detecting fraudulent or fabricated contacts, and measuring overall field-team execution quality.
- During reporting, the application generally retrieves records where:
    - `status` indicates a successfully completed verification call
    - scoped by `campaign_id` and `contact_date` range, joined to `contacts` on the 4-key composite

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| supervisor_contacts_pkey | BTREE (PK) | id | Primary key lookups. |
| idx_supervisor_contacts_user_id | BTREE | user_id | Speeds up lookups of all verification calls made by a given supervisor. |
| idx_supervisor_contacts_br_id | BTREE | br_id | Speeds up lookups of all verification calls made regarding a given BR — key for BR-level compliance reporting. |

---

##### Example Records

| id | user_id | campaign_id | br_id | contact | contact_date | duration | status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 732979 | 726 | 186 | 30886 | 1917580438 | 2026-04-12 | 13 | 35 |
| 733118 | 7544 | 186 | 969 | 1758770939 | 2026-04-12 | 12 | 35 |
| 732033 | 1174 | 186 | 17457 | 1628800511 | 2026-04-11 | 58 | 35 |
| 732978 | 703 | 186 | 9776 | 1726812300 | 2026-04-12 | 0 | 34 |

---

---

#### <span style="color:#B9770E">Table: `supervisor_contact_survey_data_maps`</span>
##### Purpose

Stores the question-by-question answers collected by a Field Force Supervisor during a **Call Checkback verification call** (the quality-assurance follow-up call recorded in `supervisor_contacts`). Each row is one answered question from the verification questionnaire — for example, whether the consumer actually received the BR's call, whether their name/age/primary brand were recorded correctly, and whether the BR followed campaign script and communication guidelines.

**Primary Key:** `id`

**Foreign Key:** `sup_contact_id → supervisor_contacts.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the survey-answer record. Auto-generated using the `supervisor_contact_survey_data_maps_id_seq` sequence. |
| **sup_contact_id (FK)** | integer (int4) | ✓ | References `supervisor_contacts.id`. Identifies which verification call this answer belongs to. |
| **question_id** | integer (int4) | ✓ | Numeric identifier of the verification questionnaire item (e.g., `1` = receive_call, `5` = correct_primary_brand, `22` = giving_thanks). |
| **question** | varchar(255) | ✓ | Human-readable question code (e.g., `receive_call`, `correct_consumer_name`, `telling_about_ptr_offer`, `giving_thanks`). |
| **answer** | varchar(255) |  | The consumer's recorded response to the question, typically a yes/no style answer in Bengali (e.g., "হ্যাঁ" = "Yes", "প্রযোজ্য নয়" = "Not applicable"). Nullable — a question may go unanswered in some calls. |

---

##### Key Notes / Business Rules

- This table is the **normalized answer set for the Call Checkback verification questionnaire** — one row per question per verification call, joined back to its parent call via `sup_contact_id → supervisor_contacts.id`.
- The questionnaire is a **quality audit of the BR's field execution**, not a consumer-facing survey. Its questions cluster around a few themes:
    - **Contact authenticity**: did the consumer actually receive the BR's call and agree to continue the conversation (`receive_call`, `continue_conversation`).
    - **Data accuracy**: were the consumer's name, age, and primary brand correctly recorded during the original contact (`correct_consumer_name`, `correct_consumer_age`, `correct_primary_brand`).
    - **Script/communication compliance**: did the BR deliver required campaign messaging and promotions (`telling_about_derby_plus`, `telling_about_ptr_offer`, `telling_about_chorki_offer`, `telling_about_subscription_card`, `giving_thanks`, etc.).
    - **Product engagement**: did the BR show relevant materials or ask about product trials (`showing_av`, `showing_bs_av`, `asking_about_stick_trial`, `asking_about_pack`).
- Answers are predominantly Bengali yes/no-style responses ("হ্যাঁ" = Yes) or an explicit not-applicable value ("প্রযোজ্য নয়"), rather than free text — reporting should account for the specific answer vocabulary used rather than assuming a strict boolean.
- Questions are not necessarily sequential/complete for every call — sample data for one call skips `question_id` 20, indicating some questionnaire items may be conditionally shown or optional depending on prior answers.
- Because this table underlies **fraud detection and field-compliance measurement**, low or negative response rates on authenticity questions (`receive_call`, `continue_conversation`) for a given BR are a key signal for flagging potentially fabricated contacts.
- During reporting, the application generally retrieves records where:
    - `sup_contact_id` matches the target verification call(s)
    - typically filtered further by specific `question_id`/`question` for compliance-rate or fraud-signal analysis

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| supervisor_contact_survey_data_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Records

| id | sup_contact_id | question_id | question | answer |
| --- | --- | --- | --- | --- |
| 7862216 | 732979 | 1 | receive_call | হ্যাঁ |
| 7862218 | 732979 | 3 | correct_consumer_name | হ্যাঁ |
| 7862220 | 732979 | 5 | correct_primary_brand | হ্যাঁ |
| 7862234 | 732979 | 19 | telling_about_subscription_card | প্রযোজ্য নয় |
| 7862236 | 732979 | 22 | giving_thanks | হ্যাঁ |

#### <span style="color:#B9770E">Table: `joint_calls`</span>
##### Purpose

Records a **live, in-field observation session** where a Field Force Supervisor (FFSup) physically accompanies a Brand Representative (BR) during an actual consumer interaction, rather than verifying it afterward by phone. This is the **Live Observation Report**'s core table — each record represents one joint visit, capturing the supervisor's and BR's identities, the campaign, the GPS location/geofence data of the visit, and the device used. The corresponding checklist responses assessing the BR's real-time compliance are stored in `joint_calls_survey_data_maps`.

**Primary Key:** `id`

**Foreign Keys:** `user_id → users.id` (the supervisor), `ff_id → users.id` (the BR being observed), `campaign_id → campaigns.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the joint call/observation record. Auto-generated using the `joint_calls_id_seq` sequence. |
| **user_id (FK)** | integer (int4) | ✓ | References `users.id`. Identifies the **Field Force Supervisor (FFSup)** conducting the live observation. |
| **ff_id (FK)** | integer (int4) | ✓ | References `users.id`. Identifies the **Brand Representative (BR)** being observed during the field visit. |
| **campaign_id (FK)** | integer (int4) | ✓ | References `campaigns.id`. The campaign under which this joint field visit took place. |
| **lat** | numeric (float8) |  | Latitude captured at the location of the joint visit. |
| **long** | numeric (float8) |  | Longitude captured at the location of the joint visit. |
| **radius** | numeric (float8) |  | Distance between the captured GPS point and the expected outlet/location point — used for geofence compliance validation, mirroring the pattern in `daily_checks` and `contacts`. |
| **start** | timestamptz |  | Timestamp the joint observation/visit began. Timezone-aware. |
| **end** | timestamptz |  | Timestamp the joint observation/visit ended. Timezone-aware. Combined with `start`, defines the visit duration. |
| **contact_date** | date | ✓ | Calendar date of the joint field visit. |
| **device_info** | jsonb |  | Metadata about the device used to log the observation: IMEI, brand/model, device ID, app/API/OS versions, network type, security patch level — same structure as `contacts.device_info`. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **source_location** | integer (int4) |  | Identifier referencing an originating/source location context for the visit. No enforced FK — exact business meaning (likely a legacy or external location reference, similar to `locations.source_id`) should be confirmed with the application team. |
| **location_id** | integer (int4) |  | Identifies the outlet/location where the joint observation took place. No enforced FK shown, but conceptually parallels `contacts.location_id` (an Outlet-level `locations.id`). |

---

##### Key Notes / Business Rules

- This table is the core of the **Live Observation Report** — a real-time field-monitoring process distinct from the **Call Checkback Report** (`supervisor_contacts`), which verifies contacts *after the fact* via phone. Here, the supervisor is physically present *during* the BR's actual consumer interaction.
- **`user_id`** and **`ff_id`** are two distinct roles referencing the same `users` table — the supervisor conducting the observation versus the BR being observed. These should never be confused in reporting joins (mirrors the `user_id`/`br_id` pattern in `supervisor_contacts`).
- The observation checklist (in `joint_calls_survey_data_maps`) evaluates whether the BR followed standard operating procedure during the visit — correct outlet/cluster, proper attire, shop-owner permission, approved devices/apps, correct consumer profile selection, and full delivery of campaign messaging and offers.
- The Live Observation Report combines this table with campaign, supervisor, and BR details, plus the full **location hierarchy (Region → Area → Territory → Distribution House → Distributor Point)**, to give a comprehensive field-execution view.
- Business objectives served: monitoring real-time BR performance, verifying SOP/guideline compliance, confirming accurate delivery of campaign messages, identifying BR training/coaching needs, and supporting performance evaluation — through **direct observation**, as opposed to the Call Checkback Report's **post-contact verification** or the Daily Raw Report's record of the **original consumer contact**.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - scoped by `campaign_id` and `contact_date` range, typically joined to the location hierarchy via `location_id`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| joint_calls_pkey | BTREE (PK) | id | Primary key lookups. |
| idx_joint_calls_ff_id | BTREE | ff_id | Speeds up lookups of all joint observations for a given BR — key for BR-level performance/compliance reporting. |
| idx_joint_calls_user_id | BTREE | user_id | Speeds up lookups of all joint observations conducted by a given supervisor. |

---

##### Example Record

| id | user_id | ff_id | campaign_id | contact_date | start | end | location_id |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 700940 | 3889 | 3738 | 186 | 2026-04-07 | 2026-04-07 09:13:02+00 | 2026-04-07 09:15:21+00 | 1071722 |

---

---

#### <span style="color:#B9770E">Table: `joint_calls_survey_data_maps`</span>
##### Purpose

Stores the question-by-question responses from the **live observation checklist** completed by a Field Force Supervisor during a `joint_calls` field visit. Each row is one answered checklist item — for example, whether the BR visited the correct cluster, wore proper attire, obtained shop-owner permission, used only approved devices/apps, or delivered required campaign messaging. This is the real-time counterpart to `supervisor_contact_survey_data_maps`, which captures the *post-contact phone verification* checklist instead.

**Primary Key:** `id`

**Foreign Key:** `joint_call_id → joint_calls.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the observation-answer record. Auto-generated using the `joint_calls_survey_data_maps_id_seq` sequence. |
| **joint_call_id (FK)** | integer (int4) | ✓ | References `joint_calls.id`. Identifies which live observation session this answer belongs to. |
| **question_id** | integer (int4) | ✓ | Numeric identifier of the observation checklist item (e.g., `1` = ra_correct_cluster, `4` = exists_third_part_app, `20` = giving_thanks). |
| **question** | varchar(255) | ✓ | Human-readable checklist question code (e.g., `ra_correct_attire`, `shop_owner_permission`, `choosing_correct_consumer_profile`, `telling_about_ptr_offer`). |
| **answer** | varchar(255) |  | The supervisor's recorded observation for this checklist item, typically a yes/no response in Bengali (e.g., "হ্যাঁ" = "Yes", "না" = "No"). Nullable — an item may go unanswered in some observations. |

---

##### Key Notes / Business Rules

- This table is the **normalized answer set for the Live Observation checklist** — one row per checklist item per joint visit, joined back to its parent session via `joint_call_id → joint_calls.id`.
- The checklist evaluates **real-time BR field compliance** across several themes:
    - **Location/process correctness**: was the correct cluster/outlet visited, was shop-owner permission obtained before starting (`ra_correct_cluster`, `shop_owner_permission`).
    - **Presentation/conduct**: was proper company attire worn (`ra_correct_attire`).
    - **Technology compliance**: was only the approved app/device used, with no unauthorized third-party app present (`exists_third_part_app`).
    - **Consumer targeting accuracy**: was the correct consumer profile selected (`choosing_correct_consumer_profile`).
    - **Campaign message delivery**: did the BR communicate required product information, promotions, and trial offers (`telling_about_derby_plus`, `telling_about_ptr_offer`, `telling_about_chorki_offer`, `telling_about_subscription_card`, `giving_thanks`, etc.), and show relevant materials (`showing_av`, `showing_bs_av`, `asking_about_stick_trial`, `asking_about_pack`).
- Unlike `supervisor_contact_survey_data_maps` (which verifies a contact *after the fact* by phone), this checklist is completed **while the supervisor is physically present**, directly observing the BR–consumer interaction as it happens.
- Answers are predominantly Bengali yes/no responses ("হ্যাঁ" = Yes, "না" = No) rather than free text — reporting should account for this specific answer vocabulary.
- Low compliance rates on SOP-adherence items (`ra_correct_cluster`, `shop_owner_permission`, `exists_third_part_app`) are key signals for identifying BR training/coaching needs and enforcing standard operating procedure.
- During reporting, the application generally retrieves records where:
    - `joint_call_id` matches the target observation session(s)
    - typically filtered further by specific `question_id`/`question` for compliance-rate analysis, and combined with campaign, supervisor, BR, and location-hierarchy details for the full Live Observation Report

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| joint_calls_survey_data_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Records

| id | joint_call_id | question_id | question | answer |
| --- | --- | --- | --- | --- |
| 8028728 | 700940 | 1 | ra_correct_cluster | হ্যাঁ |
| 8028730 | 700940 | 3 | shop_owner_permission | হ্যাঁ |
| 8028731 | 700940 | 4 | exists_third_part_app | না |
| 8028732 | 700940 | 5 | choosing_correct_consumer_profile | হ্যাঁ |
| 8028747 | 700940 | 20 | giving_thanks | না |

#### <span style="color:#B9770E">Table: `campaign_joint_call_maps`</span>
##### Purpose

Stores the **versioned survey/questionnaire definition** used for a campaign's Live Observation (`joint_calls`) checklist — the JSON-encoded question tree (including branching/skip logic in Bengali) that a supervisor completes during a field visit, along with target-setting configuration (e.g., how many joint calls per Field Force member are required). This is effectively the **survey schema/config**, distinct from `joint_calls_survey_data_maps`, which stores the actual answers given.

**Primary Key:** `id`

**Foreign Key:** `camp_id → campaigns.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the campaign joint-call config record. Auto-generated using the `campaign_joint_call_maps_id_seq` sequence. |
| **camp_id (FK)** | integer (int4) | ✓ | References `campaigns.id`. The campaign this joint-call questionnaire configuration applies to. |
| **joint_call** | jsonb | ✓ | The full survey definition: an array of question blocks, each with an `id`, `type` (e.g., `multipleChoice`), `options` (with branching `referTo` targets), and a `question` object holding the Bengali question text (`slug`) and its internal code name (`alias`, e.g., `ra_correct_cluster`). Also includes `jumping_logic` for conditional branching/skip rules and a final `submit` termination point. |
| **version** | integer (int4) | ✓ | Version number of this questionnaire configuration. `NOT NULL`, default `1`. Supports evolving the checklist over time while preserving prior versions. |
| **from_date** | timestamp |  | Start of this configuration version's effective period. Defaults to `CURRENT_TIMESTAMP`. |
| **to_date** | timestamp |  | End of this configuration version's effective period. Defaults to the sentinel `9999-12-31 00:00:00` for open-ended/current versions, same effective-dating pattern used throughout the schema. |
| **is_current** | boolean (bool) |  | Flags whether this is the presently active questionnaire version for the campaign. Default `true`. |
| **conditions** | jsonb |  | Target/validation settings for the joint-call program (e.g., `perFFjointCallCount`, `totalJointCallTarget`, `totalTargetValidation`) — defines how many joint observations each Field Force member/supervisor is expected to complete. |

---

##### Key Notes / Business Rules

- This table is the **schema/configuration layer** behind the Live Observation checklist — it defines *what questions exist and how they branch*, while `joint_calls_survey_data_maps` stores *what was actually answered* for a given `joint_calls` session.
- The **`joint_call`** JSON structure directly maps to what shows up as individual rows in `joint_calls_survey_data_maps` — each block's `alias` (e.g., `ra_correct_cluster`, `shop_owner_permission`, `giving_thanks`) corresponds to the `question` column values seen there, and each block's `id` corresponds to `question_id`.
- **`jumping_logic`**/`skip`/`referTo` fields implement **conditional branching**: depending on the supervisor's answer to one question, the flow can skip ahead or terminate early (e.g., answering "No" on `receive_call` in the callback flow can jump straight to `submit`), meaning not every joint call session will have answers to every possible question.
- **`conditions`** defines **target-setting business rules** for the joint-call program — in the sample data, each Field Force member is expected to complete `8` total joint calls (`totalJointCallTarget`), with `totalTargetValidation: true` presumably enforcing that this target is checked/reported against.
- This is a **versioned configuration table**, following the same `from_date`/`to_date`/`is_current`/`version` effective-dating pattern seen in `sku_item_price` and `geo_location` — a campaign's questionnaire can evolve, with historical versions preserved.
- During reporting/survey-rendering, the application generally retrieves records where:
    - `is_current = true`
    - `camp_id` matches the target campaign

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| campaign_joint_call_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

#### <span style="color:#B9770E">Table: `campaign_callcheckback_maps`</span>
##### Purpose

Stores the **versioned survey/questionnaire definition** used for a campaign's Call Checkback verification (`supervisor_contacts`) — the JSON-encoded question tree with branching logic that a supervisor completes during a post-contact verification phone call, along with target-setting configuration for how many callback calls are required. This is the phone-verification counterpart to `campaign_joint_call_maps`.

**Primary Key:** `id`

**Foreign Key:** `camp_id → campaigns.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the campaign callback-config record. Auto-generated using the `campaign_callcheckback_maps_id_seq` sequence. |
| **camp_id (FK)** | integer (int4) | ✓ | References `campaigns.id`. The campaign this callback questionnaire configuration applies to. |
| **survey** | jsonb | ✓ | The full survey definition — mirrors `campaign_joint_call_maps.joint_call` in structure: question blocks with `id`, `type`, `options`/branching `referTo` targets, and `question.slug`/`question.alias` (e.g., `receive_call`, `continue_conversation`, `correct_primary_brand`), plus `jumping_logic`. |
| **version** | integer (int4) | ✓ | Version number of this questionnaire configuration. `NOT NULL`, default `1`. |
| **conditions** | jsonb |  | Target/business-rule settings for the callback program — in sample data includes `buffer` (a scheduling/timing buffer, likely in minutes), `per_ff` and `per_call` limits, `call_checkback_target` (total required verification calls), and a nested `target_settings` object echoing joint-call-style targets. |
| **from_date** | timestamp |  | Start of this configuration version's effective period. Defaults to `CURRENT_TIMESTAMP`. |
| **to_date** | timestamp |  | End of this configuration version's effective period. Defaults to the sentinel `9999-12-30 00:00:00`. **Note:** this sentinel is `12-30`, not `12-31` as used in `campaign_joint_call_maps` and elsewhere in the schema — a one-day inconsistency worth flagging, though functionally still serves as an "open-ended" marker far in the future. |
| **is_current** | boolean (bool) |  | Flags whether this is the presently active questionnaire version for the campaign. Default `true`. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. **Note:** unlike `campaign_joint_call_maps`, this table does include an explicit `is_deleted` column. |
| **custom_query** | text |  | Optional custom SQL query associated with this callback configuration — likely supports campaign-specific reporting variations or data-source overrides. Business usage should be confirmed with the application team. |

---

##### Key Notes / Business Rules

- This table is the **schema/configuration layer** behind the Call Checkback questionnaire — parallel in purpose and structure to `campaign_joint_call_maps`, but feeding `supervisor_contact_survey_data_maps` instead of `joint_calls_survey_data_maps`.
- **`survey`**'s JSON structure directly maps to rows in `supervisor_contact_survey_data_maps` — each block's `alias` (e.g., `receive_call`, `correct_consumer_name`, `contacted_by_ra`) corresponds to the `question` column there, and each block's `id` corresponds to `question_id`.
- **Branching logic** allows early termination: e.g., answering "না" (No) to `receive_call` jumps directly to `submit`, and a follow-up `not_want_to_talk` reason question (with options like "Number off", "Busy", "Wrong Number") appears only when the consumer declines to continue — meaning not every verification call will have answers to the full question set.
- **`conditions`** encodes **operational targets and constraints** for the callback program: `per_ff`/`per_call` likely cap how many callbacks are made per Field Force member per call session, `buffer` likely defines a minimum time gap (e.g., in minutes) before a contact becomes eligible for callback verification, and `call_checkback_target` sets the overall required verification volume.
- The `to_date` sentinel here (`9999-12-30`) is inconsistent with the `9999-12-31` sentinel convention used in `campaign_joint_call_maps` and other tables — a minor data-standard inconsistency worth normalizing.
- This is a **versioned configuration table**, following the same effective-dating pattern (`from_date`/`to_date`/`is_current`/`version`) as `campaign_joint_call_maps`, `sku_item_price`, and `geo_location`.
- Soft deletion is handled using **`is_deleted`**.
- During reporting/survey-rendering, the application generally retrieves records where:
    - `is_deleted = false`
    - `is_current = true`
    - `camp_id` matches the target campaign

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| campaign_callcheckback_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

---

---

#### <span style="color:#B9770E">Table: `sup_geo_tags`</span>
##### Purpose

Records a supervisor's GPS location tag at a specific point in time, likely used as a geofence-compliance/attendance check for supervisors, mirroring the geo-tagging pattern seen in `daily_checks` (BR check-ins) and `contacts`/`joint_calls` (GPS at time of field activity).

**Primary Key:** `id`

> **Note:** Although `user_id` appears to reference a user record, the database does **not** currently enforce a foreign key constraint on this column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the geo-tag record. Auto-generated using the `sup_geo_tags_id_seq` sequence. |
| **user_id** | integer (int4) | ✓ | Identifier of the supervisor whose location is being tagged. No enforced FK to `users.id`. |
| **point** | geometry |  | GPS coordinate (PostGIS geometry) captured at the time of tagging. |
| **radius** | numeric (float8) | ✓ | Distance between the captured `point` and an expected/reference location — geofence compliance measure, following the same pattern as `daily_checks.radius`/`contacts.radius`. |
| **tagging_date** | date | ✓ | Calendar date of this geo-tag event. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This table applies the same **geofence-compliance pattern used elsewhere in ECRM** (`daily_checks`, `contacts`, `joint_calls`) specifically to supervisors — likely verifying a supervisor's presence at an expected checkpoint (e.g., during joint calls or callback verification rounds) rather than a BR's outlet visit.
- No `is_deleted` column exists — geo-tag records appear to be retained permanently once created, functioning as an immutable audit log.
- During reporting, the application generally retrieves records where:
    - `user_id` and `tagging_date` match the target supervisor/date range, cross-referenced against `radius` for compliance flagging

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| sup_geo_tags_pkey | BTREE (PK) | id | Primary key lookups. |

---

#### <span style="color:#B9770E">Table: `sup_br_maps`</span>
##### Purpose

Defines which supervisor is assigned to oversee which BR, for a given campaign, on a given date — the foundational **supervisor-to-BR assignment record** that scopes downstream field-quality-assurance activity (Live Observations in `joint_calls`, and generally which BRs a supervisor is responsible for on a given day).

**Primary Key:** `id`

**Foreign Keys:** `sup_id → users.id`, `br_id → users.id`, `campaign_id → campaigns.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the supervisor-BR assignment. Auto-generated using the `sup_br_maps_id_seq` sequence. |
| **sup_id (FK)** | integer (int4) | ✓ | References `users.id`. The supervisor responsible for overseeing the BR on this date/campaign. |
| **br_id (FK)** | integer (int4) | ✓ | References `users.id`. The BR being supervised. |
| **campaign_id (FK)** | integer (int4) | ✓ | References `campaigns.id`. The campaign this supervisory assignment applies to. |
| **contact_date** | date | ✓ | The specific date this supervisor-BR assignment is in effect. |

---

##### Key Notes / Business Rules

- This is the **base assignment table** establishing which supervisor is responsible for which BR, scoped to a specific campaign and date — a daily/per-campaign supervisory roster rather than a permanent org-chart relationship.
- A **unique constraint** on `(sup_id, br_id, campaign_id, contact_date)` — enforced by **two separate, functionally identical unique indexes** (`sup_br_maps_un` and `unique_by_date_campaign_user_id`) — prevents duplicate assignment rows for the same supervisor/BR/campaign/day combination. Having two indexes with identical column sets is redundant and a candidate for consolidation.
- No `is_deleted` column exists — assignments appear to be created fresh per day/campaign rather than updated/soft-deleted, consistent with the date-scoped nature of the table.
- During reporting, the application generally retrieves records where:
    - `sup_id`/`br_id` and `contact_date` match the target supervisor/BR/date for daily oversight scoping

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| sup_br_maps_pkey | BTREE (PK) | id | Primary key lookups. |
| idx_sup_br_maps_sup_id | BTREE | sup_id | Speeds up lookups of all BRs assigned to a given supervisor. |
| idx_sup_br_maps_br_id | BTREE | br_id | Speeds up lookups of the supervisor assigned to a given BR. |
| sup_br_maps_un | BTREE (UNIQUE) | sup_id, br_id, campaign_id, contact_date | Enforces uniqueness of the supervisor/BR/campaign/date assignment. |
| unique_by_date_campaign_user_id | BTREE (UNIQUE) | sup_id, br_id, campaign_id, contact_date | **Duplicate** of `sup_br_maps_un` — identical column set, functionally redundant. Candidate for consolidation to reduce write overhead. |

---

##### Example Records

| sup_id | br_id | campaign_id | contact_date |
| --- | --- | --- | --- |
| (sample rows not fully shown in structure provided) |  |  |  |

---

---

#### <span style="color:#B9770E">Table: `sup_br_callcheckback_maps`</span>
##### Purpose

Defines which supervisor is assigned to perform **Call Checkback verification** for which BR, for a given campaign and date — the assignment layer specifically scoping the phone-based QA verification process, as distinct from the general supervisory assignment in `sup_br_maps`.

**Primary Key:** `id`

> **Note:** Although `sup_id` and `br_id` appear to reference `users.id` and `campaign_id` appears to reference `campaigns.id`, the database does **not** currently enforce foreign key constraints on any of these columns in the structure provided — a notable difference from the enforced FKs on the very similarly-structured `sup_br_maps`.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the callback assignment. Auto-generated using the `sup_br_callcheckback_maps_id_seq` sequence. |
| **sup_id** | integer (int4) | ✓ | Identifies the supervisor assigned to perform callback verification. No enforced FK to `users.id`. |
| **br_id** | integer (int4) | ✓ | Identifies the BR whose contacts are being verified via callback. No enforced FK to `users.id`. |
| **campaign_id** | integer (int4) | ✓ | Identifies the campaign this callback assignment applies to. No enforced FK to `campaigns.id`. |
| **contact_date** | date | ✓ | The specific date this supervisor-BR callback assignment is in effect. |

---

##### Key Notes / Business Rules

- This table is **structurally near-identical to `sup_br_maps`**, but scopes the assignment specifically to **Call Checkback verification duty**, rather than general daily supervisory oversight — the two tables likely support different workflows even though a single supervisor/BR pair could appear in both on the same day.
- Feeds directly into `sup_callcheckbacks` via `sup_br_callcheckback_maps.id → sup_callcheckbacks.sup_br_map_id`, which then lists the specific consumers to be called back for verification under this assignment.
- Unlike `sup_br_maps`, **no foreign keys are enforced** here, and **no unique constraint** prevents duplicate assignment rows for the same supervisor/BR/campaign/date — worth flagging as a potential data-integrity gap relative to its sibling table.
- No `is_deleted` column exists.
- During reporting, the application generally retrieves records where:
    - `sup_id`/`br_id` and `contact_date` match the target supervisor/BR/date for callback-duty scoping, joined to `sup_callcheckbacks` for the specific consumer callback list

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| sup_br_callcheckback_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Records

| id | sup_id | br_id | campaign_id | contact_date |
| --- | --- | --- | --- | --- |
| 3 | 23579 | 23586 | 16 | 2023-09-21 |
| 4 | 23579 | 23586 | 16 | 2023-09-23 |

---

---

#### <span style="color:#B9770E">Table: `sup_callcheckbacks`</span>
##### Purpose

Lists the specific consumers a supervisor is expected to call back for Call Checkback verification, under a given `sup_br_callcheckback_maps` assignment — effectively the target consumer list feeding the actual verification calls recorded in `supervisor_contacts`.

**Primary Key:** `id`

**Foreign Key:** `sup_br_map_id → sup_br_callcheckback_maps.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the callback-target record. Auto-generated using the `sup_callcheckbacks_id_seq` sequence. |
| **sup_br_map_id (FK)** | integer (int4) | ✓ | References `sup_br_callcheckback_maps.id`. Identifies which supervisor/BR/campaign/date assignment this target consumer belongs to. |
| **consumer_id** | integer (int4) | ✓ | The specific consumer's phone number/identifier the supervisor is expected to call for verification. |

---

##### Key Notes / Business Rules

- This is the **target consumer list** for a supervisor's callback duty — one row per consumer that needs to be called back under a given `sup_br_callcheckback_maps` assignment.
- A **unique constraint** on `(sup_br_map_id, consumer_id)` ensures the same consumer isn't listed twice under the same callback assignment.
- The actual outcome of calling this consumer is recorded separately in `supervisor_contacts` (linked via the 4-key composite of phone/BR/campaign/date, not directly via this table's `id`) — this table represents the **target list**, not the **result**.
- No `is_deleted` column exists — target lists appear to be immutable once generated for a given assignment.
- During reporting, the application generally retrieves records where:
    - `sup_br_map_id` matches the target supervisor assignment, to generate a supervisor's daily callback worklist

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| sup_callcheckbacks_pkey | BTREE (PK) | id | Primary key lookups. |
| sup_callcheckbacks_un | BTREE (UNIQUE) | sup_br_map_id, consumer_id | Enforces uniqueness of a consumer within a given callback assignment, and speeds up the "consumers to call" lookup for a supervisor's assignment. |

---

##### Example Records

| id | sup_br_map_id | consumer_id |
| --- | --- | --- |
| 20 | 3 | 1584656955 |
| 21 | 3 | 1585686966 |

#### <span style="color:#B9770E">Table: `live_locations`</span>
##### Purpose

Continuously logs a field user's real-time GPS position throughout their working day (independent of any specific check-in/contact event), enabling live location tracking on supervisor/admin dashboards and after-the-fact route reconstruction for a given user.

**Primary Key:** `id`

> **Note:** Although `user_id` appears to reference a user record, the database does **not** currently enforce a foreign key constraint on this column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the location ping. Auto-generated using the `live_locations_id_seq` sequence. |
| **user_id** | integer (int4) | ✓ | Identifies the user whose location is being tracked. No enforced FK to `users.id`. |
| **longitude** | numeric (float8) | ✓ | Longitude of the user's position at the time of the ping. |
| **latitude** | numeric (float8) | ✓ | Latitude of the user's position at the time of the ping. |
| **time** | timestamp | ✓ | Timestamp the location ping was captured on the device. |
| **created_at** | timestamp |  | Timestamp the record was inserted into the database. Defaults to `CURRENT_TIMESTAMP`. May lag slightly behind `time` due to network/sync delay. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **radius** | numeric (float8) |  | GPS accuracy radius reported by the device at the time of the ping (e.g., in meters). |

---

##### Key Notes / Business Rules

- This is a **high-frequency, continuous location log** — distinct from event-scoped GPS captures like `daily_checks.point` or `contacts.lat`/`long`, which only record a position at a specific check-in/contact moment. Here, pings are logged repeatedly throughout the day (sample data shows two pings roughly 10 minutes apart for the same user).
- **`time`** (device-captured timestamp) versus **`created_at`** (server-insert timestamp) can diverge slightly due to sync delay — `time` should be treated as the authoritative moment of capture for route reconstruction.
- No `is_deleted` column exists — location pings appear to be retained as a permanent movement log once created.
- Given the likely high row volume (frequent pings × many users × many days), this table is a strong candidate for date-based partitioning if not already implemented, similar to `contacts`/`daily_checks`.
- During reporting, the application generally retrieves records where:
    - `user_id` and a `time`/`created_at` range match the target user and reporting window, ordered chronologically to reconstruct a movement path

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| live_locations_pkey | BTREE (PK) | id | Primary key lookups. |

---

---

##### Example Records

| id | user_id | latitude | longitude | time | radius |
| --- | --- | --- | --- | --- | --- |
| 3668403 | 17044 | 24.039609 | 90.2774263 | 2025-01-01 07:58:04 | 20.224 |
| 3668404 | 17044 | 24.0396459 | 90.2774357 | 2025-01-01 08:08:35 | 28.438 |

---

---

#### <span style="color:#B9770E">Table: `proximity_report`</span>
##### Purpose

A **denormalized, pre-flattened reporting table** identifying pairs of BR contacts that occurred suspiciously close together in time and location — a fraud-detection signal for potential collusion, ghost contacts, or GPS spoofing, where one BR's ("base") contact is compared against another BR's ("conflicted") contact happening nearby around the same time. Combines contact timing, GPS coordinates, computed distance, and full location-hierarchy/campaign context into a single flat row for direct reporting consumption.

**Primary Key:** None identified — no `id` column present in the structure provided; appears to function as a fully denormalized reporting/output table rather than a normally keyed operational table.

> **Note:** No foreign key constraints are defined on any of the `*_contact_id`/`*_id` columns — this table is a computed/derived reporting artifact, not a source-of-truth operational table, so its contents are presumably regenerated periodically from underlying `contacts` data rather than written to directly by the application.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **base_br_contact_id** | integer (int4) |  | The `contacts.id` of the reference ("base") BR contact being evaluated. |
| **conflicted_br_contact_id** | integer (int4) |  | The `contacts.id` of the other BR's contact found to be suspiciously close in time/location to the base contact. |
| **base_br** | varchar(255) |  | Login/username of the base BR. |
| **conflicted_br** | varchar(255) |  | Login/username of the conflicting BR. |
| **campaign_id** | integer (int4) |  | Identifies the campaign both contacts belong to. |
| **campaign_name** | varchar(255) |  | Display name of the campaign (denormalized for direct reporting use). |
| **campaign_parent_id** | integer (int4) |  | Identifies a parent/umbrella campaign, if this campaign is a sub-campaign or phase of a larger initiative. |
| **sup** | varchar(255) |  | Login/username of the supervisor overseeing the base BR (or the relevant supervisory context for this conflict). |
| **contact_date** | text |  | Calendar date the base contact occurred. **Note:** stored as `text` rather than `date` — a data-type inconsistency versus the properly-typed `date` columns used almost everywhere else in the schema. |
| **base_start_time** | text |  | Start time of the base BR's contact. Stored as `text` rather than `timestamptz`. |
| **hour** | numeric |  | The hour of day (e.g., `9`) at which the proximity event occurred, likely pre-extracted for hourly-pattern reporting. |
| **base_end_time** | text |  | End time of the base BR's contact. Stored as `text`. |
| **conflicted_start_time** | text |  | Start time of the conflicting BR's contact. Stored as `text`. |
| **conflicted_end_time** | text |  | End time of the conflicting BR's contact. Stored as `text`. |
| **base_lat** | numeric (float8) |  | Latitude of the base BR's contact. |
| **base_long** | numeric (float8) |  | Longitude of the base BR's contact. |
| **ashe_pasher_lat** | numeric (float8) |  | Latitude of the conflicting ("nearby"/আশেপাশের) BR's contact. |
| **ashe_pasher_long** | numeric (float8) |  | Longitude of the conflicting BR's contact. |
| **proximity_distance_meter** | numeric |  | Computed distance in meters between the base and conflicting contact's GPS points — the core fraud-signal metric of this table. |
| **base_point** | text |  | Combined "lat,long" string representation of the base contact's location. |
| **conflicting_point** | text |  | Combined "lat,long" string representation of the conflicting contact's location. |
| **region** | varchar(255) |  | Region name (base BR's location hierarchy context). |
| **area** | varchar(255) |  | Area name (base BR's location hierarchy context). |
| **territory** | varchar(255) |  | Territory name (base BR's location hierarchy context). |
| **point** | varchar(255) |  | Point-level location name for the base BR's contact. |
| **conflicted_br_point** | varchar(255) |  | Point-level location name for the conflicting BR's contact. |
| **cluster_name** | varchar(255) |  | Cluster name for the base BR's contact. |
| **conflicted_br_cluster_name** | varchar(255) |  | Cluster name for the conflicting BR's contact. |
| **route_sec** | varchar(255) |  | Route/section identifier for the base BR's contact (e.g., "105B"). |
| **conflicted_br_route_sec** | varchar(255) |  | Route/section identifier for the conflicting BR's contact. |
| **outlet_name** | varchar(255) |  | Outlet name for the base BR's contact. |
| **conflicted_br_outlet_name** | varchar(255) |  | Outlet name for the conflicting BR's contact. |
| **created_at** | text |  | Timestamp this proximity-conflict row was generated/computed. **Note:** stored as `text` rather than `timestamp` — another data-type inconsistency relative to the rest of the schema's convention. |

---

##### Key Notes / Business Rules

- This is a **derived fraud-detection reporting table**, not a primary operational data source — it appears to be generated by a periodic batch process that compares all BR contacts within a time/location window against each other and flags pairs falling under a proximity threshold, rather than being populated by direct application writes.
- **`proximity_distance_meter`** is the key metric: a very small distance between two different BRs' contacts occurring at overlapping times is a strong signal of a fabricated ("ghost") contact, GPS spoofing, or two BRs improperly working the same outlet/consumer simultaneously.
- Nearly all date/time columns (`contact_date`, `base_start_time`, `base_end_time`, `conflicted_start_time`, `conflicted_end_time`, `created_at`) are stored as **`text`/`varchar` rather than proper `date`/`timestamp` types** — this is a notable schema weakness for a table intended for time-based fraud analysis, since sorting/filtering on these columns requires string-to-date casting rather than native date operations.
- The table is **heavily denormalized** by design — location hierarchy (region/area/territory/point/cluster/outlet), campaign name, and supervisor are all flattened in for both the base and conflicting BR, so this table can be queried directly for reporting without needing to join back to `contacts`, `locations`, or `campaigns`.
- The `ashe_pasher_*` column naming (Bengali for "nearby") alongside otherwise English column names suggests this table was built ad hoc for a specific fraud-investigation report rather than following the schema's general naming conventions.
- During reporting, the application generally retrieves records where:
    - `campaign_id` matches the target campaign
    - `proximity_distance_meter` is below a defined suspicious-proximity threshold

---

##### Indexes

No indexes were identified in the structure provided.

---

###### 

---

##### Example Record

| base_br | conflicted_br | campaign_name | proximity_distance_meter | region | outlet_name | conflicted_br_outlet_name |
| --- | --- | --- | --- | --- | --- | --- |
| ashiskumardas233@ecrm-imsl | md.mahafazurrahamanshanto3679@ecrm-imsl | PJ Windsor P3 Pilot | 90.26 | Dhaka North | Salman Store | Mojibor Store |

---

---


---

<a id="module-9"></a>

## <span style="color:#1A5276">Module 9: Dialer Workflows (Consumer & Retailer Outlet Call Centers)</span>

*8 item(s) in this module.*

#### <span style="color:#B9770E">Table: `consumer_dialer_list`</span>
##### Purpose

Master list of consumers scheduled for **outbound follow-up calls** as part of a campaign's Call Center workflow. This is the first stage (CDL) of the four-stage dialer pipeline: a consumer's phone number is queued here against a campaign and a cluster (`region_id`), then later assigned to a specific BR for calling. Tracks each consumer's dialer completion status, failure reason, and priority.

**Primary Key:** `id`

**Foreign Key:** `campaign_id → campaigns.id`

> **Note:** Although `br_id` appears to reference a user record and `region_id` appears to reference a location/cluster node, the database does **not** currently enforce foreign key constraints on either column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the dialer-list record. Auto-generated using the `consumer_dialer_list_id_seq1` sequence. |
| **consumer_number** | integer (int4) | ✓ | Phone number of the consumer queued for the outbound call. |
| **campaign_id (FK)** | integer (int4) | ✓ | References `campaigns.id`. The campaign this consumer follow-up belongs to. |
| **br_id** | integer (int4) |  | Identifier of the BR assigned to call this consumer. No enforced FK to `users.id`. |
| **is_completed** | boolean (bool) | ✓ | Whether the outbound call to this consumer has been completed. `NOT NULL`, default `false`. |
| **failed_reason** | integer (int4) |  | Coded reason for call failure, if applicable. Default `149`, suggesting `149` may represent a "not yet attempted"/default placeholder code rather than a specific failure — worth confirming the code catalog with the application team. |
| **assign_date** | date |  | Date this consumer was assigned into the dialer workflow. |
| **region_id** | integer (int4) | ✓ | **Note:** despite the column name, per business usage this represents the **Cluster ID**, not a Region-level node — the Call Center Report derives its location hierarchy from this value via `all_locations_region_to_outlet`. Naming is misleading and worth flagging for correction. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **last_contact_date** | date | ✓ | Date of the most recent contact attempt for this consumer. |
| **priority_type** | varchar |  | Priority classification for this consumer's dialer entry (e.g., high/medium/low follow-up priority). Allowed values managed by the application layer. |

---

##### Key Notes / Business Rules

- This is **Stage 1 (CDL)** of the four-stage Call Center dialer workflow: `consumer_dialer_list` → `consumer_dialer_br_assignments` → `consumer_dialer_contacts` → `consumer_dialer_survey_maps`.
- **`region_id` is a misnomer** — it functionally holds a **Cluster ID**, not a Region ID. The Call Center Report is explicitly **cluster-based**, deriving its full location hierarchy (Region → Area → Territory → ... → Outlet) by mapping this value through `ecrm.all_locations_region_to_outlet`, unlike outlet-based reports that key off `location_id` directly.
- **`is_completed`** and **`failed_reason`** together track the outcome of a consumer's dialer engagement — completion, pending, or failure — supporting the Call Center Report's success/failed/pending/violated outcome tracking.
- A consumer can be queued and later reassigned or re-attempted; **`last_contact_date`** tracks the most recent attempt independent of `assign_date` (the original queue date).
- The composite index on `(campaign_id, consumer_number)` suggests consumer uniqueness/lookup is typically scoped per-campaign rather than globally.
- During reporting, the application generally retrieves records where:
    - `campaign_id` matches the target campaign
    - `is_completed` and `failed_reason` determine the outcome bucket (success/pending/failed/violated)

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| consumer_dialer_list_pkey | BTREE (PK) | id | Primary key lookups. |
| idx_consumer_dialer_campaign | BTREE | campaign_id, consumer_number | Speeds up per-campaign consumer lookups, the primary access pattern for the dialer workflow. |

---

##### Example Records

| id | consumer_number | campaign_id | region_id (= cluster) | is_completed | failed_reason | last_contact_date |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 1300015378 | 44 | 2124 | false | 149 | 2024-04-17 |
| 2 | 1300015389 | 44 | 2124 | false | 149 | 2024-04-06 |

---

---

#### <span style="color:#B9770E">Table: `consumer_dialer_br_assignments`</span>
##### Purpose

**Stage 2 (CDBA)** of the Call Center dialer workflow — assigns a specific BR to make the outbound follow-up call for a consumer already queued in `consumer_dialer_list` (CDL). Each record links a dialer-list entry to the BR responsible for calling it on a given date.

**Primary Key:** `id`

> **Note:** Although `cdl_id` conceptually references `consumer_dialer_list.id` and `br_id` conceptually references `users.id`, the database does **not** currently enforce foreign key constraints on either column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the assignment record. Auto-generated using the `consumer_dialer_br_assignments_id_seq1` sequence. |
| **cdl_id** | integer (int4) | ✓ | Intended to reference `consumer_dialer_list.id` — identifies which queued consumer this assignment covers. No enforced FK. |
| **br_id** | integer (int4) | ✓ | Intended to reference `users.id` — identifies the BR assigned to make the call. No enforced FK. |
| **contact_date** | date | ✓ | Date the BR is assigned to attempt (or attempted) the call. |
| **created_at** | timestamp |  | Timestamp when the assignment record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp | ✓ | Timestamp of the most recent update. `NOT NULL`, no default shown — must be explicitly set by the application on every write. |

---

##### Key Notes / Business Rules

- This is **Stage 2 (CDBA)** of the dialer workflow, sitting between `consumer_dialer_list` (the queue) and `consumer_dialer_contacts` (the actual logged call) — it exists purely to record **who** was assigned to call **whom**, and **when**.
- Neither `cdl_id` nor `br_id` is enforced via foreign key at the database level — referential integrity depends entirely on the application layer.
- A single BR (`br_id`) can have multiple assignment rows on the same `contact_date`, as seen in the sample data (BR `25064` assigned four different `cdl_id` entries on `2024-04-28`) — reflecting a daily call list per BR.
- `updated_at` is `NOT NULL` with no database default, meaning the application must always supply this value explicitly on insert, unlike most other timestamp columns in the schema.
- Downstream, `consumer_dialer_contacts.cdba_id` references this table's `id`, linking the actual call attempt back to this assignment.
- During reporting, the application generally retrieves records where:
    - `br_id` and `contact_date` match the target BR/date for daily call-list generation

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| consumer_dialer_br_assignments_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Records

| id | cdl_id | br_id | contact_date |
| --- | --- | --- | --- |
| 1 | 2437 | 25064 | 2024-04-28 |
| 2 | 3273 | 25064 | 2024-04-28 |
| 3 | 3359 | 25064 | 2024-04-28 |
| 4 | 2559 | 25064 | 2024-04-28 |
| 6 | 3439 | 25062 | 2024-05-02 |

---

---

#### <span style="color:#B9770E">Table: `consumer_dialer_contacts`</span>
##### Purpose

**Stage 3 (CDC)** of the Call Center dialer workflow — records the actual outbound call event made by a BR to a consumer, linked back to the BR assignment in `consumer_dialer_br_assignments`. Captures call timing, an embedded JSON snapshot of call metadata (BR ID, consumer contact number, duration, GPS location, consumer name), the device used, and which brand/product was discussed.

**Primary Key:** `id`

**Foreign Key:** `cdba_id → consumer_dialer_br_assignments.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the call record. Auto-generated using the `consumer_dialer_contacts_id_seq1` sequence. |
| **cdba_id (FK)** | integer (int4) | ✓ | References `consumer_dialer_br_assignments.id`. Links this logged call back to the specific BR assignment it fulfills. |
| **start_time** | timestamp |  | Timestamp the outbound call began. |
| **end_time** | timestamp |  | Timestamp the outbound call ended. |
| **additional_info** | jsonb |  | JSON snapshot of call details, duplicating some structured fields: `br_id`, `contact` (consumer phone number), `duration` (seconds), `latitude`/`longitude` of the BR at call time, `call_start`, and `consumer_name`. |
| **device_info** | jsonb |  | Metadata about the device used to make the call: IMEI, brand/model, device ID, app/API/OS versions, network type, security patch level — same structure as `contacts.device_info` and `joint_calls.device_info`. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **product** | integer (int4) |  | Brand/SKU discussed during the call. Likely references `sku_items.id` at the SKU level (consistent with `contacts.product`), though no FK is enforced. |
| **repeat_status** | boolean (bool) |  | Flags whether this is a repeat call attempt for the same consumer/assignment. Default `false`. |

---

##### Key Notes / Business Rules

- This is **Stage 3 (CDC)** of the dialer workflow — the actual logged call, sitting between the BR assignment (`consumer_dialer_br_assignments`) and the call's survey responses (`consumer_dialer_survey_maps`).
- Much of the call's structured data (BR ID, consumer phone, duration, GPS coordinates, consumer name) is stored **inside `additional_info` as JSON** rather than as first-class columns — reporting queries need to parse this JSON rather than relying on flat columns for those fields.
- **`product`** likely mirrors the SKU-level brand-tracking pattern used in `contacts.product` (i.e., references `sku_items.id`), though this is not enforced and should be confirmed with the application team.
- Call duration should be derived from `start_time`/`end_time` (or the `duration` field embedded in `additional_info`) — the two may not always agree and should be reconciled during QA.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - joined to `consumer_dialer_br_assignments` via `cdba_id` to attribute the call to a BR/date/campaign

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| consumer_dialer_contacts_pkey | BTREE (PK) | id | Primary key lookups. |


---

##### Example Record

| id | cdba_id | start_time | end_time | product | repeat_status |
| --- | --- | --- | --- | --- | --- |
| 493043 | 1152827 | 2026-05-12 16:28:08 | 2026-05-12 16:28:31 | 3 | false |

---

---

#### <span style="color:#B9770E">Table: `consumer_dialer_survey_maps`</span>
##### Purpose

**Stage 4 (CDSM)** of the Call Center dialer workflow — stores the question-by-question survey responses collected during a `consumer_dialer_contacts` call. Each row is one answered question confirming whether the consumer received the call, agreed to talk, and responded to specific campaign follow-up questions (e.g., interest in visiting a tier-2 location).

**Primary Key:** `id`

**Foreign Key:** `cdc_id → consumer_dialer_contacts.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the survey-answer record. Auto-generated using the `consumer_dialer_survey_maps_id_seq1` sequence. |
| **cdc_id (FK)** | integer (int4) | ✓ | References `consumer_dialer_contacts.id`. Identifies which dialer call this answer belongs to. |
| **question_id** | integer (int4) | ✓ | Numeric identifier of the survey question (e.g., `1` = received_phone_call, `2` = agreed_to_talk, `4` = interested_to_come_to_tier_2). |
| **question** | varchar | ✓ | Human-readable question code. |
| **answer** | varchar | ✓ | The consumer's recorded answer. **Note:** `NOT NULL` — required, unlike the nullable `answer` columns in `contact_survey_data_maps`, `supervisor_contact_survey_data_maps`, and `joint_calls_survey_data_maps`. Sample data uses English "YES" responses here, rather than the Bengali "হ্যাঁ"/"না" pattern seen in the supervisor/joint-call surveys. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp | ✓ | Timestamp of the most recent update. `NOT NULL`, defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This is **Stage 4 (CDSM)**, the final table in the four-stage dialer pipeline: `consumer_dialer_list` (queue) → `consumer_dialer_br_assignments` (BR assignment) → `consumer_dialer_contacts` (logged call) → `consumer_dialer_survey_maps` (call responses).
- Question themes observed in sample data center on **call engagement confirmation** (`received_phone_call`, `agreed_to_talk`) and **campaign follow-up interest** (`interested_to_come_to_tier_2`) — this is a lighter-weight questionnaire than the field QA checklists (`supervisor_contact_survey_data_maps`, `joint_calls_survey_data_maps`), focused on consumer engagement outcomes rather than BR compliance auditing.
- `answer` is `NOT NULL` here, unlike the equivalent nullable columns in the other survey-map tables — every recorded question in this table is expected to have a response.
- This table (together with `consumer_dialer_list`, `consumer_dialer_br_assignments`, and `consumer_dialer_contacts`) powers the **Call Center Report**, which is explicitly **cluster-based** rather than outlet-based — it verifies that campaign announcements, gifts, incentives, and key messages were successfully communicated during the remote follow-up call.
- During reporting, the application generally retrieves records where:
    - `cdc_id` matches the target call(s)
    - typically filtered further by specific `question_id`/`question` for engagement-rate analysis

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| consumer_dialer_survey_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Records

| id | cdc_id | question_id | question | answer |
| --- | --- | --- | --- | --- |
| 1243 | 416 | 1 | received_phone_call | YES |
| 1244 | 416 | 2 | agreed_to_talk | YES |
| 1245 | 416 | 4 | interested_to_come_to_tier_2 | YES |

#### <span style="color:#B9770E">Table: `retailer_outlet_dialer_list`</span>
##### Purpose

Master list of **outlets** scheduled for outbound follow-up dialer calls under a campaign — the retailer/outlet-level counterpart to `consumer_dialer_list`. Instead of queuing individual consumer phone numbers, this table queues specific outlets (`location_id`) for a BR to call, tracking completion status, cluster scope, and last-contact date.

**Primary Key:** `id`

**Foreign Key:** `campaign_id → campaigns.id` (implied; not shown as enforced in the structure provided)

> **Note:** Although `location_id` appears to reference `locations.id` (an outlet) and `region_id` follows the same "actually a Cluster ID" convention documented on `consumer_dialer_list.region_id`, the database does **not** currently enforce foreign key constraints on either column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the dialer-list record. Auto-generated using the `retailer_outlet_dialer_list_id_seq` sequence. |
| **location_id** | integer (int4) | ✓ | Identifies the outlet queued for the outbound follow-up call. Business convention mirrors `contacts.location_id` — always an Outlet-level `locations.id`. No enforced FK. |
| **campaign_id** | integer (int4) | ✓ | Identifies the campaign this outlet follow-up belongs to. No enforced FK. |
| **is_completed** | boolean (bool) | ✓ | Whether the outbound call to this outlet has been completed. `NOT NULL`, default `false`. |
| **failed_reason** | integer (int4) |  | Coded reason for call failure, if applicable. Allowed values managed by the application layer. |
| **assign_date** | date | ✓ | Date this outlet was queued into the dialer workflow. |
| **region_id** | integer (int4) | ✓ | **Note:** consistent with the naming issue flagged on `consumer_dialer_list.region_id`, this column is understood to functionally represent the **Cluster ID**, not a Region-level node. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **last_contact_date** | date | ✓ | Date of the most recent contact attempt for this outlet. |

---

##### Key Notes / Business Rules

- This is **Stage 1 (RODL)** of the retailer/outlet dialer workflow, structurally mirroring the consumer dialer pipeline: `retailer_outlet_dialer_list` → `retailer_outlet_dialer_br_assignments` → `retailer_outlet_dialer_contacts` → `retailer_outlet_dialer_survey_maps`.
- Unlike `consumer_dialer_list` (which queues individual consumer phone numbers), this table queues **outlets** — the target of the call is the outlet/retailer itself (e.g., speaking with the shop owner), not an individual consumer.
- **`region_id`** carries the same naming inconsistency documented on `consumer_dialer_list.region_id` — it functionally holds a Cluster ID, used to derive the full location hierarchy via `all_locations_region_to_outlet`.
- **`is_completed`** and **`failed_reason`** together track the outbound call outcome for the outlet.
- During reporting, the application generally retrieves records where:
    - `campaign_id` matches the target campaign
    - `is_completed` and `failed_reason` determine the outcome bucket (success/pending/failed)

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| retailer_outlet_dialer_list_pkey | BTREE (PK) | id | Primary key lookups. |


---

#### <span style="color:#B9770E">Table: `retailer_outlet_dialer_br_assignments`</span>
##### Purpose

**Stage 2 (RODBA)** of the retailer/outlet dialer workflow — assigns a specific BR to make the outbound follow-up call to an outlet already queued in `retailer_outlet_dialer_list` (RODL). Structurally identical in role to `consumer_dialer_br_assignments`.

**Primary Key:** `id`

> **Note:** Although `rodl_id` conceptually references `retailer_outlet_dialer_list.id` and `br_id` conceptually references `users.id`, the database does **not** currently enforce foreign key constraints on either column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the assignment record. Auto-generated using the `retailer_outlet_dialer_br_assignments_id_seq` sequence. |
| **rodl_id** | integer (int4) | ✓ | Intended to reference `retailer_outlet_dialer_list.id` — identifies which queued outlet this assignment covers. No enforced FK. |
| **br_id** | integer (int4) | ✓ | Intended to reference `users.id` — identifies the BR assigned to make the call. No enforced FK. |
| **contact_date** | date | ✓ | Date the BR is assigned to attempt (or attempted) the call. |
| **created_at** | timestamp |  | Timestamp when the assignment record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This is **Stage 2 (RODBA)**, sitting between `retailer_outlet_dialer_list` (the queue) and `retailer_outlet_dialer_contacts` (the actual logged call) — it exists purely to record **which BR** was assigned to call **which outlet**, and **when**.
- Neither `rodl_id` nor `br_id` is enforced via foreign key — referential integrity depends entirely on the application layer, the same pattern as `consumer_dialer_br_assignments`.
- Downstream, `retailer_outlet_dialer_contacts.rodba_id` references this table's `id`, linking the actual call attempt back to this assignment.
- During reporting, the application generally retrieves records where:
    - `br_id` and `contact_date` match the target BR/date for daily call-list generation

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| retailer_outlet_dialer_br_assignments_pkey | BTREE (PK) | id | Primary key lookups. |

---

#### <span style="color:#B9770E">Table: `retailer_outlet_dialer_contacts`</span>
##### Purpose

**Stage 3 (RODC)** of the retailer/outlet dialer workflow — records the actual outbound call event made by a BR to an outlet, linked back to the BR assignment in `retailer_outlet_dialer_br_assignments`. Captures call timing, an embedded JSON snapshot of call metadata, the device used, and which brand/product was discussed.

**Primary Key:** `id`

**Foreign Key:** `rodba_id → retailer_outlet_dialer_br_assignments.id` (implied; not shown as enforced)

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the call record. Auto-generated using the `retailer_outlet_dialer_contacts_id_seq` sequence. |
| **rodba_id** | integer (int4) | ✓ | Identifies the parent BR assignment (`retailer_outlet_dialer_br_assignments.id`) this call fulfills. No enforced FK shown. |
| **start_time** | timestamp |  | Timestamp the outbound call began. Defaults to `CURRENT_TIMESTAMP`. |
| **end_time** | timestamp |  | Timestamp the outbound call ended. Defaults to `CURRENT_TIMESTAMP`. **Note:** since both `start_time` and `end_time` share the same default, care should be taken that the application explicitly sets `end_time` on call completion rather than leaving it at its insert-time default. |
| **additional_info** | jsonb |  | JSON snapshot of call details (mirroring `consumer_dialer_contacts.additional_info`) — likely includes BR ID, outlet contact number, duration, GPS coordinates, and shop-owner/consumer name. |
| **device_info** | jsonb |  | Metadata about the device used to make the call: IMEI, brand/model, device ID, app/API/OS versions, network type, security patch level — same structure as `contacts.device_info`. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **product** | integer (int4) |  | Brand/SKU discussed during the call. Likely references `sku_items.id` at the SKU level, consistent with the `product` column pattern on `contacts` and `consumer_dialer_contacts`, though no FK is enforced. |
| **repeat_status** | boolean (bool) |  | Flags whether this is a repeat call attempt for the same outlet/assignment. Default `false`. |

---

##### Key Notes / Business Rules

- This is **Stage 3 (RODC)** of the workflow — the actual logged outbound call to an outlet, sitting between the BR assignment (`retailer_outlet_dialer_br_assignments`) and the call's survey responses (`retailer_outlet_dialer_survey_maps`).
- Structurally and functionally parallel to `consumer_dialer_contacts`, but scoped to **outlet-level** dialer calls rather than individual consumer calls.
- **`product`** likely mirrors the SKU-level brand-tracking pattern used elsewhere (`contacts.product`, `consumer_dialer_contacts.product`), though this is not enforced.
- Call duration should be derived from `start_time`/`end_time`, keeping in mind both columns share the same default value at insert time.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - joined to `retailer_outlet_dialer_br_assignments` via `rodba_id` to attribute the call to a BR/date/campaign

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| retailer_outlet_dialer_contacts_pkey | BTREE (PK) | id | Primary key lookups. |

---

#### <span style="color:#B9770E">Table: `retailer_outlet_dialer_survey_maps`</span>
##### Purpose

**Stage 4 (RODSM)** of the retailer/outlet dialer workflow — stores the question-by-question survey responses collected during a `retailer_outlet_dialer_contacts` call to an outlet.

**Primary Key:** `id`

**Foreign Key:** `rodc_id → retailer_outlet_dialer_contacts.id` (implied; not shown as enforced)

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the survey-answer record. Auto-generated using the `retailer_outlet_dialer_survey_maps_id_seq` sequence. |
| **rodc_id** | integer (int4) | ✓ | Identifies the parent call in `retailer_outlet_dialer_contacts.id` this answer belongs to. No enforced FK shown. |
| **question_id** | integer (int4) | ✓ | Numeric identifier of the survey question. |
| **question** | varchar | ✓ | Human-readable question code. |
| **answer** | varchar | ✓ | The recorded answer. **Note:** `NOT NULL` — required, mirroring the pattern on `consumer_dialer_survey_maps.answer` (also `NOT NULL`), unlike the nullable `answer` columns on the field-QA checklist tables. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This is **Stage 4 (RODSM)**, the final table in the retailer/outlet dialer pipeline: `retailer_outlet_dialer_list` (queue) → `retailer_outlet_dialer_br_assignments` (BR assignment) → `retailer_outlet_dialer_contacts` (logged call) → `retailer_outlet_dialer_survey_maps` (call responses).
- Structurally and functionally parallel to `consumer_dialer_survey_maps`, but for outlet-level follow-up calls rather than individual consumer calls.
- `answer` is `NOT NULL` here — every recorded question in this table is expected to have a response.
- During reporting, the application generally retrieves records where:
    - `rodc_id` matches the target call(s)
    - typically filtered further by specific `question_id`/`question` for engagement-rate analysis

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| retailer_outlet_dialer_survey_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---


---

<a id="module-10"></a>

## <span style="color:#1A5276">Module 10: Rewards, Assets & Coupons</span>

*3 item(s) in this module.*

#### <span style="color:#B9770E">Table: `ptr_shifts`</span>
##### Purpose

Records requests to **transfer PTR (Product Trial Reward) inventory** between two field users (e.g., a supervisor reallocating reward stock from one BR to another), tracking a dual-approval workflow where both the sending and receiving party must confirm the transfer.

**Primary Key:** `id`

> **Note:** Although `cmp_id`, `mat_id`, `request_by`, `sender_id`, and `receiver_id` appear to reference `campaigns.id`, a materials/`giveable` table, and `users.id` respectively, the database does **not** currently enforce foreign key constraints on any of these columns.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the PTR shift request. Auto-generated using the `ptr_shifts_id_seq` sequence. |
| **cmp_id** | integer (int4) | ✓ | Identifies the campaign this PTR transfer relates to. No enforced FK to `campaigns.id`. |
| **mat_id** | integer (int4) | ✓ | Identifies the specific PTR material/reward item being transferred (e.g., "Cap" per the notification example). No enforced FK. |
| **amount** | integer (int4) | ✓ | Quantity of the PTR material being shifted between the two parties. |
| **request_by** | integer (int4) | ✓ | Identifier of the user who initiated the shift request. No enforced FK to `users.id`. |
| **sender_id** | integer (int4) | ✓ | Identifier of the user giving up/transferring the PTR stock. No enforced FK. |
| **sender_approved** | boolean (bool) | ✓ | Whether the sender has confirmed/approved this transfer. `NOT NULL`, default `false`. |
| **sender_approved_time** | timestamp |  | Timestamp the sender approved the transfer. Nullable until approved. |
| **receiver_id** | integer (int4) | ✓ | Identifier of the user receiving the PTR stock. No enforced FK. |
| **receiver_approved** | boolean (bool) | ✓ | Whether the receiver has confirmed/accepted the transfer. `NOT NULL`, default `false`. |
| **receiver_approved_time** | timestamp |  | Timestamp the receiver approved the transfer. Nullable until approved. |
| **created_at** | timestamp |  | Timestamp when the request was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This table implements a **dual-approval transfer workflow**: a PTR shift is only considered complete once **both** `sender_approved` and `receiver_approved` are `true` — either party can leave the transfer in a pending state indefinitely (as shown in the sample data, where one record has `receiver_approved = false` with no approval timestamp).
- **`request_by`** may differ from both `sender_id` and `receiver_id` — a supervisor can initiate a shift request between two other field users (as reflected in the `notifications` example: a supervisor requests a shift, and the recipient BR sees a notification about receiving a PTR).
- This table directly feeds the `notifications` table — the "PTR Shifting" notification example seen earlier corresponds to an entry here, confirming the relationship between reward reallocation requests and the notification system.
- No `is_deleted` column exists — shift requests appear to be permanently retained, with the two approval flags serving as the state indicators rather than a deletion mechanism.
- During reporting, the application generally retrieves records where:
    - `cmp_id` matches the target campaign
    - `sender_approved` and `receiver_approved` together determine whether the transfer is complete, pending, or partially approved

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| ptr_shifts_pkey | BTREE (PK) | id | Primary key lookups. |

---

---

##### Example Records

| id | cmp_id | mat_id | amount | sender_id | sender_approved | receiver_id | receiver_approved |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 133 | 186 | 41 | 9 | 34973 | true | 34922 | true |
| 143 | 186 | 169 | 1 | 2066 | true | 33239 | false |
| 142 | 186 | 108 | 1 | 34973 | true | 33068 | true |

---

---

#### <span style="color:#B9770E">Table: `coupon_codes`</span>
##### Purpose

Stores individual coupon/promotional codes issued as part of a campaign, tracking whether a code is still available for redemption, who redeemed it, and when. Supports campaign reward mechanics such as subscription or promotional-partner offers (e.g., a "chorki" video-streaming coupon type in sample data).

**Primary Key:** `id`

**Foreign Keys:** `user_id → users.id`, `campaign_id → campaigns.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | bigint (int8) | ✓ | Primary key for the coupon code record. Auto-generated using the `coupon_codes_id_seq` sequence. Uses `bigint` rather than `int4`, suggesting the table is expected to scale to high volume. |
| **coupon_code** | varchar | ✓ | The actual coupon code string issued to a consumer (e.g., "00002", "00003"). |
| **user_id (FK)** | integer (int4) |  | References `users.id`. Identifies the BR/user who issued or is otherwise associated with this coupon's redemption. Nullable — a coupon can exist unassigned before being redeemed. |
| **campaign_id (FK)** | integer (int4) | ✓ | References `campaigns.id`. The campaign this coupon batch belongs to. |
| **contact_no** | integer (int4) |  | Consumer phone number associated with the coupon's redemption/acceptance. |
| **available** | boolean (bool) |  | Whether this coupon code is still available for redemption. Default `true`; flips to `false` once redeemed. |
| **updated_at** | timestamp |  | Timestamp of the most recent update to the record (e.g., when redeemed). Defaults to `now()`. |
| **acceptance_date** | date |  | Date the coupon was accepted/redeemed by the consumer. Nullable until redemption occurs. |
| **coupon_type** | varchar | ✓ | Classifies the coupon's promotional partner/category (e.g., "chorki"). `NOT NULL` — every coupon must declare its type. |

---

##### Key Notes / Business Rules

- This table tracks the **full lifecycle of an individual coupon code**: issued → available → redeemed, scoped to a specific `campaign_id` and `coupon_type`.
- **`available`** is the primary lifecycle flag — `true` means the code has not yet been redeemed; it flips to `false` upon redemption, at which point `user_id`, `contact_no`, and `acceptance_date` are expected to be populated (as shown in the sample "00003" record).
- A unique constraint on `(campaign_id, coupon_code, coupon_type)` ensures a given code string cannot be duplicated within the same campaign and coupon type, though the same code string could theoretically be reused across different campaigns or coupon types.
- No `is_deleted` or soft-delete column exists on this table — coupon records appear to be permanent once created, with `available` serving as the primary state indicator rather than a deletion flag.
- `id` being `bigint` (rather than the `int4` used by most other tables in the schema) signals this table is designed for potentially very high-volume coupon issuance.
- During reporting, the application generally retrieves records where:
    - `campaign_id` matches the target campaign
    - `available = false` and `acceptance_date IS NOT NULL` to measure redemption performance, or `available = true` to measure remaining unredeemed inventory

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| coupon_codes_pkey | BTREE (PK) | id | Primary key lookups. |
| idx_coupon_codes_user_id | BTREE | user_id | Speeds up lookups of all coupons associated with a given user/BR. |
| coupon_code_type_campaign_id_idx | BTREE (UNIQUE) | campaign_id, coupon_code, coupon_type | Enforces code uniqueness within a campaign/type and speeds up redemption lookups by code. |

---

##### Example Records

| id | coupon_code | user_id | campaign_id | available | acceptance_date | coupon_type |
| --- | --- | --- | --- | --- | --- | --- |
| 2 | 00002 | NULL | 163 | true | NULL | chorki |
| 3 | 00003 | 26783 | 163 | false | 2025-10-05 | chorki |

#### <span style="color:#B9770E">Table: `users_asset_maps`</span>
##### Purpose

Tracks the assignment of physical company assets/materials (e.g., banners, festoons, uniforms, promotional materials) to individual field users (BRs), recording who assigned the asset, when, and in what quantity. Critical for asset accountability — per business rule, if a BR leaves the organization, their previously assigned assets must be traceable and recoverable through this table.

**Primary Key:** `id`

**Foreign Keys:** `uid → users.id`, `mat_id → materials.id`, `assigned_by → users.id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the asset assignment record. Auto-generated using the `users_asset_maps_id_seq` sequence. |
| **uid (FK)** | integer (int4) | ✓ | References `users.id`. Identifies the user (typically a BR) the asset is assigned to. |
| **mat_id (FK)** | integer (int4) | ✓ | References `materials.id`. Identifies the specific asset/material type being assigned (e.g., a banner, festoon, uniform item). |
| **assigned_by (FK)** | integer (int4) | ✓ | References `users.id`. Identifies the supervisor/admin who made the assignment. |
| **assigned_date** | timestamp |  | Timestamp the asset was assigned. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. `NOT NULL`, default `false`. Used to mark an asset as returned/reclaimed rather than physically deleting the assignment history. |
| **qty** | integer (int4) |  | Quantity of the asset assigned in this record (e.g., `5` banners). |

---

##### Key Notes / Business Rules

- **Core business rule:** if a BR leaves the organization, their assigned assets must remain traceable and recoverable — this table is the accountability record that supports that requirement, and assignments should not be hard-deleted, only soft-deleted via `is_deleted` once assets are confirmed returned.
- Per an internal note, some assets (e.g., banners/festoons) may be physically carried and set up by a BR in the field even when there's no direct BATB business/campaign tied to that specific placement — worth keeping in mind that not every asset assignment maps cleanly to a single campaign or transaction.
- A **partial unique constraint** enforces that a given `(mat_id, uid)` combination is unique only among **active (non-deleted)** assignments — allowing the same asset type to be reassigned to the same user again after a prior assignment is closed out (returned/soft-deleted).
- **`assigned_by`** and **`uid`** are two distinct user references — the person making the assignment versus the person receiving the asset.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false` — to identify currently-held assets per user, e.g., for offboarding/asset-recovery checks

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| users_asset_maps_pkey | BTREE (PK) | id | Primary key lookups. |
| unique_by_mat_id_user_id_is_deleted | BTREE (UNIQUE, partial) | mat_id, uid, is_deleted | Enforces one active assignment per material/user combination, allowing reassignment after soft-deletion. |
| idx_users_asset_maps_assigned_by | BTREE | assigned_by | Speeds up lookups of all assets assigned by a given supervisor/admin. |
| idx_users_asset_maps_uid | BTREE | uid | Speeds up lookups of all assets currently/previously held by a given user — the primary lookup for asset-recovery checks on offboarding. |

---

##### Example Record

| id | uid | mat_id | assigned_by | qty | is_deleted |
| --- | --- | --- | --- | --- | --- |
| 1 | 2320 | 16 | 23579 | 5 | false |

---

---


---

<a id="module-11"></a>

## <span style="color:#1A5276">Module 11: Reporting & Dashboards</span>

*13 item(s) in this module.*

#### <span style="color:#B9770E">Table: `dashboards`</span>
##### Purpose

Registry of embedded reporting dashboards (typically Looker Studio reports) made available within the ECRM application, along with role- and agency-based access control for who can view each dashboard. Acts as the master catalog powering the application's dashboard menu/navigation.

**Primary Key:** `id`

> **Note:** Although `created_by` appears to reference a user record, the database does **not** currently enforce a foreign key constraint on this column. Similarly, `roles` and `agencies` are array columns intended to reference `roles.id` and `agencies.id` respectively, but neither is enforced via foreign key.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the dashboard record. Auto-generated using the `dashboards_id_seq` sequence. |
| **name** | varchar |  | Display name of the dashboard shown in the application (e.g., "Dashboard : Derby FOR Campaign 2024"). |
| **description** | varchar |  | Description of the dashboard's purpose/content. **Note:** in sample data this is populated with the same value as `name` rather than a distinct description — worth flagging as a possible data-entry gap rather than a schema issue. |
| **created_by** | integer (int4) |  | Identifier of the user who created/registered this dashboard. No enforced FK to `users.id`. |
| **link** | text |  | The embed URL for the dashboard (e.g., a Looker Studio embedded report link). This is what gets rendered in an iframe within the application. |
| **roles** | integer[] (`_int4`) |  | Array of role IDs permitted to view this dashboard. No enforced FK to `roles.id` — access control is array-based rather than via a proper join table (unlike other role-scoping patterns in the schema such as `role_resource_maps`). |
| **status** | boolean (bool) |  | Whether the dashboard is currently enabled/visible in the application. Default `true`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **agencies** | integer[] (`_int4`) |  | Array of agency IDs permitted to view this dashboard, restricting visibility to specific external agencies. No enforced FK. |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. `NOT NULL`, default `false`. |

---

##### Key Notes / Business Rules

- This table is the **master registry for embedded reporting dashboards**, controlling both what's shown (`link`) and who can see it (`roles`, `agencies`).
- Access control here uses **array columns** (`roles`, `agencies`) rather than dedicated join/bridge tables — this is architecturally different from the RBAC pattern used elsewhere in the schema (e.g., `role_resource_maps`), and means role/agency changes require array manipulation rather than simple row insert/delete. No referential integrity is enforced on either array's contents.
- **`status`** and **`is_deleted`** are two distinct flags — `status` toggles visibility/availability of an existing dashboard, while `is_deleted` marks the record as logically removed. Both should typically be checked together when listing dashboards available to a user.
- Given the sample data, `description` may not always be reliably distinct from `name` in practice — worth validating before using `description` as a genuinely separate field in any dashboard-listing UI.
- Soft deletion is handled using **`is_deleted`**.
- During reporting/application queries, the dashboard menu generally retrieves records where:
    - `is_deleted = false`
    - `status = true`
    - the requesting user's `role` and/or `agency` appears in the `roles`/`agencies` arrays

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| dashboards_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Record

| id | name | created_by | status | is_deleted |
| --- | --- | --- | --- | --- |
| 9 | Dashboard : Derby FOR Campaign 2024 | 41 | false | false |

*(Note: `status = false` on this sample record despite it having a populated `link` and role/agency array — meaning this specific dashboard is currently disabled/hidden in the application, even though the configuration itself is intact.)*

#### <span style="color:#B9770E">Table: `custom_queries`</span>
##### Purpose

Registry of ad-hoc, user-authored SQL reports that can be run and optionally scheduled for automated email delivery. Each record stores a raw SQL query (`query`) alongside report metadata (name, description), access control (roles, agencies), and an email-scheduling configuration (recipients, cadence, day/time). Functions as a lightweight self-service reporting and report-distribution system built directly into ECRM.

**Primary Key:** `id`

> **Note:** Although `created_by` appears to reference a user record, and `roles`/`agencies` appear to reference `roles.id`/`agencies.id`, the database does **not** enforce foreign key constraints on any of these columns — the same array-based, unenforced access-control pattern used in `dashboards`.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the custom query record. Auto-generated using the `custom_queries_id_seq1` sequence. |
| **report_name** | varchar(255) |  | Display name of the report (e.g., "All users"). |
| **report_description** | text |  | Free-text description of what the report covers. |
| **created_by** | integer (int4) |  | Identifier of the user who authored this custom query. No enforced FK to `users.id`. |
| **query** | varchar(100000) |  | The raw SQL statement executed to generate the report (e.g., `select * from ecrm.users;`). **Note:** stored as an extremely large varchar rather than `text` — functionally equivalent in Postgres, but worth noting as an unusual choice given `text` is used elsewhere (`report_description`) for similarly unbounded content. Storing and executing raw, user-authored SQL directly from a table carries inherent SQL-injection/data-exposure risk if this value is ever built dynamically from unsanitized input rather than run as-is by trusted administrators. |
| **roles** | integer[] (`_int4`) |  | Array of role IDs permitted to view/run this report. No enforced FK. |
| **params** | integer[] (`_int4`) |  | Array of parameter identifiers associated with this query, presumably supporting parameterized/dynamic report execution. Business meaning of the referenced values is application-defined. |
| **mail_to** | varchar[] (`_varchar`) |  | Array of recipient email addresses the report is sent to when scheduled. |
| **mail_cc** | varchar[] (`_varchar`) |  | Array of CC'd email addresses for the scheduled report. |
| **status** | boolean (bool) |  | Whether the custom query/report is currently active/enabled. |
| **agencies** | integer[] (`_int4`) |  | Array of agency IDs permitted to view/run this report. No enforced FK. |
| **created_at** | timestamp | ✓ | Timestamp when the record was created. `NOT NULL`, no default shown — must be explicitly set by the application. |
| **updated_at** | timestamp | ✓ | Timestamp of the most recent update. `NOT NULL`, no default shown — must be explicitly set by the application. |
| **email_type** | integer (int4) |  | Classifies the email delivery schedule type — e.g., "daily" or "once", per inline column comment. Specific code-to-meaning mapping is application-defined. |
| **email_schedule_date** | date |  | The date on which a one-time scheduled email report should be sent. |
| **email_schedule_time** | varchar |  | Time of day the scheduled email should be sent (e.g., `03:04`). **Note:** stored as free-text `varchar` rather than a `TIME` type — no format validation is enforced at the database level. |
| **email_schedule_day** | integer[] (`_int4`) |  | Array of day identifiers (e.g., days of week or month) for recurring email schedules. |
| **type** | varchar | ✓ | Classifies the query's data source/target system. `NOT NULL`, default `'RDS'`. Other values presumably exist for non-RDS sources. |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. `NOT NULL`, default `false`. |

---

##### Key Notes / Business Rules

- This table implements a **self-service, schedulable SQL reporting system** embedded directly in ECRM — administrators/analysts can author a raw SQL query, control who can access it, and optionally have it emailed out automatically on a schedule.
- **`email_type`**, **`email_schedule_date`**, **`email_schedule_time`**, and **`email_schedule_day`** together define the delivery cadence: a report can be sent **once** (via `email_schedule_date`) or on a **recurring** basis (via `email_schedule_day`, e.g., daily or specific weekdays/days-of-month), at the specified `email_schedule_time`.
- Access control (`roles`, `agencies`) follows the same **unenforced array-based pattern** as `dashboards` — no join table, no FK, so integrity depends entirely on the application layer, and array-containment queries would benefit from a GIN index if filtering on these becomes a common access-check pattern.
- **`query`** holds the actual SQL executed to produce the report — this is effectively a **stored, admin-authored SQL statement**, and its use should be tightly restricted to trusted report-authors given the direct database access it implies.
- `created_at` and `updated_at` have no database default and are `NOT NULL`, meaning the application must always explicitly supply both values on every write — unlike most other tables in the schema where these default to `CURRENT_TIMESTAMP`.
- **`type`** defaults to `'RDS'`, suggesting most custom queries target the core relational (RDS) database, with other values likely representing alternate data sources (e.g., a BigQuery or analytics warehouse).
- Soft deletion is handled using **`is_deleted`**, separate from **`status`**, which toggles whether the report is currently active/schedulable.
- During reporting/scheduling, the application generally retrieves records where:
    - `is_deleted = false`
    - `status = true`
    - matched against the current date/time for `email_schedule_date`/`email_schedule_day`/`email_schedule_time` to trigger delivery

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| custom_queries_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Performance / Recommendations

- As with `dashboards`, a **GIN index** on `roles`/`agencies` would help if access-control filtering on these arrays becomes frequent.
- Given `query` stores raw SQL text up to 100,000 characters, consider application-layer validation/allow-listing to mitigate the risk of unintended or unsafe SQL being stored and later executed, especially if query authorship is ever opened up beyond a small trusted admin group.

---

##### Example Record

| id | report_name | created_by | type | status | email_type | email_schedule_date | email_schedule_time |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | All users | 1 | RDS | true | 2 | 2023-07-13 | 03:04 |

#### <span style="color:#B9770E">Table: `dynamic_reports`</span>
##### Purpose

Master registry of dynamically-configurable, ad-hoc SQL reports — similar in concept to `custom_queries`, but built with a **normalized bridge-table architecture** (roles, parameters, chart fields, and agencies each get their own dedicated mapping table) rather than array columns. Also supports optional chart visualization configuration for the report's output.

**Primary Key:** `id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the dynamic report record. Auto-generated using the `dynamic_reports_id_seq` sequence. |
| **name** | varchar(255) | ✓ | Display name of the report (e.g., "test 2"). |
| **description** | text | ✓ | Free-text description of the report's purpose/content. |
| **type** | varchar(255) | ✓ | Classifies the report's data source/target system (e.g., "RDS"), mirroring `custom_queries.type`. |
| **query** | text | ✓ | The raw SQL statement executed to generate the report (e.g., `select * from ecrm.users;`). Same self-service reporting risk profile as `custom_queries.query` — direct, stored SQL execution should be restricted to trusted report-authors. |
| **show_chart** | boolean (bool) |  | Whether this report's results should be rendered as a chart (in addition to/instead of a table) in the UI. Default `false`. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **chart_type** | varchar |  | Type of chart to render when `show_chart = true` (e.g., bar, line, pie). Allowed values managed by the application layer. |
| **chart_data_type** | varchar |  | Classifies how chart data should be interpreted/formatted (e.g., numeric, categorical, date-based). Allowed values managed by the application layer. |

---

##### Key Notes / Business Rules

- This table is the **normalized counterpart to `custom_queries`** — both implement self-service SQL reporting, but `dynamic_reports` uses **dedicated bridge tables** (`dynamic_report_role_maps`, `dynamic_report_parameter_maps`, `dynamic_report_chart_maps`, `dynamic_report_agency_maps`) for access control, parameters, and chart configuration, instead of the unenforced array-column pattern used in `custom_queries`/`dashboards`.
- **`show_chart`**, **`chart_type`**, and **`chart_data_type`** together control whether and how the report's result set is visualized, working alongside `dynamic_report_chart_maps` (which defines per-field chart roles like row/column/hide).
- As with `custom_queries.query`, this table stores **raw, admin-authored SQL** — access to author/edit reports here should be tightly restricted.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - the requesting user's role/agency matches an active row in `dynamic_report_role_maps`/`dynamic_report_agency_maps`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| dynamic_reports_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Record

| id | name | type | show_chart | is_deleted |
| --- | --- | --- | --- | --- |
| 2 | test 2 | RDS | false | true |

---

---

#### <span style="color:#B9770E">Table: `dynamic_report_role_maps`</span>
##### Purpose

Bridge table granting specific roles access to a `dynamic_reports` record. The normalized, properly-keyed equivalent of the `roles` array column used on `dashboards`/`custom_queries`.

**Primary Key:** `id`

**Foreign Keys:** `report_id → dynamic_reports.id`, `role_id → roles.id` (implied; not shown as enforced in the structure provided)

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the mapping record. Auto-generated using the `dynamic_report_role_maps_id_seq` sequence. |
| **report_id** | integer (int4) | ✓ | References `dynamic_reports.id`. Identifies which report this role grant applies to. |
| **role_id** | integer (int4) | ✓ | Identifies the role permitted to view/run this report. Presumed reference to `roles.id`. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the mapping was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This is a **one-to-many bridge**: each row grants exactly one role access to exactly one report. Multiple rows for the same `report_id` (as shown in sample data, where report `1` is granted to roles `1`, `2`, and `3`) express multiple roles having access to the same report.
- Access-control logic for dynamic reports checks this table (joined on `report_id` = the target report and `role_id` = the requesting user's role) rather than an array-containment check, making this a more query-friendly and referentially cleaner pattern than `dashboards.roles`/`custom_queries.roles`.
- Soft deletion is handled using **`is_deleted`**.
- During reporting/access-check queries, the application generally retrieves records where:
    - `is_deleted = false`
    - `report_id` and `role_id` match the target report and requesting user's role

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| dynamic_report_role_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Records

| id | report_id | role_id |
| --- | --- | --- |
| 1 | 1 | 1 |
| 2 | 2 | 1 |
| 3 | 3 | 1 |

---

---

#### <span style="color:#B9770E">Table: `dynamic_report_parameter_maps`</span>
##### Purpose

Bridge table defining which input parameters a `dynamic_reports` record requires or supports (e.g., a location filter, date range, custom date, or campaign selector), enabling the report's SQL to be run with user-supplied filter values at execution time.

**Primary Key:** `id`

**Foreign Keys:** `report_id → dynamic_reports.id`, `parameter_id → settings._cats.id` (implied; not shown as enforced)

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the mapping record. Auto-generated using the `dynamic_report_parameter_maps_id_seq` sequence. |
| **report_id** | integer (int4) | ✓ | References `dynamic_reports.id`. Identifies which report this parameter applies to. |
| **parameter_id** | integer (int4) | ✓ | References `settings._cats.id` — a shared lookup/category table. Identifies which filter parameter (e.g., Location, Date Range, Custom Date, Campaign) is exposed for this report. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the mapping was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- **`parameter_id`** references `settings._cats`, a shared category/lookup table used across the application — sample values include `48` = Location, `49` = Date Range, `51` = Custom Date, `52` = Campaign. This means the set of available report parameters is centrally managed in `settings._cats` rather than hardcoded per-report.
- Multiple rows can exist for the same `report_id` if a report requires multiple filter parameters (e.g., both a location filter and a date range) — sample data shows several distinct reports each mapped to parameter `48` (Location), suggesting Location is a commonly-required filter across reports.
- This table drives **dynamic filter-form generation** in the reporting UI: when a user opens a given report, the application looks up its required parameters here to know which filter inputs to display before running `dynamic_reports.query`.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - `report_id` matches the report being configured/rendered, joined to `settings._cats` for parameter display labels

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| dynamic_report_parameter_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Records

| id | report_id | parameter_id | parameter_id meaning (via `settings._cats`) |
| --- | --- | --- | --- |
| 1 | 1 | 48 | Location |
| 2 | 2 | 48 | Location |
| 3 | 3 | 48 | Location |

---

---

#### <span style="color:#B9770E">Table: `dynamic_report_chart_maps`</span>
##### Purpose

Bridge table defining how individual output fields of a `dynamic_reports` record's query result should be treated when rendered as a chart — e.g., which field becomes the row/category axis, which becomes the column/series axis, and which fields should be hidden from the chart entirely. Works in conjunction with `dynamic_reports.show_chart`/`chart_type`/`chart_data_type`.

**Primary Key:** `id`

**Foreign Key:** `report_id → dynamic_reports.id` (implied; not shown as enforced)

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the mapping record. Auto-generated using the `dynamic_report_chart_maps_id_seq` sequence. |
| **report_id** | integer (int4) | ✓ | References `dynamic_reports.id`. Identifies which report this chart-field mapping applies to. |
| **field_name** | varchar(255) | ✓ | Name of the output column from the report's query result (e.g., `id`, `username`, `email`). |
| **field_type** | varchar(255) | ✓ | Chart role assigned to this field — sample values include `hide` (exclude from chart), `row` (use as the row/category axis), `columns` (use as the column/series axis). Allowed values managed by the application layer. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the mapping was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This table lets an administrator configure, **per output column of a report's query**, how that column should behave in the resulting chart — without modifying the underlying SQL (`dynamic_reports.query`) itself.
- Sample data for report `3` shows three fields configured together: `id` → `hide` (excluded from the chart), `username` → `row` (category axis), `email` → `columns` (series axis) — a typical pivot-style chart configuration.
- Since `field_name` is free-text and not validated against the report's actual query output at the database level, a mismatch between a report's SQL columns and its chart-field mappings is possible if the query changes without updating this table — worth flagging as a manual-sync risk for administrators maintaining these reports.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - `report_id` matches the report being rendered as a chart

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| dynamic_report_chart_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Records

| id | report_id | field_name | field_type |
| --- | --- | --- | --- |
| 1 | 3 | id | hide |
| 2 | 3 | username | row |
| 3 | 3 | email | columns |

---

---

#### <span style="color:#B9770E">Table: `dynamic_report_agency_maps`</span>
##### Purpose

Bridge table granting specific external agencies access to a `dynamic_reports` record — the normalized, properly-keyed equivalent of the `agencies` array column used on `dashboards`/`custom_queries`.

**Primary Key:** `id`

**Foreign Keys:** `report_id → dynamic_reports.id` (enforced), `agency_id → agencies.id` (implied; not shown as enforced)

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the mapping record. Auto-generated using the `dynamic_report_agency_maps_id_seq` sequence. |
| **report_id (FK)** | integer (int4) | ✓ | References `dynamic_reports.id`. Identifies which report this agency grant applies to. |
| **agency_id** | integer (int4) | ✓ | Identifies the agency permitted to view/run this report. Presumed reference to `agencies.id`. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the mapping was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This is the **agency-scoping counterpart to `dynamic_report_role_maps`** — a report can be shared with one or more specific external agencies independent of role-based access, supporting scenarios where a report should be visible to an outside partner regardless of their internal role.
- A single report can be mapped to multiple agencies (sample data shows report `2` granted to both agency `1` and agency `5`), and a single agency can access multiple reports (agency `5` appears against both report `2` and report `3`) — a genuine many-to-many relationship.
- `report_id` is the **only enforced foreign key** among this table's relationships (`agency_id` is not enforced), making this table's report-side integrity more reliable than its agency-side integrity.
- Soft deletion is handled using **`is_deleted`**.
- During reporting/access-check queries, the application generally retrieves records where:
    - `is_deleted = false`
    - `report_id` and `agency_id` match the target report and requesting user's agency

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| dynamic_report_agency_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Records

| id | report_id | agency_id |
| --- | --- | --- |
| 1 | 1 | 1 |
| 2 | 2 | 1 |
| 3 | 2 | 5 |
| 4 | 3 | 5 |

#### <span style="color:#B9770E">Table: `preloaded_reports`</span>
##### Purpose

Registry of scheduled, pre-generated reports that are exported to an external destination (e.g., a Google Sheet, via `sheet_id`/`url`) on a recurring or specific-date basis, rather than being run on-demand like `custom_queries`/`dynamic_reports`. Access to each report is scoped per-user via `preloaded_report_user_maps`, and its generation schedule is defined via `preloaded_report_date_maps`.

**Primary Key:** `id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the preloaded report. Auto-generated using the `preloaded_reports_id_seq1` sequence. |
| **name** | varchar | ✓ | Display name of the report. |
| **description** | text |  | Free-text description of the report's purpose/content. |
| **type** | varchar | ✓ | Classifies the report's data source/target system, following the same convention as `custom_queries.type`/`dynamic_reports.type` (e.g., "RDS"). |
| **query** | text | ✓ | The raw SQL statement executed to generate the report — same self-service reporting pattern (and associated risk profile) as `custom_queries.query`/`dynamic_reports.query`. |
| **url** | text |  | The destination URL the generated report is pushed to or accessible from (e.g., a Google Sheets link). |
| **sheet_id** | varchar | ✓ | Identifier of the specific external sheet (e.g., a Google Sheets document/tab ID) this report's output is written into. |
| **start_date** | date |  | Date this preloaded report's generation schedule becomes active. |
| **end_date** | date |  | Date this preloaded report's generation schedule ends. |
| **time** | time |  | Time of day the report is generated/refreshed. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This table implements a **"push to external sheet" scheduled reporting mechanism** — distinct from `custom_queries` (email delivery) and `dynamic_reports` (in-app viewing with charting), this report type writes its output directly into an external spreadsheet (`sheet_id`/`url`) on a schedule.
- **`start_date`/`end_date`/`time`** together define the report's active generation window and time-of-day trigger, mirroring the scheduling pattern in `custom_queries`.
- Access is controlled per-user via the separate `preloaded_report_user_maps` bridge table (with an `access_type` distinguishing view vs. edit-style permissions), rather than the role/agency array pattern used on `dashboards`/`custom_queries`.
- The specific **dates** this report should run/refresh on are enumerated individually in `preloaded_report_date_maps`, rather than relying solely on `start_date`/`end_date`/`time` — suggesting the schedule can be non-contiguous (e.g., specific weekdays only), similar to `repeat_schedule_maps`.
- As with `custom_queries.query`/`dynamic_reports.query`, storing raw SQL here carries the same risk profile — access to author/edit these reports should be tightly restricted.
- Soft deletion is handled using **`is_deleted`**.
- During reporting/scheduling, the application generally retrieves records where:
    - `is_deleted = false`
    - the current date/time matches an entry in `preloaded_report_date_maps` and falls within `start_date`/`end_date`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| preloaded_reports_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Record

*(No sample data row was provided for this table.)*

---

---

#### <span style="color:#B9770E">Table: `preloaded_report_user_maps`</span>
##### Purpose

Bridge table granting a specific user access to a `preloaded_reports` record, with a defined access type (e.g., view-only vs. edit) — the normalized, per-user access-control layer for preloaded reports.

**Primary Key:** `id`

**Foreign Keys:** `report_id → preloaded_reports.id`, `user_id → users.id` (implied; not shown as enforced in the structure provided)

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the mapping record. Auto-generated using the `preloaded_report_user_maps_id_seq1` sequence. |
| **report_id** | integer (int4) | ✓ | Identifies which `preloaded_reports` record this access grant applies to. No enforced FK shown. |
| **user_id** | integer (int4) | ✓ | Identifies the user granted access. No enforced FK to `users.id`. |
| **access_type** | varchar | ✓ | Classifies the level of access granted (e.g., view, edit, owner). Allowed values managed by the application layer. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the mapping was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This is the **per-user, access-level-aware equivalent** of the role/agency array pattern used on `dashboards`/`custom_queries` — rather than granting access to a whole role or agency, individual users are granted access with a specific `access_type` (e.g., a user might have view-only access while another has edit rights to the same report).
- Soft deletion is handled using **`is_deleted`**.
- During reporting/access-check queries, the application generally retrieves records where:
    - `is_deleted = false`
    - `report_id` and `user_id` match the target report and requesting user, with `access_type` determining what actions they're permitted

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| preloaded_report_user_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

#### <span style="color:#B9770E">Table: `preloaded_report_date_maps`</span>
##### Purpose

Enumerates the specific calendar dates on which a `preloaded_reports` record should be generated/refreshed — the normalized date-schedule layer for preloaded reports, following the same "expand a recurrence into concrete rows" pattern as `leave_date_maps` and `repeat_schedule_maps`.

**Primary Key:** `id`

**Foreign Key:** `report_id → preloaded_reports.id` (implied; not shown as enforced in the structure provided)

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the scheduled-date record. Auto-generated using the `preloaded_report_date_maps_id_seq1` sequence. |
| **report_id** | integer (int4) | ✓ | Identifies which `preloaded_reports` record this scheduled date belongs to. No enforced FK shown. |
| **date** | date | ✓ | A single calendar date this report should be generated/refreshed on. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This table normalizes a preloaded report's generation schedule into **individual date rows**, allowing non-contiguous or custom recurrence patterns (e.g., every Monday, or specific one-off dates) rather than relying solely on `preloaded_reports.start_date`/`end_date`.
- Follows the same normalization pattern as `leave_date_maps` and `repeat_schedule_maps` — expand a recurrence definition into concrete, individually queryable dates.
- Soft deletion is handled using **`is_deleted`**.
- During scheduling, the application generally retrieves records where:
    - `is_deleted = false`
    - `report_id` matches the target report, and `date` matches the current date to trigger generation

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| preloaded_report_date_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

#### <span style="color:#B9770E">Table: `messaging_reports`</span>
##### Purpose

Registry of scheduled reports delivered via a **messaging platform** (e.g., WhatsApp, SMS, or a chat app — per `platform`) rather than email (`custom_queries`) or an external sheet (`preloaded_reports`). Structurally very similar to `preloaded_reports`, but targets a messaging channel as its delivery mechanism instead of a spreadsheet.

**Primary Key:** `id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the messaging report. Auto-generated using the `messaging_reports_id_seq1` sequence. |
| **name** | varchar | ✓ | Display name of the report. |
| **description** | text |  | Free-text description of the report's purpose/content. |
| **type** | varchar | ✓ | Classifies the report's data source/target system, consistent with `type` on the other report-registry tables. |
| **query** | text | ✓ | The raw SQL statement executed to generate the report — same pattern (and risk profile) as `custom_queries.query`/`dynamic_reports.query`/`preloaded_reports.query`. |
| **platform** | varchar | ✓ | The messaging platform this report is delivered through (e.g., "whatsapp"). Allowed values managed by the application layer. |
| **start_date** | date | ✓ | Date this report's delivery schedule becomes active. **Note:** `NOT NULL` here, unlike the nullable `start_date` on `preloaded_reports` — every messaging report must define a start date. |
| **end_date** | date | ✓ | Date this report's delivery schedule ends. `NOT NULL`, same distinction from `preloaded_reports`. |
| **time** | time | ✓ | Time of day the report is generated/sent. `NOT NULL`. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This table is the **messaging-channel counterpart to `preloaded_reports`** — same general shape (name, query, schedule, per-user access via `messaging_report_user_maps`, scheduled dates via `messaging_report_date_maps`), but delivers its output through a messaging platform (`platform`, e.g., WhatsApp) rather than pushing to an external spreadsheet.
- Unlike `preloaded_reports`, `start_date`/`end_date`/`time` are all **required (`NOT NULL`)** here, meaning every messaging report must have a fully defined schedule window from creation — no partially-configured/draft reports are possible at the schema level.
- As with the other report-registry tables, storing raw SQL in `query` carries the same access-control considerations.
- Soft deletion is handled using **`is_deleted`**.
- During scheduling, the application generally retrieves records where:
    - `is_deleted = false`
    - the current date/time matches an entry in `messaging_report_date_maps` and falls within `start_date`/`end_date`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| messaging_reports_pkey | BTREE (PK) | id | Primary key lookups. |

---

---

#### <span style="color:#B9770E">Table: `messaging_report_user_maps`</span>
##### Purpose

Bridge table granting a specific user access to a `messaging_reports` record — the per-user access-control layer for messaging-delivered reports, mirroring `preloaded_report_user_maps` but without an explicit access-type distinction.

**Primary Key:** `id`

**Foreign Keys:** `report_id → messaging_reports.id`, `user_id → users.id` (implied; not shown as enforced)

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the mapping record. Auto-generated using the `messaging_report_user_maps_id_seq1` sequence. |
| **report_id** | integer (int4) | ✓ | Identifies which `messaging_reports` record this access grant applies to. No enforced FK shown. |
| **user_id** | integer (int4) | ✓ | Identifies the user granted access. No enforced FK to `users.id`. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the mapping was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This table grants a user access to receive a given messaging report — likely also implying the user's registered phone number (from `user_infos`/`users`) is the delivery target on the messaging platform.
- **Note:** unlike `preloaded_report_user_maps`, this table has **no `access_type` column** — access here appears to be binary (has access / doesn't), without a view-vs-edit distinction, consistent with messaging delivery being a one-way "receive this report" grant rather than a collaborative report-viewing permission.
- Soft deletion is handled using **`is_deleted`**.
- During scheduling/delivery, the application generally retrieves records where:
    - `is_deleted = false`
    - `report_id` matches the report being sent, to determine the full list of recipient users

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| messaging_report_user_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

#### <span style="color:#B9770E">Table: `messaging_report_date_maps`</span>
##### Purpose

Enumerates the specific calendar dates on which a `messaging_reports` record should be generated and sent — the date-schedule layer for messaging-delivered reports, mirroring `preloaded_report_date_maps`.

**Primary Key:** `id`

**Foreign Key:** `report_id → messaging_reports.id` (implied; not shown as enforced)

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the scheduled-date record. Auto-generated using the `messaging_report_date_maps_id_seq1` sequence. |
| **report_id** | integer (int4) | ✓ | Identifies which `messaging_reports` record this scheduled date belongs to. No enforced FK shown. |
| **date** | date | ✓ | A single calendar date this report should be generated/sent on. |
| **is_deleted** | boolean (bool) |  | Soft-delete flag. Default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This table normalizes a messaging report's send schedule into **individual date rows**, following the same pattern as `preloaded_report_date_maps`/`leave_date_maps`/`repeat_schedule_maps` — allowing non-contiguous or custom recurrence rather than relying solely on `start_date`/`end_date`.
- Soft deletion is handled using **`is_deleted`**.
- During scheduling, the application generally retrieves records where:
    - `is_deleted = false`
    - `report_id` matches the target report, and `date` matches the current date to trigger delivery

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| messaging_report_date_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

###### 


---

<a id="module-12"></a>

## <span style="color:#1A5276">Module 12: Communication & Notifications</span>

*6 item(s) in this module.*

#### <span style="color:#B9770E">Table: `notifications`</span>
##### Purpose

Stores individual, user-facing in-app notifications delivered to a single recipient — covering both system-generated events (e.g., a PTR/reward shift request) and notifications originating from a broader manual campaign (linked via `manual_id`). This is the per-recipient notification feed shown within the ECRM app.

**Primary Key:** `id`

**Foreign Key:** `manual_id → manual_notifications.id`

> **Note:** Although `from` and `to` appear to reference user records, the database does **not** currently enforce foreign key constraints on either column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the notification record. Auto-generated using the `notifications_id_seq` sequence. |
| **from** | integer (int4) |  | Identifier of the user who triggered/sent the notification. No enforced FK to `users.id`. |
| **to** | integer (int4) |  | Identifier of the user who is the recipient of the notification. No enforced FK to `users.id`. |
| **url** | varchar(255) |  | Deep-link or route the app navigates to when the notification is tapped (e.g., a screen/resource identifier). |
| **header** | varchar(255) |  | Short title of the notification (e.g., "PTR Shifting"). |
| **description** | text |  | Full notification message body (e.g., "Supervisor wants to give 1 PTRs (Cap) to you"). |
| **type** | varchar(255) |  | Classification/severity of the notification (e.g., "success"). Allowed values managed by the application layer. |
| **seen** | smallint (int2) |  | Whether the recipient has viewed the notification. Default `0` (unseen); presumably flips to `1` once read. |
| **manual_id (FK)** | integer (int4) |  | References `manual_notifications.id`. Populated when this individual notification originated from a broader manually-triggered notification blast; `NULL` for purely system-generated, one-to-one notifications. |
| **created_at** | timestamp | ✓ | Timestamp when the notification record was created. `NOT NULL`, defaults to `now()`. |
| **updated_at** | timestamp | ✓ | Timestamp of the most recent update (e.g., when marked seen). `NOT NULL`, defaults to `now()`. |
| **noti_date** | date |  | Calendar date associated with the notification, if distinct from `created_at`'s date. |

---

##### Key Notes / Business Rules

- This table is the **per-recipient fan-out** of notifications — a single manually-triggered blast (`manual_notifications`, which targets an array of recipients via `to`) results in one row per recipient here, each linked back via `manual_id`.
- **`seen`** is stored as `smallint` (`0`/`1`) rather than `boolean`, unlike most other status flags in the schema — worth normalizing if boolean semantics were intended, though functionally equivalent for filtering.
- Not every notification originates from a manual blast — `manual_id` is nullable, supporting purely system-generated, targeted notifications (e.g., the PTR-shift example, which is generated directly from a `ptr_shifts` action rather than a broadcast).
- No `is_deleted` column exists — notifications appear to be retained permanently once created, with `seen` serving as the primary read/unread state rather than a deletion flag.
- During reporting/app queries, the application generally retrieves records where:
    - `to` matches the requesting user
    - `seen = 0` for unread-notification counts/badges

---

##### Indexes

No indexes were identified in the structure provided beyond the implicit primary key constraint.

---

---

##### Example Record

| id | from | to | header | description | type | seen | manual_id |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 13393 | 34915 | 34959 | PTR Shifting | Supervisor wants to give 1 PTRs (Cap) to you | success | 1 | 10866 |

---

---

#### <span style="color:#B9770E">Table: `manual_notifications`</span>
##### Purpose

Stores a single **manually-triggered notification blast** sent by an administrator/supervisor to one or more recipients simultaneously (e.g., a device-block alert sent to multiple users at once). Each row here typically fans out into multiple per-recipient rows in `notifications` via the `manual_id` foreign key.

**Primary Key:** `id`

> **Note:** Although `from` appears to reference a user record and `to` appears to reference multiple user records, the database does **not** currently enforce foreign key constraints on either column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the manual notification blast. Auto-generated using the `manual_notifications_id_seq` sequence. |
| **header** | varchar(255) |  | Short title of the notification blast (e.g., "Block Device"). |
| **description** | text |  | Full message body sent to all recipients (e.g., "Block device"). |
| **from** | integer (int4) |  | Identifier of the user/admin who triggered this notification blast. No enforced FK to `users.id`. |
| **to** | integer[] (`_int4`) |  | Array of recipient user IDs this blast was sent to (e.g., `{34959}` for a single recipient, `{32311,29375,33932}` for multiple). No enforced FK. |
| **time** | timestamp |  | Scheduled or actual send time of the notification blast. |
| **sent** | smallint (int2) |  | Whether the blast has been dispatched. Default `0`; sample data shows `1` for sent blasts. |
| **type** | varchar(255) |  | Classification/severity of the notification (e.g., "success"), matching the `type` values seen on the corresponding `notifications` rows. |
| **created_at** | timestamp | ✓ | Timestamp when the record was created. `NOT NULL`, defaults to `now()`. |
| **updated_at** | timestamp | ✓ | Timestamp of the most recent update. `NOT NULL`, defaults to `now()`. |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. `NOT NULL`, default `false`. |

---

##### Key Notes / Business Rules

- This table is the **source/template for a multi-recipient notification blast** — the array-based `to` column defines the intended audience, and each recipient subsequently gets an individual row in `notifications` (linked via `notifications.manual_id`) to track their own read/seen state independently.
- **`sent`** (smallint `0`/`1`) tracks dispatch status of the blast as a whole, separate from each recipient's individual `seen` status tracked in `notifications`.
- The recipient array (`to`) is **not enforced via foreign key** — validating that all referenced user IDs are real, active users depends entirely on the application layer.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - `sent` indicates dispatch status, `from` filters by the sending admin/supervisor

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| manual_notifications_pkey | BTREE (PK) | id | Primary key lookups. |

---

---

##### Example Records

| id | header | from | to | sent | type |
| --- | --- | --- | --- | --- | --- |
| 10866 | PTR Shifting | 34915 | {34959} | 1 | success |
| 10840 | Block Device | 34332 | {32311,29375,33932} | 1 | success |

---

---

#### <span style="color:#B9770E">Table: `chats`</span>
##### Purpose

Stores individual one-to-one chat messages exchanged between two users within the ECRM app (e.g., BR-to-supervisor messaging), including delivery/read status and optional file attachments.

**Primary Key:** `id`

> **Note:** Although `sender` and `receiver` appear to reference user records, the database does **not** currently enforce foreign key constraints on either column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the chat message. Auto-generated using the `chats_id_seq1` sequence. |
| **sender** | integer (int4) | ✓ | Identifier of the user who sent the message. No enforced FK to `users.id`. |
| **receiver** | integer (int4) | ✓ | Identifier of the user who received the message. No enforced FK to `users.id`. |
| **message** | varchar |  | Text content of the chat message (e.g., "hi boss"). |
| **chat_date** | date | ✓ | Calendar date the message was sent. |
| **created_at** | timestamp | ✓ | Timestamp when the message record was created. `NOT NULL`, no default shown — must be explicitly set by the application. |
| **updated_at** | timestamp | ✓ | Timestamp of the most recent update (e.g., when delivery/seen status changes). `NOT NULL`, no default shown. |
| **delivered** | boolean (bool) | ✓ | Whether the message has been delivered to the receiver's device. `NOT NULL`, default `false`. |
| **seen** | boolean (bool) | ✓ | Whether the receiver has read the message. `NOT NULL`, default `false`. **Note:** unlike `notifications.seen` (stored as `smallint`), this column is properly typed as `boolean` — worth flagging the inconsistency between the two similarly-named columns across tables. |
| **file** | jsonb[] (`_jsonb`) |  | Array of JSON objects representing file attachments sent with the message (e.g., images, documents), allowing multiple attachments per message. |

---

##### Key Notes / Business Rules

- This is a straightforward **one-to-one direct messaging** table, tracking standard delivery lifecycle: sent → delivered → seen.
- **`delivered`** and **`seen`** are two distinct states — a message can be delivered to a device without yet being read/opened by the recipient.
- `created_at` and `updated_at` have no database default and are `NOT NULL`, meaning the application must always explicitly supply both values on every write — same pattern seen in `custom_queries`.
- No `is_deleted` column exists — messages appear to be permanent once sent, with no soft-delete or "delete for me"/"delete for everyone" mechanism reflected at the database level.
- File attachments support **multiple files per message** via the array structure, rather than being limited to one attachment.
- During reporting/app queries, the application generally retrieves records where:
    - `sender`/`receiver` match the two parties of a conversation, ordered by `chat_date`/`created_at`
    - `seen = false` for unread-message counts

---

##### Indexes

No indexes were identified in the structure provided beyond the implicit primary key constraint.

---

---

##### Example Record

| id | sender | receiver | message | chat_date | delivered | seen |
| --- | --- | --- | --- | --- | --- | --- |
| 2556 | 34246 | 15401 | hi boss | 2026-05-26 | false | false |

---

---

#### <span style="color:#B9770E">Table: `audios`</span>
##### Purpose

Stores references to audio recordings captured during survey/campaign interactions (e.g., a consumer's recorded voice response), organized by campaign and optionally linked to a user and a consumer's contact number.

**Primary Key:** `id`

**Foreign Key:** `campaign_id → campaigns.id`

> **Note:** Although `user_id` appears to reference a user record, the database does **not** currently enforce a foreign key constraint on this column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the audio record. Auto-generated using the `audios_id_seq` sequence. |
| **user_id** | integer (int4) |  | Identifier of the BR/user associated with this audio recording. No enforced FK to `users.id`. |
| **audio** | varchar(255) |  | File path/URL to the stored audio file (e.g., `Production/ecrm/Audios/Survey/cmp-186/....mp3`), organized by campaign in the storage path. |
| **campaign_id (FK)** | integer (int4) | ✓ | References `campaigns.id`. The campaign this audio recording belongs to. |
| **contact_no** | integer (int4) |  | Consumer phone number associated with this recording, if applicable. Nullable in sample data. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This table stores **audio artifacts** generated during survey/campaign flows — likely voice recordings requested as part of a specific campaign's survey questionnaire (paralleling the `audio_recorded`/`audio_needed` flags seen in `contacts.additional_info`).
- The storage path convention (`.../Audios/Survey/cmp-{campaign_id}/...`) organizes files by campaign, mirroring the folder convention used for selfie images in `daily_checks.img_url`.
- No `is_deleted` column exists on this table — audio records appear to be retained permanently once created.
- No enforced relationship exists back to `contacts`/`surveys` — the connection between an audio recording and its originating interaction is implicit (via `contact_no`/`campaign_id`/timing) rather than a direct foreign key.
- During reporting, the application generally retrieves records where:
    - `campaign_id` matches the target campaign, optionally filtered by `contact_no` or `user_id`

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| audios_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Records

| id | user_id | campaign_id | contact_no | audio |
| --- | --- | --- | --- | --- |
| 10035404 | 25062 | 186 | NULL | Production/ecrm/Audios/Survey/cmp-186/25062125_402134751225100.mp3 |
| 10032017 | 29146 | 179 | NULL | Production/ecrm/Audios/Survey/cmp-179/29146179_119162238708100.mp3 |

---

---

#### <span style="color:#B9770E">Table: `whatsapp_lookups`</span>
##### Purpose

Stores consumer campaign-survey interactions conducted through **WhatsApp** (rather than the field app), capturing the raw survey answer payload, an image-generation service payload, and a corresponding "Nimbus" delivery/processing payload. Powers a WhatsApp-based alternative data-capture channel — notably including an AI-generated "delighter" image feature (e.g., turning a consumer's photo into a stylized campaign visual).

**Primary Key:** `id`

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the WhatsApp lookup record. Auto-generated using the `whatsapp_lookups_id_seq` sequence. |
| **phone_no_otp** | varchar(255) | ✓ | Composite identifier combining the consumer's phone number and an OTP/session value (e.g., `1784653876_123456`), used to correlate this record back to a specific verified WhatsApp session. |
| **payload** | jsonb[] (`_jsonb`) |  | Array of individual question/answer JSON objects captured through the WhatsApp survey flow (e.g., `product`, `secondary_brand`, `contact_no`, `dob`, `name`, `signature`, `occupation`) — functionally the WhatsApp-channel equivalent of `contact_survey_data_maps`, but stored as an array rather than normalized rows. |
| **img_journey_payload** | jsonb |  | Payload sent to/received from the image-generation service — per internal note, this originates from Nimbus (an image-generation pipeline) and includes the consumer's name, generated picture URL, channel ("whatsapp"), associated `user_id`/`campaign_id`, and the phone number. |
| **nimbus_payload** | jsonb |  | Payload related to the "Nimbus" processing/delivery pipeline — in sample data, includes a `delighter` flag, the `contact_no`, the source image URL, and an array of `target_images` (template images the consumer's photo may be composited against, e.g., an "avataryze" lifestyle template). |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

---

##### Key Notes / Business Rules

- This table supports a **WhatsApp-based consumer engagement channel**, separate from the field-app-driven `contacts`/`surveys` flows — the same style of survey questions (`product`, `secondary_brand`, `signature`, `occupation`, `dob`) are captured, but through WhatsApp conversation rather than an in-app form.
- **`img_journey_payload`** and **`nimbus_payload`** together support an **AI-driven "delighter" image feature** — the consumer's submitted photo (`source_image`) can be transformed/composited against branded template images (`target_images`, e.g., an "avataryze" lifestyle template) as a promotional engagement gimmick, with the WhatsApp-image-generation ("Nimbus") pipeline handling the actual image processing.
- **`payload`** stores survey answers in a **raw array-of-JSON-objects format** rather than normalized rows — unlike `contact_survey_data_maps`/`survey_data_maps`, question/answer pairs here are not broken into separate table rows, meaning question-level reporting requires JSON parsing/unnesting rather than a simple `WHERE question = ...` filter.
- No `is_deleted` column exists — WhatsApp interaction records appear to be retained permanently once created.
- During reporting, the application generally retrieves records where:
    - `phone_no_otp` or the embedded `campaign_id` (within `img_journey_payload`) matches the target consumer/campaign

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| whatsapp_lookups_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Record

| id | phone_no_otp | img_journey_payload.campaign_id | nimbus_payload.delighter |
| --- | --- | --- | --- |
| 52 | 1784653876_123456 | 129 | true |

---

---

---

---

#### <span style="color:#B9770E">Table: `contact_message_maps`</span>
##### Purpose

Logs SMS/messaging deliveries sent to a consumer or other contact in connection with a specific interaction (e.g., a promotional link, a follow-up message), tracking the delivery gateway's response and status — the general-purpose messaging counterpart to the OTP-specific `otp_verifications` table.

**Primary Key:** `id`

> **Note:** Although `contact_id` appears to reference `contacts.id` (or a related contact record), the database does **not** currently enforce a foreign key constraint on this column.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the message record. Auto-generated using the `contact_message_maps_id_seq` sequence. |
| **contact_id** | integer (int4) | ✓ | Identifies the parent contact interaction this message relates to. No enforced FK. |
| **contact_no** | integer (int4) | ✓ | Recipient phone number the message was sent to. |
| **contact_date** | date | ✓ | Calendar date of the associated contact interaction. |
| **message** | varchar | ✓ | The actual message body sent (e.g., a promotional link in Bengali/English). |
| **platform_type** | varchar |  | Identifies the SMS gateway/platform used to send the message (e.g., "ssl"), same convention as `otp_verifications.platform_type`. |
| **status** | integer (int4) | ✓ | Status code of the message send attempt. `NOT NULL`, default `174` — the same default seen on `otp_verifications.status`, suggesting a shared "pending/initial" status-code convention across messaging tables. |
| **sent_time** | timestamp |  | Timestamp the message was actually dispatched via the gateway. |
| **gateway_response** | text |  | Raw JSON response from the SMS gateway, including status, status code, and error message (e.g., `{"status":"FAILED","status_code":4003,"error_message":"IP Blacklisted"}` in sample data) — useful for diagnosing delivery failures. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |
| **contact_type** | varchar | ✓ | Classifies what kind of contact this message relates to. `NOT NULL`, default `'consumer_contact'`. Other values presumably exist for non-consumer message types (e.g., retailer/outlet messages). |

---

##### Key Notes / Business Rules

- This table is the **general messaging delivery log**, parallel in structure and purpose to `otp_verifications` but for non-OTP message content (e.g., promotional links, informational messages).
- **`gateway_response`** captures the raw delivery outcome from the SMS gateway — the sample record shows a **failed delivery** (`"status":"FAILED"`, `"error_message":"IP Blacklisted"`), illustrating the kind of infrastructure-level delivery issue this table helps diagnose.
- **`status` defaulting to `174`** matches the same default seen on `otp_verifications.status`, reinforcing that this is likely a shared status-code vocabulary across ECRM's messaging-related tables.
- **`contact_type`** defaults to `'consumer_contact'`, meaning this table's primary use case is consumer-facing messages, though the column's existence implies other contact types (e.g., retailer messages) may also be logged here.
- During reporting, the application generally retrieves records where:
    - `contact_date`/`contact_id` match the target scope
    - `status` and `gateway_response` are inspected together to assess delivery success/failure rates

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| contact_message_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---


---

<a id="module-13"></a>

## <span style="color:#1A5276">Module 13: Leave Management</span>

*2 item(s) in this module.*

#### <span style="color:#B9770E">Table: `leaves`</span>
##### Purpose

Records employee leave requests — the type of leave, reason, supporting attachments, and who took action on the request (approved/rejected). This is the master leave-request table that likely feeds into `daily_checks.on_leave` and attendance/compliance reporting.

**Primary Key:** `id`

> **Note:** Although `user_id`, `action_taken_by`, and `request_by` appear to reference user records, the database does **not** currently enforce foreign key constraints on any of these columns.
> 

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the leave request. Auto-generated using the `leaves_id_seq` sequence. |
| **user_id** | integer (int4) | ✓ | Identifier of the user the leave request is for. No enforced FK to `users.id`. |
| **type** | integer (int4) | ✓ | Coded classification of leave type (e.g., sick, casual, earned). Allowed values managed by the application layer. |
| **reason** | varchar |  | Free-text reason for the leave request (e.g., "Mothers operation checkups"). |
| **action_taken_by** | integer (int4) |  | Identifier of the user (typically a supervisor/manager) who approved or rejected the request. No enforced FK to `users.id`. |
| **status** | integer (int4) |  | Coded status of the leave request (e.g., pending, approved, rejected). Allowed values managed by the application layer. |
| **created_at** | timestamp | ✓ | Timestamp when the request was created. `NOT NULL`, defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp | ✓ | Timestamp of the most recent update. `NOT NULL`, defaults to `CURRENT_TIMESTAMP`. |
| **attachment** | varchar[] (`_varchar`) |  | Array of file paths/URLs for supporting documents (e.g., medical certificates). Can be empty (`{}`) if no attachment is provided. |
| **platform_type** | integer (int4) |  | Coded identifier of the platform/app the leave request was submitted from. |
| **request_by** | integer (int4) |  | Identifier of the user who submitted the request. **Note:** in the sample record, `request_by` equals `user_id`, suggesting this is typically the requester themselves, but the separate column may exist to support cases where someone else (e.g., a supervisor) files leave on behalf of a user. |

---

##### Key Notes / Business Rules

- This is the **master leave-request record** — the specific date(s) covered by the leave are stored separately in the child table `leave_date_maps`, allowing a single leave request to span multiple, potentially non-contiguous dates.
- **`user_id`** (who the leave is for) and **`request_by`** (who submitted it) are conceptually distinct, though they coincide in the sample data — this distinction matters for cases of proxy-filed leave requests.
- **`action_taken_by`** and **`status`** together capture the approval workflow outcome — similar in spirit to the approval-chain pattern used in `user_approval_maps` for user role approvals.
- `attachment` defaults to an empty array (`{}`) rather than `NULL` when no supporting document is provided.
- No `is_deleted` column exists — leave requests appear to be retained permanently once created, with `status` serving as the primary state indicator.
- During reporting, the application generally retrieves records where:
    - `user_id` and `status` (e.g., approved) match the target scope
    - joined to `leave_date_maps` to determine which specific calendar dates are covered

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| leaves_pkey | BTREE (PK) | id | Primary key lookups. |

---

---

##### Example Record

| id | user_id | type | reason | action_taken_by | status | request_by |
| --- | --- | --- | --- | --- | --- | --- |
| 178 | 30983 | 118 | Mothers operation checkups | 121 | NULL | 30983 |

---

---

#### <span style="color:#B9770E">Table: `leave_date_maps`</span>
##### Purpose

Child table storing the individual calendar date(s) covered by a single leave request in `leaves`. Since a leave request can span multiple, non-contiguous days, this table normalizes each covered date into its own row.

**Primary Key:** `id`

**Foreign Key:** `leave_id → leaves.id` (implied; not shown as enforced in the structure provided)

---

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the leave-date record. Auto-generated using the `leave_date_maps_id_seq` sequence. |
| **leave_id** | integer (int4) | ✓ | Identifies the parent leave request in `leaves.id` that this date belongs to. No enforced FK shown. |
| **date** | date | ✓ | A single calendar date covered by the parent leave request. |

---

##### Key Notes / Business Rules

- This is a simple **one-to-many normalization** of `leaves` — one row per calendar date covered by a leave request, allowing a leave to cover non-contiguous days (e.g., a leave taken on the 4th and again on the 24th of a month, as reflected in the sample data with different `leave_id` values).
- No `is_deleted` or timestamp columns exist on this table — it is a minimal, purely structural mapping table.
- This table likely feeds directly into `daily_checks.on_leave` — a user's attendance check for a given date can be cross-referenced against this table to confirm an approved leave was on file for that day.
- During reporting, the application generally retrieves records where:
    - `leave_id` matches the target leave request, or `date` matches a specific day being checked against a user's approved leave

---

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| leave_date_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

##### Example Records

| id | leave_id | date |
| --- | --- | --- |
| 147 | 58 | 2023-09-24 |
| 148 | 59 | 2023-09-04 |

---

---


---

---

<a id="module-14"></a>

## <span style="color:#1A5276">Module 14: AAI Audio Auditing Subsystem</span>

*12 item(s) in this module.*

#### <span style="color:#B9770E">Table: `aai_projects`</span>

##### Purpose

Master configuration table for an AAI (Automated Audio Interface / Audio Auditing) project — a campaign-linked initiative that captures field-recorded audio (e.g., BR–consumer conversations) and runs it through automated and/or human quality verification. Defines the project's date range, audio-processing feature flags (enhancement, noise reduction, phrase detection), and active/deleted state. This is the root entity that the entire AAI subsystem (levels, questions, auditors, audios) hangs off of.

**Primary Key:** `id`

> **Note:** Although `campaign_id` appears to reference `campaigns.id`, the database does not currently enforce a foreign key constraint on this column.

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the AAI project. Auto-generated using the `aai_projects_id_seq1` sequence. |
| **project_type** | varchar | ✓ | Classifies the nature of the audio project (e.g., "ppl" in sample data — meaning not fully clear from structure alone, likely an internal project-category code). |
| **project_name** | varchar | ✓ | Display name of the project (e.g., "Derby Mega LEP"). |
| **campaign_id** | integer (int4) |  | Identifies the ECRM campaign this AAI project is tied to. No enforced FK to `campaigns.id`. |
| **start_date** | date | ✓ | Date the project's audio auditing activity begins. |
| **end_date** | date | ✓ | Date the project's audio auditing activity ends. |
| **audio_enhancement** | boolean (bool) |  | Whether captured audio is passed through an enhancement process (e.g., volume normalization) before verification. Default `false`. |
| **detect_phrase** | boolean (bool) |  | Whether automated key-phrase detection is applied to the audio (checking whether the BR spoke required scripted phrases — tying into `aai_projects_phrase_maps`). Default `false`. |
| **noise_reduction** | boolean (bool) |  | Whether background noise reduction is applied to captured audio before verification. Default `false`. |
| **is_active** | boolean (bool) | ✓ | Whether the project is currently active/accepting new audio. `NOT NULL`, default `true`. |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. `NOT NULL`, default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

##### Key Notes / Business Rules

- This is the root configuration entity for the AAI (Audio Auditing) subsystem — every downstream table (`aai_audios`, `aai_questions`, `aai_auditor_project_maps`, `aai_project_level_maps`, etc.) is scoped to a `project_id` referencing this table.
- The three boolean feature flags (`audio_enhancement`, `detect_phrase`, `noise_reduction`) control which automated audio-processing steps run on captured recordings before/alongside human verification — these tie directly into the `is_poor`/`is_noisy`/`is_not_clear`/`is_good` quality flags seen in `aai_verified_audios`.
- `is_active` and `is_deleted` are distinct — `is_active` reflects the project's operational window/status, while `is_deleted` marks the record as logically removed.
- `start_date`/`end_date` define the project's operating window, separate from `is_active`, so a project could be marked inactive before its `end_date` if paused early.
- Soft deletion is handled using **`is_deleted`**.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - `is_active = true`, optionally scoped by `campaign_id`

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| aai_projects_pkey | BTREE (PK) | id | Primary key lookups. |
| idx_aa_project_id | BTREE | campaign_id | Speeds up lookups of AAI projects tied to a given campaign. |

##### Example Record

| id | project_type | project_name | campaign_id | start_date | end_date | detect_phrase | is_active |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2 | ppl | Derby Mega LEP | 26 | 2024-02-07 | 2024-03-31 | true | true |

---

#### <span style="color:#B9770E">Table: `aai_levels`</span>

##### Purpose

A small, static reference table defining the numeric audit hierarchy levels used across the AAI subsystem (e.g., Level 1 = first-pass auditor review, Level 2 = senior/QA review) — referenced by `aai_project_level_maps`, `aai_role_level_maps`, and `aai_auditor_project_maps` to assign targets, roles, and auditors to a specific tier of review.

**Primary Key:** `id`

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the level record. Auto-generated using the `aai_levels_id_seq` sequence. |
| **level** | integer (int4) | ✓ | The numeric level value itself (e.g., `1`, `2`) representing a tier in the audit review hierarchy. |
| **created_at** | timestamptz | ✓ | Timestamp when the record was created. `NOT NULL`, timezone-aware. |
| **updated_at** | timestamptz | ✓ | Timestamp of the most recent update. `NOT NULL`, timezone-aware. |

##### Key Notes / Business Rules

- This is a minimal static lookup table — `id` and `level` may appear redundant in early data (e.g., `id = 1`, `level = 1`), but the separation allows `level` values to be reordered or reused independently of their surrogate key if the audit hierarchy is restructured.
- Referenced by `aai_project_level_maps.level_id`, `aai_role_level_maps.level_id`, and implicitly by `aai_auditor_project_maps.level` (though the latter stores a raw integer rather than an explicit FK, per the structure shown).
- No `is_deleted` column exists — levels appear to be a small, rarely-changing configuration set rather than a frequently modified table.
- During reporting, the application generally joins this table wherever a numeric level needs to be translated into its business meaning within a specific project/role context.

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| levels_pkey | BTREE (PK) | id | Primary key lookups. |

##### Example Record

| id | level |
| --- | --- |
| 1 | 1 |

---

#### <span style="color:#B9770E">Table: `aai_project_level_maps`</span>

##### Purpose

Defines, per AAI project and level, the daily audit target an auditor at that level is expected to complete, along with over-achievement thresholds and pagination/display settings for the auditor's review queue.

**Primary Key:** `id`

**Foreign Keys:** `project_id → aai_projects.id`, `level_id → aai_levels.id`

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the project-level target record. Auto-generated using the `aai_project_level_maps_id_seq` sequence. |
| **project_id (FK)** | integer (int4) | ✓ | References `aai_projects.id`. The project this target configuration applies to. |
| **level_id (FK)** | integer (int4) | ✓ | References `aai_levels.id`. The audit tier this target configuration applies to. |
| **day_target** | integer (int4) | ✓ | Number of audio verifications an auditor at this level/project is expected to complete per day (e.g., `6000`). |
| **is_target_percentage** | boolean (bool) |  | Whether `day_target` (or a related achievement metric) should be interpreted as a percentage rather than a raw count. |
| **load_per_page** | integer (int4) | ✓ | Number of audio items loaded per page in the auditor's review queue UI (e.g., `10`). |
| **custom_query** | text |  | Optional custom SQL query overriding the default audio-selection logic for this project/level, mirroring the `custom_query` pattern seen in `campaign_callcheckback_maps`. |
| **over_achievement** | integer (int4) | ✓ | Threshold or allowance for exceeding the daily target (e.g., `0`, meaning no over-achievement credited beyond the target in this sample row). |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. `NOT NULL`, default `false`. Sample record shows `is_deleted = true`, indicating this specific project/level target configuration has since been retired/replaced. |
| **created_at** | timestamptz | ✓ | Timestamp when the record was created. `NOT NULL`, timezone-aware. |
| **updated_at** | timestamptz | ✓ | Timestamp of the most recent update. `NOT NULL`, timezone-aware. |

##### Key Notes / Business Rules

- This table drives per-level daily productivity targets for auditors working an AAI project — the combination of `project_id` + `level_id` determines the expected daily volume (`day_target`) an auditor must verify.
- `custom_query` allows overriding how audio items are selected/queued for an auditor at this level, similar in spirit to the `custom_query` override pattern in `campaign_callcheckback_maps`.
- Soft deletion is handled using **`is_deleted`** — worth noting the sample record is itself soft-deleted, meaning target configurations are versioned/replaced over time rather than updated in place.
- During reporting, the application generally retrieves records where:
    - `is_deleted = false`
    - `project_id` and `level_id` match the target auditor's assignment

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| project_level_maps_pkey | BTREE (PK) | id | Primary key lookups. |

##### Example Record

| id | project_id | level_id | day_target | over_achievement | is_deleted |
| --- | --- | --- | --- | --- | --- |
| 7 | 2 | 1 | 6000 | 0 | true |

---

#### <span style="color:#B9770E">Table: `aai_role_level_maps`</span>

##### Purpose

Bridge table mapping a role to a specific audit level within a project, controlling which roles are permitted to operate at which tier of the audit hierarchy for a given AAI project.

**Primary Key:** `id`

**Foreign Keys:** `level_id → aai_levels.id`, `role_id → roles.id`, `project_id → aai_projects.id` (implied; not shown as enforced in the structure provided)

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the role-level mapping. Auto-generated using the `aai_role_level_maps_id_seq` sequence. |
| **level_id** | integer (int4) | ✓ | References `aai_levels.id`. The audit level this role is permitted to operate at. |
| **role_id** | integer (int4) | ✓ | Identifies the role granted access to this level. Presumed reference to `roles.id`. |
| **project_id** | integer (int4) | ✓ | Identifies the AAI project this role/level grant applies to. No enforced FK shown to `aai_projects.id`. |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. `NOT NULL`, default `false`. |
| **created_at** | timestamptz | ✓ | Timestamp when the mapping was created. `NOT NULL`, timezone-aware. |
| **updated_at** | timestamptz | ✓ | Timestamp of the most recent update. `NOT NULL`, timezone-aware. |

##### Key Notes / Business Rules

- This table controls which role can operate at which audit level for a specific project — e.g., a "junior auditor" role might map to level 1 for project A, while a "senior auditor" role maps to level 2.
- A partial unique constraint enforces that `(role_id, level_id, project_id)` is unique among active (non-deleted) records — allowing a previously-deleted mapping combination to be re-created without violating uniqueness, the same pattern as `sku_items.sku_serial_delete_marker_unique`.
- Sample data shows one mapping (`role_id=1, level_id=2, project_id=2`) with `is_deleted = true`, illustrating that role/level grants for a project can be revoked/retired over time.
- Soft deletion is handled using **`is_deleted`**.
- During reporting/access-check queries, the application generally retrieves records where:
    - `is_deleted = false`
    - `role_id`, `level_id`, and `project_id` match the target grant being checked

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| role_level_maps_pkey | BTREE (PK) | id | Primary key lookups. |
| role_level_maps_unq | BTREE (UNIQUE, partial) | role_id, level_id, project_id, is_deleted | Enforces uniqueness of a role/level/project grant only among active records, allowing re-creation after soft-deletion. |

##### Example Records

| id | level_id | role_id | project_id | is_deleted |
| --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 1 | false |
| 2 | 2 | 2 | 1 | false |
| 3 | 2 | 1 | 2 | true |

---

#### <span style="color:#B9770E">Table: `aai_auditor_project_maps`</span>

##### Purpose

Assigns a specific auditor (user) to a specific AAI project at a specific audit level, tracking whether this is their currently active assignment.

**Primary Key:** `id`

> **Note:** Although `auditor_id` and `project_id` appear to reference `users.id` and `aai_projects.id` respectively, the database does not currently enforce foreign key constraints on either column in the structure provided.

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the auditor-project assignment. Auto-generated using the `aai_auditor_project_maps_id_seq` sequence. |
| **auditor_id** | integer (int4) | ✓ | Identifies the user acting as auditor. No enforced FK to `users.id`. |
| **project_id** | integer (int4) | ✓ | Identifies the AAI project the auditor is assigned to. No enforced FK to `aai_projects.id`. |
| **level** | integer (int4) | ✓ | The audit tier/level this auditor is assigned to work at for this project. Stored as a raw integer rather than an explicit FK to `aai_levels.id`. |
| **is_current** | boolean (bool) | ✓ | Flags whether this is the auditor's presently active project assignment. `NOT NULL`, default `true`. |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. `NOT NULL`, default `false`. |
| **created_at** | timestamp |  | Timestamp when the assignment was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

##### Key Notes / Business Rules

- This is the table that determines who is actively auditing which project, at which level — it's the assignment layer that `aai_audio_assign_maps` and `aai_verified_audios` (via `auditor_id`) ultimately rely on.
- `is_current` and `is_deleted` are two distinct flags — an auditor's assignment could be marked no-longer-current (reassigned elsewhere) without being deleted, or vice versa.
- Soft deletion is handled using **`is_deleted`**.
- During reporting/task-assignment queries, the application generally retrieves records where:
    - `is_deleted = false`
    - `is_current = true`
    - `auditor_id` and/or `project_id` match the target scope

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| aai_auditor_project_maps_pkey | BTREE (PK) | id | Primary key lookups. |

##### Example Record

| id | auditor_id | project_id | level | is_current | is_deleted |
| --- | --- | --- | --- | --- | --- |
| 974 | 27348 | 16 | 1 | true | false |

---

#### <span style="color:#B9770E">Table: `aai_questions`</span>

##### Purpose

Master catalog of audit checklist questions used to evaluate a verified audio recording within a specific AAI project — each question carries a scoring weight (`total_weight`) and answer-input type (e.g., checkbox). Analogous in role to `campaign_joint_call_maps.joint_call`/`campaign_callcheckback_maps.survey`, but implemented as normalized rows rather than an embedded JSON survey definition.

**Primary Key:** `id`

**Foreign Key:** `project_id → aai_projects.id`

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the question record. Auto-generated using the `aai_questions_id_seq` sequence. |
| **question_text** | varchar(255) | ✓ | The full question text shown to the auditor (in Bengali in sample data), describing a specific scripted phrase/behavior to verify against the audio. |
| **project_id (FK)** | integer (int4) | ✓ | References `aai_projects.id`. The project this question belongs to — questions are project-specific, not global. |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. `NOT NULL`, default `false`. |
| **total_weight** | integer (int4) | ✓ | Maximum scoring weight this question contributes toward an audio's overall audit score (e.g., `200`). |
| **type** | varchar(255) | ✓ | Input/answer type for this question (e.g., "checkbox"). Allowed values managed by the application layer. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

##### Key Notes / Business Rules

- This table holds the question bank for a project's audio-verification checklist — auditors listen to a recording and answer each active question in `aai_verification_answer_maps`, scoring the BR's actual scripted delivery against the intended phrase.
- `total_weight` defines the maximum contribution of each question to an audio's aggregate quality/compliance score — actual awarded weight per answer is captured on `aai_verification_answer_maps.weight`, and is typically some fraction of this maximum depending on the specific answer selected (see `aai_question_options.weight`).
- Questions are scoped per project (`project_id`), meaning different AAI projects can have entirely distinct checklists tailored to their specific campaign script.
- Soft deletion is handled using **`is_deleted`**.
- During reporting/auditor UI rendering, the application generally retrieves records where:
    - `is_deleted = false`
    - `project_id` matches the audio's originating project

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| aai_questions_pkey | BTREE (PK) | id | Primary key lookups. |

##### Example Records

| id | question_text (truncated) | project_id | total_weight | type |
| --- | --- | --- | --- | --- |
| 1 | "আরএ কি কনসিউমার কে বলেছে যে..." | 2 | 200 | checkbox |
| 3 | "আরএ কি কনসিউমার কে প্রোডাক্ট AV..." | 2 | 200 | checkbox |

---

#### <span style="color:#B9770E">Table: `aai_question_options`</span>

##### Purpose

Defines the selectable answer options for a given `aai_questions` record, along with the scoring weight each specific option contributes — e.g., a "Yes" (হ্যাঁ) answer awarding full weight versus a "No" (না) answer awarding zero.

**Primary Key:** `id`

**Foreign Key:** `question_id → aai_questions.id` (implied; not shown as enforced in the structure provided)

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the answer-option record. Auto-generated using the `aai_question_options_id_seq` sequence. |
| **weight** | integer (int4) | ✓ | Scoring weight awarded when this specific option is selected as the answer (e.g., `10` for "হ্যাঁ"/Yes, `0` for "না"/No). |
| **question_id** | integer (int4) | ✓ | Identifies which `aai_questions` record this option belongs to. No enforced FK shown. |
| **option** | varchar(255) | ✓ | The display text of the selectable option (e.g., "হ্যাঁ", "না"). |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. `NOT NULL`, default `false`. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `CURRENT_TIMESTAMP`. |
| **updated_at** | timestamp |  | Timestamp of the most recent update. Defaults to `CURRENT_TIMESTAMP`. |

##### Key Notes / Business Rules

- This table normalizes the answer choices and their scoring weight for each question — a question typically has two or more options (e.g., Yes/No), each carrying its own weight rather than a single pass/fail value.
- The weight recorded here (e.g., `10` for "হ্যাঁ") is distinct from `aai_questions.total_weight` (e.g., `200`) — the relationship/scaling between an individual option's weight and the question's total weight should be confirmed with the application team.
- Soft deletion is handled using **`is_deleted`**.
- During reporting/auditor UI rendering, the application generally retrieves records where:
    - `is_deleted = false`
    - `question_id` matches the question being displayed

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| aai_question_options_pkey | BTREE (PK) | id | Primary key lookups. |

##### Example Records

| id | question_id | option | weight |
| --- | --- | --- | --- |
| 194 | 82 | হ্যাঁ | 10 |
| 195 | 82 | না | 0 |

---

#### <span style="color:#B9770E">Table: `aai_projects_phrase_maps`</span>

##### Purpose

Defines specific scripted key phrases that automated phrase-detection should search for within a project's audio recordings (tied to `aai_projects.detect_phrase`), along with a target count for how often the phrase should occur.

**Primary Key:** `id`

**Foreign Key:** `project_id → aai_projects.id`

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the phrase-mapping record. Auto-generated using the `aai_projects_phrase_maps_id_seq` sequence. |
| **project_id (FK)** | integer (int4) | ✓ | References `aai_projects.id`. The project this phrase-detection rule applies to. |
| **phrase** | varchar(255) | ✓ | The specific scripted phrase automated detection should search for within the audio. |
| **target_count** | integer (int4) |  | Expected number of times this phrase should appear in a compliant recording. |
| **is_deleted** | boolean (bool) | ✓ | Soft-delete flag. `NOT NULL`, default `false`. |
| **created_at** | timestamptz | ✓ | Timestamp when the record was created. `NOT NULL`, timezone-aware. |
| **updated_at** | timestamptz | ✓ | Timestamp of the most recent update. `NOT NULL`, timezone-aware. |

##### Key Notes / Business Rules

- This table only becomes relevant for projects where `aai_projects.detect_phrase = true` — it defines the specific set of automated phrase-matching rules applied to that project's captured audio.
- Distinct from the manual audit-question mechanism (`aai_questions`) — this supports automated, algorithmic phrase detection rather than human-scored checklist answers, likely feeding into the auto-computed quality metrics seen on `aai_audios` (`audio_pctg`, `voice_pctg`, `noise_pctg`).
- Soft deletion is handled using **`is_deleted`**.
- During processing, the application generally retrieves records where:
    - `is_deleted = false`
    - `project_id` matches the audio's originating project

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| projects_phrase_maps_pkey | BTREE (PK) | id | Primary key lookups. |

---

#### <span style="color:#B9770E">Table: `aai_audios`</span>

##### Purpose

Stores the raw captured audio recording for a field contact — the file link, automatically-computed audio-quality metrics (voice/noise percentages), and identifying context (which BR/supervisor/location/consumer it relates to). This is the pre-verification "inbox" of audio files awaiting or having undergone automated processing, before human verification results are recorded in `aai_verified_audios`.

**Primary Key:** `id`

**Foreign Key:** `project_id → aai_projects.id`

> **Note:** Although `contact_id` appears to reference `contacts.id`, `sup_id`/`user_id` appear to reference `users.id`, and `location_id` appears to reference `locations.id`, the database does not currently enforce foreign key constraints on any of these columns.

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | bigint (int8) | ✓ | Primary key for the audio record. Auto-generated using the `aai_audios_id_seq1` sequence. Uses `bigint`, suggesting expected high volume, similar to `coupon_codes`. |
| **contact_id** | integer (int4) |  | Identifies the originating consumer contact this audio relates to. No enforced FK to `contacts.id`. |
| **project_id (FK)** | integer (int4) |  | References `aai_projects.id`. The AAI project this audio belongs to. |
| **audio_link** | text |  | File path/URL to the stored audio recording (e.g., `Production/ecrm/Audios/Survey/cmp-26/undefined` — note the literal "undefined" filename fragment in sample data, likely indicating an upload/naming bug for this specific record). |
| **audio_pctg** | integer (int4) |  | Overall computed audio-quality percentage score. |
| **noise_pctg** | integer (int4) |  | Computed percentage of the recording identified as background noise. |
| **voice_pctg** | integer (int4) |  | Computed percentage of the recording identified as clear voice content. |
| **created_at** | timestamptz |  | Timestamp when the record was created. Defaults to `now()`. |
| **audio_insert_date** | date |  | Date the audio record was inserted/ingested. Defaults to `now()` (date portion). |
| **sup_id** | integer (int4) | ✓ | Identifier of the supervisor associated with this audio/contact. No enforced FK to `users.id`. |
| **user_id** | integer (int4) | ✓ | Identifier of the BR/user who captured the underlying contact/audio. No enforced FK to `users.id`. |
| **contact_no** | varchar | ✓ | Consumer phone number associated with the underlying contact. **Note:** stored as `varchar` here, unlike the `integer` typing used for `contact_no`/`contact` in most other tables (`contacts`, `supervisor_contacts`) — a type inconsistency. |
| **location_id** | integer (int4) | ✓ | Identifies the outlet/location where the underlying contact occurred. No enforced FK to `locations.id`. |
| **audio_pctg_web** | integer (int4) |  | Web-computed variant of the overall audio-quality percentage — suggesting a separate/secondary processing pipeline. |
| **noise_pctg_web** | integer (int4) |  | Web-computed variant of the noise percentage. |
| **voice_pctg_web** | integer (int4) |  | Web-computed variant of the voice percentage. |

##### Key Notes / Business Rules

- This table is the audio ingestion/inbox layer of the AAI subsystem — audio files land here first with automated quality metrics, before being assigned to auditors (`aai_audio_assign_maps`) and manually verified (`aai_verified_audios`).
- The dual `_pctg` / `_pctg_web` columns suggest two separate audio-quality computation pipelines exist (e.g., an on-device/mobile calculation versus a server-side recalculation) — reporting should clarify which source is authoritative.
- `contact_no` being `varchar` here (versus `integer`/`int4` elsewhere in the schema) is a data-type inconsistency worth flagging for normalization.
- No `is_deleted` column exists on this table — audio ingestion records appear to be retained permanently once created.
- During reporting/auditor-queue generation, the application generally retrieves records where:
    - `project_id` matches the target project
    - not yet present in `aai_audio_assign_maps`/`aai_verified_audios` (i.e., pending assignment or verification)

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| aai_audios_pk | BTREE (PK) | id | Primary key lookups. |
| idx_aa_user_id | BTREE | user_id | Speeds up lookups of all audio records for a given BR/user. |
| idx_aa_location_id | BTREE | location_id | Speeds up lookups of all audio records for a given outlet/location. |

##### Example Record

| id | contact_id | project_id | user_id | sup_id | location_id | audio_pctg | voice_pctg |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 72306 | 2 | 123 | 101 | 655 | 78 | NULL |

---

#### <span style="color:#B9770E">Table: `aai_audio_assign_maps`</span>

##### Purpose

Assigns a specific ingested audio recording (from `aai_audios`) to a specific auditor for verification, scoping the assignment to a particular date and project. This is the queue-management layer sitting between raw audio ingestion and the actual verification outcome recorded in `aai_verified_audios`.

**Primary Key:** `(id, assigned_date)` — composite

**Foreign Keys:** `audio_id → aai_audios.id`, `project_id → aai_projects.id`

> **Note:** Although `auditor_id` appears to reference a user record, the database does not currently enforce a foreign key constraint on this column.

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | bigint (int8) | ✓ | Primary key for the assignment record. Auto-generated using the `aai_audio_assign_maps_id_seq` sequence. |
| **audio_id (FK)** | integer (int4) |  | References `aai_audios.id`. Identifies the specific audio recording being assigned. |
| **auditor_id** | integer (int4) |  | Identifier of the auditor assigned to verify this audio. No enforced FK to `users.id`. |
| **auditor_level** | integer (int4) |  | The audit tier/level at which this specific assignment is being reviewed, aligning with `aai_levels`. |
| **assigned_date** | date | ✓ | Date this audio was assigned to the auditor. Part of the composite primary key, indicating this table is likely date-partitioned in practice (index name includes a date stamp, `20240604`, similar to `otp_verifications`). |
| **project_id (FK)** | integer (int4) |  | References `aai_projects.id`. The project this assignment belongs to. |
| **created_at** | timestamp |  | Timestamp when the assignment record was created. Defaults to `now()`. |

##### Key Notes / Business Rules

- This table is the auditor work-queue assignment layer — it determines which auditor is responsible for verifying which specific audio file, on which date, and at what level of review.
- The composite primary key `(id, assigned_date)` and the date-stamped index name (`aai_audio_assign_maps_20240604_pkey`) strongly suggest this table is partitioned by `assigned_date`, similar to `contacts`, `surveys`, and `otp_verifications`.
- `auditor_level` on this table may differ from an auditor's general assignment level in `aai_auditor_project_maps.level`, if a single auditor can be assigned audio at different levels on different assignments.
- No `is_deleted` column exists — assignments appear to be permanent records once created, with completion/verification tracked separately in `aai_verified_audios`.
- During reporting/queue-retrieval, the application generally retrieves records where:
    - `auditor_id` and `assigned_date` match the target auditor's work-queue for a given day
    - not yet matched by a corresponding row in `aai_verified_audios`

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| aai_audio_assign_maps_20240604_pkey | BTREE (PK) | id, assigned_date | Primary key lookups; composite due to date-partitioning. |
| aai_audio_assign_maps_20240604_auditor_id_idx | BTREE | auditor_id | Speeds up retrieval of an auditor's assigned audio queue. |

##### Example Record

| id | audio_id | auditor_id | auditor_level | assigned_date | project_id |
| --- | --- | --- | --- | --- | --- |
| 163223 | 515466 | 703 | 1 | 2024-06-04 | 9 |

---

#### <span style="color:#B9770E">Table: `aai_verified_audios`</span>

##### Purpose

Records the outcome of an auditor's manual quality/compliance review of a single assigned audio recording — capturing subjective quality flags (poor, noisy, unclear, good), an overall rating, verification timing, and a free-text comment. This is the terminal record of the AAI verification pipeline for a given audio.

**Primary Key:** `(id, verification_date)` — composite

> **Note:** Although `aam_id` appears to reference `aai_audio_assign_maps.id` and `auditor_id` appears to reference a user record, the database does not currently enforce foreign key constraints on either column in the structure provided.

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | bigint (int8) | ✓ | Primary key for the verification record. Auto-generated using the `aai_verified_audios_id_seq` sequence. |
| **aam_id** | integer (int4) |  | Identifies the corresponding `aai_audio_assign_maps` record this verification fulfills. No enforced FK shown. |
| **is_verified** | boolean (bool) |  | Whether the auditor completed and confirmed the verification for this audio. |
| **auditor_id** | integer (int4) |  | Identifier of the auditor who performed this verification. No enforced FK to `users.id`. |
| **verification_date** | date | ✓ | Calendar date the verification was performed. Part of the composite primary key, and (per the date-stamped index name) likely the partition key for this table. |
| **is_poor** | boolean (bool) |  | Whether the auditor flagged the overall audio quality as poor. |
| **is_noisy** | boolean (bool) |  | Whether the auditor flagged the audio as containing excessive background noise. |
| **is_not_clear** | boolean (bool) |  | Whether the auditor flagged the audio as unclear/hard to understand. |
| **is_too_fast** | boolean (bool) |  | Whether the auditor flagged the speaker(s) as talking too quickly to properly assess. |
| **is_good** | boolean (bool) |  | Whether the auditor flagged the audio as good/acceptable quality overall. |
| **audio_rating** | numeric (float4) |  | Numeric quality rating assigned by the auditor (e.g., `5`), presumably on a defined scale. |
| **created_at** | timestamp |  | Timestamp when the record was created. Defaults to `now()`. |
| **start_time** | timestamp |  | Timestamp the auditor began reviewing this audio. |
| **end_time** | timestamp |  | Timestamp the auditor finished reviewing this audio. Combined with `start_time`, measures auditor review duration/productivity against `aai_project_level_maps.day_target`. |
| **comment** | varchar | ✓ | Free-text comment from the auditor. `NOT NULL`, defaults to `'No comment'` if the auditor doesn't provide one. |

##### Key Notes / Business Rules

- This is the terminal outcome record of the AAI verification pipeline: `aai_audios` (ingestion) → `aai_audio_assign_maps` (assignment) → `aai_verified_audios` (verification outcome) → `aai_verification_answer_maps` (detailed per-question scoring, if applicable).
- The quality flags (`is_poor`, `is_noisy`, `is_not_clear`, `is_too_fast`, `is_good`) are not necessarily mutually exclusive at the schema level.
- `start_time`/`end_time` allow measuring how long each auditor spends per audio, compared against `aai_project_level_maps.day_target`.
- `comment` defaults to `'No comment'` rather than allowing `NULL`.
- The composite primary key `(id, verification_date)` and date-stamped index name (`aai_verified_audios_20240205_pkey`) indicate this table is partitioned by `verification_date`, consistent with the partitioning pattern used across `contacts`, `otp_verifications`, and `aai_audio_assign_maps`.
- During reporting, the application generally retrieves records where:
    - `verification_date` falls within the target reporting range
    - `is_verified = true` to measure completed verification volume, cross-referenced with quality flags for QA reporting

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| aai_verified_audios_20240205_pkey | BTREE (PK) | id, verification_date | Primary key lookups; composite due to date-partitioning. |

##### Example Records

| id | aam_id | is_verified | auditor_id | verification_date | audio_rating | comment |
| --- | --- | --- | --- | --- | --- | --- |
| 92 | 8686 | true | 869 | 2024-02-27 | 5 | No comment |
| 93 | 8693 | true | 869 | 2024-02-27 | 5 | No comment |

---

#### <span style="color:#B9770E">Table: `aai_verification_answer_maps`</span>

##### Purpose

Stores the auditor's detailed, question-by-question answers given while verifying a specific audio in `aai_verified_audios` — the normalized breakdown of checklist responses (against `aai_questions`) and their scored weight, supporting granular compliance analysis beyond the summary quality flags on the parent verification record.

**Primary Key:** `id`

**Foreign Key:** `question_id → aai_questions.id`

> **Note:** Although `verified_audios_id` and `answer_id` appear to reference `aai_verified_audios.id` and `aai_question_options.id` respectively, the database does not currently enforce foreign key constraints on either column.

##### Column Definitions

| Column | Data Type | Required | Description |
| --- | --- | --- | --- |
| **id (PK)** | integer (int4) | ✓ | Primary key for the answer record. Auto-generated using the `aai_verification_answer_maps_id_seq` sequence. |
| **verified_audios_id** | integer (int4) | ✓ | Identifies the parent verification record in `aai_verified_audios`. No enforced FK shown. |
| **question** | varchar | ✓ | Denormalized copy of the question text at the time of answering — preserves the exact wording asked, even if `aai_questions.question_text` is later edited. |
| **answer** | varchar | ✓ | The auditor's recorded answer text (e.g., "হ্যাঁ"/Yes, "না"/No). |
| **question_id (FK)** | integer (int4) | ✓ | References `aai_questions.id`. Identifies which question from the project's checklist this answer corresponds to. |
| **answer_id** | integer (int4) |  | Identifies the specific selected option in `aai_question_options.id`, if applicable. No enforced FK shown. |
| **weight** | integer (int4) | ✓ | The scoring weight actually awarded for this specific answer — mirrors the corresponding `aai_question_options.weight`, denormalized here for historical accuracy. |
| **created_at** | timestamp | ✓ | Timestamp when the answer was recorded. `NOT NULL`, no default shown — must be explicitly set by the application. |

##### Key Notes / Business Rules

- This table is the normalized, question-level detail behind a single audio verification.
- Both `question` (text) and `weight` (score) are denormalized/snapshotted at answer time rather than always joined live from `aai_questions`/`aai_question_options` — this preserves historical accuracy even if the underlying question bank or scoring is later edited.
- Summing `weight` across all answer rows for a given `verified_audios_id`, compared against the sum of `total_weight` from the corresponding active questions, would yield an overall percentage compliance score for that audio verification.
- `created_at` has no database default and is `NOT NULL`, meaning the application must always explicitly supply this value on insert — same pattern seen in `custom_queries` and `chats`.
- During reporting, the application generally retrieves records where:
    - `verified_audios_id` matches the target verification(s)
    - aggregated by `question_id` for question-level compliance-rate analysis across many audios

##### Indexes

| Index Name | Type | Columns | Purpose |
| --- | --- | --- | --- |
| aai_verification_answer_maps_pkey | BTREE (PK) | id | Primary key lookups. |


##### Example Records

| id | verified_audios_id | question_id | answer | weight |
| --- | --- | --- | --- | --- |
| 1 | 1 | 1 | হ্যাঁ | 20 |
| 2 | 1 | 2 | হ্যাঁ | 20 |
| 3 | 1 | 3 | না | 0 |
| 4 | 1 | 4 | না | 0 |

---

<a id="part-iii"></a>

# Part III: Document Summary

<a id="summary-covers"></a>

## What This Document Covers

This document consolidates two previously separate references into a single, navigable source of truth for the ECRM platform:

- **Part I — Business Documentation:** the operating context for why ECRM exists, how campaigns and field operations run, the JML user-lifecycle process, the Report Manager's report types, the location hierarchy, PTR/reward mechanics, brand-tracking conventions, user types, and the analytics architecture (transactional DB → BigQuery).
- **Part II — Database Documentation:** a database-dictionary-style reference for **138 documented entries** (131 tables, 5 views, and 2 standalone workflow/relationship notes), grouped into **14 functional modules** spanning identity & access, campaigns, field contacts, quality assurance, audio-based compliance auditing, dialer workflows, rewards, reporting, and communications.

---

<a id="summary-patterns"></a>

## Recurring Architectural Patterns Observed Across the Schema

These patterns show up repeatedly across many tables and are worth keeping in mind when writing new queries or onboarding a new team member:

- **Soft deletion:** almost every table uses `is_deleted` (boolean) rather than hard deletes; a smaller number use a distinct `active`/`is_current`/`status` flag *alongside* `is_deleted` for a separate "currently valid" concept.
- **Effective-dating:** several tables (`sku_item_price`, `geo_location`, `consumers`, `campaign_joint_call_maps`, `campaign_callcheckback_maps`, `breakstation`) use `from_date`/`to_date`/`is_current` to preserve full history rather than overwriting values, typically with a far-future sentinel date (`9999-12-31`, occasionally `9999-12-30`) instead of `NULL` for "current."
- **Unenforced logical foreign keys:** a large share of relationships that are clearly foreign keys by naming and usage (e.g. `user_id`, `campaign_id`, `location_id` on many tables) are **not** enforced at the database level — integrity depends entirely on the application layer.
- **"region_id means cluster_id" naming convention:** several tables (`consumer_dialer_list`, `retailer_outlet_dialer_list`, `users_camp_term_maps`) use a generically-named `region_id`/`location_id` column that actually stores a **Cluster**-level ID, not a Region or generic location node.
- **Partitioning by date:** high-volume transactional tables (`contacts`, `surveys`, `contact_survey_data_maps`, `otp_verifications`, `aai_verified_audios`, `aai_audio_assign_maps`) use composite primary keys `(id, date_column)`, indicating range partitioning by that date column.
- **Denormalized survey/JSON storage:** campaign questionnaires are frequently stored as structured JSONB (`campaign_joint_call_maps.joint_call`, `campaign_callcheckback_maps.survey`) with parallel normalized answer tables (`*_survey_data_maps`) — the JSON defines the question tree and branching logic, while the answer tables record what was actually captured per interaction.
- **SKU-level brand tracking:** `product`/`secondary_brand`/`previous_brand` columns across `contacts`, `consumers`, and dialer contact tables reference `sku_items.id` (SKU-level), not `products.id` (brand level), despite the generic column names.

---

<a id="summary-issues"></a>
<!--
## Data-Quality & Schema Issues Flagged for Review
<!--
| Area | Issue |
| --- | --- |
| `outlets` | Underlying constraint/index names (`retailers_pkey`, `retailer_code_idx`) suggest the table was originally called `retailers`. |
| `campaign_theme_maps` | Underlying sequence/constraint (`campaign_color_maps_...`) indicates a rename from `campaign_color_maps`. |
| `agency_resource_map` | Has **two** apparent soft-delete columns (`delete_marker` and `is_deleted`) — precedence unclear. |
| `campaign_callcheckback_maps` | Uses sentinel `9999-12-30` instead of the `9999-12-31` convention used everywhere else. |
| `sku_item_price`, `aai_audios`, `cdr_contacts` | Mixed numeric typing (`float8` vs `integer`, `smallint` vs `integer`) for logically similar columns across related tables. |
| `proximity_report`, `breakstation` | Date/time columns stored as `text`/`varchar` rather than `date`/`timestamp`. |
| `jml_tickets` | `dob` and `execute_date` stored as `varchar` rather than proper date types. |
| `hierarchy`, `locations`, `sup_br_maps` | Duplicate indexes on identical column sets (candidates for consolidation). |
| `manpowers` | Links to its campaign via free-text `cmp_name` rather than an enforced `campaign_id`. |
| `region_dp` vs `dp_ter_area_region` | Two views with the same apparent purpose apply **inconsistent** active/deleted filtering across hierarchy levels — could return different result sets from the same data. |
| `user_campaign_locations_config` | Business purpose not fully confirmed — the view's inner join to `repeat_schedule_maps` on `CURRENT_DATE` returns rows only when an *unassignment* is scheduled for today, which may not match the view's apparent name/intent. Flagged as open with you during this conversation. |
-->
---
<!--
<a id="summary-next-steps"></a>
<!--
## Suggested Next Steps
<!--
1. Confirm the open question on `user_campaign_locations_config`'s intended behavior.
2. Decide whether to reconcile `region_dp`/`dp_ter_area_region` into a single canonical view.
3. Consider adding the missing indexes flagged throughout Part II (most tables' `Performance / Index Recommendations` subsections) if those tables are queried at meaningful volume.
4. The AAI (Audio Auditing) subsystem has now been folded in as **Module 14**.
-->
---

<a id="summary-totals"></a>

## Document Totals

- **Business documentation sections:** 17
- **Database modules:** 14
- **Tables documented:** 131
- **Views documented:** 5
- **Standalone reference/workflow notes:** 2
- **Total database entries:** 138
