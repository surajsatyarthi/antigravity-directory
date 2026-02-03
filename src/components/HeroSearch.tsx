import { Suspense } from 'react';
import { SearchInput } from './SearchInput';
import { Zap } from 'lucide-react';

export function HeroSearch() {
  return (
    <div className="relative py-20 px-4 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] mb-8 animate-fade-in">
          <Zap className="w-3 h-3 text-blue-400 fill-blue-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            500+ Curated Resources
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.05] premium-text-glow">
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">Antigravity</span> Resources
        </h1>
        
        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
          The definitive hub for high-authority MCP servers, coding rules, prompts, and agentic workflows.
        </p>

        <div className="max-w-3xl mx-auto">
          <Suspense fallback={<div className="h-16 w-full bg-white/[0.03] rounded-2xl animate-pulse" />}>
            <SearchInput variant="hero" placeholder="Search for 'gmail mcp', 'tailwind rules', 'agent workflows'..." />
          </Suspense>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-gray-500">
          <span className="text-[10px] font-bold uppercase tracking-widest">Popular:</span>
          {['Gmail MCP', 'Tailwind Rules', 'SQL Workflows', 'Prompt Samples'].map((tag) => (
            <button
              key={tag}
              className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.05] text-[10px] font-bold hover:text-white hover:bg-white/[0.05] transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
