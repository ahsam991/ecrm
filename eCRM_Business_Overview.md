# BATB eCRM Platform — Business Domain & Operational Guide

*Centralized Business Overview, Field Operations, Campaign Execution & Analytics Workflow*

---

## 📋 Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Business Rationale & Strategic Objectives](#2-business-rationale--strategic-objectives)
3. [Field Operations & Data Collection Workflow](#3-field-operations--data-collection-workflow)
4. [Market Intelligence & Product Analysis](#4-market-intelligence--product-analysis)
5. [User Roles, Hierarchy & Access Control](#5-user-roles-hierarchy--access-control)
6. [Joiner–Mover–Leaver (JML) Lifecycle Management](#6-joiner–mover–leaver-jml-lifecycle-management)
7. [Geographic Location Hierarchy](#7-geographic-location-hierarchy)
8. [Campaign Management & Trade Promotional Rewards (PTR)](#8-campaign-management--trade-promotional-rewards-ptr)
9. [Call Center & Dialer Operational Workflows](#9-call-center--dialer-operational-workflows)
10. [Quality Assurance & Field Supervision](#10-quality-assurance--field-supervision)
11. [Management Reports & Decision Support Systems](#11-management-reports--decision-support-systems)
12. [Enterprise Agency Coverage](#12-enterprise-agency-coverage)
13. [Enterprise Analytics & Data Architecture](#13-enterprise-analytics--data-architecture)

---

## 1. Executive Summary

**Owner:** British American Tobacco Bangladesh (BATB)

The **eCRM Platform** is BATB's centralized enterprise relationship management solution engineered for direct 1-to-1 adult consumer engagement, field force coordination, market trade surveys, campaign tracking, and continuous market analytics.

The system facilitates direct interaction between field Brand Representatives and target consumers (18+ years old) across thousands of retail outlets nationwide while maintaining strict governance, auditability, and role-based operational permissions.

---

## 2. Business Rationale & Strategic Objectives

### Why This Business System Exists
- **Advertising Regulations:** Traditional tobacco advertisements are strictly restricted on public billboards, television, and mass media channels.
- **Direct Engagement Requirement:** To communicate brand value and understand consumer preferences, the business relies on direct, face-to-face engagements conducted by field personnel at retail outlets.
- **Outlet Operations:** Outlets (Points of Sale / POS) represent the primary touchpoint where adult consumers make purchase decisions.

### Key Business Objectives
- **Consumer Preference Discovery:** Capture real-time preferences, brand choices, and feedback from adult smokers.
- **Survey-Driven Marketing:** Deploy interactive, requirement-based marketing questionnaires during field interactions.
- **Competitor Insights:** Perform continuous competitor monitoring and market share validation.
- **Data-Backed Strategy:** Support executive decision-making with historical trend analysis and actionable campaign KPIs.

---

## 3. Field Operations & Data Collection Workflow

```text
[ Campaign Setup ] ──► [ Survey Creation ] ──► [ Outlet Visit by RA ]
                                                        │
[ Executive Dashboard ] ◄── [ QA & Analytics ] ◄── [ Consumer Engagement ]
```

### Operational Steps
1. **Campaign Design:** Management configures active campaigns, target criteria, survey flows, and trade promotional rewards.
2. **Field Execution:** Retail Agents (RAs / Brand Representatives) visit designated retail outlets with mobile field applications.
3. **Adult Verification:** RAs verify that the consumer is **18 years or older** before initiating any engagement.
4. **Interaction & Data Entry:** RAs present structured survey questions, recording consumer details, primary brand preferences, secondary brand preferences, and switching behaviors.
5. **Reward Delivery:** If configured under the active campaign rules, promotional materials or rewards (PTR) are allocated to the consumer upon successful survey completion.

---

## 4. Market Intelligence & Product Analysis

### Brand & Product Categorization
BATB operations track two primary product categories:
- **Franchise:** Proprietary BATB brands.
- **SOB (Share of Bottle / Competitor Brands):** Non-BATB competitor offerings.

### Consumer Brand Preferences
Consumer profiles classify brand loyalty across three distinct dimensions:
- **Primary Brand:** The brand the consumer regularly purchases and consumes.
- **Secondary Brand:** The alternative brand selected when the primary choice is unavailable.
- **Previous Brand:** Historical brand preferences prior to recent switching.

### Market & Competitor Analysis Capabilities
- **Competitor Product Monitoring:** Track competitor pricing, promotional offers, and pack formats.
- **Product Lifecycle Management:** Evaluate new product launches, pilot campaign feedback, and post-launch volume traction.
- **Trade Promotion Efficiency:** Measure the impact of PTR rewards on consumer retention and brand switching.

---

## 5. User Roles, Hierarchy & Access Control

The platform enforces clear operational roles across mobile and web interfaces:

| User Role | Title | Operational Scope & Platform Access |
| :--- | :--- | :--- |
| **DC** | District Coordinator | Web Portal — Regional operational oversight, agency coordination, high-level metrics. |
| **AC** | Area Coordinator | Web Portal — Area-level campaign execution, territory management, supervisor reviews. |
| **SUP** | Supervisor | Mobile App + Web Portal — Direct supervisor to RAs; handles daily route planning, issue escalation, and live joint observations. |
| **RA / BR / FF** | Retail Agent / Brand Representative / Field Force | Mobile App — Operational field force conducting direct consumer engagements and surveys at outlets. |

---

## 6. Joiner–Mover–Leaver (JML) Lifecycle Management

The **JML Workflow** manages all workforce changes in a strictly governed, auditable manner:

```text
  [ JOINER ]               [ MOVER ]               [ LEAVER ]
New Account Creation   Role & Access Updates   Account Deactivation
       │                       │                       │
       └───────────────────────┼───────────────────────┘
                               ▼
                   [ System Approval Flow ]
                               ▼
                   [ Audit Log Recording ]
```

### JML Stages
1. **Joiner:** Account creation, initial role assignment, territory allocation, and device registration for new personnel.
2. **Mover:** Controlled updates to roles, territories, reporting managers, or agency affiliations when staff shift responsibilities.
3. **Leaver:** Secure account suspension and immediate revocation of app access upon employee resignation or contract completion.

---

## 7. Geographic Location Hierarchy

The platform organizes field activities using an 8-tier geographic tree:

```text
Level 1: Region
   └── Level 2: Area
         └── Level 3: Territory
               └── Level 4: House (Distribution House)
                     └── Level 5: Point (Distribution Point)
                           └── Level 6: Route
                                 └── Level 7: Cluster
                                       └── Level 8: Outlet (POS — Point of Sale)
```

- **Outlet (POS):** Terminal operational point where consumer interactions occur.
- **Distribution Point (Point) / Cluster:** Terminal target points for campaign planning and territory allocation.

---

## 8. Campaign Management & Trade Promotional Rewards (PTR)

### PTR (Purchase Through Retail) Concept
- **Definition:** PTR represents rewards, gifts, or trade incentives provided to consumers or retailers during marketing campaigns.
- **Equivalence:** `Gift = PTR = Trade Reward`.
- **Material Management:** Promotional materials and stock items are tracked to ensure accurate inventory control across field distribution routes.

### Campaign Execution Types
- **Standard Engagement Campaigns:** Include consumer demographic capture, brand preference questions, and reward delivery.
- **Surveys-Only Campaigns:** Focus purely on market feedback and consumer sentiment without collecting personal consumer identifiers.

---

## 9. Call Center & Dialer Operational Workflows

For follow-up interactions, repeat engagements, and promotional campaigns, the system incorporates structured call center workflows:

- **Consumer Outbound Dialer:** Contacting registered consumers for follow-up verification, reward notification, or campaign announcements.
- **Retailer Outlet Dialer:** Communicating with outlet owners regarding campaign updates, promotional material delivery, and survey validation.

---

## 10. Quality Assurance & Field Supervision

To guarantee data integrity and field discipline, management utilizes three core supervisory mechanisms:

1. **Joint Calls (Joint Observations):** Supervisors accompany RAs during outlet visits to evaluate communication quality, adherence to protocols, and accurate data entry.
2. **Call Checkback Verification:** Independent call center teams randomly contact consumers to verify that field visits and surveys actually occurred as reported.
3. **Live Observation Audits:** Supervisors conduct remote or random live checks to monitor RA field activity and route compliance.
4. **Automated Audio Auditing (AAI):** Automated audio evaluation of recorded survey conversations to verify voice authenticity, key phrase compliance, and survey completeness.

---

## 11. Management Reports & Decision Support Systems

Management utilizes specialized operational and dynamic reports:

- **Daily Raw Report:** Comprehensive log of daily field interactions, outlet coverage, and survey entries.
- **Call Checkback Report:** Audit trail of quality verification calls and compliance ratings.
- **Live Observation Report:** Supervisor check logs evaluating field force performance.
- **Call Center Report:** Campaign tracking for secondary consumer calls and gift distribution logistics.
- **Dynamic Executive Dashboards:** Customizable report engines allowing managers to select date ranges, region filters, and multi-variable cross-tabulations.

---

## 12. Enterprise Agency Coverage

Field operations are executed through specialized partner agencies covering dedicated geographic territories:

| Agency Code | Operational Geographic Scope |
| :--- | :--- |
| **Madly** | Core Internal Strategy & Direct Management Team |
| **ATMSL** | Sylhet, Dhaka South |
| **IMSL** | Dhaka North, Chittagong |
| **IMS** | Rajshahi, Barishal, Khulna |

---

## 13. Enterprise Analytics & Data Architecture

```text
[ Transactional Data Store ] ──► [ Replicated Data Warehouse (BigQuery) ] ──► [ Executive Dashboards & Looker ]
 (Day-to-day Field Ops)               (High-Performance Analytics)                  (Business Decisions)
```

- **Operational Storage:** Fast transactional systems handle real-time field data capture, mobile app sync, and day-to-day workflow tracking.
- **Analytics Warehouse (BigQuery):** Data is processed into scalable analytical storage for high-speed queries, historical trending, and executive reporting.
- **Separation of Concerns:** Separating field operations from analytical warehousing ensures that heavy reporting queries never impact mobile app responsiveness or field data collection.
