-- =========================================================
-- USER DAILY CONTACT ACTIVITY REPORT
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

           -- Duration of this single contact
           (c."end" - c.start)                                AS contact_duration,

           -- Next contact's start (only if same day, else NULL)
         CASE
    WHEN c.contact_date = LEAD(c.contact_date) OVER (
        PARTITION BY c.user_id
        ORDER BY
            c.start
    ) THEN LEAD(c.start) OVER (
        PARTITION BY c.user_id
        ORDER BY
            c.start
    )
    ELSE NULL
END                                               AS next_cont

    FROM
    ecrm.contacts c
    LEFT JOIN ecrm.users u ON c.user_id = u.id
    LEFT JOIN ecrm.user_infos ui ON u.id = ui.user_id
WHERE
    c.campaign_id = 161
    AND c.is_deleted = false
    AND c.start IS NOT NULL
    AND c."end" IS NOT NULL
),

contact_with_interval AS (
    SELECT
           user_id,
           username,
           full_name,
           contact_date,
           id,
           start,
           "end",
           contact_duration,
           next_cont,

           -- Interval = gap between this contact's end and next contact's start (same day only)
           CASE
               WHEN next_cont IS NOT NULL
               THEN next_cont - "end"
               ELSE NULL
           END     AS interval_time

    FROM contact_metrics
)

SELECT
    user_id AS "User ID",
    username AS "User Name",
    full_name AS "Full Name",
    contact_date AS "Contact Date",
    COUNT(id) AS "Total Contacts Per Day",
    MIN(start) AS "First Contact Start",
    MAX("end") AS "Last Contact End",
    SUM(contact_duration) AS "Total Contact Duration",
    COALESCE(SUM(interval_time), INTERVAL '0') AS "Total Interval Between Contacts"
FROM   contact_with_interval
GROUP BY
       user_id,
       username,
       full_name,
       contact_date
ORDER BY
       contact_date DESC,
       user_id      ASC;
