
import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

const rawPattern = /^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/;

const manualCorrections: Record<string, string> = {
  '89ba8cc9-21bb-4e25-b78d-7e576293e0b4': 'LocalAI',
  '29962538-a5c2-40c2-aba8-bf75e4599347': 'FastMCP',
  '4f0c9a0a-ebc6-4496-a850-7341f4b02580': 'UI TARS Desktop',
  '9222728d-c17b-48a5-b9cb-7659183d59b1': 'Chrome DevTools MCP',
  'bab9572f-eb12-45e4-b3b5-40a22b8821df': 'AgentScope',
  'f3406818-8020-4656-a892-b9657058f31d': 'AstrBot',
  '9da962e9-69e6-4f91-8285-395ceb60d2eb': 'CC Switch',
  'dfc53a51-5ef4-4db2-8aba-108029ebf987': 'ValueCell',
  'b813bd85-6b6e-4c77-9234-c9dec28b3375': '53AI Hub',
  'd37263b7-1b89-4187-ad90-6a3fcae8170d': 'FastAPI MCP',
  'f0f0e7ee-aac9-4046-a10f-27b54844cc01': 'Desktop Commander MCP',
  'db59b643-7c0c-4c3c-826b-50fa7fb2f721': 'IDA Pro MCP',
  'a50f7cd6-5d0f-46ff-ad52-51e3cfcef91f': 'Strands Agents SDK Python',
  '259e9cab-561c-466d-bacc-81075f6bdaa8': 'GaiaNet Node',
  '33bea861-83fa-4bf7-91a3-02748f31a48a': 'DeepChat',
  'cc49a97d-2bb6-49ad-939c-487c1385de70': 'BrowserMCP',
  '61247349-2965-454e-b020-1572e028a773': 'MCP Registry',
  'ae24243a-c808-4b74-82d9-770f2b2f8a44': 'ACI',
  'e8713a19-c061-4ec5-b9c7-bc04107ca6a9': 'AG2',
  '493a8420-0899-4fbe-bb80-6289dc2408d4': 'MemU',
  '92b69acc-5528-415b-b9a5-70daa9a19dfb': 'OpenMetadata',
  'e25380bb-d4fa-4dd6-8feb-a2352ee5e4bd': 'WhatsApp MCP',
  '1425a6db-2f09-4fe6-af39-4f05419edbcb': 'Portkey AI Gateway',
};

const brandOverrides: Record<string, string> = {
  'n8n-io/n8n': 'n8n',
  'czlonkowski/n8n-mcp': 'n8n MCP',
  'labring/FastGPT': 'FastGPT',
  'lobehub/lobe-chat': 'LobeChat',
  'danny-avila/LibreChat': 'LibreChat',
  'Mintplex-Labs/anything-llm': 'AnythingLLM',
  'open-webui/open-webui': 'Open WebUI',
  'open-webui/mcpo': 'MCPO',
  'github/github-mcp-server': 'GitHub MCP Server',
  'mcp-use/mcp-use': 'MCP Use',
  'upstash/context7': 'Context7 MCP',
  'infiniflow/ragflow': 'RAGflow',
  'mindsdb/mindsdb': 'MindsDB',
  'VoltAgent/voltagent': 'VoltAgent',
  'casibase/casibase': 'Casibase',
  'MCP-UI-Org/mcp-ui': 'MCP UI',
  'google/adk-go': 'Google ADK Go',
  'googleapis/genai-toolbox': 'GenAI Toolbox',
  'awslabs/mcp': 'AWS Labs MCP',
  'punkpeye/awesome-mcp-servers': 'Awesome MCP Servers (punkpeye)',
  'appcypher/awesome-mcp-servers': 'Awesome MCP Servers (appcypher)',
  'punkpeye/awesome-mcp-clients': 'Awesome MCP Clients',
  'triggerdotdev/trigger.dev': 'Trigger.dev MCP',
};

const acronyms: Record<string, string> = {
  'Mcp': 'MCP',
  'Ai': 'AI',
  'Ui': 'UI',
  'Api': 'API',
  'Sdk': 'SDK',
  'Rpa': 'RPA',
  'Llm': 'LLM',
  'Gpt': 'GPT',
  'Rag': 'RAG',
  'Ide': 'IDE',
};

function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getNewTitle(id: string, currentTitle: string): string {
  // 1. Manual Correction
  if (manualCorrections[id]) return manualCorrections[id];

  // 2. Brand Override
  if (brandOverrides[currentTitle]) return brandOverrides[currentTitle];

  // Case-insensitive match for Kong
  if (currentTitle.toLowerCase() === 'kong/kong') return 'Kong';

  // 3. Algorithm
  const parts = currentTitle.split('/');
  let name = parts.length > 1 ? parts[1] : parts[0];
  name = name.replace(/[-_]/g, ' ');
  let proposed = titleCase(name);

  for (const [key, value] of Object.entries(acronyms)) {
    const regex = new RegExp(`\\b${key}\\b`, 'g');
    proposed = proposed.replace(regex, value);
  }

  return proposed;
}

async function execute() {
  try {
    console.log('--- STARTING TASK-094 LIVE EXECUTION ---');
    
    const diagnosisPath = resolve(process.cwd(), 'temp/task094_diagnosis.txt');
    const diagnosisContent = fs.readFileSync(diagnosisPath, 'utf-8');
    const lines = diagnosisContent.split('\n');
    const idsToUpdate: string[] = [];
    
    lines.forEach(line => {
      const match = line.match(/^\|\s+([a-f0-9-]{36})\s+\|/);
      if (match) {
        idsToUpdate.push(match[1]);
      }
    });

    console.log(`Processing ${idsToUpdate.length} resources...`);

    const resources = await sql`
      SELECT id, title, meta_title FROM resources WHERE id = ANY(${idsToUpdate})
    `;

    let log = '';
    let updateCount = 0;

    for (const r of resources) {
      const newTitle = getNewTitle(r.id, r.title);
      let updatedMetaTitle = r.meta_title;
      let metaChange = 'UNCHANGED';

      if (r.meta_title === null || rawPattern.test(r.meta_title)) {
        updatedMetaTitle = newTitle;
        metaChange = `[${r.meta_title || 'NULL'}] → "${newTitle}"`;
      }

      await sql`
        UPDATE resources
        SET title = ${newTitle}, meta_title = ${updatedMetaTitle}, updated_at = NOW()
        WHERE id = ${r.id}
      `;

      log += `- UPDATED: [${r.id}] | title: "${r.title}" → "${newTitle}" | metaTitle: ${metaChange}\n`;
      updateCount++;
    }

    const logPath = resolve(process.cwd(), 'temp/task094_fix_log.txt');
    fs.writeFileSync(logPath, log);

    console.log(`Live update complete. Total rows updated: ${updateCount}`);
    console.log(`Log saved to: ${logPath}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Live update failed:', error);
    process.exit(1);
  }
}

execute();
