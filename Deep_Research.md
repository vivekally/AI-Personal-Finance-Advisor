# Arrive Finance — Deep Market Research
*Prepared: May 21, 2026 | For internal use and investor deck*

---

## Executive Summary

Canada admits 400,000–480,000 newcomers per year. **76% fear making financial mistakes.** **55% find managing Canadian finances difficult.** No product exists that onboards a newcomer immigrant into the Canadian financial system end-to-end — from "I just landed" to "my RRSP, TFSA, and FHSA are open, invested, and on track." That is the gap Arrive Finance fills.

---

## 1. Market Size — The Opportunity

| Metric | Number | Source |
|--------|--------|--------|
| Permanent residents admitted (2024) | **483,600** | IRCC Annual Report 2025 |
| Planned levels 2025 | **395,000** | IRCC |
| Newcomers who find managing Canadian finances difficult | **55%** | TD Bank Survey |
| Newcomers with little/no understanding of Canadian banking | **38%** (vs 25% general population) | FCAC / Canada.ca |
| Newcomers who fear making financial mistakes | **76%** | TD Bank Survey |
| Canadian financial advisory market (AUM) | **$9.81 trillion** projected 2025 | Statista |
| North America financial advisory market CAGR | **5.59%** through 2031 | Mordor Intelligence |

### The Hidden Stat That Matters Most
> *"The majority of banks' new customers are immigrants — even more so than young adults or clients switching financial institutions."*
> — Globe and Mail

Banks' #1 new customer segment is newcomers. Yet **4 in 10 newcomers don't understand the system they're putting their savings into.** This is a product problem, not a knowledge problem.

---

## 2. Competitive Landscape

### Direct Competitors

| Product | What They Do | Newcomer Focus? | Critical Gap |
|---------|-------------|-----------------|--------------|
| **Thrive** *(early access, 2025)* | AI co-pilot for RRSP/TFSA/FHSA, net worth projection, Plaid sync | ❌ Not newcomer-specific | No RRSP year-1 edge case, no onboarding wizard, no language consideration, no advisor directory |
| **Wealthi AI** | Account aggregation (5,000+ institutions), AI Q&A, budgeting | ❌ Not newcomer-specific | No registered-account education, no goals engine, no advisor connection |
| **Wealthsimple Managed Investing** | Robo-advisor (Classic/Summit/Income ETF portfolios), 0.4–0.5%/yr | Partial — newcomer landing page only | No onboarding education, no XIRR tracking, no advisor directory; product is buried (separate account type, not surfaced to self-directed users) |
| **Questwealth / Justwealth** | Managed ETF robo-advisors | ❌ | No onboarding education, no goals engine |

### Incumbent Players

| Product | What They Do | Why Insufficient |
|---------|-------------|-----------------|
| **RBC / TD / BMO** | Full banking with newcomer bundles | Product-first, not education-first; overwhelming for non-native English speakers |
| **Arrive.com** | Newcomer settlement guide | Information only — no accounts, no AI, no execution layer |
| **FP Canada Planner Directory** | Find a CFP near you | No newcomer context, no language filter, no integration with a financial plan |

### Thrive — Closest Competitor (Detailed)
- AI co-pilot built for RRSP/TFSA/FHSA with net worth trajectory engine
- Plaid-connected, AES-256 encryption, Canadian privacy standards
- Free to start (pricing TBD), App Store only, Canada-only, early access
- **Not newcomer-specific** — no RRSP year-1 = $0 logic, no multilingual support, no sequencing for "I arrived 3 months ago"
- **This is where Arrive Finance wins:** Same AI + registered account intelligence, but built ground-up for the newcomer's actual situation

---

## 3. The Wealthsimple Reality Check

*Relevant because our platform mockup includes a "Wealthsimple integration" panel.*

### What Wealthsimple Managed Investing Actually Is
Wealthsimple offers two separate product silos in the same app:

1. **Self-Directed Investing** (formerly Wealthsimple Trade) — you pick stocks/ETFs, $0 commission
2. **Managed Investing** (the "robo-advisor") — WS picks and manages ETF portfolios automatically

**Fee structure:**
- Core: 0.5%/year
- Premium ($100k+): 0.4%/year
- Generation ($500k+): 0.2–0.4%/year + dedicated advisor team

