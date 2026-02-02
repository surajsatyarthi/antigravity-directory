import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Star, ShieldCheck, Zap, BookOpen, Cloud, Code2, Terminal } from 'lucide-react';
import { safeJsonLd } from '@/lib/utils/safeJsonLd';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';

export const metadata: Metadata = {
  title: "What is Antigravity? Complete Guide | Antigravity Directory",
  description: "The definitive guide to the Antigravity IDE. Learn how to use Gemini 3 for agentic coding, discover top MCP servers, and access 500+ rules and prompts.",
  openGraph: {
    title: "Antigravity: The Complete Guide",
    description: "Master Google Antigravity IDE with our comprehensive guide. Everything you need to know about Gemini 3 agentic development.",
    type: "article",
    url: "https://googleantigravity.directory/google-antigravity",
  }
};

export default function GoogleAntigravityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Google Antigravity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Google Antigravity is an advanced AI-powered integrated development environment (IDE) built on the Gemini 3 model family. It enables agentic coding workflows where the AI can plan, write, test, and deploy code autonomously with human verification."
        }
      },
      {
        "@type": "Question",
        "name": "How does Gemini 3 improve coding?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gemini 3 offers significantly expanded context windows (up to 2M tokens) and improved reasoning capabilities, allowing it to understand entire repositories, refactor complex legacy code, and generate comprehensive tests in a single pass."
        }
      },
      {
        "@type": "Question",
        "name": "What are MCP Servers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Model Context Protocol (MCP) servers act as bridges between AI models and external data or tools. They allow Antigravity to securely access databases, APIs, and local files to perform grounded actions."
        }
      },
      {
        "@type": "Question",
        "name": "Is Google Antigravity free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Google Antigravity offers a generous free tier for individual developers. Professional and Enterprise tiers provide higher rate limits, advanced security features, and team collaboration tools."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get started with Antigravity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To get started, download the Antigravity IDE, authenticate with your Google credentials, and initialize your project using the 'antigravity init' command. Explore our directory for starter prompts and rules."
        }
      }
    ]
  };

  return (
    <>
      <MarketplaceHeader />
      <div className="min-h-screen bg-black text-gray-200">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />

        {/* Hero Section */}
      <div className="relative py-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <BookOpen className="w-4 h-4" />
            <span>The Definitive Guide</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            Antigravity: <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">The Complete Guide</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Everything you need to master the next generation of AI-powered software development. From setup to advanced agentic workflows.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#getting-started" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all">
              Start Reading
            </Link>
            <Link href="/" className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold transition-all flex items-center gap-2">
              Browse Resources <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
        {/* Sidebar TOC */}
        <aside className="lg:w-64 shrink-0 hidden lg:block">
          <div className="sticky top-24 space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Contents</h3>
            <nav className="flex flex-col gap-2 text-sm text-gray-500 border-l border-white/10 pl-4">
              <a href="#what-is-antigravity" className="hover:text-blue-400 hover:border-blue-500 -ml-[17px] pl-4 border-l border-transparent transition-all">What is Antigravity?</a>
              <a href="#key-features" className="hover:text-blue-400 hover:border-blue-500 -ml-[17px] pl-4 border-l border-transparent transition-all">Key Features</a>
              <a href="#getting-started" className="hover:text-blue-400 hover:border-blue-500 -ml-[17px] pl-4 border-l border-transparent transition-all">Getting Started</a>
              <a href="#best-resources" className="hover:text-blue-400 hover:border-blue-500 -ml-[17px] pl-4 border-l border-transparent transition-all">Best Resources</a>
              <a href="#faq" className="hover:text-blue-400 hover:border-blue-500 -ml-[17px] pl-4 border-l border-transparent transition-all">FAQ</a>
            </nav>
          </div>
        </aside>

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-3xl mx-auto">
          
          <section id="what-is-antigravity" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500"><Terminal className="w-6 h-6" /></div>
              <h2 className="text-3xl font-bold text-white m-0">What is Google Antigravity?</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Google Antigravity represents a paradigm shift in software engineering. Unlike traditional IDEs that simply complete code, Antigravity is an <strong>agentic environment</strong> where the AI (powered by Gemini 3) acts as a collaborative partner. It doesn't just write syntax; it understands architectural intent, plans complex refactors, and executes multi-file changes with awareness of the entire codebase.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              At its core, Antigravity leverages the massive context window of Gemini 3 to "hold" your entire project in its working memory. This eliminates the hallucination issues common in previous generation tools that only saw active files.
            </p>
          </section>

          <section id="key-features" className="mb-16 scroll-mt-24">
             <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500"><Zap className="w-6 h-6" /></div>
              <h2 className="text-3xl font-bold text-white m-0">Key Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
              <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-blue-500/30 transition-all">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-blue-400" /> GEMINI 3 Native
                </h3>
                <p className="text-sm text-gray-400">Built from the ground up for the Gemini 3 architecture, maximizing reasoning capabilities and context retention.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-blue-500/30 transition-all">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> Ralph Protocol Support
                </h3>
                <p className="text-sm text-gray-400">Native integration with rigorous verification protocols to ensure AI-generated code is secure and tested.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-blue-500/30 transition-all">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-amber-400" /> MCP Ecosystem
                </h3>
                <p className="text-sm text-gray-400">Connect to PostgreSQL, Linear, GitHub, and Slack directly through standardized Model Context Protocol servers.</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-blue-500/30 transition-all">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Star className="w-5 h-5 text-pink-400" /> Agentic Workflows
                </h3>
                <p className="text-sm text-gray-400">Delegate entire tasks like "Refactor the payment module" or "Update all API endpoints" to autonomous agents.</p>
              </div>
            </div>
          </section>

          <section id="getting-started" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6">Getting Started Guide</h2>
            <ol className="list-decimal pl-6 space-y-4 text-gray-300">
              <li>
                <strong className="text-white">Install the CLI:</strong> Download the latest binary for your OS.
                <pre className="bg-gray-900 p-4 rounded-lg mt-2 text-sm text-blue-300">curl -fsSL https://antigravity.dev/install | bash</pre>
              </li>
              <li>
                <strong className="text-white">Authenticate:</strong> Link your Google Cloud account.
                <pre className="bg-gray-900 p-4 rounded-lg mt-2 text-sm text-blue-300">antigravity auth login</pre>
              </li>
              <li>
                <strong className="text-white">Initialize Project:</strong> Set up the configuration.
                <pre className="bg-gray-900 p-4 rounded-lg mt-2 text-sm text-blue-300">antigravity init</pre>
              </li>
              <li>
                <strong className="text-white">Install MCP Servers:</strong> Connect your tools.
                <pre className="bg-gray-900 p-4 rounded-lg mt-2 text-sm text-blue-300">antigravity mcp add github linear postgres</pre>
              </li>
            </ol>
          </section>

          <section id="best-resources" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6">Best Resources</h2>
            <p className="text-gray-300 mb-6">
              To maximize your productivity with Google Antigravity, explore our curated collections of community-verified resources:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
              <Link href="/" className="group p-4 bg-[#0A0A0A] border border-white/10 rounded-xl hover:border-blue-500/50 transition-all">
                <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">MCP Servers Directory</h4>
                <p className="text-sm text-gray-500 mt-1">Connect your innovative tools</p>
              </Link>
              <Link href="/" className="group p-4 bg-[#0A0A0A] border border-white/10 rounded-xl hover:border-blue-500/50 transition-all">
                <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">Cursor Rules Library</h4>
                <p className="text-sm text-gray-500 mt-1">Optimize your AI context</p>
              </Link>
              <Link href="/" className="group p-4 bg-[#0A0A0A] border border-white/10 rounded-xl hover:border-blue-500/50 transition-all">
                <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">Prompt Templates</h4>
                <p className="text-sm text-gray-500 mt-1">Copy-paste engineering prompts</p>
              </Link>
              <Link href="/" className="group p-4 bg-[#0A0A0A] border border-white/10 rounded-xl hover:border-blue-500/50 transition-all">
                <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">Troubleshooting Guide</h4>
                <p className="text-sm text-gray-500 mt-1">Fix common agent errors</p>
              </Link>
            </div>
          </section>

          <section id="faq" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6 not-prose">
              <div className="border-b border-white/10 pb-6">
                <h3 className="text-xl font-bold text-white mb-2">Is Google Antigravity better than Cursor?</h3>
                <p className="text-gray-400 leading-relaxed">Antigravity is built specifically for Gemini 3's 2M token context window, allowing for deeper reasoning on larger codebases. While Cursor is excellent, Antigravity excels in full-repository agentic tasks.</p>
              </div>
              <div className="border-b border-white/10 pb-6">
                <h3 className="text-xl font-bold text-white mb-2">Can I use it offline?</h3>
                <p className="text-gray-400 leading-relaxed">Antigravity requires an internet connection to communicate with the Gemini 3 models on Google Cloud infrastructure. However, local files remain on your machine.</p>
              </div>
              <div className="border-b border-white/10 pb-6">
                <h3 className="text-xl font-bold text-white mb-2">What languages are supported?</h3>
                <p className="text-gray-400 leading-relaxed">It officially supports Python, JavaScript, TypeScript, Go, Rust, Java, and C++. Experimental support exists for 50+ other languages.</p>
              </div>
            </div>
          </section>

          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 text-center border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to accelerate your workflow?</h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">Join thousands of developers using Antigravity to build the future of software.</p>
            <Link href="/" className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all text-lg shadow-xl shadow-blue-900/20">
              Browse 500+ Resources
            </Link>
          </div>

        </article>
      </div>
      </div>
    </>
  );
}
