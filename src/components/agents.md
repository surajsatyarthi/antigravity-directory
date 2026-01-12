# Component Rulebook & Memory

This file serves as the long-term memory for anyone (human or agent) editing files in `src/components`.

## Design Standard: "Always-On" UI (V2)

- **Visibility**: Never use `opacity-80` or `text-gray-500` for primary content (descriptions, labels).
- **Default State**: Content must be fully legible and vibrant (text-gray-400 minimum) on page load.
- **Hover Policy**: Hover effects should only add border glow or subtle background shifts. They MUST NOT be used to "reveal" the primary content color or icon vibrancy.
- **Icons**: Trust signal icons (Flow, Sync, AEO) should carry their respective brand colors at 90% opacity by default.

## Branding & Logo

- **Standard**: The logo must always read "antigravity directory".
- **Layout**: Stacked text. "directory" must be smaller font (+10px) and use `tracking-[0.2em]`.
- **Vertical Alignment**: The text block must be center-aligned to the icon.
- **Shine**: The logo icon (`Zap` container) must use the `animate-logo-shine` utility.

## Historical Fixes

- **[2026-01-12]**: Refactored branding to incorporate the "directory" sub-label and the legal association disclaimer in the footer.
