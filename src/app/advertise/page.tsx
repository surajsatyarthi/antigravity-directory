
import { Metadata } from 'next';
import { AdvertiseClient } from '@/components/AdvertiseClient';
import { safeJsonLd } from '@/lib/utils';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Advertise & Sponsor | Antigravity Directory',
  description: 'Reach 10,000+ AI builders and developers. Promote your AI tool with featured listings, verified badges, and homepage placement.',
  openGraph: {
    title: 'Advertise your AI Tool on Antigravity Directory',
    description: 'Get discovered by 10k+ monthly active AI users. Fast-track your growth with our premium listing options.',
    images: ['/og-image.png'], 
  },
};

const jsonLd = safeJsonLd({
  '@context': 'https://schema.org',
  '@type': 'Product',
  'name': 'Antigravity Directory Sponsorship',
  'description': 'Premium listing packages for AI tools on Antigravity Directory.',
  'offers': [
    {
      '@type': 'Offer',
      'name': 'Standard Boost',
      'price': '49.00',
      'priceCurrency': 'USD'
    },
    {
      '@type': 'Offer',
      'name': 'Featured Sponsor',
      'price': '149.00',
      'priceCurrency': 'USD'
    }
  ]
});

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      
      <Header />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto px-4 mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-500 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Accepting New Sponsors
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Get Discovered by <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600">
              10,000+ AI Builders
            </span>
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Antigravity Directory is the destination for the next generation of AI tools. 
            Skip the noise and put your project in front of early adopters, investors, and power users.
          </p>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Monthly Views', value: '50k+' },
              { label: 'Active Users', value: '10k+' },
              { label: 'Click-Through Rate', value: '12%' },
              { label: 'Founder Community', value: 'Verified' },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
                <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Interactive Section */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
          <AdvertiseClient />
        </div>

        {/* Trust Section */}
        <div className="mt-32 text-center border-t border-slate-200 pt-24">
            <p className="text-slate-500 text-sm font-medium mb-8 uppercase tracking-widest">TRUSTED BY BUILDERS FROM</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 text-slate-800">
                {/* Simple text placeholders for logos - in prod use SVG images */}
                <span className="text-xl font-bold">Y Combinator</span>
                <span className="text-xl font-bold">Product Hunt</span>
                <span className="text-xl font-bold">Hacker News</span>
                <span className="text-xl font-bold">Twitter / X</span>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
