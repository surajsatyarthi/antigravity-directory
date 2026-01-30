import { ComparisonPage } from '@/components/ComparisonPage';
import { COMPARISONS } from '@/data/comparisons';

export async function generateMetadata() {
  const comparison = COMPARISONS['copilot-vs-cursor'];
  if (!comparison) return {};

  return {
    title: 'GitHub Copilot vs Cursor - AI IDE Comparison',
    description: comparison.description,
    keywords: comparison.tags,
  };
}

export default function CopilotVsCursorPage() {
  const comparison = COMPARISONS['copilot-vs-cursor'];
  if (!comparison) return <div>Comparison not found</div>;
  
  return <ComparisonPage comparison={comparison} />;
}
