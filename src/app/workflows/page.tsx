import { Header } from '@/components/Header';
import { GitBranch } from 'lucide-react';

export const metadata = {
  title: 'Workflows | Antigravity Directory',
  description: 'Standardized workflows for Antigravity-powered agents.',
};

export default function WorkflowsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200">
              <GitBranch className="w-6 h-6 text-slate-900" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Agent Workflows</h1>
          </div>
          
          <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Coming Soon</h2>
            <p className="text-slate-500 max-w-md mx-auto font-medium">
              We are curating the most efficient workflows for agentic development. 
              Check back soon for standard patterns and automations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
