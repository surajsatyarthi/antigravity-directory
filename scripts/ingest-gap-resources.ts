import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require', prepare: false });
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

interface ResourceToIngest {
  slug: string;
  category: string;
}

async function searchGitHub(query: string): Promise<string | null> {
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc`;
  const response = await fetch(url, {
    headers: {
      'Authorization': GITHUB_TOKEN ? `token ${GITHUB_TOKEN}` : '',
      'User-Agent': 'antigravity-directory-ingestor'
    }
  });
  
  if (!response.ok) return null;
  const data = await response.json() as { items: Array<{ html_url: string }> };
  return data.items?.[0]?.html_url || null;
}

async function fetchGitHubMetadata(repoUrl: string) {
  const parts = repoUrl.replace('https://github.com/', '').split('/');
  const owner = parts[0];
  const repo = parts[1];
  
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': GITHUB_TOKEN ? `token ${GITHUB_TOKEN}` : '',
      'User-Agent': 'antigravity-directory-ingestor'
    }
  });
  
  if (!response.ok) return null;
  return await response.json() as { 
    name: string; 
    description: string; 
    stargazers_count: number; 
    forks_count: number;
  };
}

async function ingestBatch(resources: ResourceToIngest[], categoryId: string, adminId: string | null) {
  for (const item of resources) {
    console.log(`📡 Resolving: ${item.slug}...`);
    
    // Rate limit: 30 requests per minute = 2 seconds per request
    await sleep(2100); 

    // Guess query: the slug often matches the repo name
    const query = item.slug.includes('/') ? item.slug.split('/').pop()! : item.slug;
    const repoUrl = await searchGitHub(`${query} mcp`);
    
    if (!repoUrl) {
      console.log(`❌ Could not find source for: ${item.slug}`);
      continue;
    }
    
    console.log(`✅ Found: ${repoUrl}`);
    const meta = await fetchGitHubMetadata(repoUrl);
    
    if (!meta) continue;

    const title = meta.name.split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const description = `${title} — ${categoryNameMap[item.category] || 'Resource'} for Google Antigravity IDE. ${meta.description || ''}`.slice(0, 300);

    await sql`
      INSERT INTO resources (
        id, title, slug, description, url, category_id, author_id,
        verified, featured, status, github_stars, github_forks,
        is_indexed, last_validated_at
      ) VALUES (
        ${uuidv4()},
        ${title},
        ${item.slug.replace(/\//g, '-')},
        ${description},
        ${repoUrl},
        ${categoryId},
        ${adminId},
        true,
        false,
        'LIVE',
        ${meta.stargazers_count},
        ${meta.forks_count},
        false,
        NOW()
      )
      ON CONFLICT (slug) DO NOTHING
    `;
    
    console.log(`🎉 Ingested: ${title}`);
  }
}

const categoryNameMap: Record<string, string> = {
  'rules': 'Rule',
  'workflows': 'Workflow',
  'agent-skills': 'Skill',
  'mcp': 'MCP Server'
};

async function run() {
  const limit = parseInt(process.argv.find(arg => arg.startsWith('--limit='))?.split('=')[1] || '10');
  const offset = parseInt(process.argv.find(arg => arg.startsWith('--offset='))?.split('=')[1] || '0');
  
  console.log(`🚀 Starting Ingestion (Limit: ${limit}, Offset: ${offset})...`);
  
  const rawList = JSON.parse(fs.readFileSync('temp/resources_to_ingest.json', 'utf-8')) as string[];
  const slice = rawList.slice(offset, offset + limit);
  
  const resources: ResourceToIngest[] = slice.map(s => {
    const parts = s.split('/');
    return { slug: s, category: parts[0] };
  });

  const [skillsCategory] = await sql`SELECT id FROM categories WHERE slug = 'skills' LIMIT 1`;
  const [admin] = await sql`SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1`;
  
  await ingestBatch(resources, skillsCategory.id, admin?.id || null);
  
  console.log('🏁 Batch complete.');
  process.exit(0);
}

run();
