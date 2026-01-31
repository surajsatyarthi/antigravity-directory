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
    <nav className="hidden md:flex items-center gap-6 text-[11px] font-medium tracking-wide whitespace-nowrap">
      <Link href="#" className="text-gray-400 hover:text-white transition-colors cursor-not-allowed" title="Coming Soon">Help</Link>
      <Link href="#" className="text-gray-400 hover:text-white transition-colors cursor-not-allowed" title="Coming Soon">Blog</Link>
      <Link href="https://discord.gg/antigravity" target="_blank" className="text-gray-400 hover:text-white transition-colors">Community</Link>
      
      <Link 
        href="/prompts" 
        className={`flex items-center gap-1.5 transition-colors ${
          pathname === '/prompts' ? 'text-white' : 'text-gray-300 hover:text-white'
        }`}
      >
        <span>Prompts</span>
        <span className="bg-[#fbbf24] text-black text-[9px] font-bold px-1 rounded-sm leading-tight">NEW</span>
      </Link>

      <Link href="/rules" className="text-gray-300 hover:text-white transition-colors">Rules</Link>
      <Link href="/workflows" className="text-gray-300 hover:text-white transition-colors">Workflows</Link>
      <Link href="/skills" className="text-gray-300 hover:text-white transition-colors">Agent Skills</Link>
      <Link href="/mcp-servers" className="text-white hover:text-blue-400 transition-colors">MCPs</Link>
      <Link href="/advertise" className="text-gray-400 hover:text-white transition-colors">Advertise</Link>
    </nav>
  );
}
