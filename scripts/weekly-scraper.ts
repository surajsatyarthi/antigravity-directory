import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import { writeFileSync, existsSync, readFileSync } from 'fs';

// Add global error handlers
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught exception:', err);
  process.exit(1);
});

// Load .env.local if it exists (local dev), otherwise use environment variables (GitHub Actions)
config({ path: resolve(process.cwd(), '.env.local') });

// Validate DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set!');
  console.error('   Please add it to GitHub Secrets or .env.local');
  process.exit(1);
}

console.log('✅ DATABASE_URL is set');
console.log(`📍 Connecting to database...`);

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

/**
 * Weekly Content Scraper with Approval Workflow
 * 
 * Step 1: Run discovery mode to find new content
 *   → npx tsx scripts/weekly-scraper.ts discover
 * 
 * Step 2: Review the generated pending-resources.json file
 * 
 * Step 3: Approve and import the reviewed content
 *   → npx tsx scripts/weekly-scraper.ts import
 * 
 * This prevents uncurated content from being added automatically.
 */

interface PendingResource {
  title: string;
  description: string;
  url: string;
  category: string;
  stars?: number;
  source: string;
  approved?: boolean;
}

const PENDING_FILE = './scripts/pending-resources.json';

async function discoverMode() {
  console.log('🔍 DISCOVERY MODE: Finding new content...\n');
  
  const pendingResources: PendingResource[] = [];

  try {
    // 1. Sync GitHub Stars for existing resources
    console.log('⭐ Syncing GitHub Stars (existing resources)...');
    const githubResources = await sql`
      SELECT id, title, url, github_stars 
      FROM resources 
      WHERE url LIKE '%github.com%' 
      ORDER BY github_stars DESC NULLS LAST
      LIMIT 50
    `;
    
    let updatedCount = 0;
    for (const resource of githubResources) {
      try {
        const match = resource.url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) continue;
        
        const [, owner, repo] = match;
        const cleanRepo = repo.split('/')[0].split('#')[0].split('?')[0];
        
        const response = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}`, {
          headers: { 
            'User-Agent': 'Antigravity-Directory/1.0',
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        
        if (response.ok) {
          const data: any = await response.json();
          const oldStars = resource.github_stars || 0;
          const newStars = data.stargazers_count;
          const growth = newStars - oldStars;
          
          await sql`
            UPDATE resources 
            SET 
              github_stars = ${newStars},
              github_forks = ${data.forks_count},
              last_validated_at = NOW()
            WHERE id = ${resource.id}
          `;
          
          if (growth > 0) {
            console.log(`  ↗️  ${resource.title}: ${oldStars} → ${newStars} (+${growth} stars)`);
          }
          updatedCount++;
        }
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 1100));
      } catch (err) {
        // Silent fail for individual resources
      }
    }
    
    console.log(`\n✅ Updated ${updatedCount} GitHub resources\n`);
    
    // 2. Discover new content (placeholder - actual scraping would go here)
    console.log('🔍 Discovering new content sources...\n');
    
    console.log('📋 Sources to manually check:');
    console.log('  → https://github.com/modelcontextprotocol/servers (MCP Servers)');
    console.log('  → https://github.com/punkpeye/awesome-mcp-servers (MCP Servers)');
    console.log('  → https://vercel.com/templates (Boilerplates)');
    console.log('  → https://n8n.io/workflows (Workflows)');
    console.log('  → https://github.com/topics/nextjs-template (Boilerplates)');
    console.log('  → https://cursor.directory (Rules)\n');
    
    // Example: Add some discovered items for demonstration
    // In production, this would be automated scraping
    const exampleDiscoveries: PendingResource[] = [
      {
        title: 'Example MCP Server',
        description: 'A newly discovered MCP server from GitHub',
        url: 'https://github.com/example/mcp-server',
        category: 'mcp-servers',
        stars: 150,
        source: 'github-search',
        approved: false
      },
      // Add more as discovered...
    ];
    
    pendingResources.push(...exampleDiscoveries);
    
    // 3. Save to pending file
    writeFileSync(PENDING_FILE, JSON.stringify(pendingResources, null, 2));
    
    console.log(`📄 Saved ${pendingResources.length} pending resources to: ${PENDING_FILE}`);
    console.log('\n🔎 NEXT STEPS:');
    console.log('  1. Review the pending-resources.json file');
    console.log('  2. Set "approved: true" for items you want to import');
    console.log('  3. Run: npx tsx scripts/weekly-scraper.ts import\n');
    
  } catch (error) {
    console.error('❌ Discovery failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

async function importMode() {
  console.log('📥 IMPORT MODE: Adding approved resources...\n');
  
  if (!existsSync(PENDING_FILE)) {
    console.error('❌ No pending-resources.json found. Run discovery first.');
    process.exit(1);
  }
  
  const pending: PendingResource[] = JSON.parse(readFileSync(PENDING_FILE, 'utf-8'));
  const approved = pending.filter(r => r.approved === true);
  
  if (approved.length === 0) {
    console.log('⚠️  No approved resources found. Mark items with "approved: true" first.');
    process.exit(0);
  }
  
  console.log(`✅ Found ${approved.length} approved resources to import\n`);
  
  try {
    const categoriesList = await sql`SELECT id, slug FROM categories`;
    const [admin] = await sql`SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1`;
    const adminId = admin?.id || 'default-admin-id';
    
    let importedCount = 0;
    for (const resource of approved) {
      const categoryId = categoriesList.find(c => c.slug === resource.category)?.id;
      
      if (!categoryId) {
        console.warn(`⚠️  Category "${resource.category}" not found for: ${resource.title}`);
        continue;
      }
      
      const slug = resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      try {
        await sql`
          INSERT INTO resources (
            id, title, slug, description, url, category_id, author_id, 
            verified, featured, github_stars, is_indexed, last_validated_at
          ) VALUES (
            gen_random_uuid(), 
            ${resource.title}, 
            ${slug}, 
            ${resource.description}, 
            ${resource.url}, 
            ${categoryId}, 
            ${adminId},
            true,
            ${(resource.stars || 0) > 5000},
            ${resource.stars || 0},
            false,
            NOW()
          )
          ON CONFLICT (slug) DO NOTHING
        `;
        console.log(`✅ Imported: ${resource.title}`);
        importedCount++;
      } catch (err) {
        console.warn(`⚠️  Failed to import: ${resource.title}`);
      }
    }
    
    console.log(`\n🎉 Successfully imported ${importedCount} resources!`);
    console.log('\n💡 TIP: Archive or delete pending-resources.json when done.\n');
    
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

// Main execution
const mode = process.argv[2];

if (mode === 'discover') {
  discoverMode();
} else if (mode === 'import') {
  importMode();
} else {
  console.log('📅 Weekly Content Scraper with Approval Workflow\n');
  console.log('Usage:');
  console.log('  npx tsx scripts/weekly-scraper.ts discover  # Find new content');
  console.log('  npx tsx scripts/weekly-scraper.ts import    # Import approved items\n');
  process.exit(0);
}
