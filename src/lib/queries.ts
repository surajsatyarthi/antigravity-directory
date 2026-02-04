/**
 * Centralized database query functions for Phase 3
 * Provides type-safe, optimized queries with proper JOINs and aggregations
 */

import { db } from '@/lib/db';
import { resources, categories, ratings, resourceTags, tags, tools, submissions, users, payments } from '@/drizzle/schema';
import { eq, and, or, inArray, ilike, desc, asc, sql, count } from 'drizzle-orm';
import { FilterState, ResourceWithRelations, CategoryWithCount, Tag } from '@/types/database';

/**
 * Get filtered resources with all relations
 * Optimized with single query using JOINs and aggregations
 */
import { unstable_cache } from 'next/cache';

/**
 * Internal function for fetching resources (uncached)
 */
async function getFilteredResourcesInternal(filters: FilterState, page: number = 1, pageSize: number = 20): Promise<{ resources: ResourceWithRelations[], totalCount: number }> {
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
    
    // Filter by badge types
    if (filters.badgeTypes && filters.badgeTypes.length > 0) {
      conditions.push(inArray(resources.badgeType, filters.badgeTypes));
    }

    // Filter by sponsorship status (if specified only)
    if (filters.isSponsored !== undefined) {
      conditions.push(eq(resources.featured, filters.isSponsored));
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
        badgeType: resources.badgeType,
        status: resources.status,
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
      .orderBy(
        desc(resources.views), // Removed automatic featured boost
        desc(resources.publishedAt)
      )
      .limit(pageSize)
      .offset(offset);

    return { 
      resources: results as unknown as ResourceWithRelations[],
      totalCount
    };
}

/**
 * Get filtered resources with all relations
 * CACHED: Wraps internal logic with Next.js Data Cache (5 minutes)
 */
export const getFilteredResources = unstable_cache(
  async (filters: FilterState, page: number = 1, pageSize: number = 20) => {
    return getFilteredResourcesInternal(filters, page, pageSize);
  },
  ['filtered-resources'],
  { revalidate: 300, tags: ['resources'] }
);

/**
 * Get featured resources (featured = true)
 */
export async function getFeaturedResources(categorySlug?: string, limit: number = 6): Promise<ResourceWithRelations[]> {
    const conditions = [eq(resources.featured, true)];
    
    if (categorySlug) {
      const category = (await db.select({ id: categories.id }).from(categories).where(eq(categories.slug, categorySlug)).limit(1))[0];
      if (category) {
        conditions.push(eq(resources.categoryId, category.id));
      }
    }

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
        badgeType: resources.badgeType,
        status: resources.status,
        categoryName: categories.name,
        categoryId: resources.categoryId,
        avgRating: sql<number>`COALESCE(AVG(${ratings.rating}), 0)`,
        ratingCount: sql<number>`COUNT(DISTINCT ${ratings.id})`,
      })
      .from(resources)
      .leftJoin(categories, eq(resources.categoryId, categories.id))
      .leftJoin(ratings, eq(resources.id, ratings.resourceId))
      .where(and(...conditions))
      .groupBy(resources.id, categories.name)
      .orderBy(desc(resources.publishedAt))
      .limit(limit);

    return results as unknown as ResourceWithRelations[];
}

/**
 * Get all categories with resource counts
 */
export async function getCategoriesWithCounts(): Promise<CategoryWithCount[]> {
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
}

/**
 * Get all tags
 */
export async function getAllTags(): Promise<Tag[]> {
    return await db.select().from(tags).orderBy(asc(tags.name));
}

/**
 * Validate category slugs
 */
export async function validateCategorySlugs(slugs: string[]): Promise<string[]> {
  console.log('[validateCategorySlugs] Validating:', slugs);
  if (slugs.length === 0) return [];
  const validCategories = await db
    .select({ slug: categories.slug })
    .from(categories)
    .where(inArray(categories.slug, slugs));
  const result = validCategories.map((c: any) => c.slug);
  console.log('[validateCategorySlugs] Result:', result);
  return result;
}
/**
 * Get top tools for pSEO listing
 */
export async function getTopTools() {
    return await db
      .select()
      .from(tools)
      .orderBy(desc(tools.searchVolumeSignal))
      .limit(12);
}

/**
 * Get tool by slug with related resources
 */
export async function getToolBySlug(slug: string) {
    const tool = (await db.select().from(tools).where(eq(tools.slug, slug)).limit(1))[0];
    if (!tool) return null;

    // Get related resources for comparison
    const relatedResources = await db
      .select({
        id: resources.id,
        title: resources.title,
        slug: resources.slug,
        description: resources.description,
        url: resources.url,
        thumbnail: resources.thumbnail,
        categoryName: categories.name,
        avgRating: sql<number>`COALESCE(AVG(${ratings.rating}), 0)`,
        ratingCount: sql<number>`COUNT(DISTINCT ${ratings.id})`,
      })
      .from(resources)
      .leftJoin(categories, eq(resources.categoryId, categories.id))
      .leftJoin(ratings, eq(resources.id, ratings.resourceId))
      .where(ilike(resources.description, `%${tool.name}%`)) // Simple matching for now
      .groupBy(resources.id, categories.name)
      .limit(3);

    return { ...tool, relatedResources };
}

