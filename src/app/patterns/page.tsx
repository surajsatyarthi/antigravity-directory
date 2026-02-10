import { Metadata } from 'next';
import Link from 'next/link';
import { Code2, Cpu, Globe, Database, Shield, Zap, ArrowRight, Layout, Server, Layers } from 'lucide-react';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: "Antigravity Design Patterns | Architecture for Agentic AI",
  description: "A comprehensive library of architecture patterns for Google Antigravity. Copy-paste configurations for Next.js, Python, Rust, and MCP servers.",
  openGraph: {
    title: "Antigravity Design Patterns",
    description: "Architectural blueprints for Gemini 3 agents. Standardize your agentic codebase.",
  },
};

const patterns = [
  {
    id: "nextjs-agentic",
    title: "Next.js Agentic Patterns",
    description: "Optimal folder structures and middleware for AI-controlled Next.js 15 applications.",
    icon: Globe,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    count: "12 Patterns"
  },
  {
    id: "python-backend",
    title: "Python FastAPI Agents",
    description: "Async patterns for high-performance Python agents communicating with Gemini 3.",
    icon: Code2,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    count: "8 Patterns"
  },
  {
    id: "rust-mcp",
    title: "Rust MCP Servers",
    description: "Memory-safe implementations of the Model Context Protocol in Rust.",
    icon: Database,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    count: "5 Patterns"
  },
  {
    id: "docker-orchestration",
    title: "Docker Orchestration",
    description: "Containerization strategies for isolating dangerous agentic workflows.",
    icon: Server,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    count: "7 Patterns"
  },
  {
    id: "security-guardrails",
    title: "Security Guardrails",
    description: "Implementation of the Ralph Protocol verification gates in CI/CD.",
    icon: Shield,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    count: "15 Patterns"
  },
  {
    id: "state-management",
    title: "Agentic State Management",
    description: "Managing context windows and memory across long-running agent sessions.",
    icon: Layers,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    count: "9 Patterns"
  }
];

export default function PatternsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
      <div className="relative py-20 px-6 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Layout className="w-4 h-4" />
            <span>Architecture Library</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Antigravity <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Design Patterns</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Stop reinventing the wheel. Use proven architectural blueprints for Google Antigravity to build scalable, secure agentic applications.
          </p>
        </div>
      </div>

      {/* Patterns Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {patterns.map((pattern) => (
            <Link 
              key={pattern.id} 
              href={`/patterns/${pattern.id}`}
              className="group relative p-6 bg-[#0A0A0A] border border-white/10 rounded-2xl hover:border-purple-500/50 transition-all duration-300"
            >
              <div className={`p-3 rounded-xl ${pattern.bg} w-fit mb-6 group-hover:scale-110 transition-transform`}>
                <pattern.icon className={`w-6 h-6 ${pattern.color}`} />
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                {pattern.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6 min-h-[60px]">
                {pattern.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs font-mono text-gray-500">{pattern.count}</span>
                <span className="flex items-center gap-1 text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                  View Patterns <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-3xl p-10 text-center border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Submit a Pattern</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Have you discovered a novel architecture for Gemini 3 agents? Contribute to the library and get featured.
            </p>
            <Link href="/submit" className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all text-lg">
              Submit Blueprint
            </Link>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
