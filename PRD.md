# Product Requirements Document
## Arrive Finance — Personal Finance OS for Newcomers to Canada

**Version:** 1.0  
**Date:** 2026-05-22  
**Status:** APPROVED  
**Author:** Vivek Ally  
**Design reference:** `designs/platform-mockup.html`, `designs/landing.html`, `designs/onboarding.html`  
**Strategy reference:** `DESIGN.md`, CEO Plan `2026-05-21-arrive-finance-platform.md`

---

## 1. Overview

Arrive Finance is a personal finance OS for immigrants arriving in Canada. It guides newcomers through RRSP, TFSA, and FHSA account setup decisions, tracks financial health across all accounts, and surfaces AI-driven recommendations tailored to year-of-arrival edge cases that generic finance apps miss.

**Core insight:** The FHSA deadline (Dec 31 of the first eligible year) is the most financially costly mistake most newcomers make — $8,000/year of tax-advantaged room lost silently. Arrive Finance exists to prevent that mistake and become the financial operating layer for a newcomer's first 1–5 years in Canada.

**Current state:** Design approved, prototypes built (`platform-mockup.html`, `landing.html`, `onboarding.html`), one paying beta user (Avdhesh Singh, $20/month Interac). Domain: arrive.finance.

---

## 2. Problem Statement

Immigrants arriving in Canada save aggressively and invest poorly. They face a compounding trap:

- Unfamiliar tax-advantaged accounts (RRSP/TFSA/FHSA) with year-1 edge cases that advisors routinely get wrong
- No local financial network; advice comes from Facebook/WhatsApp groups (conflicting, often wrong)
- The FHSA — uniquely powerful, uniquely invisible — expires silently on Dec 31 of year 1
- Human advisors cost $200–400/hr; most newcomers can't afford repeated sessions
- Wealthsimple and other self-serve platforms assume baseline knowledge newcomers don't have

**The majority path (80%):** Ask in newcomer groups → conflicting advice → paralysis → wait 1–2 years → walk into bank → GIC at 3.5% → believe problem is solved.

**The motivated path (20%, "Avdhesh"):** Hire human advisor ($1,000–2,000/year) for basic setup; return for every major decision.

---

## 3. Target Users

### 3.1 Primary: Newcomer (Years 1–3 in Canada)

| Attribute | Profile |
|---|---|
| Immigration status | Permanent Resident, Work Permit (PGWP/LMIA), International Student, Returning Canadian |
| Employment | Employed, $50K–$200K household savings |
| Language | Hindi, Punjabi, Mandarin, Tagalog (non-native English) |
| Pain | Doesn't know what FHSA is. Doesn't know if they qualify. Doesn't know the deadline. |
| Motivation | Arrived with discipline-built savings; wants them to work correctly in Canada |

### 3.2 Lead User

**Avdhesh Singh** — Product Support Engineer, India → Canada arrival 2024. Saved $100K in two years. Attempted Wealthsimple (abandoned). Hired human advisor ($400/hr, multiple sessions). Paid $20/month for Arrive Finance on first demo. Exact quote: *"A one-stop solution where I can see my entire financial health from different accounts and investments and goals, and the system can help me plan my finances better."*

### 3.3 Secondary: International Student

Students on study permits are eligible for TFSA and FHSA based on Canadian tax residency (183+ days), NOT immigration status. Most students don't know this. A student who arrived 2 years ago has $14,000 in unused TFSA room. This is a primary "aha" moment the product must surface explicitly.

---

## 4. Goals & Success Metrics

### 4.1 13-Week Build Goals

| Metric | Target | Measurement |
|---|---|---|
| FHSA tool email signups | 50+ | Loops.so list count |
| Paying users at $20/month | 10 | Stripe MRR |
| MRR at Week 8 | $200 | Stripe dashboard |
| User interview sessions | 10+ | Calendly completions |

### 4.2 12-Month Goals

| Metric | Target |
|---|---|
| Paying users | 1,000 |
| MRR | $20,000 |
| Flinks bank aggregation | Live |
| SnapTrade execution | Live (pending legal clearance) |
| Advisor directory | Live |
| YC S2027 application | Submitted |

### 4.3 Hold Decision Point

