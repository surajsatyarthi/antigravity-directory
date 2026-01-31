import { test, expect } from '@playwright/test';

test.describe('Navigation State', () => {
  test('should highlight active menu item on desktop', async ({ page }) => {
    // 1. Visit Rules page
    await page.goto('/rules');

    // 2. Check Desktop Nav
    const rulesLink = page.locator('nav').filter({ hasText: 'Rules' }).getByRole('link', { name: 'Rules' });
    
    // 3. Assert Active State (text-white)
    await expect(rulesLink).toHaveClass(/text-white/);
    await expect(rulesLink).not.toHaveClass(/text-gray-300/);

    // 4. Assert Inactive State (Prompts)
    const promptsLink = page.locator('nav').filter({ hasText: 'Prompts' }).getByRole('link', { name: 'Prompts' });
    await expect(promptsLink).toHaveClass(/text-gray-300/);
  });

  test('should highlight active menu item on mobile', async ({ page }) => {
    // 1. Set Viewport to Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/rules');

    // 2. Open Mobile Menu
    await page.getByLabel('Toggle mobile menu').click();

    // 3. Check Mobile Link
    // Note: Mobile menu overrides the desktop nav locator, so we look for the overlay
    const mobileRulesLink = page.getByRole('link', { name: 'Rules' });
    
    // 4. Assert Active State
    await expect(mobileRulesLink).toHaveClass(/text-white/);
    
    // 5. Assert Inactive State
    const mobileMcpLink = page.getByRole('link', { name: 'MCPs' });
    await expect(mobileMcpLink).toHaveClass(/text-gray-300/);
  });
});
