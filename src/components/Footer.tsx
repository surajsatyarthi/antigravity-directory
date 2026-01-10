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
      
      // Random height between 8-23 characters
      const charCount = Math.floor(Math.random() * 16) + 8;
      
      for (let j = 0; j < charCount; j++) {
        const char = document.createElement('span');
        char.className = 'matrix-char';
        char.textContent = getRandomChar();
        column.appendChild(char);
      }
      
      // Random animation delay
      column.style.animationDelay = `${Math.random() * 3}s`;
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

    // Flash random characters in white
    const flashInterval = setInterval(() => {
      const chars = container.querySelectorAll('.matrix-char');
      chars.forEach(char => {
        // Remove existing flash
        char.classList.remove('flash-white');
        
        // Randomly flash 5% of characters
        if (Math.random() > 0.95) {
          char.classList.add('flash-white');
          // Remove flash after animation
          setTimeout(() => {
            char.classList.remove('flash-white');
          }, 600);
        }
      });
    }, 100); // Check every 100ms for more dynamic flashing

    return () => {
      clearInterval(refreshInterval);
      clearInterval(flashInterval);
    };
  }, []);

  return (
    <footer className="relative mt-32 overflow-hidden border-t border-gray-900 bg-black py-20">
      {/* Matrix Waterfall Effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-15">
        <div ref={matrixRef} className="matrix-background"></div>
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
