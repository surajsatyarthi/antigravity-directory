import { test, expect } from '@playwright/test';

test.describe('Production Site Audit', () => {
  const SITE_URL = 'https://www.googleantigravity.directory';

  test.skip('Homepage has correct 3-column layout', async ({ page }) => {
    await page.goto(SITE_URL);
    await page.setViewportSize({ width: 1600, height: 1000 });

    // 1. Sidebar Filters (Left)
    await expect(page.locator('aside >> text=Browse by Category')).toBeVisible();
    
    // 2. Resource Grid (Center)
    await expect(page.locator('#main-grid')).toBeVisible();
    await expect(page.locator('role=region[name="Agent Marketplace Grid"]')).toBeVisible();

    // 3. Sponsored/Community Rail (Right)
    await expect(page.locator('text=Community')).toBeVisible();
    await expect(page.locator('text=Sponsored')).toBeVisible();
    await expect(page.locator('text=Advertisement Area')).toBeVisible();
  });

  test.skip('Navigation links are correct', async ({ page }) => {
    await page.goto(SITE_URL);

    // Explore should point to /
    const exploreLink = page.locator('a:has-text("Explore")');
    await expect(exploreLink).toHaveAttribute('href', '/');

    // Clicking Explore should stay on homepage or load /
    await exploreLink.click();
    await expect(page).toHaveURL(SITE_URL + '/');
  });

  test.skip('Responsive behavior: Sidebar hides on mobile', async ({ page }) => {
    await page.goto(SITE_URL);
    
    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Sidebar should be hidden
    await expect(page.locator('aside >> text=Browse by Category')).not.toBeVisible();
    
    // Mobile menu button should be visible
    await expect(page.locator('aria-label="Open mobile menu"')).toBeVisible();
  });

  test.skip('Check for broken images/assets', async ({ page }) => {
    await page.goto(SITE_URL);
    
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const isVisible = await img.isVisible();
      if (isVisible) {
        const naturalWidth = await img.evaluate((node: HTMLImageElement) => node.naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
      }
    }
  });
});
