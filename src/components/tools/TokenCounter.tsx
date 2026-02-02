'use client';

import { useState, useEffect, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { getEncoding, encodingForModel } from "js-tiktoken";

const MODELS = [
  { id: 'gpt-4o', name: 'GPT-4o', costPer1k: 0.005 },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', costPer1k: 0.01 },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', costPer1k: 0.0005 },
  { id: 'text-embedding-3-small', name: 'Embedding (Small)', costPer1k: 0.00002 },
];

export function TokenCounter() {
  const [text, setText] = useState('');
  const [model, setModel] = useState('gpt-4o');
  const [tokenCount, setTokenCount] = useState<number | null>(0);
  const [charCount, setCharCount] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  // Debounced calculation
  useEffect(() => {
    const calculateTokens = async () => {
      if (!text) {
        setTokenCount(0);
        setCharCount(0);
        return;
      }
      
      setIsCalculating(true);
      setCharCount(text.length);

      // Small delay to allow UI to update (prevent freezing on large text)
      await new Promise(r => setTimeout(r, 10));

      try {
        const enc = encodingForModel(model as any);
        const tokens = enc.encode(text);
        setTokenCount(tokens.length);
      } catch (e) {
        console.error("Tokenization error:", e);
        // Fallback or error state
      } finally {
        setIsCalculating(false);
      }
    };

    const timeoutId = setTimeout(calculateTokens, 300); // 300ms debounce
    return () => clearTimeout(timeoutId);
  }, [text, model]);

  const selectedModel = MODELS.find(m => m.id === model);
  const cost = tokenCount ? (tokenCount / 1000) * (selectedModel?.costPer1k || 0) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Model Selector */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white"
          >
            {MODELS.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-end gap-6 text-sm">
          <div className="text-right">
            <div className="text-slate-400">Tokens</div>
            <div className="text-2xl font-mono font-bold text-blue-400">
              {isCalculating ? (
                <Loader2 className="w-5 h-5 animate-spin inline" />
              ) : (
                tokenCount?.toLocaleString()
              )}
            </div>
          </div>
          <div className="text-right border-l pl-6 border-slate-700">
            <div className="text-slate-400">Est. Cost</div>
            <div className="text-2xl font-mono font-bold text-green-400">
              ${cost.toFixed(5)}
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Input Text
          <span className="ml-2 text-xs font-normal text-slate-500">
            ({charCount.toLocaleString()} characters)
          </span>
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here to count tokens..."
          className="w-full h-80 p-4 font-mono text-sm bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all text-white placeholder:text-slate-600"
        />
      </div>

      <div className="bg-blue-900/10 border border-blue-500/10 p-4 rounded-lg flex items-start gap-3">
        <div className="text-blue-400 mt-0.5">ℹ️</div>
        <div className="text-sm text-blue-200">
          <p className="font-semibold mb-1">Why accurate token counting matters?</p>
          <p className="text-blue-300/80">
            LLM context windows are limited (e.g., 128k for GPT-4o). Exceeding this limit causes errors or truncation. 
            Also, API costs are billed per 1M tokens, so estimating usage helps budget for scale.
          </p>
        </div>
      </div>
    </div>
  );
}