**Week 8 hold:** If fewer than 5 paying users after 2 weeks at price point, stop Week 9+ investment and revisit scope before proceeding.

---

## 5. Feature Requirements

### 5.1 FHSA Deadline Tool (Week 1 — Free, Pre-Launch)

**Purpose:** Viral email capture mechanism. Shared in newcomer Facebook groups. "Do you know your FHSA deadline?"

**URL:** arrive.finance/fhsa  
**Gate:** Free, no account required.

**Requirements:**

| ID | Requirement |
|---|---|
| F-01 | Input: Canadian residency start date (month + year) |
| F-02 | Input: Age at arrival |
| F-03 | Input: First-time home buyer status (yes/no) |
| F-04 | Input: SIN type (regular 9-digit for eligibility check) |
| F-05 | Output: FHSA eligibility (yes/no/not yet) with plain-language explanation |
| F-06 | Output: Deadline date (Dec 31 of first eligible year) with countdown |
| F-07 | Output: Dollar amount at risk if deadline missed ($8,000 × years remaining) |
| F-08 | Email capture field: "Get a reminder before your deadline" |
| F-09 | Email triggers Loops.so drip sequence (3 emails, see §5.2) |
| F-10 | FHSA gating: must be Canadian resident + 18+ + first-time buyer to be eligible |
| F-11 | International students shown as eligible if 183+ days in Canada in the tax year |

**Eligibility rules engine (must be exact):**
- FHSA room = $8,000/year from first eligible year, $40,000 lifetime max
- First eligible year = year you turn 18 AND are Canadian resident AND are first-time buyer
- "First-time buyer" = have not owned a qualifying home as principal residence in the current or preceding 4 calendar years
- Study/work permit holders eligible if 183+ days in Canada in a calendar year (tax residency)
- RRSP = $0 room in year 1; unlocks after first Canadian tax return is filed

---

### 5.2 Email Drip Sequence (Loops.so, Week 7–8)

Triggered by FHSA tool email capture.

| Email | Timing | Subject | CTA |
|---|---|---|---|
| 1 | Immediate | "Your FHSA deadline is [date] — here's what it means" | → Open Arrive Finance wizard |
| 2 | Day 4 | "What's your TFSA room right now?" | → Open wizard |
| 3 | Day 10 | "Founding member offer: $15/month (instead of $20)" | → Subscribe with Stripe |

---

### 5.3 Onboarding Wizard (Weeks 5–6)

**Reference:** `designs/onboarding.html`  
**Auth:** Clerk (free tier)  
**DB:** Turso (SQLite edge, ca-central-1 region)

7-step wizard. State persists in DB after auth. All wizard output is "personalized financial education," not advice (see §8 Regulatory).

**Step 0 — Language Selection**

| ID | Requirement |
|---|---|
| W-00-01 | Present English and Hindi (हिंदी) as language options |
| W-00-02 | Language selection persists for entire session and user account |
| W-00-03 | Hindi strings loaded via react-i18next. If Hindi string missing, fall back to English (never blank) |
| W-00-04 | UI must use Noto Sans Devanagari for Hindi rendering (Fraunces/Plus Jakarta Sans do not support Devanagari) |

**Step 1 — Immigration Status**

| ID | Requirement |
|---|---|
| W-01-01 | Four options: Permanent Resident or Citizen / Work Permit (PGWP/LMIA) / International Student (Study Permit) / Returning Canadian |
| W-01-02 | Selecting "International Student" shows dynamic insight box: "You can open a TFSA and FHSA right now — no PR required. Eligibility is based on Canadian tax residency (183+ days), not immigration status." |
| W-01-03 | All four statuses eligible for TFSA and FHSA (no status gates TFSA/FHSA access in the UI) |
| W-01-04 | "Returning Canadian" shows note about TFSA room accumulation during years abroad |

**Step 2 — Arrival Date**

| ID | Requirement |
|---|---|
| W-02-01 | Month + year dropdowns (not day) |
| W-02-02 | Dynamic TFSA room calculation: `min(yearsInCanada + 1, cumulativeAnnualRoom) × $7,000` |
| W-02-03 | If arrived 2025 or later: amber alert "FHSA deadline is Dec 31, [arrival year] — [N] days away" |
| W-02-04 | TFSA room shown as a highlighted insight card below the inputs |
| W-02-05 | Maximum TFSA room cap: $7,000/year from 2023 onward. Historical accumulation for years 2009–2022 uses actual annual limits |

