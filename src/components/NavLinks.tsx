'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from '@/config/navigation';

interface NavLinksProps {
  session: any;
  username: string | null;
}

export function NavLinks({ session, username }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-6 text-[11px] font-medium tracking-wide whitespace-nowrap">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const baseClass = "transition-colors";
        const colorClass = item.disabled 
          ? "text-gray-400 cursor-not-allowed hover:text-white" 
          : isActive 
            ? "text-white" 
            : item.label === 'MCPs' ? "text-white hover:text-blue-400" : "text-gray-300 hover:text-white";

        return (
          <Link
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            title={item.title}
            className={`flex items-center gap-1.5 ${baseClass} ${colorClass}`}
          >
            <span>{item.label}</span>
            {item.isNew && (
              <span className="bg-[#fbbf24] text-black text-[9px] font-bold px-1 rounded-sm leading-tight">NEW</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
