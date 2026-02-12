
import { test, expect } from '@playwright/test';
import { db } from '@/lib/db';
import { resources, categories, users, resourceClaims, accounts } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

test.describe('Resource Claiming System (UI)', () => {
    // Shared test data
    const testCategoryId = 'e2e-claim-category-ui';
    const testResourceId = 'e2e-ui-unclaimed-resource';
    const testResourceSlug = 'e2e-ui-unclaimed-resource';
    const claimedResourceId = 'e2e-ui-already-claimed-resource';
    const claimedResourceSlug = 'e2e-ui-already-claimed-resource';
    
    test.beforeAll(async () => {
        // Cleanup potential leftovers
        await db.delete(resources).where(eq(resources.categoryId, testCategoryId));
        await db.delete(categories).where(eq(categories.id, testCategoryId));
        await db.delete(users).where(eq(users.id, 'e2e-ui-dummy-author'));
        
        // Setup Category
        await db.insert(categories).values({
            id: testCategoryId,
            name: 'E2E Claim Category UI',
            slug: testCategoryId,
            description: 'Test Category UI'
        }).onConflictDoNothing();

        // 1. Insert Unclaimed Resource
        await db.insert(resources).values({
            id: testResourceId,
            title: 'Unclaimed Resource UI',
            slug: testResourceSlug,
            description: 'Testing claiming flow UI',
            categoryId: testCategoryId,
            url: 'https://github.com/test-owner/test-repo',
            status: 'LIVE',
            publishedAt: new Date(),
            verified: false
        }).onConflictDoNothing();

        // 2. Insert Claimed Resource
        await db.insert(resources).values({
            id: claimedResourceId,
            title: 'Claimed Resource UI',
            slug: claimedResourceSlug,
            description: 'Testing claimed badge UI',
            categoryId: testCategoryId,
            url: 'https://github.com/test-owner/claimed-repo',
            status: 'LIVE',
            publishedAt: new Date(),
            verified: true,
            claimedAt: new Date(),
            claimedVia: 'github_oauth',
        }).onConflictDoNothing();
        
        // Create dummy author for claimed resource
        const dummyAuthorId = 'e2e-ui-dummy-author';
        await db.insert(users).values({
            id: dummyAuthorId,
            name: 'Existing Owner',
            email: 'owner-ui@example.com',
            username: 'existing_owner',
            image: 'https://github.com/owner.png'
        }).onConflictDoNothing();

        await db.update(resources).set({ authorId: dummyAuthorId }).where(eq(resources.id, claimedResourceId));
    });

    test.afterAll(async () => {
        // Cleanup
        await db.delete(resources).where(eq(resources.categoryId, testCategoryId));
        await db.delete(categories).where(eq(categories.id, testCategoryId));
        await db.delete(users).where(eq(users.id, 'e2e-ui-dummy-author'));
    });

    test('Unclaimed resource shows claim button', async ({ page }) => {
        await page.goto(`/t/${testResourceSlug}`);
        await expect(page.getByRole('button', { name: 'Claim This Tool' })).toBeVisible();
    });

    test('Already claimed resource shows badge', async ({ page, context }) => {
        await context.clearCookies();
        
        await page.goto(`/t/${claimedResourceSlug}`);

        // Should see badge - try generic first
        const badge = page.getByText(/Claimed by/i).first();
        await expect(badge).toBeVisible();
        
        // Accept either "You" (if session persists in test env) or specific name
        const badgeWithUsername = page.getByText(/existing_owner/i);
        const badgeWithName = page.getByText(/Existing Owner/i);
        const badgeWithYou = page.getByText(/Claimed by You/i);
        
        await expect(badgeWithUsername.or(badgeWithName).or(badgeWithYou).first()).toBeVisible();
    });
});