/**
 * Get data for Owner Dashboard
 */
export async function getOwnerDashboardData(userId: string) {
    const stats = await db
      .select({
        totalViews: sql<number>`SUM(${resources.views})`,
        toolCount: sql<number>`COUNT(${resources.id})`,
      })
      .from(resources)
      .where(eq(resources.authorId, userId));

    const authoredTools = await db
      .select({
        id: resources.id,
        title: resources.title,
        slug: resources.slug,
        description: resources.description,
        views: resources.views,
        status: resources.status,
        featured: resources.featured,
        categoryName: categories.name,
        avgRating: sql<number>`COALESCE(AVG(${ratings.rating}), 0)`,
        ratingCount: sql<number>`COUNT(DISTINCT ${ratings.id})`,
      })
      .from(resources)
      .leftJoin(categories, eq(resources.categoryId, categories.id))
      .leftJoin(ratings, eq(resources.id, ratings.resourceId))
      .where(eq(resources.authorId, userId))
      .groupBy(resources.id, categories.name)
      .orderBy(desc(resources.publishedAt));

    return { stats: stats[0], tools: authoredTools };
}

/**
 * Get data for Admin Dashboard
 */
export async function getAdminDashboardData() {
    const totalUsers = Number((await db.execute(sql`SELECT count(*) FROM users`))[0].count || 0);
    const totalResources = Number((await db.execute(sql`SELECT count(*) FROM resources`))[0].count || 0);
    const pendingSubmissions = Number((await db.execute(sql`SELECT count(*) FROM submissions WHERE status = 'PENDING'`))[0].count || 0);
    const vettingResources = Number((await db.execute(sql`SELECT count(*) FROM resources WHERE status = 'VETTING'`))[0].count || 0);

    // Recent Submissions
    const recentSubmissions = await db
      .select({
        id: submissions.id,
        title: submissions.title,
        paymentStatus: submissions.paymentStatus,
        paymentType: submissions.paymentType,
        createdAt: submissions.createdAt,
      })
      .from(submissions)
      .orderBy(desc(submissions.createdAt))
      .limit(10);

    return {
      stats: {
        totalUsers,
        totalResources,
        pendingSubmissions,
        vettingResources,
      },
      recentSubmissions
    };
}

/**
 * Get top creators by earnings (for CreatorProofSection)
 */
export async function getTopCreators(limit: number = 4) {
    const results = await db
      .select({
        id: users.id,
        name: users.name,
        username: users.username,
        image: users.image,
        tagline: users.tagline,
        totalEarnings: sql<number>`COALESCE(SUM(${payments.amount}), 0) / 100`, // Convert cents to dollars
        toolsCount: count(resources.id),
      })
      .from(users)
      .leftJoin(payments, eq(users.id, payments.userId))
      .leftJoin(resources, eq(users.id, resources.authorId))
      .where(eq(payments.status, 'SUCCEEDED'))
      .groupBy(users.id)
      .orderBy(desc(sql`total_earnings`))
      .limit(limit);

    return results;
}

/**
 * Get platform-wide stats (for StatsBar)
 */
export async function getPlatformStats() {
    const [toolsRes, creatorsRes, earningsRes] = await Promise.all([
      db.select({ count: count() }).from(resources),
      db.select({ count: count() }).from(users).where(sql`${users.id} IN (SELECT author_id FROM resources)`),
      db.select({ total: sql<number>`SUM(${payments.amount})` }).from(payments).where(eq(payments.status, 'SUCCEEDED'))
    ]);

    return {
      totalTools: Number(toolsRes[0]?.count || 0),
      totalCreators: Number(creatorsRes[0]?.count || 0),
      totalEarnings: Math.floor(Number(earningsRes[0]?.total || 0) / 100)
    };
}

/**
 * Get featured tools for a category (for CategoryShowcase)
 */
export async function getCategoryTools(categorySlug: string, limit: number = 3) {
    const category = (await db.select({ id: categories.id }).from(categories).where(eq(categories.slug, categorySlug)).limit(1))[0];
    if (!category) return [];

    return await db
      .select({
        id: resources.id,
        title: resources.title,
        slug: resources.slug,
        description: resources.description,
        thumbnail: resources.thumbnail,
        price: sql<number>`29`, // Mock price for now as it's not in schema yet
        rating: sql<number>`COALESCE(AVG(${ratings.rating}), 5)`,
        salesCount: sql<number>`COUNT(DISTINCT ${payments.id})`,
        creatorName: users.name,
      })
      .from(resources)
      .leftJoin(users, eq(resources.authorId, users.id))
      .leftJoin(ratings, eq(resources.id, ratings.resourceId))
      .leftJoin(payments, eq(resources.id, payments.resourceId))
      .where(eq(resources.categoryId, category.id))
      .groupBy(resources.id, users.name)
      .orderBy(desc(sql`sales_count`))
      .limit(limit);
}

