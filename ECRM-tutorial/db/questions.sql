-- =========================================================
-- ECRM POSTGRESQL TASKS & QUERIES
-- =========================================================


-- =========================================================
-- TASK 1:
-- FIND TOTAL CONSUMER COUNT
-- FRESH CONSUMER vs NOT FRESH CONSUMER
-- Campaign : 161
-- Date     : 2025-10-20 to Current Date
-- =========================================================

SELECT
       c.contact_date AS "Contact Date",

       COUNT( c.consumer_id) AS "Total Consumers",

       COUNT(  CASE WHEN c.additional_info::jsonb ->> 'fresh_consumer' = 'true'
                THEN c.consumer_id
            END
       ) AS "Fresh Consumer",

       COUNT(  CASE WHEN c.additional_info::jsonb ->> 'fresh_consumer' <> 'true'
                     OR c.additional_info IS NULL
                THEN c.consumer_id
            END
       ) AS "Not Fresh Consumer"
       

FROM ecrm.contacts c

WHERE c.campaign_id = 161
  AND c.contact_date >= DATE '2025-10-20'
  AND c.is_deleted = false

GROUP BY
       c.contact_date

ORDER BY
       c.contact_date DESC;



-- =========================================================
-- TASK 2:
-- RA WISE CONTACT DURATION & INTERVAL
-- Campaign : 161
-- Date     : 2025-10-20
-- =========================================================

WITH contact_metrics AS (

    SELECT
           c.user_id,
           u.username,
           ui.full_name,
           c.contact_date,
           c.id,
           c.start,
           c."end",

           (c."end" - c.start) AS contact_duration,

           CASE
               WHEN c.contact_date = LEAD(c.contact_date) OVER (
                        PARTITION BY c.user_id
                        ORDER BY c.start
                    )
               THEN LEAD(c.start) OVER (
                        PARTITION BY c.user_id
                        ORDER BY c.start
                    ) - c."end"

               ELSE NULL
           END AS interval_time

    FROM ecrm.contacts c

         LEFT JOIN ecrm.users u
                ON c.user_id = u.id

         LEFT JOIN ecrm.user_infos ui
                ON u.id = ui.user_id

    WHERE c.campaign_id = 161
      AND c.contact_date = DATE '2025-10-20'
      AND c.is_deleted = false
      AND c.start IS NOT NULL
      AND c."end" IS NOT NULL
),

daily_summary AS (

    SELECT
           user_id,
           username,
           full_name,

           COUNT(id) AS total_contacts,

           SUM(contact_duration) AS total_contact_duration,

           COALESCE(
               SUM(interval_time),
               INTERVAL '0 second'
           ) AS total_interval

    FROM contact_metrics

    GROUP BY
           user_id,
           username,
           full_name
)

SELECT
       user_id AS "User ID",

       username AS "User Name",

       full_name AS "Full Name",

       total_contacts AS "Total Contacts",

       total_contact_duration AS "Total Contact Duration",

       total_interval AS "Total Interval Between Contacts"

FROM daily_summary

ORDER BY
       user_id ASC;



-- =========================================================
-- TASK 3:
-- TOTAL CAMPAIGN DURATION
-- Campaign : 161
-- =========================================================

SELECT
       MIN(contact_date) AS "Campaign Start Date",

       MAX(contact_date) AS "Campaign End Date",

       (
           MAX(contact_date) - MIN(contact_date)
       ) + 1 AS "Total Campaign Duration (Days)"

FROM ecrm.contacts

WHERE campaign_id = 161
  AND is_deleted = false;



-- =========================================================
-- TASK 4:
-- DATE WISE TOTAL PTR ACHIEVE
-- AND EACH PTR SPLIT
-- Campaign : 161
-- =========================================================

