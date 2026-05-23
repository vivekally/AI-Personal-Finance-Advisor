import puppeteer from "puppeteer";
import PptxGenJS from "pptxgenjs";
import fs from "fs";
import path from "path";

const TOTAL_SLIDES = 10;
const DECK_URL = "http://localhost:4321/designs/hackathon-deck.html";
const TMP_DIR = "/tmp/arrive-slides";
const OUTPUT = path.resolve(__dirname, "../arrive-finance-hackathon.pptx");

async function main() {
  fs.mkdirSync(TMP_DIR, { recursive: true });

  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });

  console.log("Loading deck...");
  await page.goto(DECK_URL, { waitUntil: "networkidle2" });
  // Wait for fonts
  await new Promise((r) => setTimeout(r, 2000));

  const screenshots: string[] = [];

  for (let i = 0; i < TOTAL_SLIDES; i++) {
    console.log(`Capturing slide ${i + 1}/${TOTAL_SLIDES}...`);
    await page.evaluate((n: number) => {
      (window as any).goTo(n);
    }, i);
    // Wait for slide transition
    await new Promise((r) => setTimeout(r, 700));

    const imgPath = path.join(TMP_DIR, `slide-${String(i + 1).padStart(2, "0")}.png`);
    await page.screenshot({ path: imgPath as `${string}.png`, clip: { x: 0, y: 0, width: 1280, height: 800 } });
    screenshots.push(imgPath);
  }

  await browser.close();
  console.log("All slides captured. Building PPTX...");

  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE"; // 13.33" x 7.5"

  for (let i = 0; i < screenshots.length; i++) {
    const slide = pptx.addSlide();
    slide.addImage({
      path: screenshots[i],
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
    });
  }

  await pptx.writeFile({ fileName: OUTPUT });
  console.log(`\nDone! Saved to: ${OUTPUT}`);

  // Cleanup tmp
  fs.rmSync(TMP_DIR, { recursive: true, force: true });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
