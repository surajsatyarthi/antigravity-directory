'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';

interface Tool {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  price: number;
  rating: number;
  salesCount: number;
  creatorName: string;
}

const CATEGORIES = [
  { label: 'MCPs', slug: 'mcp-servers' },
  { label: 'Rules', slug: 'rules' },
  { label: 'Workflows', slug: 'workflows' },
  { label: 'Skills', slug: 'skills' },
];

export function CategoryShowcase() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].slug);
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, we'd fetch from an API route or pass from server component
    // For now, using mock data that matches the expected structure
    setIsLoading(true);
    
    // Simulate fetch
    const mockTools: Record<string, Tool[]> = {
      'mcp-servers': [
        { id: '1', title: 'Database MCP', slug: 'db-mcp', description: 'Query your DB directly', thumbnail: null, price: 49, rating: 5, salesCount: 87, creatorName: 'John' },
        { id: '2', title: 'Gmail Connector', slug: 'gmail-mcp', description: 'Manage emails in IDE', thumbnail: null, price: 29, rating: 4.8, salesCount: 156, creatorName: 'Sarah' },
        { id: '3', title: 'Slack MCP', slug: 'slack-mcp', description: 'Chat without leaving code', thumbnail: null, price: 19, rating: 4.5, salesCount: 42, creatorName: 'Alex' },
      ],
      'rules': [
        { id: '4', title: 'Clean Code Rules', slug: 'clean-rules', description: 'Enforce SOLID patterns', thumbnail: null, price: 15, rating: 5, salesCount: 320, creatorName: 'Alex' },
        { id: '5', title: 'Tailwind Optimized', slug: 'tw-rules', description: 'Best Tailwind practices', thumbnail: null, price: 9, rating: 4.9, salesCount: 450, creatorName: 'John' },
        { id: '6', title: 'React Performance', slug: 'react-perf', description: 'Catch re-renders early', thumbnail: null, price: 19, rating: 4.7, salesCount: 89, creatorName: 'Sarah' },
      ],
      'workflows': [
        { id: '7', title: 'TDD Workflow', slug: 'tdd-flow', description: 'Automated test generation', thumbnail: null, price: 29, rating: 5, salesCount: 215, creatorName: 'Sarah' },
        { id: '8', title: 'Documentation Sync', slug: 'doc-sync', description: 'Keep docs updated with code', thumbnail: null, price: 39, rating: 4.8, salesCount: 67, creatorName: 'John' },
        { id: '9', title: 'CI/CD Pipeline', slug: 'ci-cd-flow', description: 'Deploy with confidence', thumbnail: null, price: 99, rating: 5, salesCount: 34, creatorName: 'Alex' },
      ],
      'skills': [
        { id: '10', title: 'SQL Specialist', slug: 'sql-skill', description: 'Expert database querying', thumbnail: null, price: 19, rating: 4.9, salesCount: 128, creatorName: 'John' },
        { id: '11', title: 'Refactoring Pro', slug: 'refactor-skill', description: 'Complex code simplification', thumbnail: null, price: 29, rating: 5, salesCount: 92, creatorName: 'Alex' },
        { id: '12', title: 'Security Auditor', slug: 'sec-skill', description: 'Vulnerability detection', thumbnail: null, price: 49, rating: 4.8, salesCount: 45, creatorName: 'Sarah' },
      ],
    };

    setTimeout(() => {
      setTools(mockTools[activeTab] || []);
      setIsLoading(false);
    }, 300);
  }, [activeTab]);

  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Browse 2,200+ Tools</h2>
            <div className="h-1 w-20 bg-blue-600 mb-6" />
            <p className="text-xl text-gray-500 font-medium italic">High-authority tools by category</p>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveTab(cat.slug)}
                className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === cat.slug 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-[400px] bg-white/[0.02] rounded-2xl animate-pulse border border-white/[0.05]" />
            ))
          ) : (
            tools.map((tool) => (
              <div key={tool.id} className="group relative bg-white/[0.03] border border-white/[0.05] rounded-2xl overflow-hidden hover:border-white/10 hover:bg-white/[0.05] transition-all flex flex-col">
                <div className="aspect-video bg-white/[0.02] flex items-center justify-center border-b border-white/[0.05]">
                  {tool.thumbnail ? (
                    <img src={tool.thumbnail} alt={tool.title} className="w-full h-full object-cover" />
                  ) : (
                    <ShoppingCart className="w-12 h-12 text-white/5 group-hover:scale-110 group-hover:text-blue-500/20 transition-all duration-500" />
                  )}
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-400/10 px-2 py-0.5 rounded">Featured</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-bold text-white">{tool.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-black text-white mb-2 group-hover:text-blue-400 transition-colors">{tool.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">{tool.description}</p>
                  
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-black text-white">${tool.price}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{tool.salesCount} sales</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">by</p>
                      <p className="text-xs font-black text-white">{tool.creatorName}</p>
                    </div>
                  </div>
                  
                  <button className="w-full mt-6 py-3 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-16 text-center">
          <Link
            href={`/prompts?category=${activeTab}`}
            className="inline-flex items-center gap-2 text-white font-black uppercase tracking-widest text-sm hover:text-blue-400 transition-colors group"
          >
            View All {CATEGORIES.find(c => c.slug === activeTab)?.label} Tools
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
