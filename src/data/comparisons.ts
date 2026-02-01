import { Swords, Zap, Brain, Code, Terminal, Cloud, Layers, Box } from 'lucide-react';

export interface ComparisonRow {
  feature: string;
  p1: string; // Competitor Value
  p2: string; // Antigravity Value
  p2Win: boolean;
  note: string;
}

export interface ComparisonData {
  id: string; // URL slug
  title: string;
  subtitle: string;
  p1: string; // Competitor Name
  p2: string; // Our Name (Antigravity)
  winner: string;
  summary: string;
  description: string; // For the card on index page
  score: string; // For the card on index page
  category: "IDE" | "Framework" | "Infrastructure";
  tags: string[];
  rows: ComparisonRow[];
}

export const COMPARISONS: Record<string, ComparisonData> = {
  // --- BATCH 1: THE GIANTS (IDEs) ---
  'cursor-vs-antigravity': {
    id: "cursor-vs-antigravity",
    title: "Cursor vs Antigravity",
    subtitle: "The Generalist vs The Specialist",
    p1: "Cursor",
    p2: "Antigravity",
    winner: "Antigravity",
    summary: "Cursor is a general-purpose AI editor. Antigravity is a specialized 'Reasoning Environment' for Gemini 3. If you want autocomplete, use Cursor. If you want architecture, use Antigravity.",
    description: "Cursor is great for general coding. Antigravity is built exclusively for Gemini 3 Agentic workflows.",
    score: "9.8/10",
    category: "IDE",
    tags: ["Agentic AI", "Gemini 3", "System Prompts"],
    rows: [
      { feature: "Core Model", p1: "Claude 3.5 Sonnet", p2: "Gemini 3 Pro", p2Win: true, note: "Gemini 3 has 2M token context vs Claude's 200k." },
      { feature: "Reasoning Depth", p1: "Standard", p2: "Deep Reasoning", p2Win: true, note: "Antigravity forces 'Think before Code' protocols." },
      { feature: "Context Window", p1: "200k Tokens", p2: "2,000,000 Tokens", p2Win: true, note: "Antigravity holds your entire repo in memory." },
      { feature: "IDE Integration", p1: "Visual Studio Code Fork", p2: "Protocol Layer", p2Win: false, note: "Cursor wins on native IDE feel. Antigravity is a protocol." },
      { feature: "Cost", p1: "$20/mo", p2: "Free (Local)", p2Win: true, note: "Antigravity runs on your own API keys." }
    ]
  },
  'windsurf-vs-antigravity': {
    id: "windsurf-vs-antigravity",
    title: "Windsurf vs Antigravity",
    subtitle: "Flow State vs Deep Reasoning",
    p1: "Windsurf",
    p2: "Antigravity",
    winner: "Antigravity",
    summary: "Windsurf is designed for 'Flow' and autocomplete. Antigravity is designed for 'Architectural Rigor' and long-horizon planning.",
    description: "Windsurf focuses on autocomplete. Antigravity focuses on architectural reasoning and planning.",
    score: "Win",
    category: "IDE",
    tags: ["IDE", "Workflow", "Planning"],
    rows: [
      { feature: "Primary Goal", p1: "Speed / Autocomplete", p2: "Accuracy / Architecture", p2Win: true, note: "Speed kills if you build the wrong thing." },
      { feature: "Project Awareness", p1: "RAG (Chunks)", p2: "Full Context (2M)", p2Win: true, note: "Windsurf guesses context. Antigravity knows it." },
      { feature: "Agentic Capabilities", p1: "Basic Tools", p2: "MCP Native", p2Win: true, note: "Antigravity is built on the Model Context Protocol." }
    ]
  },
  'bolt-vs-antigravity': {
    id: "bolt-vs-antigravity",
    title: "Bolt.new vs Antigravity",
    subtitle: "Browser Sandbox vs Local Power",
    p1: "Bolt.new",
    p2: "Antigravity",
    winner: "Antigravity",
    summary: "Bolt is amazing for quick prototypes in the browser. Antigravity is for serious, production-grade engineering on your local machine.",
    description: "Bolt is great for demos. Antigravity is for production applications.",
    score: "Win",
    category: "IDE",
    tags: ["Web Containers", "Production", "Localhost"],
    rows: [
      { feature: "Environment", p1: "Browser (WebContainer)", p2: "Local Filesystem", p2Win: true, note: "Browser sandboxes cannot access your real database." },
      { feature: "Persistence", p1: "Ephemeral", p2: "Permanent", p2Win: true, note: "Bolt projects vanish. Antigravity builds real repos." },
      { feature: "Scale", p1: "Small Demos", p2: "Enterprise Monorepos", p2Win: true, note: "Try loading a 5GB repo in Bolt. It crashes." }
    ]
  },
  'replit-vs-antigravity': {
    id: "replit-vs-antigravity",
    title: "Replit vs Antigravity",
    subtitle: "Cloud Hosting vs Local Control",
    p1: "Replit",
    p2: "Antigravity",
    winner: "Antigravity",
    summary: "Replit wants to own your entire stack (hosting, editor, db). Antigravity wants to empower your existing local workflow.",
    description: "Replit locks you in. Antigravity frees you.",
    score: "Win",
    category: "IDE",
    tags: ["Cloud IDE", "Lock-in", "Freedom"],
    rows: [
      { feature: "Ownership", p1: "Platform Rent", p2: "You Own It", p2Win: true, note: "If Replit bans you, you lose everything." },
      { feature: "Cost Scaling", p1: "Per User / Usage", p2: "Flat (API Keys)", p2Win: true, note: "Replit gets expensive fast." },
      { feature: "Offline Capable", p1: "No", p2: "Yes", p2Win: true, note: "Code on an airplane? Only with Antigravity." }
    ]
  },

  // --- BATCH 2: THE STACKS (Frameworks) ---
  'nextjs-vs-remix': {
    id: "nextjs-vs-remix",
    title: "Next.js vs Remix",
    subtitle: "Server Actions vs Loaders",
    p1: "Remix",
    p2: "Next.js",
    winner: "Next.js",
    summary: "Remix popularized data loaders, but Next.js 15's Server Actions + React Server Components provide a superior primitive for Agentic AI to reason about.",
    description: "Why we standardized on Next.js 15 for all Antigravity agent patterns.",
    score: "Win",
    category: "Framework",
    tags: ["Architecture", "React", "Performance"],
    rows: [
        { feature: "AI Reasoning", p1: "Loaders (Implicit)", p2: "Server Actions (Explicit)", p2Win: true, note: "Agents understand functions better than HTTP loaders." },
        { feature: "Ecosystem", p1: "Small", p2: "Massive", p2Win: true, note: "More 'Copy-Paste' patterns available for Next.js." },
        { feature: "Deployment", p1: "Edge/Node", p2: "Vercel Optimized", p2Win: true, note: "Zero-config deployment is crucial for rapid agent iteration." }
    ]
  },
  'fastapi-vs-flask': {
    id: "fastapi-vs-flask",
    title: "FastAPI vs Flask",
    subtitle: "Modern Async vs Legacy Sync",
    p1: "Flask",
    p2: "FastAPI",
    winner: "FastAPI",
    summary: "Flask is legacy. FastAPI is the standard for AI Agents due to native async support and Pydantic validation.",
    description: "Why Python Agents must use FastAPI over Flask.",
    score: "Win",
    category: "Framework",
    tags: ["Python", "API", "Async"],
    rows: [
        { feature: "Type Safety", p1: "None", p2: "Pydantic", p2Win: true, note: "Agents need strict schemas to function reliably." },
        { feature: "Concurrency", p1: "Sync (Blocking)", p2: "Async (Native)", p2Win: true, note: "Streaming LLM tokens requires async." },
        { feature: "Documentation", p1: "Manual", p2: "Auto (OpenAPI)", p2Win: true, note: "Agents can read OpenAPI specs automatically." }
    ]
  },
  'supabase-vs-firebase': {
    id: "supabase-vs-firebase",
    title: "Supabase vs Firebase",
    subtitle: "SQL Power vs NoSQL Lock-in",
    p1: "Firebase",
    p2: "Supabase",
    winner: "Supabase",
    summary: "Firebase is easy to start but hard to scale (NoSQL hell). Supabase gives you a full Postgres DB, which is essential for Vector Search (pgvector) in AI agents.",
    description: "Why AI Agents need Postgres (Supabase) over NoSQL (Firebase).",
    score: "Win",
    category: "Infrastructure",
    tags: ["Database", "Vector Search", "Postgres"],
    rows: [
        { feature: "Vector Search", p1: "No (External)", p2: "Native (pgvector)", p2Win: true, note: "RAG is impossible without vectors. Supabase has it built-in." },
        { feature: "Query Power", p1: "Limited (NoSQL)", p2: "Full SQL", p2Win: true, note: "Complex agent queries need SQL joins, not NoSQL scans." },
        { feature: "Lock-in", p1: "High (Proprietary)", p2: "Zero (Open Source)", p2Win: true, note: "You can self-host Supabase. You cannot self-host Firebase." }
    ]
  },
  'claude-vs-chatgpt': {
    id: 'claude-vs-chatgpt',
    title: 'Claude vs ChatGPT for Coding',
    subtitle: 'Code Generation vs Architectural Reasoning',
    p1: 'ChatGPT',
    p2: 'Claude',
    winner: 'Claude',
    summary: 'ChatGPT is great for simple scripts and boilerplate. Claude 3.5 Sonnet excels at complex reasoning, large-scale refactors, and maintaining context across massive repositories.',
    description: 'Agentic perspective comparing Claude and ChatGPT for software development, code generation, and debugging.',
    score: 'Win',
    category: 'IDE',
    tags: ['AI Models', 'Coding Assistant', 'LLM Comparison'],
    rows: [
      {
        feature: 'Code Generation',
        p1: 'Strong at boilerplate and common patterns. Excellent for standard CRUD, REST APIs, and frontend components.',
        p2: 'Superior at complex logic and edge cases. Better at understanding context and generating production-ready code with error handling.',
        p2Win: true,
        note: 'Claude generates closer-to-production code.'
      },
      {
        feature: 'Debugging & Error Fixing',
        p1: 'Good at identifying syntax errors and common bugs. Can suggest fixes for standard issues.',
        p2: 'Exceptional at root cause analysis. Traces errors across files, understands stack traces deeply, suggests architectural fixes.',
        p2Win: true,
        note: 'Claude reasons through the error stack.'
      },
      {
        feature: 'Code Explanation',
        p1: 'Provides clear explanations of code functionality. Good for learning and documentation.',
        p2: 'Outstanding at explaining "why" not just "what". Breaks down complex algorithms, provides context on design patterns.',
        p2Win: true,
        note: 'Claude explains the intent, not just the syntax.'
      },
      {
        feature: 'Refactoring',
        p1: 'Suggests standard optimizations (e.g., reduce loops, use better data structures).',
        p2: 'Proposes architectural improvements. Identifies code smells, suggests SOLID principles application, performance bottlenecks.',
        p2Win: true,
        note: 'Claude refactors for long-term maintainability.'
      },
      {
        feature: 'Multi-File Context',
        p1: '128K context (GPT-4 Turbo). Struggles with large codebases beyond token limit.',
        p2: '200K context window. Maintains coherence across entire repositories, understands cross-file dependencies better.',
        p2Win: true,
        note: 'Claude holds more file context in memory.'
      },
      {
        feature: 'API & Ecosystem',
        p1: 'API access via OpenAI SDK. Massive ecosystem. Advanced Voice Mode.',
        p2: 'API access via Anthropic SDK. Growing ecosystem. Stronger for coding tasks specifically.',
        p2Win: false,
        note: 'OpenAI ecosystem is currently larger.'
      },
      {
        feature: 'Pricing',
        p1: 'ChatGPT Plus: $20/mo. API: $0.002/1K tokens (GPT-3.5), $0.03/1K (GPT-4).',
        p2: 'Claude Pro: $20/mo. API: $0.008/1K tokens (Claude 3.5 Sonnet).',
        p2Win: false,
        note: 'Pricing structure is similar for Pro plans.'
      },
      {
        feature: 'Speed',
        p1: 'Fast response times, especially GPT-3.5 Turbo. GPT-4o is very fast.',
        p2: 'Claude 3.5 Sonnet is comparable to GPT-4o speed. Haiku is extremely fast.',
        p2Win: false,
        note: 'Both are highly performant.'
      },
      {
        feature: 'Tool Use',
        p1: 'Excellent function calling support. Well-integrated with third-party tools.',
        p2: 'Strong tool use capabilities. Reliable at following complex tool schemas.',
        p2Win: true,
        note: 'Claude is slightly more consistent with complex schemas.'
      },
      {
        feature: 'Agentic Workflow',
        p1: 'Good at single-turn generation. Can lose context in long sessions.',
        p2: 'Exceptional at agentic workflows. Maintains task context, iterates solutions, asks clarifying questions.',
        p2Win: true,
        note: 'Claude is the preferred model for autonomous agents.'
      }
    ]
  },
  'copilot-vs-cursor': {
    id: 'copilot-vs-cursor',
    title: 'GitHub Copilot vs Cursor',
    subtitle: 'Autocomplete vs Agentic IDE',
    p1: 'GitHub Copilot',
    p2: 'Cursor',
    winner: 'Cursor',
    summary: 'GitHub Copilot is an excellent autocomplete tool that lives in your sidebar. Cursor is a complete AI-native IDE that understands your entire codebase and can perform autonomous edits.',
    description: 'Compare GitHub Copilot and Cursor IDE for AI-powered coding assistance, autocomplete, and agentic workflows.',
    score: 'Win',
    category: 'IDE',
    tags: ['Code Editor', 'AI Assistant', 'Productivity'],
    rows: [
      {
        feature: 'Integration',
        p1: 'VS Code extension + JetBrains plugin. Works inside existing IDE.',
        p2: 'Standalone VS Code fork. Full IDE control enabling deeper AI integration.',
        p2Win: true,
        note: 'Cursor has deeper control over the editor UI.'
      },
      {
        feature: 'Autocomplete',
        p1: 'Excellent inline suggestions via OpenAI Codex. Fast and accurate.',
        p2: 'Good autocomplete (Copilot++). Uses custom models. Predictive edits.',
        p2Win: false,
        note: 'Copilot is widely considered the gold standard for pure autocomplete.'
      },
      {
        feature: 'Codebase Context',
        p1: 'Limited to open files. No native full-codebase indexing.',
        p2: 'Indexes entire codebase (RAG). AI understands cross-file dependencies.',
        p2Win: true,
        note: 'Cursor "knows" your project structure.'
      },
      {
        feature: 'Chat Interface',
        p1: 'Sidebar chat. Can ask about open file.',
        p2: 'Integrated chat with @-mentions for files, docs, and codebase.',
        p2Win: true,
        note: 'Cursor chat is context-aware via @ symbols.'
      },
      {
        feature: 'Agentic Features',
        p1: 'Autocomplete focused. Limited autonomous editing.',
        p2: 'Cmd+K for inline AI edits. Composer for multi-file autonomous changes.',
        p2Win: true,
        note: 'Cursor Composer is a game changer for multi-file edits.'
      },
      {
        feature: 'Pricing',
        p1: '$10/mo (individual). Included in GitHub Enterprise.',
        p2: '$20/mo (Pro). Free tier available.',
        p2Win: false,
        note: 'Copilot is cheaper for individuals.'
      },
      {
        feature: 'Speed',
        p1: 'Very fast autocomplete (<100ms latency).',
        p2: 'Autocomplete is fast. Chat/Composer depends on model choice.',
        p2Win: false,
        note: 'Copilot feels slightly snappier for simple completions.'
      },
      {
        feature: 'Language Support',
        p1: 'Excellent for Python, JS, TS, Go, Ruby.',
        p2: 'Supports all VS Code languages. Better at niche ones via context.',
        p2Win: false,
        note: 'Both support major languages well.'
      },
      {
        feature: 'Privacy',
        p1: 'Code sent to OpenAI. Enterprise has privacy guarantees.',
        p2: 'Code sent to LLM provider. Privacy mode available.',
        p2Win: false,
        note: 'Both have strong privacy controls for enterprise.'
      },
      {
        feature: 'Best Use Case',
        p1: 'Fast autocomplete, minimal disruption.',
        p2: 'Agentic coding, heavy refactoring, large codebases.',
        p2Win: true,
        note: 'Cursor changes how you write code; Copilot helps you write it faster.'
      }
    ]
  },
  'vercel-vs-netlify': {
    id: 'vercel-vs-netlify',
    title: 'Vercel vs Netlify',
    subtitle: 'Next.js Specialist vs JAMstack Generalist',
    p1: 'Netlify',
    p2: 'Vercel',
    winner: 'Vercel',
    summary: 'Netlify pioneered the JAMstack movement and remains strong for static sites. Vercel is laser-focused on Next.js and delivers superior raw performance, especially for dynamic applications with React Server Components.',
    description: 'Performance benchmarks show Vercel leads in deployment speed, edge functions, and Next.js optimization.',
    score: 'Win',
    category: 'Infrastructure',
    tags: ['Hosting', 'Edge Functions', 'Next.js'],
    rows: [
      {
        feature: 'Performance (TTFB)',
        p1: 'Europe: 156ms, North America: 124ms, Asia: 243ms',
        p2: 'Europe: 112ms, North America: 89ms, Asia: 201ms',
        p2Win: true,
        note: 'Vercel is 21-39% faster across all regions (2025 benchmarks).'
      },
      {
        feature: 'Build Speed',
        p1: '2-3 minutes (avg)',
        p2: '1-2 minutes (optimized caching)',
        p2Win: true,
        note: 'Vercel builds are approximately 50% faster.'
      },
      {
        feature: 'Next.js Integration',
        p1: 'Supported (community-driven)',
        p2: 'Native (first-class SSR, ISR support)',
        p2Win: true,
        note: 'Vercel is made by the Next.js team. Zero-config deployment.'
      },
      {
        feature: 'Edge Functions',
        p1: 'Deno-based, 50ms execution limit',
        p2: 'V8 isolates, 9x faster cold starts, 25s start limit',
        p2Win: true,
        note: 'Vercel edge functions can handle longer-running tasks.'
      },
      {
        feature: 'Free Tier',
        p1: '100GB bandwidth, 20 deploys/month (credit-based)',
        p2: '100GB bandwidth, 1M edge requests, unlimited deploys',
        p2Win: true,
        note: 'Netlify reduced free tier to 20 deploys in Sept 2025.'
      },
      {
        feature: 'Pricing (Pro)',
        p1: '$19/member/month, 1TB bandwidth',
        p2: '$20/user/month, 1TB bandwidth, $20 credit',
        p2Win: false,
        note: 'Similar pricing; Vercel includes flexible credit system.'
      },
      {
        feature: 'JAMstack / Static Sites',
        p1: 'Excellent (multi-framework support)',
        p2: 'Good (Next.js static export)',
        p2Win: false,
        note: 'Netlify excels for non-Next.js static sites.'
      },
      {
        feature: 'Local Dev Parity',
        p1: 'Netlify Dev (strong local emulation)',
        p2: 'Vercel CLI (good, but less parity)',
        p2Win: false,
        note: 'Netlify Dev provides better local development experience.'
      },
      {
        feature: 'Best Use Case',
        p1: 'Static sites, JAMstack, multi-framework projects',
        p2: 'Next.js apps, dynamic/agentic AI apps, performance-critical sites',
        p2Win: true,
        note: 'Vercel wins for Next.js; Netlify for broader framework support.'
      }
    ]
  },
  'gemini-3-vs-claude-3.5': {
    id: 'gemini-3-vs-claude-3.5',
    title: 'Gemini 3 Pro vs Claude 3.5 Sonnet',
    subtitle: 'Massive Context vs Agentic Excellence',
    p1: 'Claude 3.5 Sonnet',
    p2: 'Gemini 3 Pro',
    winner: 'Depends',
    summary: 'Claude 3.5 Sonnet excels at agentic coding workflows and reasoning tasks with a 200K context window. Gemini 3 Pro offers a groundbreaking 2M token context—10x larger—enabling whole-codebase reasoning.',
    description: 'Claude leads in coding benchmarks (HumanEval 93.7%), but Gemini 3 Pro\'s 2M context window is revolutionary for massive codebases.',
    score: 'Tie',
    category: 'IDE',
    tags: ['AI Models', 'LLM', 'Coding'],
    rows: [
      {
        feature: 'MMLU (Knowledge)',
        p1: '88.7% (5-shot), 90.4% (5-shot CoT)',
        p2: '85.7% (0-shot CoT), 89.8% (MMLU-Pro)',
        p2Win: false,
        note: 'Claude 3.5 Sonnet leads on general knowledge benchmarks.'
      },
      {
        feature: 'HumanEval (Coding)',
        p1: '92.0% (0-shot), 93.7% (leaderboard)',
        p2: '~90.2% (Gemini 1.5 Pro), ~89.6%',
        p2Win: false,
        note: 'Claude 3.5 Sonnet is superior for code generation accuracy.'
      },
      {
        feature: 'Context Window',
        p1: '200,000 tokens',
        p2: '2,000,000 tokens (10x larger!)',
        p2Win: true,
        note: 'Gemini 3 Pro can hold entire monorepos in memory.'
      },
      {
        feature: 'Agentic Workflows',
        p1: 'Exceptional (industry-leading)',
        p2: 'Good (76.2% SWE-Bench Verified)',
        p2Win: false,
        note: 'Claude 3.5 Sonnet is the preferred model for autonomous agents.'
      },
      {
        feature: 'Pricing (per 1M tokens)',
        p1: '~$3/M input, $15/M output',
        p2: '~$7/M input, higher for massive context',
        p2Win: false,
        note: 'Claude 3.5 Sonnet is more cost-effective for most use cases.'
      },
      {
        feature: 'Speed',
        p1: 'Very fast (comparable to GPT-4o)',
        p2: 'Fast (Gemini 3 Flash is faster variant)',
        p2Win: false,
        note: 'Both are highly performant; Claude Haiku is fastest.'
      },
      {
        feature: 'Tool Use',
        p1: 'Strong, reliable with complex schemas',
        p2: 'Good, native to Google ecosystem',
        p2Win: false,
        note: 'Claude 3.5 Sonnet is slightly more consistent with complex tool schemas.'
      },
      {
        feature: 'Best Use Case',
        p1: 'Agentic coding, complex reasoning, multi-step tasks',
        p2: 'Massive codebases (>1M tokens), architecture planning',
        p2Win: true,
        note: 'Choose Claude for agility; Gemini 3 for scale.'
      }
    ]
  },
  'supabase-vs-planetscale': {
    id: 'supabase-vs-planetscale',
    title: 'Supabase vs PlanetScale',
    subtitle: 'Postgres BaaS vs MySQL Scale',
    p1: 'PlanetScale',
    p2: 'Supabase',
    winner: 'Supabase',
    summary: 'PlanetScale excels at horizontal MySQL scaling with Vitess. Supabase provides a complete Backend-as-a-Service with native pgvector for AI applications, and is "several orders of magnitude cheaper."',
    description: 'For AI agents needing vector search, Supabase\'s native pgvector integration and BaaS features make it the clear winner.',
    score: 'Win',
    category: 'Infrastructure',
    tags: ['Database', 'Vector Search', 'BaaS'],
    rows: [
      {
        feature: 'Vector Search',
        p1: 'Proprietary (SPANN/SPFresh, MySQL/InnoDB)',
        p2: 'Native pgvector (HNSW, L2/cosine distance)',
        p2Win: true,
        note: 'Supabase pgvector is more performant than dedicated vector DBs (benchmarks).'
      },
      {
        feature: 'Database Core',
        p1: 'MySQL + Vitess (horizontal scaling)',
        p2: 'PostgreSQL (rich SQL features)',
        p2Win: true,
        note: 'PostgreSQL has superior query capabilities for complex agent logic.'
      },
      {
        feature: 'Pricing (Entry)',
        p1: 'No free tier; Scaler Pro: $34/mo',
        p2: 'Free: 500MB DB, 1GB storage; Pro: $25/mo',
        p2Win: true,
        note: 'Supabase is "several orders of magnitude cheaper" (Reddit consensus).'
      },
      {
        feature: 'Backend Services',
        p1: 'Database only (requires third-party integrations)',
        p2: 'Full BaaS (auth, storage, real-time, edge functions)',
        p2Win: true,
        note: 'Supabase is a complete platform; PlanetScale is database-focused.'
      },
      {
        feature: 'Horizontal Scaling',
        p1: 'Exceptional (Vitess sharding)',
        p2: 'Good (vertical + read replicas)',
        p2Win: false,
        note: 'PlanetScale is engineered for massive MySQL workloads.'
      },
      {
        feature: 'Schema Changes',
        p1: 'Non-blocking (Vitess migration)',
        p2: 'Standard Postgres migrations',
        p2Win: false,
        note: 'PlanetScale offers safer, non-blocking schema changes.'
      },
      {
        feature: 'Open Source',
        p1: 'MySQL (open), Vitess (open)',
        p2: 'PostgreSQL (open), Supabase (open)',
        p2Win: true,
        note: 'Both are open source; Supabase can be self-hosted.'
      },
      {
        feature: 'Best Use Case',
        p1: 'Massive MySQL workloads, high-scale transactions',
        p2: 'AI applications, RAG, BaaS projects, vector search',
        p2Win: true,
        note: 'Supabase is the go-to for AI agents; PlanetScale for MySQL at scale.'
      }
    ]
  }
};
