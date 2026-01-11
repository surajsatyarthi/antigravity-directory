'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { FILTERS, CATEGORY_GROUPS, CATEGORY_GROUP_LABELS } from '@/constants';

interface TopFilterBarProps {
  totalCount: number;
}

export function TopFilterBar({ totalCount }: TopFilterBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
  const currentSort = searchParams.get('sort') || FILTERS.DEFAULT_SORT;
  
  // Sync search input with URL
  useEffect(() => {
    setSearchInput(searchParams.get('q') || '');
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
  
  return (
    <div className="mb-6 space-y-4">
      {/* Category Pills */}
      <div 
        role="radiogroup" 
        aria-label="Filter by category group"
        className="flex gap-2 flex-wrap"
      >
        {Object.entries(CATEGORY_GROUP_LABELS).map(([key, label]) => {
          const isSelected = searchParams.get('group') === CATEGORY_GROUPS[key as keyof typeof CATEGORY_GROUPS];
          
          return (
            <button
              key={key}
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleCategoryGroupChange(CATEGORY_GROUPS[key as keyof typeof CATEGORY_GROUPS])}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white border border-gray-800'
              }`}
              data-testid={`category-pill-${key}`}
            >
              {label}
            </button>
          );
        })}
      </div>
      
      {/* Search and Sort Bar */}
      <div className="flex gap-4 items-center">
        {/* Search Input */}
        <div className="flex-1 relative" role="search">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="search"
            role="searchbox"
            placeholder="Search resources..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-10 pr-10 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search resources by title or description"
            data-testid="search-input"
          />
          {searchInput && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              aria-label="Clear search"
              data-testid="clear-search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <select
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            aria-label="Sort resources by"
            data-testid="sort-dropdown"
          >
            {FILTERS.SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Results Counter */}
          <div 
            className="text-sm text-gray-400 whitespace-nowrap"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {totalCount} {totalCount === 1 ? 'result' : 'results'}
          </div>
        </div>
      </div>
    </div>
  );
}
