import { Split } from 'lucide-react';
import { RagVisualizer } from '@/components/tools/RagVisualizer';
import { safeJsonLd } from '@/lib/utils';
import { ToolsShell } from '@/components/tools/ToolsShell';

export const metadata = {
  title: 'RAG Text Chunking Visualizer',
  description: 'Visualize how your text is split for Vector Databases using different chunk sizes and overlap settings.',
};

const jsonLd = safeJsonLd({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  'name': metadata.title,
  'description': metadata.description,
  'applicationCategory': 'DeveloperApplication',
  'operatingSystem': 'All',
  'offers': {
    '@type': 'Offer',
    'price': '0',
    'priceCurrency': 'USD',
  },
});

export default function RagVisualizerPage() {
  return (
    <ToolsShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                <Split className="w-6 h-6 text-orange-400" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tighter text-white">
                RAG Chunk Visualizer
                </h1>
                <p className="text-slate-400 text-sm">
                Optimize your vector retrieval strategy
                </p>
            </div>
        </div>
        
        <div className="mt-4">
            <RagVisualizer />
        </div>
      </div>
    </ToolsShell>
  );
}
