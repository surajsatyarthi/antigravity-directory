import { ROICalculator } from "@/components/tools/ROICalculator";
import { Calculator } from "lucide-react";

export const metadata = {
  title: 'LLM API Pricing Calculator | Antigravity Tools',
  description: 'Compare API costs for GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro. Calculate monthly expenses for your AI application based on token usage.',
};

export default function ROICalculatorPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-900/30 rounded-lg text-green-400">
            <Calculator className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            LLM API Cost Calculator
          </h1>
        </div>
        <p className="text-slate-400 max-w-2xl">
          Don't overpay for AI. Compare monthly costs across all major providers (OpenAI, Anthropic, Google) 
          based on your estimated token volume.
        </p>
      </div>

      <ROICalculator />

      <section className="mt-12 space-y-8 max-w-4xl border-t border-slate-800 pt-12">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Compare LLM API Pricing (OpenAI vs Anthropic vs Google)</h2>
          <p className="text-slate-400 leading-relaxed">
            Choosing the right Large Language Model (LLM) isn't just about intelligence—it's about unit economics. This <strong>AI ROI Calculator</strong> helps engineering teams forecast monthly expenses by comparing the latest API pricing from OpenAI, Anthropic, and Google DeepMind.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">How to Optimise AI Costs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
              <strong className="block text-white mb-2">1. Use Mini/Haiku Models</strong>
              <p className="text-slate-400">For simple classification or extraction tasks, GPT-4o Mini or Claude 3 Haiku are 30-50x cheaper than their larger counterparts.</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
              <strong className="block text-white mb-2">2. Batch API</strong>
              <p className="text-slate-400">If you don't need real-time responses, use the OpenAI Batch API to get a 50% discount on token costs.</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
              <strong className="block text-white mb-2">3. Cache Common Queries</strong>
              <p className="text-slate-400">Implement semantic caching (Redis/Vector DB) to avoid re-generating answers for identical user queries.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
