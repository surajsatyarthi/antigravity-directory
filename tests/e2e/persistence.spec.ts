import { test, expect } from '@playwright/test';

test.describe('Filter Persistence (Phase 4)', () => {
  const STORAGE_KEY = 'antigravity_filters';

  test.beforeEach(async ({ page }) => {
    // Mock the filtered resources API
    await page.route('/api/resources*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: [
            { id: '1', title: 'Test Resource', slug: 'test-resource', categoryName: 'Test' }
          ],
          meta: { total: 1, page: 1, limit: 30, totalPages: 1 }
        })
      });
    });

    // Start at the homepage
    await page.goto('/');
  });

  test('filters should persist after page reload', async ({ page }) => {
    // 1. Select a category (using the Function filter in Sidebar)
    // Note: We'll use the data-testid we added in Phase 2
    const checkbox = page.locator('[data-testid^="filter-checkbox-"]').first();
    const slug = await checkbox.getAttribute('data-testid').then(id => id?.replace('filter-checkbox-', ''));
    
    await checkbox.check();
    
    // 2. Verify URL updated
    await expect(page).toHaveURL(new RegExp(`categories=${slug}`));

    // 3. Reload the page
    await page.reload();

    // 4. Verify checkbox is still checked and URL still has the param
    await expect(checkbox).toBeChecked();
    await expect(page).toHaveURL(new RegExp(`categories=${slug}`));
    
    // 5. Verify localStorage actually has the value
    const storageValue = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
    expect(storageValue).toContain(slug);
  });

  test('URL parameters should override localStorage (Shared Link Priority)', async ({ page }) => {
    // 1. Set a "persisted" filter in localStorage first
    await page.evaluate((key) => {
      localStorage.setItem(key, JSON.stringify({
        categories: ['old-persisted-slug'],
        tags: [],
        search: '',
        sort: 'recommended'
      }));
    }, STORAGE_KEY);

    // 2. Navigate to a specific "shared" link with different parameters
    await page.goto('/?categories=prompts');

    // 3. Verify that the URL param "prompts" won!
    await expect(page).toHaveURL(/categories=prompts/);
    await expect(page).not.toHaveURL(/old-persisted-slug/);

    // 4. Verify localStorage was updated to match the winning URL
    const updatedStorage = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
    expect(updatedStorage).toContain('prompts');
    expect(updatedStorage).not.toContain('old-persisted-slug');
  });

  test('invalid slugs in localStorage should be validated and cleaned', async ({ page }) => {
    // 1. Inject a "zombie" slug into localStorage
    await page.evaluate((key) => {
      localStorage.setItem(key, JSON.stringify({
        categories: ['non-existent-category-123'],
        tags: [],
        search: 'test-query',
        sort: 'latest'
      }));
    }, STORAGE_KEY);

    // 2. Reload page to trigger restoration
    await page.reload();

    // 3. The API (Phase 3) and validation logic (Phase 3 Pre-work) should strip it
    // Note: We check if the checkbox exists (it shouldn't) or if it's checked
    // Also check if the URL was updated but excluded the invalid slug
    await expect(page).not.toHaveURL(/categories=non-existent-category-123/);
    
    // Valid search query should still survive
    await expect(page).toHaveURL(/q=test-query/);
    await expect(page).toHaveURL(/sort=latest/);
  });
});
