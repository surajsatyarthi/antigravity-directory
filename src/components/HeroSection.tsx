'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { SearchInput } from './SearchInput';
import { Zap, DollarSign, Search, Briefcase } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-16 px-4 overflow-hidden bg-black">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="relative max-w-6xl mx-auto text-center z-10">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
          Build, Share, and Earn <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            with Antigravity
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-medium">
          The marketplace where creators monetize their tools. <br />
          <span className="text-white">Join 500+ creators earning $1-10k/month</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link
            href="/submit"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:scale-105"
          >
            Claim Your Tool
          </Link>
          <Link
            href="/prompts"
            className="px-8 py-4 bg-transparent border border-white/10 hover:border-white/20 text-white font-bold rounded-xl transition-all hover:bg-white/5"
          >
            Browse Tools
          </Link>
          <Link
            href="/jobs"
            className="px-8 py-4 bg-transparent border border-white/10 hover:border-white/20 text-white font-bold rounded-xl transition-all hover:bg-white/5"
          >
            Post a Job
          </Link>
        </div>

        <div className="max-w-3xl mx-auto mb-20">
          <Suspense fallback={<div className="h-16 w-full bg-white/[0.03] rounded-2xl animate-pulse border border-white/5" />}>
            <SearchInput variant="hero" placeholder="Search MCPs, Rules, Workflows..." />
          </Suspense>
        </div>

        {/* Three Columns Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Creators */}
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-all group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-wider mb-4">💰 Creators Earn</h3>
            <ul className="space-y-3 text-gray-400 font-medium">
              <li className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                 List free or paid
              </li>
              <li className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                 Keep 80% commission
              </li>
              <li className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                 First 2 sales are free
              </li>
            </ul>
            <Link href="/submit" className="mt-8 inline-block text-blue-400 font-bold hover:text-blue-300 transition-colors uppercase tracking-widest text-xs">
              Claim Tool →
            </Link>
          </div>

          {/* Users */}
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-all group">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-wider mb-4">🔍 Users Discover</h3>
            <ul className="space-y-3 text-gray-400 font-medium">
              <li className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                 Browse 2,200+ MCPs
              </li>
              <li className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                 Find what you need fast
              </li>
              <li className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                 Verified high-authority tools
              </li>
            </ul>
            <Link href="/prompts" className="mt-8 inline-block text-purple-400 font-bold hover:text-purple-300 transition-colors uppercase tracking-widest text-xs">
              Browse Tools →
            </Link>
          </div>

          {/* Companies */}
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-all group">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-wider mb-4">💼 Companies Hire</h3>
            <ul className="space-y-3 text-gray-400 font-medium">
              <li className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                 Post jobs to 500+ devs
              </li>
              <li className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                 Starting at $299/month
              </li>
              <li className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                 Direct access to top talent
              </li>
            </ul>
            <Link href="/jobs" className="mt-8 inline-block text-emerald-400 font-bold hover:text-emerald-300 transition-colors uppercase tracking-widest text-xs">
              Post Job →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
