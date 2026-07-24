const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Use environment variable for JWT secret, fallback to default for development
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-ecrm';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Use environment variable for database connection string, fallback to hardcoded URL
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:Tlvbx74QwdAwIx4x@db.jhfzdtacfedbpktkfabm.supabase.co:5432/postgres';
  
  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false // Required for Supabase connections
    },
  });
  
  try {
    await client.connect();

    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    // Insert audit log
    try {
      await client.query(
        'INSERT INTO audit_logs (username, action, details) VALUES ($1, $2, $3)',
        [user.username, 'Login', `Logged in successfully as role: ${user.role}`]
      );
    } catch (logErr) {
      console.error('Failed to write login audit log:', logErr);
    }

    res.status(200).json({ message: 'Login successful', token, role: user.role, username: user.username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.end();
  }
}
