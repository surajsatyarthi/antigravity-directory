/**
 * @vitest-environment jsdom
 */
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InfiniteResourceGrid } from '../InfiniteResourceGrid';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock components
vi.mock('@/components/ResourceCard', () => ({
  ResourceCard: ({ resource }: { resource: any }) => <div data-testid="resource-card">{resource.title}</div>
}));

vi.mock('@/components/SponsoredCard', () => ({
  SponsoredCard: ({ position }: { position: number }) => <div data-testid="sponsored-card">Ad Slot #{position}</div>
}));

vi.mock('@/app/actions/get-resources', () => ({
  fetchResourcesAction: vi.fn(() => Promise.resolve({ resources: [], totalCount: 0 })),
}));

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn().mockImplementation(function() {
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };
});

// @ts-ignore
window.IntersectionObserver = mockIntersectionObserver;

describe('InfiniteResourceGrid Zipper Logic', () => {
    // Helper to generate mock resources
    const generateResources = (count: number) => 
        Array.from({ length: count }, (_, i) => ({
            id: `id-${i}`,
            title: `Resource ${i + 1}`,
            slug: `res-${i}`,
            description: 'desc',
            views: 100,
            categoryName: 'AI',
            avgRating: 5,
            ratingCount: 1,
            featured: false
        }));

    it('injects ads every 8 items', async () => {
        // Create 20 resources (Should have 2 ads: after #8 and #16)
        const resources = generateResources(20);

        render(
            <InfiniteResourceGrid
                initialResources={resources as any}
                initialTotalCount={100}
                initialFilters={{}}
            />
        );

        // Use findBy to await the DOM update if needed, though render is usually synchronous for initial items
        const resourceCards = await screen.findAllByTestId('resource-card');
        const adCards = await screen.findAllByTestId('sponsored-card');

        expect(resourceCards).toHaveLength(20);
        expect(adCards).toHaveLength(2); // 20 / 8 = 2 ads
        
        // Verify Ad Content
        expect(adCards[0]).toHaveTextContent('Ad Slot #1'); // Vercel
        expect(adCards[1]).toHaveTextContent('Ad Slot #2'); // Supabase
    });

    it('displays no ads for short lists', async () => {
        // 5 resources (No ads)
        const resources = generateResources(5);
        render(
            <InfiniteResourceGrid 
                initialResources={resources as any} 
                initialTotalCount={100} 
                initialFilters={{}} 
            />
        );

        const adCards = screen.queryAllByTestId('sponsored-card');
        expect(adCards).toHaveLength(0);
    });
});
