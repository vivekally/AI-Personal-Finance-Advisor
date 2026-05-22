# Arrive Finance

**The financial operating system every newcomer to Canada needs.**

> *"A one-stop solution where I can see my entire financial health from different accounts and investments and goals, and the system can help me plan my finances better."*
> — Shweta Singh, Beta User #1 (paid $20 on the first demo)

---

## What This Is

Arrive Finance is a personal finance OS for immigrants arriving in Canada. It guides newcomers through RRSP, TFSA, and FHSA account setup decisions, tracks financial health across all accounts, and surfaces AI-driven recommendations tailored to year-of-arrival edge cases that generic finance apps miss entirely.

**Domain:** arrive.finance  
**Stage:** Pre-seed · Design complete · Prototypes live · 1 paying beta user  
**Target:** YC S2027

---

## The Problem

483,000 immigrants arrive in Canada every year.

- **76%** fear making a financial mistake (TD Bank Survey)
- **55%** find managing Canadian finances difficult (FCAC)
- **38%** of newcomers have little or no understanding of the Canadian banking system — vs. 25% of the general population (FCAC)
- The FHSA (First Home Savings Account) gives every eligible newcomer **$8,000/year** of tax-advantaged room — it expires silently on December 31st of the first eligible year. Most newcomers have never heard of it.
- Banks' #1 source of new customers is immigrants — more than young adults or switchers (Globe and Mail). Yet no product exists to properly onboard them.

**The hidden gap:** RRSP year-1 = $0 contribution room for newcomers. TFSA and FHSA eligibility are tax-residency-based (183+ days), not PR-status-based — meaning international students qualify and almost no product tells them this. These edge cases are impossible to bolt onto a generic finance app.

---

## Market Size

| Metric | Figure | Source |
|--------|--------|--------|
| Newcomers admitted (2024) | 483,600 | IRCC Annual Report 2025 |
| Planned for 2025 | 395,000 | IRCC |
| Canadian financial advisory market (AUM) | $9.81 trillion projected 2025 | Statista |
| North America advisory CAGR through 2031 | 5.59% | Mordor Intelligence |
| TAM (all newcomers × $240/yr) | $116M | Internal |
| SAM (tech-forward GTA/Vancouver × $240/yr) | $36M | Internal |
| SOM Year 1 (1,000 users × $240/yr) | $240K ARR | Internal |

---

## Current Status (May 2026)

| Item | Status |
|------|--------|
| Domain (arrive.finance) | ✅ Live |
| Design system (DESIGN.md) | ✅ Complete |
| Landing page prototype | ✅ Built |
| Onboarding wizard prototype (7-step) | ✅ Built |
| Platform mockup (9 panels) | ✅ Built |
| Investor deck (16 slides) | ✅ Built |
| Product Requirements Document (PRD) | ✅ Complete (14 sections) |
| Deep market research | ✅ Complete |
| Beta user #1 — Shweta Singh | ✅ $20/month Interac |
| Flinks API application | ✅ Submitted (1–2 week approval) |
| Rules engine (TypeScript) | 🔜 Week 3–4 |
| Auth + DB (Clerk + Turso) | 🔜 Week 5–6 |
| Stripe $20/month | 🔜 Week 7–8 |
| Bank aggregation (Flinks) | 🔜 Week 9–10 |

---

## Repository Structure

```
/
├── README.md                   ← This file
├── PRD.md                      ← Full Product Requirements Document (14 sections)
├── DESIGN.md                   ← Design system: typography, color, spacing, i18n
├── Deep_Research.md            ← Canadian market research + competitive analysis
├── CLAUDE.md                   ← AI agent instructions and skill routing
└── designs/
    ├── landing.html            ← arrive.finance landing page (live prototype)
    ├── onboarding.html         ← 7-step onboarding wizard (JS state machine)
    ├── platform-mockup.html    ← Full 9-panel platform (authenticated app)
    ├── investor-deck.html      ← 16-slide investor presentation
    ├── finalized.html          ← Finalized wizard flow (early version)
    ├── variant-a.html          ← Design exploration: Advisor's Office
    ├── variant-b.html          ← Design exploration: Clean Authority ← chosen direction
    └── variant-c.html          ← Design exploration: Modern Warm
```

