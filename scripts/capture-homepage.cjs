const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const origin = process.env.HOMEPAGE_URL || "http://127.0.0.1:3002/";
const outputDirectory = path.resolve(__dirname, "..", "docs", "screenshots");
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const viewports = [
  { width: 360, height: 900 },
  { width: 768, height: 1024 },
  { width: 1440, height: 1000 },
];
const modes = ["normal", "no-js", "reduced-motion", "calm", "animations-disabled"];
const sectionIds = ["hero", "counters", "journey", "approach", "specialisations", "skills", "credentials", "parents", "feedback", "contact"];
const expectedLinks = ["Journey", "Approach", "For Parents", "Feedback", "Contact"];
const diagnostics = [];
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

async function readStyles(page, width) {
  return page.evaluate((width) => {
    const selectors = {
      headline: "#hero-heading",
      words: "#hero-heading",
      subtext: "#hero-heading + p",
      primaryButton: '#hero a[href="#contact"]',
      secondaryButton: '#hero a[href="#journey"]',
      portrait: "[data-hero-portrait]",
      counters: "[data-counter-value]",
      approach: width >= 768 ? "#approach [role=tabpanel]" : "#approach .md\\:hidden button",
      specialisations: "#specialisations h3",
      skills: "#skills h3",
      credentials: "#credentials .credential-card",
      sectionHeadings: "main section h2",
    };
    return Object.fromEntries(Object.entries(selectors).map(([name, selector]) => [
      name,
      [...document.querySelectorAll(selector)].map((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        let effectiveOpacity = 1;
        let ancestorsVisible = true;
        for (let node = element; node; node = node.parentElement) {
          const ancestor = getComputedStyle(node);
          effectiveOpacity *= Number(ancestor.opacity);
          if (ancestor.display === "none" || ancestor.visibility === "hidden") ancestorsVisible = false;
        }
        return {
          text: element.textContent.trim().slice(0, 100),
          opacity: style.opacity, effectiveOpacity, ancestorsVisible,
          transform: style.transform, visibility: style.visibility,
          display: style.display, zIndex: style.zIndex,
          height: rect.height, width: rect.width, top: rect.top, left: rect.left,
        };
      }),
    ]));
  }, width);
}

function checkStyles(styles, label) {
  for (const [name, elements] of Object.entries(styles)) {
    check(elements.length > 0, label + ": missing " + name);
    for (const element of elements) {
      check(element.effectiveOpacity >= 0.99 && element.ancestorsVisible && element.height > 0 && element.width > 0,
        label + ": hidden " + name + " (" + element.text + ")");
    }
  }
}

