/**
 * Shared constants used across multiple phases
 * Ensures consistency between Phase 2 (components) and Phase 5 (layout)
 */

// ============================================================================
// LAYOUT CONSTANTS (Used by Phase 2 & Phase 5)
// ============================================================================

export const LAYOUT = {
  // Sidebar dimensions
  SIDEBAR_WIDTH: 280, // px - fixed width for filter sidebar
  
  // Grid columns for different breakpoints
  GRID_COLUMNS: {
    DESKTOP: 3,  // >= 1280px
    TABLET: 2,   // 768px - 1279px
    MOBILE: 1,   // < 768px
  },
  
  // Breakpoints (must match Tailwind config)
  BREAKPOINTS: {
    MOBILE: 640,   // sm
    TABLET: 768,   // md
    DESKTOP: 1280, // xl
  },
  
  // Spacing
  GAP: {
    GRID: 24,      // px - gap between resource cards
    SIDEBAR: 24,   // px - gap between sidebar and main content
  },
} as const;

// ============================================================================
// INTEGRATION ICON MAPPINGS (Used by Phase 2)
// ============================================================================

/**
 * Maps integration names (from database) to icon component names
 * Add new integrations here as needed
 */
export const INTEGRATION_ICONS = {
  // JavaScript/TypeScript
  'nextjs': 'NextJs',
  'react': 'React',
  'typescript': 'TypeScript',
  'javascript': 'JavaScript',
  'node': 'NodeJs',
  
  // Frameworks
  'vue': 'Vue',
  'angular': 'Angular',
  'svelte': 'Svelte',
  
  // Databases
  'postgres': 'PostgreSQL',
  'mysql': 'MySQL',
  'mongodb': 'MongoDB',
  'redis': 'Redis',
  
  // Cloud/DevOps
  'vercel': 'Vercel',
  'aws': 'AWS',
  'docker': 'Docker',
  'kubernetes': 'Kubernetes',
  
  // Tools
  'git': 'Git',
  'github': 'GitHub',
  'vscode': 'VSCode',
  
  // Add more as needed
} as const;

/**
 * Fallback icon for unknown integrations
 */
export const FALLBACK_INTEGRATION_ICON = 'Package';

/**
 * Maximum number of integration icons to display
 * If more than this, show "+N" badge
 */
export const MAX_INTEGRATION_ICONS = 3;

// ============================================================================
// FILTER CONSTANTS (Used by Phase 2, 3, 4)
// ============================================================================

export const FILTERS = {
  // Default sort option
  DEFAULT_SORT: 'recommended' as const,
  
  // Available sort options
  SORT_OPTIONS: [
    { value: 'recommended', label: 'Recommended' },
    { value: 'latest', label: 'Latest' },
    { value: 'views', label: 'Most Viewed' },
    { value: 'rating', label: 'Highest Rated' },
  ] as const,
  
  // localStorage key for filter persistence
  STORAGE_KEY: 'antigravity_filters',
  
  // Search debounce delay (ms)
  SEARCH_DEBOUNCE: 300,
} as const;

// ============================================================================
// CATEGORY GROUPS (Used by Phase 2)
// ============================================================================

/**
 * Category group definitions for top filter pills
 * Maps to the 'group' field in categories table
 */
export const CATEGORY_GROUPS = {
  PROCESS: 'process',
  WORK: 'work',
  SERVICE: 'service',
} as const;

export const CATEGORY_GROUP_LABELS = {
  [CATEGORY_GROUPS.PROCESS]: 'AI for Process',
  [CATEGORY_GROUPS.WORK]: 'AI for Work',
  [CATEGORY_GROUPS.SERVICE]: 'AI for Service',
} as const;

// ============================================================================
// ANIMATION CONSTANTS (Used by Phase 2)
// ============================================================================

export const ANIMATION = {
  // Accordion expand/collapse duration
  ACCORDION_DURATION: 300, // ms
  
  // Filter interaction response time target
  FILTER_RESPONSE: 100, // ms
  
  // Loading skeleton fade duration
  SKELETON_FADE: 200, // ms
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type SortOption = typeof FILTERS.SORT_OPTIONS[number]['value'];
export type CategoryGroup = typeof CATEGORY_GROUPS[keyof typeof CATEGORY_GROUPS];
export type IntegrationName = keyof typeof INTEGRATION_ICONS;