---

## Design Files

### `designs/landing.html`
The arrive.finance marketing page. Key features:
- Amber FHSA urgency banner with live day countdown to Dec 31
- Three persona cards: Permanent Resident, International Student (highlighted — TFSA/FHSA eligible without PR), Work Permit
- Student spotlight: "$14,000 in unused TFSA room — no PR required"
- Pricing: Free / Pro $20/mo / Premium $49/mo
- Shweta testimonial
- "Personalized financial education, not financial advice" disclaimer

### `designs/onboarding.html`
7-step wizard with full JavaScript state machine. Steps:
1. Language selector (English / हिंदी)
2. Immigration status (PR / Work Permit / International Student / Returning Canadian)
3. Arrival date → calculates TFSA room and FHSA eligibility
4. Annual income (determines RRSP room after first tax return)
5. Current savings
6. Goals (first home, retirement, emergency fund)
7. WhatsApp opt-in (CASL-compliant double opt-in)
→ Results page: personalized RRSP/TFSA/FHSA plan with exact contribution room

**Student scenario:** Detects study permit + 183+ days → shows "You can open TFSA and FHSA right now — no PR required" insight.

### `designs/platform-mockup.html`
Full 9-panel authenticated platform:

| Panel | Description |
|-------|-------------|
| **Calculator** | RRSP/TFSA/FHSA contribution room with RRSP year-1 = $0 edge case |
| **Credit Education** | Credit score factors, SIN → credit history timeline |
| **Advisor Directory** | CPA/CFA search with language filter (Hindi/Punjabi/Mandarin/Tagalog) |
| **All My Money** | Bank aggregation via Flinks — **Coming Soon** (API approval pending) |
| **Goals** | Net worth trajectory, home purchase timeline, retirement projection |
| **Best Practices** | Newcomer-specific financial checklist with sequencing |
| **AI Advisor (Arrive)** | Chat interface with newcomer context built in |
| **Specialist** | Book a licensed CFP who speaks your language |
| **Execute** | SnapTrade integration for one-tap ETF execution (pending legal clearance) |

