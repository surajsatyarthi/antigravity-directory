import { db } from './db';
import { users } from '../drizzle/schema';
import { isNull, eq } from 'drizzle-orm';

async function migrateUsernames() {
  console.log('🔄 Migrating usernames for existing users...');

  const existingUsers = await db.select().from(users).where(isNull(users.username));

  console.log(`Found ${existingUsers.length} users without usernames.`);

  for (const user of existingUsers) {
    let baseUsername = user.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Fallback if email prefix is empty or invalid
    if (!baseUsername) {
      baseUsername = 'user';
    }

    // Ensure uniqueness
    let username = baseUsername;
    let counter = 1;
    
    while (true) {
      const existing = await db.select().from(users).where(eq(users.username, username));
      if (existing.length === 0) break;
      username = `${baseUsername}${counter}`;
      counter++;
    }

    await db.update(users).set({ username }).where(eq(users.id, user.id));
    console.log(`✅ Assigned username "${username}" to user ${user.email}`);
  }

  console.log('✨ Username migration complete!');
}

migrateUsernames()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  });
