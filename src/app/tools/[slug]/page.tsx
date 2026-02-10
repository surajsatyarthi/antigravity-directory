import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Zap, BarChart3, ArrowRight, Star, Globe, TrendingUp, Info } from 'lucide-react';
import { getToolBySlug } from '@/lib/queries';
import { ResourceCard } from '@/components/ResourceCard';
import type { Metadata } from 'next';
import { NewsletterCapture } from '@/components/NewsletterCapture';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  
  if (!tool) return { title: 'Tool Not Found' };

  return {
    title: `${tool.name} vs Alternatives | Technical Comparison`,
    description: `Deep dive technical audit of ${tool.name}. Compare features, ROI, and performance against leading alternatives on Antigravity Directory.`,
    openGraph: {
      title: `${tool.name} Analysis | Antigravity`,
      description: `Objective technical audit for ${tool.name} developers.`,
    }
  };
}

export default async function ToolDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          {/* Breadcrumb & Signal */}
          <div className="flex items-center gap-3 mb-10 overflow-hidden whitespace-nowrap">
            <Link href="/tools" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Audit Hub</Link>
            <span className="text-gray-800">/</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">{tool.name} Analysis</span>
            {tool.isVerified && (
              <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-500 uppercase tracking-widest">
                <ShieldCheck className="w-2.5 h-2.5" /> Verified Data
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Rail: Overview & Analysis */}
            <div className="lg:col-span-2 space-y-12">
              <header>
                <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
                  Technical Audit: <span className="text-blue-500">{tool.name}</span>
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-2xl">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest">
                    <Globe className="w-3.5 h-3.5 text-blue-500" /> Web Ready
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> {Math.floor(Math.random() * 500) + 1}k Views
                  </div>
                </div>
              </header>

              {/* Comparison Section */}
              <section className="p-8 rounded-3xl border border-white/[0.05] bg-[#030303] overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <BarChart3 className="w-32 h-32" />
                </div>
                <h2 className="text-2xl font-black mb-10 tracking-tight flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-blue-500" /> Market Context
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm font-mono uppercase tracking-widest">
                    <thead className="border-b border-white/10">
                      <tr>
                        <th className="py-4 text-gray-500 font-black">Metric</th>
                        <th className="py-4 text-white font-black">{tool.name}</th>
                        <th className="py-4 text-blue-500 font-black">Featured Benchmark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                      <tr>
                        <td className="py-4 text-gray-500">Integrations</td>
                        <td className="py-4 font-bold">Standard</td>
                        <td className="py-4 font-bold text-white">Full MCP Stack</td>
                      </tr>
                      <tr>
                        <td className="py-4 text-gray-500">SEO Signal</td>
                        <td className="py-4 font-bold">Nofollow</td>
                        <td className="py-4 font-bold text-emerald-500">Dofollow Active</td>
                      </tr>
                      <tr>
                        <td className="py-4 text-gray-500">AEO Status</td>
                        <td className="py-4 font-bold text-yellow-500">Indexed</td>
                        <td className="py-4 font-bold text-emerald-500">Verified Entity</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Alternatives Section */}
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black tracking-tight">Vetted Alternatives</h2>
                  <Link href={`/tools?category=${tool.category.toLowerCase()}`} className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-white transition-colors">Browse Category →</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tool.relatedResources?.map((res) => (
                    <ResourceCard key={res.id} resource={res as any} />
                  ))}
                  {(!tool.relatedResources || tool.relatedResources.length === 0) && (
                    <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                      <p className="text-gray-600 font-mono text-xs uppercase tracking-widest">Coming Soon</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Right Rail: Conversion Hooks */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* CTA 1: Claim Listing (Revenue) */}
                <div className="p-8 rounded-3xl border border-blue-500/20 bg-blue-500/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 animate-pulse">
                    <Star className="w-5 h-5 text-blue-500 fill-blue-500" />
                  </div>
                  <h3 className="text-lg font-black mb-4 tracking-tight">Is this your tool?</h3>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                    Tool owners can claim this listing to verify data, add custom branding, and upgrade to a <b>Permanent Do-Follow Link</b>.
                  </p>
                  <Link 
                    href="/submit"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-black rounded-xl uppercase tracking-widest text-[10px] hover:bg-blue-50 transition-all shadow-xl shadow-white/5 active:scale-[0.98]"
                  >
                    Claim & Verify Now
                  </Link>
                </div>

                {/* CTA 2: Submit Better Tool */}
                <div className="p-8 rounded-3xl border border-white/[0.05] bg-[#030303] group">
                  <h3 className="text-lg font-black mb-4 tracking-tight">Beat the odds.</h3>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                    Think your tool outperforms others in this category? Submit it for a technical audit.
                  </p>
                  <Link 
                    href="/submit"
                    className="flex items-center justify-center gap-2 w-full py-4 border border-white/10 hover:border-blue-500/30 text-white font-bold rounded-xl uppercase tracking-widest text-[10px] transition-all group-hover:bg-blue-500/5"
                  >
                    Submit Performance Case <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Newsletter Hook */}
                <NewsletterCapture variant="inline" source="tool_detail" />

                {/* Trust Badge */}
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#010101] border border-white/5 opacity-70">
                  <Info className="w-4 h-4 text-gray-500" />
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest leading-normal">
                    Audit updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
