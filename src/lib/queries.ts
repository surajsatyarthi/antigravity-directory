/**
 * Centralized database query functions for Phase 3
 * Provides type-safe, optimized queries with proper JOINs and aggregations
 */

import { db } from '@/lib/db';
import { resources, categories, ratings, resourceTags, tags } from '@/drizzle/schema';
import { eq, and, or, inArray, ilike, desc, asc, sql } from 'drizzle-orm';
import { FilterState, ResourceWithRelations, CategoryWithCount, Tag } from '@/types/database';

/**
 * Get filtered resources with all relations
 * Optimized with single query using JOINs and aggregations
 */
export async function getFilteredResources(filters: FilterState, page: number = 1, pageSize: number = 20): Promise<{ resources: ResourceWithRelations[], totalCount: number }> {
  try {
    const conditions = [];
    const offset = (page - 1) * pageSize;
    
    // Filter by categories (OR logic within categories)
    if (filters.categories.length > 0) {
      // Map slugs to IDs
      const categoryRecords = await db
        .select({ id: categories.id })
        .from(categories)
        .where(inArray(categories.slug, filters.categories));
      
      const categoryIds = categoryRecords.map((c: any) => c.id);
      
      if (categoryIds.length > 0) {
        conditions.push(inArray(resources.categoryId, categoryIds));
      } else {
        return { resources: [], totalCount: 0 };
      }
    }
    
    // Filter by tags (OR logic within tags)
    if (filters.tags.length > 0) {
      const tagRecords = await db
        .select({ id: tags.id })
        .from(tags)
        .where(inArray(tags.slug, filters.tags));
      
      const tagIds = tagRecords.map((t: any) => t.id);
      
      if (tagIds.length > 0) {
        const resourcesWithTags = await db
          .select({ resourceId: resourceTags.resourceId })
          .from(resourceTags)
          .where(inArray(resourceTags.tagId, tagIds));
        
        const resourceIds = resourcesWithTags.map((rt: any) => rt.resourceId);
        
        if (resourceIds.length > 0) {
          conditions.push(inArray(resources.id, resourceIds));
        } else {
          return { resources: [], totalCount: 0 };
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
    
    // Get total count first
    const countResult = await db
      .select({ count: sql<number>`count(distinct ${resources.id})` })
      .from(resources)
      .leftJoin(categories, eq(resources.categoryId, categories.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined);
    
    const totalCount = Number(countResult[0]?.count || 0);

    // Build main query with limit/offset
    const results = await db
      .select({
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
        categoryName: categories.name,
        categoryId: resources.categoryId,
        avgRating: sql<number>`COALESCE(AVG(${ratings.rating}), 0)`,
        ratingCount: sql<number>`COUNT(DISTINCT ${ratings.id})`,
      })
      .from(resources)
      .leftJoin(categories, eq(resources.categoryId, categories.id))
      .leftJoin(ratings, eq(resources.id, ratings.resourceId))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .groupBy(resources.id, categories.name)
      .orderBy(desc(resources.featured), desc(resources.views))
      .limit(pageSize)
      .offset(offset);

    return { 
      resources: results as unknown as ResourceWithRelations[],
      totalCount
    };

  } catch (error) {
    console.warn('Database unavailable, returning mock data:', error);
    // Return mock data for development/testing when DB is down
    const mockResources = [
      {
        id: '1',
        title: 'Prompt Engineering Guide',
        slug: 'prompt-engineering-guide',
        description: 'Comprehensive guide for all AI models.',
        content: '# Guide Content',
        url: 'https://example.com/guide',
        thumbnail: null,
        categoryId: '1',
        authorId: null,
        featured: true,
        verified: true,
        views: 1200,
        copiedCount: 45,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryName: 'Prompts',
        avgRating: 4.8,
        ratingCount: 156,
      },
      {
        id: '2',
        title: 'MCP Server Boilerplate',
        slug: 'mcp-boilerplate',
        description: 'Get started with Model Context Protocol.',
        content: '# Boilerplate Content',
        url: 'https://github.com/example/mcp-boilerplate',
        thumbnail: null,
        categoryId: '2',
        authorId: null,
        featured: false,
        verified: true,
        views: 850,
        copiedCount: 12,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryName: 'Development',
        avgRating: 4.5,
        ratingCount: 42,
      },
    ];
    return {
      resources: mockResources as ResourceWithRelations[],
      totalCount: mockResources.length
    };
  }
}

/**
 * Get all categories with resource counts
 */
export async function getCategoriesWithCounts(): Promise<CategoryWithCount[]> {
  try {
    return await db
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
      .orderBy(asc(categories.order)) as CategoryWithCount[];
  } catch (error) {
    console.warn('Database unavailable, returning mock categories');
    return [
      { id: '1', name: 'Prompts', slug: 'prompts', count: 10, group: 'Function' } as any,
      { id: '2', name: 'Rules', slug: 'rules', count: 5, group: 'Standards' } as any,
    ];
  }
}

/**
 * Get all tags
 */
export async function getAllTags(): Promise<Tag[]> {
  try {
    return await db.select().from(tags).orderBy(asc(tags.name));
  } catch (error) {
    return [
      { id: '1', name: 'Next.js', slug: 'nextjs' } as any,
      { id: '2', name: 'Tailwind', slug: 'tailwind' } as any,
    ];
  }
}

/**
 * Validate category slugs
 */
export async function validateCategorySlugs(slugs: string[]): Promise<string[]> {
  console.log('[validateCategorySlugs] Validating:', slugs);
  if (slugs.length === 0) return [];
  try {
    const validCategories = await db
      .select({ slug: categories.slug })
      .from(categories)
      .where(inArray(categories.slug, slugs));
    const result = validCategories.map((c: any) => c.slug);
    console.log('[validateCategorySlugs] Result:', result);
    return result;
  } catch (error) {
    // If DB is down, assume the slugs from pre-defined mock set are valid
    const mockSlugs = ['prompts', 'rules'];
    const result = slugs.filter(s => mockSlugs.includes(s));
    console.log('[validateCategorySlugs] DB Error. Mock Result:', result);
    return result;
  }
}
