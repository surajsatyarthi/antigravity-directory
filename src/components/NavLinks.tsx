'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from '@/config/navigation';
import { Dropdown } from './Dropdown';

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-6 text-[11px] font-semibold tracking-wide h-full">
      {NAV_ITEMS.map((item) => {
        if (item.children) {
          return <Dropdown key={item.label} item={item} pathname={pathname} />;
        }

        const isActive = pathname === item.href;
        const baseClass = "transition-colors whitespace-nowrap";
        const colorClass = item.disabled 
          ? "text-slate-400 cursor-not-allowed hover:text-slate-400" 
          : isActive 
            ? "text-white" 
            : "text-slate-400 hover:text-white";

        return (
          <Link
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            title={item.title}
            className={`flex items-center gap-1.5 uppercase ${baseClass} ${colorClass}`}
          >
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
