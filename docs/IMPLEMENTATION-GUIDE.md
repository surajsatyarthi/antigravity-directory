# ANTIGRAVITY.DIRECTORY - IMPLEMENTATION GUIDE
## Complete Execution Roadmap for Development Team

**Document Status**: FINAL IMPLEMENTATION BRIEF
**Distribution**: CEO (Product Owner) → Junior Dev (Antigravity)
**Purpose**: Step-by-step execution guide with tests, validation, and quality gates
**Timeline**: Complete by end of tomorrow (24-hour sprint)

---

## 📋 EXECUTIVE SUMMARY (For CEO)

**What We're Building**: Complete MVP with content seeding, community foundation, and homepage redesign
**Why This Matters**: First-to-market advantage + SEO moat + retention mechanics
**Success Definition**:
- ✅ 1500+ resources imported and live
- ✅ Member directory + user profiles functional
- ✅ Homepage redesigned (hero + tabs + featured)
- ✅ All automated tests passing (>80% coverage)
- ✅ Content data validated and clean
- ✅ Performance benchmarks met (<2s load times)

**Risk Level**: LOW (using existing architecture, no new dependencies)
**Dependencies**: Database schema extensions only (already designed)

---

## 🏗️ ARCHITECTURE OVERVIEW

### What Already Exists ✅
- Next.js app structure
- Database (Drizzle ORM + PostgreSQL)
- Auth system (NextAuth)
- Payment system (Razorpay/PayPal)
- Resource listing capability
- Search functionality
- API routes

### What We're Adding
- Content seeding pipeline
- User profile fields + edit page
- Member directory
- Homepage components (Hero, CategoryTabs, FeaturedSection)
- Navigation restructure
- Automated test suite
- Data validation system

### Schema Changes (Minimal)
```typescript
// users table additions
bio: text
location: text
tagline: text
website: text
githubUsername: text
twitterHandle: text
linkedinUrl: text
youtubeChannel: text
discordUsername: text
profileCompletionScore: integer
publicProfile: boolean
followersCount: integer
followingCount: integer

// New follows table
followers: pgTable('follows', {
  followerId: text,
  followingId: text,
  createdAt: timestamp
})
```

---

## 📊 TASK BREAKDOWN (24-Hour Sprint)

### PHASE 0: CONTENT SEEDING (8 hours)
**Owner**: Junior Dev (Antigravity)
**Goal**: Populate database with 1500+ resources
**Success**: All data imported, validated, and live

#### Task 0.1: Build MCP Scraper (2 hours)
**File**: `scripts/scrape-mcps.ts`
**Purpose**: Extract MCPs from antigravity.codes and import to database

**Step-by-Step**:
```
1. Create scraper script
   - Use fetch/axios to crawl https://antigravity.codes/mcp or equivalent
   - Parse HTML/JSON response to extract:
     * Name, description, URL, category
     * Author/creator, stars/ratings
     * Last updated date
   - Handle pagination (if exists)

2. Data validation
   - Check each MCP has: name, description, URL
   - Skip entries with missing critical fields
   - Dedup by URL (no duplicates)
   - Clean HTML/special characters

3. Database insertion
   - Map scraped data to resources schema:
     {
       title: name
       description: description
       url: url
       category: 'MCPs'
       authorId: 'community-bot' (automated)
       status: 'approved'
       featuredRank: null
       createdAt: now()
     }
   - Batch insert (500 at a time for performance)
   - Log success/failures

4. Validation report
   - Total imported: X
   - Failed: Y
   - Duplicates skipped: Z
   - Average fields per entry: N
```

**Code Template**:
```typescript
// scripts/scrape-mcps.ts
import { db } from '@/lib/db';
import { resources } from '@/drizzle/schema';

interface MCPData {
  title: string;
  description: string;
  url: string;
}

async function scrapeMCPs() {
  console.log('🔄 Starting MCP scrape...');

  try {
    const response = await fetch('https://antigravity.codes/api/mcps');
    const data = await response.json();

    const validMCPs = data
      .filter(mcp => mcp.title && mcp.url)
      .map(mcp => ({
        title: mcp.title,
        description: mcp.description || 'No description provided',
        url: mcp.url,
        category: 'MCPs',
        status: 'approved',
        authorId: 'system'
      }));

    // Batch insert
    const batchSize = 500;
    for (let i = 0; i < validMCPs.length; i += batchSize) {
      const batch = validMCPs.slice(i, i + batchSize);
      await db.insert(resources).values(batch);
      console.log(`✅ Inserted batch ${i/batchSize + 1}`);
    }

    console.log(`✅ Total imported: ${validMCPs.length}`);
  } catch (error) {
    console.error('❌ Scrape failed:', error);
  }
}
```

**Test**:
```typescript
// __tests__/scrape-mcps.test.ts
describe('MCP Scraper', () => {
  test('should fetch and parse MCPs correctly', async () => {
    const result = await scrapeMCPs();
    expect(result.total).toBeGreaterThan(1000);
    expect(result.failed).toBeLessThan(100);
  });

  test('should not create duplicates', async () => {
    await scrapeMCPs();
    const count = await db.query.resources.findMany({
      where: eq(resources.category, 'MCPs')
    });
    const urls = count.map(r => r.url);
    const uniqueUrls = new Set(urls);
    expect(urls.length).toBe(uniqueUrls.size);
  });

  test('should validate required fields', async () => {
    const mcps = await db.query.resources.findMany();
    mcps.forEach(mcp => {
      expect(mcp.title).toBeTruthy();
      expect(mcp.url).toBeTruthy();
    });
  });
});
```

**Acceptance Criteria**:
- [ ] 1000+ MCPs imported successfully
- [ ] Zero duplicate URLs in database
- [ ] All MCPs have title + URL + description
- [ ] Scraper runs in <60 seconds
- [ ] All tests passing

---

#### Task 0.2: Import Antigravity Rules (1.5 hours)
**File**: `scripts/seed-rules.ts`
**Purpose**: Aggregate rules from GitHub, Codelabs, community

**Sources**:
```
1. GitHub search: "antigravity rules" OR "antigravity custom rules"
   - Look for repos with README + examples
   - Extract rule definitions, descriptions

2. Google Codelabs: https://codelabs.developers.google.com
   - Search for Antigravity tutorials
   - Extract rule examples from guides

3. Reddit/Communities
   - r/Antigravity posts with rule sharing
   - Community Discord/forums (if accessible)
```

**Data Structure**:
```typescript
{
  title: 'Rule Name',
  description: 'What this rule does',
  url: 'https://github.com/username/rules/blob/main/rule.json',
  category: 'Rules',
  status: 'approved',
  authorId: 'community'
}
```

