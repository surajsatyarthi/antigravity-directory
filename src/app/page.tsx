import type { Metadata } from 'next';
import { Suspense } from 'react';
import { auth } from '@/auth';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CreatorProofSection } from '@/components/CreatorProofSection';
import { HowItWorks } from '@/components/HowItWorks';
import { CategoryShowcase } from '@/components/CategoryShowcase';
import { StatsBar } from '@/components/StatsBar';
import { CTASection } from '@/components/CTASection';
import { FilterPersistenceManager } from '@/components/filters/FilterPersistenceManager';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { TopFilterBar } from '@/components/filters/TopFilterBar';
import { InfiniteResourceGrid } from '@/components/InfiniteResourceGrid';
import { DirectoryIntelligence } from '@/components/DirectoryIntelligence';
import { FeaturedSection } from '@/components/FeaturedSection';
import { fetchResourcesAction } from '@/app/actions/get-resources';
import { getCategoriesWithCounts, getAllTags, validateCategorySlugs, getFeaturedResources } from '@/lib/queries';
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
    title: "Build, Share, and Earn with Antigravity Tools | googleantigravity.directory",
    description: "The marketplace where 500+ creators monetize their tools. Earn 80% commission on MCP servers, rules, and workflows.",
    openGraph: {
      title: "Build, Share, and Earn with Antigravity Tools",
      description: "The marketplace where 500+ creators monetize their tools. Earn 80% commission.",
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
  
  const urlParams = new URLSearchParams(params as Record<string, string>);
  const filters = validateFilterParams(urlParams);
  
  const validCategorySlugs = await validateCategorySlugs(filters.categories);
  
  const cleanedFilters = {
    ...filters,
    categories: validCategorySlugs
  };

  const page = Number(params.page) || 1;
  const pageSize = 20;

  const [session, categoriesWithCounts, tags, fetchResult, featuredResources] = await Promise.all([
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
    getFeaturedResources(cleanedFilters.categories[0], 6)
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

  const activeCategoryName = cleanedFilters.categories.length > 0 
    ? categoriesWithCounts.find(c => c.slug === cleanedFilters.categories[0])?.name 
    : undefined;

  // Check if we are in "Search/Filter Mode" or "Landing Mode"
  const isBrowsing = cleanedFilters.search || cleanedFilters.categories.length > 0;

  return (
    <>
      <Header />
      <FilterPersistenceManager />
      
      <main 
        className="min-h-screen bg-black text-white selection:bg-blue-500/30"
        data-filter-state={JSON.stringify(activeFilters)}
      >
        {/* 1. Creator Marketplace Hero */}
        {!isBrowsing && (
          <>
            <HeroSection />
            <StatsBar />
            <CreatorProofSection />
            <HowItWorks />
            <CategoryShowcase />
          </>
        )}

        {/* 2. Directory Listing Mode */}
        <div className={!isBrowsing ? "mt-24 border-t border-white/[0.05] pt-24" : ""}>
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
                {/* 3. Editor's Spotlight */}
                <FeaturedSection 
                  title={activeCategoryName ? `Editor's Spotlight: ${activeCategoryName}` : "Editor's Spotlight"}
                  resources={featuredResources}
                  href={cleanedFilters.categories.length > 0 ? `/categories/${cleanedFilters.categories[0]}` : "/prompts"}
                  categoryName={activeCategoryName}
                />
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2 mb-8 ml-1">
                  Top-rated & sponsored tools selected by our curators
                </p>

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
                      <InfiniteResourceGrid
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

        {/* 4. Final CTA */}
        {!isBrowsing && <CTASection />}

        {/* 5. Knowledge Sections */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-20 border-t border-white/[0.05] space-y-24 pb-24">
          <DirectoryIntelligence />
          <NewsletterCapture source="homepage" />
        </div>
      </main>
    </>
  );
}

