#!/usr/bin/env node

/**
 * Admin Setup Script
 * Makes a user an admin by updating their role in the database
 */

import { db } from '../src/lib/db.js';
import { users } from '../src/drizzle/schema.js';
import { eq } from 'drizzle-orm';

async function makeAdmin(email) {
  try {
    console.log(`\n🔍 Looking for user: ${email}...`);
    
    // Find the user
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length === 0) {
      console.error(`❌ Error: No user found with email "${email}"`);
      console.log('\n💡 Tip: Make sure you\'ve signed in at least once first!');
      process.exit(1);
    }

    const currentUser = user[0];
    
    if (currentUser.role === 'ADMIN') {
      console.log(`✅ User "${email}" is already an ADMIN!`);
      console.log(`   Name: ${currentUser.name || 'Not set'}`);
      console.log(`   Username: ${currentUser.username || 'Not set'}`);
      process.exit(0);
    }

    console.log(`\n📝 Current role: ${currentUser.role}`);
    console.log(`🔄 Updating to: ADMIN\n`);

    // Update to admin
    await db
      .update(users)
      .set({ 
        role: 'ADMIN',
        updatedAt: new Date()
      })
      .where(eq(users.id, currentUser.id));

    console.log(`✅ Success! "${email}" is now an ADMIN!`);
    console.log(`\n🚀 Next steps:`);
    console.log(`   1. Refresh your browser at http://localhost:3000/dashboard`);
    console.log(`   2. You should now see the "Edward Outreach Intelligence" panel`);
    console.log(`   3. Click "🔍 Enrich Contacts" to start finding leads!\n`);

  } catch (error) {
    console.error('❌ Database error:', error.message);
    process.exit(1);
  }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.log('\n📧 Admin Setup Script\n');
  console.log('Usage: npm run make-admin your-email@example.com\n');
  console.log('Example: npm run make-admin john@example.com\n');
  process.exit(1);
}

makeAdmin(email);
