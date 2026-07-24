# Graph Report - .  (2026-07-25)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 146 nodes · 195 edges · 12 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- eCRM Complete Documentation
- M1: Users & Identity
- M7: Field Contacts
- M8: QA & Supervision
- M11: Reporting
- M2: Roles & RBAC
- M4: Location Hierarchy
- M5: Campaigns
- M14: AAI Audio Auditing
- M9: Dialer Workflows
- M12: Communications
- M3: JML Workflow

## God Nodes (most connected - your core abstractions)

## Surprising Connections (you probably didn't know these)
- `eCRM Complete Documentation` ----> `M1: Users & Identity`  [EXTRACTED]
   →   _Bridges community 0 → community 1_
- `eCRM Complete Documentation` ----> `M11: Reporting`  [EXTRACTED]
   →   _Bridges community 0 → community 4_
- `eCRM Complete Documentation` ----> `M12: Communications`  [EXTRACTED]
   →   _Bridges community 0 → community 10_
- `eCRM Complete Documentation` ----> `M14: AAI Audio Auditing`  [EXTRACTED]
   →   _Bridges community 0 → community 8_
- `eCRM Complete Documentation` ----> `M2: Roles & RBAC`  [EXTRACTED]
   →   _Bridges community 0 → community 5_

## Communities (12 total, 0 thin omitted)

### Community 0 - "eCRM Complete Documentation"
Cohesion: 0.13
Nodes (18): M10: Rewards & Coupons, M13: Leave Management, M6: Products & SKU, coupon_codes, daily_material_acceptance_maps, daily_material_maps, eCRM Complete Documentation, leave_date_maps (+10 more)

### Community 1 - "M1: Users & Identity"
Cohesion: 0.20
Nodes (14): M1: Users & Identity, app_version_control, app_versions, audit_logs, device_registers, forget_password_otp_verify, porichoy_infos, thirdparties (+6 more)

### Community 2 - "M7: Field Contacts"
Cohesion: 0.16
Nodes (14): M7: Field Contacts, cdr_contacts, consumers, contact_survey_data_maps, contacts, iris_analyses, otp_verifications, outlets (+6 more)

### Community 3 - "M8: QA & Supervision"
Cohesion: 0.16
Nodes (14): M8: QA & Supervision, campaign_callcheckback_maps, campaign_joint_call_maps, daily_checks, joint_calls, joint_calls_survey_data_maps, live_locations, proximity_report (+6 more)

### Community 4 - "M11: Reporting"
Cohesion: 0.21
Nodes (13): M11: Reporting, custom_queries, dashboards, dynamic_report_agency_maps, dynamic_report_chart_maps, dynamic_report_parameter_maps, dynamic_report_role_maps, dynamic_reports (+5 more)

### Community 5 - "M2: Roles & RBAC"
Cohesion: 0.26
Nodes (13): M2: Roles & RBAC, agencies, agency_resource_map, role_agency_maps, role_location_maps, role_report_to_maps, role_resource_maps, role_tree_maps (+5 more)

### Community 6 - "M4: Location Hierarchy"
Cohesion: 0.15
Nodes (13): M4: Location Hierarchy, all_locations_region_to_outlet, all_old_location, breakstation, breakstation_dp, dp_region, dp_route_clusters, dp_ter_area_region (+5 more)

### Community 7 - "M5: Campaigns"
Cohesion: 0.21
Nodes (13): M5: Campaigns, campaign_agency_maps, campaign_loc_ff_allocations, campaign_location_maps, campaign_target_parameter_maps, campaign_target_sku_maps, campaign_targets, campaign_theme_maps (+5 more)

### Community 8 - "M14: AAI Audio Auditing"
Cohesion: 0.26
Nodes (12): M14: AAI Audio Auditing, aai_audio_assign_maps, aai_audios, aai_auditor_project_maps, aai_levels, aai_project_level_maps, aai_projects, aai_projects_phrase_maps (+4 more)

### Community 9 - "M9: Dialer Workflows"
Cohesion: 0.39
Nodes (8): M9: Dialer Workflows, consumer_dialer_br_assignments, consumer_dialer_contacts, consumer_dialer_list, consumer_dialer_survey_maps, retailer_outlet_dialer_br_assignments, retailer_outlet_dialer_list, retailer_outlet_dialer_survey_maps

### Community 10 - "M12: Communications"
Cohesion: 0.29
Nodes (7): M12: Communications, audios, chats, contact_message_maps, manual_notifications, notifications, whatsapp_lookups

### Community 11 - "M3: JML Workflow"
Cohesion: 0.48
Nodes (7): M3: JML Workflow, bulk_assignment_ticket_status_maps, bulk_assignment_tickets, jml_tickets, ticket_status_maps, user_ticket_maps, user_ticket_role_maps

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Should `eCRM Complete Documentation` be split into smaller, more focused modules?**
  _Cohesion score 0.13071895424836602 - nodes in this community are weakly interconnected._