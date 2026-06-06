-- ==========================================
-- SUPABASE STORAGE BUCKET CONFIGURATION
-- ==========================================

-- 1. Create a public bucket for storing assets (videos, images, docs)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'assets',
  'assets',
  true,
  52428800, -- 50MB file size limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Helper function to check if user has a staff role (if not already defined)
CREATE OR REPLACE FUNCTION public.is_staff(user_id uuid)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE id = user_id 
      AND role IN ('admin', 'ml_engineer', 'linguist', 'community_liaison', 'content_creator')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- 3. Row Level Security (RLS) is enabled by default on storage.objects, so we proceed directly to policies.

-- 4. Create RLS Policies for the 'assets' storage bucket

-- POLICY A: Allow public read access to all assets
CREATE POLICY "Allow public read access to assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'assets');

-- POLICY B: Allow authenticated staff members to upload assets
CREATE POLICY "Allow staff to upload assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'assets' 
  AND public.is_staff(auth.uid())
);

-- POLICY C: Allow authenticated staff members to update assets
CREATE POLICY "Allow staff to update assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'assets' 
  AND public.is_staff(auth.uid())
)
WITH CHECK (
  bucket_id = 'assets' 
  AND public.is_staff(auth.uid())
);

-- POLICY D: Allow authenticated staff members to delete assets
CREATE POLICY "Allow staff to delete assets"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'assets' 
  AND public.is_staff(auth.uid())
);
