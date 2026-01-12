# Weekly Content Scraper - Approval Workflow

## Overview

The weekly scraper uses a **two-step approval workflow** to prevent uncurated content from being added automatically. This ensures all new resources are manually reviewed before being added to the database.

## Workflow

### Step 1: Discovery Mode

Run the discovery script to find new content and sync GitHub stars:

```bash
npx tsx scripts/weekly-scraper.ts discover
```

**What it does:**

- ✅ Syncs GitHub stars for top 50 existing resources
- ✅ Discovers new content from multiple sources
- ✅ Saves pending resources to `pending-resources.json`
- ⚠️ **Does NOT add anything to the database**

### Step 2: Manual Review

Open the generated `scripts/pending-resources.json` file:

```json
[
  {
    "title": "Example MCP Server",
    "description": "A newly discovered MCP server from GitHub",
    "url": "https://github.com/example/mcp-server",
    "category": "mcp-servers",
    "stars": 150,
    "source": "github-search",
    "approved": false // ← Change this to true to approve
  }
]
```

**Review each item and:**

- Set `"approved": true` for items you want to import
- Set `"approved": false` or delete items you want to reject
- Edit title/description if needed

### Step 3: Import Mode

Import only the approved resources:

```bash
npx tsx scripts/weekly-scraper.ts import
```

**What it does:**

- ✅ Reads `pending-resources.json`
- ✅ Imports only items with `"approved": true`
- ✅ Skips duplicates (based on slug)
- ✅ Marks high-star items as "featured"

## Automation

### Weekly Cron Job

Add to crontab for weekly execution:

```bash
# Every Sunday at midnight
0 0 * * 0 cd /path/to/antigravity-directory && npx tsx scripts/weekly-scraper.ts discover
```

### GitHub Actions

Create `.github/workflows/weekly-scraper.yml`:

```yaml
name: Weekly Content Discovery

on:
  schedule:
    - cron: '0 0 * * 0' # Every Sunday at midnight
  workflow_dispatch: # Allow manual trigger

jobs:
  discover:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npx tsx scripts/weekly-scraper.ts discover
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      - name: Upload pending resources
        uses: actions/upload-artifact@v3
        with:
          name: pending-resources
          path: scripts/pending-resources.json
```

Then manually download, review, and import approved items.

## Discovery Sources

The scraper checks these sources (can be customized):

### MCP Servers

- GitHub: `filename:.mcp.json`
- `modelcontextprotocol/servers` repo
- `punkpeye/awesome-mcp-servers`

### Boilerplates

- Vercel Templates
- `awesome-nextjs`, `awesome-react`, `awesome-vue`
- GitHub topics: `nextjs-template`, `saas-starter`

### Workflows

- n8n.io/workflows (trending)
- GitHub Actions Marketplace
- Zapier Template Directory

### Rules

- cursor.directory
- GitHub: `filename:.cursorrules`
- Windsurf rules repositories

## Safety Features

✅ **No Auto-Add**: Nothing is added without your approval
✅ **Duplicate Prevention**: Slug-based conflict handling
✅ **Category Validation**: Invalid categories are skipped
✅ **Error Resilience**: Individual failures don't stop the entire process
✅ **Audit Trail**: All pending items are saved for review

## Example Workflow

```bash
# Monday: Run discovery
npx tsx scripts/weekly-scraper.ts discover

# Tuesday: Review pending-resources.json
# Edit the file, set approved: true for good items

# Wednesday: Import approved items
npx tsx scripts/weekly-scraper.ts import

# Archive the file
mv scripts/pending-resources.json scripts/archive/$(date +%Y-%m-%d)-pending.json
```

## Tips

- **Start Small**: Approve 5-10 items at a time
- **Verify URLs**: Click links to confirm quality
- **Check Stars**: Higher stars = higher quality (usually)
- **Category Fit**: Ensure the category is correct
- **Description Quality**: Edit descriptions for clarity
- **Archive Old Files**: Keep a record of past discoveries
