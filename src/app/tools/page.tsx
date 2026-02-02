import { ToolsSidebar } from "@/components/tools/ToolsSidebar";
import Link from "next/link";
import { 
  Calculator, 
  Terminal, 
  FileJson, 
  Split,
  Binary,
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: 'Free AI Developer Tools | Antigravity',
  description: 'Essential utilities for AI engineering: Token counters, pricing calculators, and prompt optimizers.',
};

const tools = [
  {
    name: 'TikToken Counter',
    href: '/tools/token-counter',
    icon: Binary,
    description: 'Accurately count tokens for GPT-4, Claude, and Llama models to optimize context usage and costs.',
    color: 'text-blue-400 bg-blue-900/20'
  },
  {
    name: 'LLM ROI Calculator',
    href: '/tools/roi-calculator',
    icon: Calculator,
    description: 'Compare API costs across providers (OpenAI, Anthropic, Google) to find the most cost-effective model.',
    color: 'text-green-400 bg-green-900/20'
  },
  {
    name: 'JSON to Pydantic',
    href: '/tools/json-to-pydantic',
    icon: FileJson,
    description: 'Instantly convert JSON objects into Python Pydantic (v1/v2) class definitions for structured data validation.',
    color: 'text-amber-500 bg-amber-900/20'
  },
  {
    name: 'System Prompt Generator',
    href: '/tools/prompt-generator',
    icon: Terminal,
    description: 'Generate structured, robust system instructions to improve LLM reliability and output quality.',
    color: 'text-purple-400 bg-purple-900/20'
  },
  {
    name: 'RAG Chunking Visualizer',
    href: '/tools/rag-visualizer',
    icon: Split,
    description: 'Visualizer how your text splits into chunks for vector databases. Debug retrieval issues visually.',
    color: 'text-rose-400 bg-rose-900/20'
  }
];

export default function ToolsIndexPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-white mb-4">
          Free AI Developer Utilities
        </h1>
        <p className="text-slate-400 text-lg">
          A collection of lightweight, client-side tools designed to speed up your AI engineering workflow. No signup required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link 
              key={tool.href} 
              href={tool.href}
              className="group block p-6 rounded-xl border border-white/10 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all bg-card"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${tool.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                    {tool.name}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500" />
                  </h3>
                  <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
