'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CategoryWithCount } from '@/types/database';

interface CategoryTabsProps {
  categories: CategoryWithCount[];
  activeCategories: string[];
}

export function CategoryTabs({ categories, activeCategories }: CategoryTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabClick = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (slug === null || slug === 'all') {
      params.delete('categories');
    } else {
      params.set('categories', slug);
    }
    
    // Reset page when changing categories
    params.delete('page');
    
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const isActive = (slug: string | null) => {
    if (slug === null || slug === 'all') {
      return activeCategories.length === 0;
    }
    return activeCategories.includes(slug);
  };

  const totalAllCount = categories.reduce((acc, cat) => acc + (Number(cat.count) || 0), 0);

  return (
    <div className="border-b border-white/[0.05] bg-black/80 backdrop-blur-md sticky top-14 z-40 w-full overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 -mb-px">
          {/* All Tab */}
          <button
            onClick={() => handleTabClick(null)}
            data-testid="filter-tab-all"
            className={cn(
              "px-4 py-2 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 rounded-t-md",
              isActive(null) 
                ? "text-white border-blue-500 bg-white/[0.03]" 
                : "text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/[0.01]"
            )}
          >
            All <span className="ml-1.5 text-gray-600 font-mono text-[9px]">{totalAllCount}</span>
          </button>

          {/* Category Tabs */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleTabClick(category.slug)}
              data-testid={`filter-tab-${category.slug}`}
              className={cn(
                "px-4 py-2 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 rounded-t-md",
                isActive(category.slug) 
                  ? "text-white border-blue-500 bg-white/[0.03]" 
                  : "text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/[0.01]"
              )}
            >
              {category.name} <span className="ml-1.5 text-gray-600 font-mono text-[9px]">{category.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
