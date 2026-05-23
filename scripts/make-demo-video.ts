import puppeteer, { type Browser, type Page } from "puppeteer";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import fs from "fs";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const BASE_URL = "http://localhost:4321";
const TMP_DIR = "/tmp/arrive-demo-frames";
const OUTPUT = path.resolve(__dirname, "../arrive-finance-demo.mp4");
const W = 1280;
const H = 800;
const FPS = 30;

let frameIndex = 0;

async function frame(page: Page, durationSec: number) {
  const totalFrames = Math.round(durationSec * FPS);
  for (let i = 0; i < totalFrames; i++) {
    const p = path.join(TMP_DIR, `frame-${String(frameIndex).padStart(5, "0")}.png`);
    await page.screenshot({ path: p as `${string}.png`, clip: { x: 0, y: 0, width: W, height: H } });
    frameIndex++;
  }
}

async function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function captureFrames(browser: Browser) {
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

  // ── SCENE 1: Hackathon deck — cover + problem slides (0:00–0:18) ──
  console.log("Scene 1: Hackathon deck intro...");
  await page.goto(`${BASE_URL}/designs/hackathon-deck.html`, { waitUntil: "networkidle2" });
  await wait(1500); // fonts load
  await frame(page, 7); // slide 1 cover

  await page.evaluate(() => (window as any).goTo(1));
  await wait(700);
  await frame(page, 5); // slide 2 — the access problem

  await page.evaluate(() => (window as any).goTo(2));
  await wait(700);
  await frame(page, 8); // slide 3 — meet Shweta

  await page.evaluate(() => (window as any).goTo(3));
  await wait(700);
  await frame(page, 5); // slide 4 — the solution

  // ── SCENE 2: Landing page walkthrough (0:21–0:46) ──
  console.log("Scene 2: Landing page...");
  await page.goto(`${BASE_URL}/designs/landing.html`, { waitUntil: "networkidle2" });
  await wait(1200);
  await frame(page, 5); // hero section

  // Scroll to personas
  await page.evaluate(() => window.scrollBy({ top: 600, behavior: "smooth" }));
  await wait(800);
  await frame(page, 4);

  // Scroll to pricing
  await page.evaluate(() => window.scrollBy({ top: 700, behavior: "smooth" }));
  await wait(800);
  await frame(page, 4);

  // Scroll to Shweta testimonial
  await page.evaluate(() => window.scrollBy({ top: 700, behavior: "smooth" }));
  await wait(800);
  await frame(page, 4);

  // ── SCENE 3: Onboarding wizard (0:46–1:26) ──
  console.log("Scene 3: Onboarding wizard...");
  await page.goto(`${BASE_URL}/designs/onboarding.html`, { waitUntil: "networkidle2" });
  await wait(1200);
  await frame(page, 4); // step 1 — language selector

  await page.evaluate(() => (window as any).next(0));
  await wait(500);
  await frame(page, 3.5); // step 2 — immigration status

  await page.evaluate(() => (window as any).next(1));
  await wait(500);
  await frame(page, 3.5); // step 3 — arrival date

  await page.evaluate(() => (window as any).next(2));
  await wait(500);
  await frame(page, 3.5); // step 4 — income

  await page.evaluate(() => (window as any).next(3));
  await wait(500);
  await frame(page, 3.5); // step 5 — savings

  await page.evaluate(() => (window as any).next(4));
  await wait(500);
  await frame(page, 3.5); // step 6 — goals

  await page.evaluate(() => (window as any).next(5));
  await wait(1000);
  await frame(page, 8); // results — personalized plan

  // ── SCENE 4: Platform mockup (1:26–1:52) ──
  console.log("Scene 4: Platform mockup...");
  await page.goto(`${BASE_URL}/designs/platform-mockup.html`, { waitUntil: "networkidle2" });
  await wait(1200);
  await frame(page, 5); // calculator panel

  const sidItems = await page.$$(".sid-item");
  for (const item of sidItems) {
    const text = await item.evaluate((el) => el.textContent);
    if (text?.includes("AI Advisor") || text?.includes("Arrive")) {
      await item.click();
      break;
    }
  }
  await wait(600);
  await frame(page, 5); // AI advisor panel

  for (const item of sidItems) {
    const text = await item.evaluate((el) => el.textContent);
    if (text?.includes("Goal")) {
      await item.click();
      break;
    }
  }
  await wait(600);
  await frame(page, 4); // goals panel

  for (const item of sidItems) {
    const text = await item.evaluate((el) => el.textContent);
    if (text?.includes("Credit")) {
      await item.click();
      break;
    }
  }
  await wait(600);
  await frame(page, 4); // credit panel

  // ── SCENE 5: Closing (1:52–2:05) ──
  console.log("Scene 5: Closing...");
  await page.goto(`${BASE_URL}/designs/hackathon-deck.html`, { waitUntil: "networkidle2" });
  await wait(800);
  await page.evaluate(() => (window as any).goTo(4));
  await wait(700);
  await frame(page, 4); // YC RFS slide

  await page.evaluate(() => (window as any).goTo(9));
  await wait(700);
  await frame(page, 8); // The Ask — final

  await page.close();
  console.log(`Total frames captured: ${frameIndex}`);
}

async function buildVideo() {
  console.log("\nBuilding video with ffmpeg...");

  await new Promise<void>((resolve, reject) => {
    ffmpeg()
      .input(path.join(TMP_DIR, "frame-%05d.png"))
      .inputOptions([`-framerate ${FPS}`])
      .videoCodec("libx264")
      .outputOptions([
        "-pix_fmt yuv420p",
        "-crf 18",
        "-preset slow",
        `-vf scale=${W}:${H}`,
      ])
      .output(OUTPUT)
      .on("progress", (p) => {
        if (p.percent) process.stdout.write(`\rEncoding: ${Math.round(p.percent)}%   `);
      })
      .on("end", () => {
        console.log("\nEncoding complete.");
        resolve();
      })
      .on("error", reject)
      .run();
  });
}

async function main() {
  fs.mkdirSync(TMP_DIR, { recursive: true });
  // Clean previous frames
  fs.readdirSync(TMP_DIR).forEach((f) => fs.unlinkSync(path.join(TMP_DIR, f)));

  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--font-render-hinting=none"],
  });

  try {
    await captureFrames(browser);
  } finally {
    await browser.close();
  }

  await buildVideo();

  const stat = fs.statSync(OUTPUT);
  console.log(`\n✓ Demo video saved: ${OUTPUT}`);
  console.log(`  Size: ${(stat.size / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  Duration: ~${Math.round(frameIndex / FPS)}s`);

  fs.rmSync(TMP_DIR, { recursive: true, force: true });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
