# cursor.directory — Full Design & Structure Audit
**Audited:** 2026-03-03 | **Source:** GitHub repo (pontusab/cursor.directory) + live site
**Purpose:** Reference for replicating/improving design for googleantigravity.directory

---

## SITE MAP (All Pages)

| Path | Purpose | Auth? |
|------|---------|-------|
| `/` | Homepage — hero + search + featured strips + member grid | Public |
| `/rules` | Rules directory — sidebar + tabs + card grid | Public |
| `/rules/official` | Framework-creator submitted rules | Public |
| `/rules/[lib]` | Rules filtered by library tag | Public |
| `/rules/popular` | Sort by popularity | Public |
| `/[slug]` | Individual rule full page | Public |
| `/mcp` | MCP directory — featured carousel + full list | Public |
| `/mcp/[slug]` | Individual MCP page — one-click install | Public |
| `/mcp/new` | Submit an MCP | **Auth** |
| `/generate` | AI rule generator (file upload) | **Auth** |
| `/board` | Trending community posts | Public (post/vote = Auth) |
| `/jobs` | Job listings | Public |
| `/jobs/new` | Post a job (paid) | **Auth** |
| `/members` | Member grid with pagination | Public |
| `/u/[slug]` | User profile | Public |
| `/companies` | Company directory | Public |
| `/events` | Community events | Public |
| `/learn` | Video tutorials | Public |
| `/games` | Mini-games/fun projects | Public |
| `/about` | About page | Public |
| `/login` | Sign in (GitHub + Google OAuth) | — |

**No `/advertise` page exists.** Sponsorship is direct/negotiated only.

---

## HEADER

```
[cursor.directory]  [Rules] [Trending] [Jobs] [MCPs] [Generate] [Members] [More ▾]     [Sign In]
```

- **Logo:** text-only — `cursor.directory` — `font-medium font-mono text-sm`. Link to `/`.
- **Container:** `md:fixed z-20 flex justify-between items-center top-0 px-6 py-2 w-full bg-background backdrop-filter backdrop-blur-sm bg-opacity-30` — sticky frosted-glass.
- **Nav links (desktop, first 6):** Rules, Trending (`/board`), Jobs, MCPs (`/mcp`), Generate, Members.
- **"More" dropdown (items 7–11):** Games, Learn, About, Companies, Events.
- **Inactive link color:** `#878787`. **Active:** white (`text-primary`).
- **Auth button:** `"Sign In"` → `bg-white text-black h-8 rounded-full`. When signed in: square avatar with dropdown.
- **No search bar in header.** Search is on homepage only.
- **Cmd+K** opens command palette (search shortcut).
- **Mobile:** Hamburger → slide-down menu with all nav items.

---

## HOMEPAGE

### Hero

- No image background — plain page background color.
- **Headline:** `"Join the Cursor community with [X]+ members"` — `text-[21px]`, entire line is a link to `/login`.
- **Subheadline:** Long sentence, `text-sm text-[#878787] max-w-[620px] mx-auto`. Inline links (Generate, MCPs, jobs) with dashed underline style.
- **Search bar:** Centered, `max-w-2xl`, height `100px`, `border border-[#2C2C2C]`. Animated placeholder (character-by-character fade-in). No search button — Enter submits. Routes to `?q=` param. **This IS the CTA** — no separate buttons.
- **Layout:** `flex justify-center min-h-screen mt-[10%]`

### Featured MCPs Strip

- Label: `"Featured MCPs"` + "View all →" link.
- Horizontal scroll of **pill-shaped buttons**: `px-6 py-2 text-sm rounded-full font-medium border border-border`.
- Each pill: 16px logo + MCP name. Only premium-tier MCPs shown.
- Framer Motion fade-in (delay 0.2s).

### Featured Jobs Strip

- Label: `"Featured Jobs"` + "View all →" link.
- Carousel: 2 cols md / 4 cols lg. Card height: 130px fixed.
- Card: 32px square company avatar + company name + job title + 2-line description.
- Only premium jobs shown.

### Rules Sections

- Multiple labeled sections (e.g. "TypeScript", "Python", etc.) each with "View all →".
- Grid: `lg:grid-cols-4` (small) or `lg:grid-cols-2 xl:grid-cols-3` (standard).
- Cards at 50% opacity → 100% on hover.
- "Load more" pattern — 6 items per batch.

### Members Grid

- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`.
- Card: square grayscale avatar → color on hover. Username in `text-xs text-[#878787] font-mono`.
- 12 members shown.

### Trending Posts

- 3 board posts shown. Avatar + username + title + vote count.

### No Footer

**cursor.directory has NO site footer.** Zero. No links, no copyright, nothing. Navigation is header-only.

---

## RULES PAGE (`/rules`)

### Layout: Two-Column

```
[Sidebar 256px sticky]  |  [Tabs: All | Popular | Official]  [Search]
                        |  [Card grid]
```

### Sidebar

- `w-64 p-4` sticky at `top-12`.
- Each category: ghost button full-width, left-aligned tag name, right-aligned count in `#878787`.
- Bottom: separator + `"Submit"` button (rounded-full outline, links to GitHub repo).

### Tabs

- `"All"` / `"Popular"` / `"Official"`.
- Height `h-8 px-4 py-0`.
- Active: `bg-[#2C2C2C] text-white`. Inactive: `bg-[#1D1D1D] text-[#878787]`.

### Rule Cards

- **Square aspect ratio** (`aspect-square`).
- Default: **50% opacity**. Hover: **100% opacity** + action buttons appear.
- Content: monospace code preview, `text-sm font-mono`.
- Action buttons (bottom-right, absolute, appear on hover): Share, Copy (black rounded-full, `size-9`), Save.
- Copy triggers toast: `"Copied to clipboard."`

---

## INDIVIDUAL RULE PAGE (`/[slug]`)

- Left Menu sidebar + right detail panel.
- Rule card: `max-w-[1000px]`, full opacity (not 50%).
- Right panel (`w-full xl:w-[400px]`):
  - Title `text-lg font-medium`
  - Tags: `bg-[#1D1D1D] rounded-full font-mono text-xs px-2 py-1`
  - Author: 24px square avatar + name
  - Separator: `border-dashed border-[#2C2C2C]`

---

## MCP PAGE (`/mcp`)

- Full-width, no sidebar. `max-w-screen-xl mx-auto px-6 py-12`.
- Featured carousel (premium only): 2 cols md / 4 cols lg. 130px height.
- Full list: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`.
- Search: debounced 150ms, `"Search 1800+ MCPs"` placeholder.
- Infinite scroll (36 items per batch).
- Each card: `flex h-full items-center p-4 border border-border hover:bg-accent`.
  - 32px square logo + name `font-medium text-sm` + description `text-xs text-[#878787] line-clamp-3 font-mono`.

---

## GENERATE PAGE (`/generate`)

- Auth-gated (blurred overlay if not signed in).
- File upload: `.cursorrules`, `package.json`, `requirements.txt`.
- Background: auto-scrolling rule ticker with gradient fade edges.
- **Sponsored slot:** Fixed bottom-right. `"Sponsored by"` `text-xs text-[#666666] font-mono` + CodeRabbit logo 110×18px. Background `#0D0D0D`. Slides in after 0.5s delay.

---

## BOARD PAGE (`/board`)

- `max-w-4xl` centered.
- Post card: square avatar (`rounded-none`) + username + title + external link icon + 2-line content + vote pill.
- Vote button: `h-8 px-4 rounded-full`. Inactive: `bg-[#1D1D1D] text-[#878787]`. Active: `bg-primary text-secondary`.
- Optimistic UI on vote.

---

## JOBS PAGE (`/jobs`)

- Featured carousel (premium jobs) + full list below.
- Promotional card (right side or inline): black bg with `#2C2C2C` diagonal pattern. Headline: `"Reach 300k+ developers per month."`. CTA: `"Add job listing"` rounded-full outline button.

### Pricing (Job Listings)

| Tier | Price | What You Get |
|------|-------|-------------|
| Standard | $99 one-time | Listed in job board |
| Featured | $299 one-time | Prime placement in featured carousel |
| Premium | $999 one-time | Featured + email to network + social + homepage |

Payment processor: **Polar** (not Stripe).

---

## ABOUT PAGE (`/about`)

- `max-w-screen-md mx-auto px-6 py-12`.
- Heading `text-4xl mt-20 mb-12 text-center`.
- Body text `text-[#878787] text-sm leading-relaxed`.
- Section headings `text-xl mb-2`.
- Inline links with dashed bottom border.
- Built by 2 people (Pontus + Viktor). Links to Midday and Languine projects.

---

## USER PROFILE (`/u/[slug]`)

- **Banner:** Full-width, 145px height. Fallback: diagonal stripe pattern.
- **Sponsored badge:** Absolute bottom-right of banner. `"Sponsored by"` + CodeRabbit logo.
- **Avatar:** 96px square, `border border-border`.
- **Meta:** Name `text-xl font-mono` + status `text-sm font-mono text-[#878787]` + following/follower counts.
- **Tabs:** Posts, Saved Rules.

---

## SPONSOR / AD SLOTS — FULL MAP

**Only 2 hardcoded sponsor placements. Both are CodeRabbit.**

| # | Location | Position | Size | Style |
|---|----------|----------|------|-------|
| 1 | Generate page | Fixed bottom-right of viewport | 110×18px logo | `"Sponsored by"` label, `#0D0D0D` bg, slides in |
| 2 | User profile hero | Absolute bottom-right of banner | 110×18px logo | Same style |

**No banner ads. No sidebar ads. No listing-inline ads. No self-serve ad system.**

---

## DESIGN SYSTEM

### Color Palette (Dark Mode — Default)

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#0D0D0D` | Page background |
| `--card` | `#1A1A1A` | Card backgrounds |
| `--border` | `#2B2B2B` | All borders |
| `--primary` | `#F5F8FF` (white) | Primary text, active elements |
| Body text muted | `#878787` | Secondary text, meta, counts |
| Tag/chip bg | `#1D1D1D` | Library tag backgrounds |
| Component borders | `#2C2C2C` | Inputs, separators |
| Sponsor bg | `#0D0D0D` | Sponsor badge background |
| Input placeholder | `#585858` | Search placeholder text |

### Typography

| Element | Size | Weight | Font |
|---------|------|--------|------|
| Logo | `text-sm` (14px) | medium | Geist Mono |
| Hero headline | `text-[21px]` | normal | Geist Sans |
| Page headings | `text-xl`–`text-4xl` | medium | Geist Sans |
| Body text | `text-sm` (14px) | normal | Geist Sans |
| Meta / labels | `text-xs` (12px) | normal | Geist Mono |
| Card code | `text-sm` | normal | Geist Mono |
| Tag text | `text-[10px]` | normal | Geist Mono |

- `line-height: 1.65` globally.
- `antialiased` rendering.

### Key UI Patterns

**Cards (Rules):**
- Square aspect ratio (`aspect-square`)
- Default 50% opacity → 100% on hover
- Monospace code preview content
- Action buttons appear on hover (absolute bottom-right)
- Copy button: `rounded-full size-9` black bg white icon

**Cards (MCP/Jobs):**
- Fixed 130px height
- `flex items-center p-4 border border-border hover:bg-accent`
- No aspect-square constraint

**Avatars:**
- ALL avatars are **square** (`rounded-none`) — not circles. Distinctive.
- 16px (nav pills), 24px (rule sidebar), 32px (MCP/job cards), 48px (job full), 96px (profile).

**Tags / Pills:**
- Library tags: `bg-[#1D1D1D] rounded-full font-mono text-xs px-2 py-1`
- Filter pills: `px-6 py-2 text-sm rounded-full border border-border`

**Links (inline):**
- Dashed underline: `border-b border-border border-dashed`
- Color: `text-primary` (white in dark mode)

**Buttons:**
- Primary: black bg, white text, `rounded-full`
- Outline: transparent bg, white border, `rounded-full`
- Sign in: `bg-white text-black h-8 rounded-full`
- Tab active: `bg-[#2C2C2C] text-white`
- Tab inactive: `bg-[#1D1D1D] text-[#878787]`

**Sidebar:**
- `w-64` (256px) fixed width
- Ghost buttons, full-width, left-aligned
- Count right-aligned in `#878787`

**Animations:**
- Framer Motion on most sections: `opacity 0→1, y 10→0, duration 0.5s, ease easeOut`
- Stagger children with `0.2s` offset
- Character-by-character placeholder fade-in on search inputs

**No footer.** Navigation is header-only.

---

## MONETISATION MODEL

| Revenue Stream | How It Works | Price |
|---------------|-------------|-------|
| Job listings | One-time payment via Polar | $99 / $299 / $999 |
| MCP featured placement | Monthly subscription via Polar | $299/mo featured, $499/mo premium |
| Sponsorship | Direct negotiation (CodeRabbit is only current sponsor) | Unknown |
| User subscriptions | **None** | — |
| Ads (self-serve) | **None** | — |

---

## KEY DIFFERENCES VS OUR SITE

| cursor.directory | googleantigravity.directory (ours) |
|-----------------|----------------------------------|
| Dark mode default | Light mode (already done) |
| No footer | We need a footer |
| No `/advertise` page | We need one (self-serve or form) |
| Square avatars | Our choice |
| Geist font | We use Inter + JetBrains Mono |
| No hero CTAs | We have SUBMIT button |
| Jobs as revenue | We use sponsorships as revenue |
| Polar payments | We'll use PayPal / Razorpay |
| Sidebar on rules pages | We have TopFilterBar + FilterSidebar |
| 50% opacity card reveal | We can adopt this |

---

*Audit complete. Use this as the reference spec for UI implementation.*
