'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { FILTERS, CATEGORY_GROUPS, CATEGORY_GROUP_LABELS } from '@/constants';
import { MobileFilterDrawer } from './MobileFilterDrawer';
import { CategoryWithCount, Tag } from '@/types/database';

interface TopFilterBarProps {
  totalCount: number;
  categories: CategoryWithCount[];
  tags: Tag[];
}

export function TopFilterBar({ totalCount, categories, tags }: TopFilterBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
  const currentSort = searchParams.get('sort') || FILTERS.DEFAULT_SORT;
  
  // Sync search input with URL
  useEffect(() => {
    const q = searchParams.get('q') || '';
    console.log('[TopFilterBar] URL search param changed:', q);
    setSearchInput(q);
  }, [searchParams]);
  
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    
    if (searchInput.trim()) {
      params.set('q', searchInput.trim());
    } else {
      params.delete('q');
    }
    
    router.push(`?${params.toString()}`);
  };
  
  const handleClearSearch = () => {
    setSearchInput('');
    const params = new URLSearchParams(searchParams);
    params.delete('q');
    router.push(`?${params.toString()}`);
  };
  
  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (sort === FILTERS.DEFAULT_SORT) {
      params.delete('sort');
    } else {
      params.set('sort', sort);
    }
    
    router.push(`?${params.toString()}`);
  };
  
  const handleCategoryGroupChange = (group: string) => {
    const params = new URLSearchParams(searchParams);
    
    // For now, just set a group filter
    // This will be enhanced when we have actual category groupings
    params.set('group', group);
    
    router.push(`?${params.toString()}`);
  };
  
  const activeCount = 
    (searchParams.get('categories')?.split(',').filter(Boolean).length || 0) + 
    (searchParams.get('tags')?.split(',').filter(Boolean).length || 0) +
    (searchParams.get('badges')?.split(',').filter(Boolean).length || 0) +
    (searchParams.get('pricing') ? 1 : 0) +
    (searchParams.get('group') ? 1 : 0);

  return (
    <div className="mb-6 flex items-center justify-between">
      {/* Results Counter - Live Region */}
      <div
        className="px-3 py-1.5 bg-blue-500/5 border border-blue-500/10 rounded text-xs font-black font-mono text-blue-500/80 uppercase tracking-widest"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {totalCount} {totalCount === 1 ? 'RESOURCE' : 'RESOURCES'}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2">
          <label htmlFor="sort-dropdown-desktop" className="text-[10px] font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">Sort By:</label>
          <select
            id="sort-dropdown-desktop"
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-3 py-1.5 bg-[#050505] border border-white/[0.05] rounded text-white/80 focus:outline-none focus:border-blue-500/30 cursor-pointer text-[11px] font-bold hover:border-white/10 transition-colors appearance-none min-w-[140px]"
          >
            {FILTERS.SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <MobileFilterDrawer categories={categories} tags={tags} activeCount={activeCount} />
          
          <label htmlFor="sort-dropdown" className="text-xs font-black text-gray-400 uppercase tracking-widest hidden sm:inline">Sort Mode:</label>
          <select
            id="sort-dropdown"
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-3 py-2 bg-[#050505] border border-white/[0.05] rounded text-white/80 focus:outline-none focus:border-blue-500/30 cursor-pointer text-sm font-bold hover:border-white/10 transition-colors appearance-none"
            aria-label="Sort resources by"
            data-testid="sort-dropdown"
          >
            {FILTERS.SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