SELECT
       c.contact_date AS "Contact Date",

       COUNT(c.giveable) AS "Total PTR Achieve",

       COUNT(
            CASE
                WHEN m.name = 'Lighter'
                     OR c.giveable = 7
                THEN 1
            END
       ) AS "Lighter",

       COUNT(
            CASE
                WHEN m.name = 'Pocket Body Spray'
                     OR c.giveable = 135
                THEN 1
            END
       ) AS "Pocket Body Spray",

       COUNT(
            CASE
                WHEN m.name = 'Xcel Gum'
                     OR c.giveable = 138
                THEN 1
            END
       ) AS "Xcel Gum",

       COUNT(
            CASE
                WHEN m.name = 'Swapping'
                     OR c.giveable = 140
                THEN 1
            END
       ) AS "Swapping",

       COUNT(
            CASE
                WHEN m.name = 'Biker Jacket'
                     OR c.giveable = 152
                THEN 1
            END
       ) AS "Biker Jacket"

FROM ecrm.contacts c

     LEFT JOIN ecrm.materials m
            ON c.giveable = m.id

WHERE c.campaign_id = 161
  AND c.is_deleted = false
  AND c.contact_date >= DATE '2025-10-20'

GROUP BY
       c.contact_date

ORDER BY
       c.contact_date DESC;



-- =========================================================
-- TASK 5:
-- OUTLET WISE PTR COUNT
-- Campaign : 161
-- =========================================================

SELECT 
    ou.retailer_code AS "Retailer Code",
    c.contact_date AS "Contact Date",
    COUNT(c.id) AS "Total Contacts",
    COUNT(CASE WHEN m.name = 'Lighter' OR c.giveable = 7 THEN 1 END) AS "Lighter",
    COUNT(CASE WHEN m.name = 'Pocket Body Spray' OR c.giveable = 135 THEN 1 END) AS "Pocket Body Spray",
    COUNT(CASE WHEN m.name = 'Xcel Gum' OR c.giveable = 138 THEN 1 END) AS "Xcel Gum",
    COUNT(CASE WHEN m.name = 'Swapping' OR c.giveable = 140 THEN 1 END) AS "Swapping",
    COUNT(CASE WHEN m.name = 'Biker Jacket' OR c.giveable = 152 THEN 1 END) AS "Biker Jacket",
    COUNT(CASE WHEN c.giveable IS NULL 
                OR CAST(c.giveable AS TEXT) IN ('null', 'none', '0', 'None','NULL', '')
                OR c.giveable = 0 THEN 1 END) AS "No PTR"
FROM ecrm.contacts c
LEFT JOIN ecrm.materials m ON c.giveable = m.id AND m.is_deleted = false
LEFT JOIN ecrm.outlets_u ou ON c.location_id = ou.location_id
WHERE c.campaign_id = 161
    AND c.is_deleted = false
    -- AND c.contact_date >= '2025-10-20'
GROUP BY ou.retailer_code, c.contact_date
ORDER BY c.contact_date DESC, ou.retailer_code
LIMIT 200;


-- ===================================================================
-- REPORT: Contact Survey Data Report
-- ===================================================================
-- PURPOSE: This query generates a comprehensive report combining contact 
--          information, location hierarchy, consumer details, and survey answers
-- ===================================================================

