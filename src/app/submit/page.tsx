import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { db } from '@/lib/db';
import { categories } from '@/drizzle/schema';
import { SubmitForm } from '@/components/SubmitForm';

export default async function SubmitPage() {
  const allCategories = await db.select().from(categories).orderBy(categories.order);

  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-white/10">
      <MarketplaceHeader />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-white mb-10 transition-colors font-mono uppercase tracking-widest"
        >
          <ArrowLeft className="w-3 h-3" />
          back
        </Link>

        <div className="bg-[#0A0A0A] border border-gray-900 rounded-3xl p-8 md:p-12">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 text-blue-500 border border-blue-500/20 rounded-full text-[10px] font-bold mb-6 uppercase tracking-widest font-mono">
              <Sparkles className="w-3 h-3" />
              community contribution
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-4">Submit a Resource</h1>
            <p className="text-gray-400 font-medium leading-relaxed">
              Share your favorite prompts, MCP servers, or rules with the Antigravity ecosystem.
            </p>
          </div>

          <SubmitForm categories={allCategories} />
        </div>
      </main>

      {/* Footer - Fixed to Pure Dark */}
      <footer className="bg-black border-t border-gray-900 py-16 mt-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-[10px] font-bold text-black font-mono leading-none">A</span>
              </div>
              <span className="text-sm font-bold tracking-tighter text-white font-mono lowercase">
                antigravity
              </span>
            </div>
            <p className="text-xs text-gray-600 font-mono">
              © 2026 Antigravity Directory. built for the next generation of engineers.
            </p>
            <div className="flex gap-6 text-xs text-gray-500 font-mono">
              <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
              <Link href="/submit" className="hover:text-white transition-colors">Submit</Link>
              <Link href="https://github.com" className="hover:text-white transition-colors">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
