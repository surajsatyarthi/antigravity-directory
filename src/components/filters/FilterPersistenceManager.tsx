'use client';

import { useFilterPersistence } from '@/hooks/useFilterPersistence';

/**
 * Client component that manages filter persistence.
 * This is separated to keep the main Page as a server component.
 */
export function FilterPersistenceManager() {
  console.log('[FilterPersistenceManager] Mounted');
  useFilterPersistence();
  return null;
}
