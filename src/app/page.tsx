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
// import { Pagination } from '@/components/filters/Pagination'; // Pagination replaced by Infinite Scroll
import { InfiniteResourceGrid } from '@/components/InfiniteResourceGrid';
import { DirectoryIntelligence } from '@/components/DirectoryIntelligence';
import { HeroSearch } from '@/components/HeroSearch';
import { CategoryTabs } from '@/components/CategoryTabs';
import { FeaturedSection } from '@/components/FeaturedSection';
import { getCategoriesWithCounts, getAllTags, getFilteredResources, validateCategorySlugs, getFeaturedResources } from '@/lib/queries';
import { validateFilterParams } from '@/lib/validation';
import dynamic from 'next/dynamic';

const Testimonials = dynamic(() => import('@/components/Testimonials').then(mod => mod.Testimonials), {
  loading: () => <div className="h-96 w-full animate-pulse bg-white/5 rounded-xl mb-8" />,
  ssr: true
});

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
    title: "Antigravity Directory - 500+ Curated MCP Servers & AI Tools",
    description: "The complete resource hub for Google Antigravity IDE. Discover 500+ curated MCP servers, coding rules, prompts, and workflows for agentic development. Free resources for developers.",
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
  
  const urlParams = new URLSearchParams(params as Record<string, string>);
  const filters = validateFilterParams(urlParams);
  
  const validCategorySlugs = await validateCategorySlugs(filters.categories);
  
  const cleanedFilters = {
    ...filters,
    categories: validCategorySlugs
  };

  const page = Number(params.page) || 1;
  const pageSize = 20;

  const [session, categoriesWithCounts, tags, { resources: filteredResources, totalCount }, featuredResources] = await Promise.all([
    auth(),
    getCategoriesWithCounts(),
    getAllTags(),
    getFilteredResources(cleanedFilters, page, pageSize),
    getFeaturedResources(cleanedFilters.categories[0], 6)
  ]);

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

  return (
    <>
      <MarketplaceHeader />
      <FilterPersistenceManager />
      
      <main 
        className="min-h-screen bg-black text-white selection:bg-blue-500/30"
        data-filter-state={JSON.stringify(activeFilters)}
      >
        {/* 1. Hero Section */}
        {!cleanedFilters.search && cleanedFilters.categories.length === 0 && (
          <HeroSearch />
        )}

        {/* 2. Category Tabs */}
        <CategoryTabs 
          categories={categoriesWithCounts} 
          activeCategories={cleanedFilters.categories} 
        />

        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          
          {/* 3. Featured Section (Surface best content) */}
          <FeaturedSection 
            title={activeCategoryName ? `Featured in ${activeCategoryName}` : "Featured Resources"}
            resources={featuredResources}
            href={cleanedFilters.categories.length > 0 ? `/categories/${cleanedFilters.categories[0]}` : "/prompts"}
            categoryName={activeCategoryName}
          />

          <div className="flex items-center justify-between mb-8 border-b border-white/[0.05] pb-6">
            <h2 className="text-[17px] font-black tracking-tight text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
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

          {/* 4. Knowledge & Proof Sections (Moved to bottom) */}
          <div className="mt-20 pt-20 border-t border-white/[0.05] space-y-16">
            <DirectoryIntelligence />
            <Testimonials />
          </div>
        </div>
      </main>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <NewsletterCapture source="homepage" />
      </div>
    </>
  );
}
