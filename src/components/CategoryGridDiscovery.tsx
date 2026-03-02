'use client';

import Link from 'next/link';

const categories = [
  {
    name: 'MCPs',
    slug: 'mcp-servers',
    icon: '🤖',
    description: 'AI tools & integrations',
    count: '1,200+'
  },
  {
    name: 'Rules',
    slug: 'rules',
    icon: '📋',
    description: 'Custom AI behaviors',
    count: '450+'
  },
  {
    name: 'Workflows',
    slug: 'workflows',
    icon: '⚙️',
    description: 'Automation templates',
    count: '380+'
  },
  {
    name: 'Skills',
    slug: 'skills',
    icon: '✨',
    description: 'Custom capabilities',
    count: '200+'
  },
  {
    name: 'Prompts',
    slug: 'prompts',
    icon: '💬',
    description: 'Pre-written prompts',
    count: '600+'
  },
  {
    name: 'Patterns',
    slug: 'patterns',
    icon: '🎨',
    description: 'Design patterns',
    count: '180+'
  },
  {
    name: 'Troubleshooting',
    slug: 'troubleshooting',
    icon: '🔧',
    description: 'How-to guides',
    count: '300+'
  },
  {
    name: 'Communities',
    slug: 'communities',
    icon: '👥',
    description: 'Join groups',
    count: '50+'
  }
];

export function CategoryGridDiscovery() {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Browse by Category
          </h2>
          <p className="text-slate-500 text-sm">
            Discover curated tools and resources for every workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/browse?categories=${category.slug}`}
              className="group relative bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {category.icon}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">
                    {category.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {category.count}
                  </span>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                  Browse →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
