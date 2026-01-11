import { db } from '@/lib/db';
import { resources, categories, ratings } from '@/drizzle/schema';
import { eq, and, sql } from 'drizzle-orm';
import { ResourceWithRelations } from '@/types/database';

export async function getComparisonData(slug1: string, slug2: string) {
  try {
    const fetchResource = async (slug: string) => {
      const [result] = await db
        .select({
          id: resources.id,
          title: resources.title,
          slug: resources.slug,
          description: resources.description,
          url: resources.url,
          thumbnail: resources.thumbnail,
          githubStars: resources.githubStars,
          githubForks: resources.githubForks,
          verified: resources.verified,
          categoryName: categories.name,
          avgRating: sql<number>`COALESCE(AVG(${ratings.rating}), 0)`,
          ratingCount: sql<number>`COUNT(DISTINCT ${ratings.id})`,
        })
        .from(resources)
        .leftJoin(categories, eq(resources.categoryId, categories.id))
        .leftJoin(ratings, eq(resources.id, ratings.resourceId))
        .where(eq(resources.slug, slug))
        .groupBy(resources.id, categories.name)
        .limit(1);
      return result;
    };

    const [toolA, toolB] = await Promise.all([
      fetchResource(slug1),
      fetchResource(slug2)
    ]);

    return { toolA, toolB };
  } catch (error) {
    console.error('Error fetching comparison data:', error);
    return { toolA: null, toolB: null };
  }
}
