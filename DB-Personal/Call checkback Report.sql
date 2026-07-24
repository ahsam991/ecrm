SELECT
       -- =========================================
       -- CONTACT INFORMATION
       -- =========================================
       sc.id AS "Contact ID",

       -- =========================================
       -- LOCATION HIERARCHY
       -- =========================================
       re.name AS "Region",
       ar.name AS "Area",
       ter.name AS "Territory",
       po.name AS "Distributorspoint",

       -- =========================================
       -- CAMPAIGN
       -- =========================================
       cm.name AS "Campaign Name",

       -- =========================================
       -- SUPERVISOR INFORMATION
       -- =========================================
       sup.username AS "Sup ID",
       sup_i.full_name AS "Sup Name",

       -- =========================================
       -- BR INFORMATION
       -- =========================================
       br.username AS "BR ID",
       br_i.full_name AS "BR Name",

       -- =========================================
       -- CONTACT DATE
       -- =========================================
       sc.contact_date AS "Contact Date",

       -- =========================================
       -- SURVEY RESPONSE PIVOT
       -- =========================================
       MAX(CASE WHEN scs.question = 'receive_call'
                THEN scs.answer END) AS "receive_call",

       MAX(CASE WHEN scs.question = 'continue_conversation'
                THEN scs.answer END) AS "continue_conversation",

       MAX(CASE WHEN scs.question = 'correct_consumer_name'
                THEN scs.answer END) AS "correct_consumer_name",

       MAX(CASE WHEN scs.question = 'correct_consumer_age'
                THEN scs.answer END) AS "correct_consumer_age",

       MAX(CASE WHEN scs.question = 'correct_primary_brand'
                THEN scs.answer END) AS "correct_primary_brand",

       MAX(CASE WHEN scs.question = 'contacted_by_ra'
                THEN scs.answer END) AS "contacted_by_ra",

       MAX(CASE WHEN scs.question = 'telling_about_lucky_strike'
                THEN scs.answer END) AS "telling_about_lucky_strike",

       MAX(CASE WHEN scs.question = 'showing_av'
                THEN scs.answer END) AS "showing_av",

       MAX(CASE WHEN scs.question = 'telling_about_circle'
                THEN scs.answer END) AS "telling_about_circle",

       MAX(CASE WHEN scs.question = 'telling_about_circle2'
                THEN scs.answer END) AS "telling_about_circle2",

       MAX(CASE WHEN scs.question = 'telling_about_circle3'
                THEN scs.answer END) AS "telling_about_circle3",

       MAX(CASE WHEN scs.question = 'showing_global_series'
                THEN scs.answer END) AS "showing_global_series",

       MAX(CASE WHEN scs.question = 'telling_never_ordinary_story'
                THEN scs.answer END) AS "telling_never_ordinary_story",

       MAX(CASE WHEN scs.question = 'asking_to_color'
                THEN scs.answer END) AS "asking_to_color",

       MAX(CASE WHEN scs.question = 'showing_kit'
                THEN scs.answer END) AS "showing_kit",

       MAX(CASE WHEN scs.question = 'telling_about_sticker_pack'
                THEN scs.answer END) AS "telling_about_sticker_pack",

       MAX(CASE WHEN scs.question = 'telling_about_circle_new_journey'
                THEN scs.answer END) AS "telling_about_circle_new_journey"

FROM ecrm.supervisor_contacts sc

     -- =========================================
     -- CONTACT MATCHING
     -- Match consumer contact with contacts table
     -- using contact number, BR, campaign and date
     -- =========================================
     LEFT JOIN ecrm.contacts c
            ON sc.contact = c.contact_no
           AND sc.br_id = c.user_id
           AND sc.campaign_id = c.campaign_id
           AND sc.contact_date = c.contact_date

     -- =========================================
     -- LOCATION HIERARCHY
     -- Outlet -> Cluster -> Route -> Point
     -- -> Territory -> Area -> Region
     -- =========================================
     LEFT JOIN ecrm.locations ou
            ON c.location_id = ou.id
           AND ou.type = 8

     LEFT JOIN ecrm.locations cl
            ON ou.parent = cl.id
           AND cl.type = 7

     LEFT JOIN ecrm.locations ro
            ON cl.parent = ro.id
           AND ro.type = 6

     LEFT JOIN ecrm.locations po
            ON ro.parent = po.id
           AND po.type = 5

     LEFT JOIN ecrm.locations ter
            ON po.parent = ter.id
           AND ter.type = 3

     LEFT JOIN ecrm.locations ar
            ON ter.parent = ar.id
           AND ar.type = 2

     LEFT JOIN ecrm.locations re
            ON ar.parent = re.id
           AND re.type = 1

     -- =========================================
     -- APSIS DISTRIBUTOR MAPPING
     -- =========================================
     LEFT JOIN apsis_data.distributorspoint dp
            ON po.source_id = dp.id

     LEFT JOIN apsis_data.company co
            ON dp.dsid = co.id

     -- =========================================
     -- SUPERVISOR INFORMATION
     -- =========================================
     LEFT JOIN ecrm.users sup
            ON sc.user_id = sup.id

     LEFT JOIN ecrm.user_infos sup_i
            ON sup.id = sup_i.user_id

     -- =========================================
     -- BR INFORMATION
     -- =========================================
     LEFT JOIN ecrm.users br
            ON sc.br_id = br.id

     LEFT JOIN ecrm.user_infos br_i
            ON br.id = br_i.user_id

     -- =========================================
     -- CAMPAIGN INFORMATION
     -- =========================================
     LEFT JOIN ecrm.campaigns cm
            ON sc.campaign_id = cm.id

     -- =========================================
     -- SURVEY ANSWERS
     -- =========================================
     LEFT JOIN ecrm.supervisor_contact_survey_data_maps scs
            ON sc.id = scs.sup_contact_id

-- =========================================
-- FILTER
-- =========================================
WHERE sc.id = 495011

-- =========================================
-- GROUPING
-- Required because of aggregate pivoting
-- =========================================
GROUP BY
       sc.id,
       re.name,
       ar.name,
       ter.name,
       po.name,
       cm.name,
       sup.username,
       sup_i.full_name,
       br.username,
       br_i.full_name,
       sc.contact_date;
