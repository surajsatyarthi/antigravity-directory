import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

/**
 * Sample E2E test demonstrating cross-phase integration testing
 * This will be expanded in Phase 8
 */

test.describe('Homepage - Filter Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Inject axe for accessibility testing
    await injectAxe(page);
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Antigravity/);
  });

  test('should pass accessibility checks', async ({ page }) => {
    // Phase 7 requirement - accessibility validation
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  });

  test('Phase 2 + Phase 3: Filter selection updates results', async ({ page }) => {
    // Wait for page to load
    await page.waitForSelector('[data-testid="resource-card"]');
    
    // Click filter (Phase 3 component - Category Tabs)
    await page.click('[data-testid="filter-tab-prompts"]');
    
    // Wait for server response (Phase 3 API)
    await page.waitForLoadState('networkidle');
    
    // Verify URL updated
    expect(page.url()).toContain('categories=prompts');
    
    // Verify results updated
    const cards = await page.locator('[data-testid="resource-card"]').all();
    expect(cards.length).toBeGreaterThan(0);
  });

  test('Phase 2 + Phase 4: Filters persist in localStorage', async ({ page }) => {
    // Select filter
    await page.click('[data-testid="filter-tab-prompts"]');
    
    // Check localStorage (Phase 4)
    const localStorage = await page.evaluate(() => 
      window.localStorage.getItem('antigravity_filters')
    );
    
    expect(localStorage).toBeTruthy();
    const filters = JSON.parse(localStorage!);
    expect(filters.categories).toContain('prompts');
  });

  test('Phase 2 + Phase 5: Responsive layout works', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    const grid = await page.locator('[data-testid="resource-grid"]');
    
    // Should have 3 columns on desktop
    const gridColumns = await grid.evaluate((el) => 
      window.getComputedStyle(el).gridTemplateColumns
    );
    expect(gridColumns.split(' ').length).toBe(3);
    
    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    const gridColumnsMobile = await grid.evaluate((el) => 
      window.getComputedStyle(el).gridTemplateColumns
    );
    expect(gridColumnsMobile.split(' ').length).toBe(1);
  });
});