**Step 3 — Income**

| ID | Requirement |
|---|---|
| W-03-01 | Four brackets: Under $20K / $20K–$80K / $80K–$150K / $150K+ |
| W-03-02 | Note for students: "On-campus or part-time work income counts toward RRSP room" |
| W-03-03 | RRSP room estimate displayed per bracket (18% of prior-year Canadian income; $0 if year 1) |

**Step 4 — Savings**

| ID | Requirement |
|---|---|
| W-04-01 | Four brackets: Under $20K / $20K–$80K / $80K–$200K / Over $200K |
| W-04-02 | Over $200K triggers amber T1135 warning: "Savings over $100K CAD held outside Canada must be reported on T1135" |

**Step 5 — Goals (multi-select)**

| ID | Requirement |
|---|---|
| W-05-01 | Options: First home / Long-term retirement / RESP for children / Emergency fund / Possible return to home country |
| W-05-02 | Selecting "First home" shows amber FHSA deadline card |
| W-05-03 | Selecting "RESP" shows CESG grant note (20% match, $500/year max) |
| W-05-04 | Selecting "Return to home country" shows TFSA/FHSA closure warning |

**Step 6 — WhatsApp Opt-in (CASL-compliant)**

| ID | Requirement |
|---|---|
| W-06-01 | Optional step: "Get a WhatsApp reminder before your FHSA deadline" |
| W-06-02 | Phone number field (Canadian numbers preferred, international accepted) |
| W-06-03 | Double opt-in: confirmation message sent to number before storing |
| W-06-04 | Consent language: explicit purpose statement (FHSA reminder + platform updates) |
| W-06-05 | Timestamp + IP stored with consent record in Turso |
| W-06-06 | "STOP" keyword unsubscribes immediately and purges number from December reminder queue |
| W-06-07 | Unsubscribe processing within 10 days (CASL requirement) |
| W-06-08 | 30-day welcome message sent on opt-in (validates Twilio pipeline end-to-end) |
| W-06-09 | December 14 reminder job: Trigger.dev or Inngest cron, 9am EST, reads opted-in numbers from Turso, dispatches Twilio. **Enable this job in November 2026, not at build time.** |

**Step 7 — Results**

| ID | Requirement |
|---|---|
| W-07-01 | Heading adapts: Students see "You can open a TFSA and FHSA right now — no PR required" |
| W-07-02 | Three account cards (TFSA, FHSA, RRSP) with dynamic values from Steps 1–5 |
| W-07-03 | RRSP card shown dimmed with "Unlocks after you file your first Canadian tax return" if year 1 |
| W-07-04 | Prioritized action list built from state (FHSA first if home goal selected, then TFSA, RESP, return warning) |
| W-07-05 | Paywall card: "Get your full personalized plan — $20/month" → Stripe checkout |
| W-07-06 | Founding member offer: $15/month (from Loops.so email 3 cohort) tracked via Stripe coupon code |
| W-07-07 | All output labeled "personalized financial education" (see §8 Regulatory) |

---

### 5.4 Platform — Panel 1A: RRSP/TFSA/FHSA Calculator

**Reference:** `designs/platform-mockup.html` panel `p1a`

| ID | Requirement |
|---|---|
| P1A-01 | Tabs: TFSA / FHSA / RRSP |
| P1A-02 | TFSA inputs: arrival year, current balance, annual contribution, expected return %, time horizon |
| P1A-03 | TFSA output: available room, projected value at retirement, progress bar |
| P1A-04 | RRSP panel shows $0 room and amber warning for year-1 arrivals until first tax return filed |
| P1A-05 | FHSA panel shows Dec 31 deadline with countdown badge |
| P1A-06 | All calculation logic must match the rules engine (TypeScript, tested with Vitest) |

---

### 5.5 Platform — Panel 1B: Credit Score

**Reference:** `designs/platform-mockup.html` panel `p1b`