async function interactions(page, width, label) {
  if (width < 1280) {
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    check(await page.locator("#mobile-menu").isVisible(), label + ": drawer did not open");
    const links = await page.locator("#mobile-menu > div:first-child a").allTextContents();
    check(JSON.stringify(links) === JSON.stringify(expectedLinks), label + ": wrong drawer links");
    await page.locator('#mobile-menu a[href="#journey"]').click();
    await page.locator("#mobile-menu").waitFor({ state: "hidden" });
  }
  if (width >= 768) {
    const tab = page.getByRole("tab").first();
    await tab.focus();
    await tab.press("ArrowRight");
    check(await page.getByRole("tab").nth(1).getAttribute("aria-selected") === "true", label + ": approach keyboard navigation");
    check(await page.getByRole("tabpanel").getAttribute("aria-labelledby") === "approach-tab-1", label + ": approach panel association");
  } else {
    await page.locator("#approach button[aria-expanded]").nth(1).click();
    check(await page.locator("#approach button[aria-expanded]").nth(1).getAttribute("aria-expanded") === "true", label + ": approach accordion");
  }
  const card = page.locator('#specialisations [role="button"]').first();
  await card.focus();
  await card.press("Enter");
  check(await card.getAttribute("aria-expanded") === "true", label + ": disability card keyboard toggle");
  await card.press("Enter");
  const skill = page.locator('#skills [role="button"]').first();
  await skill.focus();
  await skill.press("Space");
  check(await skill.getAttribute("aria-expanded") === "true", label + ": skill keyboard toggle");

  await page.getByRole("button", { name: "Open accessibility panel", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor();
  const bounds = await dialog.boundingBox();
  check(bounds.x >= 0 && bounds.x + bounds.width <= width + 1, label + ": accessibility panel clipped");
  const switches = dialog.getByRole("switch");
  for (let index = 0; index < await switches.count(); index++) {
    const control = switches.nth(index);
    await control.focus();
    await control.press("Space");
    check(await control.getAttribute("aria-checked") === "true", label + ": accessibility switch did not enable");
    check(await control.evaluate((node) => node === document.activeElement), label + ": switch lost focus");
    await control.press("Space");
  }
  const buttons = dialog.getByRole("button");
  await buttons.last().focus();
  await page.keyboard.press("Tab");
  check(await buttons.first().evaluate((node) => node === document.activeElement), label + ": focus escaped dialog");
  const calm = dialog.getByRole("switch", { name: /Calm/ });
  await calm.click();
  await page.keyboard.press("Escape");
  check(await page.getByRole("button", { name: "Open accessibility panel", exact: true }).evaluate((node) => node === document.activeElement), label + ": Escape did not return focus");
  await page.reload({ waitUntil: "load" });
  await page.waitForFunction(() => document.documentElement.classList.contains("a11y-calm"));
  check(await page.locator("[data-counter-value]").allTextContents().then((values) => values.join(",") === "15+,7,5"), label + ": Calm Mode counters");
  checkStyles(await readStyles(page, width), label + " after persisted Calm Mode");
}

async function main() {
  fs.mkdirSync(outputDirectory, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    ...(fs.existsSync(chromePath) ? { executablePath: chromePath } : {}),
  });
  try {
    await Promise.all(viewports.map(async (viewport) => {
      for (const mode of modes) {
        const label = viewport.width + "px / " + mode;
        const page = await browser.newPage({
          viewport,
          javaScriptEnabled: mode !== "no-js",
          reducedMotion: mode === "reduced-motion" ? "reduce" : "no-preference",
        });
        page.setDefaultTimeout(15000);
        const consoleMessages = [];
        page.on("console", (message) => {
          if (message.type() === "error" || /hydration|did not match|server html/i.test(message.text())) {
            consoleMessages.push({ type: message.type(), text: message.text(), location: message.location() });
          }
        });
        page.on("pageerror", (error) => consoleMessages.push({ type: "pageerror", text: error.message }));
        page.on("response", (response) => {
          if (response.status() >= 400) consoleMessages.push({ type: "http", status: response.status(), url: response.url() });
        });
        if (mode === "calm") {
          await page.addInitScript(() => localStorage.setItem("a11y-settings", JSON.stringify({
            reduceMotion: false, dyslexiaFont: false, textSize: "md", highContrast: false, calmMode: true,
          })));
        }
        let result = { viewport, mode, consoleMessages };
        try {
          const response = await page.goto(origin, { waitUntil: "load", timeout: 60000 });
          check(response.ok(), label + ": homepage HTTP " + response.status());
          await page.locator("#hero-heading").waitFor({ state: "attached" });
          await page.evaluate(() => document.fonts.ready);
          if (mode === "animations-disabled") {
            await page.addStyleTag({ content: "*, *::before, *::after { animation: none !important; transition: none !important; }" });
          }
          await page.waitForTimeout(3000);
          result.styles = await readStyles(page, viewport.width);
          checkStyles(result.styles, label);
          check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), label + ": horizontal overflow");
          check((await page.locator("[data-desktop-links] a").allTextContents()).join("|") === expectedLinks.join("|"), label + ": wrong desktop links");
          const navbar = await page.locator('nav[aria-label="Main navigation"]').evaluate((nav) => {
            const blocks = [...nav.children].map((node) => node.getBoundingClientRect()).filter((rect) => rect.width > 0);
            return blocks.every((rect, index) => index === 0 || rect.left >= blocks[index - 1].right);
          });
          check(navbar, label + ": navbar overlaps");
          check(await page.locator('#hero a[href="#contact"]').innerText() === "Book a Session", label + ": wrong CTA");
          check((await page.locator("#hero-heading").innerText()).replace(/\s+/g, " ").trim() === "Every child learns differently. Let's find their way.", label + ": headline word spacing");
          if (mode === "normal") {
            await page.screenshot({ path: path.join(outputDirectory, "hero-" + viewport.width + ".png") });
            // Scroll each section into view: a full-page capture alone does not exercise scroll triggers.
            for (const id of sectionIds) {
              const section = page.locator("#" + id);
              await section.evaluate((node) => node.scrollIntoView({ behavior: "instant", block: "start" }));
              await page.waitForTimeout(id === "counters" ? 1800 : id === "credentials" ? 1200 : 250);
              if (["counters", "approach", "specialisations", "skills", "credentials"].includes(id)) {
                await section.screenshot({ path: path.join(outputDirectory, id + "-" + viewport.width + ".png") });
              }
            }
            result.afterScroll = await readStyles(page, viewport.width);
            checkStyles(result.afterScroll, label + " after scrolling");
            await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
          }
          if (mode === "calm" || mode === "reduced-motion") {
            check((await page.locator("[data-counter-value]").allTextContents()).join(",") === "15+,7,5", label + ": counters not final");
            check(await page.evaluate(() => document.getAnimations().every((animation) => animation.playState !== "running")), label + ": motion still running");
            const skill = page.locator('#skills [role="button"]').first();
            await skill.hover();
            check(await skill.evaluate((node) => getComputedStyle(node).transform === "none"), label + ": skill still moves on hover");
            await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
          }
          const screenshot = "homepage-" + viewport.width + (mode === "normal" ? "" : "-" + mode) + ".png";
          await page.screenshot({ path: path.join(outputDirectory, screenshot), fullPage: true });
          result.screenshot = screenshot;
          if (mode === "normal") await interactions(page, viewport.width, label);
        } catch (error) {
          failures.push(label + ": " + error.message);
          result.error = error.message;
          await page.screenshot({ path: path.join(outputDirectory, "failure-" + viewport.width + "-" + mode + ".png"), fullPage: true }).catch(() => {});
        }
        check(consoleMessages.length === 0, label + ": console/HTTP errors: " + JSON.stringify(consoleMessages));
        diagnostics.push(result);
        console.log(label + " checked");
        await page.close();
      }
    }));
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(outputDirectory, "browser-diagnostics.json"), JSON.stringify({ origin, diagnostics, failures }, null, 2));
  }
  if (failures.length) throw new Error(failures.join("\n"));
  console.log("PASS: 15 viewport/mode checks, section screenshots, keyboard interactions, and accessibility persistence; no console or hydration errors.");
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
