'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { NavItem } from '@/config/navigation';

interface DropdownProps {
  item: NavItem;
  pathname: string;
}

export function Dropdown({ item, pathname }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const hasActiveChild = item.children?.some(child => pathname === child.href);

  return (
    <div 
      className="relative h-full flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1.5 transition-colors whitespace-nowrap px-1 py-1 rounded-sm ${
          isOpen || hasActiveChild ? 'text-white' : 'text-gray-300 hover:text-white'
        }`}
      >
        <span>{item.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%-4px)] left-1/2 -translate-x-1/2 pt-2 w-48 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl">
            <div className="py-1.5">
              {item.children?.map((child) => {
                const isChildActive = pathname === child.href;
                return (
                  <Link
                    key={child.label}
                    href={child.href}
                    target={child.external ? "_blank" : undefined}
                    className={`flex items-center justify-between px-4 py-2.5 text-[11px] font-medium transition-all hover:bg-white/[0.03] ${
                      isChildActive ? 'text-white bg-white/[0.05]' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>{child.label}</span>
                    {child.isNew && (
                      <span className="bg-[#fbbf24] text-black text-[9px] font-bold px-1 rounded-sm leading-tight ml-2">NEW</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
