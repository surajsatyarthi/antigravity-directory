import Link from 'next/link';
import { Search, Sparkles, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold">Antigravity Directory</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/resources" className="text-gray-600 hover:text-gray-900">
              Resources
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-gray-900">
              Categories
            </Link>
            <Link href="/submit" className="text-gray-600 hover:text-gray-900">
              Submit
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Google's $2.4B Bet on AI Coding
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            The Ultimate Antigravity Resource Hub
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            300+ curated prompts, MCPs, rules, and workflows for Google's revolutionary AI IDE. 
            Built for developers betting on the future.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search prompts, MCPs, rules..."
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/resources"
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Explore Resources
            </Link>
            <Link
              href="/submit"
              className="px-8 py-4 border-2 border-gray-300 rounded-full font-semibold hover:border-gray-400 transition"
            >
              Submit Resource
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">300+</div>
            <div className="text-gray-600">Curated Resources</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">5</div>
            <div className="text-gray-600">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
            <div className="text-gray-600">Free & Open</div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { name: 'Prompts', count: 150, icon: '💬' },
            { name: 'MCP Servers', count: 100, icon: '🔌' },
            { name: 'Rules', count: 50, icon: '📋' },
          ].map((category) => (
            <Link
              key={category.name}
              href={`/categories/${category.name.toLowerCase()}`}
              className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600">{category.count} resources</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>© 2026 Antigravity Directory. Built with Next.js & Neon.</p>
        </div>
      </footer>
    </div>
  );
}
