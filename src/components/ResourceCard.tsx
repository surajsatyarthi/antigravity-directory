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
    isBookmarked?: boolean;
    integrations?: string[] | null;
  };
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const isFeatured = resource.featured;
  
  return (
    <div className={`group relative flex flex-col bg-[#0A0A0A] border rounded-3xl overflow-hidden hover:border-blue-500/50 hover:bg-white/[0.02] transition-all duration-500 shadow-2xl h-full focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:ring-offset-4 focus-within:ring-offset-black ${
      isFeatured 
        ? 'border-yellow-500/30 shadow-yellow-500/5' 
        : 'border-white/[0.03]'
    }`}>
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
      
      <Link href={`/t/${resource.slug}`} className="absolute inset-0 z-10 outline-none">
        <span className="sr-only">View details for {resource.title}: {resource.description}</span>
      </Link>
      
      <div className="p-5 flex flex-col h-full relative z-20">
        {/* Header Section: Integrations & Badges */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1.5 overflow-hidden">
            {resource.integrations && resource.integrations.length > 0 && (
              <div 
                className="flex items-center gap-1 mr-1"
                aria-label={`Built with: ${resource.integrations.join(', ')}`}
              >
                {resource.integrations.slice(0, MAX_INTEGRATION_ICONS).map((integration, idx) => (
                  <div
                    key={idx}
                    className="w-6 h-6 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center shrink-0 shadow-sm"
                    title={integration}
                  >
                    <Package className="w-3 h-3 text-gray-400 group-hover:text-blue-400 transition-colors" aria-hidden="true" />
                  </div>
                ))}
              </div>
            )}
            
            <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[9px] font-black text-blue-500 uppercase tracking-widest whitespace-nowrap">
              {resource.categoryName || 'General'}
            </span>
          </div>

          {isFeatured && (
            <div 
              className="shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/30"
              aria-label="Featured Resource"
            >
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" aria-hidden="true" />
            </div>
          )}
        </div>
        
        {/* Title & Description */}
        <div className="flex-1 mb-6">
          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 mb-2 tracking-tight">
            {resource.title}
          </h3>
          <p className="text-[13px] text-gray-400 line-clamp-3 font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
            {resource.description}
          </p>
        </div>
        
        {/* Footer Section: Stats & Persistence */}
        <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between mt-auto">
          <div className="flex items-center gap-4">
            {/* Rating */}
            <div 
              className="flex items-center gap-1 group/stat"
              aria-label={`Rating: ${Number(resource.avgRating).toFixed(1)} stars out of ${resource.ratingCount} reviews`}
            >
              <div className="flex items-center gap-1 text-yellow-500/90">
                <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                <span className="text-xs font-bold font-mono">
                  {Number(resource.avgRating).toFixed(1)}
                </span>
              </div>
              <span className="text-gray-600 text-[10px] font-mono font-bold">
                ({resource.ratingCount})
              </span>
            </div>

            {/* Views */}
            <div 
              className="flex items-center gap-1 text-gray-500 group/stat"
              aria-label={`${resource.views} views`}
            >
              <Eye className="w-3.5 h-3.5 text-gray-600" aria-hidden="true" />
              <span className="text-xs font-bold font-mono text-gray-400">
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
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-950 border border-gray-800 text-gray-500 group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:text-white transition-all shadow-lg"
              aria-hidden="true"
            >
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
