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
  name: 'Mistral AI',
  tagline: 'Frontier AI in your hands',
  logoUrl: 'https://svgl.app/library/mistral-ai_logo.svg',
  logoFilter: undefined,
  href: 'https://mistral.ai',
  description: 'Building the world’s most advanced AI systems. High-performance models available everywhere.',
};

// Legacy export — keeps any other files that import SPONSOR working
export const SPONSOR = SPONSOR_BADGE;
