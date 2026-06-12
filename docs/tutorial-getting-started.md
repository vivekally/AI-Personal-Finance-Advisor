# Getting started with Arrive Finance

This tutorial walks you through setting up the project locally, running the HTML prototypes, and understanding the project structure. By the end, you'll have the landing page, onboarding wizard, and full platform mockup running in your browser.

## What you'll need

- A modern web browser (Chrome, Firefox, Safari)
- A local HTTP server. Any of these work:
  - Python 3: `python3 -m http.server`
  - Node.js: `npx serve`
  - Bun: `bunx serve`
  - VS Code Live Server extension
- Git
- Node.js 18+ or Bun (for build scripts only)

## Step 1: Clone the repository

```bash
git clone https://github.com/vivekally/AI-Personal-Finance-Advisor.git
cd AI-Personal-Finance-Advisor
```

You should see this structure:

```
README.md           Product overview
PRD.md              Product requirements (14 sections)
DESIGN.md           Design system (typography, color, spacing)
Deep_Research.md    Market research + competitive analysis
STATUS.md           Current project status
index.html          Hub page linking to all prototypes
designs/            9 HTML prototype files
scripts/            Build tools (PPTX, demo video)
docs/               Developer documentation (you are here)
```

## Step 2: Start a local server

From the project root:

```bash
# Using Python
python3 -m http.server 4321

# Or using Node.js
npx serve -p 4321

# Or using Bun
bunx serve -p 4321
```

Open `http://localhost:4321` in your browser. You'll see the hub page with cards linking to every prototype and document.

## Step 3: Explore the prototypes

Click through the hub page. The key prototypes are:

1. **Landing page** (`designs/landing.html`) — the arrive.finance marketing site. Note the amber FHSA urgency banner with a live countdown to December 31.

2. **Onboarding wizard** (`designs/onboarding.html`) — a 7-step wizard with a full JavaScript state machine. Try the student scenario: select "International Student" in step 2, set an arrival date more than 183 days ago, and watch the TFSA/FHSA eligibility insight appear.

3. **Platform mockup** (`designs/platform-mockup.html`) — the full 9-panel authenticated app. Click the sidebar icons to navigate between panels (Calculator, Credit Education, Advisor Directory, All My Money, Goals, Best Practices, AI Advisor, Specialist, Execute).

## Step 4: Read the product docs

The project has extensive product documentation. Read in this order:

1. `README.md` — start here for the full picture: problem, market, status, business model, roadmap
2. `DESIGN.md` — design system rules (typography, color, spacing, i18n)
3. `PRD.md` — detailed feature requirements per build phase
4. `Deep_Research.md` — market research, competitive landscape, regulatory context

## What you have now

You have the full Arrive Finance prototype suite running locally:

- A marketing landing page with FHSA urgency hooks
- A 7-step onboarding wizard that calculates personalized RRSP/TFSA/FHSA plans
- A 9-panel platform mockup showing the authenticated experience
- Hackathon and investor presentation decks
- Three design variants (A, B, C) showing the exploration that led to the chosen "Clean Authority" direction

**Next steps:**

- See [How to run the build scripts](howto-build-scripts.md) to generate PPTX and demo videos
- See [Architecture reference](reference-architecture.md) for the planned Next.js + Supabase stack
- See [Prototype reference](reference-prototypes.md) for a complete map of every prototype and its features
