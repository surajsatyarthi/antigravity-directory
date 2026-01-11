import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { Footer } from '@/components/Footer';
import { getComparisonData } from '@/lib/comparison';
import { Star, GitFork, ShieldCheck, Zap, Globe, Github } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const [slug1, slug2] = slug.split('-vs-');
  
  if (!slug1 || !slug2) return { title: 'Comparison' };

  const { toolA, toolB } = await getComparisonData(slug1, slug2);
  
  if (!toolA || !toolB) return { title: 'Comparison Not Found' };

  const title = `${toolA.title} vs ${toolB.title}: Comparison | Antigravity AI Hub`;
  const description = `Compare ${toolA.title} and ${toolB.title} features, GitHub stars, and user ratings to find the best AI tool for your workflow.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    }
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const [slug1, slug2] = slug.split('-vs-');
  
  if (!slug1 || !slug2) notFound();

  const { toolA, toolB } = await getComparisonData(slug1, slug2);
  
  if (!toolA || !toolB) notFound();

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <MarketplaceHeader />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-8 mb-6">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">{toolA.title}</h1>
            <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-xl font-black text-blue-500 italic">VS</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">{toolB.title}</h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl text-center">
            Detailed head-to-head comparison of two leading {toolA.categoryName} resources in the Antigravity ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Comparison Cards */}
          {[toolA, toolB].map((tool, idx) => (
            <div key={tool.id} className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:border-blue-500/50 transition-all group">
              <div className="flex items-center justify-between mb-8">
                <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold border border-blue-500/20">
                  {tool.categoryName}
                </span>
                {tool.verified && (
                  <ShieldCheck className="w-6 h-6 text-blue-500" />
                )}
              </div>

              <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{tool.title}</h2>
              <p className="text-gray-400 mb-8 leading-relaxed h-24 overflow-hidden italic line-clamp-3">
                {tool.description}
              </p>

              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="flex items-center gap-2 text-gray-400 mb-1 text-xs font-bold uppercase tracking-wider">
                      <Star className="w-3.5 h-3.5" /> Stars
                    </div>
                    <div className="text-xl font-mono text-white">{(tool.githubStars || 0).toLocaleString()}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="flex items-center gap-2 text-gray-400 mb-1 text-xs font-bold uppercase tracking-wider">
                      <Zap className="w-3.5 h-3.5" /> Rating
                    </div>
                    <div className="text-xl font-mono text-white">{(Number(tool.avgRating) || 0).toFixed(1)}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="flex items-center gap-2 text-gray-400 mb-1 text-xs font-bold uppercase tracking-wider">
                    <GitFork className="w-3.5 h-3.5" /> Forks
                  </div>
                  <div className="text-xl font-mono text-white">{(tool.githubForks || 0).toLocaleString()}</div>
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-4">
                <Link 
                  href={`/t/${tool.slug || ''}`}
                  className="w-full py-4 rounded-2xl bg-white text-black font-black text-center hover:bg-gray-200 transition-all uppercase tracking-widest text-sm"
                >
                  View Details
                </Link>
                <a 
                  href={tool.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl bg-white/5 text-white border border-white/10 font-black text-center hover:bg-white/10 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                >
                  {tool.url?.includes('github.com') ? <Github className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                  Open Source
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
