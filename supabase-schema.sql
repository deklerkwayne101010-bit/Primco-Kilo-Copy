-- Supabase schema for Primeco Supplies Admin Dashboard
-- Run this in your Supabase SQL editor

-- Ranges table
CREATE TABLE IF NOT EXISTS ranges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  range_id TEXT UNIQUE NOT NULL CHECK (range_id IN ('automotive-parts', 'vehicle-glass', 'paint-solutions', 'tools-supplies')),
  name TEXT NOT NULL,
  description TEXT,
  item_count INTEGER DEFAULT 0,
  highlight TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  range TEXT NOT NULL CHECK (range IN ('automotive-parts', 'vehicle-glass', 'paint-solutions', 'tools-supplies')),
  description TEXT,
  product_count INTEGER DEFAULT 0,
  icon_name TEXT DEFAULT 'Package',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subcategories table
CREATE TABLE IF NOT EXISTS subcategories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  category_slug TEXT REFERENCES categories(slug) ON DELETE CASCADE,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(category_slug, slug)
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT REFERENCES categories(slug) ON DELETE SET NULL,
  category_code TEXT,
  category_name TEXT,
  subcategory TEXT,
  subcategory_code TEXT,
  subcategory_name TEXT,
  range TEXT CHECK (range IN ('automotive-parts', 'vehicle-glass', 'paint-solutions', 'tools-supplies')),
  range_name TEXT,
  unit TEXT,
  description TEXT,
  brand TEXT,
  demo BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  in_stock BOOLEAN DEFAULT TRUE,
  specs JSONB DEFAULT '{}',
  image_alt TEXT,
  badge TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_range ON products(range);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_ranges_updated_at BEFORE UPDATE ON ranges FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subcategories_updated_at BEFORE UPDATE ON subcategories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE ranges ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now - you can restrict later with auth)
CREATE POLICY "Allow all operations on ranges" ON ranges FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on subcategories" ON subcategories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on products" ON products FOR ALL USING (true) WITH CHECK (true);

-- Storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for product images
CREATE POLICY "Public read access for product images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can update product images" ON storage.objects
FOR UPDATE USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can delete product images" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images');

-- Add image_url column to products table if it doesn't exist
ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT;
