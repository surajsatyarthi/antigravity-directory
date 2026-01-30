import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, X, ArrowLeft, Shield, Zap, Brain, Code } from 'lucide-react';

import { COMPARISONS } from '@/data/comparisons';

type Props = {
  params: Promise<{ slug: string }>
};

export async function generateStaticParams() {
  return Object.values(COMPARISONS).map((comp) => ({
    slug: comp.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = COMPARISONS[slug];
  if (!data) return { title: 'Comparison Not Found | Antigravity Directory' };
  
  return {
    title: `${data.title} | Antigravity Comparison Engine`,
    description: data.summary,
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const data = COMPARISONS[slug];

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