**Steps**:
```
1. Search GitHub API for repos with "antigravity rules"
   - Query: q=antigravity rules language:json
   - Extract top 50-100 repos
   - Parse README to find rule definitions

2. Extract rule data from each source
   - Rule name (from file name or metadata)
   - Rule description (from comments or README)
   - Rule URL (link to raw file)
   - Author (repo owner)

3. Validate and deduplicate
   - No duplicate titles
   - All have description >10 chars
   - All have valid URLs

4. Insert to database (batch)
   - Mark as 'Rules' category
   - Set authorId to original creator if findable

5. Log results
   - Total imported
   - Sources used
   - Validation results
```

**Code Template**:
```typescript
// scripts/seed-rules.ts
import { db } from '@/lib/db';
import { resources } from '@/drizzle/schema';

async function seedRules() {
  console.log('🔄 Seeding Antigravity Rules...');

  const rules = [
    {
      title: 'Code Quality Enforcer',
      description: 'Enforces code style and quality standards',
      url: 'https://github.com/...',
      category: 'Rules',
    },
    // ... more rules from sources
  ];

  const validRules = rules.filter(r => r.title && r.description);

  await db.insert(resources).values(validRules);
  console.log(`✅ Imported ${validRules.length} rules`);
}
```

**Test**:
```typescript
describe('Rules Seeding', () => {
  test('should import at least 300 rules', async () => {
    const count = await db.query.resources.findMany({
      where: eq(resources.category, 'Rules')
    });
    expect(count.length).toBeGreaterThanOrEqual(300);
  });

  test('all rules should have description', async () => {
    const rules = await db.query.resources.findMany({
      where: eq(resources.category, 'Rules')
    });
    rules.forEach(rule => {
      expect(rule.description).toBeTruthy();
      expect(rule.description.length).toBeGreaterThan(10);
    });
  });
});
```

**Acceptance Criteria**:
- [ ] 300+ rules imported
- [ ] All rules have title + description + URL
- [ ] No null/empty descriptions
- [ ] All tests passing

---

#### Task 0.3: Import Workflows (1 hour)
**File**: `scripts/seed-workflows.ts`
**Purpose**: Aggregate workflow examples

**Sources**:
```
1. Google Developers Blog examples
2. GitHub repos tagged "antigravity-workflow"
3. Community examples
```

**Data Structure**: Same as rules/MCPs

**Steps**:
```
1. Search for workflow examples (50-100 total)
2. Validate each has name + description
3. Batch insert
4. Log results
```

**Acceptance Criteria**:
- [ ] 50+ workflows imported
- [ ] All validated
- [ ] Tests passing

---

#### Task 0.4: Add Skills Directory (1 hour)
**File**: `scripts/seed-skills.ts`
**Purpose**: Add skills from documentation

**Steps**:
```
1. Extract from Antigravity official skills docs
2. Map to resources schema
3. Insert (20-30 skills expected)
4. Validate
```

**Acceptance Criteria**:
- [ ] 20+ skills imported
- [ ] All required fields present

---

#### Task 0.5: Data Validation & Cleanup (1 hour)
**File**: `scripts/validate-data.ts`
**Purpose**: Ensure all imported data is clean

**Validation Checklist**:
```typescript
async function validateAllData() {
  // Check 1: No null titles
  const nullTitles = await db.query.resources.findMany({
    where: isNull(resources.title)
  });
  console.log(`❌ Null titles: ${nullTitles.length}`);

  // Check 2: No empty descriptions
  const emptyDesc = await db.query.resources.findMany({
    where: eq(resources.description, '')
  });
  console.log(`❌ Empty descriptions: ${emptyDesc.length}`);

  // Check 3: All URLs valid
  const invalidUrls = await validateUrls();
  console.log(`❌ Invalid URLs: ${invalidUrls.length}`);

  // Check 4: No duplicates
  const dupes = await findDuplicates();
  console.log(`⚠️ Duplicates found: ${dupes.length}`);

  // Check 5: Category distribution
  const categories = await getCategoryStats();
  console.log('📊 Category breakdown:', categories);

  // Check 6: Approve invalid entries
  await deleteInvalidEntries();

  console.log('✅ Validation complete!');
}
```

**Test**:
```typescript
describe('Data Validation', () => {
  test('all resources have title', async () => {
    const resources = await db.query.resources.findMany();
    resources.forEach(r => {
      expect(r.title).toBeTruthy();
      expect(r.title.length).toBeGreaterThan(0);
    });
  });

  test('no duplicate URLs', async () => {
    const resources = await db.query.resources.findMany();
    const urls = resources.map(r => r.url);
    expect(urls.length).toBe(new Set(urls).size);
  });

  test('total imported >= 1500', async () => {
    const count = await db.query.resources.findMany();
    expect(count.length).toBeGreaterThanOrEqual(1500);
  });
});
```

**Acceptance Criteria**:
- [ ] 1500+ total resources
- [ ] Zero null titles
- [ ] Zero null descriptions
- [ ] All URLs valid
- [ ] No duplicates
- [ ] All tests passing

**Ralph Protocol Checkpoint**:
```
✅ PHASE 0 COMPLETE

Deliverables:
- 1500+ resources imported
- Data validated and clean
- All automated tests passing
- Zero data quality issues

Status: READY FOR PHASE 1
```

---

### PHASE 1: COMMUNITY FOUNDATION (10 hours)
**Owner**: Junior Dev (Antigravity)
**Goal**: Build user profiles, member directory, follow system
**Success**: Users can create profiles, see member directory, follow each other

---

#### Task 1.1: Database Schema Migration (1 hour)
**File**: `drizzle/migrations/add-profile-fields.sql`
**Purpose**: Extend users table with profile fields

**Migration**:
```sql
-- Add profile fields to users table
ALTER TABLE users ADD COLUMN bio TEXT;
ALTER TABLE users ADD COLUMN location TEXT;
ALTER TABLE users ADD COLUMN tagline TEXT;
ALTER TABLE users ADD COLUMN website TEXT;
ALTER TABLE users ADD COLUMN github_username TEXT;
ALTER TABLE users ADD COLUMN twitter_handle TEXT;
ALTER TABLE users ADD COLUMN linkedin_url TEXT;
ALTER TABLE users ADD COLUMN youtube_channel TEXT;
ALTER TABLE users ADD COLUMN discord_username TEXT;
ALTER TABLE users ADD COLUMN profile_completion_score INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN public_profile BOOLEAN DEFAULT true;
ALTER TABLE users ADD COLUMN followers_count INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN following_count INTEGER DEFAULT 0;

-- Create follows table
CREATE TABLE follows (
  follower_id TEXT NOT NULL REFERENCES users(id),
  following_id TEXT NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);

-- Create index for follows queries
CREATE INDEX idx_follows_follower ON follows(follower_id);
CREATE INDEX idx_follows_following ON follows(following_id);
```

