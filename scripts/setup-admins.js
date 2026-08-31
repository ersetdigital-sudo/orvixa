const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.pnkltvjjoluduivzoabm:Sumedang%4098@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres'
});

async function main() {
  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT UNIQUE NOT NULL,
      display_name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      active BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );
  `);

  await client.query(`ALTER TABLE admins ENABLE ROW LEVEL SECURITY;`);

  // Drop existing policy if any, then create
  await client.query(`DROP POLICY IF EXISTS "Service all admins" ON admins;`);
  await client.query(`CREATE POLICY "Service all admins" ON admins FOR ALL USING (true) WITH CHECK (true);`);

  // Seed first admin (use bcrypt-style hash placeholder, we'll use plain hash for now via crypto)
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256').update('Sumedang@98').digest('hex');

  await client.query(`
    INSERT INTO admins (email, display_name, password_hash, role)
    VALUES ($1, $2, $3, 'super_admin')
    ON CONFLICT (email) DO NOTHING;
  `, ['admin@orvixagaming.net', 'Admin Utama', hash]);

  console.log('DONE - admins table created and seeded');
  await client.end();
}

main().catch(e => { console.error(e.message); process.exit(1); });
