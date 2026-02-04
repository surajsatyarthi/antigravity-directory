'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { FILTERS } from '@/constants';
import { validateFilterParams } from '@/lib/validation';

/**
 * Robust filter persistence hook.
 * Uses direct window.location for restoration handshake to avoid Next.js hook delays.
 */
export function useFilterPersistence() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [isReady, setIsReady] = useState(false);
  const isInitialMount = useRef(true);
  const restorationActive = useRef(false);
  const lastSyncedState = useRef<string | null>(null);

  // Sync state with URL params
  const categoriesParam = searchParams.get('categories') || '';
  const tagsParam = searchParams.get('tags') || '';
  const badgesParam = searchParams.get('badges') || '';
  const qParam = searchParams.get('q') || '';
  const sortParam = searchParams.get('sort') || FILTERS.DEFAULT_SORT;
  const pricingParam = searchParams.get('pricing') || '';
  const groupParam = searchParams.get('group') || '';
  
  const hasUrlParams = categoriesParam !== '' || tagsParam !== '' || badgesParam !== '' || qParam !== '' || pricingParam !== '' || sortParam !== FILTERS.DEFAULT_SORT || groupParam !== '';

  // 1. Initial Restoration / Readiness Check
  useEffect(() => {
    if (!isInitialMount.current) return;
    isInitialMount.current = false;

    // If URL already has params, we are ready
    if (hasUrlParams) {
      setIsReady(true);
      return;
    }

    // Otherwise, try to restore from localStorage
    const saved = localStorage.getItem(FILTERS.STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const restorationParams = new URLSearchParams();
        if (parsed.categories?.length) restorationParams.set('categories', parsed.categories.join(','));
        if (parsed.tags?.length) restorationParams.set('tags', parsed.tags.join(','));
        if (parsed.badgeTypes?.length) restorationParams.set('badges', parsed.badgeTypes.join(','));
        if (parsed.search) restorationParams.set('q', parsed.search);
        if (parsed.sort) restorationParams.set('sort', parsed.sort);
        if (parsed.pricing) restorationParams.set('pricing', Array.isArray(parsed.pricing) ? parsed.pricing.join(',') : parsed.pricing);
        if (parsed.group) restorationParams.set('group', parsed.group);

        const validated = validateFilterParams(restorationParams);
        const finalParams = new URLSearchParams();
        if (validated.categories.length) finalParams.set('categories', validated.categories.join(','));
        if (validated.tags.length) finalParams.set('tags', validated.tags.join(','));
        if (validated.badgeTypes?.length) finalParams.set('badges', validated.badgeTypes.join(','));
        if (validated.search) finalParams.set('q', validated.search);
        if (validated.sort !== FILTERS.DEFAULT_SORT) finalParams.set('sort', validated.sort);
        if (validated.pricing && validated.pricing.length > 0) finalParams.set('pricing', validated.pricing.join(','));
        if (validated.group) finalParams.set('group', validated.group);

        const paramsString = finalParams.toString();
        if (paramsString) {
          const target = `${pathname}?${paramsString}`;
          restorationActive.current = true;
          router.replace(target);
          
          // Safety fallback: if URL doesn't change, we should still become ready
          setTimeout(() => {
            if (!isReady) setIsReady(true);
          }, 1000);
          return;
        }
      } catch (e) {}
    }
    
    setIsReady(true);
  }, []); 

  // 2. Handshake: Monitor window.location directly
  useEffect(() => {
    if (isReady) return;
    
    const checkRestoration = () => {
      if (restorationActive.current) {
        const hasParams = window.location.search.length > 1;
        if (hasParams) {
          restorationActive.current = false;
          setIsReady(true);
        }
      }
    };

    checkRestoration();
    const timer = setInterval(checkRestoration, 100);
    return () => clearInterval(timer);
  }, [searchParams, isReady]);

  // 3. Continuous Sync (URL -> Storage)
  useEffect(() => {
    if (!isReady) return;

    const filters = {
      categories: categoriesParam.split(',').filter(Boolean),
      tags: tagsParam.split(',').filter(Boolean),
      badgeTypes: badgesParam.split(',').filter(Boolean),
      search: qParam,
      sort: sortParam,
      pricing: pricingParam.split(',').filter(Boolean),
      group: groupParam,
    };

    const hasValues = filters.categories.length > 0 || filters.tags.length > 0 || filters.badgeTypes.length > 0 || filters.search !== '' || filters.pricing.length > 0 || filters.sort !== FILTERS.DEFAULT_SORT || filters.group !== '';
    const stateStr = JSON.stringify(filters);

    if (hasValues) {
      if (stateStr !== lastSyncedState.current) {
        localStorage.setItem(FILTERS.STORAGE_KEY, stateStr);
        lastSyncedState.current = stateStr;
      }
    } else if (searchParams.size === 0 && lastSyncedState.current !== null) {
      localStorage.removeItem(FILTERS.STORAGE_KEY);
      lastSyncedState.current = null;
    }
  }, [categoriesParam, tagsParam, qParam, sortParam, isReady, searchParams.size]);

  // 4. Tab Sync
  useEffect(() => {
    if (!isReady) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === FILTERS.STORAGE_KEY && e.newValue) {
        if (e.newValue === lastSyncedState.current) return;
        
        try {
          const parsed = JSON.parse(e.newValue);
          const newParams = new URLSearchParams();
          if (parsed.categories) newParams.set('categories', parsed.categories.join(','));
          if (parsed.tags) newParams.set('tags', parsed.tags.join(','));
          if (parsed.badgeTypes) newParams.set('badges', parsed.badgeTypes.join(','));
          if (parsed.search) newParams.set('q', parsed.search);
          if (parsed.sort) newParams.set('sort', parsed.sort);
          if (parsed.pricing) newParams.set('pricing', Array.isArray(parsed.pricing) ? parsed.pricing.join(',') : parsed.pricing);
          if (parsed.group) newParams.set('group', parsed.group);
          
          const target = `${pathname}?${newParams.toString()}`;
          router.push(target);
        } catch (e) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isReady, pathname, router]);
}
