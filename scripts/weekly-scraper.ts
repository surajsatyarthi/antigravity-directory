import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { logger } from './logger';
import pLimit from 'p-limit';

// Add global error handlers
process.on('unhandledRejection', (err) => {
  logger.error('❌ Unhandled rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  logger.error('❌ Uncaught exception:', err);
  process.exit(1);
});

// Load .env.local if it exists (local dev), otherwise use environment variables (GitHub Actions)
config({ path: resolve(process.cwd(), '.env.local') });

// Validate DATABASE_URL
if (!process.env.DATABASE_URL) {
  logger.error('❌ DATABASE_URL environment variable is not set!');
  logger.error('   Please add it to GitHub Secrets or .env.local');
  process.exit(1);
}

logger.info('✅ DATABASE_URL is set');
logger.info(`📍 Connecting to database...`);

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

const PENDING_FILE = resolve(process.cwd(), 'scripts/pending-resources.json');

interface PendingResource {
  title: string;
  description: string;
  url: string;
  category: 'mcp-servers' | 'boilerplates' | 'workflows' | 'rules';
  stars: number;
  source: string;
  approved: boolean;
  author_id?: string;
  content?: string; // [NEW] Content for rules
}

// Helper to fetch with retries
export async function fetchWithRetry(url: string, headers: any, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { headers });
      
      if (res.status === 403) {
        const resetTime = res.headers.get('x-ratelimit-reset');
        const waitTime = resetTime ? (parseInt(resetTime) * 1000) - Date.now() : 60000;
        logger.warn(`⚠️ Rate limited. Waiting ${Math.round(waitTime / 1000)}s...`);
        throw new Error('Rate limited');
      }

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
    }
  }
}

// Helper to fetch file content from GitHub API URL
async function fetchGithubFileContent(apiUrl: string, headers: any): Promise<string | null> {
  try {
    const data = await fetchWithRetry(apiUrl, headers);
    if (!data || !data.content) return null;
    
    // GitHub API returns content as base64
    if (data.encoding === 'base64') {
      return Buffer.from(data.content, 'base64').toString('utf-8');
    }
    return data.content;
  } catch (err) {
    logger.error('  ❌ Failed to fetch file content:', err);
    return null;
  }
}

export async function validateEnvironment(db?: any) {
  const dbConn = db || sql;
  logger.info('🔍 Running pre-flight checks...');
  
  try {
    // 1. Check DB Connection
    await dbConn`SELECT 1`;
    logger.info('  ✅ Database connected');
    
    // 2. Check for Admin User
    const [admin] = await dbConn`SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1`;
    if (!admin) {
      logger.warn('  ⚠️  No ADMIN user found. Imports will fail without an author_id.');
      return false;
    } else {
      logger.info('  ✅ Admin user found');
    }
    
    // 3. Check Categories
    const categories = await dbConn`SELECT count(*) FROM categories`;
    if (categories[0].count === '0') {
      logger.error('  ❌ No categories found. Please seed the database first.');
      if (!db) process.exit(1);
      return false;
    } else {
      logger.info('  ✅ Categories exist');
    }
    
    return true;
    
  } catch (err) {
    logger.error('❌ Pre-flight checks failed:', err);
    if (!db) process.exit(1);
    return false;
  }
}

