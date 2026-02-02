'use client';

import { useState, useMemo } from 'react';
import { Split, AlignLeft } from 'lucide-react';

export function RAGVisualizer() {
  const [text, setText] = useState('Large Language Models (LLMs) have revolutionized the field of artificial intelligence. However, their context window is limited. Retrieval Augmented Generation (RAG) solves this by retrieving relevant chunks of text from a knowledge base. To do this effectively, we must first split long documents into smaller, semantic chunks. This visualized helps you understand that process.');
  const [chunkSize, setChunkSize] = useState(100);
  const [overlap, setOverlap] = useState(20);

  const chunks = useMemo(() => {
    if (!text) return [];
    
    const chunksArray = [];
    let start = 0;
    
    while (start < text.length) {
      const end = Math.min(start + chunkSize, text.length);
      const chunkText = text.slice(start, end);
      
      chunksArray.push({
        id: start,
        text: chunkText,
        start,
        end,
        length: chunkText.length
      });
      
      if (end >= text.length) break;
      start += (chunkSize - overlap);
    }
    
    return chunksArray;
  }, [text, chunkSize, overlap]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
      {/* Input Configuration */}
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Chunk Size (chars)
            </label>
            <input
              type="number"
              value={chunkSize}
              onChange={(e) => setChunkSize(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-rose-500 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Overlap (chars)
            </label>
            <input
              type="number"
              value={overlap}
              onChange={(e) => setOverlap(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-rose-500 text-white"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300">
            Source Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your document text here..."
            className="flex-1 w-full p-4 text-sm bg-slate-900/50 border border-slate-700 rounded-xl outline-none resize-none focus:ring-2 focus:ring-rose-500 text-white placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Visualization */}
      <div className="flex flex-col gap-2 h-full">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-300">
            Generated Chunks ({chunks.length})
          </label>
          <div className="text-xs text-slate-500">
            Total Chars: {text.length}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {chunks.map((chunk, idx) => (
            <div 
              key={idx}
              className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-rose-500/50 transition group"
            >
              <div className="flex items-center justify-between mb-2 text-xs text-slate-500">
                <span className="font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">Chunk #{idx + 1}</span>
                <span>Range: {chunk.start}-{chunk.end} ({chunk.length} chars)</span>
              </div>
              <div className="text-sm text-slate-300 font-mono leading-relaxed relative">
                {/* Visualizing overlap if possible? For now, just plain text */}
                {chunk.text}
              </div>
            </div>
          ))}

          {chunks.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <Split className="w-8 h-8 mb-2 opacity-50" />
              <p>Add text to see chunks</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
