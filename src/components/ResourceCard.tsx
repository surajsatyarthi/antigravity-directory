import Link from 'next/link';
import { Star, Eye, ExternalLink } from 'lucide-react';

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
  return (
    <div className="group relative flex flex-col bg-black border border-gray-800 rounded-xl overflow-hidden hover:border-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.01)] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
      <Link href={`/resources/${resource.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {resource.title}</span>
      </Link>
      
      <div className="p-5 flex-1 flex flex-col">
        {/* Category & Stats */}
        <div className="flex items-center justify-between mb-3 font-mono text-[10px] uppercase tracking-widest">
          <span className="text-blue-500 font-bold">
            {resource.categoryName || 'General'}
          </span>
          <div className="flex items-center gap-3 text-gray-500">
            <div className="flex items-center gap-1 group-hover:text-gray-300 transition-colors">
              <Eye className="w-3 h-3" />
              {resource.views.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1 font-medium leading-relaxed">
          {resource.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-900 mt-auto">
          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-white text-white animate-shimmer" />
              <span className="text-white font-bold">
                {resource.avgRating.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-600">
              ({resource.ratingCount})
            </span>
          </div>
          
          <div className="z-20">
            <div className="p-1.5 rounded-lg text-gray-600 group-hover:text-white transition-all">
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
