-- =============================================
-- CALL CENTER REPORT
-- =============================================
SELECT
    -- =========================================
    -- CONTACT INFORMATION
    -- =========================================
    cdc.id AS "Contact id",
    
    -- =========================================
    -- LOCATION HIERARCHY
    -- =========================================
    re.name AS "Region",
    ar.name AS "Area",
    ter.name AS "Territory",
    po.name AS "Distributors Point",
    ro.name AS "Route",
    cl.name AS "Cluster",
    
    -- =========================================
    -- USER INFORMATION
    -- =========================================
    br.username AS "User ID",
    br_i.full_name AS "User Name",
    --  =============
    -- AGENCY BASED ON REGION
    -- =========================================
    CASE 
        WHEN re.name IN ('Dhaka South', 'Sylhet') THEN 'Asiatic Trade Marketing Services Limited'
        WHEN re.name IN ('Khulna', 'Barishal', 'Rajshahi') THEN 'Integrated Marketing Service Ltd.'
        ELSE 'IMSL'
    END AS "Agency",
    
    -- =========================================
    -- CAMPAIGN INFORMATION
    -- =========================================
    cam.name AS "Campaign Name",
    
    -- =========================================
    -- CONSUMER DETAILS
    -- =========================================
    cdl.consumer_number AS "Consumer Number",
    TO_CHAR(cdc.start_time, 'MM/DD/YY') AS "Contacted Date",
    TO_CHAR(cdl.last_contact_date, 'MM/DD/YY') AS "Last Contacted Date",
    
    -- =========================================
    -- SURVEY RESPONSES
    -- =========================================
    MAX(CASE WHEN cdsm.question = 'received_phone_call' 
             THEN cdsm.answer END) AS "received_phone_call",
    
    cdl.failed_reason AS "call_not_received_reason",
    
    MAX(CASE WHEN cdsm.question = 'agreed_to_talk' 
             THEN cdsm.answer END) AS "agreed_to_talk",
    
    MAX(CASE WHEN cdsm.question = 'invitation_received'
             THEN cdsm.answer END) AS "invitation_received",
    
    -- =========================================
    -- CONTACT DURATION & STATUS
    -- =========================================
    TO_CHAR(cdc.start_time, 'HH24:MI:SS') AS "Contact Start",
    TO_CHAR(cdc.end_time, 'HH24:MI:SS') AS "Contact End",
    TO_CHAR((cdc.end_time::timestamp - cdc.start_time::timestamp), 'HH24:MI:SS') AS "Contact Duration",
    CASE 
        WHEN cdc.end_time IS NOT NULL AND (cdc.end_time::timestamp - cdc.start_time::timestamp) > '00:00:00'::interval 
             THEN 'Successful'
        WHEN cdl.is_completed = true THEN 'Completed'
        ELSE 'Pending'
    END AS "Contact Status"

FROM ecrm.consumer_dialer_contacts cdc

-- =========================================
-- STEP 1: Connect to consumer_dialer_br_assignments
-- =========================================
LEFT JOIN ecrm.consumer_dialer_br_assignments cdba 
    ON cdc.cdba_id = cdba.id

-- =========================================
-- STEP 2: Connect to consumer_dialer_list
-- =========================================
LEFT JOIN ecrm.consumer_dialer_list cdl 
    ON cdba.cdl_id = cdl.id

-- =========================================
-- STEP 3: Connect to campaigns
-- =========================================
LEFT JOIN ecrm.campaigns cam 
    ON cdl.campaign_id = cam.id

-- =========================================
-- STEP 4: Connect to consumer_dialer_survey_maps
-- =========================================
LEFT JOIN ecrm.consumer_dialer_survey_maps cdsm 
    ON cdc.id = cdsm.cdc_id

-- =========================================
-- BR USER INFORMATION
-- =========================================
LEFT JOIN ecrm.users br 
    ON cdba.br_id = br.id

LEFT JOIN ecrm.user_infos br_i 
    ON br.id = br_i.user_id

-- =========================================
-- LOCATION HIERARCHY
-- Starting from Cluster (type = 7)
-- =========================================
LEFT JOIN ecrm.locations cl
    ON cdl.region_id = cl.id
    AND cl.type = 7  -- Cluster

LEFT JOIN ecrm.locations ro
    ON cl.parent = ro.id
    AND ro.type = 6  -- Route

LEFT JOIN ecrm.locations po
    ON ro.parent = po.id
    AND po.type = 5  -- Distributors Point

LEFT JOIN ecrm.locations ter
    ON po.parent = ter.id
    AND ter.type = 3  -- Territory

LEFT JOIN ecrm.locations ar
    ON ter.parent = ar.id
    AND ar.type = 2  -- Area

LEFT JOIN ecrm.locations re
    ON ar.parent = re.id
    AND re.type = 1  -- Region

-- =========================================
-- FILTER FOR SPECIFIC ID
-- =========================================
WHERE cdc.id = 493001

-- =========================================
-- GROUPING FOR PIVOT
-- =========================================
GROUP BY
    cdc.id,
    re.name,
    ar.name,
    ter.name,
    po.name,
    ro.name,
    cl.name,
    br.username,
    br_i.full_name,
    cam.name,
    cdl.consumer_number,
    cdc.start_time,
    cdl.last_contact_date,
    cdl.failed_reason,
    cdl.is_completed,
    cdc.end_time;
