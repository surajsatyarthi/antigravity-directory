import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { Package } from 'lucide-react';
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
  const params = await searchParams;
  
  // Convert searchParams to URLSearchParams for validation
  const urlParams = new URLSearchParams(params as Record<string, string>);
  const filters = validateFilterParams(urlParams);
  
  // Fetch data with graceful degradation (db logic is inside these helpers)
  const [categoriesWithCounts, tags, filteredResources] = await Promise.all([
    getCategoriesWithCounts(),
    getAllTags(),
    getFilteredResources(filters),
  ]);

  return (
    <>
      <MarketplaceHeader />
      <FilterPersistenceManager />
      
      <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Main Layout Rail System */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Left Rail: Sticky Filter Sidebar */}
            <aside className="lg:w-[300px] shrink-0">
              <div className="lg:sticky lg:top-[100px]">
                <FilterSidebar 
                  categories={categoriesWithCounts}
                  tags={tags}
                />
              </div>
            </aside>
            
            {/* Center Rail: Filter Bar + Resource Grid */}
            <div className="flex-1 min-w-0">
              <TopFilterBar totalCount={filteredResources.length} />
              
              {filteredResources.length > 0 ? (
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
                  data-testid="resource-grid"
                >
                  {filteredResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource as any}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-gray-900 rounded-3xl bg-gray-950/30">
                  <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mb-6">
                    <Package className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No tools found</h3>
                  <p className="text-gray-500 max-w-sm mb-8">
                    We couldn&apos;t find any resources matching your current filter criteria. Try broadening your search.
                  </p>
                  <Link
                    href="/"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all text-sm"
                  >
                    Clear all filters
                  </Link>
                </div>
              )}
            </div>
            
            {/* Right Rail: Optional Social / Ad Rail (Desktop Only) */}
            <aside className="hidden 2xl:block w-[320px] shrink-0">
              <div className="sticky top-[100px] space-y-6">
                <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4">Community</h3>
                   <p className="text-white font-medium mb-6 leading-relaxed">
                     Join 5,000+ AI engineers building the next generation of agents.
                   </p>
                   <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all">
                     Join Discord
                   </button>
                </div>
                
                <div className="bg-gray-950/50 border border-gray-900 rounded-3xl p-6">
                   <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-4 text-center">Sponsored</h3>
                   <div className="aspect-[4/5] bg-gray-900/50 rounded-2xl border border-gray-800 flex items-center justify-center border-dashed">
                      <span className="text-gray-700 font-mono text-xs italic">Advertisement Area</span>
                   </div>
                </div>
              </div>
            </aside>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
