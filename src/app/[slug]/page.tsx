import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LoadMoreResourceGrid } from '@/components/LoadMoreResourceGrid';
import { CategorySponsorBanner } from '@/components/CategorySponsorBanner';
import { fetchResourcesAction } from '@/app/actions/get-resources';

const CATEGORIES: Record<string, { name: string; description: string }> = {
  'mcp-servers': {
    name: 'MCP Servers',
    description: 'Browse {count}+ MCP servers for Google Antigravity IDE. Find the best tool integrations, APIs and context providers for your Antigravity workspace.',
  },
  'skills': {
    name: 'Skills',
    description: 'Browse {count}+ Skills for Google Antigravity IDE. Agent capabilities, SKILL.md packages and pre-built skills for your Antigravity workflows.',
  },
  'rules': {
    name: 'Rules',
    description: 'Browse {count}+ rules for Google Antigravity IDE. Custom AI behaviours, coding standards and context rules to shape your Antigravity experience.',
  },
  'prompts': {
    name: 'Prompts',
    description: 'Browse {count}+ prompts for Google Antigravity IDE. System prompts, task prompts and instruction sets optimised for Gemini and Antigravity.',
  },
  'agents': {
    name: 'Agents',
    description: 'Browse {count}+ agents for Google Antigravity IDE. Pre-configured agentic setups and agent templates for complex workflows.',
  },
  'workflows': {
    name: 'Workflows',
    description: 'Browse {count}+ workflows for Google Antigravity IDE. Automation templates, multi-step flows and saved workflow configurations.',
  },
  'boilerplates': {
    name: 'Boilerplates',
    description: 'Browse {count}+ boilerplates for Google Antigravity IDE. Project starters, repo templates and scaffolds configured for Antigravity.',
  },
  'troubleshooting': {
    name: 'Troubleshooting',
    description: 'Browse {count}+ troubleshooting guides for Google Antigravity IDE. Common errors, fixes and how-to guides for Antigravity users.',
  },
  'tutorials': {
    name: 'Tutorials',
    description: 'Browse {count}+ tutorials for Google Antigravity IDE. Step-by-step guides for getting the most out of Antigravity and Gemini.',
  },
  'cheatsheets': {
    name: 'Cheatsheets',
    description: 'Browse {count}+ cheatsheets for Google Antigravity IDE. Quick reference cards for commands, shortcuts and configurations.',
  },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES[slug];
  if (!category) return {};

  const fetchResult = await fetchResourcesAction({
    page: 1,
    categories: slug,
  });

  const count = fetchResult.success ? fetchResult.totalCount : 0;
  const title = `${category.name} for Google Antigravity IDE | googleantigravity.directory`;
  const description = category.description.replace('{count}', String(count));

  return {
    title,
    description,
    alternates: {
      canonical: `https://googleantigravity.directory/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://googleantigravity.directory/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = CATEGORIES[slug];

  if (!category) {
    notFound();
  }

  const fetchResult = await fetchResourcesAction({
    page: 1,
    categories: slug,
  });

  const resources = fetchResult.success ? fetchResult.resources : [];
  const totalCount = fetchResult.success ? fetchResult.totalCount : 0;
  
  const count = totalCount;
  const description = category.description.replace('{count}', String(count));

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': `${category.name} for Google Antigravity IDE`,
    'description': description,
    'url': `https://googleantigravity.directory/${slug}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://googleantigravity.directory' },
      { '@type': 'ListItem', 'position': 2, 'name': category.name, 'item': `https://googleantigravity.directory/${slug}` },
    ],
  };

  const activeFilters = {
    categories: [slug],
    tags: [],
    badgeTypes: undefined,
    q: undefined,
    sort: undefined
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="min-h-screen bg-black text-white">
        {/* Page Header */}
        <section className="pt-24 pb-8 px-4 max-w-[1920px] mx-auto sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            {category.name} for Google Antigravity IDE
          </h1>
          <p className="mt-3 text-gray-400 text-base">
            {count.toLocaleString()} resources
          </p>
        </section>

        {/* Resource Grid */}
        <section className="py-8 max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
             <CategorySponsorBanner />
             <LoadMoreResourceGrid 
                initialResources={resources}
                initialTotalCount={totalCount}
                initialFilters={activeFilters}
             />
        </section>
      </main>
      <Footer />
    </>
  );
}
