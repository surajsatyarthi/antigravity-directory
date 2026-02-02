import { Terminal } from 'lucide-react';
import { PromptOptimizer } from '@/components/tools/PromptOptimizer';
import { safeJsonLd } from '@/lib/utils';
import { ToolsShell } from '@/components/tools/ToolsShell';

export const metadata = {
  title: 'AI Prompt Optimizer',
  description: 'Turn basic prompts into professional system instructions using Google Gemini 1.5 Flash.',
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

export default function PromptOptimizerPage() {
  return (
    <ToolsShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className="flex flex-col gap-6 h-[calc(100vh-140px)]">
        <div className="flex items-center gap-3 flex-shrink-0">
            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <Terminal className="w-6 h-6 text-purple-400" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tighter text-white">
                Prompt Optimizer
                </h1>
                <p className="text-slate-400 text-sm">
                Sanitize and structure your prompts for maximum LLM performance
                </p>
            </div>
        </div>
        
        <div className="mt-4 flex-1 min-h-0">
            <PromptOptimizer />
        </div>
      </div>
    </ToolsShell>
  );
}