| ID | Requirement |
|---|---|
| P1B-01 | Display credit score (mock/manual entry in v1; Equifax API in v2) |
| P1B-02 | Score gauge: 300–850, color-coded (red < 580, amber 580–670, green 670+) |
| P1B-03 | Five-factor breakdown: Payment History, Utilization, Length, Mix, Inquiries |
| P1B-04 | Action plan: specific steps to reach 740+ (threshold for best mortgage rates in Canada) |
| P1B-05 | Mortgage interest savings calculation: show dollar amount difference between current score and 740+ |

---

### 5.6 Platform — Panel 1C: Find a Professional

**Reference:** `designs/platform-mockup.html` panel `p1c`

| ID | Requirement |
|---|---|
| P1C-01 | Search by postal code + specialty + language |
| P1C-02 | Advisor cards: name, credential (CPA/CFA/CFP), distance, languages, specialties, rating |
| P1C-03 | Filter by language: English, Hindi/Punjabi, Mandarin, Tagalog |
| P1C-04 | "Newcomer specialist" badge for advisors who have served 10+ newcomer clients |
| P1C-05 | "Book" button links to advisor's external booking URL (v1: manually curated; v2: FP Canada API) |
| P1C-06 | Advisor directory is a v1 curated list; self-serve advisor onboarding is Month 4+ |

---

### 5.7 Platform — Panel 2A: All My Money (Bank Aggregation)

**Reference:** `designs/platform-mockup.html` panel `p2a`  
**Status: COMING SOON — launching after Flinks API approval**

**v1 (Launch state):**

| ID | Requirement |
|---|---|
| P2A-CS-01 | Show "Coming Soon" state with dark green hero, supported bank list (RBC, TD, Scotiabank, BMO, Wealthsimple, EQ Bank) |
| P2A-CS-02 | Email notification form: "Be the first to connect your accounts" — stored in Loops.so |
| P2A-CS-03 | Ghosted preview mockup showing what the panel will display once live |
| P2A-CS-04 | "Soon" amber badge on sidebar nav item |
| P2A-CS-05 | "Coming Soon" badge in Features section on landing page |

**v2 (Post Flinks approval, Weeks 9–10):**

| ID | Requirement |
|---|---|
| P2A-01 | Flinks Connect widget integration for account linking |
| P2A-02 | Display: registered accounts (FHSA, TFSA, RRSP) + banking (chequing, HISA) in unified list |
| P2A-03 | Dark net worth hero card: total net worth, portfolio XIRR, TSX benchmark, vs-benchmark delta |
| P2A-04 | Allocation chart: percentage breakdown of where money sits (cash vs. invested vs. registered) |
| P2A-05 | Amber alert if registered accounts are in cash (0% return) |
| P2A-06 | Connection health states: `connected` / `stale` / `error` |
| P2A-07 | Stale state: show last-synced timestamp + "Reconnect" CTA |
| P2A-08 | Re-auth prompt when Flinks returns 401 on token refresh |
| P2A-09 | Arrive Score pill in topbar: composite 0–100 (see §5.9) |
| P2A-10 | Flinks access tokens encrypted at rest: AES-256, application layer, key in env/secrets manager |
| P2A-11 | No raw account data logged in plaintext at any layer |
| P2A-12 | Turso DB provisioned in ca-central-1 (Canadian data residency) |

---

### 5.8 Platform — Panel 2B: Goals

**Reference:** `designs/platform-mockup.html` panel `p2b`

| ID | Requirement |
|---|---|
| P2B-01 | Net Worth Trajectory chart: SVG line chart, age + year on x-axis, $ on y-axis |
| P2B-02 | Goal milestones plotted on trajectory (home purchase, emergency fund, retirement) |
| P2B-03 | "Add Goal" modal: goal type, name, amount, target year, priority |
| P2B-04 | "View Impact" modal: sliders for retirement age, life expectancy, emergency fund months, income growth %, inflation %, expense reduction at retirement |
| P2B-05 | Popular Canadian goals grid: First Home, Car, Child's Education (RESP), Vacation |
| P2B-06 | Scenarios grid: Job Loss, Parental Leave, Sabbatical, Return to Home Country |
| P2B-07 | "Return to Home Country" scenario: explain TFSA/FHSA implications of permanent departure |

---

### 5.9 Platform — Panel 2C: Best Practices

**Reference:** `designs/platform-mockup.html` panel `p2c`

