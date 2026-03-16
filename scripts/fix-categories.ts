
import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

const DRY_RUN = !process.argv.includes('--live');

async function fixCategories() {
  console.log(`\n--- STARTING CATEGORY CLEANUP (MODE: ${DRY_RUN ? 'DRY_RUN' : 'LIVE'}) ---`);
  
  let totalToDraft = 0;
  let skipped = 0;
  const draftLog: string[] = [];
  const summary: Record<string, { count: number, samples: string[] }> = {
    'skills': { count: 0, samples: [] },
    'troubleshooting': { count: 0, samples: [] },
    'boilerplates': { count: 0, samples: [] }
  };

  // Rule A/B/C Identification Logic
  const resources = await sql`
    SELECT r.id, r.title, r.slug, c.slug as category_slug, r.status
    FROM resources r
    JOIN categories c ON r.category_id = c.id
    WHERE c.slug IN ('skills', 'troubleshooting', 'boilerplates')
    AND r.status = 'LIVE';
  `;

  for (const r of resources) {
    let shouldDraft = false;

    // Rule D/E: Protect bp- boilerplates and specific unique entries
    if (r.slug.startsWith('bp-')) {
        skipped++;
        continue;
    }

    // Rule A: Skills - Competitor IDE products
    if (r.category_slug === 'skills') {
        const competitors = ['Aider', 'Amazon CodeWhisperer', 'Codeium', 'Cody', 'Continue', 'GitHub Copilot', 'Replit AI', 'Supermaven', 'Tabnine', 'Cursor'];
        if (competitors.some(c => r.title.includes(c))) {
            shouldDraft = true;
        }
    }

    // Rule B: Troubleshooting - Generic MLOps
    if (r.category_slug === 'troubleshooting') {
        const mlops = ['Arize', 'Helicone', 'LangSmith', 'Weights & Biases', 'Traceloop', 'Portkey'];
        if (mlops.some(m => r.title.includes(m))) {
            shouldDraft = true;
        }
    }

    // Rule C: Boilerplates - Generic frameworks
    if (r.category_slug === 'boilerplates') {
        const frameworks = ['Flowise', 'Haystack', 'LangChain', 'LangFlow', 'LlamaIndex', 'Vercel AI SDK'];
        if (frameworks.some(f => r.title.includes(f))) {
            shouldDraft = true;
        }
    }

    if (shouldDraft) {
        totalToDraft++;
        summary[r.category_slug].count++;
        if (summary[r.category_slug].samples.length < 5) {
            summary[r.category_slug].samples.push(r.title);
        }
        draftLog.push(`DRAFT: [${r.id}] ${r.title} (${r.slug}) [${r.category_slug}]`);
        
        if (!DRY_RUN) {
            await sql`UPDATE resources SET status = 'DRAFT' WHERE id = ${r.id}`;
        }
    }
  }

  let finalOutput = `\n--- CLEANUP SUMMARY (${DRY_RUN ? 'DRY-RUN' : 'LIVE'}) ---\n`;
  for (const [cat, data] of Object.entries(summary)) {
      finalOutput += `\nCATEGORY: ${cat.toUpperCase()}\n`;
      finalOutput += `To be Drafted: ${data.count}\n`;
      finalOutput += `Samples: ${data.samples.join(', ')}\n`;
  }
  finalOutput += `\nTotal Resources to Draft: ${totalToDraft}\n`;
  finalOutput += `Protected (skipped bp-): ${skipped}\n`;
  finalOutput += `\n--- DETAILED LOG ---\n${draftLog.join('\n')}\n`;

  console.log(finalOutput);

  const tempDir = path.join(process.cwd(), 'temp');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
  const logFile = DRY_RUN ? 'task093_dryrun.txt' : 'task093_fix_log.txt';
  fs.writeFileSync(path.join(tempDir, logFile), finalOutput);
  
  console.log(`\nLog saved to temp/${logFile}`);
  process.exit(0);
}

fixCategories().catch(err => {
  console.error(err);
  process.exit(1);
});
