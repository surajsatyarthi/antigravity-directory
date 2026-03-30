import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require', prepare: false });

async function getExistingSlugs(): Promise<Set<string>> {
  const rows = await sql`SELECT slug FROM resources`;
  return new Set(rows.map(r => r.slug));
}

function extractSlugsFromSitemap(filePath: string, baseUrlPrefix: string): string[] {
  if (!fs.existsSync(filePath)) return [];
  const xmlData = fs.readFileSync(filePath, 'utf-8');
  const parser = new XMLParser();
  const jsonObj = parser.parse(xmlData);
  
  const urls = jsonObj.urlset?.url || [];
  const slugs: string[] = [];
  
  const urlList = Array.isArray(urls) ? urls : [urls];
  
  for (const entry of urlList) {
    const loc = entry.loc;
    if (loc && loc.startsWith(baseUrlPrefix)) {
      const slug = loc.replace(baseUrlPrefix, '').replace(/^\/|\/$/g, '');
      if (slug) slugs.push(slug);
    }
  }
  
  return slugs;
}

async function run() {
  try {
    console.log('🔍 Starting Gap Analysis...');
    
    // 1. Get existing slugs
    const existingSlugs = await getExistingSlugs();
    console.log(`Found ${existingSlugs.size} existing resources in DB.`);
    
    // 2. Extract from Competitor 2 sitemaps
    const comp2Rules = extractSlugsFromSitemap('temp/comp2_rules.xml', 'https://antigravity.codes/rules');
    const comp2Workflows = extractSlugsFromSitemap('temp/comp2_workflows.xml', 'https://antigravity.codes/workflows');
    const comp2Skills = extractSlugsFromSitemap('temp/comp2_skills.xml', 'https://antigravity.codes/agent-skills');
    
    const allCompetitorSlugs = [...new Set([...comp2Rules, ...comp2Workflows, ...comp2Skills])];
    console.log(`Found ${allCompetitorSlugs.length} unique slugs from Competitor 2.`);
    
    // 3. Find missing
    const missing = allCompetitorSlugs.filter(slug => !existingSlugs.has(slug) && !existingSlugs.has(`mcp-${slug}`) && !existingSlugs.has(`rule-${slug}`) && !existingSlugs.has(`skill-${slug}`));
    
    console.log(`🚀 Identified ${missing.length} missing resources.`);
    
    // 4. Save result
    if (!fs.existsSync('temp')) fs.mkdirSync('temp');
    fs.writeFileSync('temp/missing_slugs.json', JSON.stringify(missing, null, 2));
    console.log('✅ Saved missing slugs to temp/missing_slugs.json');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Gap analysis failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

run();
