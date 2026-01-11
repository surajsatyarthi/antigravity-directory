import { test, expect } from '@playwright/test';

const STORAGE_KEY = 'antigravity_filters';

test.describe('Filter Persistence (Phase 4)', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log(`BROWSER [${msg.type()}]: ${msg.text()}`));
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
  });

  test('filters should persist after page reload', async ({ page }) => {
    // 1. Land on homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // 2. Click a category checkbox
    const checkbox = page.locator('label:has-text("Prompts")');
    await checkbox.click();
    
    const slug = 'prompts';

    // 3. Wait for URL to update
    await expect(page).toHaveURL(new RegExp(`categories=${slug}`), { timeout: 15000 });
    
    // 4. Reload
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // 5. Verify check persisted (Server-side validation check)
    await expect(async () => {
      const main = page.locator('main');
      const stateStr = await main.getAttribute('data-filter-state');
      const state = JSON.parse(stateStr || '{}');
      expect(state.categories).toContain(slug);
    }).toPass({ timeout: 15000 });
    
    // 6. Verify storage eventually matches
    await expect(async () => {
      const storageValue = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
      expect(storageValue).toContain(slug);
    }).toPass({ timeout: 10000 });
  });

  test('URL parameters should override localStorage (Shared Link Priority)', async ({ page }) => {
    const URL_SLUG = 'prompts';
    const STORED_SLUG = 'rules';

    // 1. Pre-seed storage
    await page.addInitScript(({ key, slug }) => {
      localStorage.setItem(key, JSON.stringify({
        categories: [slug],
        tags: [],
        search: '',
        sort: 'recommended'
      }));
    }, { key: STORAGE_KEY, slug: STORED_SLUG });

    // 2. Navigate with URL params
    await page.goto(`/?categories=${URL_SLUG}`);
    await page.waitForLoadState('networkidle');

    // 3. Verify URL won (DOM state check)
    await expect(async () => {
      const main = page.locator('main');
      const stateStr = await main.getAttribute('data-filter-state');
      const state = JSON.parse(stateStr || '{}');
      expect(state.categories).toContain(URL_SLUG);
      expect(state.categories).not.toContain(STORED_SLUG);
    }).toPass({ timeout: 15000 });
    
    // 4. Verify storage was eventually updated to URL state
    await expect(async () => {
      const updatedStorage = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
      expect(updatedStorage).toContain(URL_SLUG);
    }).toPass({ timeout: 10000 });
  });

  test('invalid slugs in localStorage should be validated and cleaned', async ({ page }) => {
    const INVALID_SLUG = 'invalid-123-slug';
    const VALID_QUERY = 'valid-query';
    
    // 1. Pre-seed invalid storage BEFORE navigation
    await page.addInitScript(({ key, slug, query }) => {
      localStorage.setItem(key, JSON.stringify({
        categories: [slug],
        tags: [],
        search: query,
        sort: 'latest'
      }));
    }, { key: STORAGE_KEY, slug: INVALID_SLUG, query: VALID_QUERY });

    // 2. Load page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 2.5 Wait for URL to be reflected (even if dirty, q should be there)
    await expect(page).toHaveURL(new RegExp(`q=${VALID_QUERY}`), { timeout: 15000 });

    // 3. Verify invalid is gone from Data State (Cleaned by server)
    await expect(async () => {
      const main = page.locator('main');
      const stateStr = await main.getAttribute('data-filter-state');
      const state = JSON.parse(stateStr || '{}');
      expect(state.categories).not.toContain(INVALID_SLUG);
      expect(state.q).toBe(VALID_QUERY);
    }).toPass({ timeout: 15000 });
  });
});
