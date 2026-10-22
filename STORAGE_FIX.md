# Fix Storage RLS Policy Error

The error "new row violates row-level security policy" happens because storage policies are too restrictive.

## Quick Fix

Run this in your Supabase SQL Editor:

```sql
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON storage.objects;

-- Create permissive policies
CREATE POLICY "Allow uploads to product images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow updates to product images" ON storage.objects
FOR UPDATE USING (bucket_id = 'product-images');

CREATE POLICY "Allow deletes from product images" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images');
```

## Also ensure bucket exists
```sql
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;
```

## Alternative: Disable RLS on storage.objects (less secure but simpler)
Only do this if policies still cause issues:
```sql
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
```
