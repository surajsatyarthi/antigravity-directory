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
    <div className="min-h-screen bg-black flex flex-col selection:bg-white/10">
      <MarketplaceHeader />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
        {/* Main Content Area - Single Column */}
        <div className="space-y-16">
          
          {/* Featured Section */}
          {featuredResources.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">Featured Collections</h2>
                  <p className="text-sm text-gray-400">Hand-picked high-value resources for Antigravity.</p>
                </div>
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
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">Latest Discoveries</h2>
                  <p className="text-sm text-gray-400">The newest additions to the ecosystem.</p>
                </div>
              </div>
              <Link href="/resources" className="text-sm font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                View all →
              </Link>
            </div>
            
            {latestResources.length > 0 ? (
              <div className="marketplace-grid">
                {latestResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-[#0A0A0A] border border-dashed rounded-3xl border-gray-800">
                <p className="text-gray-400 mb-6 font-medium">No resources found yet.</p>
                <Link href="/submit" className="inline-flex px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all">
                  Submit first resource
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer - Fixed to Pure Dark */}
      <footer className="bg-black border-t border-gray-900 py-16 mt-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-[10px] font-bold text-black font-mono leading-none">A</span>
              </div>
              <span className="text-sm font-bold tracking-tighter text-white font-mono lowercase">
                antigravity
              </span>
            </div>
            <p className="text-xs text-gray-600 font-mono">
              © 2026 Antigravity Directory. built for the next generation of engineers.
            </p>
            <div className="flex gap-6 text-xs text-gray-500 font-mono">
              <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
              <Link href="/submit" className="hover:text-white transition-colors">Submit</Link>
              <Link href="https://github.com" className="hover:text-white transition-colors">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
