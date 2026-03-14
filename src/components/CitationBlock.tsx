import { Zap, CheckCircle2, Info } from 'lucide-react';

interface CitationBlockProps {
  data: {
    title: string;
    description: string;
    category: string;
    verified: boolean;

  };
}

export function CitationBlock({ data }: CitationBlockProps) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-none p-6 mb-12 relative overflow-hidden group">
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] pointer-events-none" />
      
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-4 bg-blue-600 rounded-full" />
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] font-mono">
          AI Discovery Snippet
        </h3>
      </div>

      <div className="flex flex-col gap-6">
        <div className="space-y-4 max-w-3xl">
          <p className="text-sm text-slate-400 leading-relaxed italic">
            "Automated summary for AI agents and search engines."
          </p>
          <div className="space-y-1">
            <h4 className="text-white font-bold text-lg">{data.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-none min-w-[140px]">
            <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mb-1">Trust Signal</div>
            <div className="flex items-center gap-1.5 text-xs text-gray-300 font-mono font-bold">
              {data.verified ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <Zap className="w-3.5 h-3.5 text-yellow-500" />
              )}
              {data.verified ? 'Verified' : 'Community'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
