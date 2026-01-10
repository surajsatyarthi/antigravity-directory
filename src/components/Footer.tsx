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
          <path d="M0 50 L100 48 L130 52 L250 47 L280 53 L400 49 L430 51 L550 48 L580 52 L700 49 L730 51 L850 48 L880 52 L1000 49 L1030 51 L1200 50" 
                stroke="white" strokeWidth="3" strokeLinecap="round" filter="url(#horizontalGlow)" />
          
          {/* Primary Branches - Upward */}
          <path d="M130 52 L140 35 L145 25" stroke="white" strokeWidth="2" opacity="0.7" />
          <path d="M280 53 L290 30 L295 20 L300 15" stroke="white" strokeWidth="2" opacity="0.8" />
          <path d="M430 51 L425 35 L420 25" stroke="white" strokeWidth="2" opacity="0.7" />
          <path d="M580 52 L590 30 L595 18" stroke="white" strokeWidth="2" opacity="0.8" />
          <path d="M730 51 L735 35 L738 22" stroke="white" strokeWidth="2" opacity="0.7" />
          <path d="M880 52 L890 28 L895 15" stroke="white" strokeWidth="2" opacity="0.8" />
          
          {/* Primary Branches - Downward */}
          <path d="M100 48 L105 65 L108 75" stroke="white" strokeWidth="2" opacity="0.6" />
          <path d="M250 47 L255 68 L258 78 L262 85" stroke="white" strokeWidth="2" opacity="0.7" />
          <path d="M400 49 L410 70 L415 80" stroke="white" strokeWidth="2" opacity="0.6" />
          <path d="M550 48 L548 68 L545 78" stroke="white" strokeWidth="2" opacity="0.7" />
          <path d="M700 49 L708 67 L712 77" stroke="white" strokeWidth="2" opacity="0.6" />
          <path d="M850 48 L855 70 L858 82" stroke="white" strokeWidth="2" opacity="0.7" />
          <path d="M1000 49 L1010 68 L1015 78" stroke="white" strokeWidth="2" opacity="0.6" />
          
          {/* Secondary Branches (branches off primary) */}
          <path d="M145 25 L150 18 L155 15" stroke="white" strokeWidth="1" opacity="0.5" />
          <path d="M145 25 L138 20" stroke="white" strokeWidth="1" opacity="0.4" />
          <path d="M295 20 L302 12" stroke="white" strokeWidth="1" opacity="0.6" />
          <path d="M295 20 L288 15" stroke="white" strokeWidth="1" opacity="0.5" />
          <path d="M595 18 L602 10" stroke="white" strokeWidth="1" opacity="0.6" />
          <path d="M595 18 L588 12" stroke="white" strokeWidth="1" opacity="0.5" />
          <path d="M890 28 L895 20 L898 15" stroke="white" strokeWidth="1" opacity="0.6" />
          <path d="M890 28 L883 22" stroke="white" strokeWidth="1" opacity="0.5" />
          
          {/* Secondary Branches - Downward */}
          <path d="M108 75 L115 82" stroke="white" strokeWidth="1" opacity="0.4" />
          <path d="M108 75 L102 82" stroke="white" strokeWidth="1" opacity="0.4" />
          <path d="M258 78 L265 88" stroke="white" strokeWidth="1" opacity="0.5" />
          <path d="M258 78 L252 85" stroke="white" strokeWidth="1" opacity="0.5" />
          <path d="M545 78 L540 88" stroke="white" strokeWidth="1" opacity="0.5" />
          <path d="M545 78 L550 85" stroke="white" strokeWidth="1" opacity="0.4" />
          <path d="M858 82 L865 90" stroke="white" strokeWidth="1" opacity="0.5" />
          <path d="M858 82 L852 88" stroke="white" strokeWidth="1" opacity="0.4" />
          
          {/* Tertiary Branches (small offshoots) */}
          <path d="M155 15 L160 10" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <path d="M302 12 L308 8" stroke="white" strokeWidth="0.5" opacity="0.4" />
          <path d="M602 10 L608 5" stroke="white" strokeWidth="0.5" opacity="0.4" />
          <path d="M115 82 L120 88" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <path d="M265 88 L270 95" stroke="white" strokeWidth="0.5" opacity="0.3" />
          
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
