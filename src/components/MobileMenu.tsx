'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap, User, LogOut } from 'lucide-react';
import { NAV_ITEMS } from '@/config/navigation';
import { handleSignIn, handleSignOut } from '@/lib/actions/auth';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

interface MobileMenuProps {
  session: Session | null;
}

export function MobileMenu({ session: initialSession }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  
  // Get username from live session hook (not stale prop)
  // session.user.name populated by auth.ts session callback
  const currentUsername = session?.user?.name;
  const currentImage = session?.user?.image || initialSession?.user?.image;
  const isAuthenticated = !!session?.user || !!initialSession?.user;


  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
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
        <div className="absolute top-14 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-5">
            <nav className="flex flex-col gap-4">
                <Link 
                    href="/" 
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-bold hover:text-white ${pathname === '/' ? 'text-white' : 'text-gray-300'}`}
                >
                    Explore
                </Link>
                
                {NAV_ITEMS.map(item => {
                    if (item.disabled) return null;
                    const isActive = pathname === item.href;
                    
                    if (item.children) {
                        return (
                            <div key={item.label} className="flex flex-col gap-3">
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mt-2 px-1">
                                    {item.label}
                                </div>
                                <div className="flex flex-col gap-3 pl-4 border-l border-white/5">
                                    {item.children.map(child => {
                                        const isChildActive = pathname === child.href;
                                        return (
                                            <Link 
                                                key={child.label}
                                                href={child.href}
                                                target={child.external ? "_blank" : undefined}
                                                onClick={() => setIsOpen(false)}
                                                className={`text-base font-bold hover:text-white flex items-center gap-2 ${isChildActive ? 'text-white' : 'text-gray-400'}`}
                                            >
                                                {child.label}
                                                {child.isNew && <span className="bg-[#fbbf24] text-black text-[9px] px-1 rounded-sm">NEW</span>}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    }

                    return (
                        <Link 
                            key={item.label}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            onClick={() => setIsOpen(false)}
                            className={`text-lg font-bold hover:text-white flex items-center gap-2 ${isActive ? 'text-white' : 'text-gray-300'}`}
                        >
                            {item.label} 
                            {item.isNew && <span className="bg-[#fbbf24] text-black text-[10px] px-1.5 rounded-sm">NEW</span>}
                        </Link>
                    )
                })}

                <div className="h-px w-full bg-white/5 my-1" />
                <Link 
                    href="/submit" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-bold text-emerald-400 hover:text-emerald-300"
                >
                    Submit Resource
                </Link>
            </nav>

            <div className="h-px w-full bg-white/10" />

            <div className="flex flex-col gap-4">
                {isAuthenticated ? (
                    <>
                         <Link 
                            href={currentUsername ? `/u/${currentUsername}` : '/settings'}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 text-gray-300 hover:text-white"
                        >
                            {currentImage ? (
                                <img src={currentImage} alt="" className="w-8 h-8 rounded-full" />
                            ) : (
                                <User className="w-8 h-8 p-1.5 bg-gray-800 rounded-full" />
                            )}
                            <span className="font-medium">My Profile</span>
                        </Link>
                        <form action={handleSignOut}>
                            <button type="submit" className="flex items-center gap-3 text-red-400 hover:text-red-300">
                                <LogOut className="w-5 h-5" />
                                <span>Sign Out</span>
                            </button>
                        </form>
                    </>
                ) : (
                    <form action={handleSignIn} className="w-full">
                        <button 
                            type="submit"
                            className="w-full py-3 bg-white text-black font-black uppercase tracking-widest rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Sign In
                        </button>
                    </form>
                )}
            </div>
        </div>
      )}
    </>
  );
}
