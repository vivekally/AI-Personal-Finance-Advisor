# Design System — Arrive Finance

## Product Context
- **What this is:** A web-first onboarding wizard that takes a newcomer immigrant from "I have savings and no idea what to do" to a personalized RRSP/TFSA/FHSA plan — the same guidance a $400/hr advisor would give, for $20/month.
- **Who it's for:** Immigrants to Canada in their first 1–3 years. Employed, $50k–$200k in savings, unfamiliar with the Canadian financial system, high anxiety about making irreversible mistakes. Often non-native English speakers (primary: Hindi, Punjabi, Mandarin, Tagalog).
- **Space/industry:** Personal finance / fintech / newcomer settlement
- **Project type:** Web app — multi-step onboarding wizard + plan output screen
- **Memorable thing:** "This is the trusted advisor I couldn't afford."

## Aesthetic Direction
- **Direction:** Professional-Warm — not minimal (too cold for an anxious user), not expressive (too noisy). The visual equivalent of a trusted family accountant who's also excellent at explaining things simply.
- **Decoration level:** Intentional — color and typography do all the work. No decorative elements, blobs, waves, or gradients.
- **Mood:** Calm authority. The product should feel unhurried and knowledgeable. Every screen should say "I've seen this situation before and I know exactly what to do."
- **Research:** Monarch Money (generic SaaS orange), YNAB (high-energy American mass-market), Arrive.com (dark corporate purple). All designed for financially-confident users. Arrive Finance targets users who aren't fluent in Canadian finance yet — the design language of "confident fintech" is the wrong signal.
- **EUREKA:** Every personal finance product assumes financial literacy. Our users are asking "what even is a TFSA?" — in their second language, with $100k on the line. The design should feel like a knowledgeable friend, not a robo-advisor.

## Typography
- **Display/Hero:** Fraunces — variable serif with optical sizing. Gives authority and warmth no sans-serif achieves. Headings and plan output titles set in Fraunces feel like a trusted professional's letterhead. Zero fintech competitors use a serif as primary display — this is intentional differentiation.
- **Body:** Plus Jakarta Sans — warm, highly readable, excellent Latin + extended script coverage for multilingual users. 400 (regular) for body, 500 (medium) for labels, 600 (semibold) for emphasis, 700 (bold) for CTAs.
- **Numbers/Data:** Geist Mono with `font-variant-numeric: tabular-nums` — contribution room amounts and dollar figures align and breathe correctly. Never use proportional numbers for financial data.
- **Code:** Geist Mono
- **Loading:** Google Fonts — `https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap`
- **Scale:**
  - `--text-xs`:   12px / 1.5
  - `--text-sm`:   13px / 1.5
  - `--text-base`: 15px / 1.6
  - `--text-lg`:   17px / 1.5
  - `--text-xl`:   20px / 1.4
  - `--text-2xl`:  24px / 1.3
  - `--text-3xl`:  30px / 1.2
  - `--text-4xl`:  36px / 1.15 (Fraunces)
  - `--text-5xl`:  48px / 1.1  (Fraunces, landing hero)

## Internationalisation — Hindi/Devanagari Typography

Hindi is the primary non-English locale for Arrive Finance. Fraunces and Plus Jakarta Sans cover Latin script only and must not be used to render Devanagari text.

- **Devanagari body font:** Noto Sans Devanagari — designed by Google specifically to pair with Latin fonts at the same optical weight. Free via Google Fonts.
- **Devanagari weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold) — mirrors Plus Jakarta Sans weights exactly so shared CSS weight variables work across both locales.
- **Substitution rule:** When the active locale is `hi` (Hindi), `font-family` stacks must place `'Noto Sans Devanagari'` before `'Plus Jakarta Sans'` so Devanagari glyphs are served by the correct face:
  ```css
  /* Hindi locale override — applied via [lang="hi"] or .locale-hi */
  font-family: 'Noto Sans Devanagari', 'Plus Jakarta Sans', sans-serif;
  ```
- **Headings in Hindi:** Fraunces is Latin-only and renders Devanagari as fallback tofu. For Hindi headings, use Noto Sans Devanagari at a heavier weight and larger size to preserve visual hierarchy (e.g., `font-weight: 700`, bump size one step up the scale):
  ```css
  [lang="hi"] h1, [lang="hi"] h2, [lang="hi"] h3 {
    font-family: 'Noto Sans Devanagari', sans-serif;
    font-weight: 700;
  }
  ```
- **Financial figures:** Geist Mono is Latin/ASCII only. Dollar amounts and numerals are identical in Hindi UI (Indian numerals are not used); Geist Mono remains correct for all financial data regardless of locale.
- **Do not mix:** Never set a Devanagari string inside a Fraunces element. The browser fallback chain will render it, but at mismatched weight/metrics that breaks line-height and visual rhythm.

## Color
- **Approach:** Restrained — green is the only color that "speaks." Amber is reserved exclusively for urgency. Everything else is neutral.

```css
:root {
  /* Backgrounds */
  --color-bg:        #FAFAF8; /* warm off-white — not stark; warmth signals human environment */
  --color-surface:   #FFFFFF; /* cards, modals, inputs */
  --color-surface-2: #F3F4F6; /* subtle section backgrounds */

  /* Primary — Forest Green */
  --color-primary:       #15803D;
  --color-primary-dark:  #14532D; /* hover, active states */
  --color-primary-light: #DCFCE7; /* light green tint for selected states */
  --color-primary-50:    #F0FDF4; /* very light green tint for banners */

  /* Text */
  --color-text:         #111827; /* warm near-black */
  --color-text-muted:   #6B7280;
  --color-text-faint:   #9CA3AF;
  --color-text-inverse: #FFFFFF;

  /* Borders */
  --color-border:       #E5E7EB;
  --color-border-focus: #15803D;

  /* Semantic — Amber (URGENCY ONLY — FHSA deadlines, RRSP warnings) */
  --color-amber:    #D97706;
  --color-amber-bg: #FFFBEB;
  --color-amber-border: #FDE68A;

  /* Semantic — Standard */
  --color-success: #059669;
  --color-success-bg: #F0FDF4;
  --color-warning: #D97706; /* same as amber — one signal */
  --color-error:   #DC2626;
  --color-error-bg: #FEF2F2;
  --color-info:    #2563EB;
  --color-info-bg: #EFF6FF;
}
```

