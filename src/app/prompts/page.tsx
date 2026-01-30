import { Metadata } from 'next';
import Link from 'next/link';
import { Terminal, Copy, Command, Sparkles, MessageSquare, Code, ArrowRight } from 'lucide-react';

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
    id: "refactoring",
    title: "Refactoring Agents",
    description: "Prompts to guide Gemini 3 in safely restructuring legacy codebases without breaking functionality.",
    icon: Code,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    id: "testing",
    title: "Test Generation",
    description: "System instructions for generating comprehensive unit and integration tests (Jest, Vitest, PyTest).",
    icon: Command,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    id: "documentation",
    title: "Auto-Documentation",
    description: "Prompts that force the AI to write clear, TSDoc/JSDoc compliant documentation.",
    icon: MessageSquare,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
  {
    id: "architecture",
    title: "System Architecture",
    description: "High-level planning prompts for designing scalable microservices and database schemas.",
    icon: Terminal,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  }
];

export default function PromptsPage() {
  return (
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
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promptCategories.map((category) => (
            <div 
              key={category.id} 
              className="group relative p-8 bg-[#0A0A0A] border border-white/10 rounded-3xl hover:border-emerald-500/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-8">
                <div className={`p-4 rounded-2xl ${category.bg}`}>
                  <category.icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <div className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-gray-500">
                  Coming Soon
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">
                {category.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed mb-8">
                {category.description}
              </p>
              
              <div className="bg-black/50 rounded-xl p-4 border border-white/5 font-mono text-xs text-gray-500 overflow-hidden relative">
                <div className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded cursor-pointer transition-colors">
                    <Copy className="w-3 h-3 text-gray-400" />
                </div>
                <code>
                  Thinking Process...<br/>
                  Analyze the codebase dependency graph...<br/>
                  Identify circular deviations...
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
