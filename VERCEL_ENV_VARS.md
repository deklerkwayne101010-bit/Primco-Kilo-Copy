# Vercel Environment Variables Setup

## Required Environment Variables

Add these to your Vercel project under Settings > Environment Variables:

| Variable | Value | Notes |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | `https://your-project-ref.supabase.co` | From Supabase Project Settings > API > Project URL |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | From Supabase Project Settings > API > Project API keys > anon/public |

## Optional (if already configured)
| Variable | Value | Notes |
| --- | --- | --- |
| `GEMINI_API_KEY` | Your Gemini API key | Only needed if using Gemini features |
| `APP_URL` | Your Vercel app URL | Usually auto-set by Vercel |

## Step by Step Instructions

### 1. Get Supabase Credentials
1. Go to [supabase.com](https://supabase.com) and open your project
2. Click on Settings (gear icon) > API
3. Under "Project URL", copy the URL
4. Under "Project API keys", copy the `anon` `public` key

### 2. Add to Vercel
1. Go to [vercel.com](https://vercel.com) and open your project
2. Go to Settings > Environment Variables
3. Add each variable:
   - Key: `VITE_SUPABASE_URL`
   - Value: Paste your Supabase project URL
   - Environment: Select Production, Preview, and Development (or as needed)
   - Click "Save"
4. Repeat for `VITE_SUPABASE_ANON_KEY`

### 3. Redeploy
After adding environment variables, redeploy your project for changes to take effect.

### 4. Setup Database
1. In Supabase, go to SQL Editor
2. Copy and run the contents of `supabase-schema.sql` from the repo
3. Go to your deployed app > Admin Dashboard (`/admin`)
4. Use "Bulk Upload > Import All from Catalogue" to import all products
5. You can now manage products and upload images from the dashboard

## Notes
- All `VITE_` prefixed variables are exposed to the client-side code in Vite
- The anon key is safe to use in the browser with RLS enabled
- Make sure to run the SQL schema before using the admin dashboard