### Why Power Users Have Never Seen It
If you opened a self-directed account, you are in the trading flow — Managed Investing **never surfaces** in your dashboard. It's a separate account type requiring deliberate opt-in via "Add account → Managed investing." Wealthsimple has also actively de-emphasized the robo-advisor framing since ~2022, pivoting toward self-directed, crypto, private credit, and premium tiers.

### Integration Reality for Arrive Finance

| Option | Feasibility |
|--------|------------|
| Wealthsimple Managed Investing | ❌ No public API — closed product, not integrable |
| **SnapTrade API** | ✅ Realistic path — connects to WS self-directed accounts, reads positions, places orders |
| **Flinks** | ✅ Read-only aggregation from WS + all major Canadian banks |
| Direct WS partnership | Possible long-term, requires formal deal |

**Revised execution story:** *"We connect to your existing Wealthsimple self-directed account via SnapTrade and guide you on exactly what to buy (e.g. XEQT, VGRO) inside your TFSA/FHSA — one tap, no switching apps."* This is more powerful than handing users to a robo-advisor.

---

## 4. Regulatory Tailwind — Open Banking Is Arriving

Canada's **Consumer-Driven Banking Act** received Royal Assent March 26, 2026.

| Phase | Timeline | What It Enables |
|-------|----------|----------------|
| Phase 1 | Early 2026 (now) | Read access — banks must share account data via API |
| Phase 2 | Mid-2027 | Write access — payment initiation, account switching |
| Real Time Rail | Q3 2026 | Instant payments infrastructure |

**Mandatory participants:** Big Six — RBC, TD, BMO, Scotiabank, CIBC, National Bank.

**What this means for Arrive Finance:**
The "All My Money" aggregation layer will have official bank API support within 12–18 months, eliminating Plaid scraping risk. Build now — the infrastructure catches up to the product. Flinks is the preferred Canadian-first aggregator (OAuth-native, National Bank-backed); Plaid is the fallback.

---

## 5. White Space — What Nobody Is Building

1. **Newcomer-first registered account onboarding with Canadian tax-residency logic**
   - RRSP year-1 = $0 contribution room (unlocks after first Canadian tax filing)
   - TFSA accumulates from residency year, not birth year
   - FHSA: must open before Dec 31 of eligibility year or lose $8,000 of room permanently
   - *No existing product handles these correctly for newcomers*

2. **"Open the right accounts in the right order" sequencing**
   - A newcomer 3 months in needs a specific sequence: SIN → chequing → TFSA (day 1) → FHSA (before Dec 31) → wait for RRSP until after first tax return
   - No product provides this sequencing

3. **Advisor directory with newcomer context**
   - FP Canada directory exists but has no filter for: "speaks Hindi/Punjabi/Mandarin/Tagalog" or "experienced with newcomers" or "understands foreign asset declaration (T1135)"
   - Massive unmet need among the 400k+/year arriving

4. **Human-in-the-loop between AI recommendation and execution**
   - Every existing tool either gives advice (robo-advisor) OR executes (self-directed) — none provide a structured handoff to a human specialist who can review AI-generated recommendations before execution
   - This is the "escalation rail" feature — the safety net that justifies trust

5. **Wealthsimple as execution layer (via SnapTrade)**
   - No current product guides newcomers through exactly what to buy in their own WS self-directed account
   - XEQT, VGRO, ZGRO recommendations with one-tap execution = novel in the market

---

## 6. Go-To-Market

### Target User
- Immigrant to Canada, year 1–3
- Employed, $50k–$200k in savings
- Unfamiliar with Canadian financial system
- High anxiety about irreversible mistakes
- Often non-native English speaker (primary: Hindi, Punjabi, Mandarin, Tagalog)

### Channels
- Reddit: r/PersonalFinanceCanada, r/ImmigrationCanada (organically active newcomer communities)
- Facebook newcomer groups (GTA Indians, Punjabi in Canada, Filipino in Canada, etc.)
- Settlement agencies: ACCES Employment, COSTI, Centre for Immigrant and Community Services
- Referral from CPA/CFA advisors listed in our own directory
- SEO: "RRSP newcomer Canada," "TFSA room first year Canada," "FHSA eligible newcomer"

