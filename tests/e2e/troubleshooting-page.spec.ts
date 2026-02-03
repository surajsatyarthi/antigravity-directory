import { test, expect } from '@playwright/test';

test.describe('Troubleshooting Page', () => {
  test.skip('should display categories and expandable sections', async ({ page }) => {
    // 1. Visit Page
    await page.goto('/troubleshooting');

    // 2. Assert Header
    await expect(page.getByRole('heading', { name: 'Troubleshooting' })).toBeVisible();

    // 3. Assert Categories
    await expect(page.getByText('Login & Authentication')).toBeVisible();
    await expect(page.getByText('Agents & MCP Servers')).toBeVisible();
    await expect(page.getByText('Performance & Memory')).toBeVisible();

    // 4. Test Accordion Interaction
    const loginSummary = page.getByText('Login screen is stuck or blank');
    // Content should be hidden initially (or simply inside the collapsed details)
    // Note: Playwright .toBeVisible() checks layout visibility. In a collapsed <details>, content is usually not visible.
    
    // Click summary to expand
    await loginSummary.click();

    // Assert content is now visible
    // We look for specific text inside that detail
    await expect(page.getByText('Full Restart:')).toBeVisible();

    // 5. Check Discord Link
    const discordLink = page.getByRole('link', { name: 'Join Discord Support' });
    await expect(discordLink).toBeVisible();
    await expect(discordLink).toHaveAttribute('href', 'https://discord.gg/antigravity');
  });
});
