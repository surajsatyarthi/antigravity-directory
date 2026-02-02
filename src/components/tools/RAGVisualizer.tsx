'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const DEFAULT_TEXT = `RAG (Retrieval-Augmented Generation) systems rely heavily on how you split your documents. 
If chunks are too small, the LLM loses context. If they are too large, you retrieve irrelevant noise.
Finding the sweet spot usually involves testing different chunk sizes and overlap percentages.
This tool helps you visualize exactly how your text will be segmented before you index it into your vector database.`;

export function RagVisualizer() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [chunkSize, setChunkSize] = useState(50);
  const [overlap, setOverlap] = useState(10);

  const chunks = useMemo(() => {
    if (!text) return [];
    
    // Simple character-based chunking for visualization
    // In production, you'd use tiktoken or sentence splitters
    const result = [];
    let start = 0;
    
    while (start < text.length) {
      const end = Math.min(start + chunkSize, text.length);
      const chunkText = text.slice(start, end);
      result.push({ 
        text: chunkText, 
        start, 
        end,
        isOverlap: start > 0 && start < (start + overlap) // Simplified overlap visualization
      });
      
      if (end === text.length) break;
      start += (chunkSize - overlap);
    }
    return result;
  }, [text, chunkSize, overlap]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Controls */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="p-6 bg-white/5 border-white/10 space-y-6">
           <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-slate-200">Chunk Size (chars)</Label>
                <span className="text-xs text-blue-400 font-mono">{chunkSize}</span>
              </div>
              <Slider 
                value={[chunkSize]} 
                max={500} 
                step={10} 
                min={20}
                onValueChange={(val) => setChunkSize(val[0])} 
                className="py-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-slate-200">Overlap (chars)</Label>
                <span className="text-xs text-orange-400 font-mono">{overlap}</span>
              </div>
              <Slider 
                value={[overlap]} 
                max={100} 
                step={5} 
                onValueChange={(val) => setOverlap(val[0])} 
                className="py-2"
              />
              <p className="text-xs text-slate-500">
                Overlap ensures context isn't lost at the boundaries of splits.
              </p>
            </div>
           </div>
        </Card>

        <Card className="p-6 bg-white/5 border-white/10">
            <h3 className="text-sm font-semibold text-white mb-2">Statistics</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-slate-400">Can create</span>
                    <span className="text-white font-mono">{chunks.length} chunks</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-400">Total Length</span>
                    <span className="text-white font-mono">{text.length} chars</span>
                </div>
            </div>
        </Card>
      </div>

      {/* Visualization */}
      <div className="lg:col-span-8 space-y-6">
        <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-black/50 border-white/10 min-h-[100px] text-slate-300"
            placeholder="Enter your source text here..."
        />

        <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Chunk Preview</h3>
            <div className="grid gap-3">
                {chunks.map((chunk, i) => (
                    <div 
                        key={i} 
                        className="relative p-3 rounded-lg border border-white/5 bg-slate-900/50 hover:bg-slate-900 transition-colors group"
                    >
                        <div className="absolute top-2 right-2 text-[10px] text-slate-600 font-mono group-hover:text-slate-400">
                            #{i + 1} | {chunk.start}-{chunk.end}
                        </div>
                        <p className="text-slate-300 font-mono text-sm leading-relaxed pr-12">
                            {chunk.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
