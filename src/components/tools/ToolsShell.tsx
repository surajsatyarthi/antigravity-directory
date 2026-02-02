'use client';

import { useState, useEffect } from 'react';
import { ToolsSidebar } from './ToolsSidebar';
import { Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { allTools } from '@/lib/tools-config';

export function ToolsShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Close sidebar on mobile route change
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  // Handle resize for responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-black text-slate-200">
      {/* Sidebar */}
      <aside 
        className={cn(
          "flex-shrink-0 border-r border-white/10 bg-black/50 transition-all duration-300 ease-in-out overflow-y-auto custom-scrollbar",
          isSidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:w-16 md:translate-x-0" // w-16 for collapsed icon view on desktop
        )}
      >
        <ToolsSidebar isCollapsed={!isSidebarOpen && !isMobile} />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-transparent overflow-hidden">
        {/* Shell Header (Breadcrumbs / Toggle) */}
        <header className="h-14 flex items-center px-4 border-b border-white/5 justify-between">
            <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            >
                {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </button>
            
            {/* Optional: Add breadcrumbs or current tool title here */}
        </header>

        {/* Scrollable Tool Canvas */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            <div className="max-w-5xl mx-auto">
                {children}

                {/* Related Tools Footer */}
                <div className="mt-20 pt-12 border-t border-white/5">
                    <h3 className="text-sm font-semibold text-slate-400 mb-6 px-1">More AI Utilities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {allTools.filter(t => t.href !== pathname).slice(0, 3).map(tool => {
                            const Icon = tool.icon;
                            return (
                                <Link 
                                    key={tool.href}
                                    href={tool.href}
                                    className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition group"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-blue-500/20 group-hover:text-blue-400 transition">
                                            <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-200 group-hover:text-white">{tool.name}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2 pl-[3.25rem]">
                                        {tool.description}
                                    </p>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
