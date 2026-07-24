# ECRM Tutorial & Interactive Documentation Portal

Welcome to the **ECRM (Enterprise Consumer Relationship Management) Documentation Portal**. This repository contains the complete interactive onboarding guide, business overview, schema explorer, and SQL report documentation for the BATB ECRM system.

---

## Table of Contents

1. [Key Features](#-key-features)
2. [Project Structure & Core Files](#-project-structure--core-files)
3. [Architecture & Subsystem Mapping](#-architecture--subsystem-mapping)
4. [Interactive Documentation & Visual Knowledge Graph](#-interactive-documentation--visual-knowledge-graph)
5. [Tech Stack](#-tech-stack)
6. [Implementation Process & Security Features](#-implementation-process--security-features)
7. [Database Schema & Entity Reference](#-database-schema--entity-reference)
8. [SQL Reports & Analytics](#-sql-reports--analytics)
9. [Deployment & Local Sandbox Setup](#-deployment--local-sandbox-setup)
10. [Editing Guide](#-editing-guide)

---

## 🚀 Key Features

- **Interactive Documentation Hub (`index.html`):** Dark-themed glassmorphism interface (`--bg-primary: #070b14`, gold accents `#d4af37`) featuring instant table lookup, dynamic search filters, scroll-spy navigation, and live audit event streams.
- **Visual Knowledge Graph Integration:** D3.js force-directed network viewer and D3 collapsible tree (`GRAPH_TREE.html`) mapping 146 nodes and 195 edges across 14 database modules.
- **Dynamic Schema Explorer:** Interactive navigation across 135+ database tables categorized by prefixes (`aai_`, `campaign_`, `user_`, `jml_`, `dp_`, `aai_`).
- **Interactive SQL Reports & Decryption Interceptor:** Clause-by-clause breakdowns of operational PostgreSQL queries (Daily Contact, Live Observation, Call Checkback, Call Center, OTP Verification) with secure pin decryption and `audit_logs` activity streams.
- **Part-by-Part Business Logic:** Full breakdown of Joiner–Mover–Leaver (JML) processes, franchise/SOB mappings, campaign flow step blocks, and an 8-level geographic location hierarchy.
- **Resilient Fallback & Local Sandbox Mode:** Automatic client-side credential fallback for offline preview without requiring active Vercel/Supabase server backends.

---

## 📁 Project Structure & Core Files

```text
ECRM-tutorial/
├── index.html                          # Interactive documentation portal & glassmorphism web hub
├── README.md                           # Master tutorial documentation & feature reference
├── server.js                           # Express backend API server (Auth, Audit logs, SQL decrypter)
├── vercel.json                         # Vercel deployment configuration
├── package.json                        # Node.js dependencies (Express, pg, dotenv, cors)
├── docs/
│   ├── process.md                      # Part-by-part implementation process map
│   └── DB Credential                   # Database credential guidelines
├── api/
│   ├── login.js                        # Serverless authentication endpoint
│   ├── register.js                     # Serverless user registration endpoint
│   └── realtime.js                     # Live audit log activity feed endpoint
├── DB-Personal/                        # Operational SQL queries & report documentation
│   ├── Call center Report.sql
│   ├── Call checkback Report.sql
│   ├── Task_2.sql
│   ├── Interval.sql
│   └── live_observation_report.sql
└── scripts/
    └── setup_db.js                     # Automated Supabase/PostgreSQL schema initializer
```

---

## 🏗️ Architecture Summary

### ECRM System Architecture

The underlying ECRM system architecture relies on:

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Operational Database** | PostgreSQL (AWS RDS) | Transactional operations, campaign execution, raw survey logging |
| **Analytics Engine** | BigQuery | Scalable dashboards, reporting, high-performance querying |
| **Mobile App** | Android (Java/Kotlin) | Field-force tablets/phones for data collection |
| **Backend API** | Node.js / Express | REST API serving the mobile application |
| **Storage** | AWS S3 (ppol-web-uploads) | Audio, images, video, APK files |
| **Messaging** | SSL Wireless Gateway | OTP and consumer SMS notifications |
| **Reporting** | Looker Studio | Embedded dashboards in management portal |

### Location Hierarchy

The platform uses an 8-level hierarchical tree stored in `ecrm.locations`:

```
Region (type=1)
  └── Area (type=2)
        └── Territory (type=3)
              └── Distribution Point (type=5)
                    └── Route (type=6)
                          └── Cluster (type=7)
                                └── Outlet (type=8)
```

---

## 💻 Tech Stack (Documentation Portal)

This documentation portal is built as a highly optimized, dependency-free static site:

| Technology | Usage |
|------------|-------|
| **HTML5 & CSS3** | Semantic markup, CSS variables, Grid/Flexbox layouts, custom Dark/Light theme |
| **Vanilla JavaScript** | Zero framework dependencies, `IntersectionObserver` for navigation, localized state management |
| **Prism.js** | Syntax highlighting for SQL code blocks |
| **Google Fonts** | Space Grotesk, Outfit, JetBrains Mono for premium typography |
| **SVG** | Interactive ER diagram with zoom/pan functionality |

### Design Tokens

```css
:root {
  --bg: #080b12;           /* Dark background */
  --primary: #3b82f6;      /* Primary blue */
  --accent: #06b6d4;       /* Cyan accent */
  --accent2: #a78bfa;      /* Purple accent */
  --green: #10b981;        /* Success green */
  --orange: #f59e0b;       /* Warning orange */
  --red: #ef4444;          /* Error red */
}
```

---

## 🔒 Implementation Process & Security Features (from `process.md`)

The tutorial documentation portal integrates custom backend resiliency, security logging, and local preview handlers:

### Part 1: Supabase Database & Connection Resiliency
- **Scope:** Serverless connection pooling with SSL encryption (`api/login.js`, `api/register.js`, `scripts/setup_db.js`).
- **Key Details:**
  - 🔒 **SSL Enforcement:** Configured with `ssl: { rejectUnauthorized: false }` to prevent Vercel serverless connection drops.
  - 🔄 **Smart Connection Fallbacks:** Auto-detects `process.env.DATABASE_URL` on Vercel and gracefully falls back to Supabase/PostgreSQL settings during local development.
  - ⚙️ **CommonJS Compatibility:** Strict `module.exports` structure ensuring compatibility with Vercel function runtimes.

### Part 2: Glassmorphism Login Modal & Credential Guidance
- **Scope:** Responsive landing gate in `index.html` with static typography and security emblems.
- **Key Details:**
  - 🌌 **Quiet Space Visual Frame:** Static radial dark background providing a calm visual context.
  - 🛡️ **Static Security Emblem:** Visual lock/key state indicator.
  - 💎 **Glassmorphism Container:** Backdrop blur frame with linear gradient highlights (`#3b82f6` to `#10b981`).
  - 🎯 **Credential Hints:** Embedded guidance panel for default admin, supervisor, and user accounts.
  - 🔏 **Jitter-Free Input Form:** Static layout deactivating all scaling and 3D hover jitter for comfortable typing.

### Part 3: Real-Time Audit Log Activity Stream
- **Scope:** Real-time database event feed monitoring interactions on the portal (`api/realtime.js`, `server.js`).
- **Key Details:**
  - 🟢 **Connection Pulse:** Live status pulse indicator.
  - 📊 **Dynamic Audit Feed:** Polls `audit_logs` every 4 seconds to list logins, logouts, registrations, and SQL decryption attempts.

### Part 4: Decryption Event Logger Integration
- **Scope:** Linking security decryption events directly to PostgreSQL `audit_logs`.
- **Key Details:**
  - 📑 **Action Tracking:** Inserts records into `audit_logs` whenever a user enters a PIN to inspect decrypted SQL report source codes.
  - 🔴 **Security Alerting:** Flags invalid decryption PIN entries as `DECRYPT_FAIL` events.

### Part 5: Resilient Offline Local Sandbox
- **Scope:** Automatic fallback for local static preview without active backend API connections.
- **Key Details:**
  - 💡 **Unreachable API Routing:** If opened as a local static file without Node/Express server running, network errors trigger client-side credential verification (`admin` / `management` / `ahsam`).
  - ⚠️ **Sandbox Notification Banner:** Displays a distinct status banner confirming local offline sandbox preview mode.

---

## 📄 File-by-File Breakdown

### 1. `index.html` (3981 lines)

**Purpose:** Main interactive documentation portal

**Key Sections:**
- **Navigation Bar:** Top nav with search, theme toggle, preview button
- **Sidebar:** Fixed left navigation with scroll-spy active states
- **Hero Section:** 3D grid layout with quick-access cards
- **Section 01 - Business Explain:** Core business logic, user hierarchy, flow diagrams
- **Section 02 - Campaign Flow Components:** Operational building blocks (audio_start, dropdown, multipleChoice)
- **Section 03 - SQL Reports:** Interactive report cards with modal SQL viewers
- **Section 04 - Tasks & Questions:** Authenticated task board for Campaign 161
- **Section 05 - ER Diagram:** Interactive SVG viewer with zoom controls
- **Section 06 - Schema Viewer:** Embedded iframe from `ecrm_schema.html`
- **Section 07 - DB Explorer:** Searchable table dictionary with 135+ tables
- **Section 08 - Tutorial:** Google Drive embedded folder browser
- **Footer:** Team credits and bottom navigation

**JavaScript Constants:**
- `const TASKS = [...]` - Task board data (line 2572)
- `const TABLES_META = [...]` - All 135 database tables with columns (line 2581)
- `const SQL_DATA = {...}` - SQL report queries (line 2584)

### 2. `process.md`

**Purpose:** Comprehensive editing guide for `index.html`

**Contents:**
- Navigation & Global Header editing instructions
- Business Explain section editing guide
- Campaign Flow Components documentation
- SQL Reports modal editing instructions
- Tasks & Questions task board configuration
- ER Diagram image replacement guide
- Schema Viewer iframe embedding
- DB Explorer table/category management
- Tutorial Drive link updates
- Footer & Credits modification

### 3. `create_doc.js`

**Purpose:** Node.js script to generate professional Word (.docx) documentation

**Features:**
- Uses `docx` library for document generation
- Custom styling with brand colors (BRAND_BLUE: #1B4F8C)
- Generates tables, headers, bullet points, info boxes
- Includes cover page, table of contents, page breaks
- Professional headers/footers with page numbers

**Usage:**
```bash
npm install docx
node create_doc.js
```

### 4. `ecrm_schema.html`

**Purpose:** Interactive relationship graph visualization

**Integration:** Embedded via iframe in Section 06 of `index.html`

### 5. `ecrm_prod_ecrm.svg`

**Purpose:** Static ER diagram image

**Integration:** Used in Section 05 with custom zoom/pan viewer

### 6. `questions.sql`

**Purpose:** SQL practice tasks for Campaign 161

**Tasks Include:**
1. Find Count of Consumer
2. RA Wise Contact Duration and Interval
3. Find Total Campaign Duration
4. Date Wise PTR Achievement
5. Outlet Wise PTR Count

### 7. `vercel.json`

**Purpose:** Vercel deployment configuration

### 8. `DB-Personal/README.md`

**Purpose:** Database-specific documentation for report queries

---

## 📊 Sections Overview

### Section 01: Business Explain

**Location:** `<section id="business-explain">`

**Content:**
- Core business operational logic
- User hierarchy (Region → Area → Territory)
- Data privacy and infrastructure cards
- Flow diagram with business logic nodes
- Hierarchy table with location types

### Section 02: Campaign Flow Components

**Location:** `<section id="campaign-flow-components">`

**Content:**
- `audio_start`: Audio recording trigger component
- `dropdown`: Single-select question component
- `multipleChoice`: Multi-select question component

### Section 03: SQL Reports

**Location:** `<section id="sql-reports">`

**Reports Included:**
1. **Daily Contact Survey Report** - `ecrm.contacts` + `contact_survey_data_maps`
2. **Live Observation Report** - `ecrm.joint_calls` + survey maps
3. **Call Checkback Report** - `ecrm.supervisor_contacts` with 4-key composite match
4. **Call Center Report** - `consumer_dialer_list` workflow
5. **OTP Verification Analysis** - `ecrm.otp_verifications` with SSL/Robi parsing

### Section 04: Tasks & Questions

**Location:** `<section id="tasks">`

**Features:**
- Email/password/key authentication
- Task filtering by status, priority, assignee
- Search functionality
- Download button for `questions.sql`

### Section 05: ER Diagram

**Location:** `<section id="er-diagram">`

**Features:**
- Zoom controls (30% - 200%)
- Pan functionality (drag to move)
- Reset view button

### Section 06: Schema Viewer

**Location:** `<section id="schema-viewer">`

**Integration:** `<iframe src="ecrm_schema.html"></iframe>`

### Section 07: DB Explorer

**Location:** `<section id="db-explorer">`

**Features:**
- Search tables by name or prefix
- Category pills (color-coded by table prefix)
- Collapsible table groups
- Inspector panel showing columns and row counts
- 135+ tables from ecrm schema

### Section 08: Tutorial

**Location:** `<section id="tutorial">`

**Features:**
- Google Drive folder embed
- Custom URL input for different folders

---

## 🗃️ Database Schema

### Core Tables

| Table | Purpose |
|-------|---------|
| `users` | Login credentials, user_type, MFA config, UID |
| `user_infos` | Full name, designation, contact numbers, avatar |
| `roles` | Role definitions with label, is_supervisor, is_ff flags |
| `locations` | Self-referencing hierarchy (8 levels) |
| `campaigns` | Campaign configuration and targets |
| `contacts` | Primary consumer contact records |
| `contact_survey_data_maps` | Row-wise survey responses (pivoted in reports) |
| `joint_calls` | Supervisor-BR joint visit records |
| `supervisor_contacts` | Call checkback verification records |
| `consumer_dialer_list` | Call center dialer workflow |
| `otp_verifications` | OTP gateway responses (SSL/Robi) |

### Survey Table Mapping

| Report | Survey Table |
|--------|--------------|
| Daily Contact | `contact_survey_data_maps` |
| Joint Call | `joint_calls_survey_data_maps` |
| Checkback | `supervisor_contact_survey_data_maps` |
| Call Center | `consumer_dialer_survey_maps` |

---

## 📝 SQL Reports

### 1. Daily Contact Survey Report

**Pivot Pattern:**
```sql
MAX(CASE WHEN cs.question = 'question_key' THEN cs.answer END) AS question_value
```

### 2. Live Observation Report

**User Mapping:**
- Supervisor: `jc.user_id`
- BR/FF: `jc.ff_id`

### 3. Call Checkback Report

**Four-Key Composite Match:**
```sql
LEFT JOIN ecrm.contacts c
       ON sc.contact = c.contact_no
      AND sc.br_id = c.user_id
      AND sc.campaign_id = c.campaign_id
      AND sc.contact_date = c.contact_date
```

### 4. Call Center Report

**Join Flow:**
```
consumer_dialer_list → consumer_dialer_br_assignments → consumer_dialer_contacts → consumer_dialer_survey_maps
```

### 5. OTP Verification Analysis

**Platform Detection:**
- SSL: `gateway_response ILIKE '%SUCCESSFULL%'`
- Robi: `gateway_response ILIKE '%<StatusText>success</StatusText>%'`

---

## 🌐 Deployment

### Deploy via Vercel

1. Log into your [Vercel Dashboard](https://vercel.com)
2. Click **Add New Project**
3. Import this GitHub repository
4. Keep the Framework Preset as **Other** (default)
5. Click **Deploy**

### Local Development

Open `index.html` directly in any modern web browser. No build step required.

```bash
npx http-server -p 8080
```

---

## ✏️ Editing Guide

### Quick Reference

| To Edit | Search For | Location |
|---------|------------|----------|
| Navigation links | `<nav>` or `.nav-links` | Lines ~78-93 |
| Hero cards | `.hero-card` | Lines ~108-114 |
| Business cards | `.biz-card` | Section `business-explain` |
| SQL queries | `const SQL_DATA =` | Line 2584 |
| Task list | `const TASKS =` | Line 2572 |
| Database tables | `const TABLES_META =` | Line 2581 |
| Theme colors | `:root {` | Lines 12-31 |
| Footer content | `<footer>` | End of file |

### Adding a New SQL Report

1. Add report card HTML in `<section id="sql-reports">`
2. Add SQL data to `const SQL_DATA` object

### Adding a New Database Table

Edit `const TABLES_META` array:
```javascript
{ name: "new_table_name", rows: 1000, cols: ["id", "column1", "created_at"] }
```

### Changing Theme Colors

Modify CSS variables in `:root`:
```css
:root { --primary: #YOUR_COLOR; --accent: #YOUR_COLOR; }
```

---

## 👥 Team & Credits

**Developed by:** MD AHSAMUL HAQUE  
**Organization:** V2 Technology Ltd.  
**Platform:** eCRM (ecrm-imsl)  
**Client:** BAT Bangladesh  

---

## 📚 Additional Resources

- [Process Documentation](./process.md) - Detailed editing guide
- [DB-Personal README](./DB-Personal/README.md) - Database query documentation

---

## 🔐 Security Notes

- Task board requires authentication (email + password + encryption key)
- SQL modal has separate security key protection
- Only SELECT queries should be run on AWS RDS Read Replica

---

**Version:** 1.0  
**Last Updated:** May 2026  
**License:** Confidential - Internal Use Only
