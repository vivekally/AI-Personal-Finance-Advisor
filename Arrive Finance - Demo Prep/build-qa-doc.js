const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageBreak, ExternalHyperlink
} = require('docx');

// Helpers
const border = { style: BorderStyle.SINGLE, size: 4, color: "BBBBBB" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 100, bottom: 100, left: 140, right: 140 };

function p(text, opts = {}) {
  const { bold, italic, size, color, heading, spacingBefore, spacingAfter, alignment } = opts;
  return new Paragraph({
    heading,
    alignment,
    spacing: { before: spacingBefore || 0, after: spacingAfter || 120 },
    children: [new TextRun({ text, bold, italics: italic, size, color, font: "Arial" })]
  });
}

function pMulti(runs, opts = {}) {
  const { spacingBefore, spacingAfter, alignment, heading, numbering } = opts;
  return new Paragraph({
    heading,
    alignment,
    numbering,
    spacing: { before: spacingBefore || 0, after: spacingAfter || 120 },
    children: runs.map(r => {
      if (r.link) {
        return new ExternalHyperlink({
          children: [new TextRun({ text: r.text, style: "Hyperlink", font: "Arial", size: r.size })],
          link: r.link
        });
      }
      return new TextRun({ text: r.text, bold: r.bold, italics: r.italic, size: r.size, color: r.color, font: "Arial" });
    })
  });
}

function bullet(text, opts = {}) {
  const { bold } = opts;
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text, bold, font: "Arial", size: 22 })]
  });
}

function bulletMulti(runs) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 80 },
    children: runs.map(r => new TextRun({ text: r.text, bold: r.bold, italics: r.italic, font: "Arial", size: 22 }))
  });
}

function cell(text, opts = {}) {
  const { bold, color, fill, width, alignment } = opts;
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: fill ? { fill, type: ShadingType.CLEAR } : undefined,
    margins: cellMargins,
    children: [new Paragraph({
      alignment,
      children: [new TextRun({ text, bold, color, font: "Arial", size: 20 })]
    })]
  });
}

// ─────────────────────────────────────────
// COMPETITOR ANALYSIS TABLE
// ─────────────────────────────────────────
// Total width: 9360 DXA (US Letter, 1" margins)
// Columns: Competitor (1600) | Positioning (2500) | Strengths (2200) | Where it fails newcomers (3060)
const colWidths = [1600, 2500, 2200, 3060];

