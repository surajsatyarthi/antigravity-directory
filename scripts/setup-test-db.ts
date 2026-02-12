import dotenv from 'dotenv';
import path from 'path';

// Load .env.test.local explicitly
dotenv.config({ path: path.resolve(process.cwd(), '.env.test.local') });
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import fs from 'fs';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { execSync } from 'child_process';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL is not set in environment variables.');
  process.exit(1);
}

const client = postgres(databaseUrl, { max: 1 });
const db = drizzle(client);

async function setupTestDb() {
  console.log('🚀 Starting Test Database Setup...');

  try {
    // 1. Push Drizzle Schema (Create Tables)
    console.log('📦 Pushing Drizzle Schema...');
    // We use drizzle-kit push to ensure the schema matches the code without relying on migration files for this step
    execSync('npx drizzle-kit push', { stdio: 'inherit' });
    console.log('✅ Schema Pushed Successfully.');

    // 2. Apply RLS Policies
    console.log('tao Applying RLS Policies...');
    const rlsSqlPath = path.join(process.cwd(), 'src', 'drizzle', 'rls_policies.sql');
    
    if (fs.existsSync(rlsSqlPath)) {
        const rlsSql = fs.readFileSync(rlsSqlPath, 'utf8');
        // Split by semicolon to execute statements individually, as postgres.js might prefer single statements or we want better error tracking
        // simple split might be fragile with complex SQL but works for basic policies
        await client.unsafe(rlsSql);
        console.log('✅ RLS Policies Applied.');
    } else {
        console.warn('⚠️ RLS Policy file not found at:', rlsSqlPath);
    }

    // 3. (Optional) Seed Data
    // You can call seed script here if needed
    // execSync('npm run seed', { stdio: 'inherit' });

    console.log('🎉 Test Database Setup Complete!');
  } catch (error) {
    console.error('❌ Error setting up test database:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

setupTestDb();
