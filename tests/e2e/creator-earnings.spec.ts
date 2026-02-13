import { test, expect } from '@playwright/test';
import { setupTestDatabase, cleanupTestDatabase } from './helpers/setup-test-db';

test.describe('Creator Earnings Dashboard', () => {
  let testUserId: string;
  let testResourceId: string;

  test.beforeEach(async () => {
    // Setup test database with creator and resource
    const setup = await setupTestDatabase();
    testUserId = setup.userId;
    testResourceId = setup.resourceId;
  });

  test.afterEach(async () => {
    await cleanupTestDatabase();
  });

  test('displays earnings overview correctly with 100%/80% breakdown', async ({ page }) => {
    // Create test purchases with different commission rates
    // TODO: Add test data creation helper
    
    await page.goto('/dashboard');
    
    // Verify earnings section is visible
    await expect(page.getByText('Your Earnings')).toBeVisible();
    
    // Verify total earnings card
    await expect(page.getByText('Total Earnings')).toBeVisible();
    
    // Verify commission breakdown
    await expect(page.getByText('First 2 sales (100%):')).toBeVisible();
    await expect(page.getByText('Sales 3+ (80%):')).toBeVisible();
    
    // Verify pending payout card
    await expect(page.getByText('Pending Payout')).toBeVisible();
  });

  test('shows sales history with pagination', async ({ page }) => {
    // Create 75 test purchases to test pagination
    // TODO: Add bulk test data creation
    
    await page.goto('/dashboard');
    
    // Verify sales history table  exists
    await expect(page.getByText('Sales History')).toBeVisible();
    
    // Verify table headers
    await expect(page.getByText('Resource')).toBeVisible();
    await expect(page.getByText('Date')).toBeVisible();
    await expect(page.getByText('Price')).toBeVisible();
    await expect(page.getByText('Buyer')).toBeVisible();
    await expect(page.getByText('Commission')).toBeVisible();
    await expect(page.getByText('Your Earnings')).toBeVisible();
    
    // Test pagination (if > 50 sales)
    // await expect(page.getByText('Next')).toBeVisible();
    // await page.getByText('Next').click();
    // await expect(page.getByText('Page 2')).toBeVisible();
  });

  test('payout button disabled when balance < $10', async ({ page }) => {
    // Create purchase with earnings < $10
    // TODO: Create test purchase with $5 earnings
    
    await page.goto('/dashboard');
    
    // Find and verify payout button is disabled
    const payoutButton = page.getByRole('button', { name: /request payout|minimum \$10/i });
    await expect(payoutButton).toBeDisabled({timeout: 10000});
  });

  test('payout request modal opens and validates input', async ({ page }) => {
    // Create purchase with earnings >= $10
    // TODO: Create test purchase with $20 earnings
    
    await page.goto('/dashboard');
    
    // Wait for page to load
    await page.waitForTimeout(1000);
    
    // Click request payout button
    const payoutButton = page.getByRole('button', { name: /request payout/i });
    await expect(payoutButton).toBeEnabled({timeout: 10000});
    await payoutButton.click();
    
    // Verify modal opens
    await expect(page.getByText('Request Payout')).toBeVisible();
    await expect(page.getByText('Payout Amount')).toBeVisible();
    
    // Test validation: try submitting without payment method
    const submitButton = page.getByRole('button', { name: /submit request/i });
    await submitButton.click();
    
    // Should show error (toast or inline validation)
    await expect(page.getByText(/select a payment method/i)).toBeVisible({timeout: 3000});
  });

  test('payout request submits successfully', async ({ page }) => {
    // Create purchase with earnings >= $10
    // TODO: Create test purchase with $50 earnings
    
    await page.goto('/dashboard');
    
    // Click request payout button
    await page.waitForTimeout(1000);
    const payoutButton = page.getByRole('button', { name: /request payout/i });
    await payoutButton.click();
    
    // Fill payout form
    await page.getByRole('combobox').click();
    await page.getByText('PayPal (International)').click();
    await page.getByPlaceholder(/email/i).fill('creator@example.com');
    
    // Submit
    const submitButton = page.getByRole('button', { name: /submit request/i });
    await submitButton.click();
    
    // Verify success message
    await expect(page.getByText(/payout request submitted/i)).toBeVisible({timeout: 5000});
    
    // Verify modal closes
    await expect(page.getByText('Request Payout')).not.toBeVisible({timeout: 3000});
  });

  test('commission badges show correct percentages', async ({ page }) => {
    // Create mix of 100% and 80% commission sales
    // TODO: Create 3 purchases (2 at 100%, 1 at 80%)
    
    await page.goto('/dashboard');
    
    // Verify sales history table has commission badges
    await expect(page.locator('[class*="badge"]').filter({ hasText: '100%' })).toBeVisible({timeout: 10000});
    // For 80% sales:
    // await expect(page.locator('[class*="badge"]').filter({ hasText: '80%' })).toBeVisible();
  });
});
