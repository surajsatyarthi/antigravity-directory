import { ComparisonPage } from '@/components/ComparisonPage';
import { comparisons } from '@/data/comparisons';

export async function generateMetadata() {
  const comparison = comparisons.find(c => c.id === 'claude-vs-chatgpt')!;
  return {
    title: 'Claude vs ChatGPT for Coding - Deep Comparison',
    description: comparison.description,
    keywords: comparison.tags,
  };
}

export default function ClaudeVsChatGPTPage() {
  const comparison = comparisons.find(c => c.id === 'claude-vs-chatgpt')!;
  return <ComparisonPage comparison={comparison} />;
}
