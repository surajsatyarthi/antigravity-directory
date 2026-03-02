
const { chromium } = require('@playwright/test');
const { injectAxe, checkA11y, getViolations } = require('axe-playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await injectAxe(page);
  
  const violations = await getViolations(page);
  
  const results = {
    critical: violations.filter(v => v.impact === 'critical').length,
    serious: violations.filter(v => v.impact === 'serious').length,
    moderate: violations.filter(v => v.impact === 'moderate').length,
    minor: violations.filter(v => v.impact === 'minor').length,
    total: violations.length,
    details: violations
  };
  
  console.log(JSON.stringify(results));
  await browser.close();
})();
