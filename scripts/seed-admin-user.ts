const postgres = require('postgres');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

// Force non-SSL for test DB
const isTestDb = process.env.DATABASE_URL?.includes('localhost') || process.env.DATABASE_URL?.includes('127.0.0.1');
const sql = postgres(process.env.DATABASE_URL, { ssl: isTestDb ? false : 'require' });

const ADMIN_EMAIL = 'directoryantigravity@gmail.com';

async function seedAdminUser() {
  try {
    console.log(`👤 Seeding admin user: ${ADMIN_EMAIL}...`);
    
    await sql`
      INSERT INTO users (id, email, name, role, email_verified, image, created_at, updated_at)
      VALUES (
        ${uuidv4()}, 
        ${ADMIN_EMAIL}, 
        'Antigravity Admin', 
        'ADMIN', 
        NOW(), 
        'https://github.com/shadcn.png', 
        NOW(), 
        NOW()
      )
      ON CONFLICT (email) DO UPDATE SET 
        role = 'ADMIN',
        updated_at = NOW()
    `;
    
    console.log('✅ Admin user seeded successfully!');
  } catch (error) {
    console.error('❌ Failed to seed admin user:', error);
  } finally {
    await sql.end();
  }
}

seedAdminUser();
