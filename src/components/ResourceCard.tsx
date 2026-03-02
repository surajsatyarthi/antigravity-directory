import Link from 'next/link';
import { Star, Eye, ArrowRight, Package } from 'lucide-react';
import { BookmarkButton } from './BookmarkButton';
import { MAX_INTEGRATION_ICONS } from '@/constants';

interface ResourceCardProps {
  resource: {
    id: string;
    title: string;
    slug: string;
    description: string;
    views: number;
    categoryName?: string | null | undefined;
    avgRating?: number;
    ratingCount?: number;
    featured: boolean;
    badgeType?: string | null;
    status?: string;
    isBookmarked?: boolean;
    integrations?: string[] | null;
  };
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const isFeatured = resource.featured;

  return (
    <div 
      data-testid="resource-card"
      className={`group relative flex flex-col sm:flex-row items-start sm:items-center bg-white border rounded-lg overflow-hidden hover:border-blue-400 hover:shadow-md transition-all duration-300 focus-within:ring-1 focus-within:ring-blue-400 focus-within:ring-offset-1 focus-within:ring-offset-slate-50 ${
      isFeatured
        ? 'border-yellow-500/40'
        : 'border-slate-200'
    }`}>

      <Link href={`/t/${resource.slug}`} className="absolute inset-0 z-20 outline-none">
        <span className="sr-only">View details for {resource.title}: {resource.description}</span>
      </Link>

      {/* Sponsored Ribbon */}
      {isFeatured && (
        <div className="absolute top-0 right-0 z-30 flex items-center gap-1.5 px-2 py-1 bg-yellow-500/15 border-b border-l border-yellow-500/30 rounded-bl-lg backdrop-blur-sm">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
          <span className="text-[7px] font-black text-yellow-500 uppercase tracking-[0.2em]">Sponsored</span>
        </div>
      )}

      {/* Container for content */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full p-5 sm:p-6 relative z-10">
        
        {/* Left: Badges & Category (Mobile: Top Row) */}
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          {resource.integrations && resource.integrations.length > 0 && (
            <div
              className="flex items-center gap-1.5"
              aria-label={`Built with: ${resource.integrations.join(', ')}`}
            >
              {resource.integrations.slice(0, MAX_INTEGRATION_ICONS).map((integration, idx) => (
                <div
                  key={idx}
                  className="w-5 h-5 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0"
                  title={integration}
                >
                  <Package className="w-3 h-3 sm:w-2.5 sm:h-2.5 text-slate-400 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
                </div>
              ))}
            </div>
          )}

          <span className="px-2 py-1 rounded bg-blue-50 border border-blue-200 text-[10px] sm:text-[9px] font-black text-blue-600 uppercase tracking-widest whitespace-nowrap">
            {resource.categoryName || 'General'}
          </span>

          <div className="flex gap-2 ml-auto sm:ml-0">
            {/* Editors Choice Removed */ }
            {/* Editors Choice, Trending, and User's Choice Removed */}
          </div>
        </div>

        {/* Middle: Title & Description */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex justify-between items-start">
             <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1 tracking-tight leading-tight truncate pr-8 sm:pr-0">
              {resource.title}
            </h3>
          </div>
          <p className="text-sm text-slate-500 line-clamp-3 sm:line-clamp-1 font-medium">
            {resource.description}
          </p>
        </div>

        {/* Right: Stats & Actions (Mobile: Bottom Row) */}
        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-slate-100 sm:border-0">
          <div className="flex items-center gap-3">
            {/* Rating */}
            <div
              className="flex items-center gap-1.5"
              aria-label={`Rating: ${Number(resource.avgRating ?? 0).toFixed(1)} stars out of ${resource.ratingCount ?? 0} reviews`}
            >
              <Star className="w-4 h-4 sm:w-3.5 sm:h-3.5 fill-yellow-500/90 text-yellow-500/90" aria-hidden="true" />
              <span className="text-sm font-bold font-mono text-slate-900">
                {Number(resource.avgRating ?? 0).toFixed(1)}
              </span>
              <span className="text-slate-500 text-xs font-mono font-bold">
                ({resource.ratingCount ?? 0})
              </span>
            </div>

            {/* Views */}
            <div
              className="flex items-center gap-1.5"
              aria-label={`${resource.views} views`}
            >
              <Eye className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-slate-400" aria-hidden="true" />
              <span className="text-sm font-bold font-mono text-slate-500">
                {resource.views >= 1000 ? `${(resource.views / 1000).toFixed(1)}k` : resource.views}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 relative z-30">
            <BookmarkButton
              resourceId={resource.id}
              initialIsBookmarked={!!resource.isBookmarked}
            />
            <div
              className="flex items-center justify-center w-11 h-11 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-200 text-slate-500 group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-600 transition-all"
              aria-hidden="true"
            >
              <ArrowRight className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
