import Link from 'next/link';
import { ResourceCard } from './ResourceCard';
import type { ResourceWithRelations } from '@/types/database';

interface CategorySectionProps {
  name: string;
  slug: string;
  icon: string;
  resources: ResourceWithRelations[];
  totalCount: number;
}

export function CategorySection({ name, slug, icon, resources, totalCount }: CategorySectionProps) {
  if (!resources.length) return null;

  return (
    <section className="py-8 max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.05]">
      <div className="flex items-center justify-between mb-4">
        <Link
          href={`/${slug}`}
          className="text-white font-black text-lg uppercase tracking-tight flex items-center gap-2 hover:text-blue-400 transition-colors"
        >
          <span>{icon}</span>
          <span>{name}</span>
        </Link>
        <Link
          href={`/${slug}`}
          className="text-xs font-semibold text-gray-400 hover:text-white transition-colors tracking-wide uppercase"
        >
          View all {totalCount} →
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}
