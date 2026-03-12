'use client';

import Link from 'next/link';
import { SPONSOR_BADGE } from '@/config/sponsor';

export function SponsorBadge() {
  if (!SPONSOR_BADGE.active) {
    return (
      <Link
        href="/advertise"
        className="fixed bottom-24 right-4 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 z-40 flex flex-col bg-white/[0.04] border border-dashed border-white/[0.08] backdrop-blur-sm p-3 shadow-xl hover:bg-white/[0.07] hover:border-white/[0.15] transition-all"
      >
        <span className="text-[9px] font-mono text-gray-600 mb-1 uppercase tracking-widest">Advertise here</span>
        <span className="text-[10px] font-bold text-blue-400/50 hover:text-blue-400 transition-colors">Learn more →</span>
      </Link>
    );
  }

  return (
    <a
      href={SPONSOR_BADGE.href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="fixed bottom-24 right-4 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 z-40 flex flex-col bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm rounded-none p-3 shadow-xl hover:bg-white/[0.08] transition-all"
    >
      <span className="text-[9px] font-mono text-white mb-1.5 uppercase tracking-widest">Sponsored by</span>
      {SPONSOR_BADGE.logoUrl ? (
        <img src={SPONSOR_BADGE.logoUrl} alt={SPONSOR_BADGE.name} className="h-[18px] w-auto" />
      ) : (
        <span className="text-xs font-bold text-white">{SPONSOR_BADGE.name}</span>
      )}
    </a>
  );
}
