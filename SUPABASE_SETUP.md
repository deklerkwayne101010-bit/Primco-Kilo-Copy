# Supabase Setup Instructions for Primeco Admin Dashboard

## Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully provisioned

## Step 2: Get API Credentials
1. Go to Project Settings > API
2. Copy `Project URL` and `anon public` key
3. Add them to Vercel environment variables as:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Step 3: Run SQL Schema
1. Go to SQL Editor in your Supabase project
2. Copy and paste the contents of `supabase-schema.sql`
3. Click "Run" to execute

The schema creates:
- `ranges` table
- `categories` table  
- `subcategories` table
- `products` table
- Indexes, triggers, and RLS policies

## Step 4: Import Initial Data
After schema is created, go to the Admin Dashboard (`/admin`) in your app and use "Bulk Upload > Import All from Catalogue" to import all existing products from the static catalogue.

Alternatively, you can seed categories/ranges manually or import them.

## Step 5: Vercel Integration
When linking with Vercel:
- Vercel will auto-detect environment variables if set
- Make sure to add the env vars to your Vercel project settings
- The app will work once env vars are configured
