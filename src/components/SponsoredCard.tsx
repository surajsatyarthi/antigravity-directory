'use client';

import Link from 'next/link';
import { SPONSOR } from '@/config/sponsor';

export function SponsoredCard() {
  if (SPONSOR.active) {
    // Real sponsor card — native-styled
    return (
      <a
        href={SPONSOR.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="group relative flex flex-col sm:flex-row items-start sm:items-center bg-white/[0.03] border border-white/[0.06] rounded-lg overflow-hidden hover:border-white/20 transition-all duration-300 min-h-[140px]"
      >
        <div className="absolute top-0 right-0 z-30 flex items-center px-2 py-1 bg-white/[0.03] border-b border-l border-white/[0.06] rounded-bl-lg">
          <span className="text-[7px] font-black text-gray-600 uppercase tracking-[0.2em]">Sponsored</span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full p-5 sm:p-4 relative z-10">
          <div className="flex items-center justify-center w-full sm:w-auto shrink-0">
            {SPONSOR.logoUrl ? (
              <img
                src={SPONSOR.logoUrl}
                alt={SPONSOR.name}
                className="h-12 w-12 rounded-lg object-contain"
              />
            ) : (
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-white/[0.06] flex items-center justify-center">
                <span className="font-mono text-xs text-gray-600">AD</span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 w-full">
            <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors mb-1 tracking-tight leading-tight">
              {SPONSOR.name}
            </h3>
            <p className="text-sm text-gray-400 font-medium">
              {SPONSOR.description || SPONSOR.tagline}
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-white/[0.06] sm:border-0">
            <span className="text-[10px] uppercase tracking-widest font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
              Learn more →
            </span>
          </div>
        </div>
      </a>
    );
  }

  // No sponsor active — "for sale" placeholder
  return (
    <Link
      href="/advertise"
      className="group relative flex flex-col sm:flex-row items-start sm:items-center bg-white/[0.02] border border-dashed border-white/[0.06] rounded-lg overflow-hidden hover:border-white/20 transition-all duration-300"
    >
      <div className="absolute top-0 right-0 z-30 flex items-center px-2 py-1 bg-white/[0.03] border-b border-l border-white/[0.06] rounded-bl-lg">
        <span className="text-[7px] font-black text-gray-600 uppercase tracking-[0.2em]">Ad</span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full p-5 sm:p-4 relative z-10">
        <div className="flex items-center justify-center w-full sm:w-auto shrink-0">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-white/[0.04] flex items-center justify-center">
            <span className="font-mono text-xs text-gray-600">AD</span>
          </div>
        </div>

        <div className="flex-1 min-w-0 w-full">
          <h3 className="text-base font-bold text-white/40 group-hover:text-white/70 transition-colors mb-1 tracking-tight leading-tight">
            Promote your AI tool here
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            Reach thousands of developers building with Google Antigravity IDE.
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-white/[0.04] sm:border-0">
          <span className="text-[10px] uppercase tracking-widest font-bold text-blue-400/50 group-hover:text-blue-400 transition-colors">
            Learn more →
          </span>
        </div>
      </div>
    </Link>
  );
}