| ID | Requirement |
|---|---|
| P2C-01 | Financial health score: checklist items grouped as Completed / Needs Attention / Not Started |
| P2C-02 | Checklist items specific to newcomer year: TFSA opened, FHSA opened, emergency fund, no high-interest debt, first tax return filed, RRSP opened, will + POA |
| P2C-03 | "Canadian vs. your home country" card: contextualizes RRSP/TFSA/FHSA against Indian PPF/EPF, Philippines SSS, etc. |

---

### 5.10 Platform — Panel 3A: Action Center (AI Advisor)

**Reference:** `designs/platform-mockup.html` panel `p3a`  
**Dependency:** Flinks data (Weeks 9–10); stub with wizard data pre-Flinks

| ID | Requirement |
|---|---|
| P3A-01 | Four action categories: Account Setup, Portfolio Health, Goal Progress, Credit Score |
| P3A-02 | Each category has a badge indicating urgency (action needed / critical / on track) |
| P3A-03 | Actions are specific and actionable: exact dollar amounts, exact account names, exact steps |
| P3A-04 | Arrive Score: composite 0–100, displayed in topbar pill |
| P3A-05 | Arrive Score inputs: Accounts (0–10), Portfolio (0–10), Goals (0–10), Credit (0–10) |
| P3A-06 | Score display: before 50 users — plain language label only ("On track" / "Needs attention"). After 50 users — "Top X% of newcomers who arrived your year." |
| P3A-07 | No simulated cohort data. Percentile only calculated from real user pool. |
| P3A-08 | "With vs. without recommendations" progress comparison for primary goal |
| P3A-09 | All AI output labeled as educational guidance, not investment advice |

---

### 5.11 Platform — Panel 3B: Talk to a Specialist

**Reference:** `designs/platform-mockup.html` panel `p3b`

| ID | Requirement |
|---|---|
| P3B-01 | AI-generated brief: structured summary of user's situation, immediate actions, key risks |
| P3B-02 | Brief auto-generated from wizard state + Flinks data (where available) |
| P3B-03 | Assigned specialist card: name, credentials, languages, availability |
| P3B-04 | Follow-up question field: sent to specialist, responded to within 24 hours |
| P3B-05 | Conversation history timeline: brief delivered, specialist responded, call scheduled |
| P3B-06 | "Book call" button: free with Pro plan (Calendly integration or manual link in v1) |
| P3B-07 | Specialist is a licensed CFP/CPA; Arrive Finance facilitates connection only — does not provide the regulated advice |

---

### 5.12 Platform — Panel 3C: Execute Plan

**Reference:** `designs/platform-mockup.html` panel `p3c`  
**Status: DEFERRED — requires legal opinion on IIROC/CSA order execution obligations before building**

| ID | Requirement |
|---|---|
| P3C-01 | **Do not build until legal clearance obtained.** Show panel as mockup only in v1. |
| P3C-02 | When built: SnapTrade integration for Wealthsimple self-directed account execution |
| P3C-03 | Restricted to: mutual funds and index ETFs (XEQT, XBAL, VCNS, ZGRO and equivalents) only |
| P3C-04 | Prohibited: individual stocks, options, crypto, leveraged products |
| P3C-05 | User reviews and confirms every transaction before execution — no auto-execution |
| P3C-06 | Specialist must approve execution actions before they appear in the execute queue |
| P3C-07 | Disclaimer: "Arrive Finance is not a registered investment dealer. Index funds and mutual funds only." |

---

## 6. Subscription & Billing

| Tier | Price | Features |
|---|---|---|
| Free | $0 | FHSA deadline tool, RRSP/TFSA/FHSA calculator, best practices checklist |
| Pro | $20/month ($15 founding member) | All panels, AI advisor, specialist connection, WhatsApp alerts, Goals + scenarios |
| Premium | $49/month (waitlist) | Pro + SnapTrade execution guidance + priority specialist access |

**Billing:** Stripe. Subscription gated after wizard plan preview. Founding member code ($15/month) delivered via Loops.so drip email 3. Manual Interac payments tracked in spreadsheet until Stripe is live (Week 7–8).

---

## 7. Design System

**Reference:** `DESIGN.md` — do not deviate without explicit approval.

