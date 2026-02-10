import type { Metadata } from 'next';
import { Suspense } from 'react';
import { auth } from '@/auth';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CategoryGridDiscovery } from '@/components/CategoryGridDiscovery';
import { CreatorTestimonials } from '@/components/CreatorTestimonials';
// REMOVED - CTASection (redundant with Hero CTAs)
import { FilterPersistenceManager } from '@/components/filters/FilterPersistenceManager';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { TopFilterBar } from '@/components/filters/TopFilterBar';
import { LoadMoreResourceGrid } from '@/components/LoadMoreResourceGrid';
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
    title: "Biggest community for Antigravity | googleantigravity.directory",
    description: "The marketplace where 500+ creators monetize their tools. Earn 80% commission on MCP servers, rules, and workflows.",
    openGraph: {
      title: "Biggest community for Antigravity",
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
      >
        {/* 1. Creator Marketplace Hero */}
        <HeroSection />

        {/* 2. Category Discovery Grid */}
        <CategoryGridDiscovery />

        {/* 3. Creator Testimonials */}
        <CreatorTestimonials />

        {/* 4. Newsletter */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-20 border-t border-white/[0.05] pb-24 text-center">
          <NewsletterCapture source="homepage" />
        </div>
      </main>
    </>
  );
}

