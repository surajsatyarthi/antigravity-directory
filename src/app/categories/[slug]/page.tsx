import { db } from '@/lib/db';
import { resources, categories, ratings, bookmarks } from '@/drizzle/schema';
import { eq, desc, sql, and } from 'drizzle-orm';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { ResourceCard } from '@/components/ResourceCard';
import { Footer } from '@/components/Footer';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { safeJsonLd } from '@/lib/utils/safeJsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [category] = await db
    .select({ name: categories.name, description: categories.description })
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);

  if (!category) return { title: 'Category Not Found' };

  return {
    title: `Best ${category.name} AI Tools - Discovery Engine`,
    description: category.description || `Browse the most comprehensive list of ${category.name} resources and AI workflows.`,
    alternates: {
      canonical: `/categories/${slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  // 1. Fetch Category Details
  const [category] = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);

  if (!category) {
    notFound();
  }

  // 2. Fetch All Categories for Sidebar
  const allCategories = await db
    .select()
    .from(categories)
    .orderBy(categories.order);

  // 3. Fetch Resources for this Category
  const categoryResources = await db
    .select({
      id: resources.id,
      title: resources.title,
      slug: resources.slug,
      description: resources.description,
      views: resources.views,
      categoryName: categories.name,
      publishedAt: resources.publishedAt,
      featured: resources.featured,
      badgeType: resources.badgeType,
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
    .where(eq(categories.slug, slug))
    .groupBy(resources.id, categories.id, categories.name)
    .orderBy(desc(resources.publishedAt));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Best ${category.name} AI Tools`,
    "description": category.description || '',
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": categoryResources.map((res, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `/t/${res.slug}`,
        "name": res.title
      }))
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-white/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <MarketplaceHeader />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-28 space-y-12">
              <div>
                <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 px-4">
                  Browse Regions
                </h2>
                <nav className="space-y-1">
                  <Link 
                    href="/" 
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all text-sm group"
                  >
                    Explore All Agents
                  </Link>
                  {allCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      className={`flex items-center justify-between px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                        cat.slug === slug 
                          ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                          : 'text-gray-500 hover:text-white hover:bg-white/[0.02]'
                      }`}
                    >
                      {cat.name}
                      <ChevronRight className={`w-4 h-4 transition-all ${cat.slug === slug ? 'opacity-100' : 'opacity-0'}`} />
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* List Content */}
          <div className="flex-1 min-w-0">
            <header className="mb-12 border-b border-gray-900 pb-10">
              <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-blue-500 border border-blue-500/20 mb-4 uppercase tracking-[0.2em] font-mono">
                Category Hub
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic leading-tight mb-4">
                {category.name}
              </h1>
              <p className="text-gray-500 font-medium max-w-2xl leading-relaxed">
                {category.description || `Exploring the frontier of ${category.name} with curated intelligence and autonomous workflows.`}
              </p>
            </header>

            {categoryResources.length > 0 ? (
              <div className="marketplace-list">
                {categoryResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="text-center py-40 bg-[#050505] border border-gray-900 rounded-[32px]">
                <p className="text-gray-600 mb-8 font-mono text-xs uppercase tracking-widest">Sector empty. No resources identified.</p>
                <Link href="/submit" className="inline-flex px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs">
                  Initialize Submission
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
