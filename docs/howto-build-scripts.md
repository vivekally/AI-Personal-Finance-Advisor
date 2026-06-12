# How to run the build scripts

Three build scripts convert HTML prototypes into distributable formats: PPTX, MP4, and DOCX. Each requires a local server running on port 4321.

## Prerequisites

- Node.js 18+ or Bun
- A local HTTP server running on port 4321 (see [Getting started](tutorial-getting-started.md))
- Chrome/Chromium installed (Puppeteer downloads its own, but system Chrome works too)

## How to generate the hackathon PPTX

Converts the 10-slide HTML hackathon deck into a PowerPoint file by screenshotting each slide via Puppeteer and assembling them with pptxgenjs.

1. Start the local server:

   ```bash
   python3 -m http.server 4321
   ```

2. Install dependencies and run the script:

   ```bash
   cd scripts
   bun install
   bun run make-pptx.ts
   ```

3. The output is saved to `arrive-finance-hackathon.pptx` in the project root.

**How it works:** Puppeteer opens `http://localhost:4321/designs/hackathon-deck.html`, calls `window.goTo(n)` for each of the 10 slides, takes a 2x retina screenshot of each, and pptxgenjs assembles them into a PPTX with full-bleed slide images.

### Troubleshooting

- **Blank slides**: Fonts may not have loaded. The script waits 2 seconds after page load, but slow connections may need more. Increase the timeout on line 25 of `make-pptx.ts`.
- **Puppeteer can't find Chrome**: Run `npx puppeteer browsers install chrome` to install Puppeteer's bundled Chromium.

## How to generate the demo video

Converts a multi-scene walkthrough of the prototypes into an MP4 video using Puppeteer screenshots stitched together with ffmpeg.

1. Start the local server on port 4321 (same as above).

2. Install dependencies and run:

   ```bash
   cd scripts
   bun install
   bun run make-demo-video.ts
   ```

3. The output is saved to `arrive-finance-demo.mp4` in the project root.

**How it works:** The script navigates through multiple prototypes in sequence (hackathon deck, landing page, onboarding wizard, platform mockup), captures individual frames at 30 FPS using Puppeteer screenshots, and ffmpeg encodes them into an H.264 MP4. Scenes include automated interactions (clicking wizard steps, navigating platform panels).

**Runtime:** 5-10 minutes depending on your machine. The script generates thousands of individual PNG frames in `/tmp/arrive-demo-frames/`.

### Troubleshooting

- **ffmpeg not found**: The script uses `@ffmpeg-installer/ffmpeg` which bundles a platform-specific binary. If it fails, install ffmpeg separately: `brew install ffmpeg` (macOS).
- **Out of disk space**: Frame images accumulate in `/tmp/arrive-demo-frames/`. Delete them after the video is generated.

## How to generate the demo prep QA document

Generates a Word document (DOCX) containing a structured QA checklist and demo preparation guide.

1. Install dependencies:

   ```bash
   cd "Arrive Finance - Demo Prep"
   npm install   # or: bun install
   ```

2. Run the generator:

   ```bash
   node build-qa-doc.js
   ```

3. The output is saved to `Arrive_Finance_Demo_Prep.docx` in the same directory.

**How it works:** Uses the `docx` npm package to programmatically build a Word document with formatted sections, tables, bullet lists, and hyperlinks. The document covers demo flow, QA checkpoints, and talking points.

## Related

- [Prototype reference](reference-prototypes.md) — what each HTML prototype contains
- [Getting started](tutorial-getting-started.md) — set up the local server
