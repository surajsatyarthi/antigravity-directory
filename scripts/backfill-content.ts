import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import pLimit from 'p-limit';
import { logger } from './logger';

config({ path: resolve(process.cwd(), '.env.local') });

// --- GUARD: GITHUB_TOKEN required ---
if (!process.env.GITHUB_TOKEN) {
  logger.error('❌ GITHUB_TOKEN environment variable is not set. Exiting.');
  process.exit(1);
}

// --- GUARD: DATABASE_URL required ---
if (!process.env.DATABASE_URL) {
  logger.error('❌ DATABASE_URL environment variable is not set. Exiting.');
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;

const HEADERS = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
  'User-Agent': 'antigravity-directory-backfill',
};

// --- CLI FLAGS ---
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const categoryArgIdx = args.indexOf('--category');
const TARGET_CATEGORY: string | null = categoryArgIdx !== -1 ? args[categoryArgIdx + 1] : null;

// Rule 7: safety cap — 200 resources TOTAL per run (not per category)
const BATCH_CAP = 200;

const CATEGORY_ORDER = [
  'mcp-servers',
  'rules',
  'prompts',
  'skills',
  'workflows',
  'agents',
  'boilerplates',
  'troubleshooting',
];

// --- STATS ---
interface CategoryStats { updated: number; skipped: number; failed: number; }
const stats = {
  updated: 0,
  skippedHasContent: 0,
  noFileFound: 0,
  nonGithub: 0,
  errors: 0,
  byCategory: {} as Record<string, CategoryStats>,
};

function initCategoryStats(slug: string) {
  if (!stats.byCategory[slug]) {
    stats.byCategory[slug] = { updated: 0, skipped: 0, failed: 0 };
  }
}

// --- TRUNCATION: avoid mid-word cut ---
function truncateSmart(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const cut = text.lastIndexOf(' ', maxLen);
  return cut > 0 ? text.slice(0, cut) : text.slice(0, maxLen);
}

// --- PARSE GITHUB URL ---
function parseGithubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  const owner = match[1];
  const repo = match[2].split('/')[0].split('#')[0].split('?')[0];
  return { owner, repo };
}

// --- GITHUB API FETCH (single file) ---
// 500ms delay is here — every GitHub API call waits before firing
async function fetchGithubFile(owner: string, repo: string, path: string): Promise<string | null> {
  await new Promise(r => setTimeout(r, 500));
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  try {
    const res = await fetch(url, { headers: HEADERS });

    // Rule 4: 403 = hard stop, no retry
    if (res.status === 403) {
      logger.error('❌ GitHub API rate limit hit (403). Stopping execution.');
      process.exit(1);
    }

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    if (!data?.content) return null;
    return Buffer.from(data.content, 'base64').toString('utf-8');
  } catch (err: any) {
    // Re-throw process.exit signals
    if (err?.code === 'ERR_USE_AFTER_CLOSE') throw err;
    return null;
  }
}

// ============================================================
// CONTENT EXTRACTORS
// ============================================================

// MCP Servers: package.json → generate npx install config JSON
async function extractMcpContent(owner: string, repo: string): Promise<string | null> {
  const raw = await fetchGithubFile(owner, repo, 'package.json');
  if (!raw) return null;

  let pkg: any;
  try { pkg = JSON.parse(raw); } catch { return null; }

  const name: string | undefined = pkg.name;
  if (!name) return null;

  // Fallback condition: skip if no npm indicators AND not a scoped package
  const hasNpmIndicators = pkg.main || pkg.bin || pkg.exports;
  if (!hasNpmIndicators && !name.startsWith('@')) return null;

  // Key: strip scope, use remainder
  const keyName = name.includes('/') ? name.split('/')[1] : name;

  return JSON.stringify({
    mcpServers: {
      [keyName]: {
        command: 'npx',
        args: ['-y', name],
        env: {},
      },
    },
  }, null, 2);
}

// Rules / Skills / Workflows / Agents: try files in priority order
async function extractByFileList(
  owner: string,
  repo: string,
  filenames: string[]
): Promise<string | null> {
  for (const filename of filenames) {
    const raw = await fetchGithubFile(owner, repo, filename);
    if (raw !== null) return truncateSmart(raw, 8000);
  }
  return null;
}

