import { test, expect } from '@playwright/test';

test.describe('Download Page', () => {
  test.skip('should display download options for all platforms', async ({ page }) => {
    // 1. Visit Download Page
    await page.goto('/download');

    // 2. Assert Header
    await expect(page.getByRole('heading', { name: 'Download Antigravity', level: 1 })).toBeVisible();

    // 3. Assert macOS Card (Primary)
    // Should have white button
    const macButton = page.getByRole('link', { name: 'Download for Mac' });
    await expect(macButton).toBeVisible();
    await expect(macButton).toHaveClass(/bg-white/);

    // 4. Assert Windows/Linux Cards (Secondary/Coming Soon)
    await expect(page.getByRole('heading', { name: 'Windows', level: 2 })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Download for Windows' })).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Linux', level: 2 })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Download for Linux' })).toBeVisible();

    // 5. Assert System Requirements
    await expect(page.getByText('System Requirements')).toBeVisible();
    await expect(page.getByText('4GB RAM')).toBeVisible();
  });
});
