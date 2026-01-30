-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- 1. PUBLIC READ POLICIES (Content is public)
CREATE POLICY "Public Read Resources" ON resources FOR SELECT USING (true);
CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Tags" ON tags FOR SELECT USING (true);
CREATE POLICY "Public Read ResourceTags" ON resource_tags FOR SELECT USING (true);
CREATE POLICY "Public Read Tools" ON tools FOR SELECT USING (true);
CREATE POLICY "Public Read Ratings" ON ratings FOR SELECT USING (true);
CREATE POLICY "Public Read Jobs" ON jobs FOR SELECT USING (true);

-- 2. USER POLICIES (Users manage their own data)
-- Users can see their own data
CREATE POLICY "Users Read Own Data" ON users FOR SELECT USING (auth.uid()::text = id);
-- Users can update their own profile
CREATE POLICY "Users Update Own Data" ON users FOR UPDATE USING (auth.uid()::text = id);

-- 3. SUBMISSIONS (Users manage their submissions)
CREATE POLICY "Users Read Own Submissions" ON submissions FOR SELECT USING (auth.uid()::text = user_id);
-- Users can create submissions
CREATE POLICY "Users Create Submissions" ON submissions FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- 4. BOOKMARKS (Private to user)
CREATE POLICY "Users Manage Bookmarks" ON bookmarks FOR ALL USING (auth.uid()::text = user_id);

-- 5. ACCOUNTS & SESSIONS (Service role only typically, but allowing user read)
CREATE POLICY "Users Read Own Account" ON accounts FOR SELECT USING (auth.uid()::text = "userId");
CREATE POLICY "Users Read Own Session" ON sessions FOR SELECT USING (auth.uid()::text = "userId");

-- 6. PAYMENTS (Strictly private)
CREATE POLICY "Users Read Own Payments" ON payments FOR SELECT USING (auth.uid()::text = user_id);

-- 7. SUBSCRIBERS (Admin only or Public Insert)
-- Allow anyone to subscribe (INSERT)
CREATE POLICY "Public Subscribe" ON subscribers FOR INSERT WITH CHECK (true);
-- Only admins can read subscribers (handled by service role which bypasses RLS)

-- NOTE: Authentication via NextAuth/Auth.js uses the 'service_role' key for database adapters,
-- which bypasses RLS. These policies primarily protect against direct client-side Access via Supabase-JS.
