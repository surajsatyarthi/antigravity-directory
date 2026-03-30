# DESIGN SPEC — googleantigravity.directory
**Version**: 2.1 — UPDATED 2026-03-08 (UI-UX-SPEC.md merged in)
**Single source of truth for all design decisions. UI-UX-SPEC.md is archived.**
**Model**: cursor.directory — dark mode, minimal, content-first

---

## THE ONE GOAL

**$2,000 MRR AS FAST AS POSSIBLE.**

Design exists to serve that goal. The site is dark mode. cursor.directory is dark mode. We copy it exactly.

---

## PURPOSE OF THIS DOCUMENT

This spec gives Antigravity (the AI coder) zero-interpretation-room instructions for every UI component. Every decision is made here. Antigravity implements exactly what is written. If something is not specified here, ask the PM — do not invent.

---

## LOCKED DESIGN DECISIONS

| Decision | Value | Do not change |
|---|---|---|
| Mode | Dark only | No light mode, no toggle |
| Page background | `bg-black` | All public pages |
| Card background | `bg-white/[0.03]` | Subtle glass on dark |
| Card border resting | `border-white/[0.06]` | Barely visible |
| Card border hover | `border-blue-500/40` | Blue on hover |
| Header | `bg-black/90 backdrop-blur-md` | Dark header — cursor.directory pattern |
| Font | Inter (body) + JetBrains Mono (code, counts, tags, logo) | No other fonts |
| Card resting opacity | `opacity-60` | Cards dim when not hovered |
| Card hover opacity | `opacity-100` | Cards fully visible on hover |
| Action buttons | Hidden at rest, visible on hover | cursor.directory pattern |
| Accent colour | `text-blue-400` / `bg-blue-600` | Blue on dark backgrounds |
| Border radius | `rounded-none` (cards), `rounded-full` (buttons, tags) | Cards are sharp-cornered — cursor.directory pattern |
| Footer | `bg-slate-900` | Dark footer |
| Primary text | `text-white` | All headings, card titles |
| Secondary text | `text-gray-400` | Descriptions, meta |
| Muted text | `text-gray-500` or `text-gray-600` | Labels, counts |

---

## COMPONENT SPECS

### C1 — Header

**Behaviour**: Sticky. Always visible. Dark with blur — matches cursor.directory pattern.

```
bg-black/90 backdrop-blur-md border-b border-white/[0.08] h-14 sticky top-0 z-50
```

**Layout** (left to right):
```
[Logo]  ←  flex-1 shrink-0  →  [CategorySelector ▾][SearchInput 240-320px]  →  [NavLinks]  [SUBMIT btn]  [Auth]
```

**Search bar — category selector** (locked 2026-03-08):
- Pattern: category dropdown prepended to search input (Amazon pattern)
- Default selection: "All" — searches across all 10 resource types
- Options: All · Skills · Rules · MCP Servers · Prompts · Agents · Workflows · Boilerplates · Tutorials · Cheatsheets · Troubleshooting
- Selector style: dark, minimal — `bg-black border-r border-white/[0.08] text-gray-400 text-[11px]`
- When a category is selected, search results filter to that type only
- On mobile: selector collapses or is hidden — search input only

**Logo**:
- "antigravity" in JetBrains Mono, font-black, text-white
- "directory" below in JetBrains Mono, text-[10px], tracking-[0.3em], text-gray-400
- Zap icon left of text, black, w-9 h-9 container

**Nav links** (desktop only, hidden below md):
- Rules, Prompts, MCPs, Skills, Agents, More (dropdown)
- More dropdown: Workflows, Boilerplates, Troubleshooting, Tutorials, Cheatsheets, Advertise
- Text: `text-[11px] font-semibold text-slate-400 hover:text-white uppercase tracking-wide`

**SUBMIT button**:
- `px-3 py-1 bg-white/[0.08] border border-white/[0.12] text-white text-[11px] font-semibold rounded-md`
- Zap icon left

**Auth**:
- Signed out: "SIGN IN" text button, `text-slate-400 hover:text-white`
- Signed in: avatar (Google profile image, w-7 h-7, rounded-full) → links to `/dashboard`

---

### C2 — ResourceCard

**The most important component. Every card on the site uses this.**

