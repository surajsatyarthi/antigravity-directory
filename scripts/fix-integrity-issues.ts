
import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

async function fixIntegrity() {
  try {
    let log = `--- INTEGRITY FIX LOG (TASK-094-A) ---\n`;
    log += `Date: ${new Date().toISOString()}\n\n`;

    let totalDeleted = 0;
    let totalDrafted = 0;

    // --- GROUP A: MCP "Instance N" Duplicates ---
    log += `### Group A: MCP "Instance N" Duplicates\n`;
    const mcpInstances = await sql`
      SELECT id, title, url
      FROM resources
      WHERE status = 'LIVE'
        AND title ~ ' Instance \\d+$'
    `;
    
    if (mcpInstances.length > 0) {
      const idsToDelete = mcpInstances.map(r => r.id);
      log += `Found ${mcpInstances.length} "Instance N" entries to delete.\n`;
      mcpInstances.forEach(r => log += `- DELETE: [${r.id}] ${r.title}\n`);
      
      const delA = await sql`
        DELETE FROM resources WHERE id = ANY(${idsToDelete})
      `;
      totalDeleted += mcpInstances.length;
    } else {
      log += `No "Instance N" entries found.\n`;
    }
    log += `\n`;

    // --- GROUP B: /submit prompt duplicates ---
    log += `### Group B: Versioned /submit Prompts\n`;
    const prompts = await sql`
      SELECT id, title, url, created_at
      FROM resources
      WHERE status = 'LIVE'
        AND url = 'https://googleantigravity.directory/submit'
        AND title ~ ' v\\d+$'
    `;

    if (prompts.length > 0) {
      // Group by base title
      const groups: Record<string, any[]> = {};
      prompts.forEach(p => {
        const match = p.title.match(/(.*?)\s+v(\d+)$/);
        if (match) {
          const baseTitle = match[1];
          const version = parseInt(match[2]);
          if (!groups[baseTitle]) groups[baseTitle] = [];
          groups[baseTitle].push({ ...p, version });
        }
      });

      const idsToDeleteB: string[] = [];
      for (const baseTitle in groups) {
        const sorted = groups[baseTitle].sort((a, b) => b.version - a.version);
        const [keep, ...trash] = sorted;
        log += `Base Title: "${baseTitle}" - Keeping v${keep.version}\n`;
        trash.forEach(t => {
          log += `- DELETE: [${t.id}] ${t.title} (older version)\n`;
          idsToDeleteB.push(t.id);
        });
      }

      if (idsToDeleteB.length > 0) {
        await sql`DELETE FROM resources WHERE id = ANY(${idsToDeleteB})`;
        totalDeleted += idsToDeleteB.length;
        log += `Total versioned prompts deleted: ${idsToDeleteB.length}\n`;
      }
    } else {
      log += `No versioned /submit prompts found.\n`;
    }
    log += `\n`;

    // --- GROUP C: NULL URL resource ---
    log += `### Group C: NULL URL Resource\n`;
    const nullUrlResource = await sql`
      SELECT id, title 
      FROM resources 
      WHERE status = 'LIVE' AND (url IS NULL OR url = '')
    `;
    
    if (nullUrlResource.length > 0) {
      log += `Found ${nullUrlResource.length} resource(s) with NULL URL.\n`;
      for (const r of nullUrlResource) {
        log += `- DRAFT: [${r.id}] ${r.title}\n`;
        await sql`UPDATE resources SET status = 'DRAFT' WHERE id = ${r.id}`;
        totalDrafted++;
      }
    } else {
      log += `No NULL URL resources found.\n`;
    }

    log += `\n--- SUMMARY ---\n`;
    log += `Total Deleted: ${totalDeleted}\n`;
    log += `Total Drafted: ${totalDrafted}\n`;

    const outputPath = resolve(process.cwd(), 'temp/task094a_fix_log.txt');
    fs.writeFileSync(outputPath, log);
    
    console.log(`Fixes applied.`);
    console.log(`Deleted: ${totalDeleted}`);
    console.log(`Drafted: ${totalDrafted}`);
    console.log(`Log saved to: ${outputPath}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Fix failed:', error);
    process.exit(1);
  }
}

fixIntegrity();
