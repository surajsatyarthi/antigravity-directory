-- Run this SQL in your Supabase SQL Editor to make yourself admin
-- Go to: https://supabase.com/dashboard → Your Project → SQL Editor → New Query

UPDATE users 
SET role = 'ADMIN', 
    updated_at = NOW()
WHERE email = 'csuitebrandagency@gmail.com';

-- Verify the change
SELECT id, email, role, name 
FROM users 
WHERE email = 'csuitebrandagency@gmail.com';
