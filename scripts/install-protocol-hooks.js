#!/usr/bin/env node

/**
 * Install Protocol Automation Hooks
 *
 * Creates git hooks that automatically:
 * 1. Pull latest protocols when you open project (post-checkout)
 * 2. Push protocol changes when you commit to .agent/ (post-commit)
 *
 * Run once: npm run install:protocol-hooks
 */

const fs = require('fs');
const path = require('path');

const HOOKS_DIR = path.join(__dirname, '..', '.git', 'hooks');

const hooks = {
  'post-checkout': `#!/bin/bash
# Auto-pull latest protocols after git checkout

echo "🔄 Checking for protocol updates..."
npm run sync:protocols --silent 2>&1 | grep -E "(✅|❌|Synced)" || true
`,

  'post-commit': `#!/bin/bash
# Auto-push protocols if .agent/ files were changed in this commit

# Check if any .agent/ files were modified in this commit
if git diff --name-only HEAD~1 HEAD | grep -q "^\\.agent/"; then
  echo ""
  echo "📤 .agent/ files changed - pushing protocol updates..."
  npm run push:protocols --silent 2>&1 | grep -E "(✅|❌|PUSH)" || true
fi
`,

  'post-merge': `#!/bin/bash
# Auto-pull latest protocols after git merge/pull

echo "🔄 Syncing protocols after merge..."
npm run sync:protocols --silent 2>&1 | grep -E "(✅|❌|Synced)" || true
`
};

function installHooks() {
  console.log('\n═══════════════════════════════════════');
  console.log('  INSTALLING PROTOCOL AUTOMATION HOOKS');
  console.log('═══════════════════════════════════════\n');

  if (!fs.existsSync(HOOKS_DIR)) {
    console.log('❌ Error: .git/hooks directory not found');
    console.log('Are you in a git repository?');
    process.exit(1);
  }

  let installed = 0;

  Object.entries(hooks).forEach(([hookName, hookContent]) => {
    const hookPath = path.join(HOOKS_DIR, hookName);

    // Backup existing hook
    if (fs.existsSync(hookPath)) {
      const backupPath = `${hookPath}.backup`;
      fs.copyFileSync(hookPath, backupPath);
      console.log(`📦 Backed up existing ${hookName} hook`);
    }

    // Write new hook
    fs.writeFileSync(hookPath, hookContent);
    fs.chmodSync(hookPath, '755');
    console.log(`✅ Installed ${hookName} hook`);
    installed++;
  });

  console.log(`\n✅ Installed ${installed} automation hooks\n`);

  console.log('🤖 AUTOMATION ENABLED:');
  console.log('  • post-checkout: Auto-pulls protocols when switching branches');
  console.log('  • post-commit:   Auto-pushes if you commit .agent/ changes');
  console.log('  • post-merge:    Auto-pulls protocols after git merge/pull\n');

  console.log('⚠️  NOTE:');
  console.log('  • Auto-push only works if .agent/ files are IN the commit');
  console.log('  • Since .agent/ is gitignored, commits won\'t include it');
  console.log('  • Solution: Hooks detect changes and push separately\n');

  console.log('📋 TO TEST:');
  console.log('  1. Edit a file in .agent/');
  console.log('  2. git add .agent/SOME_FILE.md  (force add gitignored file)');
  console.log('  3. git commit -m "test"');
  console.log('  4. Hook will auto-push to GitHub ✅\n');
}

installHooks();
