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
    categoryName: string | null;
    avgRating: number;
    ratingCount: number;
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
    <div className={`group relative flex items-center bg-[#050505] border rounded-lg overflow-hidden hover:border-blue-500/50 hover:bg-white/[0.01] transition-all duration-300 focus-within:ring-1 focus-within:ring-blue-500/50 focus-within:ring-offset-1 focus-within:ring-offset-black ${
      isFeatured
        ? 'border-yellow-500/40'
        : 'border-white/[0.05]'
    }`}>

      <Link href={`/t/${resource.slug}`} className="absolute inset-0 z-20 outline-none">
        <span className="sr-only">View details for {resource.title}: {resource.description}</span>
      </Link>

      {/* Featured Ribbon */}
      {isFeatured && (
        <div className="absolute top-0 right-0 z-30 flex items-center gap-1.5 px-2 py-1 bg-yellow-500/15 border-b border-l border-yellow-500/30 rounded-bl-lg backdrop-blur-sm">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
          <span className="text-[7px] font-black text-yellow-500 uppercase tracking-[0.2em]">Featured</span>
        </div>
      )}

      <div className="flex items-center gap-4 w-full p-4 relative z-10">
        {/* Left: Badges & Category */}
        <div className="flex items-center gap-2 shrink-0">
          {resource.integrations && resource.integrations.length > 0 && (
            <div
              className="flex items-center gap-1.5"
              aria-label={`Built with: ${resource.integrations.join(', ')}`}
            >
              {resource.integrations.slice(0, MAX_INTEGRATION_ICONS).map((integration, idx) => (
                <div
                  key={idx}
                  className="w-5 h-5 rounded-md bg-gray-950 border border-gray-900 flex items-center justify-center shrink-0"
                  title={integration}
                >
                  <Package className="w-2.5 h-2.5 text-gray-400 group-hover:text-blue-400 transition-colors" aria-hidden="true" />
                </div>
              ))}
            </div>
          )}

          <span className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase tracking-widest whitespace-nowrap">
            {resource.categoryName || 'General'}
          </span>

          {resource.badgeType === 'editors_choice' && (
            <span className="px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-[9px] font-black text-yellow-500 uppercase tracking-widest whitespace-nowrap">
              Editor's
            </span>
          )}
          {resource.badgeType === 'trending' && (
            <span className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-[9px] font-black text-purple-400 uppercase tracking-widest whitespace-nowrap">
              Trending
            </span>
          )}
          {resource.badgeType === 'users_choice' && (
            <span className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 uppercase tracking-widest whitespace-nowrap">
              User's
            </span>
          )}
        </div>

        {/* Middle: Title & Description */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors mb-1 tracking-tight leading-tight truncate">
            {resource.title}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-1 font-medium">
            {resource.description}
          </p>
        </div>

        {/* Right: Stats & Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-3">
            {/* Rating */}
            <div
              className="flex items-center gap-1.5"
              aria-label={`Rating: ${Number(resource.avgRating).toFixed(1)} stars out of ${resource.ratingCount} reviews`}
            >
              <Star className="w-3.5 h-3.5 fill-yellow-500/90 text-yellow-500/90" aria-hidden="true" />
              <span className="text-sm font-bold font-mono text-white">
                {Number(resource.avgRating).toFixed(1)}
              </span>
              <span className="text-gray-500 text-xs font-mono font-bold">
                ({resource.ratingCount})
              </span>
            </div>

            {/* Views */}
            <div
              className="flex items-center gap-1.5"
              aria-label={`${resource.views} views`}
            >
              <Eye className="w-3.5 h-3.5 text-gray-600" aria-hidden="true" />
              <span className="text-sm font-bold font-mono text-gray-500">
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
              className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-950 border border-gray-900 text-gray-400 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all"
              aria-hidden="true"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