**Resting state**:
```
bg-white/[0.03] border border-white/[0.06] rounded-none opacity-60
transition-all duration-200
```

**Hover state**:
```
opacity-100 border-blue-500/40 shadow-lg shadow-black/20
```

**Internal layout** (single row on desktop, stacked on mobile):
```
[Category badge + integrations]  |  [Title + Description]  |  [Stats + Actions]
```

**Left section** (`shrink-0`):
- Category badge: `px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase tracking-widest rounded`

**Middle section** (`flex-1 min-w-0`):
- Title: `text-base font-bold text-white group-hover:text-blue-400 transition-colors truncate`
- Description: `text-sm text-gray-400 line-clamp-1 font-medium`

**Right section** (`shrink-0`):
- Rating number: `text-sm font-bold font-mono text-white`
- Views: Eye icon + `text-sm font-bold font-mono text-gray-400`
- Arrow icon: dark rounded button, blue on hover

**Mobile divider**: `border-t border-white/[0.06]`

**Hover-revealed action buttons** (absolute, bottom-right):
- Copy button: `bg-slate-900 text-white` rounded
- Bookmark button: `bg-white/[0.06] border border-white/[0.12] text-gray-400` rounded
- Both hidden with `hidden group-hover:flex`

**Featured/Sponsored card**:
- Top-right ribbon: `bg-yellow-500/15 border-yellow-500/30` with pulsing dot + "Sponsored" text
- Border: `border-yellow-500/40`

**What is NOT on ResourceCard**:
- No price display
- No "Buy" button
- No "Claim" button
- No earnings display

---

### C3 — CategoryCard (homepage grid)

**REMOVED — 2026-03-08. Decision: no category grid on homepage. Category pages accessible via footer and nav only.**

---

### C4 — Hero Section (homepage)

**Layout**: Centred, full-width, `py-16 md:py-20`

**Background**: Dark page. Subtle blue radial gradient overlay permitted.

**H1**:
```
text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic leading-[1.1]
```
Text: "The #1 Resource Directory for Google Antigravity IDE"

**Subheading**:
```
text-lg text-slate-400 max-w-2xl mx-auto
```
Text: "3,100+ MCP servers, Skills, Rules, Prompts and more — free to browse, free to submit."

**CTA**:
- Single button: "Browse Resources" → scrolls to `#directory`
- `px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700`

**What is NOT in the hero**:
- No "Contribute. Connect. Collect$"
- No earnings claims
- No creator count
- No "500+ creators"

---

### C5 — Submit Form

**Page background**: `bg-black`
**Form background**: `bg-white/[0.03] border border-white/[0.06]`

**Fields** (top to bottom):
1. Category dropdown — shows locked 10, no "FREE" or "PAID" labels
2. Resource Name — text input
3. URL — url input
4. Description — textarea, maxLength=200
5. GitHub URL — text input, optional
6. Tags — text input, placeholder "react, typescript, postgres" optional

**Submit button**:
```
bg-blue-600 text-white font-bold py-3 rounded-xl w-full hover:bg-blue-700
```
Text: "Submit Resource"

**Success state**: Green banner "Submitted! We manually review every resource within 7 days."

**What is NOT in this form**:
- No pricing section
- No tier cards
- No "FREE" / "PAID" badge next to category
- No CheckoutOverlay
- No FAQ about charges

---

### C6 — Advertise Page Layout

**Page background**: `bg-black`

**Hero**:
- H1: "Reach Antigravity Developers Where They Build" — `text-white`
- Subheading: dark-mode `text-gray-400`

**Contact form**: dark inputs with `bg-white/[0.05] border border-white/[0.08]`

**Stats** (honest only):
- "3,100+ resources indexed"
- "10 categories"

---

### C7 — Footer

**Background**: `bg-slate-900`

**Three columns**:
1. Brand: logo + tagline "The #1 resource hub for Google Antigravity IDE."
2. Browse: links to all 10 category pages
3. Company: About, Advertise, Submit a Resource

**Bottom bar**: "© 2026 Antigravity Directory" — left aligned

**What is NOT in the footer**:
- No social media links (we have none)
- No Discord link
- No "Earn with us" link

---

## TYPOGRAPHY

