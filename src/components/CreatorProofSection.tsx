'use client';

import Link from 'next/link';

interface CreatorCardProps {
  name: string;
  role: string;
  monthlyEarnings: string;
  toolsCount: number;
  testimonial: string;
  imageUrl?: string;
  username: string;
}

function CreatorCard({ name, role, monthlyEarnings, toolsCount, testimonial, imageUrl, username }: CreatorCardProps) {
  return (
    <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-white/10 hover:bg-white/[0.05] transition-all group flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-14 h-14 rounded-full border-2 border-white/5" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold">
            {name[0]}
          </div>
        )}
        <div>
          <h3 className="text-white font-black text-lg">{name}</h3>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{role}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/10">
          <p className="text-emerald-400 font-black text-lg leading-none">{monthlyEarnings}</p>
          <p className="text-[10px] text-emerald-500/60 font-bold uppercase tracking-tighter mt-1">per month</p>
        </div>
        <div className="bg-blue-500/10 rounded-xl p-3 border border-blue-500/10">
          <p className="text-blue-400 font-black text-lg leading-none">{toolsCount}</p>
          <p className="text-[10px] text-blue-500/60 font-bold uppercase tracking-tighter mt-1">tools listed</p>
        </div>
      </div>

      <p className="text-gray-400 italic mb-8 flex-grow">"{testimonial}"</p>

      <Link 
        href={`/u/${username}`}
        className="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-lg border border-white/5 transition-all text-center"
      >
        View Profile
      </Link>
    </div>
  );
}

export function CreatorProofSection() {
  const creators = [
    {
      name: "John",
      role: "MCP Developer",
      monthlyEarnings: "$8,200",
      toolsCount: 27,
      testimonial: "I listed my MCP on Day 1. Made $800 by Day 7.",
      username: "john",
    },
    {
      name: "Sarah",
      role: "Workflow Designer",
      monthlyEarnings: "$5,100",
      toolsCount: 12,
      testimonial: "Sold my workflow for $29. Made 35 sales in a month = $1,015 revenue (keep $812)",
      username: "sarah",
    },
    {
      name: "Alex",
      role: "Antigravity Expert",
      monthlyEarnings: "$1,500",
      toolsCount: 8,
      testimonial: "My rules package is steady $300/month. It's like passive income.",
      username: "alex",
    },
  ];

  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Creators Are Earning</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6" />
          <p className="text-xl text-gray-400 font-medium">500+ creators earning $1-10k/month</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {creators.map((creator) => (
            <CreatorCard key={creator.name} {...creator} />
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 md:gap-16">
            <div className="text-center md:text-left">
              <p className="text-2xl font-black text-white">2,200+</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Tools Listed</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-2xl font-black text-white">500+</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Creators</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-2xl font-black text-white">$100k+</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Earned</p>
            </div>
          </div>
          <Link
            href="/members"
            className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all"
          >
            See All Top Creators →
          </Link>
        </div>
      </div>
    </section>
  );
}
