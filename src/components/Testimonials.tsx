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
    <div className="w-full mb-10">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Community Feedback</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bg-[#050505] border border-white/[0.05] rounded-lg p-4 hover:border-white/10 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-2.5 h-2.5 fill-yellow-500/40 text-yellow-500/40" />
                ))}
              </div>
              <p className="text-[11px] text-gray-500 italic mb-4 leading-relaxed group-hover:text-gray-400 transition-colors">
                "{t.text}"
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-gray-900 border border-white/5 flex items-center justify-center text-[8px] font-black text-gray-500">
                {t.avatar}
              </div>
              <div>
                <div className="text-[11px] font-bold text-white/90">{t.name}</div>
                <div className="text-[9px] text-gray-600 font-medium uppercase tracking-wider">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
