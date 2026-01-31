
export interface Prompt {
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  updated: string;
  content: string;
  vs: {
    cursor: string;
    windsurf: string;
  };
}

export const PROMPTS: Record<string, Prompt> = {
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
