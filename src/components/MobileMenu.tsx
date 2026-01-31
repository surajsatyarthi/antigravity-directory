'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap, User, LogOut } from 'lucide-react';
import { handleSignIn, handleSignOut } from '@/lib/actions/auth';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

interface MobileMenuProps {
  session: Session | null;
  username: string | null | undefined;
}

export function MobileMenu({ session: initialSession, username: initialUsername }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  
  // Use session.user.name or name from explicit prop, fallback to initial
  // Note: schema uses 'username' field but next-auth session might map it differently
  // typically session.user.name might be the display name.
  // We'll stick to 'username' prop logic but try to update it.
  
  // Actually, standard NextAuth session usually has name, email, image. 
  // Custom fields like 'username' need to be in the session callback.
  // Assuming the goal is just to rely on the hook for re-renders on sign-in:
  
  const currentUsername = session?.user?.name || initialUsername; // Fallback to prop
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
                    className="text-lg font-bold text-gray-300 hover:text-white"
                >
                    Explore
                </Link>
                <Link 
                    href="/prompts" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-bold text-gray-300 hover:text-white flex items-center gap-2"
                >
                    Prompts <span className="bg-[#fbbf24] text-black text-[10px] px-1.5 rounded-sm">NEW</span>
                </Link>
                <Link 
                    href="/mcp-servers" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-bold text-gray-300 hover:text-white"
                >
                    MCPs
                </Link>
                <Link 
                    href="/advertise" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-bold text-gray-300 hover:text-white"
                >
                    Advertise
                </Link>
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
