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
    isBookmarked?: boolean;
    integrations?: string[] | null;
  };
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const isFeatured = resource.featured;
  
  return (
    <div className={`group relative flex flex-col bg-[#050505] border rounded-lg overflow-hidden hover:border-blue-500/50 hover:bg-white/[0.01] transition-all duration-300 h-full focus-within:ring-1 focus-within:ring-blue-500/50 focus-within:ring-offset-1 focus-within:ring-offset-black ${
      isFeatured 
        ? 'border-yellow-500/20' 
        : 'border-white/[0.05]'
    }`}>
      <Link href={`/t/${resource.slug}`} className="absolute inset-0 z-10 outline-none">
        <span className="sr-only">View details for {resource.title}: {resource.description}</span>
      </Link>
      
      <div className="p-3 flex flex-col h-full relative z-20">
        {/* Header Section: Integrations & Badges */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1 overflow-hidden">
            {resource.integrations && resource.integrations.length > 0 && (
              <div 
                className="flex items-center gap-1 mr-1"
                aria-label={`Built with: ${resource.integrations.join(', ')}`}
              >
                {resource.integrations.slice(0, MAX_INTEGRATION_ICONS).map((integration, idx) => (
                  <div
                    key={idx}
                    className="w-4 h-4 rounded-md bg-gray-950 border border-gray-900 flex items-center justify-center shrink-0"
                    title={integration}
                  >
                    <Package className="w-2 h-2 text-gray-600 group-hover:text-blue-400 transition-colors" aria-hidden="true" />
                  </div>
                ))}
              </div>
            )}
            
            <span className="px-1.5 py-0.5 rounded bg-blue-500/5 border border-blue-500/10 text-[8px] font-black text-blue-500/60 uppercase tracking-widest whitespace-nowrap">
              {resource.categoryName || 'General'}
            </span>

            {resource.badgeType === 'editors_choice' && (
              <span className="px-1.5 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-[8px] font-black text-yellow-500 uppercase tracking-widest whitespace-nowrap shadow-[0_0_8px_rgba(234,179,8,0.1)]">
                Editor's Choice
              </span>
            )}
            {resource.badgeType === 'trending' && (
              <span className="px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[8px] font-black text-purple-400 uppercase tracking-widest whitespace-nowrap shadow-[0_0_8px_rgba(168,85,247,0.1)]">
                Trending
              </span>
            )}
            {resource.badgeType === 'users_choice' && (
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-400 uppercase tracking-widest whitespace-nowrap shadow-[0_0_8px_rgba(16,185,129,0.1)]">
                User's Choice
              </span>
            )}
          </div>

          {(isFeatured || resource.badgeType === 'editors_choice') && (
            <div 
              className={`shrink-0 h-4.5 w-4.5 flex items-center justify-center rounded-full border ${
                resource.badgeType === 'editors_choice' 
                  ? 'bg-yellow-500/10 border-yellow-500/30' 
                  : 'bg-yellow-500/5 border-yellow-500/10'
              }`}
              aria-label={resource.badgeType === 'editors_choice' ? "Editor's Choice" : "Featured Resource"}
            >
              <Star className={`w-2.5 h-2.5 ${resource.badgeType === 'editors_choice' ? 'fill-yellow-500 text-yellow-500' : 'fill-yellow-500/40 text-yellow-500/40'}`} aria-hidden="true" />
            </div>
          )}
        </div>
        
        {/* Title & Description */}
        <div className="flex-1 mb-3">
          <h3 className="text-[13px] font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 mb-1 tracking-tightest">
            {resource.title}
          </h3>
          <p className="text-[11px] text-gray-500 line-clamp-2 font-medium leading-[1.3] opacity-80 group-hover:opacity-100 transition-opacity">
            {resource.description}
          </p>
        </div>
        
        {/* Footer Section: Stats & Persistence */}
        <div className="pt-2.5 border-t border-white/[0.03] flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2.5">
            {/* Rating */}
            <div 
              className="flex items-center gap-1 group/stat"
              aria-label={`Rating: ${Number(resource.avgRating).toFixed(1)} stars out of ${resource.ratingCount} reviews`}
            >
              <div className="flex items-center gap-1 text-yellow-500/40">
                <Star className="w-2 h-2 fill-current" aria-hidden="true" />
                <span className="text-[10px] font-bold font-mono">
                  {Number(resource.avgRating).toFixed(1)}
                </span>
              </div>
              <span className="text-gray-800 text-[8px] font-mono font-bold">
                ({resource.ratingCount})
              </span>
            </div>

            {/* Views */}
            <div 
              className="flex items-center gap-1 text-gray-700 group/stat"
              aria-label={`${resource.views} views`}
            >
              <Eye className="w-2.5 h-2.5 text-gray-800" aria-hidden="true" />
              <span className="text-[10px] font-bold font-mono text-gray-700">
                {resource.views >= 1000 ? `${(resource.views / 1000).toFixed(1)}k` : resource.views}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 relative z-30">
             <BookmarkButton 
              resourceId={resource.id} 
              initialIsBookmarked={!!resource.isBookmarked} 
            />
            <div 
              className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-950 border border-gray-900 text-gray-700 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all"
              aria-hidden="true"
            >
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
