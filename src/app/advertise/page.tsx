import { Metadata } from 'next';
import { AdvertiseClient } from '@/components/AdvertiseClient';
import { safeJsonLd } from '@/lib/utils';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Advertise & Sponsor | Antigravity Directory',
  description: 'Reach developers building with Google Antigravity IDE. The only dedicated Antigravity resource directory — 3,116+ resources, 10 categories.',
  openGraph: {
    title: 'Advertise on Antigravity Directory',
    description: 'The only Antigravity IDE directory. Reach every developer building with Google Antigravity IDE.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.googleantigravity.directory/advertise',
  },
};

const jsonLd = safeJsonLd({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  'name': 'Advertise on Antigravity Directory',
  'description': 'Reach developers building with Google Antigravity IDE. Sponsor the only dedicated Antigravity resource directory.',
  'url': 'https://www.googleantigravity.directory/advertise'
});

const AD_SLOTS = [
  {
    name: 'Site-wide Sponsor Badge',
    price: '$2,000',
    period: '/month',
    tag: 'HIGHEST VISIBILITY',
    description: 'Your logo fixed to the bottom-right corner of every single page — homepage, all 10 category pages, and all 3,116 resource detail pages. Every session, every scroll.',
    features: [
      'Fixed bottom-right placement — always visible, never missed',
      'Logo + tagline + clickable link',
      'Appears on every page across the entire site',
      '3,116 resource pages + homepage + 10 category pages',
      'Exclusive — only 1 slot available',
    ],
    slots: '1 slot available',
  },
  {
    name: 'Homepage Banner',
    price: '$800–$1,500',
    period: '/month',
    tag: 'FIRST IMPRESSION',
    description: 'A dedicated sponsor card placed between the hero section and the resource list — the first thing every visitor sees when they arrive at the directory.',
    features: [
      'Dedicated card in the main content area',
      'Above the fold on most viewports',
      'Logo + headline + description + CTA link',
      'Seen by every homepage visitor',
      'Exclusive — only 1 slot available',
    ],
    slots: '1 slot available',
  },
  {
    name: 'Category Page Sponsor',
    price: '$300–$500',
    period: '/month',
    tag: 'TARGETED REACH',
    description: 'Your brand at the top of a specific category page. Choose the category that matches your product — e.g., MCP Servers (2,033 resources), Prompts, Workflows, or any of the 10 categories.',
    features: [
      'Top-of-page banner on your chosen category',
      'Seen by every visitor browsing that category',
      'Logo + headline + link',
      '10 categories to choose from — pick your niche',
      '1 sponsor per category (non-competing)',
    ],
    slots: 'Up to 10 slots (1 per category)',
  },
];

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <Header />

      <main className="pt-32 pb-24">

        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto px-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Accepting First Sponsors
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
            The Only Directory for<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400">
              Google Antigravity IDE
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We are a new site with one clear advantage: ultra-niche focus.
            Every visitor is a developer actively building with Google Antigravity IDE.
            No noise. No broad audience. Just the exact users your tool is built for.
          </p>
        </div>

        {/* Real Stats */}
        <div className="max-w-5xl mx-auto px-4 mb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Resources Indexed', value: '3,116+' },
              { label: 'Categories', value: '10' },
              { label: 'IDE Focus', value: 'Antigravity' },
              { label: 'Access', value: 'Free' },
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-white/[0.03] border border-white/[0.06] text-center">
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Advertise Here */}
        <div className="max-w-5xl mx-auto px-4 mb-24">
          <h2 className="text-3xl font-black text-white mb-12 text-center tracking-tight">
            Why sponsor a new directory?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Niche beats scale',
                body: 'You do not need 1 million generic users. You need 1,000 developers who are already using the exact IDE your tool is built for. That is our entire audience.',
              },
              {
                title: 'First-mover pricing',
                body: 'Sponsoring at launch means locking in founding rates. As organic traffic builds, prices increase. Early sponsors get the best slots at the lowest cost — permanently, for as long as they renew.',
              },
              {
                title: 'Zero waste impressions',
                body: 'Every visitor to this site arrived because they searched for Antigravity IDE resources — not by accident. There are no wasted impressions on irrelevant traffic.',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/[0.03] border border-white/[0.06]">
                <h3 className="text-lg font-black text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Table */}
        <div className="max-w-5xl mx-auto px-4 mb-24">
          <h2 className="text-3xl font-black text-white mb-4 text-center tracking-tight">
            Sponsorship slots
          </h2>
          <p className="text-center text-gray-500 text-sm mb-12">
            All slots sold monthly. Renew or cancel anytime. No long-term contracts.
          </p>

          <div className="flex flex-col gap-4">
            {AD_SLOTS.map((slot, i) => (
              <div
                key={i}
                className="p-6 md:p-8 bg-white/[0.03] border border-white/[0.06] flex flex-col md:flex-row md:items-start gap-6"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-xl font-black text-white">{slot.name}</h3>
                    <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-blue-400 border border-blue-400/30 bg-blue-400/5">
                      {slot.tag}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{slot.description}</p>
                  <ul className="flex flex-col gap-1.5">
                    {slot.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:w-52 shrink-0 flex flex-col items-start md:items-end gap-4">
                  <div>
                    <div className="text-3xl font-black text-white md:text-right">{slot.price}</div>
                    <div className="text-xs text-gray-500 md:text-right">{slot.period}</div>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-600 md:text-right">{slot.slots}</div>
                  <a
                    href="#contact"
                    className="px-5 py-2.5 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-colors"
                  >
                    Enquire
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div id="contact" className="max-w-5xl mx-auto px-4 mb-12">
          <h2 className="text-3xl font-black text-white mb-4 text-center tracking-tight">
            Get in touch
          </h2>
          <p className="text-center text-gray-500 text-sm mb-12">
            Tell us which slot interests you. We reply within 24 hours with availability and a media kit.
          </p>
          <AdvertiseClient />
        </div>

        {/* Footer note */}
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-600">
            Prices shown are founding sponsor rates and will increase as traffic grows. Current: 3,116 resources indexed, March 2026.
          </p>
        </div>

      </main>
    </div>
  );
}