-- ===================================================================
-- SELECT PART: Choosing which columns to display
-- ===================================================================
SELECT
    -- ============================================================
    -- BASIC CONTACT INFORMATION
    -- ============================================================
    c.id AS "Contact ID",                    -- Primary key from contacts table
    l_outlet.id AS "Location ID",            -- Outlet's unique identifier
    
    -- ============================================================
    -- LOCATION HIERARCHY (From highest to lowest level)
    -- ============================================================
    r.name AS "Region",                      -- Type 1: Highest level (Region)
    l_area.name AS "Area",                   -- Type 2: Area under region
    l_territory.name AS "Territory",         -- Type 3: Territory under area
    l_point.name AS "Distributorspoint",     -- Type 5: Distributor point
    l_route.name AS "Routes",                -- Type 6: Route under distributor
    l_cluster.name AS "Cluster Name",        -- Type 7: Cluster under route
    l_outlet.name AS "Outlets Name",         -- Type 8: Lowest level (Outlet)
    
    -- ============================================================
    -- USER AND CAMPAIGN INFORMATION
    -- ============================================================
    c.contacted_br AS "User Name",           -- Username who conducted survey
    ui.full_name AS "BR Name",               -- Full name of the user
    ca.name AS "Campaign Name",              -- Campaign associated with contact
    
    -- ============================================================
    -- CONTACT DETAILS
    -- ============================================================
    c.contact_date AS "Contact Date",        -- When contact happened
    c.contact_no AS "Consumer Number",       -- Consumer's phone number
    
    -- ============================================================
    -- CONSUMER PERSONAL INFORMATION
    -- ============================================================
    co.name AS "Consumer Name",              -- Consumer's full name
    co.fathers_name AS "Consumers fathers_name", -- Father's name
    AGE(current_date, co.dob) as "AGE",      -- Calculate age from date of birth
    co.address AS "Consumer Address",        -- Residential address
    co.profession AS "Consumer Occupation",  -- Job/Occupation type
    
    -- ============================================================
    -- BRAND INFORMATION
    -- ============================================================
    pr.name AS "Primary Brand",              -- Primary brand name (from products table)
    sr.name AS "Secondary Brand",            -- Secondary brand name (from products table)
    
    -- ============================================================
    -- CONTACT TIMING DETAILS
    -- ============================================================
    TO_CHAR(c.start AT TIME ZONE 'Asia/Dhaka', 'HH24:MI:SS') as "Contact Start",  -- Start time (Bangladesh timezone)
    TO_CHAR(c.end AT TIME ZONE 'Asia/Dhaka','HH24:MI:SS') as "Contact End",      -- End time (Bangladesh timezone)
    (c.end - c.start) AS "Contact Duration",    -- Total duration of contact (End - Start)
    
    -- ============================================================
    -- MEDIA AND SIGNATURE
    -- ============================================================
    c.signature AS "Contact Picture",        -- Signature or picture filename
    
    -- ============================================================
    -- SURVEY QUESTIONS ANSWERS (PIVOTED from rows to columns)
    -- ============================================================
    -- HOW THIS WORKS:
    -- Without this: 1 contact = 3 rows (one per question)
    -- With this:     1 contact = 1 row (all answers as separate columns)
    -- 
    -- CASE WHEN: Checks if question matches, returns answer if YES, else NULL
    -- MAX():      Groups multiple rows into one, picks the non-NULL value
    -- ============================================================
    MAX(CASE WHEN cs.question = 'asking_about_kit' THEN cs.answer END) AS "asking_about_kit",
    MAX(CASE WHEN cs.question = 'asking_about_travel_kit_preference' THEN cs.answer END) AS "asking_about_travel_kit_preference",
    MAX(CASE WHEN cs.question = 'social_media_info' THEN cs.answer END) AS "social_media_info"

-- ===================================================================
-- FROM PART: Main table and all JOINs
-- ===================================================================
FROM
    ecrm.contacts c                       -- Main table (contacts)
    
    -- ============================================================
    -- LOCATION HIERARCHY JOINS (Bottom to Top)
    -- ============================================================
    -- Type 8: Outlet (starting point)
    JOIN ecrm.locations l_outlet 
        ON c.location_id = l_outlet.id
        AND l_outlet.type = 8
        
    -- Type 7: Cluster (parent of outlet)
    LEFT JOIN ecrm.locations l_cluster 
        ON l_outlet.parent = l_cluster.id
        AND l_cluster.type = 7
        
    -- Type 6: Route (parent of cluster)
    LEFT JOIN ecrm.locations l_route 
        ON l_cluster.parent = l_route.id
        AND l_route.type = 6
        
    -- Type 5: Distributor Point (parent of route)
    LEFT JOIN ecrm.locations l_point 
        ON l_route.parent = l_point.id
        AND l_point.type = 5
        
    -- Type 3: Territory (parent of distributor point)
    LEFT JOIN ecrm.locations l_territory 
        ON l_point.parent = l_territory.id
        AND l_territory.type = 3
        
    -- Type 2: Area (parent of territory)
    LEFT JOIN ecrm.locations l_area 
        ON l_territory.parent = l_area.id
        AND l_area.type = 2
        
    -- Type 1: Region (parent of area - highest level)
    LEFT JOIN ecrm.locations r 
        ON l_area.parent = r.id
        AND r.type = 1
    
    -- ============================================================
    -- USER AND CAMPAIGN JOINS
    -- ============================================================
    LEFT JOIN ecrm.user_infos ui 
        ON c.user_id = ui.user_id          -- Get user details
        
    LEFT JOIN ecrm.campaigns ca 
        ON c.campaign_id = ca.id           -- Get campaign details
    
    -- ============================================================
    -- CONSUMER JOIN
    -- ============================================================
    LEFT JOIN ecrm.consumers co 
        ON c.contact_no = co.contact_no    -- Match by phone number
    
    -- ============================================================
    -- PRODUCT JOINS
    -- ============================================================
    LEFT JOIN ecrm.products pr 
        ON c.product = pr.id               -- Primary brand
    LEFT JOIN ecrm.products sr 
        ON c.secondary_brand = sr.id       -- Secondary brand
    
    -- ============================================================
    -- SURVEY DATA JOIN (SINGLE JOIN - Most important!)
    -- ============================================================
    -- IMPORTANT: This is a single JOIN that fetches ALL survey answers
    -- The CASE WHEN + MAX() in SELECT pivots rows into columns
    -- ============================================================
    JOIN ecrm.contact_survey_data_maps cs 
        ON c.id = cs.contact_id
        -- No question filter here! All questions come through
        -- The SELECT part decides which questions to show

