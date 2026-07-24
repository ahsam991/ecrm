const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, PageBreak, LevelFormat, Header, Footer,
  TabStopType, TabStopPosition
} = require('docx');
const fs = require('fs');

const BRAND_BLUE = "1B4F8C";
const BRAND_LIGHT = "D6E4F7";
const ACCENT = "2E75B6";
const HEADER_BG = "1B4F8C";
const ROW_ALT = "F0F6FF";
const WHITE = "FFFFFF";
const DARK_TEXT = "1A1A2E";

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const thickBorder = { style: BorderStyle.SINGLE, size: 4, color: BRAND_BLUE };
const thickBorders = { top: thickBorder, bottom: thickBorder, left: thickBorder, right: thickBorder };

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 6 } },
    children: [new TextRun({ text, font: "Arial", size: 32, bold: true, color: BRAND_BLUE })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 100 },
    children: [new TextRun({ text, font: "Arial", size: 26, bold: true, color: ACCENT })]
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text, font: "Arial", size: 22, bold: true, color: DARK_TEXT })]
  });
}

function para(text, options = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, font: "Arial", size: 22, color: DARK_TEXT, ...options })]
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, font: "Arial", size: 22, color: DARK_TEXT })]
  });
}

function note(text) {
  return new Paragraph({
    spacing: { before: 100, after: 100 },
    indent: { left: 360 },
    border: { left: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 10 } },
    children: [new TextRun({ text, font: "Arial", size: 20, color: "555555", italics: true })]
  });
}

function spacer() {
  return new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun("")] });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function makeHeaderRow(cells, colWidths) {
  return new TableRow({
    tableHeader: true,
    children: cells.map((text, i) => new TableCell({
      borders: thickBorders,
      width: { size: colWidths[i], type: WidthType.DXA },
      shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 150, right: 150 },
      verticalAlign: VerticalAlign.CENTER,
      children: [new Paragraph({
        children: [new TextRun({ text, font: "Arial", size: 20, bold: true, color: WHITE })],
        alignment: AlignmentType.CENTER
      })]
    }))
  });
}

function makeRow(cells, colWidths, isAlt = false) {
  return new TableRow({
    children: cells.map((text, i) => new TableCell({
      borders,
      width: { size: colWidths[i], type: WidthType.DXA },
      shading: { fill: isAlt ? ROW_ALT : WHITE, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 150, right: 150 },
      children: [new Paragraph({
        children: [new TextRun({ text: text || "", font: "Arial", size: 20, color: DARK_TEXT })]
      })]
    }))
  });
}

function infoBox(title, lines) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [
      new TableRow({ children: [new TableCell({
        borders: thickBorders,
        width: { size: 9360, type: WidthType.DXA },
        shading: { fill: BRAND_LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 200, right: 200 },
        children: [
          new Paragraph({ children: [new TextRun({ text: title, font: "Arial", size: 22, bold: true, color: BRAND_BLUE })] }),
          ...lines.map(l => new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: l, font: "Arial", size: 20, color: DARK_TEXT })] }))
        ]
      })] })
    ]
  });
}

