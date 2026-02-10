import { Header } from '@/components/Header';
import { Server } from 'lucide-react';

export const metadata = {
  title: 'MCP Servers | Antigravity Directory',
  description: 'Discover curated Model Context Protocol servers.',
};

export default function McpServersPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
              <Server className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tight">MCP Servers</h1>
          </div>
          
          <div className="text-center py-20 bg-[#0A0A0A] border border-white/5 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4">Server Directory Loading...</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              We are indexing 500+ MCP servers. The full searchable directory will be available here shortly.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
