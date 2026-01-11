'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { CategoryWithCount, Tag } from '@/types/database';
import { ANIMATION } from '@/constants';

interface FilterSidebarProps {
  categories: CategoryWithCount[];
  tags: Tag[];
}

export function FilterSidebar({ categories, tags }: FilterSidebarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Read current state from URL (single source of truth)
  const selectedCategories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
  const selectedTags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
  
  // Accordion state
  const [expandedSections, setExpandedSections] = useState({
    categories: true,  // Expanded by default
    tags: false,
  });
  
  const toggleSection = (section: 'categories' | 'tags') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  
  const handleCategoryChange = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams);
    
    // Toggle category
    const updated = selectedCategories.includes(categorySlug)
      ? selectedCategories.filter(c => c !== categorySlug)
      : [...selectedCategories, categorySlug];
    
    // Update URL
    if (updated.length > 0) {
      params.set('categories', updated.join(','));
    } else {
      params.delete('categories');
    }
    
    router.push(`?${params.toString()}`);
  };
  
  const handleTagChange = (tagSlug: string) => {
    const params = new URLSearchParams(searchParams);
    
    // Toggle tag
    const updated = selectedTags.includes(tagSlug)
      ? selectedTags.filter(t => t !== tagSlug)
      : [...selectedTags, tagSlug];
    
    // Update URL
    if (updated.length > 0) {
      params.set('tags', updated.join(','));
    } else {
      params.delete('tags');
    }
    
    router.push(`?${params.toString()}`);
  };
  
  return (
    <aside 
      className="w-[280px] lg:w-[300px] sticky top-24 h-fit"
      role="complementary"
      aria-label="Filters"
    >
      <div className="bg-gray-950 border border-gray-900 rounded-3xl p-6 shadow-xl backdrop-blur-sm bg-opacity-80">
        <h2 id="filters-heading" className="text-xl font-bold text-white mb-6 tracking-tight">Filters</h2>
        
        {/* Categories Filter (Function) */}
        <div className="mb-8">
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full text-left mb-3 text-white hover:text-blue-400 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-4 focus:ring-offset-black rounded-lg group"
            aria-expanded={expandedSections.categories}
            aria-controls="categories-panel"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-400 group-hover:text-blue-400">Function</span>
            {expandedSections.categories ? (
              <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
            )}
          </button>
          
          <div
            id="categories-panel"
            className={`space-y-3 transition-all duration-${ANIMATION.ACCORDION_DURATION} ${
              expandedSections.categories ? 'block' : 'hidden'
            }`}
            role="group"
            aria-labelledby="filters-heading"
          >
            {categories.map((category) => (
              <label
                key={category.slug}
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white cursor-pointer transition-colors group/label"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.slug)}
                    onChange={() => handleCategoryChange(category.slug)}
                    className="peer w-5 h-5 rounded-md border-gray-800 bg-gray-900/50 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-all appearance-none border checked:bg-blue-600 checked:border-blue-500"
                    aria-label={`Filter by ${category.name}, ${category.count} items available`}
                    data-testid={`filter-checkbox-${category.slug}`}
                    disabled={category.count === 0}
                  />
                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-1 top-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className={`font-medium group-hover/label:text-blue-400 transition-colors ${category.count === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}>
                  {category.name}
                </span>
                <span className="ml-auto text-[10px] font-mono font-bold text-gray-600 group-hover/label:text-blue-500/50 transition-colors">
                  {category.count}
                </span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Tags Filter */}
        {tags.length > 0 && (
          <div>
            <button
              onClick={() => toggleSection('tags')}
              className="flex items-center justify-between w-full text-left mb-3 text-white hover:text-blue-400 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-4 focus:ring-offset-black rounded-lg group"
              aria-expanded={expandedSections.tags}
              aria-controls="tags-panel"
            >
              <span className="text-sm uppercase tracking-[0.2em] text-gray-400 group-hover:text-blue-400">Tags</span>
              {expandedSections.tags ? (
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
              )}
            </button>
            
            <div
              id="tags-panel"
              className={`space-y-3 transition-all duration-${ANIMATION.ACCORDION_DURATION} ${
                expandedSections.tags ? 'block' : 'hidden'
              }`}
              role="group"
            >
              {tags.map((tag) => (
                <label
                  key={tag.slug}
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white cursor-pointer transition-colors group/label"
                >
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.slug)}
                      onChange={() => handleTagChange(tag.slug)}
                      className="peer w-5 h-5 rounded-md border-gray-800 bg-gray-900/50 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-all appearance-none border checked:bg-blue-600 checked:border-blue-500"
                      aria-label={`Filter by ${tag.name} tag`}
                      data-testid={`filter-checkbox-tag-${tag.slug}`}
                    />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-1 top-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="font-medium group-hover/label:text-blue-400 transition-colors">{tag.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
