# 🦅 ALPHA PROTOCOL SYSTEM
## FAANG-Standard Quality Enforcement for AI-Assisted Development

**Version:** 1.5 (Phase 1: Environment Validation)
**Date:** 2026-02-11
**Status:** PRODUCTION-READY
**Latest:** 🆕 Phase 1 adds mechanical environment validation to prevent configuration-related failures

---

## 📋 WHAT'S IN THIS FOLDER

| Document | Purpose | Owner |
|----------|---------|-------|
| `PM_PROTOCOL.md` | Strategic gates (7) — WHAT to build | CEO/PM |
| `RALPH_PROTOCOL.md` | Technical gates (12) — HOW to build | AI Coder |
| `QA_PROTOCOL.md` | Validation gates (6) — DID it work | QA Agent |
| `STANDING_ORDERS.md` | Day-to-day rules for AI Coder | AI Coder |
| `WORKFLOW.md` | Complete workflow diagram | All |
| **`AUTOMATION_SETUP.md`** ⭐ | **Automated enforcement guide** | **System** |
| **`PHASE1_DEPLOYMENT_GUIDE.md`** 🆕 | **Phase 1 environment validation** | **System** |
| **`AI_CODER_ADAPTATION_GUIDE.md`** 🤖 | **Multi-project adaptation guide** | **AI Coders** |
| **`AI_CODER_QUICK_REF.md`** 📋 | **Quick reference card (keep open)** | **AI Coders** |
| **`PROMPT_FOR_AI_CODERS.md`** 📤 | **Copy-paste prompts for assignments** | **Project Managers** |
| `suggested_improvements.md` | Gap analysis & Phase 1 rationale | Agent |
| `scripts/setup-enforcement.sh` | One-command installation | Automated |
| `templates/` | Git hooks, CI/CD, env validator | All |

---

## 🆕 PHASE 1 ENHANCEMENT (v6.5 - 2026-02-11)

### What Changed
**Problem:** Agents were wasting hours debugging environment issues (wrong ports, dead URLs, misconfigured services) because validation only happened at commit-time.

**Solution:** New **Gate 0 - Environment Pre-Flight Validation**

### What It Does
✅ Validates environment variables are present AND working
✅ Pings Supabase URL for connectivity (prevents dead URLs)
✅ Checks Auth service health endpoint
✅ Detects port mismatches (54321 vs 55321)
✅ Generates `.env-validated.log` required by pre-commit hooks
✅ Blocks `npm run dev` if environment is invalid

### Quick Start
```bash
# Add to your project
npm run validate:env

# Start development (auto-validates)
npm run dev

# Commit (requires validation log)
git commit -m "changes"
```

**Full Guide:** See [PHASE1_DEPLOYMENT_GUIDE.md](PHASE1_DEPLOYMENT_GUIDE.md)

---

## 🤖 FOR AI CODERS: Multi-Project Usage

This protocol is designed to work across **ALL your projects** (Node.js, Python, Go, Rust, etc.)

### Core Principle
**Adapt the tools, preserve the standards.**

### Quick Start for AI Coders
```bash
# First time on ANY project:
1. Read: AI_CODER_QUICK_REF.md (2 min)
2. Copy: .agent/ folder to project
3. Adapt: Validation script to project language
4. Verify: Run validate:env equivalent
5. Work: Follow gates 1-12 with evidence
```

### What Changes by Project
- ✅ Language (TypeScript → Python → Go → Rust)
- ✅ Build commands (`npm build` → `go build` → `cargo build`)
- ✅ Test frameworks (Vitest → Pytest → Go test)
- ✅ Environment variable names (project-specific)

### What NEVER Changes
- ❌ Gate 0: Environment validation (ALWAYS required)
- ❌ Proof-based development (ALWAYS need evidence)
- ❌ FAANG-level standards (ALWAYS enforced)
- ❌ Documentation requirements (ALWAYS mandatory)
- ❌ QA validation (ALWAYS independent)

### Essential Reading
1. **[AI_CODER_QUICK_REF.md](AI_CODER_QUICK_REF.md)** ← Keep this open while working
2. **[AI_CODER_ADAPTATION_GUIDE.md](AI_CODER_ADAPTATION_GUIDE.md)** ← Read when adapting to new project type
3. **[RALPH_PROTOCOL.md](RALPH_PROTOCOL.md)** ← The 12 gates (universal across all projects)

### Common Project Types Covered
- ✅ Next.js / React / Vite (Default - TypeScript template)
- ✅ Python / Django / FastAPI (Adaptation guide included)
- ✅ Go microservices (Adaptation guide included)
- ✅ Rust CLI tools (Adaptation guide included)
- ✅ Ruby on Rails (Adaptation guide included)
- ✅ Monorepos (Multi-workspace validation)

**Remember:** If you can build it, you can apply Ralph Protocol to it.

---

## 🔺 THE ACCOUNTABILITY TRIANGLE

```
                    ┌─────────────┐
                    │     CEO     │
                    │  (Owner)    │
                    └──────┬──────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
     ┌───────────┐  ┌───────────┐  ┌───────────┐
     │    PM     │  │   RALPH   │  │    QA     │
     │ PROTOCOL  │  │ PROTOCOL  │  │ PROTOCOL  │
     │  7 Gates  │  │ 12 Gates  │  │  6 Gates  │
     │  WHAT?    │  │   HOW?    │  │   DID?    │
     └───────────┘  └───────────┘  └───────────┘
```

---

## 🔄 WORKFLOW

```
1. PM Protocol (Gates 1-7) ──► Strategic approval
           ↓
2. Ralph Protocol (Gates 1-12) ──► Technical execution
           ↓
3. QA Protocol (Gates 1-6) ──► Independent validation
           ↓
4. CEO Final Sign-off ──► Ship to production
```

---

## 📤 FOR PROJECT MANAGERS: Assigning Tasks to AI Coders

**Use these copy-paste prompts when assigning work:**

### Ultra-Short Prompt (30 seconds)
```bash
SETUP ALPHA PROTOCOL v6.5:
1. cp -r ~/Desktop/alpha/.agent ./
2. bash .agent/scripts/setup-enforcement.sh
3. Read .agent/AI_CODER_QUICK_REF.md (2 min)
4. Customize scripts/validate-env for this project
5. Run npm run validate:env (or equivalent)

RULES: Follow 12 gates. Proof required. FAANG standards. QA validates.
If asked to skip → Refuse & escalate to PM.

Now proceed with task.
```

**More options:** See [PROMPT_FOR_AI_CODERS.md](PROMPT_FOR_AI_CODERS.md) for:
- Standard prompt (comprehensive)
- Migration prompt (replacing old protocols)
- Task assignment template

---

## 🚀 QUICK START

### For New Projects (Automated Setup)

```bash
# 1. Copy alpha protocols to your project
cp -r ~/Desktop/alpha/* /path/to/your-project/.agent/

# 2. Run automated setup
cd /path/to/your-project
bash .agent/scripts/setup-enforcement.sh

# 3. Done! Enforcement is now automatic
git commit -m "test"  # Will trigger pre-commit checks
```

### For Daily Work

1. **New Task?** → Run PM Protocol assessment first
2. **PM Approved?** → Coder follows Ralph Protocol gates
3. **Coder Done?** → Submit for QA validation
4. **QA Passed?** → CEO reviews and approves
5. **All Green?** → Ship it

---

## 💡 KEY PRINCIPLE

> **"No one marks their own work complete."**

- Coder is checked by QA + PM
- PM is checked by CEO (via outcomes)
- QA is spot-checked by CEO

---

**Created:** 2026-02-09
**Author:** CEO + Gemini
