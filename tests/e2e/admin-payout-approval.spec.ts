import { test, expect } from '@playwright/test';
import { setupTestDatabase, cleanupTestDatabase, createAuthenticatedSession } from './helpers/setup-test-db';
import { db } from '@/lib/db';
import { payoutRequests } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

test.describe('Admin Payout Approval Flow', () => {
  let adminUserId: string;
  let regularUserId: string;
  let payoutId: string;

  test.beforeEach(async ({ context }) => {
    // 1. Setup DB with Admin and User
    const setup = await setupTestDatabase();
    regularUserId = setup.userId;
    // Note: setupTestDatabase creates a user. We'll reuse it as the "creator".
    // We need to create a separate Admin user or promote one.
    // For simplicity, we'll create a second user as Admin.
    
    // Create Admin User manually or via helper if available
    // Assuming we can't easily create a second user with helper, let's promote the main user to ADMIN for admin tests
    // But we need a separate creator for the payout request. 
    // Actually, `setupTestDatabase` creates a user. We can use THAT user as the creator.
    // We will create a fresh session for Admin.
    
    // Create a Payout Request for the regular user
    const [request] = await db.insert(payoutRequests).values({
      id: `pay_req_${Date.now()}`,
      creatorId: regularUserId,
      amount: 5000, // $50.00
      currency: 'USD',
      paymentMethod: 'paypal',
      accountDetails: 'creator@example.com',
      status: 'pending',
    }).returning();
    payoutId = request.id;
  });

  test.afterEach(async ({ page, context }) => {
    // Close page explicitly to clear state
    if (page && !page.isClosed()) {
      await page.close();
    }
    // Clear browser context cookies/storage
    await context.clearCookies();
    // Clean database
    await cleanupTestDatabase();
  });

  test('non-admin cannot access admin payouts page', async ({ page, context }) => {
    // Login as regular user
    await createAuthenticatedSession(context, {
      userId: regularUserId,
      userEmail: 'creator@example.com',
      role: 'USER'
    });

    await page.goto('/admin/payouts');
    await page.waitForLoadState('networkidle');
    
    // Should be redirected to 404
    await expect(page).toHaveURL(/\/404/);
  });

  test('admin can view pending payouts', async ({ page, context }) => {
    // Login as Admin
    await createAuthenticatedSession(context, {
      userId: 'admin-user-id', 
      userEmail: 'admin@example.com',
      role: 'ADMIN'
    });

    await page.goto('/admin/payouts');
    await page.waitForLoadState('networkidle');
    
    // Verify Page Title
    await expect(page.getByRole('heading', { name: 'Payout Requests' })).toBeVisible();
    
    // Verify Table Row exists
    await expect(page.getByRole('cell', { name: '50.00' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'paypal' })).toBeVisible(); // Lowercase from DB
    await expect(page.getByText('pending', { exact: false })).toBeVisible();
  });

  test('admin can approve a payout', async ({ page, context }) => {
    // Login as Admin
    await createAuthenticatedSession(context, {
      userId: 'admin-user-id',
      userEmail: 'admin@example.com',
      role: 'ADMIN'
    });

    await page.goto('/admin/payouts');
    await page.waitForLoadState('networkidle');
    
    // Find the Approve button
    const approveBtn = page.getByTitle('Approve');
    await approveBtn.click();
    
    // Verify Modal
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Approve Payout');
    
    // Confirm
    await modal.getByRole('button', { name: 'Confirm Approval' }).click();
    
    // Verify Success Toast (optional, depends on implementation) or Status Change
    await expect(page.getByText('Approved').first()).toBeVisible();
    
    // Verify DB update
    const updatedPayout = await db.query.payoutRequests.findFirst({
      where: eq(payoutRequests.id, payoutId)
    });
    expect(updatedPayout?.status).toBe('approved');
    expect(updatedPayout?.adminId).toBe('admin-user-id');
    expect(updatedPayout?.processedAt).not.toBeNull();
  });

  test('admin can reject a payout with reason', async ({ page, context }) => {
    // Login as Admin
    await createAuthenticatedSession(context, {
      userId: 'admin-user-id',
      userEmail: 'admin@example.com',
      role: 'ADMIN'
    });

    await page.goto('/admin/payouts');
    await page.waitForLoadState('networkidle');
    
    // Find Refect button
    const rejectBtn = page.getByTitle('Reject');
    await rejectBtn.click();
    
    // Verify Modal
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Reject Payout');
    
    // Try submit without reason (Validation Check)
    await modal.getByRole('button', { name: 'Reject Request' }).click();
    await expect(page.getByText('Rejection reason is required')).toBeVisible(); // Toast or text
    
    // Enter reason
    await modal.getByRole('textbox', { name: 'Rejection Reason' }).fill('Invalid account details');
    await modal.getByRole('button', { name: 'Reject Request' }).click();
    
    // Verify Status Change
    await expect(page.getByText('Rejected').first()).toBeVisible();
    
    // Verify DB update
    const updatedPayout = await db.query.payoutRequests.findFirst({
      where: eq(payoutRequests.id, payoutId)
    });
    expect(updatedPayout?.status).toBe('rejected');
    expect(updatedPayout?.rejectionReason).toBe('Invalid account details');
    expect(updatedPayout?.adminId).toBe('admin-user-id');
  });
});
