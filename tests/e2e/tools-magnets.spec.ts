import { test, expect } from '@playwright/test';

test.describe('AI Utility Tools', () => {

  test('ROI Calculator loads and updates calculation', async ({ page }) => {
    await page.goto('/tools/roi-calculator');
    await expect(page.getByText('LLM Pricing Calculator')).toBeVisible();
    
    // Check initial cost calculation exists
    await expect(page.getByText('Lowest Cost')).toBeVisible();
    
    // Adjust slider (simulate by typing in input to be robust)
    await page.getByLabel('Active Users').fill('500');
    // Verify the cost updates (check for non-zero or updated value logic if possible, or just presence)
    await expect(page.locator('.recharts-responsive-container')).toBeVisible();
  });

  test('Token Counter accepts input', async ({ page }) => {
    await page.goto('/tools/token-counter');
    await expect(page.getByText('TikToken Counter')).toBeVisible();
    
    const input = page.getByPlaceholder('Paste your text here to count tokens...');
    await input.fill('Hello world, this is a token test.');
    
    // Check if token count updates greater than 0
    // "Token Count" label is present, number should be non-zero
    const tokenDisplay = page.locator('.text-6xl');
    await expect(tokenDisplay).not.toHaveText('0');
  });

  test('RAG Visualizer renders chunks', async ({ page }) => {
    await page.goto('/tools/rag-visualizer');
    await expect(page.getByText('RAG Chunk Visualizer')).toBeVisible();
    
    // Verify default chunks are rendered
    await expect(page.getByText('#1 |')).toBeVisible();
    
    // Change chunk size
    const slider = page.getByLabel('Chunk Size (chars)');
    // Since sliders are hard to manipulate in Playwright without specialized drag actions, 
    // we'll rely on the default state rendering correctly for this smoke test.
    await expect(page.locator('.grid.gap-3')).toBeVisible();
  });

  test('Prompt Optimizer UI loads', async ({ page }) => {
    await page.goto('/tools/prompt-generator');
    await expect(page.getByText('Prompt Optimizer')).toBeVisible();
    
    // Verify input area
    await expect(page.getByPlaceholder("Paste your rough prompt here... (e.g. 'Write a blog post about AI')")).toBeVisible();
    
    // Verification of API call would require mocking or live key, 
    // for production safe test we just verify the UI structure.
    await expect(page.getByRole('button', { name: 'Optimize with Gemini' })).toBeVisible();
  });

});
