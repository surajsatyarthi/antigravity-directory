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
  },
  'react-typescript-modern': {
    title: "Modern React TypeScript Patterns",
    description: "The definitive guide to type-safe React state management, custom hooks, and reliable component patterns for large-scale applications.",
    category: "Frontend",
    tags: ["React 19", "TypeScript", "Hooks", "Zustand"],
    author: "Antigravity Team",
    updated: "2026-01-30",
    content: `# Modern React TypeScript Development

Master modern React development with TypeScript using Google Antigravity IDE. This comprehensive guide covers component patterns, hooks, and type-safe state management.

## Component Patterns
\`\`\`typescript
// components/Button.tsx
import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, className, ...props }, ref) => {
    // Implementation
  }
);
\`\`\`

## Best Practices
- Use strict TypeScript configuration
- Apply proper generic constraints
- Create typed context with null checks
- Use discriminated unions for state`,
    vs: {
      cursor: "Cursor's TypeScript inference is often too loose (using `any`). Antigravity forces strict typing for long-term maintainability.",
      windsurf: "Windsurf misses subtle React 19 concurrent features. Antigravity proactively suggests `useActionState` and `useOptimistic`."
    }
  },
  'python-fastapi-best-practices': {
    title: "Python FastAPI Excellence",
    description: "Build high-performance, async Python APIs with Pydantic validation and dependency injection. Optimized for Gemini 3's Python reasoning.",
    category: "Backend",
    tags: ["Python", "FastAPI", "Pydantic", "Async"],
    author: "Antigravity Team",
    updated: "2026-01-30",
    content: `# Python FastAPI Best Practices

Master API development with FastAPI using Google Antigravity IDE. This comprehensive guide covers routing, validation, authentication, and performance optimization.

## Application Structure
\`\`\`python
# app/main.py
from fastapi import FastAPI
from app.api import router
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)
app.include_router(router, prefix="/api/v1")
\`\`\`

## Pydantic Models
\`\`\`python
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
\`\`\`

## Best Practices
- Use Pydantic for request/response validation
- Apply dependency injection for shared logic
- Use async database sessions`,
    vs: {
      cursor: "Cursor struggles with Python's complex async context. Antigravity ensures valid `await` placement in all FastAPI routes.",
      windsurf: "Windsurf's Pydantic generation is often outdated (v1). Antigravity defaults to Pydantic v2 best practices."
    }
  },
  'docker-containerization': {
    title: "Docker Production Security",
    description: "Secure, multi-stage Docker builds for Node.js and Python. Includes hardening guides and size optimization techniques.",
    category: "DevOps",
    tags: ["Docker", "Kubernetes", "Security", "CI/CD"],
    author: "Antigravity Team",
    updated: "2026-01-30",
    content: `# Docker Containerization Best Practices

Master Docker containerization with Google Antigravity IDE. This comprehensive guide covers multi-stage builds, security hardening, and production optimization.

## Multi-Stage Dockerfile
\`\`\`dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:20-alpine AS builder
COPY . .
RUN npm run build
\`\`\`

## Security Hardening
- Run containers as non-root users
- Implement proper health checks
- Use .dockerignore to exclude unnecessary files`,
    vs: {
      cursor: "Cursor generates bloated Dockerfiles. Antigravity enforces multi-stage builds to reduce image size by up to 90%.",
      windsurf: "Windsurf often forgets security contexts. Antigravity adds `USER node` and header hardening by default."
    }
  },
  'typescript-advanced-types': {
    title: "Advanced TypeScript Architecture",
    description: "Leveled-up patterns for generics, conditional types, and utility types. Stop fighting the compiler and start making it work for you.",
    category: "Language",
    tags: ["TypeScript", "Generics", "Utility Types"],
    author: "Antigravity Team",
    updated: "2026-01-30",
    content: `# Advanced TypeScript Types & Generics

Master advanced TypeScript type system with Google Antigravity IDE.

## Conditional Types
\`\`\`typescript
type IsString<T> = T extends string ? true : false;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
\`\`\`

## Mapped Types
\`\`\`typescript
type Optional<T> = { [K in keyof T]?: T[K] };
\`\`\`

## Best Practices
- Use generics for reusable type-safe code
- Leverage mapped types for object manipulation
- Document complex types with JSDoc`,
    vs: {
      cursor: "Cursor gives up on complex generics. Antigravity excels at recursive type definitions and inference.",
      windsurf: "Windsurf simplifies types to `any` too often. Antigravity maintains strict type safety even in complex utility chains."
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
