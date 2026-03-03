'use client';

import Link from 'next/link';

const categories = [
  {
    name: 'MCP Servers',
    slug: 'mcp-servers',
    icon: '🤖',
    description: 'Tool integrations & APIs',
    count: '1,200+'
  },
  {
    name: 'Skills',
    slug: 'skills',
    icon: '✨',
    description: 'Agent capabilities',
    count: '968+'
  },
  {
    name: 'Rules',
    slug: 'rules',
    icon: '📋',
    description: 'Custom AI behaviors',
    count: '450+'
  },
  {
    name: 'Prompts',
    slug: 'prompts',
    icon: '💬',
    description: 'System prompts & instructions',
    count: '600+'
  },
  {
    name: 'Agents',
    slug: 'agents',
    icon: '🧠',
    description: 'Pre-configured agentic setups',
    count: '150+'
  },
  {
    name: 'Workflows',
    slug: 'workflows',
    icon: '⚙️',
    description: 'Automation templates',
    count: '380+'
  },
  {
    name: 'Boilerplates',
    slug: 'boilerplates',
    icon: '🏗️',
    description: 'Project starter templates',
    count: '200+'
  },
  {
    name: 'Troubleshooting',
    slug: 'troubleshooting',
    icon: '🔧',
    description: 'Errors, fixes & how-to guides',
    count: '300+'
  },
  {
    name: 'Tutorials',
    slug: 'tutorials',
    icon: '🎓',
    description: 'Step-by-step learning guides',
    count: '180+'
  },
  {
    name: 'Cheatsheets',
    slug: 'cheatsheets',
    icon: '📄',
    description: 'Quick reference cards',
    count: '120+'
  }
];

export function CategoryGridDiscovery() {
  return (
    <section className="py-16 border-t border-slate-200">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 uppercase tracking-[0.15em]">
            Shop by Category
          </h2>
          <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">
            Discover premium tools & resources
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/browse?categories=${category.slug}`}
              className="group relative bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                {category.icon}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {category.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {category.count}
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100">
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
