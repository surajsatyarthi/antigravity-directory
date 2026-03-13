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
  await page.screenshot({ path: 'temp/task057_homepage.png', fullPage: true });

  // 2. Detail Page
  console.log('Navigating to detail page...');
  await page.goto('http://127.0.0.1:3000/t/playwright-mcp', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.screenshot({ path: 'temp/task057_detail_page.png', fullPage: true });

  // 3. Badge Preview Snippet
  console.log('Capturing badge preview...');
  try {
    const badgeElement = await page.$('div:has(> svg):has(text="Listed on Antigravity Directory")');
    if (badgeElement) {
      await badgeElement.screenshot({ path: 'temp/task057_badge_preview.png' });
    } else {
      await page.screenshot({ path: 'temp/task057_badge_preview.png' });
    }
  } catch(e) {
    await page.screenshot({ path: 'temp/task057_badge_preview.png' });
  }

  await browser.close();
  console.log('All screenshots captured!');
})();
