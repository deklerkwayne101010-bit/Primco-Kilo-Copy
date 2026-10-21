# Primeco Supplies Admin Dashboard

A simple admin dashboard for managing the Primeco Supplies catalogue, built with React, TypeScript, and Supabase.

## Features

- **Product Management**: Add, edit, delete products with full catalogue structure (SKU, categories, ranges, specs, etc.)
- **Category Management**: Manage product categories and ranges
- **Bulk Upload**: Import multiple products at once via CSV
- **Matches Existing Structure**: Preserves the same data structure as the current catalogue.ts

## Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your project URL and anon key from Project Settings > API

### 2. Set Up Database

1. Go to your Supabase project > SQL Editor
2. Copy the contents of `supabase-schema.sql` and run it
3. This will create all necessary tables with proper relationships

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Access Admin Dashboard

Navigate to `/#/admin` or add `admin` to the page navigation. The admin dashboard will be available at `/admin` route in the app.

Or simply navigate by setting `activePage` to 'admin' in the app state.

## Usage

### Adding Products Manually
1. Go to Admin Dashboard > Products > Add Product
2. Fill in all required fields (SKU, Name, Category)
3. Categories and subcategories are pre-populated from the existing structure
4. Save to add to database

### Bulk Upload
1. Go to Admin Dashboard > Bulk Upload
2. Download the CSV template
3. Fill in your product data (use category_slug and subcategory_slug matching existing categories)
4. Paste CSV content and upload
5. Existing products with matching SKU will be updated (upsert)

### Managing Categories
1. Go to Admin Dashboard > Categories & Ranges
2. Add/edit/delete categories as needed
3. Ranges are predefined to match the existing structure

## Database Schema

- **ranges**: Product ranges (automotive-parts, vehicle-glass, paint-solutions, tools-supplies)
- **categories**: Product categories with codes
- **subcategories**: Subcategories belonging to categories
- **products**: Main product catalogue table

## Notes

- The admin dashboard maintains the exact same data structure as `src/data/catalogue.ts`
- All products must belong to valid categories and follow the same naming conventions
- SKU is the unique identifier
- Row Level Security is enabled with permissive policies (restrict as needed for production)
