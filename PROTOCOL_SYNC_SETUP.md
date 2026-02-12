# PROTOCOL SYNC SETUP GUIDE

**Centralized Protocol Management Across 5 Antigravity Projects**

---

## 🎯 OVERVIEW

This system allows you to maintain ONE central protocol repository on GitHub and automatically sync it across all 5 projects.

**Benefits**:
- ✅ Update protocols in one place
- ✅ Sync across all projects with one command
- ✅ Version-controlled protocol evolution
- ✅ No manual file copying

**Structure**:
```
/Users/surajsatyarthi/Desktop/Projects/
├── protocol/                 # Central source (pushed to GitHub)
├── antigravity-directory/    # Project 1 (syncs from GitHub)
├── project-2/                # Project 2 (syncs from GitHub)
├── project-3/                # Project 3 (syncs from GitHub)
├── project-4/                # Project 4 (syncs from GitHub)
└── project-5/                # Project 5 (syncs from GitHub)
```

---

## 📋 STEP 1: CREATE GITHUB REPOSITORY

### 1.1 Create New Repository

1. Go to: https://github.com/new
2. Repository name: `antigravity-protocols`
3. Description: `Centralized quality protocols for Antigravity projects`
4. Visibility: **Private** (recommended) or Public
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

### 1.2 Copy Repository URL

After creation, copy the HTTPS URL:
```
https://github.com/YOUR_USERNAME/antigravity-protocols.git
```

---

## 📋 STEP 2: PUSH PROTOCOL FOLDER TO GITHUB

The protocol folder is already initialized as a Git repository. Now push it to GitHub:

```bash
cd /Users/surajsatyarthi/Desktop/Projects/protocol

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/antigravity-protocols.git

# Push to GitHub
git push -u origin main
```

**Verify**: Go to your GitHub repo and confirm all protocol files are visible.

---

## 📋 STEP 3: CONFIGURE SYNC SCRIPT (ANTIGRAVITY PROJECT)

### 3.1 Update GitHub URL

Edit: `scripts/sync-protocols.js`

**Line 24** - Change:
```javascript
GITHUB_REPO: 'https://github.com/YOUR_USERNAME/antigravity-protocols.git', // ⚠️ UPDATE THIS
```

**To**:
```javascript
GITHUB_REPO: 'https://github.com/YOUR_ACTUAL_USERNAME/antigravity-protocols.git',
```

### 3.2 Save the File

---

## 📋 STEP 4: INITIAL SYNC (ANTIGRAVITY PROJECT)

Run the sync script for the first time:

```bash
cd /Users/surajsatyarthi/Desktop/antigravity-directory

npm run sync:protocols:init
```

**Expected Output**:
```
═══════════════════════════════════════════════
     ANTIGRAVITY PROTOCOL SYNC
═══════════════════════════════════════════════

📦 Cloning protocol repository (first time)...
✅ Repository cloned successfully
📋 Syncing protocols to .agent folder...
✅ Synced 23 items to .agent folder

📊 Sync Status:
  Protocol files in .agent: 23

Key protocols:
  ✅ RALPH_PROTOCOL.md
  ✅ PM_PROTOCOL.md
  ✅ COMMUNICATION_PROTOCOL.md
  ✅ CIRCULAR_ENFORCEMENT.md
  ✅ SHAREABLE_PROMPTS_GUIDE.md

═══════════════════════════════════════════════
     ✅ SYNC COMPLETE
═══════════════════════════════════════════════
```

### 4.1 Verify Sync

Check that `.agent` folder has all protocols:

```bash
ls -la .agent
```

You should see:
- RALPH_PROTOCOL.md
- PM_PROTOCOL.md
- COMMUNICATION_PROTOCOL.md
- CIRCULAR_ENFORCEMENT.md
- SHAREABLE_PROMPTS_GUIDE.md
- templates/ folder
- scripts/ folder
- verification-scripts/ folder

---

## 📋 STEP 5: COMMIT CHANGES (ANTIGRAVITY PROJECT)

The antigravity project now has:
- ✅ Sync script (`scripts/sync-protocols.js`)
- ✅ npm commands (`sync:protocols`, `sync:protocols:init`)
- ✅ Updated `.gitignore` (excludes `.agent` and `.protocol-cache`)

Commit these changes:

```bash
git add package.json scripts/sync-protocols.js .gitignore PROTOCOL_SYNC_SETUP.md
git commit -m "feat: add protocol sync system

- Add sync script to pull protocols from GitHub
- Configure npm commands for sync operations
- Update .gitignore to exclude synced folders
- Add setup documentation

Protocols now synced from: https://github.com/YOUR_USERNAME/antigravity-protocols

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## 📋 STEP 6: REPLICATE TO OTHER 4 PROJECTS

For each of your other 4 projects in `/Users/surajsatyarthi/Desktop/Projects/`:

### 6.1 Copy Files

```bash
cd /Users/surajsatyarthi/Desktop/Projects/project-2

# Copy sync script
cp ../antigravity-directory/scripts/sync-protocols.js scripts/

# Make executable
chmod +x scripts/sync-protocols.js
```

### 6.2 Update package.json

Add these scripts to `package.json`:

```json
"scripts": {
  "sync:protocols": "node scripts/sync-protocols.js",
  "sync:protocols:init": "node scripts/sync-protocols.js --init"
}
```

### 6.3 Update .gitignore

Add these lines to `.gitignore`:

```
# Protocol sync (synced from GitHub)
/.agent
/.protocol-cache
```

### 6.4 Run Initial Sync

```bash
npm run sync:protocols:init
```

### 6.5 Verify and Commit

```bash
# Verify .agent folder populated
ls -la .agent

