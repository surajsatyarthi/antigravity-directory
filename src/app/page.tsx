import { db } from '@/lib/db';
import { resources, categories, ratings } from '@/drizzle/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { ResourceCard } from '@/components/ResourceCard';
import Link from 'next/link';
import { ChevronRight, Sparkles, TrendingUp } from 'lucide-react';

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
    <div className="min-h-screen bg-background-app flex flex-col">
      <MarketplaceHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar - Categories (Amazon/OpenRouter style) */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">
                Categories
              </h2>
              <nav className="space-y-1">
                <Link 
                  href="/resources" 
                  className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                >
                  All Resources
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
                {allCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                  >
                    {cat.name}
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </nav>

              {/* Promo Card */}
              <div className="mt-8 p-4 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-xl text-white">
                <Sparkles className="w-6 h-6 mb-2" />
                <h3 className="font-bold text-sm mb-1">Bet on the Winner</h3>
                <p className="text-xs text-blue-100 leading-relaxed mb-3">
                  Google's $2.4B acquisition of Windsurf is the starting signal. Build with the best tools.
                </p>
                <Link 
                  href="/submit" 
                  className="inline-block text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Join the momentum
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            
            {/* Featured Section */}
            {featuredResources.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h2 className="text-2xl font-bold tracking-tight">Featured Collections</h2>
                </div>
                <div className="marketplace-grid">
                  {featuredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </section>
            )}

            {/* Latest Resources Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Latest Discoveries</h2>
                <Link href="/resources" className="text-sm font-medium text-blue-600 hover:underline">
                  View all
                </Link>
              </div>
              
              {latestResources.length > 0 ? (
                <div className="marketplace-grid">
                  {latestResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white dark:bg-gray-900 border border-dashed rounded-2xl border-gray-300 dark:border-gray-800">
                  <p className="text-gray-500 mb-4">No resources found yet.</p>
                  <Link href="/submit" className="text-blue-600 font-bold hover:underline">
                    Be the first to submit →
                  </Link>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © 2026 Antigravity Directory. Curated resources for the next generation of developers.
          </p>
        </div>
      </footer>
    </div>
  );
}