| Element | Classes |
|---------|---------|
| Page hero H1 | `text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic` |
| Section heading H2 | `text-3xl md:text-4xl font-black text-white uppercase tracking-[0.15em]` |
| Card title H3 | `text-base font-bold text-white` |
| Body text | `text-sm text-gray-400 leading-relaxed` |
| Muted meta | `text-xs text-gray-500 font-mono` |
| Nav links | `text-[11px] font-semibold text-slate-400 hover:text-white uppercase tracking-wide` |
| Footer heading | `text-xs font-semibold tracking-widest uppercase text-slate-400` |
| Footer links | `text-sm text-slate-300 hover:text-white transition-colors` |

**Fonts**: Inter (`var(--font-inter)`) — body + headings · JetBrains Mono (`var(--font-mono)`) — counts, tags, code, logo

---

## SPACING & LAYOUT

| Context | Value |
|---------|-------|
| Max content width | `max-w-[1920px] mx-auto` |
| Horizontal page padding | `px-4 sm:px-6 lg:px-8` |
| Section vertical padding | `py-16` |
| Card internal padding | `p-4` (resource cards) / `p-5` (category grid) |
| Card gap | `gap-4` |
| Header height | `h-14` |

---

## ANIMATION RULES

- Card hover: `transition-all duration-200` — fast, not sluggish
- Icon scale on hover: `group-hover:scale-110 transition-transform duration-200`
- Opacity reveal: cards go from `opacity-60` to `opacity-100` on hover
- Button appearance: `hidden group-hover:flex` — instant appear
- No page transition animations — keep it fast

---

## LOCKED CATEGORY LIST

Final. Do not add, remove, or rename without PM approval.

| # | Display Name | URL Slug | Icon |
|---|-------------|----------|------|
| 1 | MCP Servers | mcp-servers | 🤖 |
| 2 | Skills | skills | ✨ |
| 3 | Rules | rules | 📋 |
| 4 | Prompts | prompts | 💬 |
| 5 | Agents | agents | 🧠 |
| 6 | Workflows | workflows | ⚙️ |
| 7 | Boilerplates | boilerplates | 🏗️ |
| 8 | Troubleshooting | troubleshooting | 🔧 |
| 9 | Tutorials | tutorials | 🎓 |
| 10 | Cheatsheets | cheatsheets | 📄 |

---

## PAGE BACKGROUND REFERENCE

Every single public-facing page uses `bg-black`:

| Page | Body background |
|---|---|
| Homepage | `bg-black` |
| Category pages `/[slug]` | `bg-black` |
| Resource detail `/t/[slug]` | `bg-black` |
| Submit | `bg-black` |
| Advertise | `bg-black` |
| About | `bg-black` |
| Auth/signin | `bg-black` |
| Admin/submissions | `bg-black` |
| Footer | `bg-slate-900` |
| Header | `bg-black/90` |
| `bg-white` as page background | NEVER |
| `bg-slate-50` | NEVER |
| `bg-gray-950` | Permitted for small elements only |

---

## COPY RULES

These phrases are banned from appearing anywhere on the public site:

| Banned phrase | Why |
|---|---|
| "Collect$" | Implies creator earnings |
| "Earn 80%" | We are not a marketplace |
| "Commission" | We are not a marketplace |
| "Creator earnings" | We are not a marketplace |
| "Payout" | We are not a marketplace |
| "Premium resource" | All resources are free |
| "Claim your tool" | No claiming system |
| "500+ creators" | Fabricated |
| "50k monthly views" | Fabricated |
| "Trusted by Y Combinator" | Fabricated |
| "Shop by category" | We are not a shop |
| "Premium tools" | All resources are free |
| "Proceed to payment" | No payments |

---

## IMPLEMENTATION NOTES FOR ANTIGRAVITY

1. When editing a component, read this file first
2. If a design decision is not in this file, stop and ask the PM — do not invent
3. If still not clear, stop and ask — do not invent
4. The cursor.directory site is the visual reference — it is dark mode
5. Every card must have `opacity-60` at rest and `opacity-100` on hover — this is non-negotiable
6. `bg-black` is the correct page background. Never use `bg-white` or `bg-slate-50` on a public page.
