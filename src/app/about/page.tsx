import type { Metadata } from 'next';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'About | Antigravity Directory',
  description: 'Antigravity Directory is the free resource hub for Google Antigravity IDE — MCP servers, rules, prompts, skills and workflows in one place.',
  alternates: {
    canonical: 'https://googleantigravity.directory/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white">
        <div className="max-w-2xl mx-auto px-6 py-20">

          <h1 className="text-3xl font-black tracking-tight text-white uppercase mb-10">
            About
          </h1>

          <div className="flex flex-col gap-8 text-sm text-gray-400 leading-relaxed">

            <section>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-3">
                What this is
              </h2>
              <p>
                Antigravity Directory is a free, curated index of resources for Google Antigravity IDE —
                MCP servers, rules, prompts, skills, workflows, agents, boilerplates, tutorials and cheatsheets.
                Everything is free to browse. Everything is free to submit. There is no paywall, no account
                required to search, and no sponsored ranking that buries real results.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-3">
                Why it exists
              </h2>
              <p>
                When Google Antigravity IDE launched, resources scattered across GitHub, Reddit, Discord and
                personal blogs with no central place to find them. Every developer was reinventing the same
                MCP configurations and rule sets. This directory exists to fix that — one indexed, searchable
                place for the entire Antigravity ecosystem.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-3">
                Who built it
              </h2>
              <p>
                Built and maintained by a solo developer based in India. No VC funding. No team.
                Just a directory that needed to exist.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-3">
                Contact
              </h2>
              <p>
                For submissions, corrections, or advertising enquiries:{' '}
                <a
                  href="mailto:directoryantigravity@gmail.com"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  directoryantigravity@gmail.com
                </a>
              </p>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}
