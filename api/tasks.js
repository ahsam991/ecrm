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
    try {
      await client.connect();
      const result = await client.query('SELECT * FROM tasks ORDER BY id ASC');
      return res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch tasks' });
    } finally {
      await client.end();
    }
  } else if (req.method === 'POST') {
    // Authenticate Admin or Management
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

      const { title, description, priority, campaign, assignee } = req.body;
      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
      }

      await client.connect();
      const result = await client.query(
        'INSERT INTO tasks (title, description, priority, campaign, status, assignee) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [title, description, priority || 'Medium', campaign || '161', 'Pending', assignee || 'All Users']
      );

      // Audit Log
      try {
        await client.query(
          'INSERT INTO audit_logs (username, action, details) VALUES ($1, $2, $3)',
          [decoded.username, 'CREATE_TASK', `Created new task: ${title}`]
        );
      } catch (logErr) {
        console.error('Failed to write task audit log:', logErr);
      }

      return res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to create task' });
    } finally {
      await client.end();
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};
