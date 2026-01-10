import { db } from '@/lib/db';
import { resources, categories, ratings } from '@/drizzle/schema';
import { eq, desc } from 'drizzle-orm';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { ResourceCard } from '@/components/ResourceCard';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

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

      <main className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-white">All Resources</h1>
          <p className="text-gray-400">
            Browse our complete collection of curated Antigravity tools, rules, and workflows.
          </p>
        </header>

        {resourcesWithRatings.length > 0 ? (
          <div className="marketplace-grid">
            {resourcesWithRatings.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-[#0A0A0A] border border-dashed rounded-3xl border-gray-800">
            <p className="text-gray-400 mb-6">No resources found matching your criteria.</p>
            <Link href="/submit" className="inline-flex px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all">
              Submit a new resource →
            </Link>
          </div>
        )}
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
