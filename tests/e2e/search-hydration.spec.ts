import { test, expect } from '@playwright/test';

test.describe('Search Input Hydration', () => {
  test('should have search input populated immediately on load', async ({ page }) => {
    // 1. Visit page with query param
    const query = 'hydration-test';
    await page.goto(`/?q=${query}`);

    // 2. Get input value immediately (no wait)
    // We want to ensure that even before potential client-side effects, the HTML has the value
    // or at least it appears very quickly.
    const searchInput = page.locator('input[placeholder="Search prompts, rules, MCPs..."]');
    
    // 3. Assert value is correct
    // checking for 'value' property
    await expect(searchInput).toHaveValue(query);
  });
});
