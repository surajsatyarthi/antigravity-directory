import { test, expect } from '@playwright/test';

test.describe('Comparison Pages - New Routes', () => {
  // Test 1: Vercel vs Netlify
  test.skip('should load Vercel vs Netlify comparison page', async ({ page }) => {
    await page.goto('/vs/vercel-vs-netlify');
    
    // Check page loaded
    await expect(page).toHaveTitle(/Vercel vs Netlify.*Antigravity/);
    
    // Check hero content
    await expect(page.locator('h1')).toContainText('Netlify');
    await expect(page.locator('h1')).toContainText('vs');
    await expect(page.locator('h1')).toContainText('Vercel');
    
    // Check comparison table rows
    await expect(page.getByText('Performance (TTFB)')).toBeVisible();
    await expect(page.getByText('Next.js Integration')).toBeVisible();
    await expect(page.getByText('Edge Functions')).toBeVisible();
  });

  // Test 2: Gemini 3 vs Claude 3.5
  test.skip('should load Gemini 3 vs Claude 3.5 comparison page', async ({ page }) => {
    await page.goto('/vs/gemini-3-vs-claude-3.5');
    
    // Check page loaded
    await expect(page).toHaveTitle(/Gemini 3 Pro vs Claude 3\.5 Sonnet.*Antigravity/);
    
    // Check for specific benchmark features
    await expect(page.getByText('MMLU (Knowledge)').first()).toBeVisible();
    await expect(page.getByText('HumanEval (Coding)').first()).toBeVisible();
    await expect(page.getByText('Context Window').first()).toBeVisible();
    await expect(page.getByText(/2,000,000 tokens/).first()).toBeVisible();
  });

  // Test 3: Supabase vs PlanetScale  
  test.skip('should load Supabase vs PlanetScale comparison page', async ({ page }) => {
    await page.goto('/vs/supabase-vs-planetscale');
    
    // Check page loaded
    await expect(page).toHaveTitle(/Supabase vs PlanetScale.*Antigravity/);
    
    // Check for specific database features
    await expect(page.getByText('Vector Search').first()).toBeVisible();
    await expect(page.getByText('Database Core').first()).toBeVisible();
    await expect(page.getByText(/pgvector/).first()).toBeVisible();
  });

  // Test 4: Back navigation works
  test.skip('should navigate back to comparison index', async ({ page }) => {
    await page.goto('/vs/vercel-vs-netlify');
    await page.getByText('Back to Comparisons').click();
    await expect(page).toHaveURL('/vs');
  });
});
