import { ComparisonData } from '@/data/comparisons';
import { Header } from './Header';

import { Check, X, Trophy, Minus } from 'lucide-react';
import Link from 'next/link';

export function ComparisonPage({ comparison }: { comparison: ComparisonData }) {
  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-slate-100">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16 max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                {comparison.category} Showdown
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase italic mb-4">
                {comparison.p1} <span className="text-gray-600 not-italic font-sans px-2 text-2xl md:text-4xl align-middle">VS</span> {comparison.p2}
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                {comparison.subtitle}
            </p>
        </div>

        {/* Executive Summary Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-px bg-gradient-to-l from-blue-500/20 to-transparent w-1/2 h-full opacity-50" />
            <div className="relative z-10">
                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Executive Summary</h2>
                <p className="text-lg md:text-xl text-slate-900 leading-relaxed mb-8">
                    {comparison.summary}
                </p>
                <div className="flex items-center gap-4">
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Our Verdict:</div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 font-bold rounded-lg border border-emerald-500/20">
                        <Trophy className="w-4 h-4" />
                        Winner: {comparison.winner}
                    </div>
                </div>
            </div>
        </div>

        {/* Comparison Table */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white mb-16">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white border-b border-slate-200">
                            <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-widest w-1/4">Feature</th>
                            <th className="p-6 text-sm font-bold text-slate-900 uppercase tracking-widest w-1/3 bg-slate-100">{comparison.p1}</th>
                            <th className="p-6 text-sm font-bold text-blue-400 uppercase tracking-widest w-1/3 bg-blue-500/5 border-l border-blue-500/20">{comparison.p2} (Us)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {comparison.rows.map((row, idx) => (
                            <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="p-6 align-top">
                                    <div className="font-bold text-slate-900 mb-2">{row.feature}</div>
                                    <div className="text-xs text-slate-500 leading-relaxed">{row.note}</div>
                                </td>
                                <td className="p-6 align-top text-slate-400 leading-relaxed group-hover:text-slate-500">
                                    {row.p1}
                                </td>
                                <td className={`p-6 align-top border-l border-slate-200 leading-relaxed relative ${row.p2Win ? 'bg-emerald-500/5 text-slate-900' : 'bg-red-500/5 text-slate-400'}`}>
                                    {row.p2Win && (
                                        <div className="absolute top-6 right-6 text-emerald-500">
                                            <Check className="w-5 h-5" />
                                        </div>
                                    )}
                                    {row.p2}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
            {comparison.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-mono text-slate-500">
                    {tag}
                </span>
            ))}
        </div>

        {/* CTA */}
        <div className="text-center py-20 border-t border-slate-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Experience the Difference</h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-10">
                Stop settling for generic AI. Upgrade to a reasoning environment built for engineers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/" className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all text-sm">
                    Analyze Your Stack
                </Link>
                <Link href="/submit" className="px-8 py-4 bg-slate-100 text-slate-900 font-bold uppercase tracking-widest rounded-xl hover:bg-slate-100 border border-slate-200 transition-all text-sm">
                    Submit Comparison
                </Link>
            </div>
        </div>
      </main>


    </div>
  );
}
