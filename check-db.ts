
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;
const sql = postgres(connectionString);

async function checkSchema() {
  try {
    const columns = await sql`
      SELECT table_name, column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name IN ('resources', 'categories');
    `;
    console.log('Current Database Columns:');
    console.table(columns);
    process.exit(0);
  } catch (err) {
    console.error('Error checking schema:', err);
    process.exit(1);
  }
}

checkSchema();
