#!/usr/bin/env node

const { neon } = require('@neondatabase/serverless');

const sql = neon('postgresql://postgres.epuxtctndtminhdqjabu:vxjeBFPJelv4eTXV@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres');

async function checkUsers() {
  try {
    const users = await sql`SELECT email, role, name, created_at FROM users ORDER BY created_at DESC LIMIT 10`;
    
    console.log('\n📊 Users in database:', users.length);
    
    if (users.length === 0) {
      console.log('\n❌ NO USERS FOUND!');
      console.log('   You have NOT signed in to the app yet.');
      console.log('\n✅ Go to: http://localhost:3000/auth/signin');
      console.log('   Click "Sign in with Google"');
      console.log('   Use: csuitebrandagency@gmail.com\n');
    } else {
      console.log('\n✅ Users found:\n');
      users.forEach(u => {
        console.log(`   Email: ${u.email}`);
        console.log(`   Role: ${u.role}`);
        console.log(`   Name: ${u.name || 'Not set'}`);
        console.log(`   Created: ${u.created_at}`);
        console.log('');
      });
      
      // Try to update to admin
      const target = users.find(u => u.email === 'csuitebrandagency@gmail.com');
      if (target) {
        await sql`UPDATE users SET role = 'ADMIN' WHERE email = 'csuitebrandagency@gmail.com'`;
        console.log('✅ Updated to ADMIN! Refresh your dashboard.\n');
      } else {
        console.log('❌ csuitebrandagency@gmail.com not found in users\n');
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
  process.exit(0);
}

checkUsers();
