# Why the rules engine works the way it does

The rules engine is the core of Arrive Finance. It computes RRSP, TFSA, and FHSA contribution room for Canadian immigrants. This document explains the design decisions and the edge cases that make this problem harder than it looks.

## The problem

Every generic finance app in Canada computes contribution room the same way: ask the user their RRSP/TFSA/FHSA balances, subtract from the CRA limit, show the remainder. This works for Canadians who've been filing taxes for years. It fails for newcomers in three specific ways.

### Edge case 1: RRSP year-1 is always $0

RRSP contribution room is 18% of the prior year's earned income, as reported on your tax return. A newcomer who arrived in 2024 has no 2023 Canadian tax return. Their RRSP room is $0 until they file their first return (typically April 2025 for the 2024 tax year).

Every major robo-advisor (Wealthsimple, Questwealth, Justwealth) asks "what's your RRSP room?" on signup. A newcomer who enters $0 gets a confusing experience. A newcomer who guesses wrong risks an over-contribution penalty (1% per month on excess amounts).

**Design decision:** The rules engine never asks for RRSP room directly. It asks for arrival date and income, then computes: if this is the user's first year in Canada, RRSP room = $0. After the first tax return is filed, room = 18% of prior year's earned income, capped at the CRA annual limit.

### Edge case 2: TFSA eligibility is tax residency, not immigration status

A common misconception: "you need PR to open a TFSA." Wrong. TFSA eligibility requires:

1. Age 18+
2. Valid SIN
3. Canadian tax resident

Tax residency starts when you establish "significant residential ties" (which means living in Canada for 183+ days in a calendar year). An international student who arrived 7 months ago is eligible. Most students don't know this.

**Design decision:** The onboarding wizard asks for immigration status AND arrival date separately. The rules engine computes tax residency from the arrival date (183+ days rule), then shows eligibility regardless of immigration status. For students, this produces the "aha" moment: "You can open TFSA and FHSA right now, no PR required."

### Edge case 3: FHSA has an invisible expiration

The FHSA (First Home Savings Account) gives $8,000/year in tax-advantaged contribution room. The catch: the room exists only once the account is opened. If you don't open the account in your first eligible year, that year's room is gone. There's no carry-forward for years before the account was opened.

This is the most financially costly mistake newcomers make. $8,000 of tax-advantaged room, lost silently because no one told them the deadline.

**Design decision:** The rules engine computes the FHSA deadline (December 31 of the current year if the user hasn't opened an account) and surfaces it with amber urgency styling. The landing page has a live countdown. The onboarding wizard results page shows it prominently. This urgency is the product's distribution hook: "Do you know your FHSA deadline?"

## The approach

The rules engine is a pure function: given user inputs (immigration status, arrival date, income, current date), it returns a plan object with computed room for each account type.

```
Input:
  immigration_status: "student"
  arrival_date: "2025-09-01"
  annual_income: 35000
  current_date: "2026-06-12"

Output:
  rrsp:
    room: 0
    reason: "No Canadian tax return filed yet"
    available_after: "April 2027 (after filing 2026 return)"
  tfsa:
    eligible: true
    reason: "Tax resident since 2025-09-01 (283+ days)"
    room: 7000  # 1 year of residency
    cumulative_unused: 0
  fhsa:
    eligible: true
    reason: "Tax resident, first-time home buyer"
    room: 8000
    deadline: "2026-12-31"
    urgency: "high"  # <6 months remaining
```

The engine is deterministic. No LLM involved. Every dollar amount is computed from CRA rules, not estimated. This is a deliberate choice: financial figures must be exact, and an LLM that hallucinates a contribution limit is worse than no tool at all.

## Trade-offs

**What we gave up:** The engine doesn't handle every edge case in the Income Tax Act. Spousal RRSP, pension adjustments, FHSA qualifying withdrawals for home purchases, and prescribed rate loan strategies are all out of scope. These require a licensed advisor.

**Why that's acceptable:** The target user is in year 1-3. They need to know three things: what accounts to open, how much they can contribute, and what deadlines matter. The rules engine answers exactly those questions. For everything else, the Advisor Directory panel connects them to a human CFP.

**What we gained:** A system that's always right about the basics. No hallucinated contribution limits. No wrong RRSP room calculations. No missed FHSA deadlines. The rules engine is the "trusted family accountant" the design system promises.

## Related

- [Architecture reference](reference-architecture.md) — where the rules engine fits in the stack
- [PRD.md](../PRD.md) — Section 5.2 for detailed rules engine requirements
- [Prototype reference](reference-prototypes.md) — see the onboarding wizard for the rules engine in action (prototype version)