export async function discoverMode() {
  const dbConn = sql;
  await validateEnvironment(dbConn);

  // Parse --type flag
  const args = process.argv.slice(2);
  const typeArgIndex = args.indexOf('--type');
  const targetType = typeArgIndex !== -1 ? args[typeArgIndex + 1] : null;

  if (targetType) {
    logger.info(`🎯 Targeted discovery mode: ${targetType}`);
  }

  logger.info('🔍 DISCOVERY MODE: Finding new content...\n');
  
  const pendingResources: PendingResource[] = [];

  try {
    // 1. Sync GitHub Stars for existing resources (Skip if targeted run)
    if (!targetType) {
      logger.info('⭐ Syncing GitHub Stars (existing resources)...');
      const githubResources = await dbConn`
        SELECT id, title, url, github_stars 
        FROM resources 
        WHERE url LIKE '%github.com%' 
        AND (last_validated_at IS NULL OR last_validated_at < NOW() - INTERVAL '24 hours')
        ORDER BY github_stars DESC NULLS LAST
        LIMIT 50
      `;
      
      if (githubResources.length > 0) {
        const limiter = pLimit(5);
        const headers: any = { 
          'User-Agent': 'Antigravity-Directory/1.0',
          'Accept': 'application/vnd.github.v3+json'
        };
        
        if (process.env.GITHUB_TOKEN) {
          headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
        } else {
          logger.warn('⚠️  GITHUB_TOKEN not set. Rate limit will be low (60/hr).');
        }

        const updates = await Promise.all(
          githubResources.map((resource: any) =>  
            limiter(async () => {
              try {
                const match = resource.url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
                if (!match) return null;
                
                const [, owner, repo] = match;
                const cleanRepo = repo.split('/')[0].split('#')[0].split('?')[0];
                
                const data = await fetchWithRetry(`https://api.github.com/repos/${owner}/${cleanRepo}`, headers);
                
                const oldStars = resource.github_stars || 0;
                const newStars = data.stargazers_count;
                const growth = newStars - oldStars;
                
                if (growth > 0) {
                  logger.info(`  ↗️  ${resource.title}: ${oldStars} → ${newStars} (+${growth} stars)`);
                }

                return {
                  id: resource.id,
                  stars: newStars,
                  forks: data.forks_count
                };
              } catch (err) {
                logger.error(`❌ Failed to sync ${resource.title}:`, err);
                return null;
              }
            })
          )
        );

        const validUpdates = updates.filter(u => u !== null);
        
        if (validUpdates.length > 0) {
          logger.info(`\n💾 Batch updating ${validUpdates.length} resources...`);
          // Batch update using a temporary table or VALUES list
          await dbConn`
            UPDATE resources SET
              github_stars = data.stars,
              github_forks = data.forks,
              last_validated_at = NOW()
            FROM (VALUES ${validUpdates.map(u => dbConn`(${u.id}, ${u.stars}, ${u.forks})`)})
            AS data(id, stars, forks)
            WHERE resources.id = data.id::uuid
          `;
          logger.info(`✅ Updated ${validUpdates.length} GitHub resources\n`);
        }
      } else {
        logger.info('✨ No GitHub resources need syncing today.\n');
      }
    } else {
      logger.info('⭐ Skipping GitHub Star sync in targeted mode.');
    }
    
    // 2. Discover new content from multiple sources
    logger.info('🔍 DISCOVERING NEW CONTENT...\n');
    
    // 2A: Search GitHub for new MCP servers
    if (!targetType || targetType === 'mcp') {
      logger.info('📦 Searching GitHub for MCP Servers...');
      try {
        const mcpSearch = await fetch(
          'https://api.github.com/search/repositories?q=mcp-server+OR+modelcontextprotocol+in:name,description&sort=stars&per_page=20',
          { 
            headers: { 
              'User-Agent': 'Antigravity-Directory/1.0',
              ...(process.env.GITHUB_TOKEN ? { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` } : {})
            } 
          }
        );
        
        if (mcpSearch.ok) {
          const mcpData: any = await mcpSearch.json();
          for (const repo of mcpData.items.slice(0, 10)) {
            // Check if we already have this URL
            const existing = await dbConn`SELECT id FROM resources WHERE url = ${repo.html_url} LIMIT 1`;
            if (existing.length === 0) {
              pendingResources.push({
                title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
                description: repo.description || 'MCP server implementation',
                url: repo.html_url,
                category: 'mcp-servers',
                stars: repo.stargazers_count,
                source: 'github-api',
                approved: false
              });
              logger.info(`  ✨ Found: ${repo.name} (⭐ ${repo.stargazers_count})`);
            }
          }
        }
      } catch (err) {
        logger.warn('  ⚠️  GitHub MCP search failed, skipping...');
      }
    }
    
    // 2B: Search for new boilerplates and starters
    if (!targetType || targetType === 'boilerplates') {
      logger.info('\n🏗️  Searching for new boilerplates...');
      try {
        const boilerplateSearch = await fetch(
          'https://api.github.com/search/repositories?q=nextjs+saas+starter+OR+boilerplate&sort=stars&per_page=20',
          { 
            headers: { 
              'User-Agent': 'Antigravity-Directory/1.0',
              ...(process.env.GITHUB_TOKEN ? { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` } : {})
            } 
          }
        );
        
        if (boilerplateSearch.ok) {
          const boilerplateData: any = await boilerplateSearch.json();
          for (const repo of boilerplateData.items.slice(0, 10)) {
            const existing = await dbConn`SELECT id FROM resources WHERE url = ${repo.html_url} LIMIT 1`;
            if (existing.length === 0 && repo.stargazers_count > 100) {
              pendingResources.push({
                title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
                description: repo.description || 'SaaS boilerplate and starter kit',
                url: repo.html_url,
                category: 'boilerplates',
                stars: repo.stargazers_count,
                source: 'github-api',
                approved: false
              });
              logger.info(`  ✨ Found: ${repo.name} (⭐ ${repo.stargazers_count})`);
            }
          }
        }
      } catch (err) {
        logger.warn('  ⚠️  Boilerplate search failed, skipping...');
      }
    }
    
    // 2C: Search for workflow templates
    if (!targetType || targetType === 'workflows') {
      logger.info('\n🔄 Searching for workflow templates...');
      try {
        const workflowSearch = await fetch(
          'https://api.github.com/search/repositories?q=n8n+workflow+OR+github-actions+template&sort=stars&per_page=15',
          { 
            headers: { 
              'User-Agent': 'Antigravity-Directory/1.0',
              ...(process.env.GITHUB_TOKEN ? { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` } : {})
            } 
          }
        );
        
        if (workflowSearch.ok) {
          const workflowData: any = await workflowSearch.json();
          for (const repo of workflowData.items.slice(0, 8)) {
            const existing = await dbConn`SELECT id FROM resources WHERE url = ${repo.html_url} LIMIT 1`;
            if (existing.length === 0) {
              pendingResources.push({
                title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
                description: repo.description || 'Automation workflow template',
                url: repo.html_url,
                category: 'workflows',
                stars: repo.stargazers_count,
                source: 'github-api',
                approved: false
              });
              logger.info(`  ✨ Found: ${repo.name} (⭐ ${repo.stargazers_count})`);
            }
          }
        }
      } catch (err) {
        logger.warn('  ⚠️  Workflow search failed, skipping...');
      }
    }
    
    // 2D: Search for cursor rules
    if (!targetType || targetType === 'rules') {
      logger.info('\n📋 Searching for cursor rules...');
      const headers: any = { 
        'User-Agent': 'Antigravity-Directory/1.0',
        'Accept': 'application/vnd.github.v3+json'
      };
      
      if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
      }

      try {
        const rulesSearch = await fetch(
          'https://api.github.com/search/code?q=filename:.cursorrules&per_page=15',
          { headers }
        );
        
        if (rulesSearch.ok) {
          const rulesData: any = await rulesSearch.json();
          for (const item of rulesData.items.slice(0, 8)) {
            const repoUrl = item.repository.html_url;
            const existing = await dbConn`SELECT id FROM resources WHERE url = ${repoUrl} LIMIT 1`;
            
            if (existing.length === 0) {
              // Fetch content
              logger.info(`  ⬇️  Fetching content for ${item.repository.name}...`);
              const content = await fetchGithubFileContent(item.url, headers);
              
              if (content) {
                pendingResources.push({
                  title: `${item.repository.name} Cursor Rules`,
                  description: item.repository.description || 'Cursor AI rules configuration',
                  url: repoUrl,
                  category: 'rules',
                  stars: 0, 
                  source: 'github-code-search',
                  approved: false,
                  content: content
                });
                logger.info(`  ✨ Found & Downloaded: ${item.repository.name} rules`);
              } else {
                logger.warn(`  ⚠️  Skipping ${item.repository.name} (No content found)`);
              }
            }
          }
        }
      } catch (err) {
        logger.warn('  ⚠️  Rules search failed, skipping...', err);
      }
    }
    
    logger.info(`\n🎯 Discovery complete! Found ${pendingResources.length} new resources\n`);
    
    // 3. Save to pending file
    writeFileSync(PENDING_FILE, JSON.stringify(pendingResources, null, 2));
    
    logger.info(`📄 Saved ${pendingResources.length} pending resources to: ${PENDING_FILE}`);
    logger.info('\n🔎 NEXT STEPS:');
    logger.info('  1. Review the pending-resources.json file');
    logger.info('  2. Set "approved: true" for items you want to import');
    logger.info('  3. Run: npx tsx scripts/weekly-scraper.ts import\n');
    
  } catch (error) {
    logger.error('❌ Discovery failed:', error);
    process.exit(1);
  } finally {
    await dbConn.end();
  }
}

export async function importMode(db?: any) {
  const dbConn = db || sql;
  const isDryRun = process.argv.includes('--dry-run');

  logger.info(`📥 IMPORT MODE: Adding approved resources...${isDryRun ? ' (DRY RUN)' : ''}\n`);
  
  if (!existsSync(PENDING_FILE)) {
    logger.error('❌ No pending-resources.json found. Run discovery first.');
    if (!db) process.exit(1);
    return;
  }
  
  const pending: PendingResource[] = JSON.parse(readFileSync(PENDING_FILE, 'utf-8'));
  const approved = pending.filter(r => r.approved === true);
  
  if (approved.length === 0) {
    logger.warn('⚠️  No approved resources found. Mark items with "approved: true" first.');
    if (!db) process.exit(0);
    return;
  }
  
  logger.info(`✅ Found ${approved.length} approved resources to import\n`);
  
  const stats = {
    success: 0,
    skipped: 0,
    failed: 0,
    errors: [] as string[]
  };

  try {
    const categoriesList = await dbConn`SELECT id, slug FROM categories`;
    const [admin] = await dbConn`SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1`;
    const adminId = admin?.id || 'default-admin-id'; // Fallback only for dry-run theoretically, but good to have
    
    // In dry-run we don't need a transaction necessarily, but for consistency we use one if not dry-run
    // actually, for dry-run we just loop.
    
    const processResource = async (resource: PendingResource, tx: any) => {
      // console.log('Processing:', resource.title);
      // 1. Validation
      const category = categoriesList.find((c: any) => c.slug === resource.category);
      if (!category) {
        const msg = `Category "${resource.category}" not found`;
        logger.warn(`  ⚠️  ${msg} for: ${resource.title}`);
        stats.failed++;
        stats.errors.push(`${resource.title}: ${msg}`);
        return;
      }

      try {
        new URL(resource.url);
      } catch (e) {
        const msg = `Invalid URL "${resource.url}"`;
        logger.warn(`  ⚠️  ${msg} for: ${resource.title}`);
        stats.failed++;
        stats.errors.push(`${resource.title}: ${msg}`);
        return;
      }

      const slug = resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

      if (isDryRun) {
        logger.info(`  [DRY-RUN] Would import: "${resource.title}" -> /${category.slug}/${slug}`);
        stats.success++;
        return;
      }

      try {
        await tx`
          INSERT INTO resources (
            id, title, slug, description, url, category_id, author_id, 
            status, github_stars, github_forks, last_validated_at, created_at, updated_at,
            content
          ) VALUES (
            gen_random_uuid(),
            ${resource.title},
            ${slug},
            ${resource.description},
            ${resource.url},
            ${category.id},
            ${resource.author_id || adminId},
            'APPROVED',
            ${resource.stars || 0},
            0,
            NOW(),
            NOW(),
            NOW(),
            ${resource.content || null}
          )
        `;
        logger.info(`  ✅ Imported: ${resource.title}`);
        stats.success++;
      } catch (err: any) {
        if (err.code === '23505') { // Unique violation
          logger.warn(`  ⚠️  Skipped duplicate: ${resource.title}`);
          stats.skipped++;
        } else {
          logger.error(`  ❌ Failed to import ${resource.title}:`, err);
          stats.failed++;
          stats.errors.push(`${resource.title}: ${err.message}`);
        }
      }
    };

    if (isDryRun) {
      for (const resource of approved) {
        await processResource(resource, dbConn);
      }
    } else {
      await dbConn.begin(async (tx: any) => {
        for (const resource of approved) {
          await processResource(resource, tx);
        }
      });
    }

  } catch (err) {
    logger.error('❌ Import process failed:', err);
    if (!db) process.exit(1);
  } finally {
    logger.info('\n📊 IMPORT SUMMARY:');
    logger.info(`  ✅ Success: ${stats.success}`);
    logger.info(`  ⏩ Skipped: ${stats.skipped}`);
    logger.info(`  ❌ Failed:  ${stats.failed}`);
    
    if (stats.errors.length > 0) {
      logger.info('\nErrors:');
      stats.errors.forEach(e => logger.error(`  - ${e}`));
    }
    
    if (!db) {
      await dbConn.end();
      process.exit(stats.failed > 0 ? 1 : 0);
    }
  }
}

// Main execution
if (require.main === module) {
  const mode = process.argv[2];

  if (mode === 'discover') {
    discoverMode();
  } else if (mode === 'import') {
    importMode();
  } else {
    logger.info('📅 Weekly Content Scraper with Approval Workflow\n');
    logger.info('Usage:');
    logger.info('  npx tsx scripts/weekly-scraper.ts discover [--type <mcp|boilerplates|workflows|rules>]  # Find new content');
    logger.info('  npx tsx scripts/weekly-scraper.ts import    # Import approved items\n');
    process.exit(0);
  }
}
