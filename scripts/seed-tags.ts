const postgres = require('postgres');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const isTestDb = process.env.DATABASE_URL?.includes('localhost') || process.env.DATABASE_URL?.includes('127.0.0.1');
const sql = postgres(process.env.DATABASE_URL, { ssl: isTestDb ? false : 'require' });

const sampleTags = [
  { name: 'AI', slug: 'ai' },
  { name: 'Database', slug: 'database' },
  { name: 'Workflow', slug: 'workflow' },
  { name: 'API', slug: 'api' },
  { name: 'Testing', slug: 'testing' },
  { name: 'Automation', slug: 'automation' },
  { name: 'Machine Learning', slug: 'machine-learning' },
  { name: 'DevOps', slug: 'devops' },
];

async function seedTags() {
  try {
    console.log('🏷️  Seeding tags...');
    
    for (const tag of sampleTags) {
      await sql`
        INSERT INTO tags (id, name, slug, created_at)
        VALUES (${uuidv4()}, ${tag.name}, ${tag.slug}, NOW())
        ON CONFLICT (slug) DO UPDATE SET 
          name = EXCLUDED.name
      `;
      console.log(`✅ Seeded tag: ${tag.name}`);
    }
    
    console.log('✨ Tags seeded successfully!');
  } catch (error) {
    console.error('❌ Failed to seed tags:', error);
  } finally {
    await sql.end();
  }
}

seedTags();
