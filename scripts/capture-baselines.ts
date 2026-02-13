import { chromium } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const BASELINE_DIR = path.join(process.cwd(), 'tests/visual/baselines');
const BASE_URL = 'http://localhost:3000';

const SCREENSHOTS = [
  { name: 'homepage-desktop', url: '/', viewport: { width: 1920, height: 1080 } },
  { name: 'homepage-tablet', url: '/', viewport: { width: 768, height: 1024 } },
  { name: 'homepage-mobile', url: '/', viewport: { width: 375, height: 667 } },
  { name: 'prompts-page', url: '/prompts', viewport: { width: 1920, height: 1080 } },
  { name: 'mcps-page', url: '/mcp-servers', viewport: { width: 1920, height: 1080 } },
];

async function captureBaselines() {
  // Ensure baseline directory exists
  if (!fs.existsSync(BASELINE_DIR)) {
    fs.mkdirSync(BASELINE_DIR, { recursive: true });
  }

  console.log('📸 BASELINE SCREENSHOT CAPTURE\n');
  console.log('═'.repeat(60));
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Output: ${BASELINE_DIR}\n`);

  const browser = await chromium.launch();
  
  for (const screenshot of SCREENSHOTS) {
    const context = await browser.newContext({
      viewport: screenshot.viewport,
      deviceScaleFactor: 2, // Retina display quality
    });
    
    const page = await context.newPage();
    
    try {
      console.log(`📷 Capturing: ${screenshot.name}`);
      console.log(`   URL: ${screenshot.url}`);
      console.log(`   Viewport: ${screenshot.viewport.width}x${screenshot.viewport.height}`);
      
      await page.goto(`${BASE_URL}${screenshot.url}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000); // Wait for animations
      
      const screenshotPath = path.join(BASELINE_DIR, `${screenshot.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      
      console.log(`   ✅ Saved: ${screenshot.name}.png\n`);
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}\n`);
    } finally {
      await context.close();
    }
  }
  
  await browser.close();
  
  console.log('═'.repeat(60));
  console.log(`✅ Baseline screenshots captured: ${SCREENSHOTS.length} files\n`);
  console.log('📝 Next steps:');
  console.log('   1. Review screenshots in tests/visual/baselines/');
  console.log('   2. Use these as reference for future visual regression tests');
  console.log('   3. Re-run this script to update baselines when UI changes are approved\n');
}

captureBaselines().catch(error => {
  console.error('\n❌ FATAL ERROR:', error.message);
  process.exit(1);
});