### Pricing
- **Free tier:** Onboarding wizard + personalized account plan (lead gen, viral)
- **$20/month Pro:** All My Money aggregation + Goals + AI Portfolio Analysis + Arrive Score
- **$49/month Premium:** Includes specialist connection + execution guidance via SnapTrade

---

## 7. Build Roadmap

| Phase | Timeline | What Ships | Stack |
|-------|----------|-----------|-------|
| **0 — Validate** | Now (Week 1–2) | Show mockup to 10 newcomers. One question: "Would you pay $20/month for this today?" | — |
| **1 — Rules Engine** | Week 3–4 | RRSP/TFSA/FHSA calculator, contribution optimizer, year-1 edge cases | TypeScript, Vitest |
| **2 — Wizard** | Month 2 | 7-step onboarding wizard → rules engine → personalized plan output + Stripe $20/mo | Clerk, Turso, Stripe |
| **3 — Aggregation** | Month 3 | All My Money panel connected to real bank data | Flinks or Plaid |
| **4 — Goals + Score** | Month 4 | Net worth trajectory, Arrive Score, goal milestones | In-house |
| **5 — Execution** | Month 5+ | SnapTrade integration → buy XEQT/VGRO in WS account from within Arrive | SnapTrade API |
| **6 — Directory** | Month 6+ | CPA/CFA advisor directory with newcomer + language filters | FP Canada data |

---

## 8. Key Risks and Mitigations

| Risk | Mitigation |
|------|-----------|
| Thrive ships newcomer features | Our moat is depth of newcomer-specific logic (RRSP year-1, language support, advisor directory) — hard to bolt on |
| Open banking delayed past 2027 | Flinks/Plaid work today; official APIs are an upgrade, not a dependency |
| Regulatory: financial advice vs. information | Frame as "personalized information" not "advice." Escalation rail (human specialist) handles regulated advice. Engage fintech lawyer Month 1 (~$600–1,000 for scoping call) |
| Low conversion at $20/month | Free tier generates plan output — proven value before paywall. Anxiety about $100k in the wrong account is a strong motivation to pay |
| Wealthsimple blocks SnapTrade integration | Build aggregation-read (Flinks) first; SnapTrade is execution layer added later. Core value doesn't depend on it |

---

## 9. Sources

- [Thrive — Best Personal Finance App for Canadians](https://www.thethriveapp.net/)
- [Wealthi AI — Personal Finance App Canada](https://getwealthi.ai/solutions/personal-finance-app-canada)
- [Wealthsimple — Managed Investing](https://www.wealthsimple.com/en-ca/managed-investing)
- [Wealthsimple — How to Start Investing as a Newcomer](https://www.wealthsimple.com/en-ca/learn/how-to-start-investing-in-canada-newcomers)
- [TD Bank Survey: 76% of Newcomers Fear Financial Mistakes](https://www.canada.ca/en/financial-consumer-agency/programs/research/2022-building-better-financial-futures-challenge/helping-canada-immigrants-strengthen-financial-knowledge.html)
- [Consumer-Driven Banking Act — Open Banking Canada 2026](https://www.flinks.com/blog/open-banking-canada-2026-launch-fintech-institutions)
- [DLA Piper — New Consumer-Driven Banking Act Explained](https://www.dlapiper.com/en-pl/insights/publications/2026/04/the-new-consumer-driven-banking-act-explained)
- [Flinks vs Plaid — Canadian Open Banking API Comparison](https://snaptrade.com/blogs/flinks-vs-plaid)
- [FP Canada Planner Directory](https://www.fpcanada.ca/planner-directory)
- [IRCC Annual Report to Parliament on Immigration 2025](https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/annual-report-parliament-immigration-2025.html)
- [Statista — Financial Advisory Market Canada](https://www.statista.com/outlook/fmo/wealth-management/financial-advisory/canada)
- [Wealthsimple Pricing — Core / Premium / Generation](https://www.wealthsimple.com/en-ca/pricing)
- [Best Personal Finance Apps Canada 2026](https://lifemoney.ca/learn/personal-finance-apps-canada)
- [Open Banking Canada — What's Coming in 2026 and 2027](https://www.openbankingtracker.com/blog/open-banking-canada-what-is-coming-in-2026-and-2027)

---

*Arrive Finance — "The trusted advisor I couldn't afford."*
