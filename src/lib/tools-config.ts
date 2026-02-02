import { Binary, Calculator, FileJson, Split, Terminal } from 'lucide-react';

export const toolsCategories = [
  {
    category: "Converters",
    items: [
      { name: 'JSON to Pydantic', href: '/tools/json-to-pydantic', icon: FileJson, description: 'Convert JSON to Pydantic v2' },
    ]
  },
  {
    category: "Calculators",
    items: [
      { name: 'LLM Pricing (ROI)', href: '/tools/roi-calculator', icon: Calculator, description: 'Calculate API costs' },
      { name: 'TikToken Counter', href: '/tools/token-counter', icon: Binary, description: 'Count tokens for GPT-4' },
    ]
  },
  {
    category: "Generators",
    items: [
      { name: 'Prompt Optimizer', href: '/tools/prompt-generator', icon: Terminal, description: 'Optimize system prompts' },
      { name: 'RAG Visualizer', href: '/tools/rag-visualizer', icon: Split, description: 'Visualize text chunking' },
    ]
  }
];

export const allTools = toolsCategories.flatMap(c => c.items);
