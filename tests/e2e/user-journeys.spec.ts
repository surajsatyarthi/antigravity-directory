import { test, expect } from '@playwright/test';

/**
 * END-TO-END TEST
 * 
 * Complete User Journey - Tool Submission to Payment
 * Priority: P0 (Revenue Critical)
 * 
 * Tests the entire flow that generates revenue:
 * 1. User visits submit page
 * 2. Fills out form
 * 3. Proceeds to checkout
 * 4. Completes payment
 * 5. Resource is verified
 */

test.describe('E2E: Tool Submission Flow', () => {
  test.skip('complete submission flow from form to payment', async ({ page }) => {
    // Navigate to submit page
    await page.goto('http://localhost:3000/submit');
    
    // Verify page loaded
    await expect(page).toHaveTitle(/submit/i);
    
    // Fill out form
    await page.fill('[name="toolName"]', 'My Amazing AI Tool');
    await page.fill('[name="website"]', 'https://myaitool.com');
    await page.fill('[name="description"]', 'A revolutionary AI tool that changes everything');
    
    // Select category
    await page.selectOption('[name="category"]', 'generator');
    
    // Submit form
    await page.click('button:has-text("Proceed to Selection")');
    
    // Wait for checkout overlay
    await expect(page.locator('text=Select Your Plan')).toBeVisible();
    
    // Verify pricing is displayed
    await expect(page.locator('text=$149')).toBeVisible();
    
    // Click featured plan
    await page.click('button:has-text("Select Featured")');
    
    // Should redirect to payment
    await expect(page).toHaveURL(/checkout|paypal|razorpay/);
  });

  test.skip('validates form before allowing submission', async ({ page }) => {
    await page.goto('http://localhost:3000/submit');
    
    // Try to submit without filling form
    await page.click('button:has-text("Proceed")');
    
    // Should show validation errors
    await expect(page.locator('text=/required/i')).toBeVisible();
  });
});

test.describe('E2E: Admin Dashboard - Edward Workflow', () => {
  test.skip('admin can enrich contacts for prospects', async ({ page }) => {
    // Login as admin first
    await page.goto('http://localhost:3000/auth/signin');
    // Auth flow would go here
    
    // Navigate to dashboard
    await page.goto('http://localhost:3000/dashboard');
    
    // Verify Edward panel is visible
    await expect(page.locator('text=Edward Outreach Intelligence')).toBeVisible();
    
    // Click enrich contacts
    await page.click('button:has-text("Enrich Contacts")');
    
    // Wait for enrichment to complete
    await expect(page.locator('text=/enriched/i')).toBeVisible({ timeout: 30000 });
    
    // Verify results are shown
    await expect(page.locator('text=/emails found/i')).toBeVisible();
  });
});

test.describe('E2E: Tool Pages - SEO Critical', () => {
  test.skip('tool page loads with all key elements', async ({ page }) => {
    await page.goto('http://localhost:3000/tools/grammarly');
    
    // Verify page title
    await expect(page).toHaveTitle(/grammarly/i);
    
    // Verify hero section
    await expect(page.locator('h1')).toContainText('Grammarly');
    
    // Verify CTA is visible
    await expect(page.locator('text=Claim & Verify Now')).toBeVisible();
    
    // Verify newsletter capture
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test.skip('tool page loads in under 2 seconds', async ({ page }) => {
    const start = Date.now();
    
    await page.goto('http://localhost:3000/tools/cursor');
    await expect(page.locator('h1')).toBeVisible();
    
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(2000); // 2 seconds
  });
});

test.describe('E2E: Visual Regression', () => {
  test.skip('homepage looks correct', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      maxDiffPixels: 100, // Allow small differences
    });
  });

  test.skip('tool listing page matches snapshot', async ({ page }) => {
    await page.goto('http://localhost:3000/tools');
    await expect(page).toHaveScreenshot('tools-page.png', {
      fullPage: true,
    });
  });
});
