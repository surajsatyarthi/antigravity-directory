import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="inline-flex flex-col mb-3">
              <span className="text-[17px] font-black font-mono lowercase text-white tracking-[-0.03em] leading-none">
                antigravity
              </span>
              <span className="text-[10px] font-black tracking-[0.3em] font-mono lowercase text-slate-400 leading-none mt-1">
                directory
              </span>
            </Link>
            <p className="text-sm text-slate-400 mt-3 max-w-[200px] leading-relaxed">
              The #1 resource hub for Google Antigravity IDE.
            </p>
          </div>

          {/* Column 2: Browse */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">Browse</h3>
            <div className="flex flex-col gap-2">
              <Link href="/browse?categories=mcp-servers" className="text-sm text-slate-300 hover:text-white transition-colors block">MCP Servers</Link>
              <Link href="/browse?categories=skills" className="text-sm text-slate-300 hover:text-white transition-colors block">Skills</Link>
              <Link href="/browse?categories=rules" className="text-sm text-slate-300 hover:text-white transition-colors block">Rules</Link>
              <Link href="/browse?categories=prompts" className="text-sm text-slate-300 hover:text-white transition-colors block">Prompts</Link>
              <Link href="/browse?categories=agents" className="text-sm text-slate-300 hover:text-white transition-colors block">Agents</Link>
              <Link href="/browse?categories=workflows" className="text-sm text-slate-300 hover:text-white transition-colors block">Workflows</Link>
              <Link href="/browse?categories=boilerplates" className="text-sm text-slate-300 hover:text-white transition-colors block">Boilerplates</Link>
              <Link href="/browse?categories=troubleshooting" className="text-sm text-slate-300 hover:text-white transition-colors block">Troubleshooting</Link>
              <Link href="/browse?categories=tutorials" className="text-sm text-slate-300 hover:text-white transition-colors block">Tutorials</Link>
              <Link href="/browse?categories=cheatsheets" className="text-sm text-slate-300 hover:text-white transition-colors block">Cheatsheets</Link>
            </div>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">Company</h3>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-slate-300 hover:text-white transition-colors block">About</Link>
              <Link href="/advertise" className="text-sm text-slate-300 hover:text-white transition-colors block">Advertise</Link>
              <Link href="/submit" className="text-sm text-slate-300 hover:text-white transition-colors block">Submit a Resource</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-12 pt-6 flex items-center justify-between text-xs text-slate-500">
          <p>© 2026 Antigravity Directory</p>
        </div>
      </div>
    </footer>
  );
}
