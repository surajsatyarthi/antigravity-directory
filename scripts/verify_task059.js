const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  if (!fs.existsSync('temp')) fs.mkdirSync('temp');
  console.log('Starting puppeteer...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  const urls = [
    { name: 'homepage', url: 'http://127.0.0.1:3000/' },
    { name: 'mcp_servers', url: 'http://127.0.0.1:3000/mcp-servers' },
    { name: 'tools', url: 'http://127.0.0.1:3000/tools' },
    { name: 'admin', url: 'http://127.0.0.1:3000/admin' },
    { name: 'detail_page', url: 'http://127.0.0.1:3000/t/playwright-mcp' },
  ];

  let consoleLogs = [];
  let networkErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') consoleLogs.push(msg.text());
  });
  page.on('requestfailed', request => {
    networkErrors.push(request.url() + ' ' + request.failure().errorText);
  });
  page.on('response', response => {
    // Ignore some likely 404s like favicons or analytics telemetry
    if (!response.ok() && !response.url().includes('favicon') && !response.url().includes('telemetry')) {
        networkErrors.push(response.url() + ' ' + response.status());
    }
  });

  for (const item of urls) {
    console.log(`Navigating to ${item.name}...`);
    const response = await page.goto(item.url, { waitUntil: 'networkidle0', timeout: 60000 });
    console.log(`HTTP Status for ${item.url}: ${response.status()}`);
    
    if (item.name === 'detail_page') {
      // Wait for an essential content element to verify the spinner is gone
      await page.waitForSelector('h1', { timeout: 15000 }).catch(() => console.log("H1 not found"));
      await page.waitForSelector('article', { timeout: 15000 }).catch(() => console.log("Article not found"));
      // Hard wait for any remaining suspense boundaries
      await new Promise(r => setTimeout(r, 2000));
    }
    
    await page.screenshot({ path: `temp/task059_${item.name}.png`, fullPage: true });
  }

  console.log('\n--- VERIFICATION RESULTS ---');
  console.log('Console Errors:', consoleLogs.length > 0 ? consoleLogs : 'None');
  console.log('Network Errors:', networkErrors.length > 0 ? networkErrors : 'None');

  await browser.close();
  console.log('All TASK-059 checks and screenshots captured!');
})();
