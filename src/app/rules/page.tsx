import { Header } from '@/components/Header';
import { Shield } from 'lucide-react';

export const metadata = {
  title: 'Rules | Antigravity Directory',
  description: 'Community rules and guidelines for Antigravity Directory.',
};

export default function RulesPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200">
              <Shield className="w-6 h-6 text-slate-900" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Community Rules</h1>
          </div>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-xl text-slate-500 mb-12 font-medium">
              Our goal is to maintain a high-quality directory of resources for the Antigravity community.
              Please follow these guidelines when submitting or interacting.
            </p>
            
            <div className="grid gap-8">
              <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-slate-900">1. Quality First</h2>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Only submit high-quality MCP servers, prompts, or workflows. Ensure they are well-documented and functional.
                </p>
              </section>
 
              <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-slate-900">2. Accurate Categorization</h2>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Place your resources in the correct categories to help users find exactly what they need.
                </p>
              </section>
 
              <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-slate-900">3. Respect the Protocol</h2>
                <p className="text-slate-500 leading-relaxed font-medium">
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
