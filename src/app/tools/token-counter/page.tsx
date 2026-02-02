import { TokenCounter } from "@/components/tools/TokenCounter";
import { Binary } from "lucide-react";

export const metadata = {
  title: 'TikToken Counter Online | Antigravity Tools',
  description: 'Free online token counter for GPT-4, Claude 3.5, and Llama models. Estimate tokens and API costs instantly using the official tiktoken logic.',
};

export default function TokenCounterPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400">
            <Binary className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            TikToken Counter
          </h1>
        </div>
        <p className="text-slate-400 max-w-2xl">
          Paste your text below to see exactly how many tokens it consumes for OpenAI models. 
          Includes real-time cost estimation based on current API pricing.
        </p>
      </div>

      <TokenCounter />

      <section className="mt-12 space-y-8 max-w-4xl border-t border-slate-800 pt-12">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">How to Count Tokens for OpenAI Models</h2>
          <p className="text-slate-400 leading-relaxed">
            This free <strong>TikToken Counter</strong> uses the official OpenAI tokenizer logic (cl100k_base) to give you 100% accurate token counts for standard models like GPT-4o, GPT-4 Turbo, and GPT-3.5. Unlike simple word counters, this tool analyzes the text exactly how the LLM sees it, accounting for special characters, whitespace, and sub-word tokens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Why Token Counting Matters</h3>
            <ul className="list-disc list-inside text-slate-400 space-y-2 text-sm">
              <li><strong>Cost Control:</strong> API usage is billed per million tokens. Knowing your count helps estimate deployment costs.</li>
              <li><strong>Context Limits:</strong> Every model has a hard limit (e.g., 128k for GPT-4o). Exceeding this truncates your data.</li>
              <li><strong>Performance:</strong> Large contexts can dilute model attention. Optimizing token usage improves response quality.</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Supported Models</h3>
            <ul className="list-disc list-inside text-slate-400 space-y-2 text-sm">
              <li>GPT-4o / GPT-4o Mini</li>
              <li>GPT-4 Turbo (Preview)</li>
              <li>GPT-3.5 Turbo</li>
              <li>text-embedding-3-small/large</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