| Element | Spec |
|---|---|
| Headings | Fraunces serif (variable font, 9–144pt optical size) |
| Body | Plus Jakarta Sans |
| Financial figures | Geist Mono, `font-variant-numeric: tabular-nums` |
| Primary | #15803D forest green |
| Primary dark | #14532D |
| Primary light | #DCFCE7 |
| Amber | #D97706 — urgency only (FHSA deadlines, RRSP year-1 warnings). Never casual use. |
| Background | #FAFAF8 warm off-white (not #FFFFFF) |
| Hindi UI font | Noto Sans Devanagari (Fraunces/Plus Jakarta Sans do not render Devanagari) |

---

## 8. Regulatory & Legal Requirements

| Requirement | Detail |
|---|---|
| "Education not advice" framing | All wizard output, AI advisor recommendations, and plan outputs are labeled "personalized financial education and guidance." Never "financial advice," "investment recommendation," or "advice." |
| Fintech lawyer scoping call | Required BEFORE Stripe launch (Week 7–8). Must confirm "education not advice" framing holds under applicable Canadian securities law. Budget: $600–1,000 for 2-hour scoping call. |
| Escalation rail | Panel 3B (Talk to a Specialist) is the licensed CFP/CPA escalation path for regulated advice. |
| CASL (WhatsApp opt-in) | Double opt-in required. Explicit purpose statement. Timestamp + IP stored. "STOP" keyword = immediate unsubscribe + purge from December reminder job queue. Processing within 10 days. Non-compliance fine: up to $10M. |
| PIPEDA / Data residency | Turso DB in ca-central-1. No raw account data in plaintext logs. Flinks tokens AES-256 encrypted at application layer before write. Key in env/secrets manager. |
| SnapTrade / execution | Do not build Execute Plan panel until legal opinion obtained on IIROC/CSA order execution obligations. |
| Disclaimer (footer, wizard) | "Arrive Finance provides personalized financial education and guidance. It is not a registered investment advisor, portfolio manager, or financial planner. For personalized financial advice, consult a licensed professional." |

---

## 9. Technical Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend | React (TypeScript) | react-i18next for English/Hindi i18n |
| Rules engine | TypeScript, Vitest | RRSP/TFSA/FHSA contribution room calculations. Must be unit-tested — errors destroy trust. |
| Auth | Clerk | Free tier; social login (Google) + email |
| Database | Turso (SQLite edge) | Provisioned ca-central-1. Flinks tokens encrypted before write. |
| Billing | Stripe | $20/month subscription. Founding member coupon codes. |
| Bank aggregation | Flinks Connect | Apply for API access immediately — 1–2 week approval. v1 = Coming Soon state. |
| Email drip | Loops.so | 3-email sequence from FHSA tool. Triggered by email capture. |
| WhatsApp | Twilio | CASL-compliant opt-in. Dec 15 FHSA reminder. |
| WhatsApp job scheduler | Trigger.dev or Inngest | Enable December job in November 2026, not at build time. |
| Domain | arrive.finance | Purchased. |

---

## 10. Rules Engine Specification

The rules engine is the core of the product. Errors in contribution room calculations are the single largest trust-destroying risk. All calculations must be unit-tested.

### TFSA Room
- Eligible from: year Canadian tax residency begins (183+ days in calendar year)
- Annual room: $7,000/year (2024+); cumulative historical limits apply for years 2009–2022
- Unused room carries forward indefinitely
- Formula: `sum of annual limits from first eligible year to current year, minus total contributions ever made`

### FHSA Room
- Eligible: Canadian resident + 18+ + first-time buyer (not owned qualifying home in current + prior 4 calendar years) + valid SIN
- Annual room: $8,000/year
- Lifetime max: $40,000
- **Deadline: Dec 31 of first eligible year** (must OPEN the account, not just contribute)
- Unused annual room carries forward ONE year only (not indefinitely)
- Tax deductible on contribution; tax-free on qualifying home purchase withdrawal
- Study/work permit holders eligible if 183+ days residency in the calendar year

### RRSP Room
- Year 1 = $0 for all newcomers (no Canadian earned income before arrival)
- Room = 18% of prior-year Canadian earned income
- Annual dollar limit: $31,560 (2024)
- Unused room carries forward indefinitely
- Deadline: March 1 of following year (to apply against prior year taxes)

