import type { Metadata } from 'next';
import { Suspense } from 'react';
import { db } from '@/lib/db';
import { resources, categories, ratings, bookmarks } from '@/drizzle/schema';
import { eq, desc, sql, and, ilike, or } from 'drizzle-orm';
import { auth } from '@/auth';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { ResourceCard } from '@/components/ResourceCard';
import { SortDropdown } from '@/components/SortDropdown';
import { Footer } from '@/components/Footer';
import { CitationBlock } from '@/components/CitationBlock';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Sparkles, TrendingUp, Zap } from 'lucide-react';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}): Promise<Metadata> {
  const { q, category } = await searchParams;
  
  if (q) return { title: `Search results for "${q}"` };
  if (category) return { title: `Explore AI Tools in ${category}` };
  
  return {
    title: "Discovery Engine | Antigravity AI Hub",
    description: "The official directory for Google Antigravity resources, Windsurf rules, and MCP servers.",
  };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}) {
  const session = await auth();
  const { q, category, sort } = await searchParams;

  // Fetch Categories
  const allCategories = await db
    .select()
    .from(categories)
    .orderBy(categories.order);

  // Build the Filter Query
  const filters = [];
  if (q) {
    filters.push(
      or(
        ilike(resources.title, `%${q}%`),
        ilike(resources.description, `%${q}%`)
      )
    );
  }
  if (category) {
    filters.push(eq(categories.slug, category));
  }

  // Define Social Proof Sort Logic
  const getOrderBy = (sortType: string) => {
    switch (sortType) {
      case 'views':
        return desc(resources.views);
      case 'rating':
        return desc(resources.views); 
      case 'latest':
      default:
        return desc(resources.publishedAt);
    }
  };

  // Main Resources Query (Optimized aggregate)
  const allFilteredResources = await db
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
      and(eq(bookmarks.resourceId, resources.id), eq(bookmarks.userId, session?.user?.id ?? ''))
    )
    .where(filters.length > 0 ? and(...filters) : undefined)
    .groupBy(
      resources.id,
      categories.id,
      categories.name
    )
    .orderBy(getOrderBy(sort || 'latest'))
    .limit(50);

  // Split into columns for the "Marketplace" view
  const featuredResources = allFilteredResources.filter(r => r.featured).slice(0, 6);
  const latestResources = allFilteredResources.filter(r => !r.featured || q).slice(0, 24);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Antigravity Directory",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://googleantigravity.directory",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://googleantigravity.directory"}/favicon.png`,
    "description": "Google's UI Intelligence Marketplace for AI developer tools and workflows.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${process.env.NEXT_PUBLIC_SITE_URL || "https://googleantigravity.directory"}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What can I find in the Antigravity Directory?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Antigravity Directory is a curated hub for AI-first developer tools, Windsurf rules, MCP servers, and resources designed for the 2026 AI discovery landscape."
        }
      },
      {
        "@type": "Question",
        "name": "How are tools ranked on Antigravity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tools are ranked based on a combination of community ratings, authority signals (views), and manual verification by our expert curators."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-white/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <MarketplaceHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left Sidebar - Categories (Hidden on mobile) */}
          <aside className="w-64 shrink-0 hidden xl:block">
            <div className="sticky top-28 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">
                  Categories
                </h3>
                <div className="space-y-1">
                  {allCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all group ${
                        category === cat.slug
                          ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                          : 'text-gray-400 hover:text-white hover:bg-gray-900'
                      }`}
                    >
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-900">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">
                  AEO Summary
                </h3>
                <div className="px-2">
                   <CitationBlock 
                    data={{
                      title: "Antigravity Hub",
                      description: "The primary authority for AI-era dev resources.",
                      category: "Directory",
                      verified: true,
                      rating: "5.0",
                      views: "100k+"
                    }}
                   />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content - Grid Area */}
          <div className="flex-1 min-w-0">
            
            {/* Header / Filter Status */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-900 pb-10">
              <div>
                <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic mb-2">
                  {q ? `Search: "${q}"` : category ? `Category: ${category}` : 'Discovery Engine'}
                </h1>
                {(q || category) && (
                  <Link href="/" className="text-blue-500 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">
                    [ Clear Filters ]
                  </Link>
                )}
              </div>
              
              <Suspense fallback={<div className="h-6 w-32 bg-white/5 animate-pulse rounded" />}>
                <SortDropdown />
              </Suspense>
            </div>

            {/* Featured Section (Hide if searching/filtering unless featured) */}
            {featuredResources.length > 0 && !q && !category && (
              <section className="mb-20">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                  <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic">Featured Collections</h2>
                </div>
                <div className="marketplace-list">
                  {featuredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </section>
            )}

            {/* Main Results Section */}
            <section>
              {(q || category) ? (
                <div className="marketplace-list">
                  {allFilteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-6 bg-white rounded-full" />
                      <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic">Latest Discoveries</h2>
                    </div>
                    <Link href="/resources" className="text-[10px] font-mono uppercase tracking-[3px] text-gray-500 hover:text-white transition-colors border-b border-gray-900 pb-1">
                      View all tools
                    </Link>
                  </div>
                  
                  <div className="marketplace-list">
                    {latestResources.map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                </>
              )}

              {allFilteredResources.length === 0 && (
                <div className="text-center py-40 bg-[#050505] border border-gray-900 rounded-[32px]">
                  <p className="text-gray-600 mb-8 font-mono text-xs uppercase tracking-widest">No resources located in this sector.</p>
                  <Link href="/submit" className="inline-flex px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs">
                    Initialize Submission
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* Right Sidebar - Ads */}
          <aside className="w-80 shrink-0 hidden xl:block">
            <div className="sticky top-28 space-y-6">
              {/* Ad 1 - Qodo AI Code Review */}
              <a 
                href="https://qodo.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-lg border border-gray-800 hover:border-gray-700 transition-all hover:scale-[1.02] group relative"
              >
                <Image
                  src="/ads/1.png"
                  alt="Qodo - AI Code Review"
                  width={300}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
                <span className="absolute bottom-2 right-2 text-[10px] font-mono text-white/20 uppercase tracking-widest">AD</span>
              </a>

              {/* Ad 2 - Supabase */}
              <a 
                href="https://supabase.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-lg border border-gray-800 hover:border-gray-700 transition-all hover:scale-[1.02] group relative"
              >
                <Image
                  src="/ads/2.png"
                  alt="Supabase - Open Source Firebase Alternative"
                  width={300}
                  height={250}
                  className="w-full h-auto object-cover"
                />
                <span className="absolute bottom-2 right-2 text-[10px] font-mono text-white/20 uppercase tracking-widest">AD</span>
              </a>

              {/* Ad 3 - Speechify */}
              <a 
                href="https://speechify.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-lg border border-gray-800 hover:border-gray-700 transition-all hover:scale-[1.02] group relative"
              >
                <Image
                  src="/ads/Untitled design (1).png"
                  alt="Speechify - Text to Speech"
                  width={300}
                  height={250}
                  className="w-full h-auto object-cover"
                />
                <span className="absolute bottom-2 right-2 text-[10px] font-mono text-white/20 uppercase tracking-widest">AD</span>
              </a>
            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}