# Commit changes
git add package.json scripts/sync-protocols.js .gitignore
git commit -m "feat: add protocol sync system

Protocols synced from: https://github.com/YOUR_USERNAME/antigravity-protocols

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### 6.6 Repeat for Projects 3, 4, 5

Repeat steps 6.1-6.5 for each remaining project.

---

## 🔄 DAILY USAGE

### Updating Protocols (Central Repository)

When you need to update a protocol:

**Option A: Edit in GitHub**
1. Go to: https://github.com/YOUR_USERNAME/antigravity-protocols
2. Edit file directly on GitHub
3. Commit changes
4. Run sync in each project (see below)

**Option B: Edit Locally**
1. Edit files in `/Users/surajsatyarthi/Desktop/Projects/protocol/`
2. Commit and push:
   ```bash
   cd /Users/surajsatyarthi/Desktop/Projects/protocol
   git add .
   git commit -m "docs: update RALPH_PROTOCOL.md - add new gate"
   git push origin main
   ```
3. Run sync in each project (see below)

### Syncing Projects (Pull Latest)

In any project that needs updated protocols:

```bash
npm run sync:protocols
```

**This will**:
- Pull latest from GitHub
- Overwrite `.agent` folder with latest versions
- Show sync status

**When to sync**:
- After updating protocols in GitHub
- Start of new work session (recommended)
- Before critical reviews (ensure latest standards)
- Weekly maintenance (establish routine)

---

## 🔐 AUTOMATION (OPTIONAL)

### Option 1: Pre-commit Hook

Auto-sync protocols before every commit:

**Add to `.husky/pre-commit`** (or create if doesn't exist):
```bash
#!/bin/sh
npm run sync:protocols
```

### Option 2: GitHub Actions (Per Project)

Create `.github/workflows/sync-protocols.yml`:

```yaml
name: Sync Protocols

on:
  schedule:
    - cron: '0 9 * * *'  # Daily at 9 AM
  workflow_dispatch:       # Manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run sync:protocols
      - name: Commit changes
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add .agent
          git diff --quiet && git diff --staged --quiet || git commit -m "chore: sync protocols from central repo"
          git push
```

---

## 🚨 TROUBLESHOOTING

### Error: "GitHub repository URL not configured"

**Fix**: Update `GITHUB_REPO` in `scripts/sync-protocols.js` with your actual GitHub username.

### Error: "Repository not found"

**Causes**:
- Repo doesn't exist on GitHub
- Wrong URL in sync script
- Private repo without authentication

**Fix**:
```bash
# Verify repo exists
curl -I https://github.com/YOUR_USERNAME/antigravity-protocols

# Update URL in scripts/sync-protocols.js
# For private repos, use SSH instead: git@github.com:YOUR_USERNAME/antigravity-protocols.git
```

### Error: "fatal: not a git repository"

**Fix**:
```bash
# Re-initialize protocol folder
cd /Users/surajsatyarthi/Desktop/Projects/protocol
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/antigravity-protocols.git
git push -u origin main
```

### Sync Not Pulling Latest Changes

**Fix**:
```bash
# Force refresh cache
rm -rf .protocol-cache
npm run sync:protocols:init
```

### Conflicts Between Local .agent and Synced Version

**Important**: The sync script **overwrites** `.agent` folder completely. Do NOT manually edit files in `.agent` - edit them in the central protocol repo instead.

**If you accidentally edited .agent files**:
1. Copy your changes to a safe location
2. Run sync to restore synced version
3. Apply changes to central protocol repo
4. Push to GitHub
5. Re-sync all projects

---

## 📊 VERIFICATION CHECKLIST

**After completing setup, verify**:

- [ ] GitHub repo created: `antigravity-protocols`
- [ ] Protocol folder pushed to GitHub (verify files visible on GitHub)
- [ ] Antigravity project: `npm run sync:protocols:init` runs successfully
- [ ] Antigravity project: `.agent` folder populated with all protocols
- [ ] Other 4 projects: Sync script copied
- [ ] Other 4 projects: package.json updated
- [ ] Other 4 projects: .gitignore updated
- [ ] Other 4 projects: `npm run sync:protocols:init` runs successfully
- [ ] Other 4 projects: `.agent` folders populated

**Test Update Flow**:
1. Edit a protocol in `/Users/surajsatyarthi/Desktop/Projects/protocol/`
2. Commit and push to GitHub
3. Run `npm run sync:protocols` in one project
4. Verify `.agent` folder updated
5. Repeat for other projects

---

## 🎯 SUCCESS CRITERIA

**System is working when**:
- ✅ All 5 projects sync from one GitHub repo
- ✅ `npm run sync:protocols` updates `.agent` in <5 seconds
- ✅ Protocol changes propagate to all projects with one command per project
- ✅ No manual file copying required
- ✅ Version history tracked in GitHub

---

## 📞 NEXT STEPS

1. **Immediate** (This Chat Session):
   - [ ] Create GitHub repository
   - [ ] Push protocol folder to GitHub
   - [ ] Update `GITHUB_REPO` URL in sync script
   - [ ] Run `npm run sync:protocols:init` in antigravity project
   - [ ] Verify sync works
   - [ ] Commit changes to antigravity project

2. **After This Chat** (When Project Moved):
   - [ ] Move antigravity project to `/Users/surajsatyarthi/Desktop/Projects/`
   - [ ] Replicate sync setup to other 4 projects
   - [ ] Test update flow end-to-end
   - [ ] Establish sync routine (daily/weekly)

---

**Last Updated**: 2026-02-12
**Maintained By**: CEO + PM
**Version**: 1.0
