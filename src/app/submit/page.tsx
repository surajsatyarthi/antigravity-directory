import Link from 'next/link';
import { ArrowLeft, Sparkles, Zap } from 'lucide-react';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { db } from '@/lib/db';
import { categories } from '@/drizzle/schema';
import { SubmitForm } from '@/components/SubmitForm';
import { Footer } from '@/components/Footer';

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

      <Footer />
    </div>
  );
}
