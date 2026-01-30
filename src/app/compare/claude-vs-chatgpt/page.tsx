import { ComparisonPage } from '@/components/ComparisonPage';
import { COMPARISONS } from '@/data/comparisons';

export async function generateMetadata() {
  const comparison = COMPARISONS['claude-vs-chatgpt'];
  if (!comparison) return {};
  
  return {
    title: 'Claude vs ChatGPT for Coding - Deep Comparison',
    description: comparison.description,
    keywords: comparison.tags,
  };
}

export default function ClaudeVsChatGPTPage() {
  const comparison = COMPARISONS['claude-vs-chatgpt'];
  if (!comparison) return <div>Comparison not found</div>;
  
  return <ComparisonPage comparison={comparison} />;
}
