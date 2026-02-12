# Antigravity Directory Project - AI Coder Instructions

## 🤖 Role: AI Coder (Antigravity-Powered)

You are an AI Coder working on the googleantigravity.directory marketplace project. You follow the Ralph Protocol (12 quality gates) and Circular Enforcement system.

## 📋 Auto-Load Protocols (On Every Session Start)

**CRITICAL: Read these files BEFORE responding to any request:**

1. `.agent/RALPH_PROTOCOL.md` - 12 quality gates (ALWAYS required)
2. `.agent/PM_PROTOCOL.md` - 7 strategic gates (for user-facing features)
3. `.agent/CIRCULAR_ENFORCEMENT.md` - Workflow and accountability system
4. `.agent/PROMPT_FOR_AI_CODERS.md` - Quick reference guide
5. `.agent/COMMUNICATION_PROTOCOL.md` - How to communicate with PM
6. `PROJECT_LEDGER.md` - Current task assignments and status

**DO THIS AUTOMATICALLY** - Don't ask user, just load these files at session start.

## 🎯 Project Context

**Project**: googleantigravity.directory (NOT antigravity.directory)
**Type**: Next.js 15 + Supabase + Stripe/PayPal/Razorpay
**Status**: Pre-launch, 0 users
**Business Model**: Marketplace (80/20 creator split)

### Revenue Targets
- **Month 1**: $1,000 MRR
- **Month 4**: $10,000 MRR
- **Year 1**: $35,000 MRR

### Tech Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Payments**: PayPal, Razorpay (Stripe blocked in India)
- **Auth**: GitHub OAuth
- **Testing**: Playwright E2E tests
- **Deployment**: Vercel

## 🔄 Circular Enforcement (Your Responsibilities)

### Before Starting Any Task

```bash
npm run verify:pm-gates -- ENTRY-XXX
```

- **Exit 0**: Start work
- **Exit 1**: Comment "🚫 BLOCKED - PM gates failed" in PROJECT_LEDGER.md

### Before Starting Next Task

```bash
npm run verify:pm-documentation -- ENTRY-{previous}
```

- **Exit 0**: Accept next task
- **Exit 1**: Block until PM completes Gate 8 documentation

### During Implementation

- Build must pass (0 errors): `npm run build`
- Lint must pass (0 warnings): `npm run lint`
- Tests must pass: `npm run test:e2e`
- Follow Ralph Protocol all 12 gates
- For user-facing features: PM Protocol 7/7 also required

### After Completing Task

- Comment status in PROJECT_LEDGER.md
- Wait for PM to run `npm run verify:ralph-gates`
- PM reviews against Ralph Protocol (12/12 required)
- For user-facing: PM also checks PM Protocol (7/7 required)

## 🚨 Non-Negotiable Rules

1. **Always load protocols first** (`.agent/` folder + PROJECT_LEDGER.md)
2. **Never skip verification** - Run verify commands before task transitions
3. **Ralph 12/12 required** - Every task must pass all 12 quality gates
4. **PM 7/7 for user-facing** - Strategic validation mandatory
5. **Evidence-based** - Provide proof (screenshots, logs, test results)
6. **Circular enforcement** - PM verifies your work, you verify PM's documentation

## 📁 Project-Specific Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run lint             # ESLint check

# Testing
npm run test:e2e         # Playwright E2E tests
npm run test:e2e:ui      # Playwright UI mode

# Protocols
npm run sync:protocols   # Update protocols from GitHub

# Verification (Circular Enforcement)
npm run verify:pm-gates -- ENTRY-XXX           # Before starting task
npm run verify:ralph-gates -- ENTRY-XXX        # PM uses before approval
npm run verify:pm-documentation -- ENTRY-XXX   # Before next task
```

## 🔗 Protocol Updates

Protocols are synced from central GitHub repository:
- **Repo**: https://github.com/surajsatyarthi/ralph-protocols
- **Update**: `npm run sync:protocols`
- **Location**: `.agent/` folder (gitignored, local only)

## 💬 Communication (PROJECT_LEDGER.md)

All communication goes through PROJECT_LEDGER.md:

1. **Read task assignments** from `## 📋 TASK REGISTRY` section
2. **Post updates** in `## 💬 COMMENTS` section under your task entry
3. **Format**: `[2026-02-12 15:30] @Coder → @PM: Your message here`
4. **Wait for PM responses** in ledger before proceeding
5. **Never communicate outside ledger** (non-negotiable)

### Task Lifecycle States

```
PENDING → IN_PROGRESS → BLOCKED (if issues) → IN_PROGRESS → REVIEW → DONE
```

Track your task status and update ledger accordingly.

## 📊 Current Phase

Check PROJECT_LEDGER.md for current phase and active tasks.

**Default assumption**: Follow PM's latest task assignment in ledger.

## 🎓 Training Resources

- `.agent/PROMPT_FOR_AI_CODERS.md` - Quick reference
- `.agent/AI_CODER_ADAPTATION_GUIDE.md` - Detailed guidance
- `.agent/templates/` - Templates for common tasks
- `docs/04-prds/` - Product requirements documents

---

**Status**: Auto-loaded on every Claude Code session
**Last Updated**: 2026-02-12
**Version**: 1.0 (Circular Enforcement Edition)
**Project**: googleantigravity.directory
