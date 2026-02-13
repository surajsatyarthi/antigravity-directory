import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.test.local for TEST database
dotenv.config({ path: resolve(process.cwd(), '.env.test.local') });

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { max: 1 });

async function main() {
  console.log('--- TEST Database Migration Started ---');
  console.log('Using DATABASE_URL:', connectionString.substring(0, 30) + '...');
  const db = drizzle(client);

  await migrate(db, {
    migrationsFolder: resolve(process.cwd(), 'src/drizzle/migrations'),
  });

  console.log('--- TEST Database Migration Completed ---');
  await client.end();
}

main().catch((err) => {
  console.error('--- TEST Database Migration Failed ---');
  console.error(err);
  process.exit(1);
});
