import { Header } from '@/components/Header';
import { BrainCircuit } from 'lucide-react';

export const metadata = {
  title: 'Agent Skills | Antigravity Directory',
  description: 'Downloadable skills to enhance your AI agents.',
};

export default function SkillsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tight">Agent Skills</h1>
          </div>
          
          <div className="text-center py-20 bg-[#0A0A0A] border border-white/5 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4">Skills Repository Under Construction</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              A collection of reusable skill folders for your agents is being compiled.
              Soon you will be able to download and inject skills directly.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
