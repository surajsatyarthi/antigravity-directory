import { test as base, expect } from '@playwright/test';
import { db } from '../../../src/lib/db';
import { 
  resources, categories, users, resourceTags, 
  ratings, bookmarks, submissions, payments, 
  accounts, sessions, follows 
} from '../../../src/drizzle/schema';
import { sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const test = base.extend({});
export { expect };

export async function cleanupDatabase() {
  // Delete in order of dependencies (child first, then parent)
  // Use try-catch for tables that might not exist in all envs yet
  try {
    const { payoutRequests } = await import('../../../src/drizzle/schema');
    await db.delete(payoutRequests);
  } catch (e) { /* ignore */ }
  
  try {
    const { purchases } = await import('../../../src/drizzle/schema');
    await db.delete(purchases);
  } catch (e) { /* ignore */ }

  await db.delete(resourceTags);
  await db.delete(ratings);
  await db.delete(bookmarks);
  await db.delete(submissions);
  await db.delete(payments);
  await db.delete(resources); // Depends on categories, users
  await db.delete(categories); // Parent of resources
  await db.delete(accounts);
  await db.delete(sessions);
  await db.delete(follows);
  await db.delete(users); // Parent of many
}

export async function seedResources() {
  // 1. Create Admin User
  const userId = uuidv4();
  await db.insert(users).values({
    id: userId,
    email: 'test@admin.com',
    name: 'Test Admin',
    role: 'ADMIN',
  });

  // 2. Create Categories
  const catMcpId = uuidv4();
  const catPromptId = uuidv4();
  
  await db.insert(categories).values([
    { id: catMcpId, name: 'MCP Servers', slug: 'mcp-servers', order: 1 },
    { id: catPromptId, name: 'Prompts', slug: 'prompts', order: 2 },
  ]);

  // 3. Create Resources
  await db.insert(resources).values([
    {
      id: uuidv4(),
      title: 'PostgreSQL MCP',
      slug: 'postgresql-mcp',
      description: 'A powerful PostgreSQL MCP server.',
      url: 'https://example.com',
      categoryId: catMcpId,
      authorId: userId,
      featured: true,
      badgeType: 'users_choice',
      status: 'LIVE',
      publishedAt: new Date(),
    },
    {
      id: uuidv4(),
      title: 'System Architect Prompt',
      slug: 'system-architect-prompt',
      description: 'Expert prompt for system design.',
      categoryId: catPromptId,
      authorId: userId,
      featured: false,
      status: 'LIVE',
      publishedAt: new Date(),
    },
     {
      id: uuidv4(),
      title: 'Hidden Resource',
      slug: 'hidden-resource',
      description: 'This should not be visible.',
      categoryId: catPromptId,
      authorId: userId,
      featured: false,
      status: 'VETTING', // Not LIVE
      publishedAt: new Date(),
    },
  ]);
}

/**
 * Creates an authenticated session for E2E tests via database injection.
 * Follows PRD Section 9 implementation guidance.
 *
 * @param role - 'USER' or 'ADMIN' - determines test user permissions
 * @param userData - Optional user data overrides (email, name, username)
 * @returns Object containing userId, sessionToken, and user record
 */
export async function createAuthenticatedSession(
  role: 'USER' | 'ADMIN' = 'USER',
  userData?: Partial<{
    email: string;
    name: string;
    username: string;
  }>
) {
  const userId = uuidv4();
  const sessionToken = uuidv4();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // 1. Create test user
  const [user] = await db.insert(users).values({
    id: userId,
    email: userData?.email || `test-${role.toLowerCase()}-${Date.now()}@example.com`,
    name: userData?.name || `Test ${role}`,
    username: userData?.username || `test-${role.toLowerCase()}-${Date.now()}`,
    role: role,
  }).returning();

  // 2. Create session
  await db.insert(sessions).values({
    sessionToken,
    userId,
    expires,
  });

  return { userId, sessionToken, user };
}
