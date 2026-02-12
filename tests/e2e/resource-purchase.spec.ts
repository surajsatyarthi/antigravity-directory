import { test, expect } from '@playwright/test';
import { db } from '../../src/lib/db';
import { resources, users, categories } from '../../src/drizzle/schema';
import { v4 as uuidv4 } from 'uuid';
import { cleanupDatabase, createAuthenticatedSession } from './helpers/test-utils';

test.describe('Resource Purchase System', () => {
  test.describe.configure({ mode: 'serial' });
  
  // Shared IDs
  const adminId = uuidv4();
  const categoryId = uuidv4();
  const freeResourceId = uuidv4();
  const paidResourceId = uuidv4();
  
  // Slugs
  const freeSlug = 'free-test-resource';
  const paidSlug = 'paid-test-resource';



  test.beforeEach(async () => {
    await cleanupDatabase();

    // 1. Create Admin User (Author)
    await db.insert(users).values({
      id: adminId,
      email: 'admin@test.com',
      name: 'Admin User',
      role: 'ADMIN',
      username: 'admin-user'
    });

    // 2. Create Category
    await db.insert(categories).values({
      id: categoryId,
      name: 'Test Category',
      slug: 'test-category',
      order: 1
    });

    // 3. Create Free Resource
    await db.insert(resources).values({
      id: freeResourceId,
      title: 'Free Resource',
      slug: freeSlug,
      description: 'A free resource',
      categoryId: categoryId,
      authorId: adminId,
      price: 0,
      currency: 'USD',
      status: 'LIVE',
      publishedAt: new Date(),
    });

    // 4. Create Paid Resource ($49.99)
    await db.insert(resources).values({
      id: paidResourceId,
      title: 'Paid Resource',
      slug: paidSlug,
      description: 'A paid resource',
      categoryId: categoryId,
      authorId: adminId,
      price: 4999, // $49.99
      currency: 'USD',
      status: 'LIVE',
      publishedAt: new Date(),
    });
  });

  test('Free resource shows no buy button', async ({ page }) => {
    await page.goto(`/t/${freeSlug}`);
    
    // Should show title
    await expect(page.getByRole('heading', { name: 'Free Resource', level: 1 })).toBeVisible();
    
    // Should NOT show buy button
    // We check for specific text "Buy for" which is in the BuyButton component
    await expect(page.getByText('Buy for')).not.toBeVisible();
  });

  test('Paid resource shows buy button with price', async ({ page }) => {
    await page.goto(`/t/${paidSlug}`);
    
    // Should show title
    await expect(page.getByRole('heading', { name: 'Paid Resource', level: 1 })).toBeVisible();
    
    // Should show buy button with formatted price
    await expect(page.getByRole('button', { name: 'Buy for $49.99' })).toBeVisible();
  });

  test('Buy button opens purchase modal', async ({ page }) => {
    await page.goto(`/t/${paidSlug}`);
    
    // Click buy button
    await page.getByRole('button', { name: 'Buy for $49.99' }).click();
    
    // Modal should appear - scope to dialog
    const modal = page.locator('div[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal.getByText('Purchase Resource')).toBeVisible();
    await expect(modal.getByText('Paid Resource')).toBeVisible();
    await expect(modal.getByText('$49.99')).toBeVisible();
  });

  test('Buy button shows Razorpay for India users', async ({ page }) => {
    // Mock IPAPI response for India
    await page.route('https://ipapi.co/json/', async route => {
      const json = { country_code: 'IN' };
      await route.fulfill({ json });
    });

    await page.goto(`/t/${paidSlug}`);
    
    // Click buy button
    await page.getByRole('button', { name: 'Buy for $49.99' }).click();
    
    const modal = page.locator('div[role="dialog"]');
    await expect(modal).toBeVisible();
    
    // Should show Razorpay options
    await expect(modal.getByText('Pay with Razorpay')).toBeVisible();
    
    // Should NOT show "Pay with Card" (which is the international fallback) in the primary slot
    // The component logic: if IN, show Razorpay. 
    // It also shows "OR" divider.
    await expect(modal.getByText('OR', { exact: true })).toBeVisible();
  });

  test('Buy button shows PayPal for international users', async ({ page }) => {
    // Mock IPAPI response for US
    await page.route('https://ipapi.co/json/', async route => {
      const json = { country_code: 'US' };
      await route.fulfill({ json });
    });

    await page.goto(`/t/${paidSlug}`);
    
    // Click buy button
    await page.getByRole('button', { name: 'Buy for $49.99' }).click();
    
    const modal = page.locator('div[role="dialog"]');
     await expect(modal).toBeVisible();
    
    // Should show "Pay with Card" (International fallback)
    await expect(modal.getByRole('button', { name: 'Pay with Card' })).toBeVisible();
    
    // Should NOT show "Pay with Razorpay"
    await expect(modal.getByText('Pay with Razorpay')).not.toBeVisible();
  });
});
