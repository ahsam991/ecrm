SELECT
-- =========================================
-- IDENTIFIERS
-- =========================================
jc.id AS "Contact ID",

-- =========================================
-- LOCATION HIERARCHY (OUTLET → REGION)
-- =========================================
r.name            AS "Region",
l_area.name       AS "Area",
l_territory.name  AS "Territory",
l_point.name      AS "Distributorspoint",

-- =========================================
-- CAMPAIGN
-- =========================================
ca.name AS "Campaign Name",

-- =========================================
-- USERS (DIRECT FROM `users` TABLE - NO MAX)
-- =========================================
sup.username      AS "Sup ID",
sup_i.full_name   AS "Sup Name",
br.username       AS "BR ID",
br_i.full_name    AS "BR Name",

-- =========================================
-- DATE
-- =========================================
jc.contact_date   AS "Contact Date",

-- =========================================
-- SURVEY (PIVOT)
-- =========================================
MAX(CASE WHEN jcs.question = 'ra_correct_cluster' THEN jcs.answer END) AS "ra_correct_cluster",
MAX(CASE WHEN jcs.question = 'ra_correct_attire' THEN jcs.answer END) AS "ra_correct_attire",
MAX(CASE WHEN jcs.question = 'shop_owner_permission' THEN jcs.answer END) AS "shop_owner_permission",
MAX(CASE WHEN jcs.question = 'exists_third_part_app' THEN jcs.answer END) AS "exists_third_part_app",
MAX(CASE WHEN jcs.question = 'choosing_correct_consumer_profile' THEN jcs.answer END) AS "choosing_correct_consumer_profile",
MAX(CASE WHEN jcs.question = 'telling_about_lucky_strike' THEN jcs.answer END) AS "telling_about_lucky_strike",
MAX(CASE WHEN jcs.question = 'showing_av' THEN jcs.answer END) AS "showing_av",
MAX(CASE WHEN jcs.question = 'telling_about_circle' THEN jcs.answer END) AS "telling_about_circle",
MAX(CASE WHEN jcs.question = 'telling_about_circle2' THEN jcs.answer END) AS "telling_about_circle2",
MAX(CASE WHEN jcs.question = 'telling_about_circle3' THEN jcs.answer END) AS "telling_about_circle3",
MAX(CASE WHEN jcs.question = 'showing_Global_stories' THEN jcs.answer END) AS "showing_Global_stories",
MAX(CASE WHEN jcs.question = 'telling_never_ordinary_story' THEN jcs.answer END) AS "telling_never_ordinary_story",
MAX(CASE WHEN jcs.question = 'asking_to_color' THEN jcs.answer END) AS "asking_to_color",
MAX(CASE WHEN jcs.question = 'showing_kit' THEN jcs.answer END) AS "showing_kit",
MAX(CASE WHEN jcs.question = 'telling_about_sticker_pack' THEN jcs.answer END) AS "telling_about_sticker_pack",
MAX(CASE WHEN jcs.question = 'telling_about_circle_new_journey' THEN jcs.answer END) AS "telling_about_circle_new_journey"

FROM ecrm.joint_calls jc

-- =========================================
-- LOCATION (OUTLET → REGION)
-- =========================================
LEFT JOIN ecrm.locations l_outlet
  ON jc.location_id = l_outlet.id AND l_outlet.type = 8
LEFT JOIN ecrm.locations l_cluster
  ON l_outlet.parent = l_cluster.id AND l_cluster.type = 7
LEFT JOIN ecrm.locations l_route
  ON l_cluster.parent = l_route.id AND l_route.type = 6
LEFT JOIN ecrm.locations l_point
  ON l_route.parent = l_point.id AND l_point.type = 5
LEFT JOIN ecrm.locations l_territory
  ON l_point.parent = l_territory.id AND l_territory.type = 3
LEFT JOIN ecrm.locations l_area
  ON l_territory.parent = l_area.id AND l_area.type = 2
LEFT JOIN ecrm.locations r
  ON l_area.parent = r.id AND r.type = 1

-- =========================================
-- CAMPAIGN
-- =========================================
LEFT JOIN ecrm.campaigns ca
  ON jc.campaign_id = ca.id

-- =========================================
-- APSIS DATA VALIDATION & MAPPING (FIXED SYNTAX)
-- =========================================
LEFT JOIN apsis_data.distributorspoint dp
  ON l_point.name = dp.name
LEFT JOIN apsis_data.company co
  ON dp.dsid = co.id

-- =========================================
-- USERS (SUPERVISOR & BR)
-- =========================================
LEFT JOIN ecrm.users sup
  ON jc.user_id = sup.id
LEFT JOIN ecrm.user_infos sup_i
  ON sup.id = sup_i.user_id

LEFT JOIN ecrm.users br
  ON jc.ff_id = br.id
LEFT JOIN ecrm.user_infos br_i
  ON br.id = br_i.user_id

-- =========================================
-- SURVEY DATA
-- =========================================
LEFT JOIN ecrm.joint_calls_survey_data_maps jcs
  ON jc.id = jcs.joint_call_id

-- =========================================
-- FILTER & STRICT APSIS VALIDATION
-- =========================================
WHERE jc.id = 444487

-- =========================================
-- GROUPING
-- =========================================
GROUP BY
  jc.id,
  r.name,
  l_area.name,
  l_territory.name,
  l_point.name,
  ca.name,
  sup.username,
  sup_i.full_name,
  br.username,
  br_i.full_name,
  jc.contact_date;
