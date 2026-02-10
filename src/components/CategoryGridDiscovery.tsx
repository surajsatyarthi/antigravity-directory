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
    <section className="py-16 border-t border-white/[0.05]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3 uppercase tracking-[0.15em]">
            Shop by Category
          </h2>
          <p className="text-gray-400 text-sm font-bold tracking-widest uppercase">
            Discover premium tools & resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/browse?categories=${category.slug}`}
              className="group relative bg-[#0A0A0A] border border-white/10 rounded-xl p-6 hover:border-blue-500/50 hover:bg-[#0D0D0D] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] cursor-pointer"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-white uppercase tracking-wide">
                    {category.name}
                  </h3>
                  <span className="text-xs text-gray-500 font-mono">
                    {category.count}
                  </span>
                </div>
                
                <p className="text-sm text-gray-400 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider group-hover:text-blue-300 transition-colors">
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
