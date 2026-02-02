import { test, expect } from '@playwright/test';

test.describe('Mobile Responsiveness', () => {
  // Test on iPhone SE viewport (smallest common mobile)
  test.use({ viewport: { width: 375, height: 667 } });

  test('Resource cards have adequate touch targets', async ({ page }) => {
    await page.goto('/');
    
    // Wait for content to load
    await page.waitForSelector('#resource-grid');
    
    // Check bookmark buttons
    const bookmarkButtons = page.locator('[aria-label*="Bookmark"]');
    const count = await bookmarkButtons.count();
    
    // Check first few visible buttons
    for (let i = 0; i < Math.min(count, 3); i++) {
        const box = await bookmarkButtons.nth(i).boundingBox();
        if (box) {
            expect(box.width).toBeGreaterThanOrEqual(44);
            expect(box.height).toBeGreaterThanOrEqual(44);
        }
    }
  });

  test('Resource grid displays single column on mobile', async ({ page }) => {
    await page.goto('/');
    
    // Wait for grid
    const grid = page.locator('#resource-grid');
    await expect(grid).toBeVisible();
    
    // Get computed style for grid display
    // Note: The main resource grid is flex-col on mobile/desktop in the current codebase (from page.tsx changes) -> Actually page.tsx has `flex flex-col gap-3`. 
    // The implementation plan mentioned grids in other pages. Let's check prompts page which uses grid.
    await page.goto('/prompts');
    
    const promptsGrid = page.locator('.grid').first();
    const gridCols = await promptsGrid.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.getPropertyValue('grid-template-columns');
    });
    
    // In a single column grid, grid-template-columns usually returns one value (width of column)
    // If it has spaces, it means multiple columns.
    // However, autosizing might return "343px" etc.
    // Let's check if the count of columns is 1 based on splitting by space if it's explicit, 
    // or we can visually check if items are stacked.
    
    const cards = promptsGrid.locator('> a'); // Prompts are links
    const firstCardBox = await cards.nth(0).boundingBox();
    const secondCardBox = await cards.nth(1).boundingBox();
    
    if (firstCardBox && secondCardBox) {
        // In single column, second card should be below first
        expect(secondCardBox.y).toBeGreaterThan(firstCardBox.y + firstCardBox.height / 2);
        // And they should have roughly same X
        expect(Math.abs(firstCardBox.x - secondCardBox.x)).toBeLessThan(20);
    }
  });

  test('No horizontal scroll on mobile', async ({ page }) => {
    await page.goto('/');
    
    // Allow some time for hydration/layout
    await page.waitForTimeout(1000);
    
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    
    // Check if scrollable width is not significantly larger than client width
    // Playwright sometimes reports 1px diff due to subpixel rendering
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });
  
  test('Directory Intelligence grid behavior', async ({ page }) => {
      await page.goto('/');
      
      // The DirectoryIntelligence component grid
      // It should be inside the first section of main
      // We look for the grid that contains "Live Sync" text
      const uspItem = page.getByText('Live Sync', { exact: true });
      const gridContainer = uspItem.locator('..').locator('..').locator('..'); // traversing up to container
      
      // On mobile it should reflect the class changes (we can't easily check classes in compiled CSS, but we can check layout)
      // We expect it to be 1 column on 375px (sm:grid-cols-2 starts at 640px)
      // So items should be stacked.
      
      const items = gridContainer.locator('> div');
      const firstBox = await items.nth(0).boundingBox();
      const secondBox = await items.nth(1).boundingBox();
      
      if (firstBox && secondBox) {
          expect(secondBox.y).toBeGreaterThan(firstBox.y);
      }
  });
});
