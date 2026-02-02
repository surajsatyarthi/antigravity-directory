import { pgTable, text, varchar, timestamp, integer, boolean, primaryKey, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import type { AdapterAccount } from '@auth/core/adapters';

// Users table
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  name: text('name'),
  image: text('image'),
  role: text('role').notNull().default('USER'), // 'USER' | 'ADMIN'
  username: text('username').unique(), // For SEO-friendly slugs
  bio: text('bio'),
  website: text('website'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Accounts table
export const accounts = pgTable(
  'accounts',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

// Sessions table
export const sessions = pgTable('sessions', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

// Verification Tokens table
export const verificationTokens = pgTable(
  'verification_tokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (v) => ({
    compositePk: primaryKey({ columns: [v.identifier, v.token] }),
  })
);

// Categories table
export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  icon: text('icon'),
  group: text('group'), // 'process', 'work', 'service' for category pills
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Resources table
export const resources = pgTable('resources', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  metaTitle: text('meta_title'),
  metaDesc: text('meta_description'),
  content: text('content'),
  url: text('url'),
  thumbnail: text('thumbnail'),
  integrations: text('integrations').array(), // Array of integration names for card header icons
  
  // Metadata
  featured: boolean('featured').notNull().default(false),
  verified: boolean('verified').notNull().default(false),
  views: integer('views').notNull().default(0),
  copiedCount: integer('copied_count').notNull().default(0),
  
  // AEO & Staged Indexing
  isIndexed: boolean('is_indexed').notNull().default(false),
  indexedAt: timestamp('indexed_at'),
  
  // E-E-A-T Moat (Live Metrics)
  githubStars: integer('github_stars').default(0),
  githubForks: integer('github_forks').default(0),
  lastValidatedAt: timestamp('last_validated_at').defaultNow(),

  // Trust Signals & Badges
  badgeType: text('badge_type'), // NULL | 'users_choice' | 'trending'
  status: text('status').notNull().default('LIVE'), // 'LIVE' | 'VETTING'
  
  // Timestamps
  publishedAt: timestamp('published_at').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  
  // Foreign keys
  categoryId: text('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
  authorId: text('author_id').references(() => users.id, { onDelete: 'set null' }),
}, (table) => ({
  categoryIdIdx: index('resources_category_id_idx').on(table.categoryId),
  authorIdIdx: index('resources_author_id_idx').on(table.authorId),
  slugIdx: index('resources_slug_idx').on(table.slug),
}));

// Ratings table
export const ratings = pgTable('ratings', {
  id: text('id').primaryKey(),
  rating: integer('rating').notNull(), // 1-5
  review: text('review'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  
  // Foreign keys
  resourceId: text('resource_id').notNull().references(() => resources.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
}, (table) => ({
  resourceIdIdx: index('ratings_resource_id_idx').on(table.resourceId),
  userIdIdx: index('ratings_user_id_idx').on(table.userId),
}));

// Tags table
export const tags = pgTable('tags', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Resource-Tag junction table (many-to-many)
export const resourceTags = pgTable('resource_tags', {
  resourceId: text('resource_id').notNull().references(() => resources.id, { onDelete: 'cascade' }),
  tagId: text('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
});

// Submissions table
export const submissions = pgTable('submissions', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  url: text('url'),
  content: text('content'),
  status: text('status').notNull().default('PENDING'), // 'PENDING' | 'APPROVED' | 'REJECTED'
  
  // Payment Tracking
  paymentStatus: text('payment_status').notNull().default('NONE'), // 'NONE' | 'PENDING' | 'PAID'
  paymentType: text('payment_type').notNull().default('FREE'), // 'FREE' | 'STANDARD' | 'FEATURED'
  paymentId: text('payment_id'),

  // Metadata
  categoryName: text('category_name'),
  tags: text('tags'), // Comma-separated
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  
  // Foreign keys
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
}, (table) => ({
  userIdIdx: index('submissions_user_id_idx').on(table.userId),
  statusIdx: index('submissions_status_idx').on(table.status),
}));


// Bookmarks table
export const bookmarks = pgTable('bookmarks', {
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  resourceId: text('resource_id').notNull().references(() => resources.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.resourceId] }),
  resourceIdIdx: index('bookmarks_resource_id_idx').on(t.resourceId),
}));

// Tools table (for pSEO/Banu engine)
export const tools = pgTable('tools', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  category: text('category').notNull(), // 'generator' | 'scaffold' | 'optimizer'
  isVerified: boolean('is_verified').notNull().default(false),
  searchVolumeSignal: integer('search_volume_signal').default(0),
  metadata: text('metadata'), // JSON string for tool-specific config
  website: text('website'), // Tool website URL for enrichment
  contactEmail: text('contact_email'), // Targeted lead email
  lastOutreachAt: timestamp('last_outreach_at'), // Tracking to prevent spam
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Subscribers table (for Newsletter)
export const subscribers = pgTable('subscribers', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  source: text('source').notNull().default('homepage'), // 'homepage' | 'tool_detail' | 'ad'
  status: text('status').notNull().default('ACTIVE'), // 'ACTIVE' | 'UNSUBSCRIBED'
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Jobs table (for monetization)
export const jobs = pgTable('jobs', {
  id: text('id').primaryKey(),
  companyName: text('company_name').notNull(),
  companyLogo: text('company_logo'),
  title: text('title').notNull(),
  location: text('location').notNull(),
  workplaceType: text('workplace_type').notNull().default('remote'), // 'remote' | 'hybrid' | 'onsite'
  salaryRange: text('salary_range'),
  description: text('description').notNull(),
  applyUrl: text('apply_url').notNull(),
  isFeatured: boolean('is_featured').notNull().default(false),
  publishedAt: timestamp('published_at').notNull().defaultNow(),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Payments table for high-integrity transaction tracking
export const payments = pgTable('payments', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  resourceId: text('resource_id').references(() => resources.id, { onDelete: 'set null' }),
  amount: integer('amount').notNull(), // Amount in cents/paise
  currency: varchar('currency', { length: 3 }).notNull(), // USD, INR, etc.
  paymentMethod: text('payment_method').notNull(), // 'paypal' | 'razorpay'
  transactionId: text('transaction_id').notNull().unique(), // External ID
  status: text('status').notNull().default('PENDING'), // 'PENDING' | 'SUCCEEDED' | 'FAILED'
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('payments_user_id_idx').on(table.userId),
  resourceIdIdx: index('payments_resource_id_idx').on(table.resourceId),
  statusIdx: index('payments_status_idx').on(table.status),
}));

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  resources: many(resources),
  ratings: many(ratings),
  submissions: many(submissions),
  bookmarks: many(bookmarks),
  payments: many(payments),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  resources: many(resources),
}));

export const resourcesRelations = relations(resources, ({ one, many }) => ({
  category: one(categories, {
    fields: [resources.categoryId],
    references: [categories.id],
  }),
  author: one(users, {
    fields: [resources.authorId],
    references: [users.id],
  }),
  ratings: many(ratings),
  resourceTags: many(resourceTags),
  bookmarks: many(bookmarks),
  payments: many(payments),
}));

export const ratingsRelations = relations(ratings, ({ one }) => ({
  resource: one(resources, {
    fields: [ratings.resourceId],
    references: [resources.id],
  }),
  user: one(users, {
    fields: [ratings.userId],
    references: [users.id],
  }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  resourceTags: many(resourceTags),
}));

export const resourceTagsRelations = relations(resourceTags, ({ one }) => ({
  resource: one(resources, {
    fields: [resourceTags.resourceId],
    references: [resources.id],
  }),
  tag: one(tags, {
    fields: [resourceTags.tagId],
    references: [tags.id],
  }),
}));

export const submissionsRelations = relations(submissions, ({ one }) => ({
  user: one(users, {
    fields: [submissions.userId],
    references: [users.id],
  }),
}));

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
  user: one(users, {
    fields: [bookmarks.userId],
    references: [users.id],
  }),
  resource: one(resources, {
    fields: [bookmarks.resourceId],
    references: [resources.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
  resource: one(resources, {
    fields: [payments.resourceId],
    references: [resources.id],
  }),
}));


