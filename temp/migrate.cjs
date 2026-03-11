const { Client } = require('pg');
const fs = require('fs');
const dotenv = require('dotenv');

const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
const client = new Client({
  connectionString: envConfig.DATABASE_URL_UNPOOLED || envConfig.DATABASE_URL,
});

async function migrate() {
  try {
    await client.connect();
    await client.query('ALTER TABLE submissions ALTER COLUMN user_id DROP NOT NULL;');
    console.log('Migration successful');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await client.end();
  }
}

migrate();
