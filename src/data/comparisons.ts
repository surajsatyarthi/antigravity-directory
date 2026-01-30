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
  }
};
