# BATB eCRM Platform — Complete Project Repository

Welcome to the **eCRM Platform** repository. This project contains the complete business domain model, architectural layout, database schemas, interactive web documentation, and Graphify Knowledge Graph mappings for the **British American Tobacco Bangladesh (BATB) eCRM Platform**.

---

## 📌 Project Overview

The **eCRM Platform** is an enterprise-grade consumer relationship management and field force management system built for direct 1-to-1 adult consumer engagement, field surveys, trade marketing, quality supervision, and automated audio auditing.

### Key Highlights
- **Business Domain & Operations Guide**: [`eCRM_Business_Overview.md`](file:///Users/ahsam/Downloads/TEST_PROJECT%20copy/eCRM_Business_Overview.md) / [`eCRM_Business_Overview.html`](file:///Users/ahsam/Downloads/TEST_PROJECT%20copy/eCRM_Business_Overview.html) *(Pure business logic & field workflows with database/schema details hidden)*.
- **146 Database Models & Entities** divided into **14 Modular Subsystems**.
- **Full Domain Documentation** (`eCRM_Complete_Documentation.md` & `eCRM_Complete_Documentation.html`).
- **Graphify Knowledge Graph & D3 Visualizations** (`graphify-out/`).

---

## 📁 Repository Structure

```text
TEST_PROJECT/
├── README.md                           # Master Project Overview & Structure Guide
├── eCRM_Business_Overview.md           # Business-Only Guide (No Database/Schema Info)
├── eCRM_Business_Overview.html         # Formatted Business-Only Web Guide
├── index.html                          # Interactive Web Documentation Hub & Portal
├── eCRM_Complete_Documentation.md      # Full Markdown Documentation & Database Reference
├── eCRM_Complete_Documentation.html    # HTML Standalone Rendered Master Documentation
└── graphify-out/                       # Graphify Knowledge Graph & Architectural Visualizations
    ├── graph.json                      # Full Knowledge Graph AST & Semantic Data (146 nodes, 195 edges)
    ├── GRAPH_REPORT.md                 # Community Cohesion & Hub Architecture Analysis
    ├── GRAPH_TREE.html                 # D3.js Interactive Collapsible Hierarchy Tree
    ├── graph.html                      # Interactive Force-Directed Network Graph Visualizer
    ├── .graphify_analysis.json         # Graph metrics and module grouping metadata
    └── .graphify_labels.json           # Community tags & cluster labels
```

---

## 🗺️ Module Architecture & Subsystems

The eCRM database architecture consists of **14 core modules**:

| Module | Subsystem Name | Primary Function | Key Entities & Tables |
| :--- | :--- | :--- | :--- |
| **M1** | **Users & Identity** | Authentication, app versions, OTP verification, audit logs | `users`, `app_versions`, `audit_logs`, `device_registers`, `porichoy_infos` |
| **M2** | **Roles & RBAC** | Role-based access control, agency mapping, reporting tree | `roles`, `agencies`, `role_agency_maps`, `role_location_maps`, `role_tree_maps` |
| **M3** | **JML Workflow** | Joiner-Mover-Leaver automated user transfers | `jml_tickets`, `user_ticket_maps`, `ticket_status_maps` |
| **M4** | **Location Hierarchy** | Geographic region, territory, area, and outlet mapping | `dp_region`, `dp_ter_area_region`, `all_locations_region_to_outlet` |
| **M5** | **Campaigns** | Campaign setup, targets, theme maps, field force allocation | `campaigns`, `campaign_targets`, `campaign_location_maps`, `campaign_loc_ff_allocations` |
| **M6** | **Products & SKU** | Product catalog, materials, and brand hierarchies | `products`, `skus`, `materials`, `daily_material_maps` |
| **M7** | **Field Contacts** | Consumer data collection, retailer outlets, contact surveys | `contacts`, `consumers`, `outlets`, `contact_survey_data_maps`, `iris_analyses` |
| **M8** | **QA & Supervision** | Quality checks, joint calls, live GPS locations, supervision | `joint_calls`, `daily_checks`, `live_locations`, `campaign_joint_call_maps` |
| **M9** | **Dialer Workflows** | Call center outbound dialer assignments & survey maps | `consumer_dialer_list`, `retailer_outlet_dialer_list`, `consumer_dialer_br_assignments` |
| **M10** | **Rewards & Coupons** | Gift distribution, coupon codes, and asset tracking | `rewards`, `coupon_codes`, `gift_distribution` |
| **M11** | **Reporting** | Dynamic query builders, report parameters, chart configs | `dynamic_reports`, `dashboards`, `custom_queries`, `dynamic_report_chart_maps` |
| **M12** | **Communications** | Push notifications, direct chats, WhatsApp lookups, audio | `notifications`, `chats`, `audios`, `whatsapp_lookups` |
| **M13** | **Leave Management** | Field force attendance and leave mapping | `leaves`, `leave_date_maps`, `leave_types` |
| **M14** | **AAI Audio Auditing** | Automated speech & audio auditing system for field surveys | `aai_audios`, `aai_projects`, `aai_levels`, `aai_auditor_project_maps` |

---

## 🕸️ Knowledge Graph (Graphify Integration)

This project has been fully processed using **Graphify**.

- **Graph Report**: Read [graphify-out/GRAPH_REPORT.md](file:///Users/ahsam/Downloads/TEST_PROJECT%20copy/graphify-out/GRAPH_REPORT.md) for architectural hub analysis.
- **Tree Visualization**: Open [graphify-out/GRAPH_TREE.html](file:///Users/ahsam/Downloads/TEST_PROJECT%20copy/graphify-out/GRAPH_TREE.html) in any browser to explore the interactive visual hierarchy.
- **Force-Directed Graph**: Open [graphify-out/graph.html](file:///Users/ahsam/Downloads/TEST_PROJECT%20copy/graphify-out/graph.html) to interact with node clusters and cross-module dependencies.

---

## 🚀 Getting Started & Viewing Documentation

1. **Web Hub Portal**: Open [`index.html`](file:///Users/ahsam/Downloads/TEST_PROJECT%20copy/index.html) in your browser for the full interactive portal.
2. **Master Documentation**: Open [`eCRM_Complete_Documentation.html`](file:///Users/ahsam/Downloads/TEST_PROJECT%20copy/eCRM_Complete_Documentation.html) for formatted business logic and schema details.
3. **Graphify Commands**:
   ```bash
   # Re-cluster or re-extract graph data if code changes:
   graphify extract ./ --code-only
   graphify tree ./
   ```

---

## 🔒 Security & Compliance
- **Age Restriction**: All consumer interaction and survey logic strictly applies to adult smokers (18+ years).
- **RBAC Enforcement**: Strict geographic and agency-based role boundaries are defined in Module 2 (`role_location_maps` and `role_agency_maps`).
