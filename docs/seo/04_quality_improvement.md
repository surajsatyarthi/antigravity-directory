# Quality Improvement Plan

## The Core Problem
The directory currently prioritises quantity over quality.
- Most listings have 0 ratings and 0 reviews
- Prompts have generic names like "Prompt v104" with no explanation
- Tutorials are just links to Anthropic's own documentation
- Rules section has only 45 entries vs competitor's 500+
- MCP server descriptions are inconsistent

## The Fix Strategy
Do NOT try to fix all 3,146 resources. Fix only what users see first.
Each category page shows the top 20 listings.
Fix 20 listings per category = 200 listings total = directory feels high quality.

---

## Priority 1 — Rules (Most Urgent)

### Current State
45 rules. Competitor has 500+. Antigravity rules is a 5,000/month keyword.

### Target
200+ quality rules covering major use cases.

### Antigravity Prompt to Generate Rules
```
Generate 50 high quality coding rules for Google Antigravity IDE.

Each rule must:
- Have a specific descriptive title (NOT "Rule v1" or numbered)
- Be 3-5 lines of actual coding instruction
- Target one specific use case from this list:
  Next.js, React, Python, TypeScript, Supabase, Vercel,
  API development, testing, authentication, database queries,
  error handling, performance, security, code review
- Be genuinely useful — something a developer would save and reuse

Format for each rule:
---
Title: [specific descriptive title]
Use Case: [technology or scenario]
Tags: [2-3 relevant tags]
Rule:
[the actual rule content — 3 to 5 lines of instruction]
---

Generate 50 unique rules. No duplicates. Each must cover a different scenario.
```

Run this prompt 4 times = 200 rules. Add them to the directory.

---

## Priority 2 — MCP Server Descriptions (Top 20)

### Current State
Some descriptions are one vague line. Some are scraped and inconsistent.

### Target
Every MCP server in the top 20 has a clear 2-sentence description answering:
1. What does this MCP server do?
2. Why would an Antigravity developer use it?

### Antigravity Prompt
```
I run googleantigravity.directory — a resource directory for Google Antigravity IDE.

For each MCP server below, search the web or GitHub to find what it actually does.
Then write a clear 2-sentence description that explains:
Sentence 1: What this MCP server does (specific, not generic)
Sentence 2: What problem it solves for a developer using Google Antigravity

Rules:
- Be specific, not vague
- No marketing language
- Write for a developer audience
- If you cannot find information, write "Needs verification"

MCP Servers to improve:
[PASTE YOUR TOP 20 MCP SERVER NAMES HERE]

Output as a table: | MCP Server Name | Improved Description |
```

---

## Priority 3 — Prompts Cleanup

### Current State
Multiple entries named "Prompt v20", "Prompt v104", "Prompt v109" with zero differentiation.
French and Spanish variants counted as separate entries.

### Tasks
1. Delete all numbered variants — keep only the highest version of each
2. Delete non-English variants unless they are labelled clearly
3. Rename every remaining prompt with a descriptive title
4. Add a proper 1-sentence description to each

### Antigravity Prompt
```
Here is my list of prompts on googleantigravity.directory.
Many are duplicates or numbered variants that add no value.

Task 1 — Identify duplicates:
Flag any prompts that are numbered variants of the same prompt
(e.g. "Senior Engineer Prompt v20", "Senior Engineer Prompt v104" = duplicates)
Keep only the highest numbered version. List everything to DELETE.

Task 2 — Rename and describe:
For every unique prompt worth keeping, provide:
- A specific descriptive title (what does it actually do?)
- A 1-sentence description explaining the use case

Output:
Section A — DELETE LIST: [prompt names to remove]
Section B — KEEP AND IMPROVE: | Old Name | New Title | Description |

Prompts list:
[PASTE YOUR FULL PROMPTS LIST]
```

---

## Priority 4 — Tutorials and Cheatsheets

### Current State
15 tutorials = all links to Anthropic's official documentation
15 cheatsheets = same problem
These add zero value over what Anthropic already publishes.

### Fix
Replace with original content. Use the article writing plan in 03_content_plan.md.
Each article you write becomes a tutorial entry in the directory.
This turns a weakness into a strength over time.

---

## One Hour Quality Sprint (Do This First)

This is the minimum viable quality fix before launching:

Step 1 — 20 minutes
Delete all numbered prompt variants. If you have "Prompt v20" and "Prompt v104"
of the same thing — delete all except the latest.

Step 2 — 20 minutes
Run the rules generation prompt once in Antigravity.
Add the 50 new rules to your directory.
This doubles your rules count immediately.

Step 3 — 20 minutes
Improve descriptions for your top 5 featured MCP servers on the homepage.
These are the first ones every visitor sees.

After this one hour sprint your directory looks curated, not scraped.
