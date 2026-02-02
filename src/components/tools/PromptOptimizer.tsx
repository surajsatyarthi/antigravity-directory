'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AlertCircle, Wand2, Copy, Trash2, ArrowRight } from 'lucide-react';
import { optimizePrompt } from '@/app/actions/optimize-prompt';
import { toast } from 'sonner';

export function PromptOptimizer() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOptimize = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    try {
        const result = await optimizePrompt(input);
        if (result.success) {
            setOutput(result.optimizedPrompt);
            toast.success('Prompt optimized!');
        } else {
            toast.error(result.error || 'Something went wrong');
        }
    } catch (e) {
        toast.error('Failed to connect to server');
    } finally {
        setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast('Copied to clipboard');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Input Column */}
      <div className="flex flex-col gap-4 h-full">
        <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Original Prompt</h3>
            <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                onClick={() => setInput('')}
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
        <Card className="flex-1 bg-white/5 border-white/10 p-1 relative group">
            <Textarea
                placeholder="Paste your rough prompt here... (e.g. 'Write a blog post about AI')"
                className="w-full h-full min-h-[400px] bg-transparent border-0 resize-none focus-visible:ring-0 text-base leading-relaxed text-slate-300 p-4"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            {/* Action Button Overlay on Mobile, Center on Desktop */}
        </Card>
        <Button 
            onClick={handleOptimize} 
            disabled={loading || !input.trim()}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-6 text-lg shadow-lg shadow-blue-900/20"
        >
            {loading ? (
                <>
                    <Wand2 className="w-5 h-5 mr-2 animate-spin" /> Optimizing...
                </>
            ) : (
                <>
                    <Wand2 className="w-5 h-5 mr-2" /> Optimize with Gemini
                </>
            )}
        </Button>
      </div>

      {/* Output Column */}
      <div className="flex flex-col gap-4 h-full">
        <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-green-400 uppercase tracking-wider flex items-center gap-2">
                <Wand2 className="w-4 h-4" /> Optimized Result
            </h3>
            {output && (
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-green-400 hover:text-green-300 hover:bg-green-500/20"
                    onClick={copyToClipboard}
                >
                    <Copy className="w-4 h-4 mr-2" /> Copy
                </Button>
            )}
        </div>
        <Card className="flex-1 bg-black/40 border-green-500/30 p-1 relative overflow-hidden">
            {loading && (
                <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-blue-400 font-mono animate-pulse">Generating Optimization...</div>
                </div>
            )}
            <Textarea
                readOnly
                placeholder="Optimized prompt will appear here..."
                className="w-full h-full min-h-[400px] bg-transparent border-0 resize-none focus-visible:ring-0 text-base leading-relaxed font-mono text-green-100 p-4 selection:bg-green-500/30"
                value={output}
            />
        </Card>
        
        {/* Info Box */}
        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm flex gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>
                Powered by <strong>Gemini 1.5 Flash</strong> (Free Tier). This tool restructures your prompt into Role, Context, Task, and Constraint sections for better LLM adherence.
            </p>
        </div>
      </div>
    </div>
  );
}
