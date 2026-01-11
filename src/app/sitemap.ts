import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { resources, categories, users } from '@/drizzle/schema';
import { sql } from 'drizzle-orm';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://googleantigravity.directory';

  // 1. Static Routes
  const staticRoutes = [
    '',
    '/resources',
    '/submit',
    '/dashboard',
    '/privacy',
    '/terms',
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
    url: `${baseUrl}/resources/${res.slug}`,
    lastModified: res.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Fetch Alternatives
  const alternativesRoutes = allResources.map((res) => ({
    url: `${baseUrl}/resources/${res.slug}/alternatives`,
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
  
  return [
    ...staticRoutes,
    ...resourceRoutes,
    ...alternativesRoutes,
    ...categoryRoutes,
    ...userRoutes,
  ];
}