**Test**:
```typescript
describe('Schema Migration', () => {
  test('users table has profile fields', async () => {
    const user = await db.query.users.findFirst();
    expect(user).toHaveProperty('bio');
    expect(user).toHaveProperty('location');
    expect(user).toHaveProperty('tagline');
    expect(user).toHaveProperty('website');
  });

  test('follows table exists and is queryable', async () => {
    const follows = await db.query.follows.findMany();
    expect(Array.isArray(follows)).toBe(true);
  });
});
```

**Acceptance Criteria**:
- [ ] All new columns added to users table
- [ ] follows table created with proper constraints
- [ ] Indexes created for performance
- [ ] No data loss in existing users

---

#### Task 1.2: Create Profile Edit Page (2 hours)
**File**: `src/app/settings/profile/page.tsx`
**Purpose**: Allow users to edit their profile with gamification

**Components**:
1. Profile form (inputs for all fields)
2. Real-time completion calculator
3. Progress bar visualization
4. Preview of public profile

**Steps**:
```
1. Create route file: src/app/settings/profile/page.tsx
   - Server component (gets user session)
   - Fetches current user data
   - Shows edit form

2. Create form component: src/components/ProfileEditForm.tsx
   - Input fields for: bio, location, tagline, website, GitHub, Twitter, etc.
   - Real-time validation:
     * bio: max 160 chars
     * location: max 50 chars
     * website: valid URL format
     * GitHub: alphanumeric only
   - Calculate completion score (0-100%)
   - Show progress bar

3. Add form submission action: src/app/settings/profile/actions.ts
   - Validate all fields
   - Update database
   - Return success/error
   - Revalidate profile page

4. Add profile preview: Show how public profile will look
   - Same design as /u/[username]
   - Real-time updates as user types

5. Add completion gamification
   - Progress bar: 0% → 100%
   - Points per field:
     * Bio: +20%
     * Location: +10%
     * Tagline: +10%
     * Website: +10%
     * GitHub: +15% ⭐ (highest value - SEO)
     * Twitter: +10%
     * LinkedIn: +5%
   - Unlock badge at 100%
   - Show "Complete profile to unlock Verified Developer badge"
```

