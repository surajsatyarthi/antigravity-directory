-- Rollback migration for 0003_add_filter_indexes.sql
-- Removes all indexes added for filtering performance

DROP INDEX IF EXISTS idx_resources_category_id;
DROP INDEX IF EXISTS idx_resources_published_at;
DROP INDEX IF EXISTS idx_resources_views;
DROP INDEX IF EXISTS idx_resources_featured;
DROP INDEX IF EXISTS idx_resources_title_search;
DROP INDEX IF EXISTS idx_resources_description_search;
DROP INDEX IF EXISTS idx_resources_category_published;
