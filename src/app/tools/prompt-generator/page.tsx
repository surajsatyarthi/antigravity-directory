import { PromptGenerator } from "@/components/tools/PromptGenerator";
import { Terminal } from "lucide-react";

export const metadata = {
  title: 'System Prompt Generator | Antigravity Tools',
  description: 'Create structured system prompts for GPT-4 and Claude to improve AI reliability. Define roles, tasks, and constraints using our optimized template.',
};

export default function PromptGeneratorPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-900/30 rounded-lg text-purple-400">
            <Terminal className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            System Prompt Optimizer
          </h1>
        </div>
        <p className="text-slate-400 max-w-2xl">
          Garbage in, garbage out. Use this structured template to craft robust system instructions that reduce hallucinations and improve adherence for any LLM.
        </p>
      </div>

      <PromptGenerator />

      <section className="mt-12 space-y-8 max-w-4xl border-t border-slate-800 pt-12">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Structured System Prompt Template (CO-STAR Framework)</h2>
          <p className="text-slate-400 leading-relaxed">
            The quality of your AI output depends entirely on your system instructions. This <strong>Prompt Generator</strong> helps you structure your prompts using proven engineering frameworks (like CO-STAR) to separate Context, Objectives, Style, Tone, Audience, and Rules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Key Components</h3>
            <ul className="space-y-2 text-slate-400">
              <li><strong className="text-slate-300">Role:</strong> Define who the AI is (e.g., "Senior Python Architect").</li>
              <li><strong className="text-slate-300">Objective:</strong> Clear, actionable goal.</li>
              <li><strong className="text-slate-300">Constraints:</strong> Negative prompts (what NOT to do).</li>
              <li><strong className="text-slate-300">Format:</strong> JSON, Markdown, CSV, etc.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Pro Tip</h3>
            <p className="text-slate-400">
              Always provide "Few-Shot Examples" in your prompt context. Showing the model 2-3 examples of ideal input/output pairs significantly improves performance compared to zero-shot instructions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
