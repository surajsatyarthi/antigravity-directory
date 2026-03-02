#!/bin/bash

# Define source (central protocol repo)
PROTOCOL_DIR="/Users/surajsatyarthi/Desktop/Projects/antigravity-directory/dist/protocol-rollout/ralph-protocols"
WORK_DIR="/Users/surajsatyarthi/Desktop/Projects/antigravity-directory/dist/protocol-rollout"

# Target repositories
REPOS=(
  "antigravity-directory"
  "bmn-site"
  "finance-tracker"
  "task_tracker"
  "c-suite-magazine"
)

echo "🚀 Starting Protocol Rollout to ${#REPOS[@]} repositories..."

for REPO in "${REPOS[@]}"; do
  echo "---------------------------------------------------"
  echo "📦 Processing: $REPO"
  
  TARGET_REPO_DIR="$WORK_DIR/$REPO"
  
  # Clone if not exists (skip if it's the current workspace, but for simplicity in this script we'll use the dist folder)
  if [ ! -d "$TARGET_REPO_DIR" ]; then
    echo "⬇️  Cloning $REPO..."
    cd "$WORK_DIR"
    gh repo clone "surajsatyarthi/$REPO" || { echo "❌ Failed to clone $REPO"; continue; }
  else
    echo "✅ Repo already present"
  fi
  
  cd "$TARGET_REPO_DIR" || continue
  
  # Checkout branch usually created
  echo "🌿 Checkout branch chore/enforce-protocols..."
  # Fetch to ensure we have upstream changes if any
  git fetch origin
  git checkout chore/enforce-protocols 2>/dev/null || git checkout -b chore/enforce-protocols
  # Pull to avoid conflicts if remote advanced
  git pull origin chore/enforce-protocols 2>/dev/null || true
  
  # Copy protocols
  echo "📋 Copying protocol files..."
  mkdir -p .github/workflows
  mkdir -p scripts/gates
  
  cp "$PROTOCOL_DIR/.github/workflows/gate-enforcement.yml" .github/workflows/
  cp -r "$PROTOCOL_DIR/scripts/gates/"* scripts/gates/
  
  # Commit and Push
  echo "💾 Committing changes..."
  git add .
  if git commit -m "fix(gates): Allow CI to run on infrastructure branches (relaxed strict ENTRY-ID check)"; then
      echo "⬆️  Pushing to origin..."
      git push origin chore/enforce-protocols
      echo "🎉 Updated PR"
  else
      echo "✨ No changes to commit"
  fi
  
  echo "✅ Done with $REPO"
done

echo "---------------------------------------------------"
echo "🏁 All repositories processed!"