// ============================================================
// DOCUMENT CONTENT
// ============================================================

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "numbered",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      }
    ]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: BRAND_BLUE },
        paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: ACCENT },
        paragraph: { spacing: { before: 280, after: 100 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Arial", color: DARK_TEXT },
        paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 2 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1260, bottom: 1440, left: 1260 }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: ACCENT, space: 4 } },
            tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
            children: [
              new TextRun({ text: "eCRM Platform — Technical Onboarding Guide", font: "Arial", size: 18, color: ACCENT, bold: true }),
              new TextRun({ text: "\t", font: "Arial", size: 18 }),
              new TextRun({ text: "CONFIDENTIAL", font: "Arial", size: 18, color: "AA0000", bold: true }),
            ]
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: ACCENT, space: 4 } },
            tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
            children: [
              new TextRun({ text: "V2 Technology Ltd. | eCRM Platform", font: "Arial", size: 18, color: "888888" }),
              new TextRun({ text: "\t", font: "Arial", size: 18 }),
              new TextRun({ text: "Page ", font: "Arial", size: 18, color: "888888" }),
              new PageNumber(),
            ]
          })
        ]
      })
    },
    children: [

      // ===================== COVER PAGE =====================
      spacer(), spacer(), spacer(),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 60 },
        children: [new TextRun({ text: "eCRM PLATFORM", font: "Arial", size: 56, bold: true, color: BRAND_BLUE })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 120 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 8 } },
        children: [new TextRun({ text: "Technical Onboarding & Developer Reference Guide", font: "Arial", size: 30, color: ACCENT })]
      }),
      spacer(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [9360],
        rows: [new TableRow({ children: [new TableCell({
          borders: thickBorders,
          shading: { fill: BRAND_LIGHT, type: ShadingType.CLEAR },
          margins: { top: 200, bottom: 200, left: 300, right: 300 },
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "For Internal Use Only", font: "Arial", size: 22, bold: true, color: BRAND_BLUE })] }),
            spacer(),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Document Version: 1.0", font: "Arial", size: 20, color: "555555" })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Organization: V2 Technology Ltd.", font: "Arial", size: 20, color: "555555" })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Platform: eCRM (ecrm-imsl)", font: "Arial", size: 20, color: "555555" })] }),
          ]
        })] })]
      }),
      spacer(), spacer(), spacer(), spacer(),
      pageBreak(),

      // ===================== SECTION 1: INTRODUCTION =====================
      h1("1. Platform Overview"),
      para("The eCRM platform is a field-force management and consumer engagement system built for tobacco marketing campaigns in Bangladesh. It enables Brand Representatives (BRs), Supervisors, Agencies, and Management to coordinate field activities, collect consumer data, run campaigns, manage materials, and conduct quality audits — all through a mobile-first Android application backed by a centralized database."),
      spacer(),
      para("This document is the definitive technical reference for new team members. It covers database schema, entity relationships, workflow logic, user roles, campaign mechanics, audit systems, and operational processes."),
      spacer(),

      h2("1.1 Core Business Purpose"),
      bullet("Execute direct-to-consumer tobacco brand marketing campaigns at point-of-sale locations."),
      bullet("Collect verified consumer contacts with digital consent (OTP + signature)."),
      bullet("Track field-force (FF) activities, attendance, and performance in real time."),
      bullet("Provide supervisors with joint-call verification and audit capabilities."),
      bullet("Enable AI-assisted audio quality assurance of field interactions."),
      bullet("Deliver campaign analytics through Looker Studio dashboards."),
      spacer(),

      h2("1.2 Technology Stack"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          makeHeaderRow(["Component", "Description"], [2800, 6560]),
          makeRow(["Mobile App", "Android (Java/Kotlin), version-controlled via app_versions table. Field-force uses tablets/phones."], [2800, 6560]),
          makeRow(["Backend API", "Node.js / Express REST API, schema: ecrm"], [2800, 6560], true),
          makeRow(["Database", "PostgreSQL — relational, with JSONB columns for flexible survey data"], [2800, 6560]),
          makeRow(["Storage", "AWS S3 (bucket: ppol-web-uploads) for audio, images, video, APKs"], [2800, 6560], true),
          makeRow(["Reporting", "Looker Studio dashboards embedded in the management portal"], [2800, 6560]),
          makeRow(["Messaging", "SSL Wireless gateway for OTP and consumer SMS notifications"], [2800, 6560], true),
          makeRow(["Location", "GPS-based geo-fencing and proximity validation"], [2800, 6560]),
        ]
      }),
      spacer(),
      pageBreak(),

      // ===================== SECTION 2: USER ROLES =====================
      h1("2. User Roles & Access Hierarchy"),
      para("The platform uses a multi-level role system defined in the roles table. Each user is assigned exactly one role, which determines their access to resources, locations, and features. Roles are linked to agencies (role_agency_maps), report-to chains (role_report_to_maps), and location scopes (role_location_maps)."),
      spacer(),

      h2("2.1 Role Hierarchy"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2200, 1800, 5360],
        rows: [
          makeHeaderRow(["Role Level", "user_type", "Responsibilities"], [2200, 1800, 5360]),
          makeRow(["Super Admin / Admin", "admin", "Full platform access. Manages agencies, roles, campaigns, dashboards. Creates JML tickets."], [2200, 1800, 5360]),
          makeRow(["Campaign Manager", "ff (mgmt)", "Designs campaigns, sets targets, assigns locations. BAT client-side managers."], [2200, 1800, 5360], true),
          makeRow(["Agency Manager / KAM", "ff (agency)", "Manages field-force teams within an agency. Reviews reports."], [2200, 1800, 5360]),
          makeRow(["Supervisor (SUP)", "ff", "Oversees BRs. Conducts joint calls, daily checks, call-checkbacks."], [2200, 1800, 5360], true),
          makeRow(["Brand Representative (BR)", "ff", "Primary field agent. Conducts consumer contacts, collects data, plays AVs."], [2200, 1800, 5360]),
          makeRow(["Auditor (AAI)", "ff (is_auditor=true)", "Reviews audio recordings for quality scoring. Assigned to AAI projects."], [2200, 1800, 5360], true),
          makeRow(["Third Party", "thirdparty", "External integrations (e.g., Softograph). API-only access."], [2200, 1800, 5360]),
        ]
      }),
      spacer(),

      h2("2.2 Key User Tables"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 6960],
        rows: [
          makeHeaderRow(["Table", "Purpose"], [2400, 6960]),
          makeRow(["users", "Login credentials, user_type, active/locked status, MFA config, UID"], [2400, 6960]),
          makeRow(["user_infos", "Full name, designation, contact numbers, blood group, avatar photo"], [2400, 6960], true),
          makeRow(["user_details", "NID verification, emergency contacts, address"], [2400, 6960]),
          makeRow(["user_approval_maps", "Onboarding approval status (approved_status codes map to lookup values)"], [2400, 6960], true),
          makeRow(["user_agency_maps", "Which agency each user belongs to (many-to-one)"], [2400, 6960]),
          makeRow(["user_device_maps", "Registered device IDs for the mobile app"], [2400, 6960], true),
          makeRow(["role_location_maps", "User's assigned location scope (array of location IDs)"], [2400, 6960]),
          makeRow(["jml_tickets", "Join/Modify/Leave tickets for user onboarding, role changes, exits"], [2400, 6960], true),
        ]
      }),
      spacer(),
      note("Important: Users are created via JML tickets (jml_tickets), which include the assigned_role, hierarchy_offset, and location array. An execute_date controls when the ticket is actioned."),
      spacer(),
      pageBreak(),

      // ===================== SECTION 3: LOCATION HIERARCHY =====================
      h1("3. Location Hierarchy"),
      para("All field activities are tied to a precise geographic location. The platform uses a 8-level hierarchical tree stored in the locations table, with each record having a parent reference and a type integer identifying the level."),
      spacer(),

      h2("3.1 Location Type Mapping"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1200, 2400, 5760],
        rows: [
          makeHeaderRow(["type", "Level Name", "Example"], [1200, 2400, 5760]),
          makeRow(["1", "Region", "Dhaka South, Chittagong, Khulna, Rajshahi"], [1200, 2400, 5760]),
          makeRow(["2", "Area", "Dhaka Central, CTG South"], [1200, 2400, 5760], true),
          makeRow(["3", "Territory", "Gulshan, Tangail, Cox's Bazar-2"], [1200, 2400, 5760]),
          makeRow(["4", "Distribution House (House)", "Agrani Trading Corporation, Sumon Trading"], [1200, 2400, 5760], true),
          makeRow(["5", "Point / Distributor Point (DP)", "Gulshan, Savar, Matuail"], [1200, 2400, 5760]),
          makeRow(["6", "Route / Section", "1D, 2A, 101B"], [1200, 2400, 5760], true),
          makeRow(["7", "Cluster", "DCC Market Mashjid Goli, Talbag"], [1200, 2400, 5760]),
          makeRow(["8", "Outlet (Retail Store)", "Zia Store, Bosir Store, Joba Store"], [1200, 2400, 5760], true),
        ]
      }),
      spacer(),
      note("The contacts table joins on location_id which references an outlet (type=8). Traversing parent references up the tree gives Region > Area > Territory > House > Point > Route > Cluster > Outlet."),
      spacer(),

      h2("3.2 Related Location Tables"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          makeHeaderRow(["Table", "Description"], [2800, 6560]),
          makeRow(["locations", "Master hierarchy tree (all 8 levels). has parent, type, active, source_id."], [2800, 6560]),
          makeRow(["outlets / outlets_u", "Enriched outlet data: retailer_code, GPS coords, channel, cluster_name, tpg, owner"], [2800, 6560], true),
          makeRow(["geo_location", "GPS point (SRID=3857 WGS84) per location for geofencing"], [2800, 6560]),
          makeRow(["_clusters / dp_route_clusters", "DP-Route-Cluster mappings for breakstation and routing"], [2800, 6560], true),
          makeRow(["dp_region / region_dp", "DP to Region/Area/Territory lookup for reporting"], [2800, 6560]),
          makeRow(["all_locations_region_to_outlet", "Flat denormalized view: full path from region to outlet"], [2800, 6560], true),
          makeRow(["campaign_location_maps", "Which locations are active in a given campaign"], [2800, 6560]),
          makeRow(["campaign_target_loc_maps", "Which locations are assigned to a campaign target"], [2800, 6560], true),
        ]
      }),
      spacer(),
      pageBreak(),

      // ===================== SECTION 4: CAMPAIGNS =====================
      h1("4. Campaign Architecture"),
      para("Campaigns are the central operational unit of the eCRM platform. They define what data to collect, from whom, where, and under what rules. Each campaign has a complex survey_flow (a JSON array of question groups), geo-fence constraints, segment routing, target structures, and material assignments."),
      spacer(),

      h2("4.1 Campaign Core Fields (campaigns table)"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 6960],
        rows: [
          makeHeaderRow(["Field", "Purpose"], [2400, 6960]),
          makeRow(["id / name", "Unique identifier and display name (e.g., 'Derby Mega LEP', 'Low Drive Equity Plan 25')"], [2400, 6960]),
          makeRow(["survey_flow", "JSON array defining all question groups, block types, routing logic, and media assets"], [2400, 6960], true),
          makeRow(["conditions", "JSON blob: geo-fence config, repeat_contact rules, segment routing, audit_ai_config, validation_rule (JS code)"], [2400, 6960]),
          makeRow(["products / secondary_brands", "PostgreSQL integer arrays of allowed product IDs for primary and secondary brand collection"], [2400, 6960], true),
          makeRow(["from_date / to_date", "Campaign active date range"], [2400, 6960]),
          makeRow(["terminal_point", "Survey flow group ID that ends the session"], [2400, 6960], true),
          makeRow(["contact_terminal_point", "Group ID where contact record is finalized"], [2400, 6960]),
          makeRow(["type", "Campaign type code (e.g., 141 = standard LEP, links to lookup)"], [2400, 6960], true),
          makeRow(["videos / images / audios", "JSON sets of media assets (with md5 checksums) pushed to devices"], [2400, 6960]),
          makeRow(["version", "Increments on every save; mobile app uses this to detect updates"], [2400, 6960], true),
          makeRow(["parent", "Links child campaigns to parent (for campaign cloning/inheritance)"], [2400, 6960]),
        ]
      }),
      spacer(),

      h2("4.2 Survey Flow Structure"),
      para("The survey_flow field is a JSON array of group objects. Each group has a type (referring, numbervalidation, etc.) and an array of blocks. Blocks define individual questions with routing via referTo pointers."),
      spacer(),
      infoBox("Survey Flow Block Types", [
        "audio_start / audio_end  —  Marks where call recording begins and ends",
        "numbervalidation  —  First group: collects contact_no, dob, product, secondary_brand",
        "textInput  —  Free text entry (name, fathers_name, address)",
        "contactNo  —  Phone number with regex validation and country prefix",
        "date  —  Date picker with min/max age validation",
        "product  —  Brand selector dropdown from campaign.products array",
        "terms  —  Terms & Conditions with digital signature capture",
        "otp  —  SMS OTP verification (bypass flag available for testing)",
        "video  —  Plays an MP4 asset (lifestyle AV or product AV); iris_track optional",
        "multipleChoice  —  Single-select options, each with referTo routing",
        "camera  —  Photo capture (consumer picture, selfie with FF)",
        "giveable  —  PTR (Price To Retailer) offer selection",
        "dropdown  —  Occupation / category selector",
      ]),
      spacer(),

      h2("4.3 Campaign Conditions Object"),
      infoBox("Key Fields in conditions JSON", [
        "geo-fence: { lat, long, radius, forced, status }  —  If status=true, contact must be within radius meters",
        "segments: [ { status, referTo } ]  —  Routes survey to different flow groups based on product status code",
        "repeat_contact: { status, repeat_count, achievement }  —  Whether a consumer can be re-contacted",
        "audit_ai_config: { enable: true/false }  —  Enables AAI audio review for this campaign",
        "cluster_mapping: { max_slot, multiFFassignment }  —  Controls how many BRs can work same cluster simultaneously",
        "validation_rule  —  JavaScript code (string) evaluated server-side to determine consumer eligibility",
        "brand_wise_target: true/false  —  Whether targets are tracked per brand or overall",
        "campaign_total_target: { status, target }  —  Optional hard cap on total contacts",
      ]),
      spacer(),
      pageBreak(),

      // ===================== SECTION 5: CONTACTS =====================
      h1("5. Consumer Contact Flow"),
      para("A contact represents one successful consumer interaction by a BR at an outlet. This is the core transactional record of the platform. Creating a valid contact involves multiple validation steps, OTP verification, digital consent, and media playback."),
      spacer(),

      h2("5.1 Contact Lifecycle"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [800, 2600, 5960],
        rows: [
          makeHeaderRow(["Step", "Action", "System Behavior"], [800, 2600, 5960]),
          makeRow(["1", "BR opens app at outlet", "App checks geo-fence. If forced=true and out of radius, contact blocked."], [800, 2600, 5960]),
          makeRow(["2", "BR enters contact_no + dob + product", "Server runs validation_rule JS. Checks consumer existence and prior contacts."], [800, 2600, 5960], true),
          makeRow(["3", "Consumer segment determined", "Status code (100/101/102/103) routes to correct survey group per segments config."], [800, 2600, 5960]),
          makeRow(["4", "BR collects name, father's name, address", "Validated against regex (^[a-zA-Z ]{3,}$). Required fields enforced."], [800, 2600, 5960], true),
          makeRow(["5", "Terms & Conditions signed", "Consumer signs digitally. Terms stored in Bengali. Signature image saved to S3."], [800, 2600, 5960]),
          makeRow(["6", "OTP sent & verified", "SSL Wireless sends 6-char OTP to consumer. otp_verifications_ table records attempt."], [800, 2600, 5960], true),
          makeRow(["7", "AV (Audio-Visual) played", "BR shows product video (MP4) to consumer. Iris tracking optionally captures eye-open %"], [800, 2600, 5960]),
          makeRow(["8", "Survey questions answered", "Each answer stored in contact_survey_data_maps with question alias and answer value."], [800, 2600, 5960], true),
          makeRow(["9", "PTR given (if applicable)", "Giveable item selected from daily_material_acceptance_maps allocation."], [800, 2600, 5960]),
          makeRow(["10", "Contact submitted", "contacts record created. Consumer record created/updated. SMS sent if message_config enabled."], [800, 2600, 5960], true),
        ]
      }),
      spacer(),

      h2("5.2 Contacts Table Schema"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2200, 7160],
        rows: [
          makeHeaderRow(["Column", "Description"], [2200, 7160]),
          makeRow(["id", "Primary key"], [2200, 7160]),
          makeRow(["user_id", "FK to users.id — the BR who made the contact"], [2200, 7160], true),
          makeRow(["campaign_id", "FK to campaigns.id"], [2200, 7160]),
          makeRow(["consumer_id", "FK to consumers.id — the verified consumer record"], [2200, 7160], true),
          makeRow(["contact_no", "Consumer's mobile number (10-digit without country code)"], [2200, 7160]),
          makeRow(["location_id", "Outlet location (type=8 in locations table)"], [2200, 7160], true),
          makeRow(["contact_status", "Status code integer — maps to lookup values (e.g., 34=submitted, 35=verified)"], [2200, 7160]),
          makeRow(["product", "Primary brand product ID (FK to products.id)"], [2200, 7160], true),
          makeRow(["secondary_brand", "Secondary brand product ID"], [2200, 7160]),
          makeRow(["lat / long / radius", "GPS coordinates and accuracy at time of contact"], [2200, 7160], true),
          makeRow(["start / end", "Timestamps of survey start and submission (with timezone)"], [2200, 7160]),
          makeRow(["signature", "S3 path to the digital signature image"], [2200, 7160], true),
          makeRow(["additional_info", "JSONB: seg_stts, tap_analysis array, audio_needed flag, campaign_name, location_name"], [2200, 7160]),
          makeRow(["device_info", "JSONB: IMEI, brand, model, Android version, app version, network type"], [2200, 7160], true),
          makeRow(["contact_date", "Date portion of contact (for daily reporting)"], [2200, 7160]),
          makeRow(["giveable", "Material/PTR item ID given to consumer"], [2200, 7160], true),
          makeRow(["ecrm_type", "Contact category type (3=standard, etc.)"], [2200, 7160]),
          makeRow(["repeat_status", "Whether this is a repeat contact for this consumer"], [2200, 7160], true),
        ]
      }),
      spacer(),
      note("The contact_survey_data_maps table stores all individual question answers with question alias strings (e.g., 'product', 'name', 'asking_about_kit') linked to contact_id."),
      spacer(),
      pageBreak(),

      // ===================== SECTION 6: CONSUMER DATA =====================
      h1("6. Consumer Data Management"),
      para("The consumers table stores verified consumer profiles that persist across campaigns. A consumer is identified by contact_no and is versioned using from_date/to_date/is_current flags. This enables change history without losing old records."),
      spacer(),

      h2("6.1 Consumers Table"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2200, 7160],
        rows: [
          makeHeaderRow(["Column", "Description"], [2200, 7160]),
          makeRow(["contact_no", "Primary identifier — 10-digit mobile number"], [2200, 7160]),
          makeRow(["name / fathers_name", "Consumer full name and father's name (collected during contact)"], [2200, 7160], true),
          makeRow(["dob", "Date of birth (used for age validation: min 18, max depends on campaign)"], [2200, 7160]),
          makeRow(["address", "Consumer's home or current address"], [2200, 7160], true),
          makeRow(["profession", "Occupation category (Job Holder, Student, Business Man, etc.)"], [2200, 7160]),
          makeRow(["gender", "Male/Female — collected during survey"], [2200, 7160], true),
          makeRow(["campaign_id", "Campaign under which this consumer record was first created"], [2200, 7160]),
          makeRow(["product / secondary_brand", "Brand preferences recorded at time of contact"], [2200, 7160], true),
          makeRow(["is_current", "True if this is the active/latest consumer record"], [2200, 7160]),
          makeRow(["from_date / to_date", "Validity period (to_date = 9999-12-31 for current)"], [2200, 7160], true),
        ]
      }),
      spacer(),
      note("When a consumer is re-contacted with updated information, the previous record's to_date is set and a new record created with is_current=true. This preserves full history."),
      spacer(),

      h2("6.2 OTP Verification"),
      para("OTP verification is a critical compliance step. The otp_verifications_ table (production) and otp_verifications (legacy) track all SMS OTP attempts:"),
      bullet("OTP is 6-character alphanumeric, sent via SSL Wireless gateway"),
      bullet("JWT token is generated and validated server-side"),
      bullet("bypass:true flag in survey_flow allows testing without live SMS"),
      bullet("verification_time records when consumer confirmed the code"),
      bullet("gateway_response stores the full SSL response JSON for audit"),
      spacer(),
      pageBreak(),

      // ===================== SECTION 7: TARGETS & MATERIALS =====================
      h1("7. Campaign Targets & Material Management"),
      spacer(),

      h2("7.1 Target Structure"),
      para("Each campaign has one or more campaign_targets defining quotas. Targets are further broken down by location (campaign_target_loc_maps), brand (campaign_target_config), and SKU (campaign_target_sku_maps)."),
      spacer(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2600, 6760],
        rows: [
          makeHeaderRow(["Table", "Description"], [2600, 6760]),
          makeRow(["campaign_targets", "Defines numeric target, over_achievement flag, target name, date"], [2600, 6760]),
          makeRow(["campaign_target_loc_maps", "Maps target to specific cluster/outlet location IDs"], [2600, 6760], true),
          makeRow(["campaign_target_config", "Products array per target (e.g., Derby, Derby Style, Hollywood)"], [2600, 6760]),
          makeRow(["campaign_target_sku_maps", "SKU-level targeting per brand (p_brand or s_brand)"], [2600, 6760], true),
          makeRow(["campaign_target_parameter_maps", "Vulnerability configuration (vulnerable vs non_vulnerable counts)"], [2600, 6760]),
          makeRow(["campaign_loc_ff_allocations", "How many fixed/cycle/interim FF are allocated per location"], [2600, 6760], true),
        ]
      }),
      spacer(),

      h2("7.2 Material Management"),
      para("Materials (PTRs, tea, swapping items) are physical goods given to consumers or tracked during field activities. The material workflow:"),
      spacer(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 6960],
        rows: [
          makeHeaderRow(["Table", "Description"], [2400, 6960]),
          makeRow(["materials", "Master material list: id, name, type, img_url"], [2400, 6960]),
          makeRow(["material_campaign_maps", "Which materials are available for a campaign, with daily qty and rank"], [2400, 6960], true),
          makeRow(["daily_material_maps", "Supervisor assigns material quantities to BRs each day"], [2400, 6960]),
          makeRow(["daily_material_acceptance_maps", "BR accepts daily allocation; records qty, acceptance_time, return_qty"], [2400, 6960], true),
          makeRow(["ptr_shifts", "Material transfers between BRs (sender/receiver approval workflow)"], [2400, 6960]),
          makeRow(["sku_items / sku_item_price", "SKU catalog with pricing, case size, MRP, availability"], [2400, 6960], true),
          makeRow(["sku_product_maps", "Links SKU items to product brands"], [2400, 6960]),
        ]
      }),
      spacer(),
      pageBreak(),

      // ===================== SECTION 8: FIELD OPERATIONS =====================
      h1("8. Field Operations & Attendance"),
      spacer(),

      h2("8.1 Daily Check-In / Check-Out"),
      para("BRs and Supervisors must check in at the start of each working day. The daily_checks table records:"),
      bullet("user_id, check_type (check_in / check_out), check_date, check_time"),
      bullet("GPS point (SRID=3857), radius (accuracy in meters)"),
      bullet("img_url — selfie photo (stored as JSON array with type: own_selfie)"),
      bullet("on_time (boolean), on_leave, geo_validated"),
      spacer(),

      h2("8.2 Live Location Tracking"),
      para("The live_locations table receives periodic GPS pings from the mobile app while the BR is active:"),
      bullet("Records user_id, latitude, longitude, time, radius (accuracy)"),
      bullet("Used for supervisor oversight and proximity fraud detection"),
      bullet("proximity_report table identifies cases where two BRs worked within suspicious distance"),
      spacer(),

      h2("8.3 Leaves"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 6960],
        rows: [
          makeHeaderRow(["Table", "Description"], [2400, 6960]),
          makeRow(["leaves", "Leave request: user_id, type (sick/casual/etc.), reason, status, action_taken_by"], [2400, 6960]),
          makeRow(["leave_date_maps", "Individual date records within a multi-day leave request"], [2400, 6960], true),
        ]
      }),
      spacer(),

      h2("8.4 Joint Calls (Supervisor Verification)"),
      para("Supervisors conduct joint calls to verify that BRs are working correctly in the field. This is a spot-check mechanism:"),
      bullet("joint_calls: Supervisor (user_id) accompanies BR (ff_id) at a location; GPS + timestamps recorded"),
      bullet("joint_calls_survey_data_maps: Answers to joint call survey (e.g., consumer_name_correct, correct_age, correct_primary_brand)"),
      bullet("campaign_callcheckback_maps: Defines the joint call survey flow per campaign"),
      bullet("sup_br_maps: Permanent supervisor-to-BR assignment mappings"),
      bullet("sup_br_callcheckback_maps: Records which BRs a supervisor called-back for quality check"),
      spacer(),
      pageBreak(),

      // ===================== SECTION 9: AAI AUDIO AUDIT =====================
      h1("9. AAI — AI Audio Quality Auditing"),
      para("The AAI (Audio Audit Intelligence) module enables structured quality review of recorded consumer interactions. When audit_ai_config.enable = true in a campaign's conditions, audio files from contacts are automatically processed and assigned to auditors."),
      spacer(),

      h2("9.1 AAI Data Flow"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [800, 2600, 5960],
        rows: [
          makeHeaderRow(["Step", "Table", "What Happens"], [800, 2600, 5960]),
          makeRow(["1", "aai_audios", "Audio file linked to contact_id, project_id. Stores audio_pctg (voice %), noise_pctg."], [800, 2600, 5960]),
          makeRow(["2", "aai_projects", "Defines the audit project: campaign_id, start/end dates, audio_enhancement, noise_reduction flags."], [800, 2600, 5960], true),
          makeRow(["3", "aai_project_level_maps", "Sets day_target and load_per_page for each auditor level within the project."], [800, 2600, 5960]),
          makeRow(["4", "aai_auditor_project_maps", "Assigns auditors (user IDs with is_auditor=true) to projects with a level (1 or 2)."], [800, 2600, 5960], true),
          makeRow(["5", "aai_audio_assign_maps", "Daily batch assignment: maps audio_id to auditor_id with project_id and assigned_date."], [800, 2600, 5960]),
          makeRow(["6", "aai_verified_audios", "Auditor marks verification result: is_verified, audio quality flags (is_poor, is_noisy, etc.)"], [800, 2600, 5960], true),
          makeRow(["7", "aai_verification_answer_maps", "Per-question scores: question_id, answer (Yes/No), weight for each verified audio"], [800, 2600, 5960]),
        ]
      }),
      spacer(),

      h2("9.2 AAI Question Types"),
      para("Questions in aai_questions are campaign-specific, written in Bengali. They verify whether the BR correctly delivered key brand messages. Each question has a total_weight score that contributes to the BR's performance score."),
      spacer(),
      infoBox("Example AAI Question (Derby Mega LEP)", [
        "Question: 'Did the RA tell the consumer the brand message about Derby quality and popularity?'",
        "Type: checkbox (binary Yes/No)",
        "Weight: 200 points",
        "Linked to: project_id = 2 (Derby Mega LEP)",
      ]),
      spacer(),
      pageBreak(),

      // ===================== SECTION 10: PRODUCTS =====================
      h1("10. Products & Brand Catalog"),
      spacer(),

      h2("10.1 Product Tables"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 6960],
        rows: [
          makeHeaderRow(["Table", "Description"], [2400, 6960]),
          makeRow(["products", "Master brand list: id, name, category (FK to product_categories), apsis_product_id"], [2400, 6960]),
          makeRow(["product_categories", "Brand categories (e.g., Franchise, SOB). Hierarchical with parent reference."], [2400, 6960], true),
          makeRow(["sku_items", "Individual SKU products with serial number, description, image, thumbnail"], [2400, 6960]),
          makeRow(["sku_product_maps", "Links SKUs to brand products (one product may have multiple SKUs)"], [2400, 6960], true),
          makeRow(["sku_item_price", "Trade price, MRP, VAT, case size, availability, min/max volume per order"], [2400, 6960]),
          makeRow(["location_wise_brands", "Which brand is marketed at each Region > Territory > Point"], [2400, 6960], true),
          makeRow(["sob_expansion_lookup_2024", "Share-of-brand expansion targets per point"], [2400, 6960]),
        ]
      }),
      spacer(),
      note("Key product IDs in use: 7=Derby, 32=Derby Style, 80=Hollywood, 11/30/31=Royals variants, 2=B&H Blue Gold. These IDs are hardcoded in campaign validation_rule logic."),
      spacer(),
      pageBreak(),

      // ===================== SECTION 11: DIALER / CDR =====================
      h1("11. Consumer Dialer & CDR Module"),
      para("The dialer module enables BRs to make outbound calls to existing consumers for follow-up, repeat engagement, or call-checkback surveys. It is separate from the primary contact flow."),
      spacer(),

      h2("11.1 Consumer Dialer Tables"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          makeHeaderRow(["Table", "Description"], [2800, 6560]),
          makeRow(["consumer_dialer_list", "Pre-loaded list of consumers to call: consumer_number, campaign_id, br_id, assign_date, region_id"], [2800, 6560]),
          makeRow(["consumer_dialer_br_assignments", "Maps dialer list item (cdl_id) to BR for a specific contact_date"], [2800, 6560], true),
          makeRow(["consumer_dialer_contacts", "Records of actual dialer calls: start_time, end_time, additional_info (duration, lat/long)"], [2800, 6560]),
          makeRow(["consumer_dialer_survey_maps", "Survey answers from dialer calls (call_received, agreed_to_talk, etc.)"], [2800, 6560], true),
          makeRow(["cdr_contacts", "Call Detail Records for retailer outreach: contact_no, name, dob, product, retailer_code"], [2800, 6560]),
          makeRow(["supervisor_contacts", "Supervisor outbound calls to BRs: call duration, status, br_id"], [2800, 6560], true),
          makeRow(["supervisor_contact_survey_data_maps", "Survey outcomes from supervisor calls (call_received, continue_conversation)"], [2800, 6560]),
        ]
      }),
      spacer(),
      note("The pj_pincer_dialer_consumers_all_tiers and pj_stalingard_dialer_consumers views are pre-aggregated dialer lists for specific PJ (Project) campaigns with outlet/cluster context."),
      spacer(),
      pageBreak(),

      // ===================== SECTION 12: REPORTING =====================
      h1("12. Reporting & Analytics"),
      spacer(),

      h2("12.1 Dashboard System"),
      para("Dashboards are Looker Studio reports embedded in the management portal. Access is role-based using the dashboards.roles array (PostgreSQL integer array of role IDs)."),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 6960],
        rows: [
          makeHeaderRow(["Dashboard", "Audience"], [2400, 6960]),
          makeRow(["Dashboard: Derby FOR Campaign 2024", "All management roles (51, 52, 59-179). Agency: IMSL only."], [2400, 6960]),
          makeRow(["Hollywood (PJ Greatwall)", "Extended roles including external agencies 12 and 11."], [2400, 6960], true),
        ]
      }),
      spacer(),

      h2("12.2 Custom & Dynamic Reports"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2800, 6560],
        rows: [
          makeHeaderRow(["Table", "Description"], [2800, 6560]),
          makeRow(["dynamic_reports", "SQL-based reports with optional chart display"], [2800, 6560]),
          makeRow(["dynamic_report_role_maps", "Which roles can access a report"], [2800, 6560], true),
          makeRow(["dynamic_report_agency_maps", "Which agencies can access a report"], [2800, 6560]),
          makeRow(["dynamic_report_parameter_maps", "Input parameters (e.g., date range) for parameterized queries"], [2800, 6560], true),
          makeRow(["dynamic_report_chart_maps", "Configures chart fields: hide/row/metric display types"], [2800, 6560]),
          makeRow(["custom_queries", "Scheduled email reports with SQL, role, agency, and mail recipient config"], [2800, 6560], true),
          makeRow(["preloaded_reports", "Static pre-generated reports with user and date mapping"], [2800, 6560]),
        ]
      }),
      spacer(),

      h2("12.3 Standard SQL Query Pattern"),
      para("The following pattern is used in all standard contact reports (reference: task2.txt):"),
      spacer(),
      infoBox("Contact Report Join Pattern", [
        "FROM contacts c",
        "JOIN locations l_outlet ON c.location_id = l_outlet.id AND l_outlet.type = 8",
        "LEFT JOIN locations l_cluster ON l_outlet.parent = l_cluster.id AND l_cluster.type = 7",
        "LEFT JOIN locations l_route ON l_cluster.parent = l_route.id AND l_route.type = 6",
        "LEFT JOIN locations l_point ON l_route.parent = l_point.id AND l_point.type = 5",
        "LEFT JOIN locations l_territory ON l_point.parent = l_territory.id AND l_territory.type = 3",
        "LEFT JOIN locations l_area ON l_territory.parent = l_area.id AND l_area.type = 2",
        "LEFT JOIN locations r ON l_area.parent = r.id AND r.type = 1",
        "LEFT JOIN user_infos ui ON c.user_id = ui.user_id",
        "LEFT JOIN campaigns ca ON c.campaign_id = ca.id",
        "LEFT JOIN consumers co ON c.contact_no = co.contact_no",
        "LEFT JOIN products pr ON c.product = pr.id",
        "LEFT JOIN contact_survey_data_maps cs ON c.id = cs.contact_id AND cs.question = 'question_alias'",
        "Note: Skip hierarchy level 4 (Distribution House) — it has no direct parent role in contacts path",
      ]),
      spacer(),
      pageBreak(),

      // ===================== SECTION 13: AGENCIES =====================
      h1("13. Agency Management"),
      para("The platform supports multiple agencies (implementing organizations) that each manage their own pool of field-force users. Agency segregation controls data visibility across reports and dashboards."),
      spacer(),

      h2("13.1 Agency Tables"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 6960],
        rows: [
          makeHeaderRow(["Table", "Description"], [2400, 6960]),
          makeRow(["agencies", "Agency master: id, name, tag (short code), contact details"], [2400, 6960]),
          makeRow(["user_agency_maps", "Links each user to their agency (is_deleted for historical tracking)"], [2400, 6960], true),
          makeRow(["role_agency_maps", "Which roles belong to which agency"], [2400, 6960]),
          makeRow(["campaign_agency_maps", "Which agencies are active for a given campaign"], [2400, 6960], true),
          makeRow(["agency_resource_map", "Maps agency to accessible feature resources (UI permissions)"], [2400, 6960]),
          makeRow(["dynamic_report_agency_maps", "Report access per agency"], [2400, 6960], true),
        ]
      }),
      spacer(),
      note("Known agencies: 1 = IMSL (primary), 11 = secondary agency, 12 = extended agency. Tag 'imsl' is the primary deployment identifier."),
      spacer(),
      pageBreak(),

      // ===================== SECTION 14: NOTIFICATIONS =====================
      h1("14. Notifications & Messaging"),
      spacer(),

      h2("14.1 Notification Tables"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 6960],
        rows: [
          makeHeaderRow(["Table", "Description"], [2400, 6960]),
          makeRow(["manual_notifications", "Admin-triggered notifications: header, description, type (warning/success), recipients"], [2400, 6960]),
          makeRow(["notifications", "Per-user notification delivery records with seen status"], [2400, 6960], true),
          makeRow(["contact_message_maps", "SMS messages sent to consumers after contact (Breakstation welcome message)"], [2400, 6960]),
          makeRow(["messaging_reports", "Bulk messaging reports (campaigns via SSL gateway)"], [2400, 6960], true),
          makeRow(["chats", "In-app P2P chat between users: sender, receiver, message, seen"], [2400, 6960]),
        ]
      }),
      spacer(),

      h2("14.2 SMS Gateway"),
      para("Consumer SMS is sent via SSL Wireless (BRKSTATIONMASKAPI gateway). The gateway_response field in contact_message_maps stores the full API response JSON including csms_id and reference_id for tracking."),
      spacer(),
      pageBreak(),

      // ===================== SECTION 15: DEVICE & APP =====================
      h1("15. Device & Application Management"),
      spacer(),

      h2("15.1 App Version Control"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 6960],
        rows: [
          makeHeaderRow(["Table", "Description"], [2400, 6960]),
          makeRow(["app_versions", "APK release records: name, version string, force update flag, S3 URL, md5 checksum"], [2400, 6960]),
          makeRow(["app_version_control", "Single-row table with the currently minimum required version code"], [2400, 6960], true),
          makeRow(["user_apk_maps", "Maps which APK version each user has installed on which device"], [2400, 6960]),
          makeRow(["device_registers", "Registered device IDs: model, brand, authorize/block flags, last_login"], [2400, 6960], true),
          makeRow(["user_device_maps", "Soft-deleted device linkage history per user"], [2400, 6960]),
        ]
      }),
      spacer(),
      note("APK distribution uses S3 paths under Production/ecrm/Apk/. The force flag in app_versions triggers a mandatory update prompt on the device. Platform code 116 = Android."),
      spacer(),
      pageBreak(),

      // ===================== SECTION 16: MISC & SPECIAL =====================
      h1("16. Special Features"),
      spacer(),

      h2("16.1 Iris Analysis (Eye Tracking)"),
      para("When iris_track.status = true in a video block, the mobile app captures frames during AV playback to determine whether the consumer was watching. Data stored in iris_analyses:"),
      bullet("contact_id, user_id, campaign_id — context identifiers"),
      bullet("angle — head rotation angle (0 = looking away, >30 = watching)"),
      bullet("is_eye_open — boolean derived from the angle and facial detection"),
      bullet("video_time — timestamp within the video at time of capture"),
      spacer(),

      h2("16.2 Proximity Fraud Detection"),
      para("The proximity_report table identifies suspicious patterns where two BRs recorded contacts within close physical distance during overlapping time windows. Key fields:"),
      bullet("proximity_distance_meter — distance between two BRs' GPS coordinates"),
      bullet("base_br_contact_id / conflicted_br_contact_id — the two contacts being compared"),
      bullet("Route, cluster, and outlet information for both BRs is included for investigation"),
      spacer(),

      h2("16.3 Whatsapp Image Journey"),
      para("The whatsapp_lookups table supports a consumer engagement feature where the BR captures a photo and the consumer receives a personalized WhatsApp message with an AI-generated image:"),
      bullet("passion_point — consumer's interest (Art/Bike/Music) used for image template selection"),
      bullet("image_name — name given to the generated image"),
      bullet("nimbus_payload — sent to AI image generation API (Nimbus) with source and target images"),
      bullet("img_journey_payload — sent to WhatsApp delivery service"),
      spacer(),

      h2("16.4 Coupon Codes"),
      para("The coupon_codes table manages digital coupons (e.g., Chorki streaming vouchers) distributed during campaigns:"),
      bullet("coupon_code — unique redemption code"),
      bullet("available — false once assigned to a contact_no"),
      bullet("acceptance_date — when the consumer redeemed the coupon"),
      bullet("coupon_type — platform identifier (e.g., 'chorki')"),
      spacer(),
      pageBreak(),

      // ===================== SECTION 17: ONBOARDING CHECKLIST =====================
      h1("17. New Member Onboarding Checklist"),
      para("Use this checklist to ensure full system access and knowledge before beginning independent work:"),
      spacer(),

      h2("17.1 Access & Setup"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [600, 8760],
        rows: [
          makeHeaderRow(["", "Task"], [600, 8760]),
          makeRow(["[ ]", "Receive database credentials (PostgreSQL, schema: ecrm)"], [600, 8760]),
          makeRow(["[ ]", "Get AWS S3 read access (bucket: ppol-web-uploads, region: ap-southeast-1)"], [600, 8760], true),
          makeRow(["[ ]", "Access Looker Studio dashboards (request role assignment from admin)"], [600, 8760]),
          makeRow(["[ ]", "Install mobile app (latest APK from S3 or admin) and register device"], [600, 8760], true),
          makeRow(["[ ]", "Review your assigned role in role_location_maps and verify location scope"], [600, 8760]),
          makeRow(["[ ]", "Confirm agency assignment in user_agency_maps"], [600, 8760], true),
        ]
      }),
      spacer(),

      h2("17.2 Technical Knowledge Gates"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [600, 8760],
        rows: [
          makeHeaderRow(["", "Knowledge Area"], [600, 8760]),
          makeRow(["[ ]", "Understand the 8-level location hierarchy and parent traversal pattern"], [600, 8760]),
          makeRow(["[ ]", "Understand survey_flow JSON structure and block type routing"], [600, 8760], true),
          makeRow(["[ ]", "Understand the contact lifecycle (validation_rule → segment → OTP → AV → submit)"], [600, 8760]),
          makeRow(["[ ]", "Understand consumer versioning (is_current + from_date/to_date pattern)"], [600, 8760], true),
          makeRow(["[ ]", "Understand target hierarchy (campaign_targets → loc_maps → config → sku_maps)"], [600, 8760]),
          makeRow(["[ ]", "Understand AAI flow (audios → project → assign → verify → answer_maps)"], [600, 8760], true),
          makeRow(["[ ]", "Be able to write a standard contact report query using the join pattern in Section 12.3"], [600, 8760]),
        ]
      }),
      spacer(),

      h2("17.3 Key Reference Values"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3000, 6360],
        rows: [
          makeHeaderRow(["Reference", "Value / Note"], [3000, 6360]),
          makeRow(["Database Schema", "ecrm (all tables prefixed in SQL as ecrm.table_name)"], [3000, 6360]),
          makeRow(["S3 Bucket", "ppol-web-uploads (AWS ap-southeast-1)"], [3000, 6360], true),
          makeRow(["CDN Base URL", "https://d2v8ovxad9rpbq.cloudfront.net/"], [3000, 6360]),
          makeRow(["Primary Agency Tag", "imsl"], [3000, 6360], true),
          makeRow(["Android Platform Code", "116 (in app_versions.platform)"], [3000, 6360]),
          makeRow(["Location Outlet Type", "8 (always join locations WHERE type=8 for outlets)"], [3000, 6360], true),
          makeRow(["Consumer Active Flag", "is_current = true AND to_date = '9999-12-31'"], [3000, 6360]),
          makeRow(["Derby Product ID", "7 (primary), 32 = Derby Style"], [3000, 6360], true),
          makeRow(["Hollywood Product ID", "80 / 41 (variants)"], [3000, 6360]),
          makeRow(["B&H Blue Gold Product ID", "2"], [3000, 6360], true),
          makeRow(["SMS Gateway", "SSL Wireless (BRKSTATIONMASKAPI)"], [3000, 6360]),
          makeRow(["OTP Length", "6 alphanumeric characters"], [3000, 6360], true),
          makeRow(["Geofence CRS", "SRID=3857 (Web Mercator / WGS84)"], [3000, 6360]),
        ]
      }),
      spacer(),
      pageBreak(),

      // ===================== APPENDIX =====================
      h1("Appendix A: Complete Table Reference"),
      para("The following table lists all database tables in the eCRM platform with their primary purpose:"),
      spacer(),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3000, 6360],
        rows: [
          makeHeaderRow(["Table Name", "Purpose"], [3000, 6360]),
          ...[
            ["aai_audios", "Audio files linked to contacts for AAI review"],
            ["aai_audio_assign_maps", "Daily audio-to-auditor assignments"],
            ["aai_audio_assign_maps_default", "Default assignment template"],
            ["aai_auditor_project_maps", "Auditor enrollment per AAI project"],
            ["aai_levels", "Auditor level definitions (L1, L2)"],
            ["aai_project_level_maps", "Daily targets per level per project"],
            ["aai_projects", "AAI audit project configuration"],
            ["aai_projects_phrase_maps", "Key phrase detection configuration (future use)"],
            ["aai_questions", "Quality audit questions with Bengali text and weights"],
            ["aai_role_level_maps", "Maps roles to auditor levels"],
            ["aai_verification_answer_maps", "Per-question audit scores"],
            ["aai_verified_audios", "Auditor verification outcomes"],
            ["agencies", "Agency master registry"],
            ["agency_resource_map", "Agency-to-feature access mapping"],
            ["all_locations_region_to_outlet", "Flattened location hierarchy view"],
            ["all_old_location", "Historical outlet location records (pre-migration)"],
            ["app_version_control", "Minimum required app version"],
            ["app_versions", "APK release history"],
            ["audit_logs", "Admin action audit trail"],
            ["audios", "Legacy audio file records"],
            ["breakstation", "Breakstation cluster mapping (cluster IDs)"],
            ["breakstation_dp", "DP (Distribution Point) breakstation references"],
            ["bulk_assignment_tickets", "Bulk user role/location assignment requests"],
            ["bulk_assignment_ticket_status_maps", "Status history for bulk tickets"],
            ["campaign_agency_maps", "Campaign-to-agency assignments"],
            ["campaign_callcheckback_maps", "Joint call survey flow per campaign"],
            ["campaign_loc_ff_allocations", "FF headcount per location per campaign"],
            ["campaign_location_maps", "Active locations within a campaign"],
            ["campaign_target_config", "Products per target"],
            ["campaign_target_loc_maps", "Location scope per target"],
            ["campaign_target_parameter_maps", "Vulnerability quota config"],
            ["campaign_target_sku_maps", "SKU-level targeting"],
            ["campaign_targets", "Campaign target definitions"],
            ["campaign_theme_maps", "UI theme (colors, images) per campaign"],
            ["campaigns", "Campaign master with survey_flow and conditions"],
            ["cdr_contacts", "Call detail records for retailer outreach"],
            ["chats", "In-app messaging"],
            ["_clusters", "Cluster-to-route-DP mapping"],
            ["consumer_dialer_br_assignments", "BR assignments for dialer calls"],
            ["consumer_dialer_contacts", "Recorded dialer call events"],
            ["consumer_dialer_list", "Pre-loaded dialer consumer list"],
            ["consumer_dialer_survey_maps", "Survey outcomes from dialer calls"],
            ["consumers", "Verified consumer profiles (versioned)"],
            ["contact_message_maps", "SMS messages sent after contacts"],
            ["contact_survey_data_maps", "All survey question answers per contact"],
            ["contacts", "Core contact/interaction records"],
            ["coupon_codes", "Digital coupon inventory and redemption"],
            ["custom_queries", "Scheduled SQL report emails"],
            ["daily_checks", "BR/SUP daily attendance records"],
            ["daily_material_acceptance_maps", "BR daily material acceptance log"],
            ["daily_material_maps", "Supervisor daily material distribution"],
            ["dashboards", "Looker Studio report links with role access"],
            ["derby_range_campaign_bs_rewards_lookup", "Derby range Breakstation reward eligibility"],
            ["device_registers", "Registered mobile device inventory"],
            ["dp_region", "DP-to-Region mapping"],
            ["dp_route_clusters", "DP-Route-Cluster hierarchy"],
            ["dynamic_report_agency_maps", "Dynamic report agency access"],
            ["dynamic_report_chart_maps", "Chart field configuration"],
            ["dynamic_report_parameter_maps", "Report input parameters"],
            ["dynamic_report_role_maps", "Dynamic report role access"],
            ["dynamic_reports", "SQL-based dynamic report definitions"],
            ["forget_password_otp_verify", "Password reset OTP records"],
            ["geo_location", "GPS coordinates per location"],
            ["hierarchy", "Location level type definitions"],
            ["iris_analyses", "Eye-tracking analysis per video block"],
            ["jml_tickets", "Join/Modify/Leave user management tickets"],
            ["joint_calls", "Supervisor field verification visits"],
            ["joint_calls_survey_data_maps", "Survey answers from joint calls"],
            ["leave_date_maps", "Individual days within leave requests"],
            ["leaves", "Leave request records"],
            ["live_locations", "Real-time GPS pings from active users"],
            ["location_wise_brands", "Brand assignment per territory/point"],
            ["locations", "Master location hierarchy (all 8 levels)"],
            ["locations_bkp_20260330", "Point-in-time backup of locations table"],
            ["manual_notifications", "Admin-sent notifications"],
            ["manpowers", "Campaign manpower planning (FF counts)"],
            ["material_campaign_maps", "Material availability per campaign"],
            ["materials", "Physical material/PTR master list"],
            ["messaging_report_date_maps", "Date breakdown for messaging reports"],
            ["messaging_reports", "Bulk SMS campaign reports"],
            ["mv_campaign_173_contacts", "Materialized view: Campaign 173 contacts"],
            ["notifications", "Per-user notification delivery"],
            ["outlets / outlets_u", "Enriched retail outlet data with GPS"],
            ["otp_verifications", "Legacy OTP records"],
            ["otp_verifications_", "Production OTP verification records"],
            ["pj_lookup_table_2024_updated", "PJ campaign point-route-cluster lookup"],
            ["pj_pincer_dialer_consumers_all_tiers", "Pincer campaign dialer consumer list"],
            ["pj_pincer_t3_priority_consumer_list", "Pincer T3 priority consumers"],
            ["pj_stalingard_dialer_consumers", "Stalingard campaign dialer list"],
            ["porichoy_infos", "NID verification results (face match, address)"],
            ["preloaded_report_date_maps", "Date access for preloaded reports"],
            ["preloaded_report_user_maps", "User access for preloaded reports"],
            ["preloaded_reports", "Static pre-generated report definitions"],
            ["product_categories", "Brand category taxonomy"],
            ["products", "Brand master catalog"],
            ["proximity_report", "Fraud detection — co-location analysis"],
            ["ptr_shifts", "Material transfer requests between BRs"],
            ["region_area", "Region-to-Area parent mapping"],
            ["region_dp", "Region-to-DP hierarchy"],
            ["repeat_schedule_maps", "Repeat contact scheduling"],
            ["retailer_contact_survey_data_map", "Survey data from retailer contacts"],
            ["retailer_contacts", "Retailer outreach contact records"],
            ["retailer_outlet_dialer_*", "Retailer-focused dialer module tables"],
            ["role_agency_maps", "Role-to-agency assignment"],
            ["role_location_maps", "User location scope by role assignment"],
            ["role_report_to_maps", "Reporting chain definitions"],
            ["role_resource_maps", "Feature/resource access per role"],
            ["role_tree_maps", "Role hierarchy tree structure"],
            ["roles", "Role master: name, platform, top_ff, lowest_ff flags"],
            ["sku_item_price", "SKU pricing and availability"],
            ["sku_items", "SKU product catalog"],
            ["sku_product_maps", "SKU-to-brand product linkage"],
            ["sob_expansion_lookup_2024", "SOB expansion target list"],
            ["sup_br_callcheckback_maps", "Supervisor-BR call-checkback history"],
            ["sup_br_maps", "Supervisor-to-BR team assignments"],
            ["sup_geo_tags", "Supervisor geo-tagged field notes"],
            ["supervisor_contact_survey_data_maps", "Survey outcomes from supervisor calls"],
            ["supervisor_contacts", "Supervisor outbound call records"],
            ["tap_analyses", "Survey interaction tap timing analytics"],
            ["thirdparties", "Third-party API integration credentials"],
            ["ticket_status_maps", "JML ticket status change history"],
            ["user_agency_maps", "User-to-agency assignment"],
            ["user_apk_maps", "User device APK installation tracking"],
            ["user_approval_maps", "User onboarding approval status"],
            ["user_campaign_locations_config", "Per-user location config for specific campaigns"],
            ["user_details", "NID details, emergency contact info"],
            ["user_device_maps", "User-to-device registration"],
            ["user_infos", "Full name, designation, contact, avatar"],
            ["users", "Login accounts, user_type, MFA, UID"],
            ["users_consumer_maps", "User-to-consumer linkage (special cases)"],
            ["whatsapp_lookups", "WhatsApp image journey payloads"],
          ].map(([name, desc], i) => makeRow([name, desc], [3000, 6360], i % 2 === 1))
        ]
      }),
      spacer(),

      // ===================== CLOSING =====================
      spacer(),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 8 } },
        spacing: { before: 200, after: 80 },
        children: [new TextRun({ text: "End of Document", font: "Arial", size: 20, color: "888888", italics: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "eCRM Platform — Technical Onboarding Guide v1.0 | V2 Technology Ltd. | CONFIDENTIAL", font: "Arial", size: 18, color: "AAAAAA" })]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/mnt/user-data/outputs/eCRM_Technical_Onboarding_Guide.docx", buffer);
  console.log("Done.");
});