const competitorRows = [
  // Header row
  new TableRow({
    tableHeader: true,
    children: [
      cell("Competitor", { bold: true, fill: "0F2419", color: "FFFFFF", width: colWidths[0] }),
      cell("Positioning", { bold: true, fill: "0F2419", color: "FFFFFF", width: colWidths[1] }),
      cell("Strengths", { bold: true, fill: "0F2419", color: "FFFFFF", width: colWidths[2] }),
      cell("Where it fails newcomers", { bold: true, fill: "0F2419", color: "FFFFFF", width: colWidths[3] }),
    ]
  }),
  // Mint
  new TableRow({ children: [
    cell("Mint (Intuit)", { bold: true, width: colWidths[0], fill: "F0FDF4" }),
    cell("Personal finance aggregator. Discontinued by Intuit in March 2024; relaunched as Credit Karma's budgeting feature.", { width: colWidths[1] }),
    cell("Free. Brand recognition. Bank account aggregation. Credit score tracking.", { width: colWidths[2] }),
    cell("US-focused — limited Canadian bank coverage. No RRSP/TFSA/FHSA logic. Doesn't surface tax-residency edge cases. No language support. Discontinued/zombie product.", { width: colWidths[3] }),
  ]}),
  // YNAB
  new TableRow({ children: [
    cell("YNAB (You Need a Budget)", { bold: true, width: colWidths[0], fill: "F0FDF4" }),
    cell("Envelope-method budgeting app. $99/year. Power-user cult following.", { width: colWidths[1] }),
    cell("Strong methodology. Active community. Good UX for budgeting discipline.", { width: colWidths[2] }),
    cell("Budgeting-only — no investment guidance. No Canadian registered-account logic. No multilingual UX. Assumes user already understands the financial system they're operating in.", { width: colWidths[3] }),
  ]}),
  // Wealthsimple
  new TableRow({ children: [
    cell("Wealthsimple", { bold: true, width: colWidths[0], fill: "F0FDF4" }),
    cell("Canadian robo-advisor + brokerage + tax. Targets young professionals and DIY investors.", { width: colWidths[1] }),
    cell("Canadian-native. Strong brand. Full investment + tax + cash stack. Free trades.", { width: colWidths[2] }),
    cell("Onboards Canadians who already understand TFSAs and RRSPs. No newcomer-specific onboarding flow. English-first; minimal multilingual support. Doesn't surface the FHSA Dec 31 deadline rule or the international-student tax-residency wedge.", { width: colWidths[3] }),
  ]}),
  // KOHO
  new TableRow({ children: [
    cell("KOHO", { bold: true, width: colWidths[0], fill: "F0FDF4" }),
    cell("Prepaid Mastercard + spending account + credit-building tools. 1.7M+ Canadian users.", { width: colWidths[1] }),
    cell("Smooth digital onboarding. Now has Interac access (May 2026). Building toward bank-lite status.", { width: colWidths[2] }),
    cell("Spending and credit-building only — not retirement, investment, or tax planning. Doesn't cover registered accounts. English-first. No newcomer-specific RRSP/TFSA/FHSA guidance.", { width: colWidths[3] }),
  ]}),
  // Borrowell
  new TableRow({ children: [
    cell("Borrowell", { bold: true, width: colWidths[0], fill: "F0FDF4" }),
    cell("Free credit score monitoring + lender recommendations.", { width: colWidths[1] }),
    cell("Free credit score from Equifax. Lender marketplace. Decent UX.", { width: colWidths[2] }),
    cell("Credit-only — no registered-account planning, no investment guidance. Monetizes via lead-gen referrals to lenders (biased recommendations). No newcomer onboarding.", { width: colWidths[3] }),
  ]}),
  // RBC / Big Six newcomer programs
  new TableRow({ children: [
    cell("RBC / TD / Scotiabank / CIBC newcomer programs", { bold: true, width: colWidths[0], fill: "F0FDF4" }),
    cell("Specialized newcomer offers: fee waivers, no-credit-history credit cards, branded promos (Apple Watch, $400 cash).", { width: colWidths[1] }),
    cell("Trusted brand. Physical branches. Bundled offers. Specialist newcomer advisors at major branches.", { width: colWidths[2] }),
    cell("Sales funnels for the bank's own products. Conflicted advice (push GICs, mutual funds with trailers, credit cards). No cross-bank aggregation. Don't surface what newcomers DON'T know to ask.", { width: colWidths[3] }),
  ]}),
  // Wealthica
  new TableRow({ children: [
    cell("Wealthica", { bold: true, width: colWidths[0], fill: "F0FDF4" }),
    cell("Canadian portfolio tracker / net-worth dashboard. Aggregates investment accounts.", { width: colWidths[1] }),
    cell("Canadian-built. Strong aggregation across brokerages and banks. Good for self-directed investors.", { width: colWidths[2] }),
    cell("Power-user tool — assumes you already have investment accounts to track. No onboarding, no advice, no newcomer-specific tax-residency logic. No multilingual UX.", { width: colWidths[3] }),
  ]}),
  // Arrive Finance (us)
  new TableRow({ children: [
    cell("Arrive Finance", { bold: true, width: colWidths[0], fill: "DCFCE7" }),
    cell("Personal finance OS for newcomers to Canada. Onboard → Track → Optimize.", { width: colWidths[1], fill: "DCFCE7" }),
    cell("Newcomer-specific rules engine (RRSP year-1=$0, FHSA Dec 31, TFSA from tax residency). 10-language plan. Specialist directory with language filter. Human-in-the-loop AI advice. Built on Flinks (NBC-owned, regulated).", { width: colWidths[2], fill: "DCFCE7" }),
    cell("Pre-revenue — Aman G's $20/month is a verbal commitment, not collected. Need to ship rules engine + wizard + Stripe to reach 10 paying users. Brokerage execution deferred pending IIROC review.", { width: colWidths[3], fill: "DCFCE7" }),
  ]}),
];

