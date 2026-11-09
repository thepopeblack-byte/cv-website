import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium, expect } from "@playwright/test";

const base = process.env.PORTFOLIO_PREVIEW_URL || "http://127.0.0.1:3011";
const output = path.resolve("tmp-media/site-bug-review");
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const results = [];
const failures = [];
async function check(name, test) {
  try { await test(); results.push({ name, status: "pass" }); console.log(`PASS: ${name}`); }
  catch (error) { failures.push(`${name}: ${error.message}`); results.push({ name, status: "fail", error: error.message }); console.error(`FAIL: ${name}: ${error.message}`); }
}
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
context.setDefaultTimeout(60000);
context.setDefaultNavigationTimeout(120000);
await context.addInitScript(() => localStorage.setItem("popeblack-analytics-consent", "rejected"));
await context.route(/youtube(-nocookie)?\.com\/embed\//, (route) => route.fulfill({ contentType: "text/html", body: '<button>Mock player control</button>' }));
const page = await context.newPage();
const navigate = async (url) => {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => {
    const control = document.querySelector("#speaking .controlled-scene-tabs button") ?? document.querySelector(".theme-toggle");
    return control && Object.keys(control).some((key) => key.startsWith("__reactProps"));
  });
};
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
try {
  await navigate(base + "/expertise");
  await check("Speaking selections and timestamps", async () => {
    const buttons = page.locator("#speaking .controlled-scene-tabs button");
    for (let index = 0; index < await buttons.count(); index++) {
      await buttons.nth(index).click();
      assert.equal(await buttons.nth(index).getAttribute("aria-pressed"), "true");
      const panel = page.locator("#speaking .controlled-scene-panel.is-active");
      await panel.getByRole("heading").waitFor();
      const play = panel.getByRole("button", { name: "Play", exact: true });
      if (await play.count()) {
        await play.click();
        const modal = page.getByRole("dialog");
        await modal.waitFor();
        const src = await modal.locator("iframe").getAttribute("src");
        assert.ok(src.includes("autoplay=1"), `Missing autoplay: ${src}`);
        if ((await buttons.nth(index).innerText()) === "Solana Summit") assert.ok(src.includes("start=19342"), `Incorrect Solana timestamp: ${src}`);
        await page.getByRole("button", { name: "Close media modal" }).click();
        await modal.waitFor({ state: "detached" });
        await expect(play).toBeFocused();
      }
    }
  });
  await check("Video traps keyboard focus and retains scroll", async () => {
    await page.locator("#speaking .controlled-scene-tabs button").first().click();
    const play = page.locator("#speaking .controlled-scene-panel.is-active").getByRole("button", { name: "Play", exact: true });
    await play.scrollIntoViewIfNeeded();
    const before = await page.evaluate(() => scrollY);
    await play.click();
    const modal = page.getByRole("dialog");
    await modal.waitFor();
    await page.keyboard.press("Shift+Tab");
    await page.waitForTimeout(100);
    const focusState = await modal.evaluate((el) => ({ inside: el.contains(document.activeElement) || document.activeElement === document.body, modal: el.matches(":modal"), active: document.activeElement?.outerHTML.slice(0, 150) }));
    assert.equal(focusState.modal, true);
    // Native dialogs may cycle through browser chrome, but never background controls.
    assert.equal(focusState.inside, true, `Focus escaped behind video: ${JSON.stringify(focusState)}`);
    await page.locator(".desktop-nav a").first().evaluate((el) => el.focus());
    assert.equal(await page.locator(".desktop-nav a").first().evaluate((el) => el === document.activeElement), false);
    const bounds = await modal.boundingBox();
    assert.equal(bounds.width, 1440);
    assert.equal(bounds.height, 900);
    await page.getByRole("button", { name: "Close media modal" }).focus();
    await page.keyboard.press("Escape");
    await modal.waitFor({ state: "detached" });
    await page.waitForTimeout(100);
    assert.ok(Math.abs(await page.evaluate(() => scrollY) - before) < 4);
  });
  // Always close a failed modal check before proceeding.
  if (await page.getByRole("dialog").count()) await page.getByRole("button", { name: "Close media modal" }).click();

  await check("Expertise sections are reachable", async () => {
    for (const id of ["credentials", "education", "speaking"]) {
      await navigate(base + "/expertise#" + id);
      await page.locator("#" + id).scrollIntoViewIfNeeded();
      assert.ok(await page.locator("#" + id).isVisible());
    }
  });
  for (const width of [375, 768, 1440]) await check(`Speaking carousel controls at ${width}px`, async () => {
    await page.setViewportSize({ width, height: 900 });
    await navigate(base + "/expertise");
    const buttons = page.locator("#speaking .controlled-scene-tabs button");
    await buttons.nth(6).click();
    await page.waitForTimeout(300);
    const current = page.locator("#speaking .controlled-scene-panel.is-active");
    assert.match(await current.innerText(), /Web3 Lagos/);
    const track = page.locator("#speaking .controlled-scene-panel-track");
    if (width <= 768) {
      const bounds = await current.boundingBox(); const viewport = await track.boundingBox();
      assert.ok(Math.abs(bounds.x - viewport.x) < 35, "Selected mobile panel is off screen");
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2));
    await current.getByRole("button", { name: "Play", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor();
    const overlay = await dialog.boundingBox();
    const player = await dialog.locator(".media-dialog").boundingBox();
    assert.equal(overlay.width, width);
    assert.equal(overlay.height, 900);
    assert.ok(player.x >= 0 && player.x + player.width <= width);
    assert.ok(player.y >= 0 && player.y + player.height <= 900);
    await page.screenshot({ path: path.join(output, `video-${width}.png`) });
    await dialog.getByRole("button", { name: "Close media modal" }).click();
    await dialog.waitFor({ state: "detached" });
  });

  await check("Theme works with blocked storage", async () => {
    const blocked = await browser.newContext({ viewport: { width: 375, height: 812 } });
    blocked.setDefaultNavigationTimeout(120000);
    blocked.setDefaultTimeout(60000);
    await blocked.addInitScript(() => { Storage.prototype.setItem = () => { throw new DOMException("Storage blocked", "SecurityError"); }; });
    const tab = await blocked.newPage(); const issues = [];
    tab.on("pageerror", (error) => issues.push(error.message));
    await tab.goto(base, { waitUntil: "domcontentloaded" });
    await tab.waitForFunction(() => {
      const control = document.querySelector(".theme-toggle");
      return control && Object.keys(control).some((key) => key.startsWith("__reactProps"));
    });
    await tab.getByRole("button", { name: "Switch to light theme", exact: true }).filter({ visible: true }).click();
    await tab.getByRole("button", { name: "Switch to dark theme", exact: true }).filter({ visible: true }).waitFor();
    await tab.getByRole("button", { name: "Switch to dark theme", exact: true }).filter({ visible: true }).click();
    assert.equal(await tab.locator("html").getAttribute("data-theme"), "dark");
    assert.deepEqual(issues, []);
    await blocked.close();
  });

  await check("Contact success, failure and retry without sending mail", async () => {
    await navigate(base + "/#contact");
    await page.getByRole("textbox", { name: "Name", exact: true }).fill("Test visitor");
    await page.getByRole("textbox", { name: "Email", exact: true }).fill("visitor@example.com");
    await page.getByRole("textbox", { name: "Message", exact: true }).fill("Local automated check only.");
    await page.getByRole("button", { name: /Opportunity Type/ }).click();
    await page.getByRole("option").first().click();
    for (const width of [375, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(200);
      assert.equal(await page.getByRole("textbox", { name: "Message", exact: true }).inputValue(), "Local automated check only.", "Resizing erased the message");
    }
    let status = 503;
    await page.route("https://formspree.io/**", (route) => route.fulfill({ status, contentType: "application/json", body: status === 200 ? '{"ok":true}' : '{"error":"unavailable"}' }));
    await page.getByRole("button", { name: "Send Message", exact: true }).click();
    await page.locator("#contact [role=alert]").waitFor();
    assert.equal(await page.getByRole("textbox", { name: "Email", exact: true }).inputValue(), "visitor@example.com");
    status = 200;
    await page.getByRole("button", { name: "Send Message", exact: true }).click();
    await page.locator("#contact [role=status]").waitFor();
    assert.equal(await page.getByRole("textbox", { name: "Email", exact: true }).inputValue(), "");
    await page.unroute("https://formspree.io/**");
  });

  await check("Contact timeout preserves the message", async () => {
    await navigate(base + "/#contact");
    await page.evaluate(() => {
      const originalFetch = window.fetch.bind(window);
      window.fetch = (input, options) => String(input).includes("formspree.io")
        ? new Promise((resolve, reject) => { options.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true }); })
        : originalFetch(input, options);
    });
    await page.getByRole("textbox", { name: "Name", exact: true }).fill("Timeout check");
    await page.getByRole("textbox", { name: "Email", exact: true }).fill("visitor@example.com");
    await page.getByRole("textbox", { name: "Message", exact: true }).fill("Keep this message.");
    await page.getByRole("button", { name: "Send Message", exact: true }).click();
    await page.getByText("The request timed out.", { exact: false }).waitFor({ timeout: 25000 });
    assert.equal(await page.getByRole("textbox", { name: "Message", exact: true }).inputValue(), "Keep this message.");
    assert.equal(await page.getByRole("button", { name: "Send Message", exact: true }).isEnabled(), true);
  });

  await check("Public internal links, anchors and downloads", async () => {
    const paths = new Set(["/", "/profile", "/impact", "/expertise", "/experience", "/blog", "/privacy", "/newsletter"]);
    const targets = new Set();
    for (const route of paths) {
      await navigate(base + route);
      const links = await page.locator("a[href]").evaluateAll((elements) => elements.map((el) => el.getAttribute("href")));
      for (const link of links) {
        if (link?.startsWith("/") || link?.startsWith("#")) {
          const url = new URL(link, base + route);
          targets.add(url.pathname + url.hash);
          if (url.pathname.startsWith("/blog/")) paths.add(url.pathname);
        }
      }
    }
    const broken = [];
    const htmlCache = new Map();
    for (const target of targets) {
      const url = new URL(target, base);
      if (!htmlCache.has(url.pathname)) {
        const response = await page.request.get(base + url.pathname, { timeout: 120000 });
        if (response.status() !== 200) broken.push(`${url.pathname}: ${response.status()}`);
        htmlCache.set(url.pathname, await response.text());
      }
      if (url.hash && !htmlCache.get(url.pathname).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) broken.push(`Missing anchor: ${target}`);
    }
    assert.deepEqual(broken, []);
    const pdf = await page.request.get(base + "/kayode-popoola-cv.pdf");
    assert.equal((await pdf.body()).subarray(0, 5).toString(), "%PDF-");
    const sitemap = await page.request.get(base + "/sitemap.xml");
    const xml = await sitemap.text();
    assert.ok(xml.includes("/newsletter"));
    assert.ok(!xml.includes("/prototype/") && !xml.includes("/events"));
  });
  await check("Consent blocks analytics scripts", async () => {
    await navigate(base);
    assert.equal(await page.locator('script[src*="googletagmanager"], script[src*="clarity.ms"]').count(), 0);
  });
  await check("Runtime errors", async () => assert.deepEqual(errors, []));
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await navigate(base);
    await page.screenshot({ path: path.join(output, `home-${width}.png`), fullPage: false });
  }
} finally {
  await writeFile(path.join(output, "results.json"), JSON.stringify({ results, failures }, null, 2));
  await browser.close();
}
console.log(results.map((result) => `${result.status.toUpperCase()}: ${result.name}`).join("\n"));
if (failures.length) { console.error(failures.join("\n")); process.exitCode = 1; }
