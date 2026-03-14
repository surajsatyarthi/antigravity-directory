import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import puppeteer from 'puppeteer';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';
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
  fs.writeFileSync('temp/task045_http_status.txt', statusLines.join('\n') + '\n');
  console.log('Saved temp/task045_http_status.txt');

  // Puppeteer Screenshot and Recording
  console.log('Starting Puppeteer for TASK-045 evidence...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  const recorder = new PuppeteerScreenRecorder(page);
  await page.setViewport({ width: 1280, height: 1000 });
  
  // Detail page w/ Related Resources
  console.log('Loading detail page:', `http://127.0.0.1:3000/t/${slug}`);
  await page.goto(`http://127.0.0.1:3000/t/${slug}`, { waitUntil: 'networkidle0', timeout: 60000 });
  
  // wait for content
  await page.waitForSelector('h1', { timeout: 15000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'temp/task045_detail_with_related.png', fullPage: true });
  console.log('Saved temp/task045_detail_with_related.png');

  // Start recording interactions
  console.log('Starting screen recording...');
  await recorder.start('temp/task045_recording.webm');
  await new Promise(r => setTimeout(r, 1000));
  
  // Hover over the first related card
  const relatedCard = await page.$('div.grid.grid-cols-1.md\\:grid-cols-3.gap-4 > a');
  if (relatedCard) {
      await relatedCard.hover();
      console.log('Hovered over related card.');
      await new Promise(r => setTimeout(r, 1500));
      await relatedCard.click();
      console.log('Clicked related card.');
      await new Promise(r => setTimeout(r, 3000)); // wait for navigation
  } else {
      console.log('No related cards found to hover/click.');
  }

  await recorder.stop();
  console.log('Saved temp/task045_recording.webm');

  // Homepage screening
  console.log('Loading homepage: http://127.0.0.1:3000/');
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'temp/task045_homepage.png', fullPage: true });
  console.log('Saved temp/task045_homepage.png');

  // Category page screening
  console.log('Loading category page: http://127.0.0.1:3000/mcp-servers');
  await page.goto('http://127.0.0.1:3000/mcp-servers', { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'temp/task045_category_page.png', fullPage: true });
  console.log('Saved temp/task045_category_page.png');

  await browser.close();
  console.log('Evidence collection complete.');
}

run();
