
import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

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

function rewriteTitle(currentTitle: string, id: string): { proposed: string, override: boolean } {
  // 1. Check for Overrides (Exact Match)
  if (brandOverrides[currentTitle]) {
    return { proposed: brandOverrides[currentTitle], override: true };
  }

  // UUID Check for Bytebot
  if (id === '9fb1efb8-fc47-4804-9140-24941ba8a5d3') {
     return { proposed: 'Bytebot', override: true };
  }

  // Case-insensitive match for Kong
  if (currentTitle.toLowerCase() === 'kong/kong') {
    return { proposed: 'Kong', override: true };
  }

  // 2. Algorithm
  // Extract part after /
  const parts = currentTitle.split('/');
  let name = parts.length > 1 ? parts[1] : parts[0];

  // Replace - and _ with Space
  name = name.replace(/[-_]/g, ' ');

  // Title Case
  let proposed = titleCase(name);

  // Acronym Post-processing
  for (const [key, value] of Object.entries(acronyms)) {
    // Regex for whole word match
    const regex = new RegExp(`\\b${key}\\b`, 'g');
    proposed = proposed.replace(regex, value);
  }

  return { proposed, override: false };
}

async function dryRun() {
  try {
    console.log('--- STARTING TASK-094 DRY RUN ---');
    
    // Get total from diagnosis log
    const diagnosisPath = resolve(process.cwd(), 'temp/task094_diagnosis.txt');
    const diagnosisContent = fs.readFileSync(diagnosisPath, 'utf-8');
    const lines = diagnosisContent.split('\n');
    const idsToFetch: string[] = [];
    
    lines.forEach(line => {
      const match = line.match(/^\|\s+([a-f0-9-]{36})\s+\|/);
      if (match) {
        idsToFetch.push(match[1]);
      }
    });

    console.log(`Extracted ${idsToFetch.length} IDs from diagnosis log.`);

    // Fetch from DB to ensure current state
    const resources = await sql`
      SELECT id, title FROM resources WHERE id = ANY(${idsToFetch})
    `;

    let report = `| ID | Current Title | Proposed Title | Override Applied |\n`;
    report += `|---|---|---|---|\n`;

    resources.forEach(r => {
      const { proposed, override } = rewriteTitle(r.title, r.id);
      report += `| ${r.id} | ${r.title} | ${proposed} | ${override ? 'YES' : 'NO'} |\n`;
    });

    const outputPath = resolve(process.cwd(), 'temp/task094_dryrun.txt');
    fs.writeFileSync(outputPath, report);

    console.log(`Dry-run complete. Saved to: ${outputPath}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Dry-run failed:', error);
    process.exit(1);
  }
}

dryRun();
