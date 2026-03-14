import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import puppeteer from 'puppeteer';
import * as fs from 'fs';

config({ path: resolve(process.cwd(), '.env.local') });

async function run() {
  const sql = postgres(process.env.DATABASE_URL!);
  
  let slug = '';
  try {
    const result = await sql`SELECT slug FROM resources WHERE status = 'LIVE' LIMIT 1`;
    if (result.length > 0) {
      slug = result[0].slug;
      console.log('Found LIVE slug:', slug);
    } else {
      console.log('No LIVE slug found. Exiting.');
      process.exit(1);
    }
  } catch (error) {
    console.error('DB Error:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }

  // HTTP Checks
  const urls = [
    'http://127.0.0.1:3000/',
    'http://127.0.0.1:3000/mcp-servers',
    'http://127.0.0.1:3000/tools',
    `http://127.0.0.1:3000/t/${slug}`
  ];

  let statusLines = [];
  for (const url of urls) {
    try {
      const resp = await fetch(url);
      statusLines.push(`${url} → ${resp.status}`);
      console.log(`${url} → ${resp.status}`);
    } catch (e) {
      statusLines.push(`${url} → ERROR`);
      console.log(`${url} → ERROR`);
    }
  }

  if (!fs.existsSync('temp')) fs.mkdirSync('temp');
  fs.writeFileSync('temp/task059_http_status.txt', statusLines.join('\n') + '\n');
  console.log('Saved temp/task059_http_status.txt');

  // Puppeteer Screenshot
  console.log('Taking screenshot...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  console.log('Loading page:', `http://127.0.0.1:3000/t/${slug}`);
  await page.goto(`http://127.0.0.1:3000/t/${slug}`, { waitUntil: 'networkidle0', timeout: 60000 });
  
  // wait for content (not spinner)
  await page.waitForSelector('h1', { timeout: 15000 }).catch(() => {});
  await page.waitForSelector('.prose', { timeout: 15000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 2000)); // Buffer
  
  await page.screenshot({ path: 'temp/task059_detail_page.png', fullPage: true });
  await browser.close();
  console.log('Saved temp/task059_detail_page.png');
}

run();