### `designs/investor-deck.html`
16-slide HTML investor presentation with keyboard navigation (← →), swipe support, CSS transitions, and progress bar. Slides:
1. Cover
2. The Problem
3. The Access Problem *(Millions underserved by the current system)*
4. The FHSA Moment
5. The Solution
6. The Product
7. Market Size
8. Traction
9. Competitive Landscape
10. Regulatory Tailwind
11. The Bank Acquisition Play *(Arrive Finance as RBC/TD's best customer acquisition tool)*
12. Business Model
13. Go-To-Market
14. Build Roadmap
15. The Ask
16. Appendix: Sources

---

## Design System

See [`DESIGN.md`](./DESIGN.md) for full documentation. Key rules:

| Element | Specification |
|---------|---------------|
| Headings | Fraunces (variable serif) — NOT Inter, NOT Plus Jakarta Sans |
| Body | Plus Jakarta Sans |
| Financial figures | Geist Mono with `font-variant-numeric: tabular-nums` |
| Primary color | `#15803D` forest green |
| Urgency only | `#D97706` amber — FHSA deadlines, RRSP warnings. Never casual use. |
| Background | `#FAFAF8` warm off-white — NOT `#FFFFFF` stark white |
| Hindi locale | Noto Sans Devanagari replaces Fraunces/Plus Jakarta Sans for Devanagari text |

---

## Business Model

| Tier | Price | What's Included |
|------|-------|-----------------|
| **Free** | $0/mo | FHSA deadline tool, RRSP/TFSA/FHSA calculator, personalized account plan preview |
| **Pro** | $20/mo | Everything free + Flinks aggregation, Goals, AI Action Center, Arrive Score, WhatsApp alerts |
| **Premium** | $49/mo | Everything Pro + SnapTrade execution guidance, priority specialist access *(pending legal)* |

**Unit economics (Year 1 estimate):**
- ARPU: $240/year (Pro)
- CAC: ~$40 (community channels)
- LTV:CAC: 6:1

---

## Tech Stack (Planned)

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript |
| i18n | react-i18next (English + Hindi v1) |
| Auth | Clerk |
| Database | Turso (SQLite, ca-central-1 region) |
| Payments | Stripe |
| Bank aggregation | Flinks (Canadian-first open banking, Phase 1 read access) |
| Email drip | Loops.so |
| WhatsApp | Twilio (CASL-compliant opt-in) |
| Background jobs | Trigger.dev / Inngest |
| ETF execution | SnapTrade *(pending legal opinion on IIROC/CSA obligations)* |

---

## Regulatory Tailwind

Canada's **Consumer-Driven Banking Act** received Royal Assent on **March 26, 2026**.

| Phase | Timeline | What It Enables |
|-------|----------|----------------|
| Phase 1 — Read access | Now (2026) | Banks must share account data via API. Flinks is live. |
| Phase 2 — Write access | Mid-2027 | Payment initiation, account switching |
| Real Time Rail | Q3 2026 | Instant payments infrastructure |

**Mandatory participants:** RBC, TD, BMO, Scotiabank, CIBC, National Bank.

Arrive Finance builds on Flinks today (Phase 1). Official bank APIs upgrade connection quality in Phase 2 without requiring a product rebuild.

---

## Build Roadmap

| Phase | Timeline | Deliverable |
|-------|----------|-------------|
| **0 — Validate** | Now | Show prototypes to 10 newcomers. One question: "Would you pay $20/month today?" |
| **1 — FHSA Tool** | Week 1 | arrive.finance/fhsa live, email capture, Loops.so drip trigger |
| **2 — Rules Engine** | Week 3–4 | RRSP/TFSA/FHSA calculator, TypeScript + Vitest, i18n scaffold |
| **3 — Wizard** | Week 5–6 | 7-step wizard → rules engine → plan output + Clerk + Turso |
| **4 — Stripe** | Week 7–8 | $20/month paywall, drip email, **10 beta users** |
| **5 — Aggregation** | Week 9–10 | Flinks integration, All My Money panel live |
| **6 — AI + Score** | Week 11–12 | AI Action Center, Arrive Score 0–100, Goals engine |
| **12 months** | Month 12 | 1,000 users · $20K MRR · YC S2027 application |

**Week 8 hold decision:** If fewer than 5 paying users after 2 weeks at $20/month, stop further investment and revisit scope.

---

## Go-To-Market

**The FHSA tool is the distribution strategy.** A free deadline calculator at arrive.finance/fhsa, shared in newcomer Facebook/WhatsApp groups with one question: "Do you know your FHSA deadline?" Email capture → 3-email Loops.so drip → wizard CTA → $20/month.

**Channels (by phase):**
1. FHSA tool + newcomer Facebook groups (Month 1–2)
2. Reddit r/PersonalFinanceCanada + r/ImmigrationCanada (Month 2–3)
3. Settlement agencies: ACCES Employment, COSTI (Month 4–5)
4. Referral mechanic: invite 3 → 3 months free (Month 6+)
5. SEO: "RRSP newcomer Canada," "FHSA eligibility newcomer" (Month 7–9)
6. CPA/CFA directory referrals + B2B API for bank partners (Month 10–12)

---

## Key Regulatory Notes

- **"Education not advice":** All wizard output is labeled "personalized financial education," never "financial advice." Fintech lawyer scoping call required before Stripe launch (~$600–1,000).
- **CASL (WhatsApp):** Double opt-in required. Timestamp + IP stored. STOP keyword unsubscribes immediately. Non-compliance: up to $10M fine.
- **PIPEDA:** Turso DB in ca-central-1. Flinks tokens AES-256 encrypted at application layer. No raw account data in plaintext logs.
- **SnapTrade execution:** Deferred pending legal opinion on IIROC/CSA order-execution obligations.

---

## Sources

Full source citations and methodology are in [`Deep_Research.md`](./Deep_Research.md) and the [Appendix slide of the investor deck](./designs/investor-deck.html).

Key sources: IRCC Annual Report 2025 · FCAC / Canada.ca · TD Bank Survey (via FCAC) · Statista · Mordor Intelligence · Globe and Mail · Flinks blog · DLA Piper · FP Canada Planner Directory.

---

*Arrive Finance — "The trusted advisor I couldn't afford."*
