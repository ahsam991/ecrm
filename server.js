const express = require('express');
const path = require('path');
const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'super-secret-key-for-ecrm';
const DB_URL = 'postgresql://postgres:Tlvbx74QwdAwIx4x@db.jhfzdtacfedbpktkfabm.supabase.co:5432/postgres';

app.use(express.json());
// Serve all static files from this directory
app.use(express.static(path.join(__dirname, 'public')));

// ── POST /api/register ──
app.post('/api/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  const client = new Client({
    connectionString: DB_URL,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    const existing = await client.query('SELECT id FROM users WHERE username = $1', [username]);
    if (existing.rows.length > 0) return res.status(400).json({ error: 'Username already exists' });

    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const userRole = role || 'user';
    await client.query('INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3)', [username, hash, userRole]);

    // Insert audit log
    try {
      await client.query('INSERT INTO audit_logs (username, action, details) VALUES ($1, $2, $3)', [username, 'Registration', `Registered new account with role: ${userRole}`]);
    } catch (logErr) {
      console.error(logErr);
    }

    res.status(201).json({ message: 'User created successfully', role: userRole });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.end();
  }
});

// ── POST /api/login ──
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  const client = new Client({
    connectionString: DB_URL,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    // Insert audit log
    try {
      await client.query('INSERT INTO audit_logs (username, action, details) VALUES ($1, $2, $3)', [user.username, 'Login', `Logged in successfully as role: ${user.role}`]);
    } catch (logErr) {
      console.error(logErr);
    }

    res.status(200).json({ message: 'Login successful', token, role: user.role, username: user.username });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.end();
  }
});

// ── GET /api/realtime ──
app.get('/api/realtime', async (req, res) => {
  const client = new Client({
    connectionString: DB_URL,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 10');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Realtime fetch error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.end();
  }
});

// ── POST /api/realtime ──
app.post('/api/realtime', async (req, res) => {
  const { username, action, details } = req.body;
  if (!username || !action) return res.status(400).json({ error: 'Username and action required' });

  const client = new Client({
    connectionString: DB_URL,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    const result = await client.query(
      'INSERT INTO audit_logs (username, action, details) VALUES ($1, $2, $3) RETURNING *',
      [username, action, details || '']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Realtime log error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.end();
  }
});
// ── GET & POST /api/tasks ──
app.get('/api/tasks', async (req, res) => {
  const client = new Client({
    connectionString: DB_URL,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM tasks ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Fetch tasks error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.end();
  }
});

app.post('/api/tasks', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized credentials' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin' && decoded.role !== 'management') {
      return res.status(403).json({ error: 'Access forbidden' });
    }

    const { title, description, priority, campaign, assignee } = req.body;
    if (!title || !description) return res.status(400).json({ error: 'Title and description required' });

    const client = new Client({
      connectionString: DB_URL,
      ssl: { rejectUnauthorized: false }
    });
    await client.connect();
    const result = await client.query(
      'INSERT INTO tasks (title, description, priority, campaign, status, assignee) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, priority || 'Medium', campaign || '161', 'Pending', assignee || 'All Users']
    );

    // Audit Log
    try {
      await client.query('INSERT INTO audit_logs (username, action, details) VALUES ($1, $2, $3)', [decoded.username, 'CREATE_TASK', `Created task: ${title}`]);
    } catch (logErr) {
      console.error(logErr);
    }

    res.status(201).json(result.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Create task error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── GET & POST /api/submissions ──
app.get('/api/submissions', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized credentials' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin' && decoded.role !== 'management') {
      return res.status(403).json({ error: 'Access forbidden' });
    }

    const client = new Client({
      connectionString: DB_URL,
      ssl: { rejectUnauthorized: false }
    });
    await client.connect();
    const result = await client.query(`
      SELECT ts.*, t.title as task_title 
      FROM task_submissions ts
      JOIN tasks t ON ts.task_id = t.id
      ORDER BY ts.submitted_at DESC
    `);
    res.status(200).json(result.rows);
    await client.end();
  } catch (err) {
    console.error('Fetch submissions error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/submissions', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized credentials' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { task_id, submission_content } = req.body;
    if (!task_id || !submission_content) return res.status(400).json({ error: 'Task ID and solution are required' });

    const client = new Client({
      connectionString: DB_URL,
      ssl: { rejectUnauthorized: false }
    });
    await client.connect();
    const result = await client.query(
      'INSERT INTO task_submissions (task_id, username, submission_content) VALUES ($1, $2, $3) RETURNING *',
      [task_id, decoded.username, submission_content]
    );

    // Audit Log
    try {
      await client.query('INSERT INTO audit_logs (username, action, details) VALUES ($1, $2, $3)', [decoded.username, 'SUBMIT_TASK', `Submitted solution for task ID: ${task_id}`]);
    } catch (logErr) {
      console.error(logErr);
    }

    res.status(201).json(result.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Create submission error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀  ECRM running at http://localhost:${PORT}`);
  console.log(`\n   Credentials:`);
  console.log(`   🔴 Admin      → admin / Admin@1234`);
  console.log(`   🟡 Management → management / Mgmt@1234`);
  console.log(`   🟢 User       → ahsam / User@1234\n`);
});
