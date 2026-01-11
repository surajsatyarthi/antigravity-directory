import { db } from '@/lib/db';
import { resources, categories, ratings, bookmarks } from '@/drizzle/schema';
import { eq, ne, sql, and, desc } from 'drizzle-orm';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { ResourceCard } from '@/components/ResourceCard';
import { Footer } from '@/components/Footer';
import { ArrowLeft, GitCompare } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [resource] = await db
    .select({ title: resources.title })
    .from(resources)
    .where(eq(resources.slug, slug))
    .limit(1);

  if (!resource) return { title: 'Resource Not Found' };

  return {
    title: `Best Alternatives to ${resource.title} (2026 Comparison) - Antigravity`,
    description: `Comparing the top AI tools and workflows similar to ${resource.title}. Find the best alternative based on verified ratings and features.`,
  };
}

export default async function AlternativesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  // 1. Fetch Target Resource
  const [resource] = await db
    .select({
      id: resources.id,
      title: resources.title,
      categoryId: resources.categoryId,
    })
    .from(resources)
    .where(eq(resources.slug, slug))
    .limit(1);

  if (!resource) {
    notFound();
  }

  // 2. Fetch Alternatives (Same Category, Different ID)
  const alternatives = await db
    .select({
      id: resources.id,
      title: resources.title,
      slug: resources.slug,
      description: resources.description,
      views: resources.views,
      categoryName: categories.name,
      publishedAt: resources.publishedAt,
      featured: resources.featured,
      avgRating: sql<number>`coalesce(avg(${ratings.rating}), 0)`,
      ratingCount: sql<number>`count(${ratings.id})`,
      isBookmarked: sql<boolean>`count(${bookmarks.userId}) > 0`,
    })
    .from(resources)
    .leftJoin(categories, eq(resources.categoryId, categories.id))
    .leftJoin(ratings, eq(resources.id, ratings.resourceId))
    .leftJoin(
      bookmarks,
      and(eq(bookmarks.resourceId, resources.id), eq(bookmarks.userId, userId ?? ''))
    )
    .where(and(eq(resources.categoryId, resource.categoryId), ne(resources.id, resource.id)))
    .groupBy(resources.id, categories.id, categories.name)
    .orderBy(desc(resources.views))
    .limit(10);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Alternatives to ${resource.title}`,
    "description": `Top AI tools in the same category as ${resource.title}`,
    "itemListElement": alternatives.map((res, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `/resources/${res.slug}`,
      "name": res.title
    }))
  };

  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-white/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MarketplaceHeader />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <Link 
          href={`/resources/${slug}`} 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-12 transition-colors font-mono uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {resource.title}
        </Link>

        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-600/10 rounded-lg border border-blue-600/20">
              <GitCompare className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] font-mono">
              Utility Hub / Comparison
            </h2>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic leading-tight mb-6">
            The best alternatives to <span className="text-blue-600">{resource.title}</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl leading-relaxed">
            Exploring verified intelligence and autonomous alternatives for your workflow sector. Ranked by community authority and performance metrics.
          </p>
        </header>

        {alternatives.length > 0 ? (
          <div className="space-y-4">
            <div className="marketplace-list">
              {alternatives.map((alt) => (
                <ResourceCard key={alt.id} resource={alt} />
              ))}
            </div>
          </div>
        ) : (
          <div className="py-40 bg-[#050505] border border-gray-900 rounded-[32px] text-center">
            <p className="text-gray-600 font-mono text-xs uppercase tracking-widest">
              No matching signals found in this sector.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