---

## 11. Out of Scope (v1)

| Item | Reason | Revisit |
|---|---|---|
| Referral mechanic | Premature at <100 users; referral needs satisfied base | Month 4+ |
| B2B rules engine API licensing | Solo build distraction in weeks 1–13 | Month 4+ |
| Embeddable settlement agency widget | Build proof of demand first | Post-launch |
| Peer benchmarking ("vs. newcomers like you") | Needs real cohort data; misleading with sparse data | 100+ users |
| Punjabi / Mandarin / Tagalog | i18n infrastructure in v1; Hindi validates the model | v2 |
| SnapTrade / Execute Plan | Requires legal opinion on order execution (IIROC/CSA) | Post legal clearance |
| IRCC data integration | Future API partnership | v3 |
| Plaid (Canadian coverage) | Research before Week 9 — verify TD/Scotiabank/RBC/BMO coverage; fallback if Flinks gaps exist | Pre Week 9 |
| Individual stock / options / crypto trading | Out of product scope by design | Never |

---

## 12. Execution Prerequisites

These must happen before any production code ships:

1. **Avdhesh $20 conversation** ✅ — DONE. Payment received. Business validated.
2. **Flinks API access application** — Apply immediately. 1–2 week approval. Blocks Week 9–10 if deferred.
3. **Fintech lawyer scoping call** — Before wizard UI is designed (Week 3 gate). Confirm "education not advice" framing. ~$600–1,000 / 2 hours. If framing fails legal review, wizard output format must change before wizard UI is built.
4. **CASL compliance review** — Before WhatsApp opt-in is built (Week 5–6). Draft consent language; confirm double opt-in flow.
5. **Data residency decision** — Turso ca-central-1, AES-256 for Flinks tokens. Document in engineering spec before any DB schema is written.
6. **Co-founder decision** — Before Week 1. If Avdhesh or others contribute work: written equity/vesting agreement BEFORE any work is done.

---

## 13. Build Sequence Summary

| Week | What Ships | Owner |
|---|---|---|
| 0 | Avdhesh $20 + Flinks API application + Lawyer call booked | Human |
| 1 | FHSA deadline tool (free, email capture, Loops.so trigger) | CC-primary |
| 2–4 | Rules engine (RRSP/TFSA/FHSA TypeScript, Vitest tests) + react-i18next scaffold | CC-primary |
| Week 3 gate | Fintech lawyer call COMPLETED before wizard output screen is designed | Human |
| 5–6 | Auth (Clerk) + Turso + 7-step wizard + Hindi translations + CASL WhatsApp opt-in | CC-primary + Human review |
| 7–8 | Stripe ($20/mo) + plan output screen + Loops.so 3-email drip + 10 beta users + interviews | Human-primary + CC |
| Week 8 hold | <5 paying users after 2 weeks → revisit before Week 9+ | Human decision |
| 9–10 | Flinks aggregation panel (connection health, re-auth, AES-256 token encryption) | CC-primary |
| 11–12 | AI Advisor + Arrive Score (plain label pre-50 users, cohort rank after) | CC-primary |
| 13+ | CPA/CFA advisor directory; SnapTrade deferred | CC-primary |
| Month 4+ | Referral mechanic, B2B rules engine API, embeddable widget | Mix |

---

## 14. Open Questions

| # | Question | Owner | Deadline |
|---|---|---|---|
| 1 | Co-founder decision: solo vs. Avdhesh or other technical co-founder? | Vivek | Week 1 |
| 2 | Fintech lawyer: who to engage? Book scoping call. | Vivek | Before Week 5 |
| 3 | Flinks API: application submitted? | Vivek | Immediate |
| 4 | Plaid Canada coverage: does Plaid cover TD, Scotiabank, RBC, BMO adequately if Flinks has gaps? | Research | Before Week 9 |
| 5 | SnapTrade legal opinion: which lawyer handles IIROC/CSA scope for non-registered dealers? | Vivek | Month 3 |

---

*This document is the single source of truth for what Arrive Finance v1 builds. All feature decisions, scope changes, and regulatory requirements are recorded here. Update before implementing any change to scope.*
