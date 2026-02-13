import { db } from '../../../src/lib/db';
import {
  resources,
  categories,
  users,
  purchases,
  resourceClaims,
  payoutRequests,
  sessions,
} from '../../../src/drizzle/schema';
import { v4 as uuidv4 } from 'uuid';
import { BrowserContext } from '@playwright/test';

/**
 * Setup test database with creator, resource, and purchases for earnings tests
 */
export async function setupTestDatabase() {
  // Clean all tables first
  await cleanupTestDatabase();

  const creatorId = uuidv4();
  const categoryId = uuidv4();
  const resourceId = uuidv4();
  const buyerId1 = uuidv4();
  const buyerId2 = uuidv4();
  const buyerId3 = uuidv4();

  // 1. Create category
  await db.insert(categories).values({
    id: categoryId,
    name: 'Test Category',
    slug: 'test-category',
    order: 1,
  });

  // 2. Create creator user
  await db.insert(users).values({
    id: creatorId,
    email: 'creator@test.com',
    name: 'Test Creator',
    username: 'test-creator',
    githubUsername: 'test-creator-github',
    role: 'USER',
  });

  // 3. Create buyers
  await db.insert(users).values([
    {
      id: buyerId1,
      email: 'buyer1@test.com',
      name: 'Buyer One',
      username: 'buyer1',
    },
    {
      id: buyerId2,
      email: 'buyer2@test.com',
      name: 'Buyer Two',
      username: 'buyer2',
    },
    {
      id: buyerId3,
      email: 'buyer3@test.com',
      name: 'Buyer Three',
      username: 'buyer3',
    },
  ]);

  // 4. Create claimed resource with price
  await db.insert(resources).values({
    id: resourceId,
    title: 'Test Resource',
    slug: 'test-resource',
    description: 'A test resource for earnings',
    categoryId: categoryId,
    authorId: creatorId,
    price: 5000, // $50.00
    currency: 'USD',
    salesCount: 3,
    status: 'LIVE',
    publishedAt: new Date(),
    claimedAt: new Date(),
  });

  // 5. Create resource claim
  await db.insert(resourceClaims).values({
    id: uuidv4(),
    resourceId: resourceId,
    userId: creatorId,
    githubUsername: 'test-creator-github',
    githubRepoUrl: 'https://github.com/test-creator/test-resource',
    verificationMethod: 'github_oauth',
    claimedAt: new Date(),
  });

  // 6. Create purchases (first 2 at 100%, third at 80%)
  const purchaseData = [
    {
      id: uuidv4(),
      resourceId: resourceId,
      buyerId: buyerId1,
      creatorId: creatorId,
      amountTotal: 5000, // $50.00
      creatorEarnings: 5000, // 100% for first sale
      platformFee: 0,
      creatorPercent: 100,
      platformPercent: 0,
      currency: 'USD',
      paymentMethod: 'razorpay',
      paymentId: 'test_payment_1',
      orderId: 'test_order_1',
      status: 'completed',
      completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    },
    {
      id: uuidv4(),
      resourceId: resourceId,
      buyerId: buyerId2,
      creatorId: creatorId,
      amountTotal: 5000, // $50.00
      creatorEarnings: 5000, // 100% for second sale
      platformFee: 0,
      creatorPercent: 100,
      platformPercent: 0,
      currency: 'USD',
      paymentMethod: 'paypal',
      paymentId: 'test_payment_2',
      orderId: 'test_order_2',
      status: 'completed',
      completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    },
    {
      id: uuidv4(),
      resourceId: resourceId,
      buyerId: buyerId3,
      creatorId: creatorId,
      amountTotal: 5000, // $50.00
      creatorEarnings: 4000, // 80% for third sale
      platformFee: 1000, // 20%
      creatorPercent: 80,
      platformPercent: 20,
      currency: 'USD',
      paymentMethod: 'razorpay',
      paymentId: 'test_payment_3',
      orderId: 'test_order_3',
      status: 'completed',
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
  ];

  await db.insert(purchases).values(purchaseData);

  return {
    userId: creatorId,
    resourceId: resourceId,
    categoryId: categoryId,
    buyerIds: [buyerId1, buyerId2, buyerId3],
    totalEarnings: 14000, // $140.00 (50 + 50 + 40)
    firstTwoEarnings: 10000, // $100.00
    subsequentEarnings: 4000, // $40.00
    pendingPayout: 14000, // No payouts yet
  };
}

/**
 * Setup test database with low earnings (< $10) to test disabled payout button
 */
export async function setupLowEarningsDatabase() {
  await cleanupTestDatabase();

  const creatorId = uuidv4();
  const categoryId = uuidv4();
  const resourceId = uuidv4();
  const buyerId = uuidv4();

  // Create category
  await db.insert(categories).values({
    id: categoryId,
    name: 'Test Category',
    slug: 'test-category',
    order: 1,
  });

  // Create creator
  await db.insert(users).values({
    id: creatorId,
    email: 'creator@test.com',
    name: 'Test Creator',
    username: 'test-creator',
    githubUsername: 'test-creator-github',
    role: 'USER',
  });

  // Create buyer
  await db.insert(users).values({
    id: buyerId,
    email: 'buyer@test.com',
    name: 'Buyer',
    username: 'buyer',
  });

  // Create resource
  await db.insert(resources).values({
    id: resourceId,
    title: 'Low Price Resource',
    slug: 'low-price-resource',
    description: 'A low-priced resource',
    categoryId: categoryId,
    authorId: creatorId,
    price: 500, // $5.00
    currency: 'USD',
    salesCount: 1,
    status: 'LIVE',
    publishedAt: new Date(),
    claimedAt: new Date(),
  });

  // Create claim
  await db.insert(resourceClaims).values({
    id: uuidv4(),
    resourceId: resourceId,
    userId: creatorId,
    githubUsername: 'test-creator-github',
    githubRepoUrl: 'https://github.com/test-creator/low-price',
    verificationMethod: 'github_oauth',
    claimedAt: new Date(),
  });

  // Create single purchase with low earnings
  await db.insert(purchases).values({
    id: uuidv4(),
    resourceId: resourceId,
    buyerId: buyerId,
    creatorId: creatorId,
    amountTotal: 500, // $5.00
    creatorEarnings: 500, // 100% for first sale = $5.00
    platformFee: 0,
    creatorPercent: 100,
    platformPercent: 0,
    currency: 'USD',
    paymentMethod: 'razorpay',
    paymentId: 'test_low_payment',
    orderId: 'test_low_order',
    status: 'completed',
    completedAt: new Date(),
  });

  return { userId: creatorId, resourceId: resourceId, totalEarnings: 500 }; // $5.00
}

/**
 * Clean up all test data
 */
export async function cleanupTestDatabase() {
  // Delete in dependency order (child tables first)
  // Use try-catch for payout_requests since it might not exist yet
  try {
    await db.delete(payoutRequests);
  } catch (error) {
    // Table might not exist yet, that's okay
    console.log('Note: payout_requests table does not exist (expected for first run)');
  }
  
  await db.delete(purchases);
  await db.delete(resourceClaims);
  await db.delete(resources);
  await db.delete(categories);
  await db.delete(sessions); // Clear sessions before users
  await db.delete(users);
}

/**
 * Create authenticated session for Playwright tests
 * Ensures user exists in DB with correct role
 */
export async function createAuthenticatedSession(
  context: BrowserContext,
  options: { userId: string; userEmail: string; role?: 'USER' | 'ADMIN' }
) {
  const sessionToken = uuidv4();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Ensure user exists with the correct role (Upsert)
  await db
    .insert(users)
    .values({
      id: options.userId,
      email: options.userEmail,
      name: options.role === 'ADMIN' ? 'Admin User' : 'Test User',
      username: options.userId, // simple username
      role: options.role || 'USER',
    })
    .onConflictDoUpdate({
      target: users.id,
      set: { role: options.role || 'USER' },
    });

  // Create session in database
  await db.insert(sessions).values({
    sessionToken,
    userId: options.userId,
    expires,
  });

  console.log("Running createAuthenticatedSession with URL fix");

  // Set session cookie in browser context
  // Set potentially alternative cookie names to ensure compatibility
  await context.addCookies([
    {
      name: 'authjs.session-token',
      value: sessionToken,
      url: 'http://localhost:3001',
      expires: Math.floor(expires.getTime() / 1000),
      httpOnly: true,
      secure: false, 
      sameSite: 'Lax',
    },
    {
      name: 'next-auth.session-token',
      value: sessionToken,
      url: 'http://localhost:3001',
      expires: Math.floor(expires.getTime() / 1000),
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    }
  ]);

  return sessionToken;
}

