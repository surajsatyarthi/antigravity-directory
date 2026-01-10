import Link from 'next/link';
import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-gray-900 bg-black py-20">
      {/* Lightning Flash Effect (Ambient) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main Background Flash */}
        <div className="animate-flash absolute inset-0 bg-white/5 blur-3xl" />
        
        {/* Horizontal Lightning Bolt - Near Bottom */}
        <svg className="animate-flash absolute bottom-12 left-0 w-full h-auto opacity-25" viewBox="0 0 1200 100" fill="none" preserveAspectRatio="none">
          {/* Main horizontal bolt with zigzag pattern */}
          <path d="M0 50 L150 45 L180 55 L350 48 L380 52 L550 45 L580 55 L750 48 L780 52 L950 47 L980 53 L1200 50" 
                stroke="white" strokeWidth="3" strokeLinecap="round" filter="url(#horizontalGlow)" />
          
          {/* Upward branches */}
          <path d="M180 55 L190 35" stroke="white" strokeWidth="1.5" opacity="0.6" />
          <path d="M380 52 L390 30 L400 35" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <path d="M580 55 L570 40 L575 30" stroke="white" strokeWidth="1.5" opacity="0.6" />
          <path d="M780 52 L790 35" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <path d="M980 53 L985 38 L995 30" stroke="white" strokeWidth="1.5" opacity="0.6" />
          
          {/* Downward branches */}
          <path d="M350 48 L360 65" stroke="white" strokeWidth="1.5" opacity="0.5" />
          <path d="M550 45 L545 60 L550 70" stroke="white" strokeWidth="1.5" opacity="0.6" />
          <path d="M750 48 L755 65" stroke="white" strokeWidth="1.5" opacity="0.5" />
          <path d="M950 47 L960 62 L965 70" stroke="white" strokeWidth="1.5" opacity="0.6" />
          
          <defs>
            <filter id="horizontalGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          {/* Brand & Disclaimer */}
          <div className="flex max-w-lg flex-col gap-6 text-center md:text-left">
            <div className="group flex items-center justify-center gap-3 md:justify-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                <Zap className="animate-shimmer h-6 w-6 fill-black text-black" />
              </div>
              <span className="font-mono text-xl font-bold tracking-tighter text-white lowercase">
                antigravity
              </span>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-[10px] leading-relaxed tracking-[0.2em] text-gray-500 uppercase">
                This site is not affiliated with, endorsed by, or sponsored by Google.
              </p>
              <p className="font-mono text-[10px] leading-relaxed tracking-[0.2em] text-gray-400 uppercase font-bold">
                © Invictus International Consulting Services 2026
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <nav className="flex gap-10 font-mono text-[10px] tracking-widest text-gray-400 uppercase">
              <Link
                href="/resources"
                className="transition-colors hover:text-white"
              >
                Resources
              </Link>
              <Link
                href="/submit"
                className="transition-colors hover:text-white"
              >
                Submit
              </Link>
              <Link
                href="https://github.com"
                className="transition-colors hover:text-white"
              >
                GitHub
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
