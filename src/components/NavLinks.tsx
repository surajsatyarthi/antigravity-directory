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
    <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest leading-none">
      <Link 
        href="/" 
        className={`transition-colors py-1 ${
          pathname === '/' ? 'text-white border-b border-white' : 'text-gray-500 hover:text-white'
        }`}
      >
        Explore
      </Link>
      
      <Link 
        href="/submit" 
        className={`transition-colors py-1 ${
          pathname === '/submit' ? 'text-white border-b border-white' : 'text-gray-500 hover:text-white'
        }`}
      >
        Submit
      </Link>
      
      {session && (
        <Link 
          href="/dashboard" 
          className={`transition-colors py-1 ${
            pathname === '/dashboard' ? 'text-white border-b border-white' : 'text-gray-500 hover:text-white'
          }`}
        >
          Dashboard
        </Link>
      )}
    </nav>
  );
}
