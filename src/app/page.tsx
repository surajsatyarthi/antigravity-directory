import { db } from '@/lib/db';
import { resources, categories, ratings } from '@/drizzle/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { ResourceCard } from '@/components/ResourceCard';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ChevronRight, Sparkles, TrendingUp, Zap } from 'lucide-react';

export default async function HomePage() {
  // Fetch Categories
  const allCategories = await db
    .select()
    .from(categories)
    .orderBy(categories.order);

  // Fetch Featured Resources (Joined with category and ratings)
  const featuredResourcesRaw = await db
    .select({
      id: resources.id,
      title: resources.title,
      slug: resources.slug,
      description: resources.description,
      views: resources.views,
      categoryName: categories.name,
      publishedAt: resources.publishedAt,
    })
    .from(resources)
    .leftJoin(categories, eq(resources.categoryId, categories.id))
    .where(eq(resources.featured, true))
    .limit(6);

  // Fetch Latest Resources
  const latestResourcesRaw = await db
    .select({
      id: resources.id,
      title: resources.title,
      slug: resources.slug,
      description: resources.description,
      views: resources.views,
      categoryName: categories.name,
      publishedAt: resources.publishedAt,
    })
    .from(resources)
    .leftJoin(categories, eq(resources.categoryId, categories.id))
    .orderBy(desc(resources.publishedAt))
    .limit(12);

  // Helper to fetch ratings for a resource list
  const addRatings = async (resourceList: any[]) => {
    return await Promise.all(
      resourceList.map(async (resource) => {
        const resourceRatings = await db
          .select({ rating: ratings.rating })
          .from(ratings)
          .where(eq(ratings.resourceId, resource.id));

        const avgRating =
          resourceRatings.length > 0
            ? resourceRatings.reduce((sum, r) => sum + r.rating, 0) / resourceRatings.length
            : 0;

        return {
          ...resource,
          avgRating,
          ratingCount: resourceRatings.length,
        };
      })
    );
  };

  const featuredResources = await addRatings(featuredResourcesRaw);
  const latestResources = await addRatings(latestResourcesRaw);

  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-white/10">
      <MarketplaceHeader />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar - Categories & Filters (Restored) */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-28 space-y-10">
              <div>
                <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 px-4">
                  Categories
                </h2>
                <nav className="space-y-1">
                  <Link 
                    href="/resources" 
                    className="flex items-center justify-between px-4 py-3 text-sm font-bold rounded-xl bg-white/5 text-white border border-white/10 transition-all hover:bg-white/10"
                  >
                    All Tools
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>
                  {allCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-500 hover:text-white hover:bg-white/[0.02] rounded-xl transition-all group"
                    >
                      {cat.name}
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Minimal Filter Section */}
              <div className="pt-8 border-t border-gray-900">
                <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 px-4">
                  Quick Filters
                </h2>
                <div className="space-y-2 px-2">
                  <button className="w-full text-left px-3 py-2 text-xs font-mono text-gray-600 hover:text-blue-500 transition-colors uppercase tracking-widest">
                    ⚡ High Performance
                  </button>
                  <button className="w-full text-left px-3 py-2 text-xs font-mono text-gray-600 hover:text-blue-500 transition-colors uppercase tracking-widest">
                    🔥 Trending Now
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area - List View (Amazon style) */}
          <div className="flex-1 min-w-0">
            
            {/* Featured Section */}
            {featuredResources.length > 0 && (
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

            {/* Latest Resources Section */}
            <section>
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-white rounded-full" />
                  <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic">Latest Discoveries</h2>
                </div>
                <Link href="/resources" className="text-[10px] font-mono uppercase tracking-[3px] text-gray-500 hover:text-white transition-colors border-b border-gray-900 pb-1">
                  View all tools
                </Link>
              </div>
              
              {latestResources.length > 0 ? (
                <div className="marketplace-list">
                  {latestResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-40 bg-[#050505] border border-gray-900 rounded-[32px]">
                  <p className="text-gray-600 mb-8 font-mono text-xs uppercase tracking-widest">No resources located in this sector.</p>
                  <Link href="/submit" className="inline-flex px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs">
                    Initialize Submission
                  </Link>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
