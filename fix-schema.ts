
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;
const sql = postgres(connectionString);

async function fixSchema() {
  try {
    console.log('Renaming columns in categories table...');
    await sql`ALTER TABLE categories RENAME COLUMN "createdAt" TO created_at;`.catch(e => console.log('created_at already exists or error:', e.message));
    await sql`ALTER TABLE categories RENAME COLUMN "updatedAt" TO updated_at;`.catch(e => console.log('updated_at already exists or error:', e.message));
    
    console.log('Renaming columns in resources table...');
    await sql`ALTER TABLE resources RENAME COLUMN "categoryId" TO category_id;`.catch(e => console.log('category_id already exists or error:', e.message));
    await sql`ALTER TABLE resources RENAME COLUMN "authorId" TO author_id;`.catch(e => console.log('author_id already exists or error:', e.message));
    await sql`ALTER TABLE resources RENAME COLUMN "publishedAt" TO published_at;`.catch(e => console.log('published_at already exists or error:', e.message));
    await sql`ALTER TABLE resources RENAME COLUMN "createdAt" TO created_at;`.catch(e => console.log('created_at already exists or error:', e.message));
    await sql`ALTER TABLE resources RENAME COLUMN "updatedAt" TO updated_at;`.catch(e => console.log('updated_at already exists or error:', e.message));
    
    console.log('Renaming columns in users table...');
    await sql`ALTER TABLE users RENAME COLUMN "createdAt" TO created_at;`.catch(e => console.log('created_at already exists or error:', e.message));
    await sql`ALTER TABLE users RENAME COLUMN "updatedAt" TO updated_at;`.catch(e => console.log('updated_at already exists or error:', e.message));

    console.log('Renaming columns in ratings table...');
    await sql`ALTER TABLE ratings RENAME COLUMN "resourceId" TO resource_id;`.catch(e => console.log('resource_id already exists or error:', e.message));
    await sql`ALTER TABLE ratings RENAME COLUMN "userId" TO user_id;`.catch(e => console.log('user_id already exists or error:', e.message));
    await sql`ALTER TABLE ratings RENAME COLUMN "createdAt" TO created_at;`.catch(e => console.log('created_at already exists or error:', e.message));
    await sql`ALTER TABLE ratings RENAME COLUMN "updatedAt" TO updated_at;`.catch(e => console.log('updated_at already exists or error:', e.message));

    console.log('Renaming columns in tags table...');
    await sql`ALTER TABLE tags RENAME COLUMN "createdAt" TO created_at;`.catch(e => console.log('created_at already exists or error:', e.message));

    console.log('Renaming columns in resource_tags table...');
    await sql`ALTER TABLE resource_tags RENAME COLUMN "resourceId" TO resource_id;`.catch(e => console.log('resource_id already exists or error:', e.message));
    await sql`ALTER TABLE resource_tags RENAME COLUMN "tagId" TO tag_id;`.catch(e => console.log('tag_id already exists or error:', e.message));

    console.log('Renaming columns in submissions table...');
    await sql`ALTER TABLE submissions RENAME COLUMN "categoryName" TO category_name;`.catch(e => console.log('category_name already exists or error:', e.message));
    await sql`ALTER TABLE submissions RENAME COLUMN "userId" TO user_id;`.catch(e => console.log('user_id already exists or error:', e.message));
    await sql`ALTER TABLE submissions RENAME COLUMN "createdAt" TO created_at;`.catch(e => console.log('created_at already exists or error:', e.message));
    await sql`ALTER TABLE submissions RENAME COLUMN "updatedAt" TO updated_at;`.catch(e => console.log('updated_at already exists or error:', e.message));

    console.log('Schema transformation complete!');
    process.exit(0);
  } catch (err) {
    console.error('Fatal error during schema transformation:', err);
    process.exit(1);
  }
}

fixSchema();