// Prompts: dedicated files first, then README fallback (two-step)
async function extractPromptsContent(owner: string, repo: string): Promise<string | null> {
  const dedicated = await extractByFileList(owner, repo, [
    'prompt.md',
    'system-prompt.md',
    'PROMPT.md',
    'system.md',
  ]);
  if (dedicated) return dedicated;

  // README fallback
  const readme = await fetchGithubFile(owner, repo, 'README.md');
  if (!readme) return null;

  // Step 1: first fenced code block longer than 200 chars (strip fences)
  const fenceRegex = /```[\w]*\n([\s\S]*?)```/g;
  let match: RegExpExecArray | null;
  while ((match = fenceRegex.exec(readme)) !== null) {
    const block = match[1];
    if (block.length > 200) return truncateSmart(block, 8000);
  }

  // Step 2: text after first ## heading, up to 2,000 chars
  const headingMatch = readme.match(/^##\s.+$/m);
  if (headingMatch?.index !== undefined) {
    const afterHeading = readme.slice(headingMatch.index + headingMatch[0].length).trim();
    return truncateSmart(afterHeading, 2000);
  }

  return null;
}

// Boilerplates: first code block containing npx/npm/yarn/pnpm create or git clone
async function extractBoilerplateContent(owner: string, repo: string): Promise<string | null> {
  const readme = await fetchGithubFile(owner, repo, 'README.md');
  if (!readme) return null;

  const keywords = ['npx create-', 'npm create', 'yarn create', 'pnpm create', 'git clone', 'npm install', 'pnpm install', 'yarn install', 'pip install', 'docker-compose'];

  // Fenced code blocks
  const fenceRegex = /```[\w]*\n([\s\S]*?)```/g;
  let match: RegExpExecArray | null;
  while ((match = fenceRegex.exec(readme)) !== null) {
    const block = match[1];
    if (keywords.some(kw => block.includes(kw))) {
      return truncateSmart(block.trim(), 1000);
    }
  }

  // Indented code blocks (4 spaces or tab)
  const lines = readme.split('\n');
  for (const line of lines) {
    if (/^(?: {4}|\t)/.test(line)) {
      const content = line.trim();
      if (keywords.some(kw => content.includes(kw))) {
        return truncateSmart(content, 1000);
      }
    }
  }

  return null;
}

// Troubleshooting: targeted heading section, fallback to first 2,000 chars of body
async function extractTroubleshootingContent(owner: string, repo: string): Promise<string | null> {
  const readme = await fetchGithubFile(owner, repo, 'README.md');
  if (!readme) return null;

  const targetHeadings = ['fix', 'solution', 'how to fix', 'error', 'troubleshooting', 'workaround'];
  const sections = readme.split(/^(?=## )/m);

  for (const section of sections) {
    const firstLine = section.split('\n')[0].replace(/^##\s*/, '').toLowerCase().trim();
    if (targetHeadings.some(h => firstLine.includes(h))) {
      const body = section.split('\n').slice(1).join('\n').trim();
      return truncateSmart(body, 3000);
    }
  }

  // No matching heading: first 2,000 chars of body, skip title line
  const lines = readme.split('\n');
  const titleIdx = lines.findIndex(l => l.startsWith('# '));
  const bodyStart = titleIdx >= 0 ? titleIdx + 1 : 0;
  const body = lines.slice(bodyStart).join('\n').trim();
  return truncateSmart(body, 2000);
}

// ============================================================
// MAIN EXTRACTOR — routes by category slug
// ============================================================

async function extractContent(
  owner: string,
  repo: string,
  categorySlug: string
): Promise<string | null> {
  switch (categorySlug) {
    case 'mcp-servers':
      return extractMcpContent(owner, repo);

    case 'rules':
      return extractByFileList(owner, repo, [
        'AGENT.md', '.antigravityrules', 'CURSOR.md', '.cursorrules', 'rules.md',
      ]);

    case 'prompts':
      return extractPromptsContent(owner, repo);

    case 'skills':
      return extractByFileList(owner, repo, ['SKILL.md', 'skill.md']);

    case 'workflows':
      return extractByFileList(owner, repo, ['workflow.md', 'WORKFLOW.md']);

    case 'agents':
      return extractByFileList(owner, repo, ['AGENT.md', 'agent.md']);

    case 'boilerplates':
      return extractBoilerplateContent(owner, repo);

    case 'troubleshooting':
      return extractTroubleshootingContent(owner, repo);

    default:
      return null;
  }
}

// ============================================================
// PROCESS ONE RESOURCE
// ============================================================

async function processResource(resource: {
  id: string;
  title: string;
  url: string | null;
  categorySlug: string;
  content: string | null;
}): Promise<void> {
  const { id, title, url, categorySlug, content } = resource;
  initCategoryStats(categorySlug);

  // Rule 1: skip if already has content (application-level guard — DB query also filters this)
  if (content !== null) {
    logger.info(`⏭️  ${title}: already has content, skipped`);
    stats.skippedHasContent++;
    stats.byCategory[categorySlug].skipped++;
    return;
  }

  // Rule 2: only GitHub URLs
  if (!url || !url.includes('github.com')) {
    logger.info(`🚫 ${title}: non-GitHub URL, skipped`);
    stats.nonGithub++;
    stats.byCategory[categorySlug].failed++;
    return;
  }

  // Rule 3: parse GitHub URL
  const parsed = parseGithubUrl(url);
  if (!parsed) {
    logger.warn(`🚫 ${title}: could not parse GitHub URL, skipped`);
    stats.nonGithub++;
    stats.byCategory[categorySlug].failed++;
    return;
  }

  const { owner, repo } = parsed;

  let extracted: string | null = null;
  try {
    extracted = await extractContent(owner, repo, categorySlug);
  } catch (err) {
    logger.error(`❌ ${title}: GitHub API error`);
    stats.errors++;
    stats.byCategory[categorySlug].failed++;
    return;
  }

  if (!extracted) {
    logger.warn(`⚠️  ${title}: no eligible file found in repo`);
    stats.noFileFound++;
    stats.byCategory[categorySlug].failed++;
    return;
  }

  // Rule 5: final truncation guard (extractor-specific limits already applied above)
  const finalContent = truncateSmart(extracted, 8000);

  if (DRY_RUN) {
    logger.info(`✅ [DRY RUN] ${title}: would set content (${finalContent.length} chars)`);
    logger.info(`   Preview: ${finalContent.slice(0, 120).replace(/\n/g, ' ')}...`);
    stats.updated++;
    stats.byCategory[categorySlug].updated++;
    return;
  }

  // Rule 1 (DB-level guard): AND content IS NULL prevents overwriting existing content
  await sql`
    UPDATE resources
    SET content = ${finalContent}, updated_at = NOW()
    WHERE id = ${id}
    AND content IS NULL
  `;

  logger.info(`✅ ${title}: content set (${finalContent.length} chars)`);
  stats.updated++;
  stats.byCategory[categorySlug].updated++;
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  logger.info('\n🚀 Backfill Content Script');
  logger.info(`   Mode:     ${DRY_RUN ? 'DRY RUN (no DB writes)' : 'LIVE'}`);
  logger.info(`   Category: ${TARGET_CATEGORY ?? 'all'}`);
  logger.info(`   Cap:      ${BATCH_CAP} resources total\n`);

  if (TARGET_CATEGORY && !CATEGORY_ORDER.includes(TARGET_CATEGORY)) {
    logger.error(`❌ Unknown category: "${TARGET_CATEGORY}"`);
    logger.error(`   Valid: ${CATEGORY_ORDER.join(', ')}`);
    process.exit(1);
  }

  // Initialise stats for all categories
  CATEGORY_ORDER.forEach(initCategoryStats);

  // Rule 7: fetch up to BATCH_CAP eligible resources, ordered by category priority
  // Single query — global cap across all categories
  const categoryFilter = TARGET_CATEGORY;

  const rows = await sql`
    SELECT r.id, r.title, r.url, r.content, c.slug AS category_slug
    FROM resources r
    INNER JOIN categories c ON r.category_id = c.id
    WHERE r.content IS NULL
      AND r.url LIKE '%github.com%'
      AND c.slug = ANY(${CATEGORY_ORDER})
      ${categoryFilter ? sql`AND c.slug = ${categoryFilter}` : sql``}
    ORDER BY
      CASE c.slug
        WHEN 'mcp-servers'     THEN 1
        WHEN 'rules'           THEN 2
        WHEN 'prompts'         THEN 3
        WHEN 'skills'          THEN 4
        WHEN 'workflows'       THEN 5
        WHEN 'agents'          THEN 6
        WHEN 'boilerplates'    THEN 7
        WHEN 'troubleshooting' THEN 8
        ELSE 99
      END,
      r.title ASC
    LIMIT ${BATCH_CAP}
  `;

  logger.info(`📋 Found ${rows.length} eligible resources (cap: ${BATCH_CAP})\n`);

  if (rows.length === 0) {
    logger.info('Nothing to process. All eligible resources already have content.');
    await sql.end();
    return;
  }

  // Rule 4: pLimit(3) — max 3 parallel GitHub API requests
  const limit = pLimit(3);

  await Promise.all(
    (rows as any[]).map(row =>
      limit(() =>
        processResource({
          id: row.id,
          title: row.title,
          url: row.url,
          categorySlug: row.category_slug,
          content: row.content,
        })
      )
    )
  );

  // --- SUMMARY REPORT ---
  logger.info('\n📊 BACKFILL SUMMARY');
  logger.info(`  ✅ Updated:              ${stats.updated}`);
  logger.info(`  ⏭️  Skipped (has content): ${stats.skippedHasContent}`);
  logger.info(`  ⚠️  No file found:        ${stats.noFileFound}`);
  logger.info(`  🚫 Non-GitHub URL:        ${stats.nonGithub}`);
  logger.info(`  ❌ Errors:               ${stats.errors}`);
  logger.info('\n  By category:');

  const labels: Record<string, string> = {
    'mcp-servers':     'MCP Servers    ',
    'rules':           'Rules          ',
    'prompts':         'Prompts        ',
    'skills':          'Skills         ',
    'workflows':       'Workflows      ',
    'agents':          'Agents         ',
    'boilerplates':    'Boilerplates   ',
    'troubleshooting': 'Troubleshooting',
  };

  for (const slug of CATEGORY_ORDER) {
    const s = stats.byCategory[slug];
    if (!s) continue;
    logger.info(`  ${labels[slug] ?? slug.padEnd(15)}: ${s.updated} updated / ${s.skipped} skipped / ${s.failed} failed`);
  }

  await sql.end();
}

main().catch(err => {
  logger.error('❌ Fatal error:', err);
  process.exit(1);
});
