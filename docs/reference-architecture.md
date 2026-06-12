# Architecture reference

Arrive Finance is in the pre-build phase. Prototypes are complete (static HTML). This document describes the planned production architecture for the Next.js + Supabase build.

## Current state

```
index.html                    Hub page (static)
designs/*.html                9 self-contained HTML prototypes (static)
scripts/make-pptx.ts          HTML → PPTX converter
scripts/make-demo-video.ts    HTML → MP4 converter
```

No backend. No database. No authentication. One paying beta user via manual Interac transfer.

## Planned stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js (App Router) | Server components for SEO, API routes for backend logic |
| Hosting | Vercel (free tier) | Zero-config deployment, edge functions, automatic HTTPS |
| Database | Supabase (PostgreSQL) | Row-level security, built-in auth, ca-central-1 region for PIPEDA compliance |
| Auth | Supabase Auth | Email/password + social login, integrated with RLS |
| Payments | Stripe | $20/month subscription, customer portal |
| Bank aggregation | Flinks | Canadian-first open banking, Phase 1 read access (API approval pending) |
| Email drip | Loops.so | Automated onboarding sequences |
| WhatsApp | Twilio | CASL-compliant double opt-in messaging |
| Background jobs | Trigger.dev or Inngest | FHSA deadline reminders, drip triggers |
| ETF execution | SnapTrade | Deferred pending IIROC/CSA legal opinion |

## Supabase configuration

| Setting | Value |
|---------|-------|
| Project ref | ytoqbwepdusifvhhfzcr |
| Region | ca-central-1 (Montreal) |
| Port | 5432 (session pooler) |
| Direct pool | Disabled (`GBRAIN_DISABLE_DIRECT_POOL=1`) |

## Build phases

### Phase 1: FHSA tool (Week 1)

```
arrive.finance/fhsa
```

Free, no auth required. Single-page tool: user enters arrival date, sees their FHSA deadline and contribution room. Email capture via Loops.so. This is the viral distribution wedge.

### Phase 2: Rules engine (Week 3-4)

TypeScript module that computes RRSP/TFSA/FHSA contribution room based on:

- Immigration status (PR, work permit, student, returning Canadian)
- Arrival date (determines tax residency start)
- Annual income (determines RRSP room after first tax return)
- Current year

Edge cases the engine must handle:

| Rule | Detail |
|------|--------|
| RRSP year-1 | Contribution room = $0 until first Canadian tax return is filed |
| TFSA eligibility | Tax resident (183+ days), not immigration status. Students qualify. |
| TFSA room | $7,000/year x years of tax residency (2024 limit) |
| FHSA eligibility | Same as TFSA (tax residency), plus first-time home buyer |
| FHSA deadline | December 31 of the first year the account is opened, or contribution room is forfeited |
| FHSA carry-forward | Unused room carries forward up to $8,000 if the account was opened in a prior year |

### Phase 3: Wizard + Auth + DB (Week 5-6)

Convert `designs/onboarding.html` into a React component. Wire to Supabase Auth and store user profiles. Output the personalized plan from the rules engine.

### Phase 4: Stripe (Week 7-8)

$20/month paywall after the free plan output. Stripe Checkout → Supabase webhook → update user tier. Target: 10 paying users.

**Hold decision at Week 8**: If fewer than 5 paying users after 2 weeks, stop and revisit scope.

### Phase 5: Bank aggregation (Week 9-10)

Flinks integration for the "All My Money" panel. Read-only account data. Flinks tokens encrypted at application layer (AES-256).

### Phase 6: AI + Score (Week 11-12)

AI Action Center (chat interface with newcomer context) and Arrive Score (0-100 financial health metric). Goals engine for net worth projections.

## Data model (planned)

```
users
  id              uuid (Supabase Auth)
  email           text
  immigration_status  enum (pr, work_permit, student, returning)
  arrival_date    date
  annual_income   integer
  locale          text (en, hi)
  tier            enum (free, pro, premium)
  created_at      timestamptz

goals
  id              uuid
  user_id         uuid -> users
  type            enum (home, retirement, emergency)
  target_amount   integer
  target_date     date

flinks_connections
  id              uuid
  user_id         uuid -> users
  flinks_token    text (AES-256 encrypted)
  institution     text
  connected_at    timestamptz

stripe_subscriptions
  id              uuid
  user_id         uuid -> users
  stripe_customer_id    text
  stripe_subscription_id text
  status          enum (active, canceled, past_due)
```

Row-level security: every table has `user_id = auth.uid()` policy. No user can read another user's data.

## Regulatory constraints

| Regulation | Constraint | Implementation |
|------------|-----------|----------------|
| PIPEDA | Data must reside in Canada | Supabase ca-central-1 region |
| CASL | WhatsApp requires double opt-in | Timestamp + IP stored, STOP keyword unsubscribes |
| "Education not advice" | Cannot provide financial advice without licensing | All output labeled "personalized financial education" |
| IIROC/CSA | ETF execution requires registration or exemption | SnapTrade deferred pending legal opinion |

## Related

- [STATUS.md](../STATUS.md) — current project status and next steps
- [PRD.md](../PRD.md) — full product requirements
- [Explanation: Rules engine design](explanation-rules-engine.md) — why the contribution room logic works the way it does
