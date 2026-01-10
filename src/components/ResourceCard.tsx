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
    <div className="group relative flex flex-col bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
      <Link href={`/resources/${resource.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {resource.title}</span>
      </Link>
      
      <div className="p-5 flex-1 flex flex-col">
        {/* Category & Stats */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
            {resource.categoryName || 'General'}
          </span>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {resource.views}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4 flex-1">
          {resource.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(resource.avgRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
              {resource.avgRating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-400">({resource.ratingCount})</span>
          </div>
          
          <div className="z-20">
            <div className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
