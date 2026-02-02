import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { Shield } from 'lucide-react';

export const metadata = {
  title: 'Rules | Antigravity Directory',
  description: 'Community rules and guidelines for Antigravity Directory.',
};

export default function RulesPage() {
  return (
    <>
      <MarketplaceHeader />
      <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tight">Community Rules</h1>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-400 mb-12">
              Our goal is to maintain a high-quality directory of resources for the Antigravity community.
              Please follow these guidelines when submitting or interacting.
            </p>
            
            <div className="grid gap-8">
              <section className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8">
                <h2 className="text-xl font-bold mb-4">1. Quality First</h2>
                <p className="text-gray-400 leading-relaxed">
                  Only submit high-quality MCP servers, prompts, or workflows. Ensure they are well-documented and functional.
                </p>
              </section>

              <section className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8">
                <h2 className="text-xl font-bold mb-4">2. Accurate Categorization</h2>
                <p className="text-gray-400 leading-relaxed">
                  Place your resources in the correct categories to help users find exactly what they need.
                </p>
              </section>

              <section className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8">
                <h2 className="text-xl font-bold mb-4">3. Respect the Protocol</h2>
                <p className="text-gray-400 leading-relaxed">
                  Follow the Ralph Protocol when submitting code or agent-specific resources.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
