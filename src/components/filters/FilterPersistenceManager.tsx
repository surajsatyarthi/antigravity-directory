'use client';

import { useFilterPersistence } from '@/hooks/useFilterPersistence';

/**
 * Client component that manages filter persistence.
 * This is separated to keep the main Page as a server component.
 */
export function FilterPersistenceManager() {
  useFilterPersistence();
  return null; // This component doesn't render anything
}
