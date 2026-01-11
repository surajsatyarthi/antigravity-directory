'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { FILTERS } from '@/constants';

/**
 * Hook to persist filters in localStorage and sync with URL.
 * Follows "URL First" priority: 
 * - If URL has params, they override localStorage.
 * - If URL is empty, restores from localStorage.
 */
export function useFilterPersistence() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  // Sync LOCAL STORAGE -> URL on Mount
  useEffect(() => {
    if (!isInitialMount.current) return;
    isInitialMount.current = false;

    // Check if URL is "Clean" (no relevant filter params)
    const hasUrlParams = 
      searchParams.has('categories') || 
      searchParams.has('tags') || 
      searchParams.has('q') || 
      searchParams.has('sort');

    if (!hasUrlParams) {
      try {
        const saved = localStorage.getItem(FILTERS.LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          const params = new URLSearchParams();

          if (parsed.categories?.length) params.set('categories', parsed.categories.join(','));
          if (parsed.tags?.length) params.set('tags', parsed.tags.join(','));
          if (parsed.search) params.set('q', parsed.search);
          if (parsed.sort && parsed.sort !== FILTERS.DEFAULT_SORT) params.set('sort', parsed.sort);

          if (params.toString()) {
            router.replace(`${pathname}?${params.toString()}`);
          }
        }
      } catch (e) {
        console.error('Failed to restore filters from localStorage:', e);
        localStorage.removeItem(FILTERS.LOCAL_STORAGE_KEY);
      }
    }
  }, [pathname, router, searchParams]);

  // Sync URL -> LOCAL STORAGE on Change
  useEffect(() => {
    const filters = {
      categories: searchParams.get('categories')?.split(',').filter(Boolean) || [],
      tags: searchParams.get('tags')?.split(',').filter(Boolean) || [],
      search: searchParams.get('q') || '',
      sort: searchParams.get('sort') || FILTERS.DEFAULT_SORT,
    };

    // Only save if there is actually state to save
    if (filters.categories.length || filters.tags.length || filters.search || filters.sort !== FILTERS.DEFAULT_SORT) {
      localStorage.setItem(FILTERS.LOCAL_STORAGE_KEY, JSON.stringify(filters));
    }
  }, [searchParams]);

  // Cross-Tab Sync
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === FILTERS.LOCAL_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          const params = new URLSearchParams(searchParams);
          
          // Update URL to match new storage values from other tab
          if (parsed.categories) params.set('categories', parsed.categories.join(','));
          if (parsed.tags) params.set('tags', parsed.tags.join(','));
          if (parsed.search) params.set('q', parsed.search);
          if (parsed.sort) params.set('sort', parsed.sort);

          router.replace(`${pathname}?${params.toString()}`);
        } catch (e) {
          console.error('Storage sync error:', e);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [pathname, router, searchParams]);
}
