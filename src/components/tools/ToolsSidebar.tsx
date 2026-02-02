'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Calculator, 
  Code2, 
  Terminal, 
  FileJson, 
  Split,
  Binary
} from 'lucide-react';
import { cn } from '@/lib/utils';

const tools = [
  {
    name: 'TikToken Counter',
    href: '/tools/token-counter',
    icon: Binary,
    description: 'Count tokens for GPT-4'
  },
  {
    name: 'LLM Pricing',
    href: '/tools/roi-calculator',
    icon: Calculator,
    description: 'Compare API costs'
  },
  {
    name: 'JSON to Pydantic',
    href: '/tools/json-to-pydantic',
    icon: FileJson,
    description: 'Convert JSON to Python'
  },
  {
    name: 'Prompt Generator',
    href: '/tools/prompt-generator',
    icon: Terminal,
    description: 'Optimize system prompts'
  },
  {
    name: 'RAG Visualizer',
    href: '/tools/rag-visualizer',
    icon: Split,
    description: 'Preview text chunking'
  }
];

// ... // Tooltip import removed
// Actually, to keep it simple and dependency-free for this shell, we'll just use title attributes or conditional rendering.

export function ToolsSidebar({ isCollapsed = false }: { isCollapsed?: boolean }) {
  const pathname = usePathname();

  return (
    <div className={cn("flex flex-col h-full py-4", isCollapsed ? "items-center px-2" : "px-4")}>
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

      <nav className="space-y-1 flex-1">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = pathname === tool.href;
          
          return (
            <Link
              key={tool.href}
              href={tool.href}
              title={isCollapsed ? tool.name : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg text-sm font-medium transition-colors min-h-[40px]",
                isCollapsed ? "justify-center px-2 py-2" : "px-3 py-2.5",
                isActive 
                  ? "bg-blue-900/20 text-blue-200" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              )}
            >
              <Icon className={cn("flex-shrink-0", isCollapsed ? "w-5 h-5" : "w-4 h-4")} />
              {!isCollapsed && (
                <div className="truncate">{tool.name}</div>
              )}
            </Link>
          );
        })}
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