// ─────────────────────────────────────────
// DOCUMENT
// ─────────────────────────────────────────
const doc = new Document({
  creator: "Arrive Finance",
  title: "Demo Day Prep — Arrive Finance",
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: "0F2419" },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: "15803D" },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: "111827" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      // Title
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [new TextRun({ text: "Arrive Finance", bold: true, size: 48, font: "Arial", color: "0F2419" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [new TextRun({ text: "Demo Day Preparation", size: 32, font: "Arial", color: "15803D" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 360 },
        children: [new TextRun({ text: "Builder Sprint Toronto 2026 — Challenge #3", italics: true, size: 22, color: "6B7280", font: "Arial" })]
      }),

      // ─── 1. The Pitch in 3 Lengths ───
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "1. The Pitch — Three Lengths", bold: true, font: "Arial" })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "The 30-Second Pitch", bold: true, font: "Arial" })] }),
      p("483,000 newcomers arrive in Canada every year. 76% fear making a financial mistake. 38% don't understand the banking system. Our first design partner offered $20/month unprompted on the first demo — verbal, not yet collected. Arrive Finance is the personal finance OS purpose-built for that moment — RRSP, TFSA, FHSA, in 10 languages, with the rules nobody else codifies. We ship on Flinks — regulated, National Bank-backed — as Canada's open banking framework phases in: Royal Assent March 26, 2026, draft regulations June 27, 2026, read access phasing in through 2027. The screen-scraping prohibition is legislated but not yet in force; when it commences we are already the compliant path."),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "The 60-Second Pitch", bold: true, font: "Arial" })] }),
      p("Aman G arrived from India in 2024, saved $100,000 over two years, and earned $0 in tax-advantaged growth. His $14,000 of TFSA room sat untouched. His 2024 FHSA $8,000 never came into existence. He paid $600 to four CFPs just to understand what accounts he was eligible to open. He's one of 380,000 this year — 97.3% of Canada's entire 2024 population growth came from immigration."),
      p("Arrive Finance is the financial OS we are building for him. A 7-step onboarding wizard that knows the rules generic finance apps can't retrofit: RRSP year-1 = $0, TFSA accumulates from tax residency not PR, FHSA dies on December 31. Ten-language plan. Specialist directory with a language filter. Built on Flinks — 80% owned by National Bank — so we ride regulated infrastructure, not screen scraping (which the new Consumer-Driven Banking Act legislates against, though that prohibition is not yet in force)."),
      p("Pre-seed and pre-revenue. Prototypes live at vivekally.github.io. Aman G offered $20/month unprompted on the first demo — verbal, not yet collected. We're targeting YC S2027 — and YC's own May 2025 RFS by Gustaf Alströmer is asking founders to build exactly this."),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "The 3-Minute Pitch — Story Arc", bold: true, font: "Arial" })] }),
      bullet("Open with Aman G. Real person, real loss. $14K TFSA untouched, $8K FHSA forfeited, $600 spent just to learn what to open."),
      bullet("Zoom out: he's 1 of 380,000 a year under the 2026-2028 Levels Plan, on top of 2.1M already here on study/work permits — and 97.3% of Canada's total population growth comes from this exact cohort. Immigration is THE growth story, not a side story."),
      bullet("The problem nobody else solves: generic apps assume you already know what a TFSA is. Banks sell their own products. Newcomers are stuck."),
      bullet("Our wedge: ground-up rules engine for newcomer edge cases (RRSP year-1=$0, FHSA Dec 31 deadline, tax-residency-based eligibility for students). Impossible to bolt onto Mint/YNAB/Wealthsimple."),
      bullet("Trust architecture: education not advice, human-in-the-loop CFP review, PIPEDA-compliant data residency, Flinks (NBC-owned) for aggregation."),
      bullet("Why now: Consumer-Driven Banking Act Royal Assent March 26, 2026. Screen scraping now illegal. AI cost curve makes $20/month viable. India is the dominant source country (47% of Express Entry ITAs)."),
      bullet("Traction: Aman G offered $20/month unprompted on the first demo — verbal commitment, not yet collected. 7-step wizard + landing + platform mockup all live. Targeting 10 paying users by Week 8, 1,000 users / $20K MRR / YC S2027 application by month 12."),
      bullet("Ask: try the prototype, connect us with newcomer communities, settlement agencies, and CFPs who speak Hindi or Mandarin."),

      // ─── 2. Anticipated Judge Q&A ───
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "2. Anticipated Judge Q&A", bold: true, font: "Arial" })] }),

      // Q1
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "Q1. Why won't the big banks just build this themselves?", bold: true, font: "Arial" })] }),
      p("They've tried. RBC's Newcomer Advantage, Scotiabank StartRight, TD Newcomer Banking — they exist. They're sales funnels for the bank's own products. Their AI tells you to open an RBC account because RBC built the AI."),
      p("Arrive Finance is unbiased — we charge users $20/month, not banks via commissions. The bank acquisition channel actually wants us. They pay $200–550 to acquire a newcomer today (RBC's $400 cash + Apple Watch bundle is documented). If we deliver an already-educated, ready-to-open customer for a $50–150 referral, that's a 70–80% CAC discount for them and a B2B revenue stream for us. We're not a threat to banks; we're a feeder."),

      // Q2
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "Q2. Is this just Wealthsimple for immigrants?", bold: true, font: "Arial" })] }),
      p("Wealthsimple onboards Canadians who already speak English and already know what a TFSA is. They have no newcomer-specific edge cases. Their wedge is wealth management — they monetize when you already have assets. Our wedge is access to that wealth management — we start from 'what's an SIN?' and we end at 'execute this rebalance.'"),
      p("The day a Wealthsimple user discovers their FHSA, they're already a Wealthsimple customer. The day an Arrive user discovers their FHSA, we route them to Wealthsimple, Questrade, or a Big Six broker — whoever's right for their situation. We sit upstream. Different wedge entirely."),

      // Q3
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "Q3. What stops a bank from acquiring you in Year 2?", bold: true, font: "Arial" })] }),
      p("That's the exit. Banks already pay $200–550 CAC per newcomer. We deliver pre-educated, ready-to-convert customers at $50–150 referral. We'd rather be the channel than the brand. If RBC offers $20–40M to acquire us in Year 3, that's the win. Pre-emptive acquisition by a Big Six bank is exactly the outcome that maximizes value for both sides."),

      // Q4
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "Q4. Why is this defensible?", bold: true, font: "Arial" })] }),
      bullet("Edge-case rules engine: RRSP year-1=$0, FHSA Dec 31, TFSA from tax residency, student tax-residency triggers. Generic finance apps would need to rebuild from scratch."),
      bullet("Multilingual UX done right: Devanagari, Gurmukhi, Arabic-script (RTL), Mandarin. Most products treat multilingual as an afterthought. We treat it as a first-class concern."),
      bullet("Specialist directory with language filter: a real CPA who speaks Hindi, a real CFP who speaks Mandarin. This is a 2-year relationship-building moat."),
      bullet("CASL-compliant WhatsApp loop for the December 14 FHSA deadline reminder. Compliance is a feature."),
      bullet("Trust + bank-acquisition channel: once we're embedded in settlement agencies and newcomer communities, the next entrant has to displace us in those exact channels."),

      // Q5
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "Q5. How do you make money if AI gives advice for free?", bold: true, font: "Arial" })] }),
      p("We're not 'AI giving advice for free.' We're 'personalized financial education with a human in the loop.' We're not licensed to give regulated advice in Canada — and we don't pretend to be. Our value is in education, structured guidance, surfacing the right account types, connecting users to licensed CFPs, and triggering compliant deadlines. We charge $20/month for that."),
      p("Free AI tools don't have the human-in-the-loop, don't have the regulatory framework to execute, and don't have a specialist directory of language-matched CFPs. We're the safe path. Three revenue streams: subscription ($20/mo Pro, $49/mo Premium), bank referral fees (Year 2+), specialist commissions on CFP bookings."),

      // Q6
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "Q6. What about regulation? You're handling money advice.", bold: true, font: "Arial" })] }),
      p("Three deliberate guardrails: (1) Everything is labeled 'personalized education,' not 'financial advice' — that's the legal threshold we don't cross. (2) Human-in-the-loop: AI drafts, licensed CFP reviews and signs off before execution. (3) Brokerage execution is deferred to Year 2 pending IIROC/CSA review — until then, we surface 'guided execution' where the user reviews and confirms in their own broker."),
      p("We've budgeted $600–1,000 for a fintech-lawyer scoping call before Stripe launch. PIPEDA: Turso SQLite in ca-central-1 Montreal, Flinks and SnapTrade tokens AES-256 encrypted at the app layer. CASL: double opt-in, STOP keyword unsubscribes immediately. The compliance posture is built in, not bolted on."),

      // Q7
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "Q7. Why are you the team to build this?", bold: true, font: "Arial" })] }),
      p("Built by a newcomer for newcomers. The founder lived the access problem. The first design partner (Aman G) is not a synthetic persona — he offered $20/month on the first demo, no prompting, no discount. Nothing has been collected yet, and we say so. That's still a strong signal that we understand the pain point because we've lived it."),
      p("On the technical side: prototypes are live, the design system is locked, the rules engine is being built next, Clerk + Turso + Stripe + Flinks is a stack we can execute. The deck and prototypes you're looking at were built in three weeks."),

      // Q8
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "Q8. What if immigration numbers drop?", bold: true, font: "Arial" })] }),
      p("The 2025-2027 plan: 395K → 380K → 365K. The 2026-2028 plan: 380K/year through 2028. Even at the lowest forecast, that's still ~365,000 newcomers per year — a TAM the size of Iceland's entire population, every year, every year, every year."),
      p("Cumulative addressable market: 1.1 million newcomers across the 3-year plan window. At our SAM penetration target (2.5% of GTA + Vancouver tech-forward newcomers), that's still a $36M ARR opportunity. Immigration normalization isn't a risk to the thesis — it's the new normal that makes the cohort planning predictable."),

      // Q9
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "Q9. The YC RFS for AI Personal Finance was from May 2025 — is it still relevant?", bold: true, font: "Arial" })] }),
      p("The RFS is archived (web.archive.org) but the validation stands. YC explicitly identified the category and the gap. The Summer 2026 RFS pivoted to AI-native services, hard tech, and agriculture — but YC continues to fund fintech in every batch. Eloquent AI (financial services AI), Fira (financial research) — these are 2026 YC companies. The 'AI for Personal Finance' thesis was YC-validated in 2025 and the market signal hasn't changed."),
      p("More importantly: the regulatory tailwind that made our specific bet timely (Consumer-Driven Banking Act Royal Assent March 26, 2026) didn't exist when YC published the RFS. We're more timely than the RFS was."),

      // Q10
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "Q10. Walk me through your unit economics one more time.", bold: true, font: "Arial" })] }),
      bullet("ARPU: $240/year (Pro at $20/mo) — the price Aman G volunteered before we named one."),
      bullet("CAC: ~$40 via newcomer community channels (Facebook groups, settlement agencies, referral)."),
      bullet("LTV:CAC: 6:1 conservative (2-year retention assumption)."),
      bullet("Payback: 2.4 months."),
      bullet("Gross margin: ~85% after Flinks aggregation cost, Stripe fees, AI inference."),
      bullet("Year 2 unlock: bank referral fees. A 100-customer/month bank pilot at $100/referral = $120K/year from one partner. Two partners covers a full year of infrastructure."),

      // ─── 3. Competitor Analysis Table ───
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "3. Competitor Analysis", bold: true, font: "Arial" })] }),
      p("Quick reference table for use in Q&A. The pattern is the same across all of them: every existing product is either US-centric, assumes Canadian financial literacy, or sells the user's data/eyeballs to a third party. None of them onboard a newcomer from 'I just landed' to 'my RRSP/TFSA/FHSA are open and contributing.'"),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: colWidths,
        rows: competitorRows
      }),

      new Paragraph({ spacing: { before: 240, after: 120 }, children: [new TextRun({ text: "The one-line summary:", bold: true, font: "Arial", size: 22 })] }),
      bullet("Mint, YNAB: budgeting — assume you already understand your accounts."),
      bullet("Wealthsimple, Questrade: investment execution — assume you already know what to open."),
      bullet("KOHO, Borrowell: payments and credit — don't touch registered accounts at all."),
      bullet("Big Six newcomer programs: biased — they sell their own products."),
      bullet("Wealthica: portfolio tracking — for people who already have portfolios."),
      bulletMulti([
        { text: "Arrive Finance: ", bold: true },
        { text: "the only product that starts at 'I just landed' and ends at 'my registered accounts are working for me.'" }
      ]),

      // ─── 4. Common Objections ───
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "4. Common Objections (and How to Defuse)", bold: true, font: "Arial" })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "\"Newcomers can just Google this.\"", bold: true, font: "Arial" })] }),
      p("They do — and 38% still don't understand the banking system, 51% still have limited investing knowledge, 76% still fear making a mistake. Google gives you 100 conflicting blog posts and an SEO-optimized RBC landing page. It doesn't give you a personalized plan that knows your immigration status, arrival date, and income."),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "\"Settlement agencies already do this.\"", bold: true, font: "Arial" })] }),
      p("Settlement agencies (ACCES Employment, COSTI, ISSofBC) help with jobs, language training, housing. They are not licensed to give financial guidance and they don't have the technical infrastructure to surface FHSA deadlines or TFSA room calculations. They are our distribution partners, not our competitors. We give them a tool to hand to every newcomer they serve."),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "\"$20/month is too expensive for newcomers.\"", bold: true, font: "Arial" })] }),
      p("Aman G offered $20/month on the first demo, no prompting. A single CFP session is $150. Avoiding ONE year of unused FHSA room saves $8,000. The ROI calculation does itself. We also have a Free tier (FHSA deadline tool, basic calculator) for trial/lead-gen — paid tier is for users who want the aggregation, alerts, and AI advisor."),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "\"AI hallucinations on tax advice will get you sued.\"", bold: true, font: "Arial" })] }),
      p("Education, not advice. Human-in-the-loop. Every recommendation has a licensed CFP signature before any money moves. We don't execute trades autonomously. The framing matters: 'Here's what a similar user did' is education. 'You should do this' is advice. We say the first, never the second."),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "\"Open banking will commoditize aggregation — Flinks is just plumbing.\"", bold: true, font: "Arial" })] }),
      p("Correct. Aggregation IS commoditized. That's why we're not building an aggregator. We're building the layer above it: rules engine, AI advisor, specialist directory, multilingual UX, CASL-compliant deadline alerts. Plumbing is replaceable; the workflow built on top of plumbing isn't."),

      // ─── 5. Demo Flow ───
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "5. Demo Flow — What to Show on Stage", bold: true, font: "Arial" })] }),

      p("Suggested live demo sequence (3–4 minutes if time-boxed):"),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "Step 1: Landing page (10 seconds)", bold: true, font: "Arial" })] }),
      bullet("Open vivekally.github.io. Show the amber FHSA countdown banner — \"X days until Dec 31.\""),
      bullet("Hover over the three persona cards — PR, International Student, Work Permit."),
      bullet("\"The student card highlights $14K of TFSA room that no other product surfaces.\""),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "Step 2: Onboarding wizard (90 seconds)", bold: true, font: "Arial" })] }),
      bullet("Click \"Get started.\" Switch the language toggle to हिंदी to show multi-script Devanagari rendering."),
      bullet("Walk through Steps 1-4: status (pick International Student to show the killer edge case), arrival date, income, savings."),
      bullet("On the results screen, point at the personalized plan: \"Notice it shows TFSA room from tax residency, not PR — that's the edge case competitors miss.\""),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "Step 3: Platform mockup (60 seconds)", bold: true, font: "Arial" })] }),
      bullet("Open the 9-panel platform mockup."),
      bullet("Show: Calculator panel (with RRSP year-1=$0 edge case), AI Advisor chat, Specialist Directory with language filter, Goals panel."),
      bullet("Mention: \"All My Money panel is Coming Soon — Flinks API approval is in progress.\""),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "Step 4: Close with Aman G's $20 offer (15 seconds)", bold: true, font: "Arial" })] }),
      bullet("\"This isn't theoretical. Our first design partner offered $20 a month on the first demo — no prompting, no discount. We haven't collected it yet, and we don't call it revenue.\""),
      bullet("\"Builder Sprint Challenge #3 is the Access Problem. We're building exactly that — for the cohort responsible for 97.3% of Canada's growth.\""),

      // ─── 6. Cheat Sheet ───
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "6. Cheat Sheet — Facts to Have Memorized", bold: true, font: "Arial" })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "Top-line market facts", bold: true, font: "Arial" })] }),
      bullet("483,640 permanent residents admitted to Canada in 2024 (IRCC)."),
      bullet("395,000 PRs planned for 2025; 380,000 for 2026 (IRCC 2025-2027 plan)."),
      bullet("97.3% of Canada's 2024 population growth came from immigration (Statistics Canada). Natural increase: just 19,738 more births than deaths all year."),
      bullet("$9.81 trillion Canadian financial advisory AUM in 2025 (Statista)."),
      bullet("India is the top source country — 47.2% of all Express Entry ITAs in 2023 went to Indian applicants."),
      bullet("Ontario + BC absorb 56% of newcomers."),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "Newcomer pain (TD/Edelman Feb 2025)", bold: true, font: "Arial" })] }),
      bullet("76% of newcomers fear making a financial mistake."),
      bullet("38% don't understand the Canadian banking system (vs. 25% of general population)."),
      bullet("55% have struggled to manage finances since arriving."),
      bullet("51% have limited investing knowledge."),
      bullet("41% don't understand the state of the Canadian economy."),
      bullet("Survey: 1,021 newcomers, conducted Jan 31 – Feb 10, 2025."),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "TFSA underutilization (CRA)", bold: true, font: "Arial" })] }),
      bullet("Canadians hold $524 billion in TFSAs (2021)."),
      bullet("Only 8.9% of TFSA holders max their contributions."),
      bullet("Average unused contribution room: $40,781 per holder."),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "Regulatory context", bold: true, font: "Arial" })] }),
      bullet("Consumer-Driven Banking Act (Bill C-15): Royal Assent March 26, 2026."),
      bullet("Big Six (RBC, TD, BMO, Scotiabank, CIBC, National Bank) legally required to expose customer data via API."),
      bullet("Screen scraping is now an offence under the Act."),
      bullet("~9 million Canadians currently use screen-scraping fintech apps — they must migrate to compliant aggregators."),
      bullet("Flinks is 80% owned by National Bank ($103M acquisition); 90+ fintechs already accredited through Flinks."),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "Account rules to nail", bold: true, font: "Arial" })] }),
      bullet("RRSP year-1 = $0 contribution room (based on prior-year earned income; no prior year = no room)."),
      bullet("TFSA accumulates from the day you become a Canadian tax resident (age 18+) — NOT from PR status."),
      bullet("FHSA: $8K/year, $40K lifetime. Room only accumulates AFTER you open the account. If you don't open by Dec 31 of an eligible year, that year's $8K is gone forever."),
      bullet("FHSA carry-forward is capped at $8K from prior years."),
      bullet("Newcomer FHSA eligibility = Canadian tax resident with SIN, age of majority, first-time homebuyer."),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "Bank acquisition channel", bold: true, font: "Arial" })] }),
      bullet("Banks pay $200–550 CAC per newcomer (industry estimate)."),
      bullet("RBC currently offers Apple Watch Series 11 + $400 to newcomers (offer ends June 1, 2026)."),
      bullet("Globe and Mail: \"A large majority of banks' new customers are immigrants.\""),
      bullet("Our referral fee target: $50–150 per converted newcomer — 70–80% bank CAC discount."),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "Unit economics", bold: true, font: "Arial" })] }),
      bullet("ARPU: $240/year (Pro)."),
      bullet("CAC: ~$40 via community channels."),
      bullet("LTV:CAC: 6:1."),
      bullet("Payback: 2.4 months."),
      bullet("First design partner: Aman G — $20/month offered unprompted on the first demo. Verbal, not yet collected."),

      // ─── 7. Sources ───
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "7. Primary Sources (for fact-check audit)", bold: true, font: "Arial" })] }),
      p("Every numeric claim in the deck traces back to one of these:"),
      pMulti([
        { text: "IRCC 2025 Annual Report to Parliament — ", bold: true },
        { text: "canada.ca/en/immigration-refugees-citizenship/.../annual-report-parliament-immigration-2025.html", link: "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/annual-report-parliament-immigration-2025.html" }
      ]),
      pMulti([
        { text: "Statistics Canada — Population estimates Q4 2024 (97.3% from immigration): ", bold: true },
        { text: "statcan.gc.ca/n1/daily-quotidien/250319/dq250319a-eng.htm", link: "https://www150.statcan.gc.ca/n1/daily-quotidien/250319/dq250319a-eng.htm" }
      ]),
      pMulti([
        { text: "TD Bank Newcomer Survey, Edelman Data & Intelligence, Feb 2025: ", bold: true },
        { text: "newswire.ca/news-releases/new-td-survey-reveals-76-of-newcomers-polled-fear-making-financial-mistakes-866609031.html", link: "https://www.newswire.ca/news-releases/new-td-survey-reveals-76-of-newcomers-polled-fear-making-financial-mistakes-866609031.html" }
      ]),
      pMulti([
        { text: "DLA Piper — Consumer-Driven Banking Act Explained: ", bold: true },
        { text: "dlapiper.com/en-pl/insights/publications/2026/04/the-new-consumer-driven-banking-act-explained", link: "https://www.dlapiper.com/en-pl/insights/publications/2026/04/the-new-consumer-driven-banking-act-explained" }
      ]),
      pMulti([
        { text: "Bill C-15 — Budget 2025 Implementation Act (Royal Assent Mar 26, 2026): ", bold: true },
        { text: "canada.ca/en/department-finance/programs/financial-sector-policy/open-banking-implementation/budget-2025-canadas-framework-for-consumer-driven-banking.html", link: "https://www.canada.ca/en/department-finance/programs/financial-sector-policy/open-banking-implementation/budget-2025-canadas-framework-for-consumer-driven-banking.html" }
      ]),
      pMulti([
        { text: "Statista — Canada Financial Advisory market ($9.81T AUM 2025): ", bold: true },
        { text: "statista.com/outlook/fmo/wealth-management/financial-advisory/canada", link: "https://www.statista.com/outlook/fmo/wealth-management/financial-advisory/canada" }
      ]),
      pMulti([
        { text: "Investment Executive — Canadians Underuse TFSA Growth Potential ($524B, 8.9% max): ", bold: true },
        { text: "investmentexecutive.com/industry-news/canadians-underuse-tfsas-growth-potential/", link: "https://www.investmentexecutive.com/industry-news/canadians-underuse-tfsas-growth-potential/" }
      ]),
      pMulti([
        { text: "Globe and Mail — Banks Competing for New Immigrants: ", bold: true },
        { text: "theglobeandmail.com/business/article-banks-competing-for-new-immigrants-as-a-key-source-of-business-growth/", link: "https://www.theglobeandmail.com/business/article-banks-competing-for-new-immigrants-as-a-key-source-of-business-growth/" }
      ]),
      pMulti([
        { text: "Fintech Futures — Flinks $103M National Bank Investment (80% ownership): ", bold: true },
        { text: "fintechfutures.com/bankingtech/flinks-receives-103m-investment-from-national-bank-of-canada", link: "https://www.fintechfutures.com/bankingtech/flinks-receives-103m-investment-from-national-bank-of-canada" }
      ]),
      pMulti([
        { text: "RBC Newcomer Apple Watch Offer (until Jun 1, 2026): ", bold: true },
        { text: "rbcroyalbank.com/bank-accounts/new-bank-accounts-offers-canada.html", link: "https://www.rbcroyalbank.com/bank-accounts/new-bank-accounts-offers-canada.html" }
      ]),
      pMulti([
        { text: "Top 20 Source Countries of New PRs to Canada 2024 (India 47.2% of ITAs): ", bold: true },
        { text: "immigration.ca/top-20-source-countries-of-new-permanent-residents-to-canada-in-2024/", link: "https://immigration.ca/top-20-source-countries-of-new-permanent-residents-to-canada-in-2024/" }
      ]),
      pMulti([
        { text: "YC RFS — AI for Personal Finance, May 2025 (archived): ", bold: true },
        { text: "web.archive.org/web/20250515072444/https://www.ycombinator.com/rfs#ai-personal-finance", link: "https://web.archive.org/web/20250515072444/https://www.ycombinator.com/rfs#ai-personal-finance" }
      ]),
      pMulti([
        { text: "CASL ($10M maximum penalty for businesses): ", bold: true },
        { text: "crtc.gc.ca/eng/com500/faq500.htm", link: "https://crtc.gc.ca/eng/com500/faq500.htm" }
      ]),

      // Footer note
      new Paragraph({
        spacing: { before: 480 },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "—  END  —", color: "9CA3AF", size: 20, font: "Arial" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Arrive Finance · vivek@brainally.io · github.com/vivekally/AI-Personal-Finance-Advisor", color: "6B7280", italics: true, size: 18, font: "Arial" })]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("Arrive_Finance_Demo_Prep.docx", buffer);
  console.log("✓ Saved: Arrive_Finance_Demo_Prep.docx");
});