- **Dark mode:** Reduce green saturation 15% (`#16A34A` base), warm near-black surface (`#111211`), keep amber unchanged — it's still urgency.
- **Amber discipline:** Amber appears ONLY for time-sensitive financial deadlines (FHSA room expiry, RRSP deadline). Never use amber for generic warnings or UI states. When the user sees amber, it means "act now or lose money." This signal is ruined if amber is used casually.

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable — not cramped (induces stress in anxious users), not luxurious (wastes mobile real estate)

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
}
```

## Layout
- **Approach:** Grid-disciplined — wizard needs predictability. Anxious users need to always know where they are and what comes next. No asymmetric surprises.
- **Grid:** Single-column wizard (max-width 520px centered); marketing pages 12-column at 1280px.
- **Max content width:** 520px (wizard), 1100px (plan output + rails), 1280px (marketing)
- **Border radius:**
  - `--radius-sm`: 8px  (inputs, small elements)
  - `--radius-md`: 12px (cards, panels)
  - `--radius-lg`: 20px (main card container)
  - `--radius-full`: 9999px (badges, pills, progress bars)
- **Shadow:**
  - `--shadow-sm`: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.05)
  - `--shadow-md`: 0 4px 16px rgba(0,0,0,.10)
  - `--shadow-lg`: 0 8px 32px rgba(0,0,0,.12)

## Motion
- **Approach:** Minimal-functional — only transitions that aid comprehension. No animations that delay anxious users. No entrance animations on wizard steps (latency = stress).
- **Easing:** `ease-out` for enter, `ease-in` for exit, `ease-in-out` for move/reorder
- **Duration:**
  - Micro (state changes, focus rings): 100–150ms
  - Short (button hover, input focus): 150ms
  - Medium (screen transitions, plan reveal): 250ms
  - Long (loading states): use spinner + skeleton, not animation duration
- **Never:** CSS keyframe animations on wizard question text. Never delay the user from seeing their current step.

## Component Conventions

### Wizard progress bar
- Text: "Step X of 7" left, category label right (e.g., "Building your profile")
- Track: `--color-border` background, `--color-primary` fill
- Height: 4px
- Transition: `width 0.4s ease` — the one place medium duration is used

### Plan output
- Headings in Fraunces (not Plus Jakarta Sans) — this is where the "advisor letterhead" feeling matters most
- Dollar amounts: Geist Mono, tabular-nums, `--color-primary`
- Deadlines: amber badge with ⚠️ icon — NEVER use amber badges for non-urgent items
- Tax savings callout: green background (`--color-success-bg`), green border

### Form inputs
- Height: 48px
- Focus: `--color-border-focus` border + 3px green shadow ring (`rgba(21,128,61,.12)`)
- Error: `--color-error` border + `--color-error-bg` background
- Never use red placeholder text — too alarming for anxious users

### Buttons
- Primary: `--color-primary` bg, white text, 50px height, `--radius-sm`
- Hover: `--color-primary-dark`
- Secondary: transparent bg, `--color-border` border, gray text
- Link: no bg, `--color-primary` text, no underline (underline = clicked state)
- Never: gradient buttons, shadow on primary button, border-radius > 12px on buttons

### Escalation rail
- Framing: "You have a few unique factors — a short call with a specialist will make sure you don't miss anything." NEVER "Your situation is complex."
- Card style: `--color-surface`, `--radius-md`, `--shadow-md`, `--color-border` border

### Notification/reminder banners
- Amber: FHSA room expiry only
- Green: Confirmed/success states
- Blue: Informational (regulatory disclaimer, account type explanation)
- Gray: Neutral context (e.g., "RRSP room accumulates from Canadian income")

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-21 | Forest green primary (not blue) | Entire Canadian fintech is blue (RBC, TD, Wealthsimple). Green = growth + safety without any competitor's shadow. |
| 2026-05-21 | Fraunces serif for display/headings | Zero fintech competitors use serif as primary display. Creates "advisor letterhead" authority. The memorable thing is "the advisor I couldn't afford" — that needs a serif. |
| 2026-05-21 | Amber reserved for urgency only | FHSA deadline, RRSP warning. When amber appears it means "act now or lose money." Ruined if used casually. |
| 2026-05-21 | Plus Jakarta Sans for body | Warm, multilingual-friendly, excellent readability for non-native English readers. |
| 2026-05-21 | Warm off-white (#FAFAF8) background | Not stark white — warmth signals human environment, not software. |
| 2026-05-21 | Minimal-functional motion only | Target user is anxious. Animations that delay are stress-inducing, not delightful. |
| 2026-05-21 | Geist Mono for financial figures | Tabular-nums ensures dollar amounts align correctly in plan output. |
| 2026-05-21 | Noto Sans Devanagari for Hindi locale | Fraunces and Plus Jakarta Sans are Latin-only. Hindi is the primary non-English locale (v1 scope). Noto Sans Devanagari is designed to pair with Latin fonts at matching optical weight; Fraunces must not be used for Hindi headings. |
