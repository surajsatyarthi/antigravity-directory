-- Rollback migration for 0002_daffy_dazzler.sql
-- This script removes the group and integrations fields added in the forward migration

-- Remove group column from categories table
ALTER TABLE "categories" DROP COLUMN "group";

-- Remove integrations column from resources table  
ALTER TABLE "resources" DROP COLUMN "integrations";
