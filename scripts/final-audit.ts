
const BASE_URL = 'https://www.googleantigravity.directory';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

async function audit() {
  console.log(`Fetching sitemap from ${SITEMAP_URL}...`);
  const response = await fetch(SITEMAP_URL);
  const xml = await response.text();
  
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  console.log(`Found ${urls.length} URLs in sitemap.`);
  
  const broken = [];
  const concurrency = 5;
  let activeCount = 0;
  let finishedCount = 0;
  let index = 0;

  async function fetchWithRetry(url: string, retries = 3): Promise<number | string> {
    for (let i = 0; i < retries; i++) {
        try {
          const res = await fetch(url, { method: 'HEAD', redirect: 'manual' });
          return res.status;
        } catch (err) {
          if (i === retries - 1) return `ERROR: ${err.message}`;
          await new Promise(r => setTimeout(r, 1000 * (i + 1))); // Exponential backoff
        }
    }
    return 'RETRY_FAILED';
  }

  await new Promise<void>((resolve) => {
    async function next() {
      if (index >= urls.length) {
        if (activeCount === 0) resolve();
        return;
      }

      const currentUrl = urls[index++];
      activeCount++;
      
      const status = await fetchWithRetry(currentUrl);
      if (status !== 200) {
        broken.push(`${currentUrl} → ${status}`);
      }
      
      activeCount--;
      finishedCount++;
      if (finishedCount % 100 === 0) {
        console.log(`Processed ${finishedCount}/${urls.length}...`);
      }
      next();
    }

    for (let i = 0; i < concurrency; i++) {
      next();
    }
  });

  const summary = `Total checked: ${urls.length} | Non-200: ${broken.length}`;
  const output = [summary, ...broken].join('\n');
  console.log(summary);
  
  const reportedSlugs = ['rag-antigravity-rules', 'pcc-antigravity-rules', 'tutorial-extended-thinking-claude', 'openlit-y7m'];
  console.log('\nChecking reported slugs manually:');
  for (const slug of reportedSlugs) {
    const url = `${BASE_URL}/t/${slug}`;
    const status = await fetchWithRetry(url);
    console.log(`${url} → ${status}`);
  }

  const fs = require('fs');
  const path = require('path');
  const tempDir = path.join(process.cwd(), 'temp');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
  fs.writeFileSync(path.join(tempDir, 'task092_broken_urls.txt'), output);
}

audit().catch(console.error);
