import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });

  console.log('Navigating to http://localhost:3000/mcp-servers (Default: Recommended)');
  await page.goto('http://localhost:3000/mcp-servers', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); 
  
  // Get first 3 titles
  const recommendedTitles = await page.$$eval('.group.relative.flex.flex-col h3', els => els.slice(0, 3).map(e => e.textContent?.trim()));
  console.log('Recommended order (first 3 titles):', recommendedTitles);
  await page.screenshot({ path: 'temp/task032_sort_recommended.png' });

  // Click LATEST sort option
  console.log('Clicking Latest sort...');
  // The sort buttons are typically inside a component. Let's find "Latest"
  // Could be an a tag or button
  const latestBtn = await page.getByRole('link', { name: 'Latest' });
  if (await latestBtn.count() > 0) {
    await latestBtn.first().click();
  } else {
    // maybe it's a button
    await page.getByText('Latest', { exact: true }).first().click();
  }
  
  await page.waitForURL('**/mcp-servers?sort=latest', { timeout: 5000 }).catch(e => console.log('URL wait failed', e));
  console.log('URL after click:', page.url());
  await page.waitForTimeout(2000);
  
  const latestTitles = await page.$$eval('.group.relative.flex.flex-col h3', els => els.slice(0, 3).map(e => e.textContent?.trim()));
  console.log('Latest order (first 3 titles):', latestTitles);
  await page.screenshot({ path: 'temp/task032_sort_latest.png' });

  await browser.close();
  console.log('Visual verification completed.');
}
run().catch(console.error);
