const { Client } = require('pg');
const bcrypt = require('bcryptjs');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password, role } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:Tlvbx74QwdAwIx4x@db.jhfzdtacfedbpktkfabm.supabase.co:5432/postgres';
  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();

    // Check if user exists
    const existing = await client.query('SELECT id FROM users WHERE username = $1', [username]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    // Assign role, default to 'user' if not provided. Prevent arbitrary role assignment if you want,
    // but for now we accept the role sent from the client or default to 'user'
    const userRole = role || 'user';

    // Insert user
    await client.query(
      'INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3)',
      [username, passwordHash, userRole]
    );

    // Insert audit log
    try {
      await client.query(
        'INSERT INTO audit_logs (username, action, details) VALUES ($1, $2, $3)',
        [username, 'Registration', `Registered new account with role: ${userRole}`]
      );
    } catch (logErr) {
      console.error('Failed to write registration audit log:', logErr);
    }

    res.status(201).json({ message: 'User created successfully', role: userRole });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.end();
  }
}
