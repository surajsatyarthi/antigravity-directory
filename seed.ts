
import { db } from './src/lib/db';
import { categories, users } from './src/drizzle/schema';
import { v4 as uuidv4 } from 'uuid';

async function seed() {
  console.log('🌱 Seeding database...');

  // 1. Create Guest User
  const guestId = 'guest-user-id';
  await db.insert(users).values({
    id: guestId,
    email: 'guest@googleantigravity.directory',
    name: 'Guest User',
    role: 'USER',
  }).onConflictDoNothing();

  console.log('✅ Guest user created.');

  // 2. Seed Categories
  const categoryData = [
    { id: uuidv4(), name: 'Prompts', slug: 'prompts', description: 'Curated prompts for high-efficiency AI coding.', order: 1 },
    { id: uuidv4(), name: 'MCP Servers', slug: 'mcp-servers', description: 'Model Context Protocol servers to extend IDE capabilities.', order: 2 },
    { id: uuidv4(), name: 'Rules', slug: 'rules', description: 'System rules and .cursorrules for project-specific behavior.', order: 3 },
    { id: uuidv4(), name: 'Workflows', slug: 'workflows', description: 'End-to-end automation workflows for Antigravity.', order: 4 },
    { id: uuidv4(), name: 'Boilerplates', slug: 'boilerplates', description: 'Starter templates and project scaffolds.', order: 5 },
  ];

  for (const cat of categoryData) {
    await db.insert(categories).values(cat).onConflictDoNothing();
  }

  console.log('✅ Categories seeded.');
  console.log('🎉 Seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
