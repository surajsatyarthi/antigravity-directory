import { Metadata } from 'next';
import Link from 'next/link';
import { Terminal, Copy, Command, Sparkles, MessageSquare, Code, ArrowRight, Globe } from 'lucide-react';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: "Gemini 3 Coding Prompts | Antigravity Library",
  description: "Curated system prompts for Google Antigravity. Copy-paste optimized prompts for refactoring, testing, and documentation generation with Gemini 3.",
  openGraph: {
    title: "Gemini 3 Coding Prompts Library",
    description: "High-performance system prompts for agentic coding.",
  },
};

const promptCategories = [
  {
    id: "nextjs-agentic-patterns",
    title: "Next.js 15 Architecture",
    description: "Master Next.js 15 with Server Actions, Parallel Routes, and intelligent caching patterns.",
    icon: Globe,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    id: "python-fastapi-best-practices",
    title: "Python FastAPI Excellence",
    description: "Build high-performance, async Python APIs with Pydantic validation and dependency injection.",
    icon: Terminal,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    id: "react-typescript-modern",
    title: "Modern React Patterns",
    description: "Type-safe React state management, custom hooks, and reliable component patterns.",
    icon: Code,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    id: "docker-containerization",
    title: "Docker Security",
    description: "Secure, multi-stage Docker builds for Node.js and Python. Hardening guides included.",
    icon: Command,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    id: "typescript-advanced-types",
    title: "Advanced TypeScript",
    description: "Leveled-up patterns for generics, conditional types, and utility types.",
    icon: Sparkles,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  }
];

export default function PromptsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <div className="relative py-20 px-6 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Prompt Engineering</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Gemini 3 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">System Prompts</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The secret to Antigravity is the prompt. Browse our library of community-verified system instructions to supercharge your agentic workflow.
          </p>
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {promptCategories.map((category) => (
            <Link 
              key={category.id} 
              href={`/prompts/${category.id}`}
              className="group relative p-6 md:p-8 bg-[#0A0A0A] border border-white/10 rounded-3xl hover:border-emerald-500/50 transition-all duration-300 block"
            >
              <div className="flex items-start justify-between mb-8">
                <div className={`p-4 rounded-2xl ${category.bg}`}>
                  <category.icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <div className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-gray-500 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                  View Prompt
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">
                {category.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed mb-8 min-h-[80px]">
                {category.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex -space-x-2">
                   <div className="w-8 h-8 rounded-full bg-gray-800 border border-black flex items-center justify-center text-xs">AI</div>
                   <div className="w-8 h-8 rounded-full bg-gray-700 border border-black flex items-center justify-center text-xs">+2</div>
                </div>
                <span className="flex items-center gap-1 text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                  Use Prompt <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}
