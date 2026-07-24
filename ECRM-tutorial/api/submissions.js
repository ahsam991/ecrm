const { Client } = require('pg');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-ecrm';

module.exports = async function handler(req, res) {
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:Tlvbx74QwdAwIx4x@db.jhfzdtacfedbpktkfabm.supabase.co:5432/postgres';
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  if (req.method === 'GET') {
    // Authenticate Admin or Management to view submissions
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized credentials' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.role !== 'admin' && decoded.role !== 'management') {
        return res.status(403).json({ error: 'Access forbidden: Admin or Management role required' });
      }

      await client.connect();
      // Join task submissions with task details
      const result = await client.query(`
        SELECT ts.*, t.title as task_title 
        FROM task_submissions ts
        JOIN tasks t ON ts.task_id = t.id
        ORDER BY ts.submitted_at DESC
      `);
      return res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch task submissions' });
    } finally {
      await client.end();
    }
  } else if (req.method === 'POST') {
    // Authenticate any logged-in user to submit a task
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized credentials' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const { task_id, submission_content } = req.body;

      if (!task_id || !submission_content) {
        return res.status(400).json({ error: 'Task ID and submission content are required' });
      }

      await client.connect();
      
      // Save submission
      const result = await client.query(
        'INSERT INTO task_submissions (task_id, username, submission_content) VALUES ($1, $2, $3) RETURNING *',
        [task_id, decoded.username, submission_content]
      );

      // Audit Log
      try {
        await client.query(
          'INSERT INTO audit_logs (username, action, details) VALUES ($1, $2, $3)',
          [decoded.username, 'SUBMIT_TASK', `Submitted task ID: ${task_id}`]
        );
      } catch (logErr) {
        console.error('Failed to write submission audit log:', logErr);
      }

      return res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to submit task solution' });
    } finally {
      await client.end();
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};
