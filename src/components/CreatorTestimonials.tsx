'use client';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'AI Engineer',
    initials: 'SC',
    earnings: 'Earned $8,200',
    quote: 'Listed my MCP and made money while I sleep. Antigravity handles everything.',
    highlight: 'Passive income',
    bgColor: 'from-blue-500/20 to-purple-500/20'
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'Prompt Engineer',
    initials: 'MR',
    earnings: 'Earned $12,400',
    quote: 'The community is incredible. Sold 450+ prompts in 2 months.',
    highlight: 'Scale fast',
    bgColor: 'from-green-500/20 to-blue-500/20'
  },
  {
    id: 3,
    name: 'Alex Kim',
    role: 'Workflow Designer',
    initials: 'AK',
    earnings: 'Earned $5,600',
    quote: 'Finally, a platform that values creators. 80% is fair.',
    highlight: 'Fair split',
    bgColor: 'from-purple-500/20 to-pink-500/20'
  }
];

export function CreatorTestimonials() {
  return (
    <section className="py-16 border-t border-white/[0.05]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3 uppercase tracking-[0.15em]">
            Stories from 500+ Creators
          </h2>
          <p className="text-gray-400 text-sm font-bold tracking-widest uppercase">
            Real creators, real earnings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative bg-[#0A0A0A] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.bgColor} opacity-5 rounded-xl`} />
              
              <div className="relative z-10">
                {/* Avatar */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                    {testimonial.initials}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Earnings */}
                <div className="mb-4 pb-4 border-b border-white/5">
                  <span className="text-2xl font-black text-blue-400">
                    {testimonial.earnings}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-gray-300 leading-relaxed mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Highlight badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  ✓ {testimonial.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
