# PHASE 2.1: COMPLETE EXECUTION BRIEF
## Homepage Simplification + Hero Redesign (Rule of 3)

**Status**: 🔴 CRITICAL BLOCKER
**Priority**: Must complete today (Feb 5)
**Audience**: Antigravity (AI Developer)
**Reviewer**: Claude (PM)
**Deliverables**: 2 connected prompts

---

## EXECUTIVE SUMMARY

Your homepage has a **clarity problem**:
1. **Repetitive messaging** (same CTAs appear 3 times)
2. **Buried value** (marketplace not visible immediately)
3. **Unclear positioning** (users don't see Browse/Earn/Community)

**Solution**: Simplify + Redesign using Rule of 3 copywriting

---

## WHAT YOU NEED TO DO

### PROMPT 1: Homepage Simplification
**File**: `/docs/PHASE_2_1_HOMEPAGE_SIMPLIFICATION_PROMPT.md`
**What**: Delete repetitive components, reorder sections, remove job board references
**Timeline**: 35 minutes
**Effort**: 5 tasks (5-10 min each)

**Tasks**:
1. Delete CTASection.tsx (remove repetition)
2. Delete CategoryShowcase.tsx (redundant with sidebar)
3. Reorder homepage (Hero → Directory → Stats/Proof/HowTo)
4. Remove all /jobs references (Phase 2+ feature)
5. Verify Header/Footer consistency

**Result**: Leaner homepage. Marketplace visible in 1 viewport height. No repetition.

---

### PROMPT 2: Hero Section Redesign
**File**: `/docs/PHASE_2_1_HERO_SECTION_JSON_PROMPT.json` (JSON format)
**What**: Add Rule of 3 value cards to hero (Browse, Earn, Community)
**Timeline**: 2 hours
**Effort**: Design + implement three-value-card component

**Why Rule of 3**:
- Three items are memorable
- Addresses three user personas (Browsers, Creators, Community)
- Shows breadth of value instantly
- "Browse. Earn. Connect." is memorable

**What gets added to hero**:
```
┌─────────────────────────────────┐
│  Headline: "Unleash Your Creativity..."
│  Subheadline: "Browse. Earn. Connect."
│
│  [📦 Browse Tools] [💰 Earn 80%] [👥 Join Community]
│  2,200+ Resources  80% Commission  500+ Creators
│
│  [Browse All Tools] [List Resource]
│
│  [Search bar]
└─────────────────────────────────┘
```

---

## COMPLETE TIMELINE

```
NOW → 35 min:  Complete Homepage Simplification (Prompt 1)
              - Delete 2 components
              - Reorder 5 sections
              - Remove job board refs
              - Run build/test

35 min → 2.5h: Implement Hero Redesign (Prompt 2)
              - Add three-value-card component
              - Add Rule of 3 copy
              - Make responsive
              - Test all breakpoints

2.5h → 3h:    Final verification
              - Build passes
              - TypeScript passes
              - Console clean
              - All buttons work

3h → 5h:      PM Review (Claude)
              - Gate Report validation
              - Ralph 12-gate check
              - Approval decision

5h → Ready to ship Phase 2.1
```

**Target**: Complete both by EOD (Feb 5, 6 PM)

---

## THE THREE PROMPTS YOU HAVE

### 1. Homepage Simplification Prompt (Markdown)
- **Where**: `/docs/PHASE_2_1_HOMEPAGE_SIMPLIFICATION_PROMPT.md`
- **Format**: Markdown with detailed tasks
- **Length**: 400 lines, very detailed
- **Best for**: Step-by-step execution

**Key sections**:
- Problem statement (current bad flow)
- Solution (new better flow)
- 5 specific tasks (exact files/lines)
- Verification commands (copy/paste)
- Acceptance criteria (13 checkboxes)

---

### 2. Hero Section JSON Prompt
- **Where**: `/docs/PHASE_2_1_HERO_SECTION_JSON_PROMPT.json`
- **Format**: JSON (machine-readable + human-readable)
- **Length**: 400 lines, highly structured
- **Best for**: Understanding structure + implementation

**Key sections**:
- Rule of 3 explanation
- Three core values (Browse, Earn, Community)
- Visual mockup (ASCII)
- Component structure
- Copy examples
- Responsive requirements
- PM validation checklist

---

### 3. Complete Execution Brief (This Document)
- **Where**: `/docs/PHASE_2_1_COMPLETE_EXECUTION_BRIEF.md`
- **Format**: Markdown overview
- **Best for**: Understanding the big picture

**Connect the dots**:
- Why both prompts matter
- How they work together
- Timeline + effort
- Next steps

---

## HOW TO USE THESE PROMPTS

### Option A: Detailed Step-by-Step
1. Open Markdown prompt (#1)
2. Follow each task exactly
3. Copy/paste verification commands
4. Check off acceptance criteria

### Option B: Understand Full Picture First
1. Read this brief (you are here)
2. Skim JSON prompt (#2) to understand Rule of 3
3. Open Markdown prompt (#1)
4. Execute tasks

### Option C: Jump to Code
1. Open JSON prompt (#2)
2. Look at "implementation_details" section
3. Open Markdown prompt (#1)
4. Execute tasks

**Recommended**: Option A (most reliable)

---

## WHAT SUCCESS LOOKS LIKE

### Before (Current):
```
Hero
  "Unleash Your Creativity" + "Browse" + "List"
  ↓ Scroll 4+ sections
Stats
Creator Proof
How It Works
Category Showcase
  ↓ Finally
Directory (actual value)
  ↓ Scroll more
CTA Section (DUPLICATE)
  "Browse" again + "List" again + "Post Job" (wrong!)
```

**Problems**: Repetitive, buried, confusing, phase-creep

---

### After (Fixed):
```
Hero
  "Unleash Your Creativity" → "Browse. Earn. Connect."
  [3 Value Cards: Browse (2,200+), Earn (80%), Community (500+)]
  "Browse All Tools" + "List Resource"
  Search bar
  ↓ Minimal scroll
Directory (visible immediately!)
  [User can search/browse NOW]
  ↓ Optional scroll for interested users
Stats
Creator Proof
How It Works
```

**Benefits**: Clear, lean, memorable, immediate value

---

## METRICS TO TRACK AFTER SHIPPING

Once Phase 2.1 ships, measure:

| Metric | Current | Target | Success Criterion |
|--------|---------|--------|-------------------|
| **Time to Directory** | 4-5 viewports | 1 viewport | Users reach marketplace instantly |
| **Hero Clarity** | "What is this?" | "Browse/Earn/Community" | Users understand all 3 value props |
| **CTA Confusion** | High (3 same CTAs) | Low (1 path) | Users know exactly what to do |
| **Creator Signups** | Baseline | +20% | Rule of 3 + hero redesign drives signups |
| **Tool Browse Rate** | Baseline | +15% | Faster access to marketplace drives usage |
| **Page Load** | 1.2s | <2s | No regression from new cards |

---

## RULES TO FOLLOW

✅ **DO**:
- Follow Prompt #1 (Markdown) step-by-step
- Use exact file paths and line numbers
- Run verification commands before submitting
- Test responsive (375px, 768px, 1024px)
- Follow Prompt #2 (JSON) for hero design
- Make sure Rule of 3 is clear (Browse, Earn, Community)

❌ **DON'T**:
- Skip verification steps
- Assume components are deleted (verify with grep)
- Forget to reorder (Hero → Directory → Rest)
- Add new features beyond this scope
- Change color scheme or brand elements
- Remove CTA buttons (they stay, just move)

---

## SUBMIT YOUR WORK

When complete, add to **REPORT-CENTER.md**:

```
### Task: Phase 2.1 - Homepage Simplification + Hero Redesign

**Status**: SUBMITTED

**Deliverables**:
- Homepage simplification: ✅ COMPLETE
- Hero section redesign: ✅ COMPLETE
- Test results: npm run build ✅ PASS
- TypeScript: pnpm tsc --noEmit ✅ PASS
- Console: 0 errors ✅
- Responsive verified: 375px, 768px, 1024px ✅

**Screenshots**:
- [New hero section with 3 value cards]
- [Homepage with reordered sections]
- [Mobile view at 375px]

**Ready for PM review**: YES
```

---

## PM WILL VALIDATE USING

**Gate Report Template** (unskippable):

| Gate | Check | Status |
|------|-------|--------|
| Ralph 1: Build | npm run build passes | ✅/❌/⏳ |
| Ralph 2: TypeScript | pnpm tsc --noEmit | ✅/❌/⏳ |
| Ralph 3: Console | No errors/warnings | ✅/❌/⏳ |
| Ralph 4: Logic | Buttons navigate correctly | ✅/❌/⏳ |
| Ralph 6: Performance | <2s load time | ✅/❌/⏳ |
| Ralph 7: Mobile | Responsive at 3 sizes | ✅/❌/⏳ |
| PM 1: Strategic Alignment | Antigravity marketplace | ✅/❌/⏳ |
| UX: Rule of 3 Clear | Browse/Earn/Community visible | ✅/❌/⏳ |

**Result**: APPROVED / CONDITIONAL / BLOCKED

---

## QUESTIONS?

If you get stuck:
1. Check the detailed Markdown prompt (#1) for that specific task
2. Check the JSON prompt (#2) for implementation details
3. Add to REPORT-CENTER.md "BLOCKERS & ISSUES" section
4. PM checks daily and will help unblock

---

## FINAL CHECKLIST BEFORE SUBMITTING

- [ ] All 5 homepage simplification tasks done (Prompt #1)
- [ ] Hero section redesigned with 3 value cards (Prompt #2)
- [ ] Build passes: npm run build ✅
- [ ] TypeScript passes: pnpm tsc --noEmit ✅
- [ ] Console clean: 0 errors
- [ ] Responsive tested: 375px ✅, 768px ✅, 1024px ✅
- [ ] Card buttons navigate correctly
- [ ] "Browse. Earn. Connect." subheadline visible
- [ ] CTASection.tsx deleted
- [ ] CategoryShowcase.tsx deleted
- [ ] Job board links removed
- [ ] Screenshot of new hero taken
- [ ] Work submitted to REPORT-CENTER.md
- [ ] Ready for PM review

---

**Go time. You've got 6 hours. Let's simplify this homepage and ship Phase 2.1.**

Questions? → REPORT-CENTER.md "BLOCKERS & ISSUES"
Ready? → Update REPORT-CENTER.md with deliverables
Stuck? → PM checks doc daily and will help
