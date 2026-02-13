const postgres = require('postgres');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const isTestDb = process.env.DATABASE_URL?.includes('localhost') || process.env.DATABASE_URL?.includes('127.0.0.1');
const sql = postgres(process.env.DATABASE_URL, { ssl: isTestDb ? false : 'require' });

const BASE_CATS = [
  { slug: 'database', name: 'Database', description: 'Databases and storage solutions.', order: 1 },
  { slug: 'analytics', name: 'Analytics', description: 'Product analytics and tracking.', order: 2 },
  { slug: 'auth', name: 'Authentication', description: 'User authentication and management.', order: 3 },
  { slug: 'ai', name: 'AI', description: 'Artificial Intelligence tools and models.', order: 4 },
];

async function seedBaseCats() {
  try {
    for (const cat of BASE_CATS) {
      await sql`
        INSERT INTO categories (id, name, slug, description, "order", created_at, updated_at)
        VALUES (${uuidv4()}, ${cat.name}, ${cat.slug}, ${cat.description}, ${cat.order}, NOW(), NOW())
        ON CONFLICT (slug) DO UPDATE SET 
          name = EXCLUDED.name, 
          description = EXCLUDED.description,
          "order" = EXCLUDED.order
      `;
      console.log(`✅ Upserted base category: ${cat.name}`);
    }
  } catch (e) {
    console.error('Entries failed:', e);
  } finally {
    await sql.end();
  }
}

seedBaseCats();
