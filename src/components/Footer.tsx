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
                  Home
                </Link>
                <Link
                  href="/prompts"
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  Browse Tools
                </Link>
              <Link
                href="/submit"
                className="p-2 text-blue-400 hover:text-blue-300 transition-colors font-bold"
              >
                Create Account (Earn 80%)
              </Link>
              <Link
                href="/jobs"
                className="p-2 transition-colors hover:text-white"
              >
                Jobs
              </Link>
              <Link
                href="/members"
                className="p-2 transition-colors hover:text-white"
              >
                Members
              </Link>
              <Link
                href="/troubleshooting"
                className="p-2 transition-colors hover:text-white"
              >
                Help
              </Link>
              <Link
                href="/privacy"
                className="p-2 transition-colors hover:text-white"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="p-2 transition-colors hover:text-white"
              >
                Terms
              </Link>
            </nav>
            
            <div className="flex items-center gap-6 mt-6 md:mt-0">
              <Link href="https://twitter.com/antigravity" className="text-gray-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </Link>
              <Link href="https://github.com/antigravity" className="text-gray-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </Link>
              <Link href="https://discord.gg/antigravity" className="text-gray-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.536 19.536 0 003.677 4.37.07.07 0 003.64 4.405C.469 9.146-.406 13.766.022 18.31a.07.07 0 00.026.048c2.12 1.554 4.17 2.494 6.185 3.111a.072.072 0 00.079-.025c.472-.645.885-1.335 1.239-2.06a.076.076 0 00-.041-.106c-.675-.255-1.316-.57-1.923-.94a.077.077 0 01-.008-.128c.128-.096.255-.195.375-.296a.072.072 0 01.076-.01c3.978 1.816 8.298 1.816 12.23 0a.073.073 0 01.077.01c.12.101.247.2.375.297a.077.077 0 01-.007.128c-.607.37-1.248.685-1.923.94a.076.076 0 00-.04.106c.354.725.767 1.415 1.239 2.06a.073.073 0 00.079.025c2.015-.617 4.065-1.557 6.185-3.111a.07.07 0 00.026-.048c.498-5.307-.84-9.882-3.63-13.905a.07.07 0 00-.037-.035zm-11.94 11.231c-1.18 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.18 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z"/></svg>
              </Link>
            </div>
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
