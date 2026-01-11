import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, Eye, Copy, ExternalLink, ArrowLeft, ChevronRight } from 'lucide-react';
import { db } from '@/lib/db';
import { resources, categories, ratings, tags, resourceTags } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { CitationBlock } from '@/components/CitationBlock';
import { BadgeGenerator } from '@/components/BadgeGenerator';
import { Footer } from '@/components/Footer';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const [resource] = await db
    .select({
      title: resources.title,
      description: resources.description,
      metaTitle: resources.metaTitle,
      metaDesc: resources.metaDesc,
    })
    .from(resources)
    .where(eq(resources.slug, slug))
    .limit(1);

  if (!resource) return { title: 'Resource Not Found' };

  const title = resource.metaTitle || resource.title;
  const description = resource.metaDesc || resource.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/resources/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/resources/${slug}`,
    },
  };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  // Fetch resource with category
  const [resource] = await db
    .select({
      id: resources.id,
      title: resources.title,
      slug: resources.slug,
      description: resources.description,
      content: resources.content,
      url: resources.url,
      views: resources.views,
      copiedCount: resources.copiedCount,
      verified: resources.verified,
      categoryName: categories.name,
    })
    .from(resources)
    .leftJoin(categories, eq(resources.categoryId, categories.id))
    .where(eq(resources.slug, slug))
    .limit(1);

  if (!resource) {
    notFound();
  }

  // Get ratings
  const resourceRatings = await db
    .select({ rating: ratings.rating })
    .from(ratings)
    .where(eq(ratings.resourceId, resource.id));

  const avgRating =
    resourceRatings.length > 0
      ? resourceRatings.reduce((sum, r) => sum + r.rating, 0) / resourceRatings.length
      : 0;

  // Get tags
  const resourceTagsList = await db
    .select({ name: tags.name })
    .from(resourceTags)
    .leftJoin(tags, eq(resourceTags.tagId, tags.id))
    .where(eq(resourceTags.resourceId, resource.id));

  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": resource.title,
    "description": resource.description,
    "applicationCategory": resource.categoryName || "AI Tool",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": avgRating.toFixed(1),
      "reviewCount": resourceRatings.length || 1,
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "author": {
      "@type": "Organization",
      "name": "Antigravity Community"
    },
    "operatingSystem": "Web-based",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is ${resource.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": resource.description
        }
      },
      {
        "@type": "Question",
        "name": `Is ${resource.title} verified on Antigravity?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": resource.verified 
            ? `${resource.title} is a verified tool on the Antigravity Directory, meeting our community standards for reliability and UI excellence.`
            : `${resource.title} is a community-submitted tool. We encourage users to verify its official documentation for details.`
        }
      },
      {
        "@type": "Question",
        "name": `Where can I find alternatives to ${resource.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can explore top-rated alternatives and similar tools to ${resource.title} in the ${resource.categoryName || 'General'} category on Antigravity Directory.`
        }
      }
    ]
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": process.env.NEXT_PUBLIC_SITE_URL || 'https://googleantigravity.directory'
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": resource.categoryName || "Resources",
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://googleantigravity.directory'}/categories/${resource.categoryName?.toLowerCase().replace(/\s+/g, '-')}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": resource.title,
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://googleantigravity.directory'}/resources/${resource.slug}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-white/10">
      {/* JSON-LD Layer (AEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <MarketplaceHeader />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-12 font-mono">
          <Link href="/" className="hover:text-white transition-colors">home</Link>
          <span className="text-gray-800">/</span>
          <Link href="/resources" className="hover:text-white transition-colors">resources</Link>
          <span className="text-gray-800">/</span>
          <span className="text-gray-300 truncate">{resource.title.toLowerCase()}</span>
        </nav>

        <article className="border border-gray-900 rounded-3xl overflow-hidden bg-[#0A0A0A]">
          <div className="p-8 md:p-16">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
              <div className="flex-1">
                <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-blue-500 border border-blue-500/20 mb-6 uppercase tracking-widest font-mono">
                  {resource.categoryName}
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
                  {resource.title}
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed font-medium">
                  {resource.description}
                </p>
              </div>
              
              {resource.url && (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-2xl shadow-xl transition-all active:scale-95"
                >
                  Get Resource
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* AEO Citation Block */}
            <CitationBlock 
              data={{
                title: resource.title,
                description: resource.description,
                category: resource.categoryName || 'General',
                verified: resource.verified,
                rating: avgRating.toFixed(1),
                views: resource.views.toLocaleString()
              }}
            />

            <div className="flex justify-center mb-12">
              <Link 
                href={`/resources/${slug}/alternatives`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl transition-all font-mono text-xs uppercase tracking-widest font-bold font-mono"
              >
                Explore Alternatives
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats Bar - Monospace */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-900 overflow-hidden border border-gray-900 rounded-2xl mb-12 font-mono text-xs">
              <div className="bg-[#0D0D0D] p-6 text-center">
                <div className="text-gray-600 uppercase tracking-widest mb-2">Rating</div>
                <div className="flex items-center justify-center gap-1.5 font-bold text-white text-base">
                  <Star className="w-4 h-4 fill-white text-white animate-shimmer" />
                  {avgRating.toFixed(1)}
                </div>
              </div>
              <div className="bg-[#0D0D0D] p-6 text-center">
                <div className="text-gray-600 uppercase tracking-widest mb-2">Views</div>
                <div className="font-bold text-white text-base">{resource.views.toLocaleString()}</div>
              </div>
              <div className="bg-[#0D0D0D] p-6 text-center">
                <div className="text-gray-600 uppercase tracking-widest mb-2">Copies</div>
                <div className="font-bold text-white text-base">{resource.copiedCount.toLocaleString()}</div>
              </div>
              <div className="bg-[#0D0D0D] p-6 text-center">
                <div className="text-gray-600 uppercase tracking-widest mb-2">Reviews</div>
                <div className="font-bold text-white text-base">{resourceRatings.length}</div>
              </div>
            </div>

            {/* Content / Code Preview */}
            {resource.content && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold tracking-tight text-white font-mono uppercase tracking-widest text-sm text-gray-500">Resource Content</h2>
                  <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl transition-all">
                    <Copy className="w-4 h-4" />
                    Copy Code
                  </button>
                </div>
                <div className="relative group">
                  <pre className="whitespace-pre-wrap font-mono text-sm bg-black p-8 rounded-2xl border border-gray-900 text-gray-300 overflow-x-auto max-h-[600px] leading-relaxed">
                    {resource.content}
                  </pre>
                </div>
              </div>
            )}

            {/* Tags */}
            {resourceTagsList.length > 0 && (
              <div className="mb-12 flex flex-wrap gap-3">
                {resourceTagsList.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 bg-white/5 text-gray-400 border border-white/5 rounded-full text-xs font-mono lowercase"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Rating CTA */}
            <div className="pt-12 border-t border-gray-900 text-center">
              <h3 className="text-xl font-bold mb-6 text-white font-mono uppercase tracking-widest text-sm text-gray-500">Rate this resource</h3>
              <div className="flex justify-center gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="p-2 hover:scale-125 transition-transform"
                  >
                    <Star className="w-10 h-10 text-gray-900 hover:text-white hover:fill-white transition-all duration-300" />
                  </button>
                ))}
              </div>
              <p className="mt-6 text-xs text-gray-600 font-mono tracking-widest uppercase">
                Sign in to verify your vote
              </p>
            </div>
            {/* Badge Flywheel Section */}
            <BadgeGenerator 
              slug={resource.slug} 
              title={resource.title} 
            />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
