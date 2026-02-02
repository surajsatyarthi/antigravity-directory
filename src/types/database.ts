/**
 * Shared TypeScript types extracted from database schema
 * Used across all phases to ensure type safety
 * 
 * DO NOT modify these types manually - they are generated from schema.ts
 * If you need to change types, update src/drizzle/schema.ts and regenerate
 */

import { categories, resources, tags, users } from '@/drizzle/schema';

// Infer types from Drizzle schema
export type Category = typeof categories.$inferSelect;
export type CategoryInsert = typeof categories.$inferInsert;

export type Resource = typeof resources.$inferSelect;
export type ResourceInsert = typeof resources.$inferInsert;

export type Tag = typeof tags.$inferSelect;
export type TagInsert = typeof tags.$inferInsert;

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

// Extended types with relations for component use
export type CategoryWithCount = Category & {
  count: number; // Number of resources in this category
};

export type ResourceWithRelations = Resource & {
  categoryName?: string;
  authorName?: string;
  avgRating?: number;
  ratingCount?: number;
  isBookmarked?: boolean;
  badgeType?: string | null;
};

// Filter state types (used by Phase 2, 3, 4)
export interface FilterState {
  categories: string[]; // Array of category slugs
  tags: string[];       // Array of tag slugs
  search: string;       // Search query
  sort: 'latest' | 'views' | 'rating' | 'recommended';
  badgeTypes: string[]; // []
  isSponsored?: boolean; // Filter by sponsorship status
}

// URL search params type
export interface SearchParams {
  categories?: string;  // Comma-separated category slugs
  tags?: string;        // Comma-separated tag slugs
  q?: string;          // Search query
  sort?: string;       // Sort option
}
