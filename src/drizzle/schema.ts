import { pgTable, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  image: text('image'),
  role: text('role').notNull().default('USER'), // 'USER' | 'ADMIN'
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Categories table
export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  icon: text('icon'),
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
  content: text('content'),
  url: text('url'),
  thumbnail: text('thumbnail'),
  
  // Metadata
  featured: boolean('featured').notNull().default(false),
  verified: boolean('verified').notNull().default(false),
  views: integer('views').notNull().default(0),
  copiedCount: integer('copied_count').notNull().default(0),
  
  // SEO
  metaTitle: text('meta_title'),
  metaDesc: text('meta_desc'),
  
  // Timestamps
  publishedAt: timestamp('published_at').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  
  // Foreign keys
  categoryId: text('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
  authorId: text('author_id').references(() => users.id, { onDelete: 'set null' }),
});

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
});

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
  
  // Metadata
  categoryName: text('category_name'),
  tags: text('tags'), // Comma-separated
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  
  // Foreign keys
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  resources: many(resources),
  ratings: many(ratings),
  submissions: many(submissions),
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
