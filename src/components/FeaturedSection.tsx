'use client';

import Link from 'next/link';
import { ResourceCard } from './ResourceCard';
import { ResourceWithRelations } from '@/types/database';
import { ArrowRight } from 'lucide-react';

interface FeaturedSectionProps {
  title: string;
  resources: ResourceWithRelations[];
  href: string;
  categoryName?: string;
}

export function FeaturedSection({ title, resources, href, categoryName }: FeaturedSectionProps) {
  if (resources.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <h2 className="text-[17px] font-black tracking-tight text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            {title}
          </h2>
          {categoryName && (
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 ml-3.5">
              Curated Selection
            </span>
          )}
        </div>
        <Link 
          href={href}
          className="group flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
        >
          View all {categoryName || 'Resources'}
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}
