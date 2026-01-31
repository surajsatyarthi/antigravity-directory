import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { resources, categories, users, tools } from '@/drizzle/schema';
import { sql, desc } from 'drizzle-orm';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://googleantigravity.directory';

  // 1. Static Routes
  const staticRoutes = [
    '',
    '/submit',
    '/dashboard',
    '/privacy',
    '/terms',
    '/settings',
    '/download',
    '/troubleshooting',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  // 2. Fetch Resources
  const allResources = await db
    .select({ slug: resources.slug, updatedAt: resources.updatedAt })
    .from(resources);

  const resourceRoutes = allResources.map((res) => ({
    url: `${baseUrl}/t/${res.slug}`,
    lastModified: res.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Fetch Alternatives
  const alternativesRoutes = allResources.map((res) => ({
    url: `${baseUrl}/t/${res.slug}/alternatives`,
    lastModified: res.updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 4. Fetch Categories
  const allCategories = await db
    .select({ slug: categories.slug, updatedAt: categories.updatedAt })
    .from(categories);

  const categoryRoutes = allCategories.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: cat.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 5. Fetch User Profiles
  const allUsers = await db
    .select({ username: users.username, updatedAt: users.updatedAt })
    .from(users)
    .where(sql`${users.username} IS NOT NULL`);
      
  const userRoutes = allUsers.map((user) => ({
    url: `${baseUrl}/u/${user.username}`,
    lastModified: user.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));
  
  // 6. Fetch Comparisons (Programmatic Moat)
  // For the sitemap, we generate comparisons for the top 10 most viewed resources
  const topResources = await db
    .select({ slug: resources.slug })
    .from(resources)
    .orderBy(desc(resources.views))
    .limit(10);

  const comparisonRoutes: any[] = [];
  for (let i = 0; i < topResources.length; i++) {
    for (let j = i + 1; j < topResources.length; j++) {
      comparisonRoutes.push({
        url: `${baseUrl}/vs/${topResources[i].slug}-vs-${topResources[j].slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    }
  }

  // 7. Fetch Tools (AI Tools for pSEO)
  const allTools = await db
    .select({ slug: tools.slug, updatedAt: tools.updatedAt })
    .from(tools);

  const toolRoutes = allTools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: tool.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  return [
    ...staticRoutes,
    ...resourceRoutes,
    ...alternativesRoutes,
    ...categoryRoutes,
    ...userRoutes,
    ...comparisonRoutes,
    ...toolRoutes,
  ];
}
