import Link from 'next/link';
import { ArrowLeft, Sparkles, Zap } from 'lucide-react';
import { Header } from '@/components/Header';
import { db } from '@/lib/db';
import { categories } from '@/drizzle/schema';
import { SubmitForm } from '@/components/SubmitForm';


export default async function SubmitPage() {
  const allCategories = await db.select().from(categories).orderBy(categories.order);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-500/30">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900 mb-10 transition-colors font-mono uppercase tracking-widest"
        >
          <ArrowLeft className="w-3 h-3" />
          back
        </Link>

        <SubmitForm categories={allCategories} />
      </main>


    </div>
  );
}
