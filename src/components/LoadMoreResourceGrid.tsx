'use client';

import { useState, useMemo } from 'react';
import { ResourceCard } from '@/components/ResourceCard';
import { SponsoredCard } from '@/components/SponsoredCard';
import { fetchResourcesAction, type FetchResourcesParams } from '@/app/actions/get-resources';
import { ResourceWithRelations } from '@/types/database';
import { Loader2 } from 'lucide-react';

interface LoadMoreResourceGridProps {
  initialResources: ResourceWithRelations[];
  initialTotalCount: number;
  initialFilters: {
    categories?: string[];
    tags?: string[];
    search?: string;
    sort?: string;
  };
}

export function LoadMoreResourceGrid({ 
  initialResources, 
  initialTotalCount,
  initialFilters 
}: LoadMoreResourceGridProps) {
  const [resources, setResources] = useState<ResourceWithRelations[]>(initialResources);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialResources.length < initialTotalCount);

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    
    const params: FetchResourcesParams = {
      page: nextPage,
      search: initialFilters.search,
      categories: initialFilters.categories?.join(','),
      tags: initialFilters.tags?.join(','),
      sort: initialFilters.sort
    };

    const result = await fetchResourcesAction(params);

    if (result.success && result.resources.length > 0) {
      setResources(prev => [...prev, ...result.resources]);
      setPage(nextPage);
      setHasMore(result.hasNextPage);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  };

  // ZIPPER LOGIC: Inject Ads with Rotation
  const mixedItems = useMemo(() => {
    const items: React.ReactNode[] = [];
    const AD_FREQUENCY = 8; // Ad every 8 resources
    
    const AD_CLIENTS = [
      { name: 'Vercel', color: 'bg-black' },
      { name: 'Supabase', color: 'bg-green-900' },
      { name: 'Neon', color: 'bg-green-500' }
    ];

    resources.forEach((resource, index) => {
      items.push(
        <ResourceCard 
          key={`res-${resource.id}`} 
          resource={resource as any} 
        />
      );

      if ((index + 1) % AD_FREQUENCY === 0) {
        const adSlotIndex = Math.floor((index + 1) / AD_FREQUENCY) - 1;
        const adClient = AD_CLIENTS[adSlotIndex % AD_CLIENTS.length];
        
        items.push(
            <SponsoredCard 
                key={`ad-${index}`} 
                position={adSlotIndex + 1}
            />
        );
      }
    });
    return items;
  }, [resources]);

  return (
    <div className="flex flex-col gap-3 pb-8">
      {/* The Mixed List (Resources + Ads) */}
      <div 
        id="resource-grid"
        data-testid="resource-grid"
        className="flex flex-col gap-3"
        role="region" 
        aria-label="Agent Marketplace Grid"
      >
        {mixedItems}
      </div>

      {/* Manual Load More Button */}
      <div className="flex items-center justify-center w-full py-12">
        {hasMore ? (
          <button
            onClick={loadMore}
            disabled={loading}
            className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 text-white font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>Load Next 20</span>
                <span className="text-gray-500 font-normal text-xs">
                  ({resources.length} of {totalCount})
                </span>
              </>
            )}
          </button>
        ) : (
          resources.length > 0 && (
            <p className="text-[10px] uppercase tracking-widest text-slate-600 py-4">
              All {totalCount} resources loaded
            </p>
          )
        )}
      </div>
    </div>
  );
}
