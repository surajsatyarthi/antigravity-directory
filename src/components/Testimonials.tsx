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
    <div className="w-full mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Quote className="w-4 h-4 text-blue-500" />
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Community Feedback</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-3 h-3 fill-yellow-500/80 text-yellow-500/80" />
                ))}
              </div>
              <p className="text-xs text-gray-400 italic mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                "{t.text}"
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xs font-black text-blue-400">
                {t.avatar}
              </div>
              <div>
                <div className="text-xs font-bold text-white">{t.name}</div>
                <div className="text-[10px] text-gray-600">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
