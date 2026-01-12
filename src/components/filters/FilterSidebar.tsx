'use client';

import { useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  
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
    
    const target = `${pathname}?${params.toString()}`;
    console.log('[FilterSidebar] router.push (categories):', target);
    router.push(target);
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
    
    const target = `${pathname}?${params.toString()}`;
    console.log('[FilterSidebar] router.push (tags):', target);
    router.push(target);
  };
  
  return (
    <aside 
      className="w-[240px] sticky top-20 h-fit"
      role="complementary"
      aria-label="Filters"
    >
      <div className="bg-[#050505] border border-white/[0.05] rounded-lg p-4 transition-all">
        <h2 id="filters-heading" className="text-[10px] font-black text-white/50 mb-6 tracking-[0.3em] uppercase">Matrix Filters</h2>
        
        {/* AI Focus Areas (Shifting from center) */}
        <div className="mb-6">
           <span className="text-[9px] uppercase tracking-[0.2em] text-gray-700 font-bold block mb-3">Focus Domains</span>
           <div className="flex flex-col gap-1.5">
             {[
               { id: 'process', label: 'Flow', icon: '⚡' },
               { id: 'work', label: 'Work', icon: '💼' },
               { id: 'service', label: 'Tools', icon: '🛠️' }
             ].map((group) => {
               const isSelected = searchParams.get('group') === group.id;
               return (
                 <button
                   key={group.id}
                   onClick={() => {
                     const params = new URLSearchParams(searchParams);
                     if (isSelected) params.delete('group');
                     else params.set('group', group.id);
                     router.push(`?${params.toString()}`);
                   }}
                   className={`flex items-center justify-between px-3 py-2 rounded-md border text-[11px] font-bold transition-all ${
                     isSelected 
                       ? 'bg-blue-600/10 border-blue-500/30 text-blue-400' 
                       : 'bg-black/40 border-gray-900/50 text-gray-500 hover:border-gray-800 hover:text-gray-300'
                   }`}
                 >
                   <span>{group.label}</span>
                   <span className="opacity-30 text-[10px] grayscale">{group.icon}</span>
                 </button>
               );
             })}
           </div>
        </div>
        
        {/* Categories Filter (Function) */}
        <div className="mb-8">
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full text-left mb-3 text-white hover:text-blue-400 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-4 focus:ring-offset-black rounded-lg group"
            aria-expanded={expandedSections.categories}
            aria-controls="categories-panel"
          >
            <span className="text-[9px] uppercase tracking-[0.2em] text-gray-600 group-hover:text-blue-400">Function Matrix</span>
            {expandedSections.categories ? (
              <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
            )}
          </button>
          
          <div
            id="categories-panel"
            className={`space-y-1.5 transition-all duration-${ANIMATION.ACCORDION_DURATION} ${
              expandedSections.categories ? 'block' : 'hidden'
            }`}
            role="group"
            aria-labelledby="filters-heading"
          >
            {categories.map((category) => (
              <label
                key={category.slug}
                className="flex items-center gap-2.5 text-[11px] text-gray-500 hover:text-white cursor-pointer transition-colors group/label"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.slug)}
                    onChange={() => {
                      console.log('[FilterSidebar] Checkbox clicked:', category.slug);
                      handleCategoryChange(category.slug);
                    }}
                    className="peer w-4 h-4 rounded border-gray-900 bg-gray-950 text-blue-600 focus:ring-1 focus:ring-blue-500/50 focus:ring-offset-1 focus:ring-offset-black transition-all appearance-none border checked:bg-blue-600 checked:border-blue-500"
                    aria-label={`Filter by ${category.name}, ${category.count} items available`}
                    data-testid={`filter-checkbox-${category.slug}`}
                    disabled={category.count === 0}
                  />
                  <svg className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5 top-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className={`group-hover/label:text-blue-400 transition-colors ${category.count === 0 ? 'opacity-20 cursor-not-allowed' : ''}`}>
                  {category.name}
                </span>
                <span className="ml-auto text-[9px] font-mono font-bold text-gray-700 group-hover/label:text-blue-500/50 transition-colors">
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
              <span className="text-[9px] uppercase tracking-[0.2em] text-gray-600 group-hover:text-blue-400">Tag Fragments</span>
              {expandedSections.tags ? (
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
              )}
            </button>
            
            <div
              id="tags-panel"
              className={`space-y-1.5 transition-all duration-${ANIMATION.ACCORDION_DURATION} ${
                expandedSections.tags ? 'block' : 'hidden'
              }`}
              role="group"
            >
              {tags.map((tag) => (
                <label
                  key={tag.slug}
                  className="flex items-center gap-2.5 text-[11px] text-gray-500 hover:text-white cursor-pointer transition-colors group/label"
                >
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.slug)}
                      onChange={() => handleTagChange(tag.slug)}
                      className="peer w-4 h-4 rounded border-gray-900 bg-gray-950 text-blue-600 focus:ring-1 focus:ring-blue-500/50 focus:ring-offset-1 focus:ring-offset-black transition-all appearance-none border checked:bg-blue-600 checked:border-blue-500"
                      aria-label={`Filter by ${tag.name} tag`}
                      data-testid={`filter-checkbox-tag-${tag.slug}`}
                    />
                    <svg className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5 top-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="group-hover/label:text-blue-400 transition-colors">{tag.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
