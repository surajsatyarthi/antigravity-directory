import { Calculator } from 'lucide-react';
import { RoiCalculator } from '@/components/tools/RoiCalculator';
import { safeJsonLd } from '@/lib/utils';
import { ToolsShell } from '@/components/tools/ToolsShell';

export const metadata = {
  title: 'LLM Cost & ROI Calculator',
  description: 'Compare API costs for OpenAI, Anthropic, Gemini, and Llama models. Calculate monthly expenses based on your token usage.',
};

const jsonLd = safeJsonLd({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  'name': metadata.title,
  'description': metadata.description,
  'applicationCategory': 'BusinessApplication',
  'operatingSystem': 'All',
  'offers': {
    '@type': 'Offer',
    'price': '0',
    'priceCurrency': 'USD',
  },
});

export default function RoiCalculatorPage() {
  return (
    <ToolsShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Calculator className="w-6 h-6 text-blue-400" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tighter text-white">
                LLM Pricing Calculator
                </h1>
                <p className="text-slate-400 text-sm">
                Estimate your monthly API bill across top providers
                </p>
            </div>
        </div>
        
        <div className="mt-4">
            <RoiCalculator />
        </div>
      </div>
    </ToolsShell>
  );
}
