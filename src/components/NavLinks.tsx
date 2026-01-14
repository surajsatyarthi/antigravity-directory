'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinksProps {
  session: any;
  username: string | null;
}

export function NavLinks({ session, username }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest leading-none">
      <Link 
        href="/" 
        className={`transition-colors py-1 ${
          pathname === '/' ? 'text-white border-b border-white' : 'text-gray-400 hover:text-white'
        }`}
      >
        Explore
      </Link>
      
      {session && (
        <Link 
          href="/dashboard" 
          className={`transition-colors py-1 ${
            pathname === '/dashboard' ? 'text-white border-b border-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Dashboard
        </Link>
      )}
    </nav>
  );
}
