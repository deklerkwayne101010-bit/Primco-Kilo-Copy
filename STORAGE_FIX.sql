-- Drop ALL policies on storage.objects for product-images and recreate
DO $$
DECLARE
    pol record;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol.policyname);
    END LOOP;
END $$;

-- Create fresh policies
CREATE POLICY "product_images_select" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "product_images_insert" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "product_images_update" ON storage.objects
FOR UPDATE USING (bucket_id = 'product-images');

CREATE POLICY "product_images_delete" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images');

-- Ensure bucket exists and is public
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('product-images', 'product-images', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO UPDATE SET public = true;
