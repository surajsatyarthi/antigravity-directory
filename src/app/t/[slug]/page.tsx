import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, Eye, Copy, ExternalLink, ArrowLeft, ChevronRight } from 'lucide-react';
import { db } from '@/lib/db';
import { resources, categories, ratings, tags, resourceTags, users } from '@/drizzle/schema';
import { eq, and, sql } from 'drizzle-orm';
import { Header } from '@/components/Header';
import { CitationBlock } from '@/components/CitationBlock';
import { BadgeGenerator } from '@/components/BadgeGenerator';
import { safeJsonLd } from '@/lib/utils/safeJsonLd';
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
      metaDesc: resources.metaDesc,
      categoryName: categories.name,
    })
    .from(resources)
    .leftJoin(categories, eq(resources.categoryId, categories.id))
    .where(eq(resources.slug, slug))
    .limit(1);

  if (!resource) {
    return {
      title: 'Resource Not Found | Antigravity Directory',
    };
  }

  const categoryName = resource.categoryName ?? 'Resource';
  const title = `${resource.title} — Antigravity ${categoryName} | googleantigravity.directory`;
  const description = resource.metaDesc
    ?? `${resource.description} — A ${categoryName} for Google Antigravity IDE. Browse more ${categoryName} resources on googleantigravity.directory.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://googleantigravity.directory/t/${slug}`,
    },
    alternates: {
      canonical: `https://googleantigravity.directory/t/${slug}`,
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
      badgeType: resources.badgeType,
      categoryName: categories.name,
      categorySlug: categories.slug,
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
    "applicationCategory": resource.categoryName || "Utility",
    "operatingSystem": "Google Antigravity IDE",
    "url": resource.url || `https://googleantigravity.directory/t/${resource.slug}`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
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
        "name": `Is ${resource.title} free?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes. ${resource.title} is free to access on Antigravity Directory. Browse and copy resources at no cost.`
        }
      },
      {
        "@type": "Question",
        "name": `How do I use ${resource.title} in Antigravity?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Visit the resource page and use the copy button to copy the content directly into your Antigravity workspace."
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
        "item": "https://googleantigravity.directory"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": resource.categoryName || "Resources",
        "item": `https://googleantigravity.directory/${resource.categorySlug || ''}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": resource.title,
        "item": `https://googleantigravity.directory/t/${resource.slug}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-white/10">
      {/* JSON-LD Layer (AEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 pb-24 md:pb-12 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-12 font-mono">
          <Link href="/" className="hover:text-white transition-colors">home</Link>
          <span className="text-gray-800">/</span>
          <Link href={`/${resource.categorySlug || ''}`} className="hover:text-white transition-colors">
            {resource.categoryName?.toLowerCase() || 'category'}
          </Link>
          <span className="text-gray-800">/</span>
          <span className="text-gray-300 truncate">{resource.title.toLowerCase()}</span>
        </nav>

        <article className="border border-white/[0.06] rounded-none overflow-hidden bg-[#0A0A0A]">
          <div className="p-8 md:p-16">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-blue-500 border border-blue-500/20 uppercase tracking-widest font-mono">
                    {resource.categoryName}
                  </div>
                  {/* Editors Choice Removed */}
                  {/* Badges Removed */}
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
                  {resource.title}
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed font-medium">
                  {resource.description}
                </p>
              </div>
              
              <div className="flex flex-col gap-3 shrink-0">
                {resource.url ? (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-none shadow-xl transition-all active:scale-95 text-center min-w-[200px]"
                  >
                    Get Resource
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <div className="inline-flex flex-col items-center justify-center gap-1 px-8 py-4 bg-gray-900 text-gray-500 font-bold rounded-none border border-white/5 text-center min-w-[200px] cursor-not-allowed">
                    <span className="text-xs">URL Not Available</span>
                    <span className="text-[10px] font-normal text-gray-600">Contact owner to claim</span>
                  </div>
                )}

              </div>
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



            {/* Stats Bar - Monospace */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.02] overflow-hidden border border-white/[0.06] rounded-none mb-12 font-mono text-xs">
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
                  <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-none transition-all">
                    <Copy className="w-4 h-4" />
                    Copy Code
                  </button>
                </div>
                
                <div className="relative group">
                  <pre className="whitespace-pre-wrap font-mono text-sm bg-black p-8 rounded-none border border-gray-900 text-gray-300 overflow-x-auto max-h-[600px] leading-relaxed">
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

    </div>
  );
}
