import { RAGVisualizer } from "@/components/tools/RAGVisualizer";
import { Split } from "lucide-react";

export const metadata = {
  title: 'RAG Chunking Visualizer | Antigravity Tools',
  description: 'Simulate and visualize text splitting for Retrieval Augmented Generation (RAG). Debug chunk sizes and overlap to optimize your vector database performance.',
};

export default function RAGVisualizerPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-rose-900/30 rounded-lg text-rose-400">
            <Split className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            RAG Chunking Visualizer
          </h1>
        </div>
        <p className="text-slate-400 max-w-2xl">
          Vector databases rely on quality chunking. Use this tool to visualize how your text is split based on character size and overlap settings.
        </p>
      </div>

      <RAGVisualizer />

      <section className="mt-12 space-y-8 max-w-4xl border-t border-slate-800 pt-12">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Visualizing RAG Chunking Strategies</h2>
          <p className="text-slate-400 leading-relaxed">
            <strong>Retrieval Augmented Generation (RAG)</strong> fails if your text chunks are too small (missing context) or too large (diluting semantics). This visualizer helps you tune your <code>chunk_size</code> and <code>chunk_overlap</code> parameters to ensure your Vector DB (Pinecone, Weaviate, Milvus) retrieves the exact information needed.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Best Practices for Chunking</h3>
          <ul className="list-disc list-inside text-slate-400 space-y-2 text-sm">
            <li><strong>Fixed-Size Chunking:</strong> Good baseline. Start with 512 or 1024 tokens.</li>
            <li><strong>Recursive Splitting:</strong> Respects sentence/paragraph boundaries (better for natural language).</li>
            <li><strong>Overlap:</strong> Always keep 10-20% overlap to prevent cutting context in the middle of a sentence.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
