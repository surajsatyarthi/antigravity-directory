import { chromium } from 'playwright';
import fs from 'fs';

async function run() {
  if (!fs.existsSync('temp')) fs.mkdirSync('temp');
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });

  console.log('Navigating to http://localhost:3000/');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // give it a sec for images to load
  
  await page.screenshot({ path: 'temp/task031_homepage_badge.png', fullPage: true });
  await page.screenshot({ path: 'temp/task031_homepage_card.png' });
  
  console.log('Navigating to http://localhost:3000/mcp-servers');
  await page.goto('http://localhost:3000/mcp-servers', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: 'temp/task031_category_banner.png' });

  await browser.close();
  console.log('Screenshots captured successfully.');
}
run().catch(console.error);
