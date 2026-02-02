'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { ResourceCard } from '@/components/ResourceCard';
import { SponsoredCard } from '@/components/SponsoredCard';
import { fetchResourcesAction, type FetchResourcesParams } from '@/app/actions/get-resources';
import { ResourceWithRelations } from '@/types/database';
import { Loader2 } from 'lucide-react';

interface InfiniteResourceGridProps {
  initialResources: ResourceWithRelations[];
  initialTotalCount: number;
  initialFilters: {
    categories?: string[];
    tags?: string[];
    search?: string;
    sort?: string;
  };
}

export function InfiniteResourceGrid({ 
  initialResources, 
  initialTotalCount,
  initialFilters 
}: InfiniteResourceGridProps) {
  const [resources, setResources] = useState<ResourceWithRelations[]>(initialResources);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialResources.length < initialTotalCount);
  
  // Observer for infinite scroll
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, page]);

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    
    // Construct params from initialFilters (assuming filters don't change in this view context for now)
    // In a full implementation, we'd sync this with FilterContext
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
  // We memorize this so it doesn't recalculate on every render unless resources change
  const mixedItems = useMemo(() => {
    const items: React.ReactNode[] = [];
    const AD_FREQUENCY = 8; // Ad every 8 resources
    
    // Mock Ad Clients to Rotate
    const AD_CLIENTS = [
      { name: 'Vercel', color: 'bg-black' },
      { name: 'Supabase', color: 'bg-green-900' },
      { name: 'Neon', color: 'bg-green-500' }
    ];

    resources.forEach((resource, index) => {
      // 1. Add the Resource
      items.push(
        <ResourceCard 
          key={`res-${resource.id}`} 
          resource={resource as any} 
        />
      );

      // 2. Inject Ad after every 8th item (8, 16, 24...)
      // index is 0-based, so (index + 1) % 8 === 0
      if ((index + 1) % AD_FREQUENCY === 0) {
        const adSlotIndex = Math.floor((index + 1) / AD_FREQUENCY) - 1;
        const adClient = AD_CLIENTS[adSlotIndex % AD_CLIENTS.length]; // Rotation Logic
        
        items.push(
            <SponsoredCard 
                key={`ad-${index}`} 
                position={adSlotIndex + 1}
                // In real app, we would pass client data here: client={adClient}
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
        className="flex flex-col gap-3"
        role="region" 
        aria-label="Agent Marketplace Grid"
      >
        {mixedItems}
      </div>

      {/* Loading State / Trigger */}
      <div ref={observerTarget} className="h-20 flex items-center justify-center w-full">
        {loading && (
          <div className="flex flex-col items-center gap-2 text-slate-500 animate-pulse">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-[10px] uppercase tracking-widest">Loading more tools...</span>
          </div>
        )}
        {!hasMore && resources.length > 0 && (
          <p className="text-[10px] uppercase tracking-widest text-slate-600 py-8">
            End of results
          </p>
        )}
      </div>
    </div>
  );
}
