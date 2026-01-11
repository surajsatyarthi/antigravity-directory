'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus, LayoutDashboard } from 'lucide-react';

interface NavLinksProps {
  session: any;
  username: string | null;
}

export function NavLinks({ session, username }: NavLinksProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/resources' && pathname.startsWith('/resources')) return true;
    if (path === '/dashboard' && pathname.startsWith('/dashboard')) return true;
    if (path === '/submit' && pathname.startsWith('/submit')) return true;
    return pathname === path;
  };

  return (
    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
      <Link 
        href="/resources" 
        className={`transition-colors uppercase tracking-widest text-[11px] font-bold ${
          isActive('/resources') ? 'text-white' : 'text-gray-500 hover:text-white'
        }`}
      >
        Explore
      </Link>
      
      {session ? (
        <div className="flex items-center gap-6">
          <Link 
            href="/submit" 
            className={`flex items-center gap-1.5 px-4 py-2 font-bold rounded-lg transition-all active:scale-95 text-[10px] uppercase tracking-widest ${
              isActive('/submit') 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Submit
          </Link>

          <Link 
            href="/dashboard" 
            className={`flex items-center gap-1.5 px-3 py-2 transition-all group ${
              isActive('/dashboard') ? 'text-white' : 'text-gray-500 hover:text-white'
            }`}
            title="Dashboard"
          >
            <LayoutDashboard className={`w-4 h-4 transition-colors ${isActive('/dashboard') ? 'text-blue-500' : 'group-hover:text-blue-500'}`} />
            <span className="hidden lg:block text-[10px] uppercase tracking-widest font-bold">Dashboard</span>
          </Link>
        </div>
      ) : (
        <form action="/api/auth/signin"> {/* Placeholder as it was using handleSignIn */}
          <button type="submit" className="hover:text-white text-gray-500 transition-colors uppercase tracking-widest text-[11px] font-bold">
            Sign In
          </button>
        </form>
      )}
    </nav>
  );
}
