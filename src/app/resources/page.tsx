import { db } from '@/lib/db';
import { resources, categories, ratings } from '@/drizzle/schema';
import { eq, desc } from 'drizzle-orm';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { ResourceCard } from '@/components/ResourceCard';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ChevronRight, Zap } from 'lucide-react';

export default async function ResourcesPage() {
  // Fetch Categories
  const allCategories = await db
    .select()
    .from(categories)
    .orderBy(categories.order);

  // Fetch all resources with categories
  const allResourcesRaw = await db
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
    .limit(100);

  // Get ratings for each resource
  const resourcesWithRatings = await Promise.all(
    allResourcesRaw.map(async (resource) => {
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

  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-white/10">
      <MarketplaceHeader />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar - Categories (Restored) */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-28 space-y-12">
              <div>
                <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 px-4">
                  Browse by Category
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
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Promo Card */}
              <div className="p-6 bg-[#0A0A0A] border border-gray-900 rounded-2xl">
                <h3 className="text-white font-bold text-sm mb-3">Community Hub</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  Help us build the most comprehensive directory for Google's UI Intelligence.
                </p>
                <Link 
                  href="/submit" 
                  className="inline-block w-full text-center text-[10px] font-bold bg-white text-black px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors uppercase tracking-widest"
                >
                  Submit Tool
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content Area - List View */}
          <div className="flex-1 min-w-0">
            <header className="mb-12 border-b border-gray-900 pb-10">
              <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Discovery Engine</h1>
            </header>

            {resourcesWithRatings.length > 0 ? (
              <div className="marketplace-list">
                {resourcesWithRatings.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="text-center py-40 bg-[#050505] border border-gray-900 rounded-[32px]">
                <p className="text-gray-600 mb-8 font-mono text-xs uppercase tracking-widest">Neural link failed. No resources detected.</p>
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
