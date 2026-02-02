import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { GitBranch } from 'lucide-react';

export const metadata = {
  title: 'Workflows | Antigravity Directory',
  description: 'Standardized workflows for Antigravity-powered agents.',
};

export default function WorkflowsPage() {
  return (
    <>
      <MarketplaceHeader />
      <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tight">Agent Workflows</h1>
          </div>
          
          <div className="text-center py-20 bg-[#0A0A0A] border border-white/5 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              We are curating the most efficient workflows for agentic development. 
              Check back soon for standard patterns and automations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
