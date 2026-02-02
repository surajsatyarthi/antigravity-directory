'use client';

import { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Check } from 'lucide-react';

const PROVIDERS = [
  {
    name: 'OpenAI',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o', input: 5.00, output: 15.00 },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', input: 0.15, output: 0.60 },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', input: 10.00, output: 30.00 },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', input: 0.50, output: 1.50 },
    ]
  },
  {
    name: 'Anthropic',
    models: [
      { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', input: 3.00, output: 15.00 },
      { id: 'claude-3-opus', name: 'Claude 3 Opus', input: 15.00, output: 75.00 },
      { id: 'claude-3-haiku', name: 'Claude 3 Haiku', input: 0.25, output: 1.25 },
    ]
  },
  {
    name: 'Google',
    models: [
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', input: 3.50, output: 10.50 },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', input: 0.35, output: 1.05 },
    ]
  }
];

export function ROICalculator() {
  const [avgInputTokens, setAvgInputTokens] = useState(1000);
  const [avgOutputTokens, setAvgOutputTokens] = useState(500);
  const [dailyRequests, setDailyRequests] = useState(100);

  const comparisons = useMemo(() => {
    return PROVIDERS.flatMap(provider => 
      provider.models.map(model => {
        // Costs are per 1M tokens usually, but we standardizing to $ per 1M for calculation ease?
        // Wait, standard pricing is per 1M tokens.
        // My config above uses standard $ per 1M input/output.
        
        const monthlyRequests = dailyRequests * 30;
        const totalInput = (avgInputTokens * monthlyRequests) / 1_000_000;
        const totalOutput = (avgOutputTokens * monthlyRequests) / 1_000_000;
        
        const monthlyCost = (totalInput * model.input) + (totalOutput * model.output);
        
        return {
          provider: provider.name,
          ...model,
          monthlyCost
        };
      })
    ).sort((a, b) => a.monthlyCost - b.monthlyCost);
  }, [avgInputTokens, avgOutputTokens, dailyRequests]);

  const bestValue = comparisons[0];

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Avg Input Tokens / Req
          </label>
          <input
            type="number"
            value={avgInputTokens}
            onChange={(e) => setAvgInputTokens(Number(e.target.value))}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Avg Output Tokens / Req
          </label>
          <input
            type="number"
            value={avgOutputTokens}
            onChange={(e) => setAvgOutputTokens(Number(e.target.value))}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Requests Per Day
          </label>
          <input
            type="number"
            value={dailyRequests}
            onChange={(e) => setDailyRequests(Number(e.target.value))}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-white"
          />
        </div>
      </div>

      {/* Best Choice Highlight */}
      <div className="bg-green-900/10 border border-green-500/20 p-6 rounded-xl flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-green-400 mb-1">
            Most Cost Effective Option
          </div>
          <div className="text-2xl font-bold text-white flex items-center gap-2">
            <span>{bestValue.name}</span>
            <span className="text-sm font-normal text-slate-400">
              via {bestValue.provider}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-green-400">
            ${bestValue.monthlyCost.toFixed(2)}
          </div>
          <div className="text-xs text-green-300 font-medium">
            per month
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-900/50 text-slate-400 font-medium">
            <tr>
              <th className="px-6 py-4 text-left">Model</th>
              <th className="px-6 py-4 text-left">Provider</th>
              <th className="px-6 py-4 text-right">Input ($/1M)</th>
              <th className="px-6 py-4 text-right">Output ($/1M)</th>
              <th className="px-6 py-4 text-right">Est. Monthly Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {comparisons.map((model, idx) => (
              <tr 
                key={model.id}
                className={idx === 0 ? 'bg-green-900/10' : ''}
              >
                <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                  {model.name}
                  {idx === 0 && <Check className="w-4 h-4 text-green-500" />}
                </td>
                <td className="px-6 py-4 text-slate-400">{model.provider}</td>
                <td className="px-6 py-4 text-right text-slate-400">
                  ${model.input.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right text-slate-400">
                  ${model.output.toFixed(2)}
                </td>
                <td className={`px-6 py-4 text-right font-bold ${idx === 0 ? 'text-green-400' : 'text-white'}`}>
                  ${model.monthlyCost.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p className="text-xs text-center text-slate-500 mt-4">
        * Pricing based on standard "Pay-as-you-go" API rates as of Feb 2026. Does not include Batch API discounts (50% off usually).
      </p>
    </div>
  );
}
