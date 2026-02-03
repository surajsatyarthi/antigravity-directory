import { test, expect } from '@playwright/test';

test.describe('Tools Shell & Navigation', () => {
  
  test.skip('should render the persistent layout with sidebar', async ({ page }) => {
    // Navigate to a specific tool page (using one that exists or will exist)
    await page.goto('/tools/json-to-pydantic'); // Assuming this is one of our tools

    // Verify Sidebar exists
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();

    // Verify Sidebar contains navigation links
    // We expect at least one link to "JSON to Pydantic" or generic structure
    await expect(sidebar).toContainText('JSON to Pydantic');

    // Verify Main Content exists
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test.skip('should persist sidebar state across navigation', async ({ page }) => {
    await page.goto('/tools/json-to-pydantic');
    
    // Check initial state (Sidebar open on desktop)
    await expect(page.locator('aside')).toHaveClass(/translate-x-0/);
    
    // Toggle sidebar (if close button exists) - verify basic shell interactivity
    const toggleBtn = page.getByTitle('Close Sidebar');
    if (await toggleBtn.isVisible()) {
        await toggleBtn.click();
        await expect(page.locator('aside')).toHaveClass(/w-16/); // Collapsed width
    }
  });

  test.skip('should be responsive on mobile', async ({ page }) => {
    // Set viewport to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/tools/json-to-pydantic');

    // Sidebar should be hidden by default on mobile
    const sidebar = page.locator('aside');
    await expect(sidebar).toHaveClass(/-translate-x-full/);

    // Open sidebar
    const toggleBtn = page.getByTitle('Open Sidebar');
    await toggleBtn.click();
    
    // Sidebar should now be visible (overlay mode)
    await expect(sidebar).toHaveClass(/translate-x-0/);
  });

  test.skip('should have correct metadata wrappers', async ({ page }) => {
    await page.goto('/tools/json-to-pydantic');
    
    // Verify breadcrumbs or JSON-LD schema presence
    // This assumes the layout injects schema
    const schemaScript = page.locator('script[type="application/ld+json"]');
    await expect(schemaScript).toBeAttached();
  });
});
