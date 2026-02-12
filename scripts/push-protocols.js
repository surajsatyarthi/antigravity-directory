#!/usr/bin/env node

/**
 * Protocol Push Script (PM Use Only)
 *
 * Pushes local .agent protocol updates to central GitHub repository
 *
 * Usage:
 *   npm run push:protocols              # Push all .agent changes
 *   npm run push:protocols -- "message" # Push with custom commit message
 *
 * How it works:
 *   1. Copies .agent folder to .protocol-cache (local git repo)
 *   2. Commits changes with message
 *   3. Pushes to GitHub (ralph-protocols repo)
 *   4. Other projects can pull with: npm run sync:protocols
 *
 * Prerequisites:
 *   - GitHub repo exists: https://github.com/surajsatyarthi/ralph-protocols
 *   - You have push access to the repo
 *   - sync:protocols has been run at least once (creates .protocol-cache)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  GITHUB_REPO: 'https://github.com/surajsatyarthi/ralph-protocols.git',
  LOCAL_CACHE_DIR: path.join(__dirname, '..', '.protocol-cache'),
  SOURCE_DIR: path.join(__dirname, '..', '.agent'),
};

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function exec(command, silent = false) {
  try {
    return execSync(command, {
      encoding: 'utf8',
      stdio: silent ? 'pipe' : 'inherit',
    });
  } catch (error) {
    log(`❌ Command failed: ${command}`, 'red');
    throw error;
  }
}

function validateSetup() {
  // Check if .agent folder exists
  if (!fs.existsSync(CONFIG.SOURCE_DIR)) {
    log('❌ Error: .agent folder not found', 'red');
    log('Run: npm run sync:protocols -- --init', 'yellow');
    process.exit(1);
  }

  // Check if .protocol-cache exists (should be created by sync:protocols)
  if (!fs.existsSync(CONFIG.LOCAL_CACHE_DIR)) {
    log('❌ Error: Protocol cache not initialized', 'red');
    log('Run: npm run sync:protocols first', 'yellow');
    process.exit(1);
  }

  // Check if it's a git repo
  const gitDir = path.join(CONFIG.LOCAL_CACHE_DIR, '.git');
  if (!fs.existsSync(gitDir)) {
    log('❌ Error: Protocol cache is not a git repository', 'red');
    log('Run: npm run sync:protocols -- --init', 'yellow');
    process.exit(1);
  }
}

function copyProtocolsToCache() {
  log('📋 Copying protocols from .agent to cache...', 'cyan');

  // Get list of files from .agent (excluding .gitignore and .DS_Store)
  const files = fs.readdirSync(CONFIG.SOURCE_DIR);
  let copiedCount = 0;

  files.forEach((file) => {
    // Skip .gitignore and system files
    if (file === '.gitignore' || file === '.DS_Store' || file === 'node_modules') {
      return;
    }

    const sourcePath = path.join(CONFIG.SOURCE_DIR, file);
    const targetPath = path.join(CONFIG.LOCAL_CACHE_DIR, file);

    // Copy file or directory recursively
    if (fs.statSync(sourcePath).isDirectory()) {
      // Remove existing directory and copy fresh
      if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { recursive: true, force: true });
      }
      copyRecursive(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }

    copiedCount++;
  });

  log(`✅ Copied ${copiedCount} items to protocol cache`, 'green');
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  files.forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

function commitAndPush(commitMessage) {
  log('📝 Committing changes...', 'cyan');

  // Change to cache directory
  process.chdir(CONFIG.LOCAL_CACHE_DIR);

  // Check if there are changes
  const status = exec('git status --porcelain', true);
  if (!status || status.trim() === '') {
    log('⚠️  No changes to commit', 'yellow');
    return false;
  }

  // Stage all changes
  exec('git add .');

  // Commit
  const message = commitMessage || `chore: update protocols from antigravity-directory

Updated: ${new Date().toISOString().split('T')[0]}`;

  exec(`git commit -m "${message}"`);
  log('✅ Changes committed', 'green');

  // Push to GitHub
  log('🚀 Pushing to GitHub...', 'cyan');
  exec('git push origin main');
  log('✅ Pushed to GitHub successfully', 'green');

  return true;
}

function showChangedFiles() {
  log('', 'reset');
  log('📊 Changed Files:', 'bright');

  process.chdir(CONFIG.LOCAL_CACHE_DIR);
  const diff = exec('git diff --name-status HEAD~1', true);

  if (diff) {
    const lines = diff.trim().split('\n');
    lines.forEach((line) => {
      const [status, file] = line.split('\t');
      let color = 'cyan';
      let icon = '📝';

      if (status === 'A') {
        color = 'green';
        icon = '➕';
      } else if (status === 'D') {
        color = 'red';
        icon = '➖';
      } else if (status === 'M') {
        color = 'yellow';
        icon = '✏️';
      }

      log(`  ${icon} ${file}`, color);
    });
  }
}

// Main execution
function main() {
  const customMessage = process.argv[2];

  log('', 'reset');
  log('═══════════════════════════════════════════════', 'bright');
  log('     PROTOCOL PUSH TO GITHUB', 'bright');
  log('═══════════════════════════════════════════════', 'bright');
  log('', 'reset');

  try {
    // Step 1: Validate setup
    log('🔍 Validating setup...', 'cyan');
    validateSetup();
    log('✅ Setup valid', 'green');

    // Step 2: Copy protocols from .agent to cache
    copyProtocolsToCache();

    // Step 3: Commit and push
    const pushed = commitAndPush(customMessage);

    if (pushed) {
      // Step 4: Show what changed
      showChangedFiles();

      log('', 'reset');
      log('═══════════════════════════════════════════════', 'green');
      log('     ✅ PUSH COMPLETE', 'green');
      log('═══════════════════════════════════════════════', 'green');
      log('', 'reset');

      log('Next steps:', 'cyan');
      log('  1. Other projects can now pull: npm run sync:protocols', 'cyan');
      log('  2. Verify changes on GitHub:', 'cyan');
      log('     https://github.com/surajsatyarthi/ralph-protocols', 'cyan');
    } else {
      log('', 'reset');
      log('═══════════════════════════════════════════════', 'yellow');
      log('     NO CHANGES TO PUSH', 'yellow');
      log('═══════════════════════════════════════════════', 'yellow');
    }

  } catch (error) {
    log('', 'reset');
    log('═══════════════════════════════════════════════', 'red');
    log('     ❌ PUSH FAILED', 'red');
    log('═══════════════════════════════════════════════', 'red');
    log('', 'reset');
    log(`Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

main();
