# Automated Weekly Scraping Setup Guide

## 🤖 Full Automation Overview

Your weekly scraper now runs **100% automatically** with email notifications!

### How It Works

```
┌─────────────────────────────────────────────────────────────┐
│ 1. GitHub Actions runs every Sunday at 9 AM UTC             │
│    └─> Discovers new content from multiple sources          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Email sent to you with:                                  │
│    • Pending resources JSON file attached                   │
│    • Link to review on GitHub                               │
│    • Count of new items found                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. You review and approve:                                  │
│    • Option A: Edit directly on GitHub                      │
│    • Option B: Download, edit, and re-upload               │
│    • Set "approved": true for items you want                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Merge the auto-created Pull Request                      │
│    └─> Triggers automatic import workflow                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Confirmation email sent                                  │
│    └─> Resources are live on your site!                     │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Data Storage

### Location of Scraped Data

1. **During Discovery**:

   ```
   scripts/pending-resources.json  # Temporary staging file
   ```

2. **After Discovery**:

   ```
   # Committed to a temporary branch
   scraper-results-YYYY-MM-DD/scripts/pending-resources.json
   ```

3. **After Import**:

   ```
   # Archived for records
   scripts/archive/YYYY-MM-DD-imported.json
   ```

4. **In Database**:
   ```
   # Final home for approved resources
   PostgreSQL -> resources table (is_indexed = false initially)
   ```

### File Structure

```json
[
  {
    "title": "New MCP Server Name",
    "description": "What it does",
    "url": "https://github.com/...",
    "category": "mcp-servers",
    "stars": 1250,
    "source": "github-search",
    "approved": false // ← You change this to true
  }
]
```

## ⚙️ Setup Instructions

### 1. Configure GitHub Secrets

Go to: **GitHub Repository → Settings → Secrets and variables → Actions**

Add these secrets:

| Secret Name     | Value                               | Example                |
| --------------- | ----------------------------------- | ---------------------- |
| `DATABASE_URL`  | Your Supabase connection string     | `postgresql://...`     |
| `MAIL_USERNAME` | Gmail address for sending           | `your-email@gmail.com` |
| `MAIL_PASSWORD` | Gmail App Password\*                | `abcd efgh ijkl mnop`  |
| `ADMIN_EMAIL`   | Your email to receive notifications | `you@example.com`      |

**\*Gmail App Password**:

1. Go to https://myaccount.google.com/apppasswords
2. Create app password for "Mail"
3. Use that 16-character password

### 2. Enable GitHub Actions

1. Go to **GitHub Repository → Actions**
2. Click "I understand my workflows, go ahead and enable them"
3. Verify workflows appear:
   - ✅ Weekly Content Discovery
   - ✅ Import Approved Resources

### 3. Test the Workflow

**Manual trigger**:

```bash
# Go to GitHub → Actions → Weekly Content Discovery → Run workflow
```

Or wait until next Sunday at 9 AM UTC.

## 📧 Email Review Process

### What You'll Receive

**Subject**: 📦 Weekly Content Discovery: 15 New Resources Found

**Body**:

```
Hi there! 👋

The weekly content discovery script has found 15 new resources for review.

📋 REVIEW PENDING RESOURCES:
[Link to GitHub file]

🔎 APPROVE RESOURCES:
1. Review the pending-resources.json file
2. Edit directly on GitHub or download
3. Set "approved": true for items you want
4. Commit changes

📊 CURRENT STATS:
- Total Resources: 499
- Indexed Resources: 104
```

**Attachment**: `pending-resources.json`

### Approval Options

#### Option A: Approve on GitHub (Easiest)

1. Click the link in the email
2. Click **"Edit this file"** (pencil icon)
3. Change `"approved": false` to `"approved": true`
4. Scroll down, click **"Commit changes"**
5. Go to **Pull Requests** tab
6. Review and **Merge** the auto-created PR
7. Done! Import runs automatically

#### Option B: Approve Locally

1. Download the JSON file from email
2. Edit with any text editor
3. Set `"approved": true` for wanted items
4. Upload back to GitHub branch
5. Merge the PR

## 🔄 Weekly Schedule

- **Sunday 9:00 AM UTC** (2:30 PM IST): Discovery runs
- **You receive email**: Within 5 minutes
- **You review**: Anytime during the week
- **Import runs**: Immediately when you merge the PR
- **Confirmation email**: Sent after successful import

## 🛡️ Safety Features

✅ **Email notifications** prevent silent failures
✅ **Pull Request review** before any changes
✅ **Archive folder** keeps history of all imports
✅ **No auto-merge**: You must manually approve
✅ **Duplicate prevention**: Slug conflicts are skipped
✅ **Error emails**: Get notified if something fails

## 📱 Mobile-Friendly Approval

You can approve from your phone:

1. Open email on mobile
2. Tap GitHub link
3. Use GitHub mobile app to edit JSON
4. Commit and merge PR
5. Done! All from your phone

## 🚨 Troubleshooting

### No Email Received?

1. Check GitHub Actions logs:

   ```
   Repository → Actions → Latest workflow run
   ```

2. Verify secrets are set correctly

3. Check spam folder

### Import Failed?

- Check `DATABASE_URL` secret is correct
- Review logs in GitHub Actions
- Verify no duplicate slugs

### Want to Stop?

Disable workflows:

```
Repository → Actions → Disable workflow
```

## 🎯 Quick Commands

```bash
# Manual discovery (local)
npx tsx scripts/weekly-scraper.ts discover

# Manual import (local)
npx tsx scripts/weekly-scraper.ts import

# View archived imports
ls scripts/archive/
```

## 📝 Next Steps

1. **Test it now**: Trigger workflow manually from GitHub Actions
2. **Check email**: Verify you receive the notification
3. **Approve test resources**: Practice the approval flow
4. **Set and forget**: Let it run weekly automatically

---

**Need help?** Check the workflow logs in GitHub Actions or review this guide.
