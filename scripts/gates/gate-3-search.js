/**
 * Gate 3: Compulsory Research Audit (The "Immaculate" Standard)
 * 
 * As per CEO Magazine Protocol (Ralph v2.6):
 * Every task MUST start with a research phase that generates an 
 * `audit-gate-0-ENTRY-XXX.log` containing at least 3 web searches.
 * 
 * This script BLOCKS the task if this log is missing or insufficient.
 */

const fs = require('fs');
const path = require('path');
const colors = require('colors'); 

const taskId = process.argv[2]; // e.g., ENTRY-020

if (!taskId) {
    console.error('❌ Usage: node scripts/gates/gate-3-search.js ENTRY-XXX'.red);
    process.exit(1);
}

console.log(`🔍 Gate 3: Verifying Compulsory Research for ${taskId}...`.cyan);

// 1. Check File Existence
const logFile = `audit-gate-0-${taskId}.log`;
const logPath = path.resolve(process.cwd(), logFile);

if (!fs.existsSync(logPath)) {
    console.error(`\n❌ BLOCKED: Missing Research Log`.red.bold);
    console.error(`   File not found: ${logFile}`.red);
    console.error(`\n   Protocol Requirement:`.gray);
    console.error(`   You MUST conduct research and create this log before writing code.`);
    process.exit(1);
}

// 2. Check Content (3+ Web Searches)
const content = fs.readFileSync(logPath, 'utf8');
const searchCount = (content.match(/Search Session|Query:/gi) || []).length;

if (searchCount < 3) {
    console.error(`\n❌ BLOCKED: Insufficient Research`.red.bold);
    console.error(`   Found ${searchCount} search entries. Minimum required: 3.`.red);
    console.error(`   The "Immaculate" standard requires deep research evidence.`.gray);
    process.exit(1);
}

console.log(`✅ Gate 3 PASSED: Research Audit Verified (${searchCount} queries)`.green.bold);
process.exit(0);
