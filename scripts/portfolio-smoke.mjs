import { chromium } from "@playwright/test";

const base = process.env.PORTFOLIO_PREVIEW_URL || "http://localhost:3010";
const routes = [
  "/", "/profile", "/impact", "/expertise", "/experience", "/blog",
  "/blog/tracing-bybit-billion", "/blog/popeblacks-web3-journey",
  "/blog/your-ai-agent-knows-too-much",
  "/blog/how-to-start-a-career-in-ai-safety-in-30-days",
  "/newsletter", "/privacy", "/robots.txt", "/sitemap.xml",
];
const widths = [320, 375, 768, 1024, 1440];
const browser = await chromium.launch();
const failures = [];

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  page.on("pageerror", (error) => failures.push(`${width}px page error: ${error.message}`));
  for (const route of routes) {
    const response = await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded" });
    if (response?.status() !== 200) failures.push(`${width}px ${route}: HTTP ${response?.status()}`);
    if (!route.endsWith(".txt") && !route.endsWith(".xml")) {
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 2) failures.push(`${width}px ${route}: ${overflow}px horizontal overflow`);
      const heading = await page.locator("main h1").first().count()
        ? await page.locator("main h1").first().textContent()
        : null;
      if (!heading?.trim()) failures.push(`${width}px ${route}: missing h1`);
    }
  }
  await page.close();
}

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(base);
const heroOpacity = await page.locator("#profile h1").evaluate((node) => getComputedStyle(node).opacity);
if (heroOpacity === "0") failures.push("Home hero is invisible");
const hero = page.locator("#profile");
const heroActions = [
  ["Discuss a role", "mailto:thepopeblack@gmail.com?subject=Senior%20commercial%20opportunity"],
  ["Selected Work", "/impact"],
  ["Download CV", "/kayode-popoola-cv.pdf"],
  ["Book a Call", "https://calendly.com/thepopeblack/30min"],
];
for (const [name, href] of heroActions) {
  const action = hero.getByRole("link", { name });
  if (!await action.count()) failures.push(`${name} CTA missing`);
  else if (await action.getAttribute("href") !== href) failures.push(`${name} CTA points to the wrong destination`);
}
if (/\$1\.3M\+|\$300K\+|50\+ strategic deals/i.test(await page.locator("main").innerText())) failures.push("Unverified commercial headline is visible on home");
await page.goto(`${base}/impact`);
for (const id of ["secret-foundation", "secret-africa", "fina", "cosmos-hub-africa", "cipherowl"]) {
  if (!await page.locator(`#${id}`).count()) failures.push(`Missing workstream ${id}`);
}
if (await page.getByText("Trusted by:").count()) failures.push("Ambiguous Trusted by label remains");
await page.goto(`${base}/blog`);
if (!await page.getByRole("heading", { name: "Independent coverage" }).count()) failures.push("Coverage distinction missing");
await page.goto(`${base}/blog/tracing-bybit-billion`);
const hackenCanonical = await page.locator('link[rel="canonical"]').getAttribute("href");
if (hackenCanonical !== "https://hacken.io/discover/tracing-bybit-billion/") failures.push(`Hacken canonical is ${hackenCanonical}`);
await page.goto(`${base}/blog/popeblacks-web3-journey`);
const blockleadersCanonical = await page.locator('link[rel="canonical"]').getAttribute("href");
if (blockleadersCanonical !== "https://www.popeblack.com/blog/popeblacks-web3-journey") failures.push(`Blockleaders synopsis canonical is ${blockleadersCanonical}`);
await page.goto(`${base}/experience`);
if (await page.locator("#experience article").count() !== 4) failures.push("Experience must show exactly four selected entries");
for (const name of ["Secret Network Foundation", "CipherOwl Inc.", "WhisperNode", "Cosmos Hub Nigeria / Naija HackATOM"]) {
  if (!await page.getByRole("heading", { name, exact: true }).count()) failures.push(`${name} experience entry missing`);
}
if (!await page.getByRole("heading", { name: "Fina / Fina Cash", exact: true }).count()) failures.push("Nested Fina experience project missing");
if (await page.getByRole("heading", { name: "Bybit affiliate programme", exact: true }).count()) failures.push("Bybit should not be a main experience entry");
await page.goto(base);
await page.locator("#contact").scrollIntoViewIfNeeded();
await page.getByRole("button", { name: "Opportunity Type Select an option" }).click();
const firstOption = await page.locator(".contact-select-option").first().textContent();
if (!firstOption?.includes("Blockchain Intelligence or Financial Crime Role")) failures.push("Intelligence hiring is not first contact option");
await page.close();

for (const theme of ["light", "dark"]) {
  const themedPage = await browser.newPage({ viewport: { width: 375, height: 812 }, reducedMotion: "reduce" });
  await themedPage.addInitScript((value) => localStorage.setItem("popeblack-theme", value), theme);
  for (const route of ["/", "/impact", "/profile", "/experience", "/blog"]) {
    await themedPage.goto(`${base}${route}`, { waitUntil: "domcontentloaded" });
    const state = await themedPage.evaluate(() => ({
      theme: document.documentElement.dataset.theme,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    }));
    if (state.theme !== theme) failures.push(`${theme} ${route}: theme mismatch`);
    if (state.overflow > 2) failures.push(`${theme} ${route}: horizontal overflow`);
  }
  await themedPage.close();
}
await browser.close();

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`PASS: ${routes.length} routes at ${widths.join(", ")}px; hero, evidence, writing, experience and contact checks`);
}
