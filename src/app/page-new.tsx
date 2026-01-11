import type { Metadata } from 'next';
import { Suspense } from 'react';
import { auth } from '@/auth';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { TopFilterBar } from '@/components/filters/TopFilterBar';
import { FilterPersistenceManager } from '@/components/filters/FilterPersistenceManager';
import { ResourceCard } from '@/components/ResourceCard';
import { Footer } from '@/components/Footer';
import { getCategoriesWithCounts, getAllTags, getFilteredResources } from '@/lib/queries';
import { validateFilterParams } from '@/lib/validation';
import { LAYOUT } from '@/constants';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categories?: string }>;
}): Promise<Metadata> {
  const { q, categories } = await searchParams;
  
  if (q) return { title: `Search results for "${q}"` };
  if (categories) return { title: `Filtered Resources` };
  
  return {
    title: "Discovery Engine | Antigravity AI Hub",
    description: "The official directory for Google Antigravity resources, Windsurf rules, and MCP servers.",
  };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categories?: string; tags?: string; sort?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  
  // Convert searchParams to URLSearchParams for validation
  const urlParams = new URLSearchParams(params as Record<string, string>);
  const filters = validateFilterParams(urlParams);
  
  // Fetch data server-side
  const [categoriesWithCounts, tags, filteredResources] = await Promise.all([
    getCategoriesWithCounts(),
    getAllTags(),
    getFilteredResources(filters),
  ]);

  return (
    <>
      <MarketplaceHeader />
      <FilterPersistenceManager />
      
      <main className="min-h-screen bg-black text-white">
        <div className="max-w-[1920px] mx-auto px-6 py-8">
          <div className="flex gap-6">
            {/* Left Sidebar - Filters */}
            <FilterSidebar 
              categories={categoriesWithCounts}
              tags={tags}
            />
            
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Top Filter Bar */}
              <TopFilterBar totalCount={filteredResources.length} />
              
              {/* Resource Grid */}
              {filteredResources.length > 0 ? (
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  data-testid="resource-grid"
                >
                  {filteredResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={{
                        id: resource.id,
                        title: resource.title,
                        slug: resource.slug,
                        description: resource.description,
                        views: resource.views,
                        categoryName: resource.categoryName || 'General',
                        avgRating: resource.avgRating || 0,
                        ratingCount: resource.ratingCount || 0,
                        featured: resource.featured,
                        integrations: resource.integrations,
                        isBookmarked: false, // TODO: Check if bookmarked by current user
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-lg">No resources found matching your filters.</p>
                  <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters.</p>
                </div>
              )}
            </div>
            
            {/* Right Sidebar - Ads (placeholder for now) */}
            <aside className="w-80 hidden xl:block">
              <div className="sticky top-24 bg-gray-950 border border-gray-800 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-4">Sponsored</h3>
                <p className="text-gray-500 text-xs">Ad space available</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
