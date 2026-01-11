-- Add indexes for Phase 3 server-side filtering performance
-- These indexes optimize common query patterns

-- Index for filtering by category (most common filter)
CREATE INDEX IF NOT EXISTS idx_resources_category_id ON resources(category_id);

-- Index for sorting by published date
CREATE INDEX IF NOT EXISTS idx_resources_published_at ON resources(published_at DESC);

-- Index for sorting by views (popularity)
CREATE INDEX IF NOT EXISTS idx_resources_views ON resources(views DESC);

-- Index for sorting by featured status
CREATE INDEX IF NOT EXISTS idx_resources_featured ON resources(featured) WHERE featured = true;

-- Full-text search index for title (PostgreSQL specific)
CREATE INDEX IF NOT EXISTS idx_resources_title_search ON resources USING gin(to_tsvector('english', title));

-- Full-text search index for description (PostgreSQL specific)
CREATE INDEX IF NOT EXISTS idx_resources_description_search ON resources USING gin(to_tsvector('english', description));

-- Composite index for common query pattern: category + published_at
CREATE INDEX IF NOT EXISTS idx_resources_category_published ON resources(category_id, published_at DESC);
