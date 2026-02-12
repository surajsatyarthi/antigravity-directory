import { test, expect, cleanupDatabase, createAuthenticatedSession } from './helpers/test-utils';
import type { BrowserContext } from '@playwright/test';

test.describe('Dashboard', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async () => {
    await cleanupDatabase();
  });



  test('USER can access dashboard', async ({ context, page }) => {
    // Create authenticated USER session
    const { sessionToken } = await createAuthenticatedSession('USER');

    // Set authentication cookie BEFORE navigating
    await context.addCookies([{
      name: 'authjs.session-token',
      value: sessionToken,
      url: 'http://localhost:3000',
      httpOnly: true,
      sameSite: 'Lax',
    }, {
      name: 'next-auth.session-token',
      value: sessionToken,
      url: 'http://localhost:3000',
      httpOnly: true,
      sameSite: 'Lax',
    }]);

    // Navigate to protected route
    await page.goto('/dashboard');

    // Verify user is authenticated and can access dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: /control center/i }).first()).toBeVisible();
    
    // Verify USER-specific content (not admin)
    await expect(page.getByText(/verified tool owner/i).first()).toBeVisible();
    await expect(page.getByText(/system administrator/i)).not.toBeVisible();
  });

  test('ADMIN can access dashboard with elevated UI', async ({ context, page }) => {
    // Create authenticated ADMIN session
    const { sessionToken } = await createAuthenticatedSession('ADMIN');

    // Set authentication cookie
    await context.addCookies([{
      name: 'authjs.session-token',
      value: sessionToken,
      url: 'http://localhost:3000',
      httpOnly: true,
      sameSite: 'Lax',
    }, {
      name: 'next-auth.session-token',
      value: sessionToken,
      url: 'http://localhost:3000',
      httpOnly: true,
      sameSite: 'Lax',
    }]);

    // Navigate to dashboard
    await page.goto('/dashboard');

    // Verify admin is authenticated and sees admin view
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: /control center/i }).first()).toBeVisible();
    
    // Verify ADMIN-specific content
    await expect(page.getByText(/system administrator/i).first()).toBeVisible();
    
    // Verify admin stats are visible
    await expect(page.getByText(/total users/i).first()).toBeVisible();
    await expect(page.getByText(/published tools/i).first()).toBeVisible();
  });

  test('USER sees empty state when no resources', async ({ context, page }) => {
    // Create USER with no resources
    const { sessionToken } = await createAuthenticatedSession('USER');

    // Set cookie
    await context.addCookies([{
      name: 'authjs.session-token',
      value: sessionToken,
      url: 'http://localhost:3000',
      httpOnly: true,
      sameSite: 'Lax',
    }, {
      name: 'next-auth.session-token',
      value: sessionToken,
      url: 'http://localhost:3000',
      httpOnly: true,
      sameSite: 'Lax',
    }]);
    await page.goto('/dashboard');

    // Verify empty state message
    await expect(page.getByText(/no verified tools found/i).first().first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('link', { name: /claim your first listing/i }).first()).toBeVisible();
  });

  test('Dashboard displays user stats and resources', async ({ context, page }) => {
    // Create USER session
    const { userId, sessionToken } = await createAuthenticatedSession('USER');

    await context.addCookies([{
      name: 'authjs.session-token',
      value: sessionToken,
      url: 'http://localhost:3000',
      httpOnly: true,
      sameSite: 'Lax',
    }, {
      name: 'next-auth.session-token',
      value: sessionToken,
      url: 'http://localhost:3000',
      httpOnly: true,
      sameSite: 'Lax',
    }]);
    await page.goto('/dashboard');

    // Verify stats section is visible
    await expect(page.getByText(/listed tools/i).first().first()).toBeVisible();
    await expect(page.getByText(/total traffic/i).first()).toBeVisible();
    await expect(page.getByText(/founding rank/i).first()).toBeVisible();

    // Verify submit button exists
    await expect(page.getByRole('link', { name: /submit new tool/i }).first()).toBeVisible();
  });

  test('Settings icon is visible for ADMIN', async ({ context, page }) => {
    // Create ADMIN session
    const { sessionToken } = await createAuthenticatedSession('ADMIN');

    await context.addCookies([{
      name: 'authjs.session-token',
      value: sessionToken,
      url: 'http://localhost:3000',
      httpOnly: true,
      sameSite: 'Lax',
    }, {
      name: 'next-auth.session-token',
      value: sessionToken,
      url: 'http://localhost:3000',
      httpOnly: true,
      sameSite: 'Lax',
    }]);
    await page.goto('/dashboard');

    // Verify settings link exists (admin only feature per dashboard code)
    const settingsLink = page.locator('a[href="/settings"]').first();
    await expect(settingsLink).toBeVisible();
  });
});
