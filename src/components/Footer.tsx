'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export function Footer() {
  const matrixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matrixRef.current) return;

    // Character sets
    const binary = ['0', '1'];
    const symbols = ['{', '}', '[', ']', '(', ')', '<', '>', '==', '!==', '&&', '||', '=>', '::', '...'];
    const keywords = ['AI', 'ML', 'fn', 'var', 'let', 'api', 'sql', 'js', 'py', 'git', 'npm', 'GPT', 'GPU', 'CPU'];
    const dataTerms = ['NULL', 'TRUE', '0x', 'FF', 'SSL', 'DNS', 'API', 'JWT', 'XML', 'JSON'];

    const getRandomChar = () => {
      const rand = Math.random();
      if (rand < 0.6) {
        // 60% binary
        return binary[Math.floor(Math.random() * binary.length)];
      } else if (rand < 0.75) {
        // 15% symbols
        return symbols[Math.floor(Math.random() * symbols.length)];
      } else if (rand < 0.9) {
        // 15% keywords
        return keywords[Math.floor(Math.random() * keywords.length)];
      } else {
        // 10% data terms
        return dataTerms[Math.floor(Math.random() * dataTerms.length)];
      }
    };

    // Create columns
    const columnCount = 30;
    const container = matrixRef.current;
    container.innerHTML = '';

    for (let i = 0; i < columnCount; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      
      // Random length for each column - between 15-30 characters
      const charCount = Math.floor(Math.random() * 16) + 15;
      
      for (let j = 0; j < charCount; j++) {
        const char = document.createElement('span');
        char.className = 'matrix-char';
        char.textContent = getRandomChar();
        column.appendChild(char);
      }
      
      // CRITICAL: Random animation duration (speed) for each column
      const animationDuration = Math.random() * 8 + 6; // Between 6-14 seconds
      column.style.animationDuration = `${animationDuration}s`;
      
      // Random animation delay (timing) for staggered start
      column.style.animationDelay = `${Math.random() * 5}s`;
      
      container.appendChild(column);
    }

    // Refresh characters every 4 seconds
    const refreshInterval = setInterval(() => {
      const chars = container.querySelectorAll('.matrix-char');
      chars.forEach(char => {
        if (Math.random() > 0.7) { // Refresh 30% of characters
          char.textContent = getRandomChar();
        }
      });
    }, 4000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  return (
    <footer className="relative mt-16 overflow-hidden border-t border-white/[0.05] bg-black py-12" role="contentinfo">
      {/* Matrix Waterfall Effect - Decorative Only */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10" aria-hidden="true">
        <div ref={matrixRef} className="matrix-background"></div>
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          {/* Brand & Disclaimer */}
          <div className="flex max-w-lg flex-col gap-4 text-center md:text-left">
            <Link href="/" className="group flex items-center justify-center gap-3.5 md:justify-start p-1 rounded-sm" aria-label="Antigravity Directory Home">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white transition-all duration-300 relative overflow-hidden animate-logo-shine">
                <Zap className="h-5 h-5 fill-black text-black relative z-20" aria-hidden="true" />
              </div>
              <div className="flex flex-col justify-center text-left py-0.5">
                <span className="font-mono text-[17px] font-black tracking-[-0.03em] text-white lowercase leading-[1.1] premium-text-glow">
                  antigravity
                </span>
                <span className="font-mono text-[10px] font-black tracking-[0.3em] text-gray-400 lowercase leading-none mt-1 pl-0.5 opacity-90">
                  directory
                </span>
              </div>
            </Link>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-4">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-4 font-mono text-xs tracking-widest text-gray-400 uppercase px-4" aria-label="Footer Navigation">
                <Link
                  href="/"
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  Explore
                </Link>
                <Link
                  href="/tools"
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  Free AI Tools
                </Link>
              <Link
                href="/submit"
                className="p-2 transition-colors hover:text-white focus:outline-none focus:text-blue-500"
              >
                Submit
              </Link>
              <Link
                href="/download"
                className="p-2 transition-colors hover:text-white focus:outline-none focus:text-blue-500"
              >
                Download
              </Link>
              <Link
                href="/troubleshooting"
                className="p-2 transition-colors hover:text-white focus:outline-none focus:text-blue-500"
              >
                Help
              </Link>
              <Link
                href="/privacy"
                className="p-2 transition-colors hover:text-white focus:outline-none focus:text-blue-500"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="p-2 transition-colors hover:text-white focus:outline-none focus:text-blue-500"
              >
                Terms
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Notices */}
        <div className="mt-16 text-center border-t border-white/5 pt-8 space-y-2">
             <p className="font-mono text-[10px] leading-relaxed tracking-[0.2em] text-gray-400 uppercase max-w-4xl mx-auto px-4">
                 Antigravity Directory is an unofficial resource for the agentic coding community. This website is not affiliated with, endorsed by, or associated with Google LLC. "Google" and "Gemini" are trademarks of Google LLC.
             </p>
             <p className="font-mono text-[10px] leading-relaxed tracking-[0.2em] text-gray-600 uppercase font-bold">
                © Invictus International Consulting Services 2026
              </p>
        </div>
      </div>
    </footer>
  );
}
