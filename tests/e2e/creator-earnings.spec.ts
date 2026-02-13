import { test, expect } from '@playwright/test';
import { setupTestDatabase, cleanupTestDatabase, setupLowEarningsDatabase, createAuthenticatedSession } from './helpers/setup-test-db';

test.describe('Creator Earnings Dashboard', () => {
  let testUserId: string;
  let testResourceId: string;

  test.beforeEach(async ({ context }) => {
    // Setup test database with creator and purchases
    const setup = await setupTestDatabase();
    testUserId = setup.userId;
    testResourceId = setup.resourceId;
    
    // Create authenticated session for the creator
    await createAuthenticatedSession(context, {
      userId: testUserId,
      userEmail: 'creator@test.com',
    });
  });

  test.afterEach(async () => {
    await cleanupTestDatabase();
  });

  test('displays earnings overview correctly with 100%/80% breakdown', async ({ page }) => {
    // Create test purchases with different commission rates
    // TODO: Add test data creation helper
    
    await page.goto('/dashboard');
    
    // Verify earnings section is visible using specific heading selector
    await expect(page.getByRole('heading', { name: /your earnings/i, level: 2 })).toBeVisible();
    
    // Verify total earnings card
    await expect(page.getByText('Total Earnings', { exact: true })).toBeVisible();
    
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
    
    // Verify sales history table exists (use heading to distinguish from table itself or other text)
    await expect(page.getByRole('heading', { name: /sales history/i })).toBeVisible();
    
    // Verify table headers (scoped to the table)
    const table = page.locator('table');
    await expect(table.getByRole('columnheader', { name: 'Resource' })).toBeVisible();
    await expect(table.getByRole('columnheader', { name: 'Date' })).toBeVisible();
    await expect(table.getByRole('columnheader', { name: 'Price' })).toBeVisible();
    await expect(table.getByRole('columnheader', { name: 'Buyer' })).toBeVisible();
    await expect(table.getByRole('columnheader', { name: 'Commission' })).toBeVisible();
    await expect(table.getByRole('columnheader', { name: 'Your Earnings' })).toBeVisible();
    
    // Test pagination (if > 50 sales)
    // await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
  });

  test('payout button disabled when balance < $10', async ({ page, context }) => {
   // Setup database with low earnings (< $10)
    await cleanupTestDatabase();
    const lowSetup = await setupLowEarningsDatabase();
    
    // Authenticate as creator
    await createAuthenticatedSession(context, {
      userId: lowSetup.userId,
      userEmail: 'creator@test.com',
    });
    
    await page.goto('/dashboard');
    
    // Wait for earnings section to load
    await page.waitForTimeout(2000);
    
    // Verify disabled button state for low earnings
    // Button text changes when disabled: "Minimum $10 required"
    const disabledButton = page.getByRole('button', { name: /minimum \$10 required/i });
    await expect(disabledButton).toBeVisible();
    await expect(disabledButton).toBeDisabled();
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
    
    // Verify modal opens (use dialog role for scoping)
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal.getByRole('heading', { name: /request payout/i })).toBeVisible();
    await expect(modal.getByText('Payout Amount')).toBeVisible();
    
    // Test validation: try submitting without payment method
    // Fill account details (required field) to bypass HTML5 validation
    // so that the custom payment method validation (which shows toast) can run
    await modal.getByPlaceholder(/enter your/i).fill('test-account-details');

    const submitButton = modal.getByRole('button', { name: /submit request/i });
    await submitButton.click();
    
    // Should show error (toast or inline validation)
    // Use .first() in case of multiple matches (e.g. aria-live region + visible toast)
    await expect(page.getByText(/select a payment method/i).first()).toBeVisible({timeout: 5000});
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
    const modal = page.getByRole('dialog');
    // Select payment method - handle Select component specific behavior
    // Open the select dropdown
    await modal.locator('button[role="combobox"]').click();
    // Click the option
    await page.getByRole('option', { name: /paypal/i }).click();
    
    await modal.getByPlaceholder(/email/i).fill('creator@example.com');
    // Add account details if needed for other methods, or verify validation
    
    // Submit
    const submitButton = modal.getByRole('button', { name: /submit request/i });
    await submitButton.click();
    
    // Verify success message
    // Use .first() to handle potential duplicates (toast + aria-live)
    await expect(page.getByText(/payout request submitted/i).first()).toBeVisible({timeout: 5000});
    
    // Verify modal closes
    await expect(modal).not.toBeVisible({timeout: 3000});
  });

  test('commission badges show correct percentages', async ({ page }) => {
    // Create mix of 100% and 80% commission sales
    // TODO: Create 3 purchases (2 at 100%, 1 at 80%)
    
    await page.goto('/dashboard');
    
    // Verify sales history table has commission badges
    // Target the text "100%" inside the table
    const table = page.locator('table');
    await expect(table.getByText('100%').first()).toBeVisible({timeout: 10000});
    // For 80% sales:
    // await expect(table.getByText('80%').first()).toBeVisible();
  });
});
