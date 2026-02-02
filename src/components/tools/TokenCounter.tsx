'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AlertCircle, Check, Copy } from 'lucide-react';
import { encodingForModel } from "js-tiktoken";

export function TokenCounter() {
  const [text, setText] = useState('');
  const [tokens, setTokens] = useState(0);
  const [chars, setChars] = useState(0);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    try {
        const enc = encodingForModel("gpt-4o");
        const encoded = enc.encode(text);
        setTokens(encoded.length);
        setChars(text.length);
        
        // Cost estimation for GPT-4o Input ($5.00 / 1M tokens)
        setCost((encoded.length / 1000000) * 5.00);
    } catch (e) {
        console.error("Tokenizer error:", e);
    }
  }, [text]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tokens.toString());
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8">
        <Card className="bg-white/5 border-white/10 p-1">
            <Textarea
                placeholder="Paste your text here to count tokens..."
                className="min-h-[400px] bg-transparent border-0 resize-none focus-visible:ring-0 text-lg leading-relaxed font-mono text-slate-300"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </Card>
      </div>

      <div className="lg:col-span-4 space-y-6">
        {/* Token Count Card */}
        <Card className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-blue-500/30 p-6 flex flex-col items-center justify-center text-center space-y-2">
            <div className="text-sm uppercase tracking-widest text-blue-300 font-semibold">Token Count</div>
            <div className="text-6xl font-bold text-white tracking-tighter tabular-nums">
                {tokens.toLocaleString()}
            </div>
            <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-300 hover:text-white hover:bg-blue-500/20 mt-2"
                onClick={copyToClipboard}
            >
                <Copy className="w-4 h-4 mr-2" /> Copy Count
            </Button>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white/5 border-white/10 p-4 text-center">
                <div className="text-xs text-slate-400 mb-1">Characters</div>
                <div className="text-2xl font-bold text-slate-200">{chars.toLocaleString()}</div>
            </Card>
            <Card className="bg-white/5 border-white/10 p-4 text-center">
                <div className="text-xs text-slate-400 mb-1">Est. Cost (GPT-4o)</div>
                <div className="text-2xl font-bold text-green-400">${cost.toFixed(4)}</div>
            </Card>
        </div>

        {/* Info */}
        <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-200 text-sm flex gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>
                Calculated using <code>cl100k_base</code> encoding (used by GPT-4o, GPT-4, GPT-3.5-Turbo). Counts for Claude or Gemini may vary slightly.
            </p>
        </div>
      </div>
    </div>
  );
}
