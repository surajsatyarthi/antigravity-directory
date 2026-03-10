import { Binary } from 'lucide-react';
import { TokenCounter } from '@/components/tools/TokenCounter';
import { safeJsonLd } from '@/lib/utils';
import { ToolsShell } from '@/components/tools/ToolsShell';

export const metadata = {
  title: 'TikToken Counter',
  description: 'Real-time token counting using OpenAI tiktoken logic. Estimate API costs for GPT-4 instantly.',
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

export default function TokenCounterPage() {
  return (
    <ToolsShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                <Binary className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tighter text-white">
                TikToken Counter
                </h1>
                <p className="text-slate-400 text-sm">
                Accurate tokenizer compatible with GPT-4 & modern LLMs
                </p>
            </div>
        </div>
        
        <div className="mt-4">
            <TokenCounter />
        </div>
      </div>
    </ToolsShell>
  );
}
