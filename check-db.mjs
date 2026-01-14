import postgres from 'postgres';

const sql = postgres('postgresql://postgres.epuxtctndtminhdqjabu:vxjeBFPJelv4eTXV@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres');

async function checkUsers() {
  try {
    const users = await sql`SELECT email, role, name, created_at FROM users ORDER BY created_at DESC`;
    
    console.log('\n📊 Users in database:', users.length);
    
    if (users.length === 0) {
      console.log('\n❌ NO USERS FOUND! The users table is empty.');
      console.log('\n   This means you have NOT completed Google sign-in successfully.');
      console.log('\n✅ NEXT STEPS:');
      console.log('   1. Go to: http://localhost:3000/auth/signin');
      console.log('   2. Click "Sign in with Google"');
      console.log('   3. Sign in with: csuitebrandagency@gmail.com');
      console.log('   4. Check if you see any errors in the browser console\n');
    } else {
      console.log('\n✅ Users found:\n');
      users.forEach(u => {
        console.log(`   Email: ${u.email}`);
        console.log(`   Role: ${u.role}`);
        console.log(`   Name: ${u.name || 'Not set'}`);
        console.log('');
      });
      
      // Try to update to admin
      const target = users.find(u => u.email === 'csuitebrandagency@gmail.com');
      if (target && target.role !== 'ADMIN') {
        await sql`UPDATE users SET role = 'ADMIN', updated_at = NOW() WHERE email = 'csuitebrandagency@gmail.com'`;
        console.log('✅ UPDATED TO ADMIN! Refresh http://localhost:3000/dashboard\n');
      } else if (target) {
        console.log('✅ You are already ADMIN!\n');
      } else {
        console.log(`❌ csuitebrandagency@gmail.com not found\n`);
        console.log('   Found emails:', users.map(u => u.email).join(', '));
      }
    }
  } catch (error) {
    console.error('\n❌ Database Error:', error.message);
  } finally {
    await sql.end();
    process.exit(0);
  }
}

checkUsers();
