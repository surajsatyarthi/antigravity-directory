import { AlertTriangle, Zap, User, Lock, Activity, Server, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Troubleshooting & Support | Antigravity',
  description: 'Solutions for common issues with login, agents, and performance in Antigravity.',
};

export default function TroubleshootingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6 flex items-center justify-center gap-4">
            <HelpCircle className="w-10 h-10 text-yellow-500" />
            Troubleshooting
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Quick solutions to common problems. If you're stuck, try these steps first.
          </p>
        </div>

        <div className="space-y-12">
          {/* Section: Login & Auth */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white border-b border-white/10 pb-4">
              <Lock className="w-6 h-6 text-blue-400" />
              Login & Authentication
            </h2>
            <div className="space-y-4">
              <Details 
                summary="Login screen is stuck or blank"
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li><strong>Full Restart:</strong> Quit Antigravity completely (check system tray) and relaunch.</li>
                    <li><strong>Browser Settings:</strong> Ensure Chrome/Edge is your default browser. Disable strict tracking protection temporarily.</li>
                    <li><strong>Extensions:</strong> Try signing in (if web-based) in Incognito mode to rule out extension interference.</li>
                    <li><strong>System Time:</strong> Ensure your system clock is synced; mismatched time breaks OAuth tokens.</li>
                  </ul>
                }
              />
              <Details 
                summary='"Account Not Authorized" or "Not Eligible"'
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Use a personal <code>@gmail.com</code> account if possible. Workspace accounts may have restrictions.</li>
                    <li>Verify your region support. VPNs can sometimes cause this error if detected improperly.</li>
                    <li>If you see this immediately after sign-up, wait 15 minutes and try again.</li>
                  </ul>
                }
              />
            </div>
          </section>

          {/* Section: Agents & MCP */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white border-b border-white/10 pb-4">
              <Server className="w-6 h-6 text-purple-400" />
              Agents & MCP Servers
            </h2>
            <div className="space-y-4">
               <Details 
                summary="Agents won't spawn or start"
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Run <strong>"Restart Agent Service"</strong> from the Command Palette (Ctrl+Shift+P).</li>
                    <li>Check the <strong>Output Panel</strong> (View → Output → "Antigravity Agent") for specific error codes.</li>
                    <li>On Windows, try running Antigravity as Administrator.</li>
                  </ul>
                }
              />
              <Details 
                summary="MCP Server Errors"
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Ensure valid JSON in configuration files.</li>
                    <li>Avoid keys starting with numbers (e.g., <code>1mcp</code>). Rename them to start with a letter.</li>
                    <li>Disable all MCP servers and re-enable one by one to identify the culprit.</li>
                  </ul>
                }
              />
            </div>
          </section>

          {/* Section: Performance */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white border-b border-white/10 pb-4">
              <Activity className="w-6 h-6 text-green-400" />
              Performance & Memory
            </h2>
            <div className="space-y-4">
               <Details 
                summary="High Memory Usage / Sluggishness"
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Limit concurrent agents to 3 or fewer.</li>
                    <li>Clear the Artifact Cache: <code>Settings → Storage → Clear Cache</code>.</li>
                    <li>Reduce Context Limit in Model settings if running on lower RAM (8GB or less).</li>
                  </ul>
                }
              />
            </div>
          </section>
        </div>

        <div className="mt-20 p-8 bg-white/5 rounded-2xl border border-white/10 text-center">
          <h3 className="text-xl font-bold mb-4">Still having trouble?</h3>
          <p className="text-gray-400 mb-6">
            Join our community for real-time help from developers and other users.
          </p>
          <Link 
            href="https://discord.gg/antigravity" 
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-lg transition-colors"
          >
            <Zap className="w-5 h-5" />
            Join Discord Support
          </Link>
        </div>
      </div>
    </div>
  );
}

function Details({ summary, content }: { summary: string, content: React.ReactNode }) {
  return (
    <details className="group bg-[#0A0A0A] border border-white/10 rounded-lg overflow-hidden transition-all hover:border-white/20">
      <summary className="flex items-center justify-between p-4 cursor-pointer font-medium select-none">
        <span>{summary}</span>
        <span className="transition-transform group-open:rotate-180">
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </summary>
      <div className="p-4 pt-0 text-sm leading-relaxed border-t border-white/5 opacity-0 group-open:opacity-100 transition-opacity">
        {content}
      </div>
    </details>
  );
}
