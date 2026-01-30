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
import { Pagination } from '@/components/filters/Pagination';
import { Footer } from '@/components/Footer';
import { DirectoryIntelligence } from '@/components/DirectoryIntelligence';
import { Testimonials } from '@/components/Testimonials';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { getCategoriesWithCounts, getAllTags, getFilteredResources, validateCategorySlugs } from '@/lib/queries';
import { validateFilterParams } from '@/lib/validation';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categories?: string }>;
}): Promise<Metadata> {
  const { q, categories } = await searchParams;
  
  if (q) return { title: `Search results for "${q}"` };
  if (categories) return { title: `Filtered Resources` };
  
  return {
    title: "Antigravity Directory - 500+ Curated MCP Servers & AI Tools",
    description: "The complete resource hub for Google Antigravity IDE. Discover 500+ curated MCP servers, coding rules, prompts, and workflows for Gemini 3-powered agentic development. Free resources for developers.",
    openGraph: {
      title: "Antigravity Directory - 500+ Curated Resources",
      description: "The complete resource hub for Google Antigravity IDE. 500+ MCP servers, rules, and prompts.",
      type: "website"
    }
  };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categories?: string; tags?: string; sort?: string; page?: string }>;
}) {
  const params = await searchParams;
  
  // Convert searchParams to URLSearchParams for validation
  const urlParams = new URLSearchParams(params as Record<string, string>);
  const filters = validateFilterParams(urlParams);
  
  // Validate slugs against DB to clean invalid ones
  const validCategorySlugs = await validateCategorySlugs(filters.categories);
  
  const cleanedFilters = {
    ...filters,
    categories: validCategorySlugs
  };

  const page = Number(params.page) || 1;
  const pageSize = 20;

  const [session, categoriesWithCounts, tags, { resources: filteredResources, totalCount }] = await Promise.all([
    auth(),
    getCategoriesWithCounts(),
    getAllTags(),
    getFilteredResources(cleanedFilters, page, pageSize),
  ]);

  const activeFilters = {
    categories: cleanedFilters.categories,
    tags: cleanedFilters.tags,
    badgeTypes: cleanedFilters.badgeTypes,
    q: cleanedFilters.search,
    sort: cleanedFilters.sort
  };

  return (
    <>
      <MarketplaceHeader />
      <FilterPersistenceManager />
      
      <main 
        className="min-h-screen bg-black text-white selection:bg-blue-500/30"
        data-filter-state={JSON.stringify(activeFilters)}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          {/* Command Center: Row 2 & 3 */}
          <div className="mb-8 space-y-6">
            <DirectoryIntelligence />
            <Testimonials />
          </div>

          {/* Main Layout Rail System */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            
            {/* Left Rail: Sticky Filter Sidebar */}
            <aside className="hidden lg:block lg:w-[280px] shrink-0">
              <div className="lg:sticky lg:top-20">
                <FilterSidebar 
                  categories={categoriesWithCounts}
                  tags={tags}
                />
              </div>
            </aside>
            
            {/* Center Rail: Filter Bar + Resource Grid */}
            <div className="flex-1 min-w-0" id="main-grid">
              <TopFilterBar totalCount={totalCount} />
              
              <Suspense fallback={<div className="py-20 text-center text-gray-700 font-mono text-[10px] uppercase tracking-widest animate-pulse">Initializing directory...</div>}>
                <div className="relative">
                  {filteredResources.length > 0 ? (
                    <>
                      <div
                        id="resource-grid"
                        className="flex flex-col gap-3"
                        role="region"
                        aria-label="Agent Marketplace Grid"
                      >
                        {filteredResources.map((resource) => (
                          <ResourceCard
                            key={resource.id}
                            resource={resource as any}
                          />
                        ))}
                      </div>
                      
                      <Pagination totalCount={totalCount} pageSize={pageSize} />
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center border border-white/[0.05] rounded-xl bg-[#030303]">
                      <div className="w-12 h-12 bg-gray-950 border border-gray-900 rounded flex items-center justify-center mb-6">
                        <Package className="w-6 h-6 text-gray-700" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Access denied or empty set</h3>
                      <p className="text-[12px] text-gray-600 max-w-xs mb-8 leading-relaxed">
                        No resources matched your current filters. Reset them to start over.
                      </p>
                      <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all text-[12px] uppercase tracking-widest"
                      >
                        Clear Filters
                      </Link>
                    </div>
                  )}
                </div>
              </Suspense>
            </div>

          </div>
        </div>
      </main>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <NewsletterCapture source="homepage" />
      </div>

      <Footer />
    </>
  );
}
