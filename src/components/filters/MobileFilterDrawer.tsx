'use client';

import { useState } from 'react';
import { FilterSidebar } from './FilterSidebar';
import { SlidersHorizontal, X } from 'lucide-react';
import { CategoryWithCount, Tag } from '@/types';

interface MobileFilterDrawerProps {
  categories: CategoryWithCount[];
  tags: Tag[];
}

export function MobileFilterDrawer({ categories, tags }: MobileFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center gap-2 px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-white/20 transition-all font-medium"
        aria-label="Open filters"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>Filters</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end isolate">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Drawer */}
          <div className="relative w-full max-w-[320px] bg-[#0A0A0A] h-full border-l border-white/10 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-bold text-white tracking-tight">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <FilterSidebar 
                categories={categories} 
                tags={tags} 
                className="w-full" // Override default width/sticky styles
              />
            </div>
            
            <div className="p-4 border-t border-white/10 bg-[#050505]">
                <button 
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider rounded text-sm hover:bg-gray-200 transition-colors"
                >
                    Show Results
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
