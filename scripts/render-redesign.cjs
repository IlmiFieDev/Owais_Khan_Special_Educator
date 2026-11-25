const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const origin = process.env.HOMEPAGE_URL || "http://127.0.0.1:3000";
const outputDirectory = path.resolve(__dirname, "..", "docs", "screenshots", "refinement");
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const viewports = [360, 390, 768, 1024, 1366, 1440].map((width) => ({ width, height: width < 600 ? 900 : width < 1100 ? 900 : 1000 }));
const failures = [];

function check(condition, message) { if (!condition) failures.push(message); }

async function main() {
  fs.mkdirSync(outputDirectory, { recursive: true });
  const browser = await chromium.launch({ headless: true, ...(fs.existsSync(chromePath) ? { executablePath: chromePath } : {}) });
  try {
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
      const response = await page.goto(origin, { waitUntil: "load", timeout: 90000 });
      check(response?.ok(), `${viewport.width}px: homepage HTTP ${response?.status()}`);
      await page.locator("#hero-heading").waitFor();
      await page.evaluate(() => document.fonts.ready);
      check(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${viewport.width}px: horizontal overflow`);
      check(await page.locator("#expertise .expertise-card").count() === 5, `${viewport.width}px: expertise count`);
      check(await page.locator("#approach .approach-steps button").count() === 5, `${viewport.width}px: approach count`);

      await page.locator("#expertise .expertise-card").nth(1).click();
      check((await page.locator("#expertise-detail h3").innerText()).includes("Down Syndrome"), `${viewport.width}px: expertise interaction`);
      await page.locator("#approach .approach-steps button").nth(2).click();
      check((await page.locator("#approach-detail").innerText()).length > 30, `${viewport.width}px: approach interaction`);
      await page.getByRole("button", { name: /View full career journey/ }).click();
      check(await page.getByText("Tamana Special School", { exact: true }).isVisible(), `${viewport.width}px: career disclosure`);
      await page.locator(".faq summary").first().click();
      check(await page.locator(".faq").first().getAttribute("open") !== null, `${viewport.width}px: FAQ interaction`);

      if (viewport.width <= 960) {
        await page.getByRole("button", { name: "Open menu" }).click();
        check(await page.locator("#mobile-menu").isVisible(), `${viewport.width}px: mobile menu open`);
        await page.keyboard.press("Escape");
        check(!await page.locator("#mobile-menu").isVisible(), `${viewport.width}px: mobile menu Escape`);
      }

      await page.getByRole("button", { name: "Open accessibility panel" }).click();
      check(await page.getByRole("dialog", { name: "Accessibility Options" }).isVisible(), `${viewport.width}px: accessibility panel`);
      await page.keyboard.press("Escape");
      await page.reload({ waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: path.join(outputDirectory, `homepage-${viewport.width}.png`), fullPage: true });
      check(errors.length === 0, `${viewport.width}px: runtime errors ${JSON.stringify(errors)}`);
      await page.close();
    }
  } finally { await browser.close(); }

  const report = { origin, viewports, failures };
  fs.writeFileSync(path.join(outputDirectory, "browser-report.json"), JSON.stringify(report, null, 2));
  if (failures.length) throw new Error(failures.join("\n"));
  console.log(`PASS: ${viewports.length} responsive widths, core interactions, accessibility dialog, overflow, and screenshots.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
