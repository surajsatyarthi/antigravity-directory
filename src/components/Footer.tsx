import Link from 'next/link';
import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-gray-900 bg-black py-20">
      {/* Binary Waterfall Effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent blur-2xl" />
        
        {/* Binary rain columns */}
        <div className="absolute inset-0 flex justify-around items-start opacity-20">
          {/* Column 1 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '0s' }}>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">0</span>
          </div>
          
          {/* Column 2 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '0.3s' }}>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
          </div>
          
          {/* Column 3 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '0.7s' }}>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
          </div>
          
          {/* Column 4 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '1.2s' }}>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
          </div>
          
          {/* Column 5 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '0.5s' }}>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
          </div>
          
          {/* Column 6 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '1.5s' }}>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
          </div>
          
          {/* Column 7 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '0.9s' }}>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
          </div>
          
          {/* Column 8 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '0.2s' }}>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
          </div>
          
          {/* Column 9 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '1.8s' }}>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
          </div>
          
          {/* Column 10 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '0.4s' }}>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
          </div>
          
          {/* Column 11 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '2.1s' }}>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
          </div>
          
          {/* Column 12 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '0.6s' }}>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
          </div>
          
          {/* Column 13 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '1.4s' }}>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
          </div>
          
          {/* Column 14 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '0.8s' }}>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
          </div>
          
          {/* Column 15 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '2.4s' }}>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
          </div>
          
          {/* Column 16 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '0.1s' }}>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">0</span>
          </div>
          
          {/* Column 17 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '1.7s' }}>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
          </div>
          
          {/* Column 18 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '1.0s' }}>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
          </div>
          
          {/* Column 19 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '2.2s' }}>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
          </div>
          
          {/* Column 20 */}
          <div className="flex flex-col gap-2 animate-binary-fall" style={{ animationDelay: '0.35s' }}>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">1</span>
            <span className="font-mono text-xs text-white">0</span>
            <span className="font-mono text-xs text-white">1</span>
          </div>
        </div>
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
