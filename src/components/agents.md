# Component Rulebook & Memory

This file serves as the long-term memory for anyone (human or agent) editing files in `src/components`.

## Design Standard: "Always-On" UI (V2)

- **Visibility**: Never use `opacity-80` or `text-gray-500` for primary content (descriptions, labels).
- **Default State**: Content must be fully legible and vibrant (text-gray-400 minimum) on page load.
- **Hover Policy**: Hover effects should only add border glow or subtle background shifts. They MUST NOT be used to "reveal" the primary content color or icon vibrancy.
- **Icons**: Trust signal icons (Flow, Sync, AEO) should carry their respective brand colors at 90% opacity by default.

## Historical Fixes

- **[2026-01-12]**: Fixed JSX syntax in `FilterSidebar` where checkbox labels were improperly mapped during the high-density refactor.
