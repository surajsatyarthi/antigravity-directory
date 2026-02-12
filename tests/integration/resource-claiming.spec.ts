
import { test, expect } from '@playwright/test';
import { db } from '@/lib/db';
import { resources, categories, users, resourceClaims } from '@/drizzle/schema';
import { eq, sql } from 'drizzle-orm';

test.describe('Resource Claiming System (Integration API)', () => {
    const testCategoryId = 'e2e-claim-category-api';
    const testResourceId = 'e2e-api-resource-to-claim';
    const testResourceSlug = 'e2e-api-resource-to-claim';
    
    test.beforeAll(async () => {
        // Cleanup - Raw SQL to ensure deletion despite FK constraints
        try {
            await db.execute(sql`DELETE FROM resource_claims WHERE resource_id = ${testResourceId}`);
            await db.execute(sql`DELETE FROM resource_claims WHERE user_id = 'e2e-api-user-id'`);
            await db.execute(sql`DELETE FROM resources WHERE id = ${testResourceId}`);
            await db.execute(sql`DELETE FROM resources WHERE category_id = ${testCategoryId}`);
            await db.execute(sql`DELETE FROM categories WHERE id = ${testCategoryId}`);
            await db.execute(sql`DELETE FROM users WHERE id = 'e2e-api-user-id'`);
        } catch (e) {
            console.log('Cleanup warning:', e);
        }

        // Setup
        await db.insert(users).values({
            id: 'e2e-api-user-id',
            name: 'API Test User',
            email: 'api-test@example.com',
            username: 'e2e-api-user',
            image: 'https://github.com/api-test.png'
        }).onConflictDoNothing();

        await db.insert(categories).values({
            id: testCategoryId,
            name: 'E2E Claim Category API',
            slug: testCategoryId,
            description: 'Test Category API'
        }).onConflictDoNothing();

        await db.insert(resources).values({
            id: testResourceId,
            title: 'E2E API Resource to Claim',
            slug: testResourceSlug,
            categoryId: testCategoryId,
            description: 'A resource for API integration testing',
            url: 'https://github.com/test-owner/test-repo',
            status: 'LIVE',
            publishedAt: new Date(),
            verified: false
        }).onConflictDoNothing();
    });

    test.afterAll(async () => {
        try {
            await db.execute(sql`DELETE FROM resource_claims WHERE resource_id = ${testResourceId}`);
            await db.execute(sql`DELETE FROM resources WHERE id = ${testResourceId}`);
            await db.execute(sql`DELETE FROM categories WHERE id = ${testCategoryId}`);
            await db.execute(sql`DELETE FROM users WHERE id = 'e2e-api-user-id'`);
        } catch (e) {
            console.error('Teardown error:', e);
        }
    });

    test('Claim success flow (Mocked Auth + Verification)', async ({ request }) => {
        // 1. Login via Credentials to get session cookie in request context
        // NOTE: Credentials provider is NOT standard in non-test env, so this relies on NODE_ENV=test
        
        const csrfRes = await request.get('/api/auth/csrf');
        const { csrfToken } = await csrfRes.json();
        
        const loginRes = await request.post('/api/auth/callback/test-credentials', {
            form: {
                username: 'e2e-test-user', // Should match valid creds in auth.ts
                csrfToken
            }
        });
        expect(loginRes.status()).toBeLessThan(400);

        // 2. Call Claim API
        const claimRes = await request.post(`/api/resources/${testResourceId}/claim`, {
            headers: {
                'x-e2e-tests-bypass-verification': 'true',
                'x-e2e-tests-user-id': 'e2e-api-user-id'
            }
        });
        
        expect(claimRes.status()).toBe(200);
        const data = await claimRes.json();
        expect(data.username).toBe('e2e-test-user');

        // 3. Verify Database
        const claim = await db.query.resourceClaims.findFirst({
            where: eq(resourceClaims.resourceId, testResourceId)
        });
        expect(claim).toBeTruthy();
        expect(claim?.githubUsername).toBe('e2e-test-user');
        
        const resource = await db.query.resources.findFirst({
            where: eq(resources.id, testResourceId)
        });
        expect(resource?.authorId).toBe('e2e-api-user-id'); // Matches injected user ID
    });

    test('Claim failure flow (Force Fail)', async ({ request }) => {
        // Reuse session if possible or re-login
        const csrfRes = await request.get('/api/auth/csrf');
        const { csrfToken } = await csrfRes.json();

        await request.post('/api/auth/callback/test-credentials', {
            form: {
                username: 'e2e-test-user',
                csrfToken
            }
        });

        // Use a temp resource
        const failResourceId = 'e2e-api-fail';
        await db.insert(resources).values({
            id: failResourceId,
            title: 'Fail Resource API',
            slug: 'e2e-api-fail',
            description: 'Fail test',
            categoryId: testCategoryId,
            url: 'https://github.com/test/fail',
            status: 'LIVE'
        }).onConflictDoNothing();

        const failRes = await request.post(`/api/resources/${failResourceId}/claim`, {
            headers: {
                'x-e2e-tests-bypass-verification': 'true',
                'x-e2e-tests-force-fail': 'true',
                'x-e2e-tests-user-id': 'e2e-api-user-id'
            }
        });

        expect(failRes.status()).toBe(403);
        const data = await failRes.json();
        expect(data.error).toMatch(/verification failed/i);
        
        // Verify no claim
        const claim = await db.query.resourceClaims.findFirst({
            where: eq(resourceClaims.resourceId, failResourceId)
        });
        expect(claim).toBeFalsy();

        await db.delete(resources).where(eq(resources.id, failResourceId));
    });
});
