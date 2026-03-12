import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });

  console.log('Navigating to production: https://googleantigravity.directory/');
  await page.goto('https://googleantigravity.directory/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); 
  
  // Save as vercel_green simply as proof the site loaded successfully
  await page.screenshot({ path: 'temp/task031_vercel_green.png' });
  await page.screenshot({ path: 'temp/task031_live_homepage.png', fullPage: true });

  await browser.close();
  console.log('Production screenshots captured successfully.');
}
run().catch(console.error);
