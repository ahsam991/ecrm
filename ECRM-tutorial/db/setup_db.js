const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:Tlvbx74QwdAwIx4x@db.jhfzdtacfedbpktkfabm.supabase.co:5432/postgres',
});

async function setup() {
  try {
    await client.connect();
    
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create audit_logs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        action VARCHAR(255) NOT NULL,
        details TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create tasks table
    await client.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        priority VARCHAR(50) DEFAULT 'Medium',
        campaign VARCHAR(50) DEFAULT '161',
        status VARCHAR(50) DEFAULT 'Pending',
        assignee VARCHAR(255) DEFAULT 'All Users',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create task_submissions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS task_submissions (
        id SERIAL PRIMARY KEY,
        task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
        username VARCHAR(255) NOT NULL,
        submission_content TEXT NOT NULL,
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed default tasks if empty
    const taskCountResult = await client.query('SELECT COUNT(*) FROM tasks');
    if (parseInt(taskCountResult.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO tasks (title, description, priority, campaign, status, assignee) VALUES
        ('Find Count of Consumer', 'Query the total unique consumer count for campaign 161 from ecrm.contacts using JSONB cast to find fresh vs not-fresh consumers.', 'High', '161', 'Pending', 'All Users'),
        ('RA Wise Contact Duration and Interval', 'Calculate per-RA (user) contact duration and interval between contacts using LEAD() window function on ecrm.contacts filtered by campaign_id=161.', 'Medium', '161', 'Pending', 'All Users'),
        ('Find Total Campaign Duration', 'Determine the overall campaign timeline from first contact to last contact for campaign 161. Use MIN(contact_date) and MAX(contact_date) from ecrm.contacts.', 'Medium', '161', 'Pending', 'All Users'),
        ('Date Wise PTR Achievement', 'Generate date-wise PTR (Points to Reach / target achievement) metrics for campaign 161. Split counts by gift materials (Lighter, Body Spray, etc.).', 'High', '161', 'Pending', 'All Users'),
        ('Outlet Wise PTR Count', 'Aggregate PTR counts grouped by outlet (location type=8) for campaign 161. Useful for identifying high-performing and low-performing outlets.', 'Medium', '161', 'Pending', 'All Users');
      `);
      console.log("Seeded initial tasks!");
    }
    
    console.log("Database initialized successfully with tasks and submissions!");
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

setup();
