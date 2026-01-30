'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { Copy, Terminal, Check, Zap, ArrowRight, Code2, Globe, Shield, Scale } from 'lucide-react';
import Link from 'next/link';

// NOTE: In a real app, this would come from a database or MDX files
const PROMPTS = {
  'nextjs-agentic-patterns': {
    title: "Next.js 15 Agentic Architecture",
    description: "Master Next.js 15 with this comprehensive system prompt. Forces the AI to use Server Actions, Parallel Routes, and intelligent caching patterns optimized for Gemini 3's reasoning.",
    category: "Architecture",
    tags: ["Next.js 15", "React Server Components", "Server Actions", "Turbopack"],
    author: "Antigravity Team",
    updated: "2026-01-30",
    content: `# Next.js 15 Agentic Development Guide

You are an expert Next.js 15 architect powered by Gemini 3. Your goal is to generate scalable, secure, and performant code following the Antigravity "Server-First" doctrine.

## Core Rules
1. **Server Components by Default:** All components are Server Components unless \`use client\` is explicitly required for interactivity (onClick, useState, useEffect).
2. **Server Actions for Mutations:** Do NOT use API Routes for form submissions. Use Server Actions in \`src/actions\`.
3. **Zod Validation:** All inputs MUST be validated with Zod before processing.
4. **Suspense Streaming:** Wrap all async data fetching components in \`<Suspense>\` boundaries.

## Folder Structure
Use the App Router standard:
- \`src/app/page.tsx\` (Home)
- \`src/app/layout.tsx\` (Root Layout)
- \`src/components/ui\` (Radix/Shadcn primitives)

## Code Style
- Use TypeScript strict mode.
- Prefer \`const\` over \`let\`.
- Use Tailwind CSS for styling with \`cn()\` utility.

GENERATE CODE ONLY. NO EXPLANATION UNLESS REQUESTED.`,
    vs: {
      cursor: "Cursor often hallucinates Client Components for Server Actions. Antigravity enforces strict architectural boundaries.",
      windsurf: "Windsurf struggles with Next.js 15 distinct caching mechanisms. Antigravity includes pre-configured caching rules."
    }
  }
};

export default function PromptDetailPage({ params }: { params: { slug: string } }) {
  const prompt = PROMPTS[params.slug as keyof typeof PROMPTS];
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'vs'>('prompt');

  if (!prompt) {
    // For demo purposes, fallback to the main one if slug doesn't match
    if (params.slug !== 'nextjs-agentic-patterns') return notFound();
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-gray-200">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": prompt.title,
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />

      {/* Hero Section */}
      <div className="relative py-20 px-6 border-b border-white/10 bg-[#050505]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-blue-400 font-bold uppercase tracking-widest mb-6">
            <Link href="/prompts" className="hover:underline">Prompts</Link>
            <span className="text-gray-600">/</span>
            <span>{prompt.category}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            {prompt.title}
          </h1>
          
          <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-2xl">
            {prompt.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {prompt.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Verified by Antigravity</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-500" />
              <span>Gemini 3 Optimized</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setActiveTab('prompt')}
                className={`text-sm font-bold transition-colors ${activeTab === 'prompt' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
              >
                System Prompt
              </button>
              <button 
                onClick={() => setActiveTab('vs')}
                className={`text-sm font-bold transition-colors flex items-center gap-2 ${activeTab === 'vs' ? 'text-purple-400' : 'text-gray-500 hover:text-purple-400'}`}
              >
                <Scale className="w-4 h-4" />
                VS Competitors
              </button>
            </div>
            
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Prompt
                </>
              )}
            </button>
          </div>

          {/* Content Area */}
          <div className="p-0 min-h-[400px] relative">
            {activeTab === 'prompt' ? (
              <pre className="p-6 font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {prompt.content}
              </pre>
            ) : (
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
                    <h3 className="text-lg font-bold text-red-200 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      VS Cursor
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {prompt.vs.cursor}
                    </p>
                  </div>
                  <div className="p-6 rounded-xl bg-orange-500/5 border border-orange-500/20">
                    <h3 className="text-lg font-bold text-orange-200 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      VS Windsurf
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {prompt.vs.windsurf}
                    </p>
                  </div>
                </div>
                <div className="mt-8 p-6 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
                  <h3 className="text-lg font-bold text-purple-200 mb-2">Why Antigravity Wins</h3>
                  <p className="text-gray-400 text-sm max-w-lg mx-auto">
                    Antigravity prompts are strictly validated against the Gemini 3 context window limits and include Ralph Protocol guardrails by default.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Usage Guide */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
              <Copy className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white mb-2">1. Copy</h3>
            <p className="text-sm text-gray-500">Click the copy button to get the raw system instruction optimized for token efficiency.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white mb-2">2. Paste</h3>
            <p className="text-sm text-gray-500">Paste directly into your IDE's agent instructions or `.cursorrules` file.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white mb-2">3. Execute</h3>
            <p className="text-sm text-gray-500">Watch Gemini 3 adhere to strict architectural patterns without hallucination.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
