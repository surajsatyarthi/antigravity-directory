import Link from 'next/link';
import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-gray-900 bg-black py-20">
      {/* Lightning Flash Effect (Ambient) */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="animate-flash absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-white blur-md" />
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
            <p className="font-mono text-[10px] leading-relaxed tracking-[0.2em] text-gray-500 uppercase">
              This site is not affiliated with, endorsed by, or sponsored by
              Google. <br />
              Care of Invictus International Consulting Services 2026
            </p>
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
            <div className="hidden h-4 w-px bg-gray-900 md:block" />
            <p className="font-mono text-[10px] tracking-widest text-gray-600 uppercase">
              © 2026 Antigravity Directory
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
