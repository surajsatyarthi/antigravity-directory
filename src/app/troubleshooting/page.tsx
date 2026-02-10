import { AlertTriangle, Zap, User, Lock, Activity, Server, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/Header';

export const metadata = {
  title: 'Troubleshooting & Support | Antigravity',
  description: 'Solutions for common issues with login, agents, and performance in Antigravity.',
};

export default function TroubleshootingPage() {
  return (
    <>
      <Header />
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
          {/* Section: Connectivity & Access */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white border-b border-white/10 pb-4">
              <Lock className="w-6 h-6 text-blue-400" />
              Connectivity & Access
            </h2>
            <div className="space-y-4">
              <Details 
                summary="Agent stuck loading or 'Connection Refused'"
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li><strong>Clear Site Data:</strong> Don't just reload. Go to DevTools (F12) → Application → Storage → Clear Site Data.</li>
                    <li><strong>VPN/DNS:</strong> Antigravity can conflict with strict corporate VPNs. Try switching DNS to 8.8.8.8 or disabling VPN temporarily.</li>
                    <li><strong>Mobile Hotspot:</strong> If on a restricted network (university/office), verify connection via mobile hotspot to rule out firewall blocking.</li>
                  </ul>
                }
              />
              <Details 
                summary="Account Lockout after Logout"
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li><strong>Incognito Mode:</strong> If you are stuck in a logout loop, try signing in via an Incognito window.</li>
                    <li><strong>Primary Profile:</strong> Ensure your Google Account is the primary profile in Chrome/Edge to prevent token mismatches.</li>
                  </ul>
                }
              />
              <Details 
                summary="'Network Timeout' or 'Failed to Connect' errors"
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li><strong>Firewall Check:</strong> Corporate firewalls may block WebSocket connections. Contact IT to whitelist <code>*.antigravity.google</code>.</li>
                    <li><strong>Proxy Settings:</strong> If behind a proxy, ensure HTTP/HTTPS proxy is configured correctly in system settings.</li>
                    <li><strong>Check Status:</strong> Visit the official status page to rule out global outages.</li>
                  </ul>
                }
              />
              <Details 
                summary="'Too many requests' or rate limit errors"
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Free tier has quota limits. Wait 15 minutes or upgrade to Pro for higher limits.</li>
                    <li>If you're on Pro and still hitting limits, verify your billing status in Account Settings.</li>
                  </ul>
                }
              />
            </div>
          </section>

          {/* Section: Security & Safety (NEW) */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white border-b border-white/10 pb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              Security & Safety
            </h2>
            <div className="space-y-4">
              <Details 
                summary="Prevent Unauthorized Code Execution"
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li><strong>Terminal Policy:</strong> Set "Terminal Auto Execution Policy" to <strong>"Confirm"</strong> (not Auto) in Settings.</li>
                    <li>This prevents the agent from executing shell commands without your explicit approval, mitigating risks from untrusted inputs.</li>
                  </ul>
                }
              />
              <Details 
                summary="Prompt Injection Risks"
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li><strong>Markdown Rendering:</strong> Be cautious when the agent renders Markdown from untrusted sources. Malicious images/links could trigger data exfiltration.</li>
                    <li>Avoid processing third-party repositories with sensitive local files in the same workspace.</li>
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
              <Details 
                summary="Agent crashes mid-task"
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li><strong>Memory:</strong> If dealing with large files (&gt;100MB), reduce Context Limit in Settings.</li>
                    <li><strong>Logs:</strong> Check crash logs in <code>~/.antigravity/logs</code> for specific error traces.</li>
                  </ul>
                }
              />
              <Details 
                summary="Multiple agents conflict or interfere"
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Run only one agent per workspace to avoid resource conflicts.</li>
                    <li>If managing multiple projects, use separate workspace folders.</li>
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
              <Details 
                summary="UI freezes or becomes unresponsive"
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Force quit and restart the application.</li>
                    <li>Disable hardware acceleration: Settings → Advanced → Use Hardware Acceleration (toggle off).</li>
                  </ul>
                }
              />
              <Details 
                summary="Slow file indexing"
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Exclude large directories (e.g., <code>node_modules</code>, <code>.git</code>) via Settings → File Exclusions.</li>
                    <li>On Windows, disable antivirus real-time scanning for the workspace folder temporarily.</li>
                  </ul>
                }
              />
            </div>
          </section>
          {/* Section: Model Intelligence (NEW) */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white border-b border-white/10 pb-4">
              <Zap className="w-6 h-6 text-yellow-400" />
              Model Intelligence
            </h2>
            <div className="space-y-4">
               <Details 
                summary="Hallucinations or Low Quality Results"
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li><strong>Nano Banana Pro:</strong> Switch to this model for high-fidelity code rendering if the default model struggles with syntax.</li>
                    <li><strong>Gemini 3 Flash:</strong> Use this for low-latency tasks where speed is prioritized over complex reasoning.</li>
                    <li><strong>Prompt Refinement:</strong> Add explicit constraints ("Use TypeScript", "Follow ESLint rules") to reduce ambiguity.</li>
                  </ul>
                }
              />
              <Details 
                summary="Context limit exceeded errors"
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Break large tasks into smaller sub-tasks.</li>
                    <li>Use <code>@file</code> references instead of pasting entire files into prompts.</li>
                  </ul>
                }
              />
              <Details 
                summary="Model switching best practices"
                content={
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Use <strong>Gemini 3 Flash</strong> for quick edits and refactoring.</li>
                    <li>Use <strong>Nano Banana Pro</strong> for complex logic or debugging.</li>
                    <li>Avoid switching mid-conversation; it resets context.</li>
                  </ul>
                }
              />
            </div>
          </section>
        </div>

      </div>
      </div>
    </>
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