**Code Template**:
```typescript
// src/app/settings/profile/page.tsx
import { auth } from '@/auth';
import { ProfileEditForm } from '@/components/ProfileEditForm';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect('/');

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
      <ProfileEditForm userId={session.user.id} />
    </div>
  );
}

// src/components/ProfileEditForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { updateProfile } from '@/app/settings/profile/actions';

export function ProfileEditForm({ userId }: { userId: string }) {
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    tagline: '',
    website: '',
    githubUsername: '',
    twitterHandle: '',
    linkedinUrl: '',
  });

  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    // Calculate completion score
    let score = 0;
    if (formData.bio) score += 20;
    if (formData.location) score += 10;
    if (formData.tagline) score += 10;
    if (formData.website) score += 10;
    if (formData.githubUsername) score += 15;
    if (formData.twitterHandle) score += 10;
    if (formData.linkedinUrl) score += 5;
    setCompletion(Math.min(score, 100));
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(userId, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Profile Strength</span>
          <span className="text-sm font-bold">{completion}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {/* Bio Field */}
      <div>
        <label className="block text-sm font-medium mb-2">Bio (160 chars max)</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value.slice(0, 160) })}
          maxLength={160}
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
          rows={3}
          placeholder="Full-stack developer specializing in Antigravity IDE..."
        />
        <p className="text-xs text-gray-400 mt-1">{formData.bio.length}/160</p>
      </div>

      {/* Location Field */}
      <div>
        <label className="block text-sm font-medium mb-2">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
          placeholder="San Francisco, CA"
        />
      </div>

      {/* GitHub Username (⭐ HIGHLIGHTED) */}
      <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-500/10 rounded">
        <label className="block text-sm font-medium mb-2">
          🐙 GitHub Username <span className="text-yellow-400">⭐ Highest SEO Value!</span>
        </label>
        <input
          type="text"
          value={formData.githubUsername}
          onChange={(e) => setFormData({ ...formData, githubUsername: e.target.value })}
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
          placeholder="johnsmith"
        />
        <p className="text-xs text-gray-400 mt-1">Unlocks "Verified Developer" badge at 100%</p>
      </div>

      {/* Twitter, LinkedIn, etc. */}
      {/* ... more fields following same pattern */}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-white transition-colors"
      >
        Save Profile
      </button>

      {completion === 100 && (
        <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg text-green-400">
          ✅ Profile complete! You've unlocked the "Verified Developer" badge!
        </div>
      )}
    </form>
  );
}

// src/app/settings/profile/actions.ts
'use server';

import { db } from '@/lib/db';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function updateProfile(userId: string, data: any) {
  try {
    // Validate
    if (data.bio && data.bio.length > 160) throw new Error('Bio too long');
    if (data.website && !isValidUrl(data.website)) throw new Error('Invalid website URL');

    // Calculate completion score
    let score = 0;
    if (data.bio) score += 20;
    if (data.location) score += 10;
    if (data.tagline) score += 10;
    if (data.website) score += 10;
    if (data.githubUsername) score += 15;
    if (data.twitterHandle) score += 10;
    if (data.linkedinUrl) score += 5;

    // Update database
    await db.update(users)
      .set({
        bio: data.bio,
        location: data.location,
        tagline: data.tagline,
        website: data.website,
        githubUsername: data.githubUsername,
        twitterHandle: data.twitterHandle,
        linkedinUrl: data.linkedinUrl,
        youtubeChannel: data.youtubeChannel,
        discordUsername: data.discordUsername,
        profileCompletionScore: score,
      })
      .where(eq(users.id, userId));

    revalidatePath(`/u/${userId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
```

**Test**:
```typescript
describe('Profile Edit Page', () => {
  test('should calculate completion score correctly', () => {
    // Test helper function
    const score = calculateCompletion({
      bio: 'test',
      githubUsername: 'test',
    });
    expect(score).toBe(35); // 20 + 15
  });

  test('should update user profile', async () => {
    await updateProfile('test-user', {
      bio: 'Test bio',
      location: 'San Francisco',
    });

    const user = await db.query.users.findFirst({
      where: eq(users.id, 'test-user'),
    });

    expect(user.bio).toBe('Test bio');
    expect(user.location).toBe('San Francisco');
  });

  test('should not allow bio > 160 chars', async () => {
    const longBio = 'a'.repeat(200);
    const result = await updateProfile('test-user', { bio: longBio });
    expect(result.success).toBe(false);
  });

  test('should unlock badge at 100% completion', async () => {
    const completeBio = {
      bio: 'test',
      location: 'SF',
      tagline: 'dev',
      website: 'https://test.com',
      githubUsername: 'test',
      twitterHandle: 'test',
      linkedinUrl: 'https://linkedin.com/in/test',
    };
    const score = calculateCompletion(completeBio);
    expect(score).toBeGreaterThanOrEqual(100);
  });
});
```

**Acceptance Criteria**:
- [ ] Profile form displays all fields correctly
- [ ] Real-time completion calculation works
- [ ] Progress bar updates as user types
- [ ] Form validation works (URL format, length limits)
- [ ] Data saves to database correctly
- [ ] GitHub field highlighted (⭐ SEO emphasis)
- [ ] Badge unlocks at 100%
- [ ] All tests passing
- [ ] Form accessible on desktop/mobile
- [ ] Page revalidates after save

---

#### Task 1.3: Create Public Profile Page (2 hours)
**File**: `src/app/u/[username]/page.tsx`
**Purpose**: Display public user profile with all data, contributions, stats

**Components**:
1. Profile header (avatar, name, bio, location, stats)
2. Social links (GitHub, Twitter, Website, LinkedIn, YouTube)
3. Contribution tabs (MCPs, Rules, Workflows, Skills)
4. Activity feed
5. Follow button
6. SEO metadata (meta tags, structured data)

**Steps**:
```
1. Create route: src/app/u/[username]/page.tsx
   - Fetch user by username
   - Fetch user's contributions (resources by authorId)
   - Fetch followers/following counts
   - Generate SEO metadata

2. Create profile header component
   - Avatar, name, tagline
   - Bio (160 chars)
   - Location, join date
   - Stats: contributions, views, followers
   - Badges (if earned)

3. Create social links section
   - Display all connected platforms with icons
   - Make each link clickable and external
   - Show "Verified" badge if GitHub/LinkedIn linked

4. Create contribution tabs
   - Contributions: Grid of resources submitted by this user
   - Filters by category (MCPs | Rules | Workflows | Skills)
   - Sort: Most Popular | Newest
   - Activity: Recent submissions, follows
   - Following/Followers: List view with follow button

5. Add Schema.org markup
   - Person schema with sameAs for social links
   - LocalBusiness (if location provided)

6. Add meta tags
   - Title: "John Smith (@johnsmith) - Antigravity Developer | 24 MCPs"
   - Description: Use user bio (160 chars)
   - Open Graph: avatar + title + description
```

**Code Template**:
```typescript
// src/app/u/[username]/page.tsx
import { db } from '@/lib/db';
import { users, resources, follows } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { UserProfile } from '@/components/UserProfile';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const user = await db.query.users.findFirst({
    where: eq(users.username, params.username),
  });

  if (!user) return { title: 'User not found' };

  return {
    title: `${user.displayName || user.username} (@${user.username}) - Antigravity Developer`,
    description: user.bio || `Developer on Antigravity Directory`,
    openGraph: {
      title: `${user.displayName} - Antigravity Developer`,
      description: user.bio || 'Check out this developer on Antigravity Directory',
      images: [{ url: user.image || '/default-avatar.png' }],
    },
  };
}

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const user = await db.query.users.findFirst({
    where: eq(users.username, params.username),
  });

  if (!user) {
    return <div>User not found</div>;
  }

  // Fetch contributions
  const contributions = await db.query.resources.findMany({
    where: eq(resources.authorId, user.id),
  });

  // Fetch followers/following
  const followers = await db.query.follows.findMany({
    where: eq(follows.followingId, user.id),
  });

  const following = await db.query.follows.findMany({
    where: eq(follows.followerId, user.id),
  });

  return (
    <UserProfile
      user={user}
      contributions={contributions}
      followerCount={followers.length}
      followingCount={following.length}
    />
  );
}

// src/components/UserProfile.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { followUser, unfollowUser } from '@/app/u/[username]/actions';

