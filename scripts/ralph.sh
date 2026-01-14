#!/bin/bash

MAX_ITERATIONS=10
PRD_FILE="docs/PRD/prd.json"
PROGRESS_FILE=".agent/progress.txt"
AGENTS_MD=".agent/agents.md"

echo "=== RALPH v2.1 AUTONOMOUS LOOP STARTING ===" >> $PROGRESS_FILE
echo "Timestamp: $(date)" >> $PROGRESS_FILE

for i in $(seq 1 $MAX_ITERATIONS); do
  echo "--- Iteration $i ---"
  
  # Pick next story with "passed": false
  STORY=$(jq -r '.stories[] | select(.passed == false) | .id' $PRD_FILE | head -1)
  
  if [ -z "$STORY" ]; then
    echo "✅ All stories complete!"
    break
  fi
  
  echo "📝 Working on: $STORY"
  
  # SEMI-AUTOMATED: Antigravity IDE has no CLI
  echo ""
  echo "═══════════════════════════════════════════"
  echo "NEXT STORY: $STORY"
  echo "═══════════════════════════════════════════"
  echo ""
  echo "1. Open Antigravity IDE"
  echo "2. Load .agent/RALPH_PROTOCOL.md into chat"
  echo "3. Paste this prompt:"
  echo ""
  echo "   Implement story $STORY from prd.json."
  echo "   Follow TDD. Generate tests first with test-requirements diff."
  echo "   Then pause for review."
  echo ""
  echo "4. Wait for AI to output tests and test-requirements diff"
  echo ""
  read -p "Press ENTER when tests are ready for review..."
  
  # LAYER 6 GATE 1: Test Review
  echo ""
  echo "🔍 REVIEW TESTS:"
  echo "- Does test-requirements diff show all criteria covered?"
  echo "- Do tests match requirements (not anticipated code)?"
  echo ""
  echo "Type APPROVED or REJECTED [reason]:"
  read approval
  
  if [ "$approval" != "APPROVED" ]; then
    echo "❌ Tests rejected. Paste rejection reason into IDE."
    echo "Iteration $i: $STORY TESTS REJECTED" >> $PROGRESS_FILE
    echo "Reason: $approval" >> $PROGRESS_FILE
    echo "Timestamp: $(date)" >> $PROGRESS_FILE
    continue
  fi
  
  echo "✅ Tests approved"
  echo ""
  echo "5. Paste into IDE: 'Tests approved. Implement code and provide proofs.'"
  echo ""
  read -p "Press ENTER when implementation is complete with proofs..."
  
  # LAYER 4: Automated Quality Gates
  echo ""
  echo "🔍 Running quality gates..."
  
  npm run test
  if [ $? -ne 0 ]; then
    echo "❌ Tests failed"
    echo "Iteration $i: $STORY TESTS FAILED" >> $PROGRESS_FILE
    echo "Timestamp: $(date)" >> $PROGRESS_FILE
    npm run test 2>&1 | tail -20 >> $PROGRESS_FILE
    continue
  fi
  
  npm run lint
  if [ $? -ne 0 ]; then
    echo "❌ Linting failed"
    echo "Iteration $i: $STORY LINT FAILED" >> $PROGRESS_FILE
    echo "Timestamp: $(date)" >> $PROGRESS_FILE
    npm run lint 2>&1 | tail -10 >> $PROGRESS_FILE
    continue
  fi
  
  npm run security-check 2>/dev/null || npm audit
  if [ $? -ne 0 ]; then
    echo "⚠️  Security issues detected - review required"
  fi
  
  # Check coverage
  COVERAGE=$(npm run test:coverage -- --reporter=json 2>/dev/null | jq '.total.lines.pct' 2>/dev/null || echo "80")
  if (( $(echo "$COVERAGE < 80" | bc -l 2>/dev/null || echo "0") )); then
    echo "⚠️  Coverage below 80%: $COVERAGE%"
  fi
  
  # LAYER 6 GATE 2: Human Review (if flagged)
  REVIEW_REQUIRED=$(jq -r ".stories[] | select(.id == \"$STORY\") | .review_required" $PRD_FILE)
  SECURITY_CRITICAL=$(jq -r ".stories[] | select(.id == \"$STORY\") | .security_critical" $PRD_FILE)
  
  if [ "$REVIEW_REQUIRED" == "true" ] || [ "$SECURITY_CRITICAL" == "true" ]; then
    echo ""
    echo "⚠️  CHECKPOINT: Human review required"
    echo "Review:"
    echo "- Code quality and security"
    echo "- Business logic correctness"
    echo "- Edge case handling"
    echo ""
    echo "Type APPROVED to continue:"
    read approval
    
    if [ "$approval" != "APPROVED" ]; then
      echo "❌ Failed human review"
      echo "Iteration $i: $STORY FAILED REVIEW" >> $PROGRESS_FILE
      echo "Reason: $approval" >> $PROGRESS_FILE
      echo "Timestamp: $(date)" >> $PROGRESS_FILE
      continue
    fi
  fi
  
  # All gates passed - mark complete
  echo ""
  echo "✅ All gates passed - marking story complete"
  
  jq --arg id "$STORY" '
    .stories |= map(
      if .id == $id then .passed = true else . end
    )
  ' $PRD_FILE > tmp.json && mv tmp.json $PRD_FILE
  
  git add .
  git commit -m "$STORY: Completed with proofs and verification"
  
  echo "✅ Story $STORY COMPLETE"
  echo "---" >> $PROGRESS_FILE
  echo "Iteration $i: $STORY PASSED" >> $PROGRESS_FILE
  echo "Files changed: $(git diff --name-only HEAD~1 HEAD | tr '\n' ' ')" >> $PROGRESS_FILE
  echo "" >> $PROGRESS_FILE
done

echo ""
echo "═══════════════════════════════════════════"
echo "RALPH v2.1 LOOP COMPLETE"
echo "═══════════════════════════════════════════"
echo ""
echo "Summary:"
echo "- Total iterations: $i"
echo "- Check progress.txt for details"
echo "- Check git log for commits"
echo ""
