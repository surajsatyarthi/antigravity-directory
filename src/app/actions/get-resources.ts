'use server';

import { getFilteredResources, validateCategorySlugs } from '@/lib/queries';
import { validateFilterParams } from '@/lib/validation';

export type FetchResourcesParams = {
  page: number;
  search?: string;
  categories?: string;
  tags?: string;
  sort?: string;
};

export async function fetchResourcesAction(params: FetchResourcesParams) {
  try {
    // 1. Validate Filters
    const urlParams = new URLSearchParams();
    if (params.search) urlParams.set('q', params.search);
    if (params.categories) urlParams.set('categories', params.categories);
    if (params.tags) urlParams.set('tags', params.tags);
    if (params.sort) urlParams.set('sort', params.sort);
    
    const filters = validateFilterParams(urlParams);
    
    // 2. Validate Slugs
    const validCategorySlugs = await validateCategorySlugs(filters.categories);
    const cleanedFilters = { ...filters, categories: validCategorySlugs };

    // 3. Fetch Data (Weighted Interleave Strategy)
    const PAGE_SIZE = 20;
    const SPONSORED_RATIO = 3; // 3 Sponsored items per page
    const ORGANIC_RATIO = 17;

    // A. Fetch Sponsored (Boosted) Items
    const { resources: sponsoredResults } = await getFilteredResources(
      { ...cleanedFilters, isSponsored: true }, 
      params.page, 
      SPONSORED_RATIO
    );

    // B. Fetch Organic Items
    const { resources: organicResults, totalCount: totalOrganic } = await getFilteredResources(
      { ...cleanedFilters, isSponsored: false },
      params.page,
      ORGANIC_RATIO
    );

    // C. Interleave Logic (Amazon-style: Top Slot + Distributed)
    const interleavedResources = [];
    const sponsoredQueue = [...sponsoredResults];
    const organicQueue = [...organicResults];

    // 1. Prime Slot (Top Visibility) - Take 1 Sponsored item first
    if (sponsoredQueue.length > 0) {
        interleavedResources.push(sponsoredQueue.shift()!);
    }

    // 2. Standard Distribution (1 Sponsored every ~6 Organic)
    while (organicQueue.length > 0) {
        // Take up to 6 organics
        interleavedResources.push(...organicQueue.splice(0, 6));
        
        // Take 1 sponsored
        if (sponsoredQueue.length > 0) {
            interleavedResources.push(sponsoredQueue.shift()!);
        }
    }

    // 3. Append any remaining (rare case)
    if (sponsoredQueue.length > 0) {
        interleavedResources.push(...sponsoredQueue);
    }

    // 4. Calculate total count (Approximation for simplicity, or sum of both queries)
    // To be perfectly accurate for pagination, we need total count of both.
    // But since we are paginating separately, it gets complex.
    // Simplified: Total Count is largely driven by organic.
    // For infinite scroll to work, we just need to know if we should fetch more.
    // If we got full page worth of items, we probably have more.
    const hasNextPage = organicResults.length === ORGANIC_RATIO || sponsoredResults.length === SPONSORED_RATIO;

    return {
      success: true,
      resources: interleavedResources,
      totalCount: totalOrganic, // Approximate for UI
      hasNextPage,
      page: params.page
    };
  } catch (error) {
    console.error('Fetch Resources Action Error:', error);
    return {
      success: false,
      error: 'Failed to fetch resources',
      resources: [],
      totalCount: 0,
      hasNextPage: false,
      page: params.page
    };
  }
}
