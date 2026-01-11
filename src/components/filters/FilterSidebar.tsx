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
      className="w-[280px] sticky top-24 h-fit"
      role="complementary"
      aria-label="Filters"
    >
      <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-white mb-4">Filters</h2>
        
        {/* Categories Filter */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full text-left mb-2 text-white hover:text-gray-300 transition-colors"
            aria-expanded={expandedSections.categories}
            aria-controls="categories-panel"
          >
            <span className="font-medium">Function</span>
            {expandedSections.categories ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          
          <div
            id="categories-panel"
            className={`space-y-2 transition-all duration-${ANIMATION.ACCORDION_DURATION} ${
              expandedSections.categories ? 'block' : 'hidden'
            }`}
            role="group"
            aria-labelledby="categories-heading"
          >
            {categories.map((category) => (
              <label
                key={category.slug}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.slug)}
                  onChange={() => handleCategoryChange(category.slug)}
                  className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950"
                  aria-label={`Filter by ${category.name} category, ${category.count} resources`}
                  data-testid={`filter-checkbox-${category.slug}`}
                  disabled={category.count === 0}
                />
                <span className={category.count === 0 ? 'opacity-50' : ''}>
                  {category.name} ({category.count})
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
              className="flex items-center justify-between w-full text-left mb-2 text-white hover:text-gray-300 transition-colors"
              aria-expanded={expandedSections.tags}
              aria-controls="tags-panel"
            >
              <span className="font-medium">Tags</span>
              {expandedSections.tags ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            
            <div
              id="tags-panel"
              className={`space-y-2 transition-all duration-${ANIMATION.ACCORDION_DURATION} ${
                expandedSections.tags ? 'block' : 'hidden'
              }`}
              role="group"
              aria-labelledby="tags-heading"
            >
              {tags.map((tag) => (
                <label
                  key={tag.slug}
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.slug)}
                    onChange={() => handleTagChange(tag.slug)}
                    className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950"
                    aria-label={`Filter by ${tag.name} tag`}
                    data-testid={`filter-checkbox-tag-${tag.slug}`}
                  />
                  <span>{tag.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
