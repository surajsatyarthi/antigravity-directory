// Ad slot configs — one per placement
// To activate a real sponsor: set active: true and fill in all fields
// To revert to placeholder: set active: false

export const SPONSOR_BADGE = {
  active: true,
  name: 'CodeRabbit',
  tagline: 'Cut code review time & bugs in half',
  logoUrl: 'https://coderabbit.ai/images/CR_mark_orange.svg',
  href: 'https://coderabbit.ai',
  description: 'AI code reviews for every pull request. Instant analysis, 1-click fixes, fully customizable.',
};

export const SPONSOR_HOMEPAGE = {
  active: true,
  name: 'Warp',
  tagline: 'The Agentic Development Environment',
  logoUrl: 'https://framerusercontent.com/images/GybmHeNj1WzkgFqIjQYypmhg.png',
  href: 'https://www.warp.dev',
  description: 'Fast terminal, state-of-the-art agents, and cloud orchestration for the full software development lifecycle.',
};

export const SPONSOR_CATEGORY = {
  active: true,
  name: 'Groq',
  tagline: 'Inference is Fuel for AI',
  logoUrl: 'https://cdn.sanity.io/images/chol0sk5/production/8776faec2ef547091786cde2fca3aaa3ca1a2fc6-423x89.svg',
  href: 'https://groq.com',
  description: 'Fast, low-cost AI inference. The fastest LLM API available.',
};

// Legacy export — keeps any other files that import SPONSOR working
export const SPONSOR = SPONSOR_BADGE;
