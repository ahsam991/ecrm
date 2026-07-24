const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client({
  connectionString: 'postgresql://postgres:Tlvbx74QwdAwIx4x@db.jhfzdtacfedbpktkfabm.supabase.co:5432/postgres',
});

const accounts = [
  { username: 'admin',      password: 'Admin@1234',  role: 'admin'      },
  { username: 'management', password: 'Mgmt@1234',   role: 'management' },
  { username: 'ahsam',      password: 'User@1234',   role: 'user'       },
];

async function seed() {
  await client.connect();
  console.log('Connected to Supabase ✅\n');

  for (const acc of accounts) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(acc.password, salt);

    // Upsert: insert or update if username already exists
    await client.query(`
      INSERT INTO users (username, password_hash, role)
      VALUES ($1, $2, $3)
      ON CONFLICT (username)
      DO UPDATE SET password_hash = EXCLUDED.password_hash, role = EXCLUDED.role;
    `, [acc.username, hash, acc.role]);

    console.log(`✅  ${acc.role.padEnd(12)} → username: "${acc.username}"  password: "${acc.password}"`);
  }

  console.log('\nAll accounts ready. You can now log in.');
  await client.end();
}

seed().catch(err => { console.error(err); process.exit(1); });
