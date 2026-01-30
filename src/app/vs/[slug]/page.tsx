import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, X, ArrowLeft, Shield, Zap, Brain, Code } from 'lucide-react';

// Data Source (In a real app, this would be a DB or MDX)
const COMPARISONS = {
  'cursor-vs-antigravity': {
    title: "Cursor vs Antigravity",
    p1: "Cursor",
    p2: "Antigravity",
    winner: "Antigravity",
    summary: "Cursor is a general-purpose AI editor. Antigravity is a specialized 'Reasoning Environment' for Gemini 3. If you want autocomplete, use Cursor. If you want architecture, use Antigravity.",
    rows: [
      { feature: "Core Model", p1: "Claude 3.5 Sonnet", p2: "Gemini 3 Pro", p2Win: true, note: "Gemini 3 has 2M token context vs Claude's 200k." },
      { feature: "Reasoning Depth", p1: "Standard", p2: "Deep Reasoning", p2Win: true, note: "Antigravity forces 'Think before Code' protocols." },
      { feature: "Context Window", p1: "200k Tokens", p2: "2,000,000 Tokens", p2Win: true, note: "Antigravity holds your entire repo in memory." },
      { feature: "IDE Integration", p1: "Visual Studio Code Fork", p2: "Protocol Layer", p2Win: false, note: "Cursor wins on native IDE feel. Antigravity is a protocol." },
      { feature: "Cost", p1: "$20/mo", p2: "Free (Local)", p2Win: true, note: "Antigravity runs on your own API keys." }
    ]
  },
  'nextjs-vs-remix': {
    title: "Next.js vs Remix",
    p1: "Remix",
    p2: "Next.js",
    winner: "Next.js",
    summary: "Remix popularized data loaders, but Next.js 15's Server Actions + React Server Components provide a superior primitive for Agentic AI to reason about.",
    rows: [
        { feature: "AI Reasoning", p1: "Loaders (Implicit)", p2: "Server Actions (Explicit)", p2Win: true, note: "Agents understand functions better than HTTP loaders." },
        { feature: "Ecosystem", p1: "Small", p2: "Massive", p2Win: true, note: "More 'Copy-Paste' patterns available for Next.js." },
        { feature: "Deployment", p1: "Edge/Node", p2: "Vercel Optimized", p2Win: true, note: "Zero-config deployment is crucial for rapid agent iteration." }
    ]
  }
};

type Props = {
  params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = COMPARISONS[params.slug as keyof typeof COMPARISONS];
  if (!data) return { title: 'Comparison Not Found' };
  
  return {
    title: `${data.title} | Antigravity Comparison Engine`,
    description: data.summary,
  };
}

export default function ComparisonPage({ params }: Props) {
  const data = COMPARISONS[params.slug as keyof typeof COMPARISONS];

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/vs" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Comparisons
          </Link>
          <div className="font-bold text-white">Antigravity VS</div>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-32 pb-20 border-b border-white/10">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                {data.p1} <span className="text-gray-600">vs</span> <span className="text-emerald-400">{data.p2}</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {data.summary}
            </p>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden">
            
            {/* Table Header */}
            <div className="grid grid-cols-3 p-6 border-b border-white/10 bg-white/5 font-mono text-sm uppercase tracking-wider text-gray-500">
                <div className="pl-4">Feature</div>
                <div className="text-center">{data.p1}</div>
                <div className="text-center text-emerald-400 font-bold">{data.p2} (You)</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/5">
                {data.rows.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-3 p-6 hover:bg-white/[0.02] transition-colors items-center">
                        <div className="pl-4 font-bold text-gray-300">
                            {row.feature}
                            <div className="text-xs text-gray-600 mt-1 font-normal font-mono">{row.note}</div>
                        </div>
                        <div className={`text-center flex flex-col items-center justify-center gap-2 ${!row.p2Win ? 'text-green-400 font-bold' : 'text-gray-500'}`}>
                           {/* Logic inverted: if p2 win, p1 loses. If p2 lose, p1 wins */}
                           {!row.p2Win && <Check className="w-5 h-5 mb-1" />}
                           {row.p1}
                        </div>
                        <div className={`text-center flex flex-col items-center justify-center gap-2 ${row.p2Win ? 'text-emerald-400 font-bold' : 'text-gray-500'}`}>
                            {row.p2Win && <Check className="w-5 h-5 mb-1" />}
                            {row.p2}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold mb-6">Ready to upgrade from {data.p1}?</h3>
            <Link href="/prompts" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all hover:scale-105 active:scale-95 text-lg">
                <Zap className="w-5 h-5 mr-2" />
                Get Antigravity Prompts
            </Link>
            <p className="mt-4 text-sm text-gray-500">Instant Access • No Credit Card Required</p>
        </div>

      </div>
    </div>
  );
}
