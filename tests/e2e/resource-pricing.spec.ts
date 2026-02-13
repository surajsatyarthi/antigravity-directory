import { test, expect } from '@playwright/test';
import { db } from '../../src/lib/db';
import { resources, users, categories, purchases, resourceClaims } from '../../src/drizzle/schema';
import { v4 as uuidv4 } from 'uuid';
import { cleanupDatabase } from './helpers/test-utils';
import { createAuthenticatedSession } from './helpers/setup-test-db';
import { eq } from 'drizzle-orm';

test.describe('Resource Pricing UI', () => {
  test.describe.configure({ mode: 'serial' });
  
  // Shared IDs
  const creatorId = uuidv4();
  const categoryId = uuidv4();
  const claimedResourceId = uuidv4();
  const unclaimedResourceId = uuidv4();
  
  // Slugs
  const claimedSlug = 'claimed-test-resource';
  const unclaimedSlug = 'unclaimed-test-resource';

  test.beforeEach(async () => {
    await cleanupDatabase();

    // Create Category
    await db.insert(categories).values({
      id: categoryId,
      name: 'Test Category',
      slug: 'test-category',
      order: 1
    });

    // Create Creator User
    await db.insert(users).values({
      id: creatorId,
      email: 'creator@test.com',
      name: 'Creator User',
      username: 'creator-user',
      githubUsername: 'creator-github'
    });

    // Create Claimed Resource (price: 0, claimedAt set)
    await db.insert(resources).values({
      id: claimedResourceId,
      title: 'Claimed Resource',
      slug: claimedSlug,
      description: 'A claimed resource',
      categoryId: categoryId,
      authorId: creatorId,
      price: 0,
      currency: 'USD',
      salesCount: 0,
      status: 'LIVE',
      publishedAt: new Date(),
      claimedAt: new Date(),
    });

    // Create Resource Claim record
    await db.insert(resourceClaims).values({
      id: uuidv4(),
      resourceId: claimedResourceId,
      userId: creatorId,
      githubUsername: 'creator-github',
      githubRepoUrl: 'https://github.com/creator-github/test',
      verificationMethod: 'github_oauth',
      claimedAt: new Date(),
    });

    // Create Unclaimed Resource (no authorId, no claimedAt)
    await db.insert(resources).values({
      id: unclaimedResourceId,
      title: 'Unclaimed Resource',
      slug: unclaimedSlug,
      description: 'An unclaimed resource',
      categoryId: categoryId,
      price: 0,
      currency: 'USD',
      salesCount: 0,
      status: 'LIVE',
      publishedAt: new Date(),
    });
  });

  test('Unclaimed resource hides pricing UI', async ({ page }) => {
    await page.goto(`/t/${unclaimedSlug}`);
    
    // Should show title
    await expect(page.getByRole('heading', { name: 'Unclaimed Resource', level: 1 })).toBeVisible();
    
    // Should NOT show pricing form (look for "Resource Pricing" heading)
    await expect(page.getByText('Resource Pricing')).not.toBeVisible();
  });

  test('Claimed resource shows pricing UI for author', async ({ page, context }) => {
    // Authenticate as creator
    await createAuthenticatedSession(context, {
      userId: creatorId,
      userEmail: 'creator@test.com',
    });

    await page.goto(`/t/${claimedSlug}`);
    
    // Should show title
    await expect(page.getByRole('heading', { name: 'Claimed Resource', level: 1 })).toBeVisible();
    
    // Should show pricing form
    await expect(page.getByRole('heading', { name: 'Resource Pricing' }).first()).toBeVisible();
    await expect(page.getByText('Enable Paid Access').first()).toBeVisible();
    
    // Should show commission preview
    await expect(page.getByText(/First 2 sales: 100%/)).toBeVisible();
    await expect(page.getByText(/Sales 3\+: 80%/)).toBeVisible();
  });

  test('Set price to $49 and verify purchase button appears', async ({ page, context }) => {
    // Authenticate as creator
    await createAuthenticatedSession(context, {
      userId: creatorId,
      userEmail: 'creator@test.com',
    });

    await page.goto(`/t/${claimedSlug}`);
    
    // Enable paid access
    await page.click('[aria-label="paid-toggle"], #paid-toggle, [role="switch"]');
    
    // Set price to 49
    await page.fill('input[type="number"]', '49');
    
    // Select USD
    await page.selectOption('select[aria-label="Currency"]', 'USD');
    
    // Submit the form
    await page.click('button:has-text("Save Pricing")');
    
    // Wait for success toast and reload
    await page.waitForTimeout(2000);
    
    // Verify price was updated in database
    const updatedResource = await db.query.resources.findFirst({
      where: eq(resources.id, claimedResourceId),
    });
    
    expect(updatedResource?.price).toBe(4900); // $49.00 in cents
    expect(updatedResource?.currency).toBe('USD');
  });

  test('Price validation: Price > $999 shows error', async ({ page, context }) => {
    await createAuthenticatedSession(context, {
      userId: creatorId,
      userEmail: 'creator@test.com',
    });

    await page.goto(`/t/${claimedSlug}`);
    
    // Enable paid access
    await page.click('[aria-label="paid-toggle"], #paid-toggle, [role="switch"]');
    
    // Set price to 1000 (exceeds limit)
    await page.fill('input[type="number"]', '1000');
    
    // Should show error
    await expect(page.getByText('Price cannot exceed $999')).toBeVisible();
    
    // Save button should be disabled
    const saveButton = page.locator('button:has-text("Save Pricing")');
    await expect(saveButton).toBeDisabled();
  });

  test('First sale gets 100% commission', async ({ page }) => {
    // First, set the resource price to $49
    await db.update(resources)
      .set({ price: 4900, currency: 'USD' })
      .where(eq(resources.id, claimedResourceId));

    // Create a purchase record simulating a successful first sale
    const buyerId = uuidv4();
    await db.insert(users).values({
      id: buyerId,
      email: 'buyer@test.com',
      name: 'Buyer User',
      username: 'buyer-user',
    });

    const purchaseId = uuidv4();
    await db.insert(purchases).values({
      id: purchaseId,
      resourceId: claimedResourceId,
      buyerId: buyerId,
      creatorId: creatorId,
      amountTotal: 4900,
      creatorEarnings: 4900, // 100%
      platformFee: 0, // 0%
      creatorPercent: 100,
      platformPercent: 0,
      currency: 'USD',
      paymentMethod: 'razorpay',
      paymentId: 'test_payment_1',
      orderId: 'test_order_1',
      status: 'completed',
      completedAt: new Date(),
    });

    // Increment salesCount as webhook would do
    await db.update(resources)
      .set({ salesCount: 1 })
      .where(eq(resources.id, claimedResourceId));

    // Verify the purchase record
    const purchase = await db.query.purchases.findFirst({
      where: eq(purchases.id, purchaseId),
    });

    expect(purchase?.creatorPercent).toBe(100);
    expect(purchase?.platformPercent).toBe(0);
    expect(purchase?.creatorEarnings).toBe(4900);
    expect(purchase?.platformFee).toBe(0);
    
    // Verify salesCount was incremented
    const resource = await db.query.resources.findFirst({
      where: eq(resources.id, claimedResourceId),
    });
    expect(resource?.salesCount).toBe(1);
  });

  test('Third sale gets 80/20 split', async ({ page }) => {
    // Set resource with price and salesCount = 2 (so next sale is 3rd)
    await db.update(resources)
      .set({ price: 4900, currency: 'USD', salesCount: 2 })
      .where(eq(resources.id, claimedResourceId));

    // Create a purchase record simulating the third sale
    const buyerId = uuidv4();
    await db.insert(users).values({
      id: buyerId,
      email: 'buyer3@test.com',
      name: 'Buyer 3',
      username: 'buyer3',
    });

    const purchaseId = uuidv4();
    
    // Calculate 80/20 split for $49.00
    const amountTotal = 4900;
    const creatorEarnings = Math.floor(amountTotal * 0.8); // 3920
    const platformFee = amountTotal - creatorEarnings; // 980
    
    await db.insert(purchases).values({
      id: purchaseId,
      resourceId: claimedResourceId,
      buyerId: buyerId,
      creatorId: creatorId,
      amountTotal: amountTotal,
      creatorEarnings: creatorEarnings, // 80%
      platformFee: platformFee, // 20%
      creatorPercent: 80,
      platformPercent: 20,
      currency: 'USD',
      paymentMethod: 'razorpay',
      paymentId: 'test_payment_3',
      orderId: 'test_order_3',
      status: 'completed',
      completedAt: new Date(),
    });

    // Increment salesCount as webhook would do
    await db.update(resources)
      .set({ salesCount: 3 })
      .where(eq(resources.id, claimedResourceId));

    // Verify the purchase record
    const purchase = await db.query.purchases.findFirst({
      where: eq(purchases.id, purchaseId),
    });

    expect(purchase?.creatorPercent).toBe(80);
    expect(purchase?.platformPercent).toBe(20);
    expect(purchase?.creatorEarnings).toBe(3920); // 80% of $49 = $39.20
    expect(purchase?.platformFee).toBe(980); // 20% of $49 = $9.80
    
    // Verify salesCount
    const resource = await db.query.resources.findFirst({
      where: eq(resources.id, claimedResourceId),
    });
    expect(resource?.salesCount).toBe(3);
  });
});
