# Prototype reference

Complete reference for every HTML prototype in the `designs/` directory. All prototypes are self-contained single-file HTML pages with inline CSS and JavaScript. They load fonts from Google Fonts and require no build step.

## designs/landing.html

The arrive.finance marketing page.

| Feature | Detail |
|---------|--------|
| FHSA urgency banner | Amber banner with live day countdown to December 31. Uses `Date()` to compute remaining days. |
| Persona cards | Three cards: Permanent Resident, International Student (highlighted), Work Permit |
| Student spotlight | "$14,000 in unused TFSA room — no PR required" |
| Pricing section | Free / Pro $20/mo / Premium $49/mo |
| Testimonial | Shweta Singh quote with payment proof |
| Disclaimer | "Personalized financial education, not financial advice" |

## designs/onboarding.html

7-step onboarding wizard with a full JavaScript state machine.

| Step | Input | Logic |
|------|-------|-------|
| 1 — Language | English / Hindi toggle | Sets locale; Hindi swaps fonts to Noto Sans Devanagari |
| 2 — Immigration status | PR / Work Permit / International Student / Returning Canadian | Determines account eligibility paths |
| 3 — Arrival date | Date picker | Calculates TFSA contribution room (years since arrival x $7,000) and FHSA eligibility (183+ days = tax resident) |
| 4 — Annual income | Slider or input | Determines RRSP room (18% of earned income, available after first tax return) |
| 5 — Current savings | Input | Used in goals projection |
| 6 — Goals | Multi-select: first home, retirement, emergency fund | Shapes plan output prioritization |
| 7 — WhatsApp opt-in | Phone number + consent checkbox | CASL-compliant double opt-in |
| Results | Read-only output | Personalized RRSP/TFSA/FHSA plan with exact contribution room |

**Key edge cases the wizard handles:**

- **RRSP year-1 = $0**: Newcomers have no prior Canadian tax return, so RRSP contribution room is zero until after filing.
- **Student TFSA/FHSA eligibility**: Study permit + 183+ days of Canadian tax residency = eligible, regardless of PR status.
- **FHSA deadline**: Shows amber warning if the user's first eligible year ends within the calendar year.

## designs/platform-mockup.html

Full 9-panel authenticated platform. Sidebar navigation with icon buttons.

| Panel | Purpose | Key elements |
|-------|---------|--------------|
| Calculator | RRSP/TFSA/FHSA contribution room | Shows RRSP year-1 = $0 edge case explicitly |
| Credit Education | Credit score factors + SIN timeline | How credit history builds from SIN issuance |
| Advisor Directory | CPA/CFA search with language filter | Hindi, Punjabi, Mandarin, Tagalog filters |
| All My Money | Bank aggregation via Flinks | "Coming Soon" — API approval pending |
| Goals | Net worth trajectory + projections | Home purchase timeline, retirement projection |
| Best Practices | Newcomer financial checklist | Sequenced steps (SIN → bank account → TFSA → ...) |
| AI Advisor (Arrive) | Chat interface | Newcomer context built into system prompt |
| Specialist | Book a licensed CFP | Language-matching, availability calendar |
| Execute | SnapTrade ETF execution | "Pending legal clearance" — deferred |

## designs/hackathon-deck.html

10-slide HTML presentation for Builder Sprint Toronto 2026.

| Feature | Detail |
|---------|--------|
| Navigation | Keyboard (left/right arrows), swipe (touch), click (nav dots) |
| PDF download | Button triggers `window.print()` with print-optimized CSS |
| Slide count | 10 slides |
| Built for | Challenge #3: The Access Problem |

Slides: Cover, The Access Problem, Meet Shweta, The Solution, YC Validates the Market, Responsible AI, User Experience, Why Now, Path Forward, The Ask.

## designs/investor-deck.html

19-slide HTML investor presentation.

| Feature | Detail |
|---------|--------|
| Navigation | Keyboard (left/right arrows), swipe (touch), progress bar |
| CSS transitions | Slide entrance animations |
| Slide count | 19 slides (16 content + appendix) |

Slides: Cover, The Problem, The Access Problem, The FHSA Moment, The Solution, The Product, Market Size, Traction, Competitive Landscape, Regulatory Tailwind, The Bank Acquisition Play, Business Model, Go-To-Market, Build Roadmap, The Ask, Appendix: Sources.

## designs/finalized.html

Early version of the finalized onboarding wizard flow. Superseded by `onboarding.html` but retained for reference.

## designs/variant-a.html, variant-b.html, variant-c.html

Three design explorations produced during the design consultation phase:

| Variant | Direction | Status |
|---------|-----------|--------|
| A — Advisor's Office | Traditional, conservative aesthetic | Explored, not chosen |
| B — Clean Authority | Professional-warm, Fraunces serif headings | Chosen direction |
| C — Modern Warm | Contemporary, approachable | Explored, not chosen |

Variant B became the design system documented in `DESIGN.md`.

## index.html

Hub page that links to all prototypes and documents. Styled with the Arrive Finance design system (Fraunces headings, Plus Jakarta Sans body, forest green primary). Cards link to each prototype with descriptions and status badges.

## Related

- [DESIGN.md](../DESIGN.md) — full design system specification
- [How to run the build scripts](howto-build-scripts.md) — generate PPTX and video from prototypes
- [Getting started](tutorial-getting-started.md) — set up and run locally
