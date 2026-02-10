import type { Metadata } from 'next';
import { Suspense } from 'react';
import { auth } from '@/auth';
import { Header } from '@/components/Header';
import { FilterPersistenceManager } from '@/components/filters/FilterPersistenceManager';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { TopFilterBar } from '@/components/filters/TopFilterBar';
import { LoadMoreResourceGrid } from '@/components/LoadMoreResourceGrid';
import { fetchResourcesAction } from '@/app/actions/get-resources';
import { getCategoriesWithCounts, getAllTags, validateCategorySlugs } from '@/lib/queries';
import { validateFilterParams } from '@/lib/validation';
import dynamic from 'next/dynamic';

const NewsletterCapture = dynamic(() => import('@/components/NewsletterCapture').then(mod => mod.NewsletterCapture), {
  ssr: true
});

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categories?: string }>;
}): Promise<Metadata> {
  const { q, categories } = await searchParams;
  
  if (q) return { title: `Search results for "${q}"` };
  if (categories) return { title: `Filtered Resources` };
  
  return {
    title: "Browse Resources | googleantigravity.directory",
    description: "Browse 2,200+ AI tools, MCPs, rules, workflows, and prompts for Antigravity.",
  };
}

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categories?: string; tags?: string; sort?: string; page?: string }>;
}) {
  const params = await searchParams;
  
  const urlParams = new URLSearchParams(params as Record<string, string>);
  const filters = validateFilterParams(urlParams);
  
  const validCategorySlugs = await validateCategorySlugs(filters.categories);
  
  const cleanedFilters = {
    ...filters,
    categories: validCategorySlugs
  };

  const page = Number(params.page) || 1;
  const pageSize = 20;

  const [session, categoriesWithCounts, tags, fetchResult] = await Promise.all([
    auth(),
    getCategoriesWithCounts(),
    getAllTags(),
    fetchResourcesAction({
      page,
      search: cleanedFilters.search,
      categories: cleanedFilters.categories.join(','),
      tags: cleanedFilters.tags.join(','),
      sort: cleanedFilters.sort
    }),
  ]);

  const { resources: filteredResources, totalCount } = fetchResult.success 
    ? { resources: fetchResult.resources, totalCount: fetchResult.totalCount }
    : { resources: [], totalCount: 0 };

  const activeFilters = {
    categories: cleanedFilters.categories,
    tags: cleanedFilters.tags,
    badgeTypes: cleanedFilters.badgeTypes,
    q: cleanedFilters.search,
    sort: cleanedFilters.sort
  };

  return (
    <>
      <Header />
      <FilterPersistenceManager />
      
      <main 
        className="min-h-screen bg-black text-white selection:bg-blue-500/30"
        data-filter-state={JSON.stringify(activeFilters)}
      >
        {/* Full Directory */}
        <div className="pt-8" id="full-directory">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-[0.2em]">Full Directory</h2>
              <p className="text-gray-400 text-sm font-bold tracking-widest uppercase">Explore all 2,200+ resources</p>
            </div>

            <div className="lg:flex lg:gap-12 pb-12">
              {/* Sidebar: Visible on Desktop - Sticky & Split-Scroll */}
              <div className="hidden lg:block w-[280px] flex-shrink-0">
                <FilterSidebar 
                  categories={categoriesWithCounts} 
                  tags={tags} 
                />
              </div>

              {/* Grid Column */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-8 border-b border-white/[0.05] pb-6">
                  <h2 className="text-[11px] font-black tracking-[0.2em] text-gray-500 flex items-center gap-2 uppercase">
                    <span className="w-1 h-1 rounded-full bg-blue-500/50"></span>
                    Directory Listings
                  </h2>
                  <TopFilterBar 
                    totalCount={totalCount} 
                    categories={categoriesWithCounts}
                    tags={tags}
                  />
                </div>
                
                <Suspense fallback={<div className="py-20 text-center text-gray-700 font-mono text-[10px] uppercase tracking-widest animate-pulse">Initializing directory...</div>}>
                  <div className="relative">
                    {filteredResources.length > 0 ? (
                      <LoadMoreResourceGrid
                        initialResources={filteredResources}
                        initialTotalCount={totalCount}
                        initialFilters={activeFilters}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center py-24 text-center border border-white/[0.05] rounded-xl bg-[#030303]">
                        <h3 className="text-lg font-bold text-white mb-2 tracking-tight">No results matched</h3>
                        <p className="text-[12px] text-gray-600 max-w-xs mb-8 leading-relaxed">
                          Try adjusting your filters or search terms.
                        </p>
                      </div>
                    )}
                  </div>
                </Suspense>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-20 border-t border-white/[0.05] pb-24 text-center">
          <NewsletterCapture source="browse" />
        </div>
      </main>
    </>
  );
}
