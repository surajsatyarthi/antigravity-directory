const postgres = require('postgres');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

const HEALTH_CHECKS = [
  {
    table: 'users',
    minRequired: 1,
    description: 'At least 1 user (admin)',
    fixCommand: 'npx tsx scripts/make-admin.ts',
  },
  {
    table: 'categories',
    minRequired: 5,
    description: 'At least 5 categories',
    fixCommand: 'npx tsx scripts/seed-missing-cats.ts',
  },
  {
    table: 'tags',
    minRequired: 5,
    description: 'At least 5 tags',
    fixCommand: 'npx tsx scripts/seed-tags.ts',
  },
  {
    table: 'resources',
    minRequired: 10,
    description: 'At least 10 resources',
    fixCommand: 'npx tsx scripts/seed.ts OR npx tsx scripts/seed-50-tools.ts',
  },
];

async function checkHealth() {
  console.log('🏥 DATABASE HEALTH CHECK\n');
  console.log('═'.repeat(60));
  
  let allHealthy = true;
  const problemTables = [];
  
  for (const check of HEALTH_CHECKS) {
    try {
      const result = await sql`SELECT COUNT(*) as count FROM ${sql(check.table)}`;
      const count = parseInt(result[0].count);
      
      const isHealthy = count >= check.minRequired;
      const icon = isHealthy ? '✅' : '❌';
      const status = isHealthy ? 'HEALTHY' : 'NEEDS ATTENTION';
      
      console.log(`${icon} ${check.table.toUpperCase()}: ${count} rows (${status})`);
      console.log(`   Required: ${check.minRequired}+ - ${check.description}`);
      
      if (!isHealthy) {
        allHealthy = false;
        problemTables.push(check);
        console.log(`   💡 Fix: ${check.fixCommand}`);
      }
      
      console.log('');
    } catch (error) {
      console.error(`❌ ${check.table.toUpperCase()}: ERROR - ${error.message}\n`);
      allHealthy = false;
      problemTables.push(check);
    }
  }
  
  console.log('═'.repeat(60));
  
  if (allHealthy) {
    console.log('✅ ALL HEALTH CHECKS PASSED - Database is ready!\n');
  } else {
    console.log(`❌ HEALTH CHECK FAILED - ${problemTables.length} table(s) need attention\n`);
    console.log('🔧 SUGGESTED FIXES:\n');
    
    problemTables.forEach((check, index) => {
      console.log(`${index + 1}. ${check.table}: Run -> ${check.fixCommand}`);
    });
    
    console.log('\nAfter running fixes, re-run: npm run health\n');
  }
  
  await sql.end();
  
  // Exit with proper code for CI/CD
  process.exit(allHealthy ? 0 : 1);
}

checkHealth().catch(error => {
  console.error('\n❌ FATAL ERROR:', error.message);
  console.error('\n💡 Check your DATABASE_URL in .env.local\n');
  process.exit(1);
});
