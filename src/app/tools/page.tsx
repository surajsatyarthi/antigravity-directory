import { MarketplaceHeader } from '@/components/MarketplaceHeader';

import Link from 'next/link';
import { Wrench, ShieldCheck, BarChart2, Star, Zap } from 'lucide-react';
import { getTopTools } from '@/lib/queries';

export default async function ToolsPage() {
  const toolsList = await getTopTools();

  return (
    <>
      <MarketplaceHeader />
      <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-6 premium-text-glow tracking-tighter">
              Deep Analysis <span className="text-blue-500">&</span> Comparisons
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Objective technical audits and head-to-head performance benchmarks to help you choose the right agentic infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsList.map((tool) => (
              <Link 
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="group relative flex flex-col p-8 rounded-2xl border border-white/[0.05] bg-[#030303] hover:border-blue-500/30 transition-all duration-300 hover:translate-y-[-4px]"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <BarChart2 className="w-5 h-5 text-blue-500/50" />
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                    <Wrench className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="px-2 py-0.5 rounded bg-gray-900 border border-white/5 text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                    {tool.category}
                  </div>
                </div>

                <h3 className="text-xl font-black mb-3 tracking-tight group-hover:text-blue-400 transition-colors">{tool.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{tool.description}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/[0.03]">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Verified Specs</span>
                  </div>
                  <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                    View Audit →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-white/[0.05] bg-[#010101] py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-black mb-6 tracking-tight">Have a tool that beats the competition?</h2>
            <p className="text-gray-400 mb-10 text-lg">Submit your resource to our deep analysis queue and get featured in our technical comparisons.</p>
            <Link 
              href="/submit"
              className="px-8 py-4 bg-white text-black font-black rounded-lg uppercase tracking-widest text-[12px] hover:bg-gray-200 transition-all shadow-xl shadow-white/5 hover:scale-[1.05]"
            >
              Request Technical Audit
            </Link>
          </div>
        </div>
      </main>

    </>
  );
}
