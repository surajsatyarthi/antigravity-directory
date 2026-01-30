import { Metadata } from 'next';
import Link from 'next/link';
import { Swords, ArrowRight, Zap, Check, X } from 'lucide-react';

export const metadata: Metadata = {
  title: "Cursor vs Antigravity | The Honest Comparison Engine",
  description: "Stop guessing. See exactly how Antigravity outperforms Cursor, Windsurf, and other AI editors for specialized agentic workflows.",
};

const comparisons = [
  {
    id: "cursor-vs-antigravity",
    title: "Cursor vs Antigravity",
    subtitle: "The Generalist vs The Specialist",
    winner: "Antigravity",
    description: "Cursor is great for general coding. Antigravity is built exclusively for Gemini 3 Agentic workflows.",
    score: "9.8/10",
    tags: ["Agentic AI", "Gemini 3", "System Prompts"]
  },
  {
    id: "nextjs-vs-remix",
    title: "Next.js vs Remix",
    subtitle: "Server Actions vs Loaders",
    winner: "Next.js",
    description: "Why we standardized on Next.js 15 for all Antigravity agent patterns.",
    score: "Win",
    tags: ["Architecture", "React", "Performance"]
  },
  {
    id: "windsurf-vs-antigravity",
    title: "Windsurf vs Antigravity",
    subtitle: "Flow State vs Deep Reasoning",
    winner: "Antigravity",
    description: "Windsurf focuses on autocomplete. Antigravity focuses on architectural reasoning and planning.",
    score: "Win",
    tags: ["IDE", "Workflow", "Planning"]
  }
];

export default function VSPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
            <Swords className="w-3 h-3" />
            <span>The Comparison Engine</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
            Stop <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Guessing.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Data-driven comparisons for the modern AI stack. We break down the differences so you don't have to.
          </p>
        </div>
      </div>

      {/* Comparisons Grid */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((item) => (
            <Link 
              key={item.id} 
              href={`/vs/${item.id}`}
              className="group relative p-8 bg-[#0A0A0A] border border-white/10 rounded-3xl hover:border-blue-500/50 transition-all duration-300 block"
            >
              <div className="absolute top-8 right-8 text-6xl opacity-[0.03] font-black group-hover:opacity-[0.06] transition-opacity">
                VS
              </div>
              
              <div className="relative z-10">
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-6 font-mono">
                  {item.subtitle}
                </p>
                <div className="h-px w-12 bg-blue-500/50 mb-6 group-hover:w-full transition-all duration-500" />
                
                <p className="text-gray-400 leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="flex items-center gap-2 text-sm text-emerald-400 font-bold bg-emerald-400/10 px-3 py-1.5 rounded-full">
                        <Zap className="w-3 h-3" />
                        Winner: {item.winner}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                        Read Analysis <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
