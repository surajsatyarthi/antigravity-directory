import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CategoryGridDiscovery } from '@/components/CategoryGridDiscovery';
// REMOVED - CTASection (redundant with Hero CTAs)
import { FilterPersistenceManager } from '@/components/filters/FilterPersistenceManager';
import { LoadMoreResourceGrid } from '@/components/LoadMoreResourceGrid';
import { SponsoredCard } from '@/components/SponsoredCard';
import { FeaturedSection } from '@/components/FeaturedSection';
import { fetchResourcesAction } from '@/app/actions/get-resources';
import { validateCategorySlugs, getFeaturedResources } from '@/lib/queries';
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
    title: "Antigravity Directory — MCP Servers, Skills, Rules & Prompts for Google Antigravity IDE",
    description: "The free directory of Google Antigravity IDE resources. Browse 3,000+ MCP servers, rules, prompts, skills and workflows — all free.",
    openGraph: {
      title: "Antigravity Directory — MCP Servers, Skills, Rules & Prompts for Google Antigravity IDE",
      description: "Browse 3,000+ free MCP servers, rules, prompts and workflows for Google Antigravity IDE.",
      type: "website",
      url: "https://googleantigravity.directory"
    },
    alternates: {
      canonical: "https://googleantigravity.directory"
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

  const [fetchResult, featuredResources] = await Promise.all([
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


  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Antigravity Directory",
            "url": "https://googleantigravity.directory",
            "description": "The #1 resource directory for Google Antigravity IDE",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://googleantigravity.directory/?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      <FilterPersistenceManager />
      
      <main 
        className="min-h-screen bg-black text-white selection:bg-blue-500/30"
      >
        {/* Hero */}
        <HeroSection />

        {/* 2. Category Discovery Grid */}
        <CategoryGridDiscovery />

        {/* Ad slot */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <SponsoredCard />
        </div>

        {/* 3. Featured Resources (Seeded Data) */}
        {featuredResources.length > 0 && (
          <FeaturedSection 
            title="Featured Resources"
            resources={featuredResources} 
            href="/"
          />
        )}

        {/* 4. Directory Grid / Search Results */}
        <section id="directory" className="py-12 max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
             <LoadMoreResourceGrid 
                initialResources={filteredResources}
                initialTotalCount={totalCount}
                initialFilters={activeFilters}
             />
        </section>

        {/* 4. Newsletter */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-20 border-t border-white/[0.05] pb-24 text-center">
          <NewsletterCapture source="homepage" />
        </div>
      </main>
    </>
  );
}

