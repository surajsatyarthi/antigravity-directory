'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/config/navigation';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();



  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/[0.08] p-6 md:hidden flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-5">
            <nav className="flex flex-col gap-4">
                <Link 
                    href="/" 
                    onClick={() => setIsOpen(false)}
                    className={`text-[13px] font-bold uppercase tracking-widest hover:text-white ${pathname === '/' ? 'text-white' : 'text-slate-400'}`}
                >
                    Explore
                </Link>
                
                {NAV_ITEMS.flatMap(item => {
                    if (item.disabled) return [];
                    // Flatten: if item has children, render children directly (skip the group label)
                    if (item.children) {
                        return item.children.map(child => {
                            const isChildActive = pathname === child.href;
                            return (
                                <Link 
                                    key={child.label}
                                    href={child.href}
                                    target={child.external ? "_blank" : undefined}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-[13px] font-bold uppercase tracking-widest hover:text-white flex items-center gap-2 ${isChildActive ? 'text-white' : 'text-slate-400'}`}
                                >
                                    {child.label}
                                    {child.isNew && <span className="bg-[#fbbf24] text-black text-[9px] px-1 rounded-sm">NEW</span>}
                                </Link>
                            );
                        });
                    }
                    const isActive = pathname === item.href;
                    return [(
                        <Link 
                            key={item.label}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            onClick={() => setIsOpen(false)}
                            className={`text-[13px] font-bold uppercase tracking-widest hover:text-white flex items-center gap-2 ${isActive ? 'text-white' : 'text-slate-400'}`}
                        >
                            {item.label} 
                            {item.isNew && <span className="bg-[#fbbf24] text-black text-[10px] px-1.5 rounded-sm">NEW</span>}
                        </Link>
                    )];
                })}

                <div className="h-px w-full bg-white/[0.08] my-1" />
                <Link 
                    href="/submit" 
                    onClick={() => setIsOpen(false)}
                    className="text-[13px] font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300"
                >
                    Submit Resource
                </Link>
            </nav>

            <div className="h-px w-full bg-white/[0.08]" />


        </div>
      )}
    </>
  );
}
