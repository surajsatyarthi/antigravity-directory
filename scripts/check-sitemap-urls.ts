import fs from 'fs';
import path from 'path';

const SITEMAP_URL = 'https://www.googleantigravity.directory/sitemap.xml';
const CONCURRENCY_LIMIT = 5;
const OUTPUT_FILE = path.join(process.cwd(), 'temp/task092_broken_urls.txt');

async function checkSitemap() {
  console.log(`fetching sitemap: ${SITEMAP_URL}`);
  const response = await fetch(SITEMAP_URL);
  const xml = await response.text();

  const urls = xml.match(/<loc>(.*?)<\/loc>/g)?.map(loc => loc.replace(/<\/?loc>/g, '')) || [];
  console.log(`Found ${urls.length} URLs in sitemap.`);

  const brokenUrls: string[] = [];
  let checkedCount = 0;

  async function checkUrl(url: string, retries = 2) {
    try {
      const res = await fetch(url, { method: 'GET', redirect: 'follow' });
      if (res.status !== 200) {
        brokenUrls.push(`${url} → ${res.status}`);
      }
    } catch (error: any) {
      if (retries > 0) {
        // console.log(`Retrying ${url}...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return checkUrl(url, retries - 1);
      }
      brokenUrls.push(`${url} → ERROR: ${error.message}`);
    } finally {
      if (retries === 2) { // only count original attempts
        checkedCount++;
        if (checkedCount % 100 === 0) {
          console.log(`Checked ${checkedCount}/${urls.length}...`);
        }
      }
    }
  }

  const chunks: string[][] = [];
  for (let i = 0; i < urls.length; i += CONCURRENCY_LIMIT) {
    chunks.push(urls.slice(i, i + CONCURRENCY_LIMIT));
  }

  for (const chunk of chunks) {
    await Promise.all(chunk.map(url => checkUrl(url)));
  }

  const output = [
    `Total checked: ${urls.length} | Non-200: ${brokenUrls.length}`,
    ...brokenUrls
  ].join('\n');

  if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`\nAudit complete.`);
  console.log(`Results written to ${OUTPUT_FILE}`);
  console.log(output);
}

checkSitemap().catch(console.error);
