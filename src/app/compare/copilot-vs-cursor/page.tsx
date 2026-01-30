import { ComparisonPage } from '@/components/ComparisonPage';
import { comparisons } from '@/data/comparisons';

export async function generateMetadata() {
  const comparison = comparisons.find(c => c.id === 'copilot-vs-cursor')!;
  return {
    title: 'GitHub Copilot vs Cursor - AI IDE Comparison',
    description: comparison.description,
    keywords: comparison.tags,
  };
}

export default function CopilotVsCursorPage() {
  const comparison = comparisons.find(c => c.id === 'copilot-vs-cursor')!;
  return <ComparisonPage comparison={comparison} />;
}
