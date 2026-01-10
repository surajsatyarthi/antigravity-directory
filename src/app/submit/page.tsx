import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { db } from '@/lib/db';
import { categories } from '@/drizzle/schema';
import { SubmitForm } from '@/components/SubmitForm';

export default async function SubmitPage() {
  const allCategories = await db.select().from(categories).orderBy(categories.order);

  return (
    <div className="min-h-screen bg-background-app flex flex-col">
      <MarketplaceHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>

          <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-8 md:p-10">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Contribute to the Ecosystem
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Submit a Resource</h1>
              <p className="text-gray-500">
                Share your favorite prompts, MCP servers, or rules with the Antigravity community.
              </p>
            </div>

            <SubmitForm categories={allCategories} />
          </div>
        </div>
      </main>

      <footer className="py-12 text-center border-t border-gray-200 dark:border-gray-800 mt-auto">
        <p className="text-sm text-gray-500">
          © 2026 Antigravity Directory. Thank you for contributing!
        </p>
      </footer>
    </div>
  );
}