export function UserProfile({
  user,
  contributions,
  followerCount,
  followingCount,
}: any) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    if (isFollowing) {
      await unfollowUser(user.id);
    } else {
      await followUser(user.id);
    }
    setIsFollowing(!isFollowing);
  };

  const categoryGroups = contributions.reduce((acc, res) => {
    if (!acc[res.category]) acc[res.category] = [];
    acc[res.category].push(res);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Profile Header */}
      <div className="flex items-start gap-8 mb-12">
        <Image
          src={user.image || '/default-avatar.png'}
          alt={user.displayName}
          width={120}
          height={120}
          className="rounded-full"
        />

        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold">{user.displayName || user.username}</h1>
              <p className="text-gray-400">@{user.username}</p>
            </div>
          </div>

          {/* Tagline */}
          {user.tagline && (
            <p className="text-lg text-gray-300 mb-3">{user.tagline}</p>
          )}

          {/* Bio */}
          {user.bio && (
            <p className="text-gray-400 mb-4 max-w-md">{user.bio}</p>
          )}

          {/* Location + Join Date */}
          <div className="flex gap-4 mb-6 text-sm text-gray-500">
            {user.location && <span>📍 {user.location}</span>}
            <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mb-6">
            <div>
              <p className="text-2xl font-bold">{contributions.length}</p>
              <p className="text-sm text-gray-400">Contributions</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{followerCount}</p>
              <p className="text-sm text-gray-400">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{followingCount}</p>
              <p className="text-sm text-gray-400">Following</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mb-6">
            {user.website && (
              <Link href={user.website} target="_blank" className="text-blue-400 hover:underline">
                🌐 Website
              </Link>
            )}
            {user.githubUsername && (
              <Link
                href={`https://github.com/${user.githubUsername}`}
                target="_blank"
                className="text-blue-400 hover:underline"
              >
                🐙 GitHub
              </Link>
            )}
            {user.twitterHandle && (
              <Link
                href={`https://x.com/${user.twitterHandle}`}
                target="_blank"
                className="text-blue-400 hover:underline"
              >
                𝕏 Twitter
              </Link>
            )}
            {user.linkedinUrl && (
              <Link href={user.linkedinUrl} target="_blank" className="text-blue-400 hover:underline">
                💼 LinkedIn
              </Link>
            )}
          </div>

          {/* Follow Button */}
          <button
            onClick={handleFollow}
            className={`px-6 py-2 rounded-lg font-bold transition-colors ${
              isFollowing
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>

      {/* Contributions Tabs */}
      <div className="border-b border-gray-700 mb-8">
        <div className="flex gap-8">
          {Object.keys(categoryGroups).map((category) => (
            <button
              key={category}
              className="py-4 px-2 border-b-2 border-blue-500 text-blue-400 font-bold"
            >
              {category} ({categoryGroups[category].length})
            </button>
          ))}
        </div>
      </div>

      {/* Contributions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contributions.map((resource) => (
          <Link
            key={resource.id}
            href={`/t/${resource.slug}`}
            className="p-4 border border-gray-700 rounded-lg hover:bg-gray-900 transition-colors"
          >
            <h3 className="font-bold text-white mb-2">{resource.title}</h3>
            <p className="text-sm text-gray-400 line-clamp-2">{resource.description}</p>
            <p className="text-xs text-gray-500 mt-3">{resource.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

**Schema.org Markup** (in head):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "John Smith",
  "url": "https://antigravity.directory/u/johnsmith",
  "image": "https://antigravity.directory/avatars/johnsmith.jpg",
  "description": "Full-stack developer specializing in Antigravity IDE workflows",
  "sameAs": [
    "https://github.com/johnsmith",
    "https://x.com/johnsmith",
    "https://linkedin.com/in/johnsmith",
    "https://johnsmith.dev"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "San Francisco",
    "addressRegion": "CA"
  },
  "affiliation": {
    "@type": "Organization",
    "name": "Antigravity Directory"
  }
}
</script>
```

**Test**:
```typescript
describe('Public Profile Page', () => {
  test('should display user profile correctly', async () => {
    const response = await fetch('/u/testuser');
    expect(response.status).toBe(200);
    // ... more assertions
  });

  test('should show user contributions', async () => {
    // ... test contributions display
  });

  test('should have proper meta tags for SEO', async () => {
    // ... test meta tags
  });

  test('should have structured data (Schema.org)', async () => {
    // ... test JSON-LD
  });
});
```

**Acceptance Criteria**:
- [ ] Profile loads without errors
- [ ] All user data displays correctly
- [ ] Social links working and clickable
- [ ] Contributions grid displays
- [ ] Follow button works
- [ ] SEO meta tags present
- [ ] Schema.org markup valid
- [ ] Mobile responsive
- [ ] All tests passing

---

#### Task 1.4: Build Member Directory (2 hours)
**File**: `src/app/members/page.tsx`
**Purpose**: Searchable grid of all members with filter/sort options

**Components**:
1. Search bar (search by name/username/bio)
2. Member grid (avatars, names, contribution count)
3. Filter options (members with >5 contributions, etc.)
4. Sort options (most contributions, newest members, etc.)
5. Pagination

**Code Template**:
```typescript
// src/app/members/page.tsx
import { db } from '@/lib/db';
import { users } from '@/drizzle/schema';
import { MemberGrid } from '@/components/MemberGrid';
import { desc } from 'drizzle-orm';

export default async function MembersPage({
  searchParams,
}: {
  searchParams: { sort?: string; filter?: string; page?: string };
}) {
  const page = parseInt(searchParams.page || '1', 10);
  const pageSize = 24;
  const offset = (page - 1) * pageSize;

  // Fetch members
  let query = db.query.users.findMany();

  if (searchParams.sort === 'newest') {
    query = query.orderBy(desc(users.createdAt));
  } else {
    query = query.orderBy(desc(users.followersCount));
  }

  const allMembers = await query.offset(offset).limit(pageSize);
  const totalCount = await db.query.users.findMany(); // Get total

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">Community Members</h1>
      <p className="text-gray-400 mb-8">{totalCount.length} members</p>

      <MemberGrid members={allMembers} totalPages={Math.ceil(totalCount.length / pageSize)} currentPage={page} />
    </div>
  );
}

// src/components/MemberGrid.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

export function MemberGrid({ members, totalPages, currentPage }: any) {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {members.map((member) => (
          <Link
            key={member.id}
            href={`/u/${member.username}`}
            className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-900 transition-colors"
          >
            <Image
              src={member.image || '/default-avatar.png'}
              alt={member.displayName}
              width={80}
              height={80}
              className="rounded-full"
            />
            <p className="font-bold text-center text-sm">{member.displayName || member.username}</p>
            <p className="text-xs text-gray-400">@{member.username}</p>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            href={`/members?page=${p}`}
            className={`px-3 py-1 rounded ${
              p === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {p}
          </Link>
        ))}
      </div>
    </div>
  );
}
```

**Test**:
```typescript
describe('Member Directory', () => {
  test('should display all members in grid', async () => {
    // ... test grid rendering
  });

  test('should paginate correctly', async () => {
    // ... test pagination
  });

  test('should sort by newest', async () => {
    // ... test sort
  });
});
```

**Acceptance Criteria**:
- [ ] Member grid displays all users
- [ ] Search works (by name/username/bio)
- [ ] Filtering works
- [ ] Sorting works (newest, most contributions)
- [ ] Pagination works
- [ ] Member count shown
- [ ] Mobile responsive
- [ ] All tests passing

---

#### Task 1.5: Implement Follow System (2 hours)
**File**: `src/app/u/[username]/actions.ts`
**Purpose**: Allow users to follow/unfollow each other

**Actions**:
```typescript
// src/app/u/[username]/actions.ts
'use server';

import { db } from '@/lib/db';
import { follows, users } from '@/drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function followUser(targetUserId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  try {
    // Check if already following
    const existing = await db.query.follows.findFirst({
      where: and(
        eq(follows.followerId, session.user.id),
        eq(follows.followingId, targetUserId)
      ),
    });

    if (existing) return { error: 'Already following' };

    // Insert follow
    await db.insert(follows).values({
      followerId: session.user.id,
      followingId: targetUserId,
    });

    // Update follower counts
    await db.update(users)
      .set({
        followersCount: db.query.follows.findMany({
          where: eq(follows.followingId, targetUserId),
        }).length,
      })
      .where(eq(users.id, targetUserId));

    revalidatePath(`/u/${targetUserId}`);
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

