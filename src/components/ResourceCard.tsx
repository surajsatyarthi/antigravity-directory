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
    <div className={`group relative flex flex-col bg-[#0A0A0A] border rounded-2xl overflow-hidden hover:border-white/40 hover:bg-white/[0.02] transition-all duration-500 shadow-2xl h-full ${
      isFeatured 
        ? 'border-yellow-500/50 shadow-yellow-500/10' 
        : 'border-gray-900'
    }`}>
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      
      <Link href={`/resources/${resource.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {resource.title}</span>
      </Link>
      
      <div className="p-6 flex flex-col h-full relative z-20">
        {/* Header Section: Integrations & Badges */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1.5 overflow-hidden">
            {resource.integrations && resource.integrations.length > 0 && (
              <div 
                className="flex items-center gap-1.5 mr-1"
                aria-label={`Built with ${resource.integrations.slice(0, MAX_INTEGRATION_ICONS).join(', ')}`}
              >
                {resource.integrations.slice(0, MAX_INTEGRATION_ICONS).map((integration, idx) => (
                  <div
                    key={idx}
                    className="w-6 h-6 rounded-md bg-gray-900 border border-gray-800 flex items-center justify-center shrink-0"
                    title={integration}
                  >
                    <Package className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                ))}
              </div>
            )}
            
            <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-500 uppercase tracking-wider whitespace-nowrap">
              {resource.categoryName || 'General'}
            </span>
          </div>

          {isFeatured && (
            <div className="shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/30">
              <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
            </div>
          )}
        </div>
        
        {/* Title & Description */}
        <div className="flex-1 mb-6">
          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 mb-2">
            {resource.title}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-3 font-medium leading-relaxed">
            {resource.description}
          </p>
        </div>
        
        {/* Footer Section: Stats & Persistence */}
        <div className="pt-4 border-t border-gray-900 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-4">
            {/* Rating */}
            <div className="flex items-center gap-1.5 group/stat">
              <div className="flex items-center gap-1 text-yellow-500/80">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-sm font-bold font-mono">
                  {Number(resource.avgRating).toFixed(1)}
                </span>
              </div>
              <span className="text-gray-600 text-[11px] font-mono">
                ({resource.ratingCount})
              </span>
            </div>

            {/* Views */}
            <div className="flex items-center gap-1.5 text-gray-500 group/stat">
              <Eye className="w-3.5 h-3.5" />
              <span className="text-sm font-bold font-mono text-gray-400">
                {resource.views >= 1000 ? `${(resource.views / 1000).toFixed(1)}k` : resource.views}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
             <BookmarkButton 
              resourceId={resource.id} 
              initialIsBookmarked={!!resource.isBookmarked} 
            />
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 border border-gray-800 text-gray-400 group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:text-white transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
