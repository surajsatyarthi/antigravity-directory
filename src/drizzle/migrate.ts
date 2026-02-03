import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { max: 1 });

async function main() {
  console.log('--- Database Migration Started ---');
  const db = drizzle(client);

  await migrate(db, {
    migrationsFolder: resolve(process.cwd(), 'src/drizzle/migrations'),
  });

  console.log('--- Database Migration Completed ---');
  await client.end();
}

main().catch((err) => {
  console.error('--- Database Migration Failed ---');
  console.error(err);
  process.exit(1);
});
