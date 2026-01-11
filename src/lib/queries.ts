/**
 * Centralized database query functions for Phase 3
 * Provides type-safe, optimized queries with proper JOINs and aggregations
 */

import { db } from '@/drizzle/db';
import { resources, categories, ratings, resourceTags, tags } from '@/drizzle/schema';
import { eq, and, or, inArray, ilike, desc, asc, sql } from 'drizzle-orm';
import { FilterState, ResourceWithRelations, CategoryWithCount } from '@/types/database';

/**
 * Get filtered resources with all relations
 * Optimized with single query using JOINs and aggregations
 */
export async function getFilteredResources(filters: FilterState) {
  const conditions = [];
  
  // Filter by categories (OR logic within categories)
  if (filters.categories.length > 0) {
    // Map slugs to IDs
    const categoryRecords = await db
      .select({ id: categories.id })
      .from(categories)
      .where(inArray(categories.slug, filters.categories));
    
    const categoryIds = categoryRecords.map(c => c.id);
    
    if (categoryIds.length > 0) {
      conditions.push(inArray(resources.categoryId, categoryIds));
    }
  }
  
  // Filter by tags (OR logic within tags)
  if (filters.tags.length > 0) {
    const tagRecords = await db
      .select({ id: tags.id })
      .from(tags)
      .where(inArray(tags.slug, filters.tags));
    
    const tagIds = tagRecords.map(t => t.id);
    
    if (tagIds.length > 0) {
      // Subquery to find resources with these tags
      const resourcesWithTags = await db
        .select({ resourceId: resourceTags.resourceId })
        .from(resourceTags)
        .where(inArray(resourceTags.tagId, tagIds));
      
      const resourceIds = resourcesWithTags.map(rt => rt.resourceId);
      
      if (resourceIds.length > 0) {
        conditions.push(inArray(resources.id, resourceIds));
      }
    }
  }
  
  // Search in title and description
  if (filters.search) {
    conditions.push(
      or(
        ilike(resources.title, `%${filters.search}%`),
        ilike(resources.description, `%${filters.search}%`)
      )
    );
  }
  
  // Build main query with JOINs and aggregations
  const query = db
    .select({
      // Resource fields
      id: resources.id,
      title: resources.title,
      slug: resources.slug,
      description: resources.description,
      url: resources.url,
      thumbnail: resources.thumbnail,
      integrations: resources.integrations,
      featured: resources.featured,
      verified: resources.verified,
      views: resources.views,
      copiedCount: resources.copiedCount,
      publishedAt: resources.publishedAt,
      
      // Joined fields
      categoryName: categories.name,
      categoryId: resources.categoryId,
      
      // Aggregated fields
      avgRating: sql<number>`COALESCE(AVG(${ratings.rating}), 0)`,
      ratingCount: sql<number>`COUNT(DISTINCT ${ratings.id})`,
    })
    .from(resources)
    .leftJoin(categories, eq(resources.categoryId, categories.id))
    .leftJoin(ratings, eq(resources.id, ratings.resourceId))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .groupBy(resources.id, categories.name);
  
  // Apply sorting
  switch (filters.sort) {
    case 'latest':
      query.orderBy(desc(resources.publishedAt));
      break;
    case 'views':
      query.orderBy(desc(resources.views));
      break;
    case 'rating':
      query.orderBy(desc(sql`AVG(${ratings.rating})`));
      break;
    case 'recommended':
    default:
      // Recommended: Featured first, then by views
      query.orderBy(desc(resources.featured), desc(resources.views));
      break;
  }
  
  return await query;
}

/**
 * Get all categories with resource counts
 * Used by FilterSidebar component
 */
export async function getCategoriesWithCounts(): Promise<CategoryWithCount[]> {
  const result = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      icon: categories.icon,
      group: categories.group,
      order: categories.order,
      createdAt: categories.createdAt,
      updatedAt: categories.updatedAt,
      count: sql<number>`COUNT(${resources.id})`,
    })
    .from(categories)
    .leftJoin(resources, eq(categories.id, resources.categoryId))
    .groupBy(categories.id)
    .orderBy(asc(categories.order));
  
  return result;
}

/**
 * Get all tags (no counts for now, can be added later)
 * Used by FilterSidebar component
 */
export async function getAllTags() {
  return await db
    .select()
    .from(tags)
    .orderBy(asc(tags.name));
}

/**
 * Validate category slugs against database
 * Prevents invalid slugs from localStorage or URL manipulation
 */
export async function validateCategorySlugs(slugs: string[]): Promise<string[]> {
  if (slugs.length === 0) return [];
  
  const validCategories = await db
    .select({ slug: categories.slug })
    .from(categories)
    .where(inArray(categories.slug, slugs));
  
  return validCategories.map(c => c.slug);
}

/**
 * Validate tag slugs against database
 */
export async function validateTagSlugs(slugs: string[]): Promise<string[]> {
  if (slugs.length === 0) return [];
  
  const validTags = await db
    .select({ slug: tags.slug })
    .from(tags)
    .where(inArray(tags.slug, slugs));
  
  return validTags.map(t => t.slug);
}
