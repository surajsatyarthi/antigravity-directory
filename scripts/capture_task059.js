const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  if (!fs.existsSync('temp')) fs.mkdirSync('temp');
  console.log('Starting puppeteer...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  // 1. Homepage
  console.log('Navigating to homepage...');
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.screenshot({ path: 'temp/task059_homepage.png', fullPage: true });

  // 2. Detail Page
  console.log('Navigating to detail page...');
  await page.goto('http://127.0.0.1:3000/t/playwright-mcp', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.screenshot({ path: 'temp/task059_detail_page.png', fullPage: true });

  // 3. Tools Page
  console.log('Navigating to tools page...');
  await page.goto('http://127.0.0.1:3000/tools', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.screenshot({ path: 'temp/task059_tools.png', fullPage: true });

  await browser.close();
  console.log('All TASK-059 screenshots captured!');
})();
