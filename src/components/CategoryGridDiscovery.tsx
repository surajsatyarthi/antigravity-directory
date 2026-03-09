'use client';

import Link from 'next/link';

const categories = [
  {
    name: 'MCP Servers',
    slug: 'mcp-servers',
    icon: '🤖',
    description: 'Tool integrations & APIs'
  },
  {
    name: 'Skills',
    slug: 'skills',
    icon: '✨',
    description: 'Agent capabilities'
  },
  {
    name: 'Rules',
    slug: 'rules',
    icon: '📋',
    description: 'Custom AI behaviors'
  },
  {
    name: 'Prompts',
    slug: 'prompts',
    icon: '💬',
    description: 'System prompts & instructions'
  },
  {
    name: 'Agents',
    slug: 'agents',
    icon: '🧠',
    description: 'Pre-configured agentic setups'
  },
  {
    name: 'Workflows',
    slug: 'workflows',
    icon: '⚙️',
    description: 'Automation templates'
  },
  {
    name: 'Boilerplates',
    slug: 'boilerplates',
    icon: '🏗️',
    description: 'Project starter templates'
  },
  {
    name: 'Troubleshooting',
    slug: 'troubleshooting',
    icon: '🔧',
    description: 'Errors, fixes & how-to guides'
  },
  {
    name: 'Tutorials',
    slug: 'tutorials',
    icon: '🎓',
    description: 'Step-by-step learning guides'
  },
  {
    name: 'Cheatsheets',
    slug: 'cheatsheets',
    icon: '📄',
    description: 'Quick reference cards'
  }
];

export function CategoryGridDiscovery() {
  return (
    <section className="py-16 border-t border-white/[0.05]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3 uppercase tracking-[0.15em]">
            Browse by Category
          </h2>
          <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">
            10 categories · 3,100+ free resources
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="group relative bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-white/20 transition-all duration-200 cursor-pointer"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                {category.icon}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {category.name}
                  </h3>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-white/[0.06]">
                <span className="text-xs font-semibold text-blue-400 group-hover:text-blue-700 transition-colors">
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
