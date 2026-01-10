import Link from 'next/link';
import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-gray-900 bg-black py-20">
      {/* Lightning Flash Effect (Ambient) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main Background Flash */}
        <div className="animate-flash absolute inset-0 bg-white/5 blur-3xl" />
        
        {/* Fractal Lightning Bolts */}
        {/* Left Lightning */}
        <svg className="animate-flash absolute top-0 left-[20%] h-full w-auto opacity-20" viewBox="0 0 100 400" fill="none">
          <path d="M50 0 L45 80 L55 80 L48 150 L60 150 L52 220 L40 250 L50 250 L45 300 L35 330 L45 330 L40 400" 
                stroke="white" strokeWidth="2" strokeLinecap="round" />
          {/* Branches */}
          <path d="M48 150 L35 170" stroke="white" strokeWidth="1" opacity="0.6" />
          <path d="M60 150 L70 180" stroke="white" strokeWidth="1" opacity="0.6" />
          <path d="M52 220 L65 240" stroke="white" strokeWidth="1" opacity="0.5" />
          <path d="M40 250 L25 270" stroke="white" strokeWidth="1" opacity="0.5" />
          <path d="M45 300 L55 320" stroke="white" strokeWidth="1" opacity="0.4" />
        </svg>

        {/* Center Lightning */}
        <svg className="animate-flash absolute top-0 left-1/2 -translate-x-1/2 h-full w-auto opacity-30" viewBox="0 0 100 400" fill="none" style={{ animationDelay: '0.5s' }}>
          <path d="M50 0 L48 70 L52 70 L50 140 L58 140 L53 200 L62 200 L55 270 L48 270 L45 330 L50 330 L48 400" 
                stroke="white" strokeWidth="3" strokeLinecap="round" filter="url(#glow)" />
          {/* Branches */}
          <path d="M50 140 L40 160" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <path d="M58 140 L68 165" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <path d="M53 200 L45 220" stroke="white" strokeWidth="1.5" opacity="0.6" />
          <path d="M62 200 L72 225" stroke="white" strokeWidth="1.5" opacity="0.6" />
          <path d="M55 270 L65 290" stroke="white" strokeWidth="1" opacity="0.5" />
          <path d="M48 270 L38 285" stroke="white" strokeWidth="1" opacity="0.5" />
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Right Lightning */}
        <svg className="animate-flash absolute top-0 right-[30%] h-full w-auto opacity-15" viewBox="0 0 100 400" fill="none" style={{ animationDelay: '1.2s' }}>
          <path d="M50 0 L52 90 L48 90 L50 160 L42 160 L48 230 L38 260 L46 260 L43 320 L52 350 L48 350 L50 400" 
                stroke="white" strokeWidth="2" strokeLinecap="round" />
          {/* Branches */}
          <path d="M50 160 L60 180" stroke="white" strokeWidth="1" opacity="0.6" />
          <path d="M42 160 L32 175" stroke="white" strokeWidth="1" opacity="0.6" />
          <path d="M48 230 L58 250" stroke="white" strokeWidth="1" opacity="0.5" />
          <path d="M43 320 L33 335" stroke="white" strokeWidth="1" opacity="0.4" />
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
