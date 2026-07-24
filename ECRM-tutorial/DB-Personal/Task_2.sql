
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
