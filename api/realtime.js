const { Client } = require('pg');

module.exports = async function handler(req, res) {
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:Tlvbx74QwdAwIx4x@db.jhfzdtacfedbpktkfabm.supabase.co:5432/postgres';
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  if (req.method === 'GET') {
    try {
      await client.connect();
      const result = await client.query('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 10');
      return res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database query failed' });
    } finally {
      await client.end();
    }
  } else if (req.method === 'POST') {
    const { username, action, details } = req.body;
    if (!username || !action) {
      return res.status(400).json({ error: 'Username and action are required' });
    }

    try {
      await client.connect();
      const result = await client.query(
        'INSERT INTO audit_logs (username, action, details) VALUES ($1, $2, $3) RETURNING *',
        [username, action, details || '']
      );
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database insert failed' });
    } finally {
      await client.end();
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
