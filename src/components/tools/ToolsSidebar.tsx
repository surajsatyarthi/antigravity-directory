'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { toolsCategories } from '@/lib/tools-config';

// ... // Tooltip import removed
// Actually, to keep it simple and dependency-free for this shell, we'll just use title attributes or conditional rendering.

export function ToolsSidebar({ isCollapsed = false }: { isCollapsed?: boolean }) {
  const pathname = usePathname();

  return (
    <div className={cn("flex flex-col h-full py-4 bg-black/50 backdrop-blur-xl border-r border-white/5", isCollapsed ? "items-center" : "")}>
      {!isCollapsed && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white px-2 truncate">
            AI Developer Tools
          </h2>
          <p className="text-xs text-slate-400 px-2 truncate">
            Free utilities for AI engineering
          </p>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-4 space-y-6">
        {toolsCategories.map((section) => (
          <div key={section.category}>
            {!isCollapsed && (
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-2">
                {section.category}
              </h3>
            )}
            <div className="space-y-0.5">
              {section.items.map((tool) => {
                const Icon = tool.icon;
                const isActive = pathname === tool.href;
                
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    title={isCollapsed ? tool.name : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg text-sm font-medium transition-colors",
                      isCollapsed ? "justify-center p-2" : "px-3 py-2",
                      isActive 
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" 
                        : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
                    )}
                  >
                    <Icon className={cn("flex-shrink-0", isCollapsed ? "w-5 h-5" : "w-4 h-4")} />
                    {!isCollapsed && (
                      <span className="truncate">{tool.name}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {!isCollapsed && (
        <div className="mt-auto p-4 bg-blue-900/10 rounded-lg border border-blue-500/20">
          <h3 className="font-semibold text-blue-200 text-sm mb-2">
            Building AI Apps?
          </h3>
          <p className="text-xs text-blue-300/80 mb-3">
            Find the best databases, auth, and hosting for your next project.
          </p>
          <Link 
            href="/"
            className="block w-full text-center py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded transition"
          >
            Browse Directory
          </Link>
        </div>
      )}
    </div>
  );
}
