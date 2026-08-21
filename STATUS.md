# Arrive Finance — Project Status

**Last updated:** 2026-06-10  
**Phase:** Pre-build (prototypes complete, backend not started)

## Tech Stack (Decided)
- **Frontend:** Next.js (App Router)
- **Hosting:** Vercel (free tier)
- **Backend/DB:** Supabase (PostgreSQL, Auth, RLS)
- **Domain:** arrive.finance
- **GitHub:** https://github.com/vivekally/AI-Personal-Finance-Advisor.git

## What Exists
- 9 HTML prototypes in `designs/` (landing, onboarding, platform-mockup, variants, investor deck, etc.)
- `index.html` hub page
- PRD, DESIGN.md, README.md documentation
- Demo video + hackathon PPTX (gitignored)
- Pre-revenue. 1 design partner (Aman G) offered $20/month verbally on the first demo — not collected

## Next Steps (When Resuming)
1. **Init Next.js** — `npx create-next-app` in this directory
2. **Wire Supabase** — install `@supabase/supabase-js` + `@supabase/ssr`, create DB tables, set up Auth + RLS
3. **Push to GitHub** — new Next.js codebase
4. **Deploy to Vercel** — connect GitHub repo, add env vars, connect arrive.finance domain

## Before Resuming, Have Ready
- Supabase **anon key** and **project URL** (Supabase Dashboard → Settings → API)
- Vercel account (free, sign in with GitHub)

## Infrastructure Done
- Supabase project connected (ref: ytoqbwepdusifvhhfzcr, ca-central-1)
- gbrain indexed (22 files, 260 chunks)
- gbrain using Supabase engine (GBRAIN_DISABLE_DIRECT_POOL=1)
