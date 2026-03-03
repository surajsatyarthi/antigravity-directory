'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from '@/config/navigation';
import { Dropdown } from './Dropdown';

interface NavLinksProps {
  session: any;
  username: string | null;
}

export function NavLinks({ session, username }: NavLinksProps) {
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
          ? "text-slate-400 cursor-not-allowed hover:text-slate-900" 
          : isActive 
            ? "text-slate-900" 
            : item.label === 'MCPs' ? "text-slate-900 hover:text-blue-400" : "text-slate-500 hover:text-slate-900";

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
