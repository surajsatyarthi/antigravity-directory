import React from 'react';
import { Quote, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Alex Rivera",
    role: "Senior AI Engineer",
    text: "The best directory for Antigravity resources. The live GitHub metrics make it so easy to find high-quality MCP servers.",
    avatar: "AR"
  },
  {
    name: "Sarah Chen",
    role: "Fullstack Developer",
    text: "The comparison engine saved me hours of research. Seeing how blocks vs other MCPs perform head-to-head is a game changer.",
    avatar: "SC"
  },
  {
    name: "Marcus Thorne",
    role: "Product Designer",
    text: "Clean, fast, and extremely high-fidelity. Finally a place that treats AI prompts and rules as first-class assets.",
    avatar: "MT"
  }
];

export const Testimonials = () => {
  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
        <Quote className="w-4 h-4" /> Community Love
      </h3>
      
      <div className="space-y-4">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-all group">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="w-2.5 h-2.5 fill-yellow-500/80 text-yellow-500/80" />
              ))}
            </div>
            <p className="text-[11px] text-gray-400 italic mb-4 leading-relaxed group-hover:text-gray-300 transition-colors">
              "{t.text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[10px] font-black text-blue-400">
                {t.avatar}
              </div>
              <div>
                <div className="text-[11px] font-bold text-white">{t.name}</div>
                <div className="text-[10px] text-gray-600">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
