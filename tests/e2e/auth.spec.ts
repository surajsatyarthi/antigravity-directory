import { test, expect, cleanupDatabase, seedResources } from './helpers/test-utils';

test.describe('Authentication', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async () => {
    await cleanupDatabase();
    await seedResources();
  });

  test('Unauthenticated user sees Sign In button', async ({ page }) => {
    await page.goto('/');

    // Verify Sign In button is visible in header
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
    
    // Verify no Sign Out button is displayed (user is not logged in)
    await expect(page.getByRole('button', { name: /sign out/i, exact: false })).not.toBeVisible();
  });

  test('Signin page displays correctly with Google OAuth option', async ({ page }) => {
    await page.goto('/auth/signin');

    // Verify signin page loads with correct content
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();
    await expect(page.getByText(/continue to antigravity directory/i)).toBeVisible();
    
    // Verify Google OAuth button is available
    await expect(page.getByRole('button', { name: /continue with google/i })).toBeVisible();
    
    // Verify email magic link section (even though not configured)
    await expect(page.getByPlaceholder(/enter your email/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /send magic link/i })).toBeVisible();
    
    // Verify back link to homepage
    await expect(page.getByRole('link', { name: /back to directory/i })).toBeVisible();
  });

  test('Protected route (Dashboard) redirects unauthenticated users to signin', async ({ page }) => {
    // Attempt to directly access dashboard without authentication
    await page.goto('/dashboard');

    // Verify redirect to signin page
    await expect(page).toHaveURL(/\/auth\/signin/);
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();
  });

  test('Signin page back link returns to homepage', async ({ page }) => {
    await page.goto('/auth/signin');

    // Click back link
    await page.getByRole('link', { name: /back to directory/i }).click();

    // Verify navigation to homepage
    await expect(page).toHaveURL('/');
    // Verify homepage loaded by checking for main hero content
    await expect(page).toHaveTitle(/antigravity/i);
  });
});