export async function unfollowUser(targetUserId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  try {
    await db.delete(follows).where(
      and(
        eq(follows.followerId, session.user.id),
        eq(follows.followingId, targetUserId)
      )
    );

    revalidatePath(`/u/${targetUserId}`);
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}
```

**Test**:
```typescript
describe('Follow System', () => {
  test('should follow user', async () => {
    const result = await followUser('user-2');
    expect(result.success).toBe(true);
  });

  test('should not allow duplicate follows', async () => {
    await followUser('user-2');
    const result = await followUser('user-2');
    expect(result.error).toBeTruthy();
  });

  test('should unfollow user', async () => {
    await followUser('user-2');
    const result = await unfollowUser('user-2');
    expect(result.success).toBe(true);
  });

  test('should update follower counts', async () => {
    await followUser('user-2');
    const user = await db.query.users.findFirst({
      where: eq(users.id, 'user-2'),
    });
    expect(user.followersCount).toBeGreaterThan(0);
  });
});
```

**Acceptance Criteria**:
- [ ] Users can follow each other
- [ ] Follow button updates UI
- [ ] Follower counts update correctly
- [ ] Can't follow same user twice
- [ ] Can unfollow
- [ ] All tests passing

---

**Ralph Protocol Checkpoint**:
```
✅ PHASE 1 COMPLETE

Deliverables:
- Database schema migrated
- Profile edit page functional
- Public profile pages for all users
- Member directory searchable/sortable
- Follow system working

Status: READY FOR PHASE 3 (UI Redesign)
```

---

### PHASE 3: HOMEPAGE UI RESTRUCTURE (6 hours)
**Owner**: Junior Dev (Antigravity)
**Goal**: Redesign homepage header and structure for category-first navigation
**Success**: Clean header, hero section, category tabs, featured resources

**Reference**: `/docs/strategy/03-HOMEPAGE-UI-RESTRUCTURE.md`

#### Task 3.1: Update Navigation Config (30 mins)
**File**: `src/config/navigation.ts`
**Purpose**: Restructure navigation to expose categories

**Changes**:
```typescript
// FROM:
export const NAV_ITEMS: NavItem[] = [
  { label: 'Download', href: '/download' },
  { label: 'Help', href: '/troubleshooting' },
  {
    label: 'Resources',
    href: '#',
    children: [
      { label: 'Prompts', href: '/prompts', isNew: true },
      { label: 'Workflows', href: '/workflows' },
      { label: 'Agent Skills', href: '/skills' },
      { label: 'MCPs', href: '/mcp-servers' },
    ]
  },
  // ... more dropdowns

// TO:
export const NAV_ITEMS: NavItem[] = [
  { label: 'Rules', href: '/rules' },
  { label: 'Prompts', href: '/prompts', isNew: true },
  { label: 'MCPs', href: '/mcp-servers' },
  { label: 'Workflows', href: '/workflows' },
  { label: 'Skills', href: '/skills' },
  { label: 'Members', href: '/members' },
  {
    label: 'More',
    href: '#',
    children: [
      { label: 'Troubleshooting', href: '/troubleshooting' },
      { label: 'Download', href: '/download' },
      { label: 'Advertise', href: '/advertise' },
      { label: 'Community', href: 'https://discord.gg/antigravity', external: true },
    ]
  },
];
```

**Test**:
```typescript
describe('Navigation Config', () => {
  test('should have Rules as first item', () => {
    expect(NAV_ITEMS[0].label).toBe('Rules');
  });

  test('should not have Download in top level', () => {
    const topLevel = NAV_ITEMS.filter(item => !item.children);
    expect(topLevel.find(item => item.label === 'Download')).toBeUndefined();
  });

  test('should have More dropdown with secondary items', () => {
    const more = NAV_ITEMS.find(item => item.label === 'More');
    expect(more.children).toBeTruthy();
    expect(more.children.length).toBeGreaterThan(0);
  });
});
```

**Acceptance Criteria**:
- [ ] 5 categories visible at top level (Rules, Prompts, MCPs, Workflows, Skills)
- [ ] Members link visible
- [ ] More dropdown contains secondary items
- [ ] No broken navigation links
- [ ] Tests passing

---

#### Task 3.2: Create CategoryTabs Component (1 hour)
**File**: `src/components/CategoryTabs.tsx`
**Purpose**: Horizontal tabs for category filtering on homepage

**Code Template**:
```typescript
// src/components/CategoryTabs.tsx
'use client';

import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

interface CategoryTabsProps {
  categories: Category[];
  onCategoryChange: (categorySlug: string | null) => void;
}

export function CategoryTabs({ categories, onCategoryChange }: CategoryTabsProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>('all');

  const handleTabClick = (slug: string | null) => {
    setActiveCategory(slug);
    onCategoryChange(slug);
  };

  return (
    <div className="border-b border-white/[0.05] bg-black sticky top-14 z-40">
      <div className="max-w-7xl mx-auto px-4 flex gap-6 overflow-x-auto">
        {/* All Tab */}
        <button
          onClick={() => handleTabClick(null)}
          className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
            activeCategory === 'all'
              ? 'text-white border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          All ({categories.reduce((sum, cat) => sum + cat.count, 0)})
        </button>

        {/* Category Tabs */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleTabClick(category.slug)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === category.slug
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>
    </div>
  );
}
```

**Test**:
```typescript
describe('CategoryTabs Component', () => {
  test('should render all categories', () => {
    const categories = [
      { id: '1', name: 'MCPs', slug: 'mcps', count: 100 },
      { id: '2', name: 'Rules', slug: 'rules', count: 50 },
    ];
    // ... render and test
  });

  test('should call onCategoryChange when tab clicked', () => {
    // ... test callback
  });

  test('should show category counts', () => {
    // ... test counts display
  });
});
```

**Acceptance Criteria**:
- [ ] All categories display with counts
- [ ] Active tab highlighted (blue bottom border)
- [ ] Tab switching works
- [ ] Mobile scrollable
- [ ] All tests passing

---

#### Task 3.3: Create FeaturedSection Component (1.5 hours)
**File**: `src/components/FeaturedSection.tsx`
**Purpose**: Display 4-6 featured resources per category

**Code Template**:
```typescript
// src/components/FeaturedSection.tsx
'use client';

import Link from 'next/link';
import { ResourceCard } from '@/components/ResourceCard';

interface FeaturedSectionProps {
  categoryName: string;
  resources: any[];
  total: number;
}

export function FeaturedSection({ categoryName, resources, total }: FeaturedSectionProps) {
  if (resources.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 border-b border-white/[0.05]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Featured {categoryName}</h2>
        <Link href={`/${categoryName.toLowerCase()}`} className="text-blue-400 hover:underline">
          View all {total} {categoryName.toLowerCase()} →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {resources.slice(0, 6).map((resource) => (
          <ResourceCard key={resource.id} resource={resource} featured />
        ))}
      </div>
    </section>
  );
}
```

**Test**:
```typescript
describe('FeaturedSection Component', () => {
  test('should render featured resources', () => {
    // ... test rendering
  });

  test('should show max 6 resources', () => {
    // ... test limit
  });

  test('should show View All link', () => {
    // ... test link
  });
});
```

**Acceptance Criteria**:
- [ ] Displays 4-6 featured resources
- [ ] Shows category name in title
- [ ] "View All" link works
- [ ] Responsive grid (1/2/3 columns)
- [ ] All tests passing

---

#### Task 3.4: Create HeroSearch Component (1 hour)
**File**: `src/components/HeroSearch.tsx`
**Purpose**: Large search bar at top of homepage with heading

**Code Template**:
```typescript
// src/components/HeroSearch.tsx
import { SearchInput } from '@/components/SearchInput';

export function HeroSearch() {
  return (
    <div className="bg-gradient-to-b from-blue-500/10 to-transparent py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4 text-white">
          Discover Antigravity Resources
        </h1>
        <p className="text-gray-400 mb-8 text-lg">
          1500+ curated MCPs, rules, and workflows for Google Antigravity IDE
        </p>

        <div className="max-w-2xl mx-auto">
          <SearchInput large />
        </div>

        {/* Quick Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <a
            href="/rules"
            className="px-6 py-2 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors text-gray-300 hover:text-white"
          >
            Browse Rules
          </a>
          <a
            href="/mcp-servers"
            className="px-6 py-2 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors text-gray-300 hover:text-white"
          >
            View MCPs
          </a>
        </div>
      </div>
    </div>
  );
}
```

**Test**:
```typescript
describe('HeroSearch Component', () => {
  test('should render hero heading', () => {
    // ... test heading text
  });

  test('should render search input', () => {
    // ... test search input exists
  });

  test('should render quick action buttons', () => {
    // ... test buttons
  });
});
```

**Acceptance Criteria**:
- [ ] Large heading displays
- [ ] Search bar functional and prominent
- [ ] Gradient background visible
- [ ] Quick action buttons work
- [ ] Mobile optimized (stacked on small screens)
- [ ] All tests passing

---

#### Task 3.5: Restructure Homepage Layout (1 hour)
**File**: `src/app/page.tsx`
**Purpose**: Integrate new components into homepage

**Changes**:
```typescript
// src/app/page.tsx
import { Suspense } from 'react';
import { MarketplaceHeader } from '@/components/MarketplaceHeader';
import { HeroSearch } from '@/components/HeroSearch';
import { CategoryTabs } from '@/components/CategoryTabs';
import { FeaturedSection } from '@/components/FeaturedSection';
import { InfiniteResourceGrid } from '@/components/InfiniteResourceGrid';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { getCategoriesWithCounts, getFeaturedResources } from '@/lib/queries';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const categories = await getCategoriesWithCounts();
  const featured = await getFeaturedResources(params.category);

  return (
    <>
      <MarketplaceHeader />

      <main className="min-h-screen bg-black">
        {/* Hero Section */}
        <HeroSearch />

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          onCategoryChange={(slug) => {
            // Handle category change via URL param
          }}
        />

        {/* Featured Section */}
        {featured.length > 0 && (
          <FeaturedSection
            categoryName={params.category || 'Resources'}
            resources={featured}
            total={categories.find(c => c.slug === params.category)?.count || 0}
          />
        )}

        {/* Main Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <InfiniteResourceGrid />
        </div>

        {/* Newsletter */}
        <NewsletterCapture source="homepage" />
      </main>
    </>
  );
}
```

**Test**:
```typescript
describe('Homepage Layout', () => {
  test('should render hero search', () => {
    // ... test hero
  });

  test('should render category tabs', () => {
    // ... test tabs
  });

  test('should render featured section', () => {
    // ... test featured
  });

  test('should render resource grid', () => {
    // ... test grid
  });
});
```

**Acceptance Criteria**:
- [ ] Hero section displays at top
- [ ] Category tabs visible and functional
- [ ] Featured section shows
- [ ] Resource grid loads below featured
- [ ] Newsletter signup visible
- [ ] Layout matches design specs
- [ ] Mobile responsive
- [ ] All tests passing

---

**Ralph Protocol Checkpoint**:
```
✅ PHASE 3 COMPLETE

Deliverables:
- Navigation restructured (5 categories visible)
- Hero search component
- Category tabs with counts
- Featured sections per category
- Homepage fully redesigned

Status: READY FOR TESTING
```

---

## 🧪 TESTING & VALIDATION

### Unit Tests (For Each Feature)
```bash
npm run test -- --watch
```

**Test Coverage Targets**:
- ✅ Data seeding: 100% of imports tested
- ✅ User profiles: 95% coverage
- ✅ Following system: 90% coverage
- ✅ UI components: 85% coverage

### Integration Tests
```bash
npm run test:integration
```

Test full flows:
- [ ] User signup → profile creation → profile visible
- [ ] Content seeding → appears in grid
- [ ] Category filter → shows correct resources
- [ ] Follow user → follower count updates

### Performance Tests
```bash
npm run test:performance
```

**Targets**:
- [ ] Homepage load: <2 seconds
- [ ] Profile page load: <1.5 seconds
- [ ] Member directory: <2 seconds with 1000+ members
- [ ] Search results: <1 second

### Data Validation
```bash
npm run validate:data
```

**Checks**:
- [ ] 1500+ resources imported
- [ ] All resources have required fields
- [ ] No null titles/descriptions
- [ ] All URLs valid
- [ ] No duplicate URLs

### SEO Validation
```bash
npm run validate:seo
```

**Checks**:
- [ ] Meta tags present on all pages
- [ ] Structured data (Schema.org) valid
- [ ] Profile pages have proper meta descriptions
- [ ] Canonical tags set correctly

---

## 📋 DAILY EXECUTION CHECKLIST (24-Hour Sprint)

### Day 1: Morning (8 AM - 12 PM) - Phase 0
```
HOUR 1-2: MCP Scraper
  - [ ] Create scrape-mcps.ts script
  - [ ] Test scraper on sample data
  - [ ] Commit

HOUR 2-3: Rules Seeding
  - [ ] Create seed-rules.ts script
  - [ ] Import from sources
  - [ ] Commit

HOUR 3-4: Workflows + Skills
  - [ ] Import workflows (50+ items)
  - [ ] Import skills (20+ items)
  - [ ] Commit
```

### Day 1: Afternoon (12 PM - 6 PM) - Phase 1
```
HOUR 1-2: Schema Migration
  - [ ] Create migration file
  - [ ] Run migration
  - [ ] Test schema

HOUR 2-4: Profile Edit + Display
  - [ ] Create /settings/profile route
  - [ ] Build form component
  - [ ] Create /u/[username] page
  - [ ] Test both pages

HOUR 4-5: Member Directory
  - [ ] Create /members page
  - [ ] Build search/sort
  - [ ] Test pagination

HOUR 5-6: Follow System
  - [ ] Implement follow actions
  - [ ] Add follow button to profile
  - [ ] Test follow/unfollow
```

### Day 1: Evening (6 PM - 12 AM) - Phase 3 + Testing
```
HOUR 1: Navigation Config Update
  - [ ] Update src/config/navigation.ts
  - [ ] Test navbar

HOUR 2: Homepage Components
  - [ ] Create CategoryTabs component
  - [ ] Create FeaturedSection component
  - [ ] Create HeroSearch component
  - [ ] Test all components

HOUR 3: Integrate into Homepage
  - [ ] Update src/app/page.tsx
  - [ ] Test full homepage flow
  - [ ] Mobile responsive check

HOUR 4: Testing & Validation
  - [ ] Run all unit tests
  - [ ] Check data validation
  - [ ] Performance testing
  - [ ] SEO validation

HOUR 5: Bug Fixes & Refinements
  - [ ] Fix failing tests
  - [ ] Optimize images
  - [ ] Final review
```

---

## 🚨 RALPH PROTOCOL: Quality Gates & Validation

### What is Ralph Protocol?
A validation framework ensuring production-ready code. Three levels:

**🟢 GREEN (Ready)**
- All unit tests passing
- All integration tests passing
- Performance benchmarks met
- No console errors/warnings
- Code review approved

**🟡 YELLOW (Review Needed)**
- 90%+ tests passing
- Minor performance issues
- Small cosmetic bugs
- Needs refinement before ship

**🔴 RED (Blocked)**
- Tests failing
- Data corruption risk
- Major performance issues
- Must fix before proceeding

### Phase 0 Validation (Ralph Gate)
```
✅ Content Seeding Must Pass:
  [ ] 1500+ resources imported successfully
  [ ] Zero data quality issues
  [ ] All imports logged
  [ ] No duplicate URLs
  [ ] All tests passing
  [ ] Performance: <60 seconds

Status: 🟢 GREEN or 🔴 BLOCKED
```

### Phase 1 Validation (Ralph Gate)
```
✅ Community Foundation Must Pass:
  [ ] All schema migrations successful
  [ ] Profile creation/editing works
  [ ] Profile pages display correctly
  [ ] Member directory searchable
  [ ] Follow system functional
  [ ] No broken links
  [ ] Mobile responsive
  [ ] All tests passing (>90% coverage)

Status: 🟢 GREEN or 🟡 YELLOW or 🔴 BLOCKED
```

### Phase 3 Validation (Ralph Gate)
```
✅ UI Redesign Must Pass:
  [ ] Header clean and functional
  [ ] Homepage loads <2 seconds
  [ ] Category tabs working
  [ ] Featured section displays
  [ ] Resource grid loads
  [ ] All responsive breakpoints work
  [ ] No console errors
  [ ] All tests passing

Status: 🟢 GREEN or 🔴 BLOCKED
```

### Final Validation (Go-Live Gate)
```
✅ Complete Suite Must Pass:
  [ ] 1500+ resources live
  [ ] 100+ test users can create profiles
  [ ] Member directory working
  [ ] Homepage redesigned
  [ ] Performance: <2s load time
  [ ] SEO meta tags in place
  [ ] Schema.org markup valid
  [ ] All unit tests passing (>85%)
  [ ] All integration tests passing
  [ ] Zero critical bugs
  [ ] CEO approval

Status: 🟢 GREEN → LAUNCH or 🔴 BLOCKED → Fix & Re-validate
```

---

## 🎯 SUCCESS DEFINITION

### What Does "Complete" Look Like?

**By End of Sprint (24 Hours)**:
✅ 1500+ resources imported and visible
✅ User profiles fully functional
✅ Member directory live
✅ Follow system working
✅ Homepage redesigned (hero + tabs + featured)
✅ Navigation cleaned up
✅ All automated tests passing
✅ No console errors
✅ Mobile responsive throughout
✅ Ralph Protocol: 🟢 GREEN

### How to Validate (Checklist)
```
Content:
  [ ] Go to home page
  [ ] See 1500+ resources in grid
  [ ] See resource counts per category

Profiles:
  [ ] Sign in as test user
  [ ] Go to /settings/profile
  [ ] Edit profile fields
  [ ] See completion score update
  [ ] Visit /u/[username]
  [ ] See public profile display
  [ ] Click follow button
  [ ] Follower count increases

Navigation:
  [ ] Header shows: Rules, Prompts, MCPs, Workflows, Skills, Members, More
  [ ] Click each category → correct page loads
  [ ] More menu has secondary items

Homepage:
  [ ] See large hero search bar
  [ ] See category tabs with counts
  [ ] Click different tab → featured resources change
  [ ] See featured section with 4-6 resources
  [ ] See resource grid below
  [ ] All pages load <2 seconds

Testing:
  [ ] npm run test → all pass
  [ ] npm run validate:data → clean report
  [ ] npm run test:performance → meets benchmarks
  [ ] npm run validate:seo → all meta tags present
```

---

## 🔗 KEY REFERENCES

**Strategic Docs** (in /docs/strategy/):
- `01-ANTIGRAVITY-35K-MRR-STRATEGY.md` - Overall strategy
- `02-USER-PROFILES-SEO-STRATEGY.md` - Profile details
- `03-HOMEPAGE-UI-RESTRUCTURE.md` - UI specs

**Code Locations**:
- Database: `src/drizzle/schema.ts`
- Components: `src/components/`
- Pages: `src/app/`
- Config: `src/config/navigation.ts`
- Actions: `src/app/*/actions.ts`
- Tests: `__tests__/`

---

## ✅ SIGN-OFF

**Document Version**: 1.0
**Created For**: Antigravity (Junior Dev)
**By**: Product Manager (Claude)
**CEO**: Suraj (Executive Review Required)

**Distribution**:
- [ ] CEO reviews & approves
- [ ] Junior Dev receives & acknowledges
- [ ] Technical lead reviews architecture
- [ ] Begin 24-hour sprint

---

**END OF IMPLEMENTATION GUIDE**

Questions? Check `/docs/strategy/` for detailed specifications.
Ready to build? Start with Phase 0 task checklist above.
Hit issues? Ralph Protocol gates provide validation points.

🚀 Let's ship this in 24 hours.
