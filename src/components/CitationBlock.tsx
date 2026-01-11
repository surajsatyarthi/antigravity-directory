import { Zap, CheckCircle2, Info } from 'lucide-react';

interface CitationBlockProps {
  data: {
    title: string;
    description: string;
    category: string;
    verified: boolean;
    rating: string;
    views: string;
  };
}

export function CitationBlock({ data }: CitationBlockProps) {
  return (
    <div className="bg-[#050505] border border-gray-900 rounded-2xl p-6 mb-12 relative overflow-hidden group">
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] pointer-events-none" />
      
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-4 bg-blue-600 rounded-full" />
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] font-mono">
          AI Discovery Snippet
        </h3>
        <Info className="w-3 h-3 text-gray-700 ml-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-sm text-gray-400 leading-relaxed italic">
            "Automated summary for AI agents and search engines."
          </p>
          <div className="space-y-2">
            <h4 className="text-white font-bold text-lg">{data.title}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-black/50 border border-gray-900 rounded-xl">
            <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mb-1">Entity Type</div>
            <div className="text-xs text-white font-mono font-bold truncate">{data.category}</div>
          </div>
          <div className="p-4 bg-black/50 border border-gray-900 rounded-xl">
            <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mb-1">Trust Signal</div>
            <div className="flex items-center gap-1 text-xs text-white font-mono font-bold">
              {data.verified ? (
                <CheckCircle2 className="w-3 h-3 text-green-500" />
              ) : (
                <Zap className="w-3 h-3 text-yellow-500" />
              )}
              {data.verified ? 'Verified' : 'Community'}
            </div>
          </div>
          <div className="p-4 bg-black/50 border border-gray-900 rounded-xl">
            <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mb-1">Score</div>
            <div className="text-xs text-white font-mono font-bold">{data.rating} / 5.0</div>
          </div>
          <div className="p-4 bg-black/50 border border-gray-900 rounded-xl">
            <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mb-1">Visibility</div>
            <div className="text-xs text-white font-mono font-bold">{data.views} sessions</div>
          </div>
        </div>
      </div>
    </div>
  );
}