-- ===================================================================
-- WHERE PART: Filter conditions
-- ===================================================================
WHERE
    c.id = 12429776                       -- Filter specific contact (remove for all contacts)
    -- Add more filters as needed:
    -- AND c.contact_date >= '2025-01-01'   -- Date range filter
    -- AND ca.name = 'Campaign Name'        -- Campaign filter

-- ===================================================================
-- GROUP BY PART: Required for MAX() aggregate function
-- ===================================================================
-- IMPORTANT: All columns in SELECT must be either:
-- 1. In GROUP BY, OR
-- 2. Used in an aggregate function (like MAX)
-- ===================================================================
GROUP BY 
    c.id,                                 -- Contact ID
    l_outlet.id,                          -- Location ID
    r.name,                               -- Region
    l_area.name,                          -- Area
    l_territory.name,                     -- Territory
    l_point.name,                         -- Distributor point
    l_route.name,                         -- Route
    l_cluster.name,                       -- Cluster
    l_outlet.name,                        -- Outlet name
    c.contacted_br,                       -- Username
    ui.full_name,                         -- BR name
    ca.name,                              -- Campaign name
    c.contact_date,                       -- Contact date
    c.contact_no,                         -- Consumer number
    co.name,                              -- Consumer name
    co.fathers_name,                      -- Father's name
    co.dob,                               -- Date of birth
    co.address,                           -- Address
    co.profession,                        -- Occupation
    pr.name,                              -- Primary brand
    sr.name,                              -- Secondary brand
    c.start,                              -- Start time
    c.end,                                -- End time
    c.signature;                          -- Signature picture

-- ===================================================================
-- NOTES FOR UNDERSTANDING:
-- ===================================================================
-- 1. LEFT JOIN vs JOIN:
--    - JOIN (INNER): Only returns matching rows from both tables
--    - LEFT JOIN: Returns all rows from left table, even if no match in right
--
-- 2. PIVOT Logic (Rows to Columns):
--    - Without aggregation: 1 contact = 3 rows (bad for reporting)
--    - With CASE + MAX: 1 contact = 1 row (perfect for reporting)
--
-- 3. GROUP BY Necessity:
--    - When using MAX(), all other SELECT columns must be in GROUP BY
--    - This groups multiple rows into one row per contact
--
-- 4. Timezone Conversion:
--    - Data stored in UTC (+00)
--    - 'Asia/Dhaka' is UTC+6
--    - AT TIME ZONE converts to local time
--
-- 5. To remove filter (get all contacts):
--    - Delete line: WHERE c.id = 12429776
--    - Add new filters as needed
-- ===================================================================

-- ===================================================================
-- COMMON MODIFICATIONS:
-- ===================================================================
-- Add more survey questions:
--    MAX(CASE WHEN cs.question = 'your_question_here' THEN cs.answer END) AS "your_question_name"
--
-- Add date range filter:
--    AND c.contact_date BETWEEN '2025-01-01' AND '2025-12-31'
--
-- Order by specific column:
-- ORDER BY c.contact_date DESC
--
-- Limit number of rows:
-- LIMIT 100
-- ===================================================================
