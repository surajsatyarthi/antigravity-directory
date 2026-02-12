#!/usr/bin/env node

/**
 * Protocol File Watcher (TRUE AUTOMATION)
 *
 * Watches .agent/ folder for changes and auto-pushes to GitHub
 *
 * Usage:
 *   npm run watch:protocols              # Start watching
 *   npm run watch:protocols -- --daemon  # Run in background
 *
 * How it works:
 *   1. Watches .agent/ folder for file changes
 *   2. Debounces changes (waits 5 seconds after last edit)
 *   3. Auto-pushes to GitHub when files stop changing
 *   4. Shows notification when pushed
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const CONFIG = {
  WATCH_DIR: path.join(__dirname, '..', '.agent'),
  DEBOUNCE_MS: 5000, // Wait 5 seconds after last change before pushing
};

let debounceTimer = null;
let hasChanges = false;

function log(message, color = 'reset') {
  const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
  };
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function pushProtocols() {
  log('📤 Pushing protocol changes to GitHub...', 'cyan');

  exec('npm run push:protocols', (error, stdout, stderr) => {
    if (error) {
      log(`❌ Push failed: ${error.message}`, 'yellow');
      return;
    }

    log('✅ Protocols pushed to GitHub successfully', 'green');
    log('   Other projects can now pull: npm run sync:protocols\n', 'cyan');
    hasChanges = false;
  });
}

function onFileChange(eventType, filename) {
  if (!filename || filename.startsWith('.')) return; // Skip hidden files

  log(`📝 Detected change: ${filename}`, 'yellow');
  hasChanges = true;

  // Clear existing timer
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  // Set new timer - push after 5 seconds of no changes
  debounceTimer = setTimeout(() => {
    if (hasChanges) {
      pushProtocols();
    }
  }, CONFIG.DEBOUNCE_MS);
}

function startWatching() {
  if (!fs.existsSync(CONFIG.WATCH_DIR)) {
    log('❌ Error: .agent folder not found', 'yellow');
    log('Run: npm run sync:protocols -- --init first', 'yellow');
    process.exit(1);
  }

  log('\n═══════════════════════════════════════', 'cyan');
  log('  PROTOCOL FILE WATCHER STARTED', 'cyan');
  log('═══════════════════════════════════════\n', 'cyan');

  log(`👀 Watching: ${CONFIG.WATCH_DIR}`, 'green');
  log(`⏱️  Debounce: ${CONFIG.DEBOUNCE_MS / 1000}s\n`, 'green');

  log('How it works:', 'cyan');
  log('  1. Edit any file in .agent/', 'reset');
  log('  2. Save the file', 'reset');
  log('  3. Wait 5 seconds (watcher debounces)', 'reset');
  log('  4. Auto-pushes to GitHub ✅\n', 'reset');

  log('Press Ctrl+C to stop watching\n', 'yellow');

  fs.watch(CONFIG.WATCH_DIR, { recursive: true }, onFileChange);
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  log('\n👋 Stopping protocol watcher...', 'yellow');

  if (hasChanges) {
    log('⚠️  You have unpushed changes!', 'yellow');
    log('Run: npm run push:protocols\n', 'yellow');
  }

  process.exit(0);
});

startWatching();
