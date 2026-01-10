import Link from 'next/link';
import { Star, Eye, ExternalLink, ArrowRight } from 'lucide-react';

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
  };
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const isFeatured = resource.id.includes('featured') || parseInt(resource.id) < 10;
  
  return (
    <div className={`group relative flex flex-col md:flex-row bg-[#0A0A0A] border rounded-2xl overflow-hidden hover:border-white/40 transition-all duration-500 shadow-2xl ${
      isFeatured 
        ? 'border-yellow-500/50 shadow-yellow-500/20' 
        : 'border-gray-900'
    }`}>
      <Link href={`/resources/${resource.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {resource.title}</span>
      </Link>
      
      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center">
        {/* Title & Description Column */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-blue-500 font-mono uppercase tracking-widest">
              {resource.categoryName || 'General'}
            </span>
            {isFeatured && (
              <span className="px-2 py-0.5 rounded bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 text-[10px] font-bold text-yellow-500 font-mono uppercase tracking-widest animate-pulse flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-500" />
                Featured
              </span>
            )}
            <div className="h-px flex-1 bg-gray-900" />
          </div>
          
          <h3 className="text-xl font-extrabold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors truncate">
            {resource.title}
          </h3>
          
          <p className="text-sm text-gray-400 line-clamp-2 font-medium leading-relaxed max-w-2xl">
            {resource.description}
          </p>
        </div>

        {/* Vertical Divider (Desktop) */}
        <div className="hidden md:block w-px h-12 bg-gray-900" />

        {/* Stats & Actions Column */}
        <div className="flex items-center justify-between md:justify-end gap-10 shrink-0">
          {/* Rating */}
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[10px] text-gray-600 font-mono uppercase tracking-tighter mb-1">Rating</span>
            <div className="flex items-center gap-1.5 font-mono">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white font-bold text-sm">
                {resource.avgRating.toFixed(1)}
              </span>
              <span className="text-gray-700 text-[10px]">
                ({resource.ratingCount})
              </span>
            </div>
          </div>

          {/* Views */}
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[10px] text-gray-600 font-mono uppercase tracking-tighter mb-1">Popularity</span>
            <div className="flex items-center gap-1.5 font-mono text-gray-300">
              <Eye className="w-3.5 h-3.5" />
              <span className="text-sm font-bold">{resource.views.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Icon */}
          <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-gray-900 group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
