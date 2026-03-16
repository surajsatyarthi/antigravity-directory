export const dynamic = 'force-dynamic';

import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { resources } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

const BASE_URL = 'https://www.googleantigravity.directory';

const CATEGORY_SLUGS = [
  'mcp-servers',
  'skills',
  'rules',
  'prompts',
  'agents',
  'workflows',
  'boilerplates',
  'troubleshooting',
  'tutorials',
  'cheatsheets',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all live, indexed resources
  let liveResources: { slug: string | null; updatedAt: Date | null }[] = [];
  try {
    liveResources = await db
      .select({
        slug: resources.slug,
        updatedAt: resources.updatedAt,
      })
      .from(resources)
      .where(eq(resources.status, 'LIVE'));
  } catch {
    // DB unavailable during build — return static URLs only
    liveResources = [];
  }

  const resourceUrls: MetadataRoute.Sitemap = liveResources
    .filter((r) => r.slug)
    .map((r) => ({
      url: `${BASE_URL}/t/${r.slug}`,
      lastModified: r.updatedAt ?? new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

  const categoryUrls: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/advertise`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  return [...staticUrls, ...categoryUrls, ...resourceUrls];
}
