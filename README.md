# Boyle Heights Recovery Hub

Independent, bilingual air quality and resource information for Boyle Heights
residents affected by the June 2026 cold storage facility fire. Not an
official city or county resource.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind
- Supabase — resource directory content (the "living" layer, edit anytime, no redeploy)
- AirNow API — live air quality data (the "static" layer, lives in code)
- Vercel — hosting and deployment

## Local setup

1. Install dependencies:
   ```
   npm install
   ```
2. Copy the environment template and fill in real values:
   ```
   cp .env.example .env.local
   ```
3. Run the Supabase schema:
   - Open your Supabase project → SQL Editor
   - Paste the contents of `supabase/schema.sql` and run it
   - This creates the `resources` table and seeds it with the four starter
     entries from our planning session
4. Get your Supabase URL and anon key from Project Settings → API, and your
   AirNow key from your AirNow API dashboard. Put both in `.env.local`.
5. Run locally:
   ```
   npm run dev
   ```

## Editing resource content

Once live, edit rows directly in the Supabase Table Editor (`resources`
table). Changes appear on next page load — no code change, no redeploy.
This is deliberate: content changes fast during an active situation,
code shouldn't need to.

## Deploying

1. Push this repo to GitHub.
2. In Vercel, import the repo.
3. Add the same three environment variables from `.env.local` in the
   Vercel project settings (Environment Variables).
4. Deploy. Connect your GoDaddy domain in Vercel's Domains tab, then
   point the domain's DNS at Vercel per Vercel's instructions.

## Notes

- AirNow updates hourly; the API route caches for 30 minutes so you're
  not burning API calls needlessly.
- If AirNow is unreachable, the AQI card shows a plain-language fallback
  message instead of breaking or showing nothing.
- If Supabase has no active resources yet, the page falls back to two
  hardcoded defaults so it never ships empty.
