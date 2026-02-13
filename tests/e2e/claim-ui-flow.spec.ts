import { test, expect } from '@playwright/test';
import { db } from '../../src/lib/db';
import { resources, categories, users, sessions } from '../../src/drizzle/schema';
import { v4 as uuidv4 } from 'uuid';

/**
 * Setup data for claim tests
 */
async function setupClaimTest() {
  // Cleanup
  await db.delete(resources);
  await db.delete(categories);
  await db.delete(users);
  await db.delete(sessions);

  const userId = uuidv4();
  const resourceId = uuidv4();
  const categoryId = uuidv4();

  // Create User
  await db.insert(users).values({
    id: userId,
    email: 'tester@custom.com',
    name: 'Test User',
    username: 'tester',
    image: 'https://github.com/tester.png',
    role: 'USER',
  });

  // Create Category
  await db.insert(categories).values({
    id: categoryId,
    name: 'Test Category',
    slug: 'test-cat',
    order: 1,
  });

  // Create Unclaimed Resource
  await db.insert(resources).values({
    id: resourceId,
    title: 'Unclaimed Resource',
    slug: 'unclaimed-resource',
    description: 'This is an unclaimed resource',
    url: 'https://github.com/original/tool',
    categoryId: categoryId,
    status: 'LIVE',
    publishedAt: new Date(),
    // authorId is null for unclaimed
  });

  return { userId, resourceId };
}

async function createAuthSession(context: any, userId: string) {
  const sessionToken = uuidv4();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  
  await db.insert(sessions).values({
    sessionToken,
    userId,
    expires,
  });

  await context.addCookies([{
    name: 'authjs.session-token',
    value: sessionToken,
    domain: 'localhost',
    path: '/',
    expires: Math.floor(expires.getTime() / 1000),
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
  }]);
}

test.describe('Claim Button UI Flow', () => {
  let userId: string;
  let resourceId: string;

  test.beforeEach(async ({ context }) => {
    const data = await setupClaimTest();
    userId = data.userId;
    resourceId = data.resourceId;
    await createAuthSession(context, userId);
  });

  test('Claim UI happy path: Button -> Modal -> Success', async ({ page }) => {
    await page.goto('/t/unclaimed-resource');

    // 1. Claim button visible
    const claimBtn = page.getByRole('button', { name: /Claim This Tool/i });
    await expect(claimBtn).toBeVisible();

    // 2. Open Modal
    await claimBtn.click();
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Claim Resource');
    
    // 3. Resource Preview
    await expect(modal).toContainText('Unclaimed Resource');
    await expect(modal).toContainText('https://github.com/original/tool');

    // 4. Terms Validation
    const submitBtn = modal.getByRole('button', { name: /Verify & Claim/i });
    await expect(submitBtn).toBeDisabled();
    
    await modal.getByRole('checkbox').check();
    await expect(submitBtn).toBeEnabled();

    // 5. Success Flow (Mock API)
    await page.route(`/api/resources/${resourceId}/claim`, async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ username: 'tester-gh' })
      });
    });

    await submitBtn.click();

    // 6. Verify Toast & Badge
    await expect(page.getByText('Resource Claimed Successfully!')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Set Price Now' })).toBeVisible();

    // Modal should close
    await expect(modal).not.toBeVisible();

    // Badge update
    await expect(page.getByText('Claimed by You')).toBeVisible();
  });

  test('Error states: Already Claimed', async ({ page }) => {
    await page.goto('/t/unclaimed-resource');
    await page.getByRole('button', { name: /Claim This Tool/i }).click();
    
    await page.getByRole('checkbox').check();
    
    // Mock API Error
    await page.route(`/api/resources/${resourceId}/claim`, async route => {
      await route.fulfill({
        status: 403,
        contentType: 'application/json',
        body: JSON.stringify({ 
            error: 'already claimed',
            claimedBy: { username: 'bad-actor' }
        })
      });
    });

    await page.getByRole('button', { name: /Verify/i }).click();

    // Verify Error Modal Content
    const modal = page.getByRole('dialog');
    // The claim modal should be replaced or updated
    await expect(modal).toContainText('Already Claimed');
    await expect(modal).toContainText('@bad-actor');
  });

  test('Error states: Verification Failed', async ({ page }) => {
    await page.goto('/t/unclaimed-resource');
    await page.getByRole('button', { name: /Claim This Tool/i }).click();
    await page.getByRole('checkbox').check();
    
    await page.route(`/api/resources/${resourceId}/claim`, async route => {
        await route.fulfill({ status: 403, body: JSON.stringify({ error: 'verification failed' }) });
    });

    await page.getByRole('button', { name: /Verify/i }).click();
    await expect(page.getByText('Verification Failed')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Try Again' })).toBeVisible();
  });

  test('Mobile sticky bar', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/t/unclaimed-resource');

    // Sticky bar should be visible
    const stickyBar = page.locator('.fixed.bottom-0');
    await expect(stickyBar).toBeVisible();
    await expect(stickyBar).toContainText('Manage this tool?');
    
    // Click sticky button
    await stickyBar.getByRole('button', { name: /Claim Page/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('Keyboard navigation', async ({ page }) => {
    await page.goto('/t/unclaimed-resource');
    
    // Tab to button
    await page.keyboard.press('Tab'); // Skip breadcrumbs etc... might depend on page struct
    // Just click to open for simplicity, then test inside modal
    await page.getByRole('button', { name: /Claim This Tool/i }).click();
    
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    // Escape to close
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });
});
