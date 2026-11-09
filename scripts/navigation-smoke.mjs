import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const base = process.env.PORTFOLIO_PREVIEW_URL || "http://127.0.0.1:3012";
const output = path.resolve("tmp-media/current-site-navigation");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
const destinations = [
  ["Profile", "/profile"],
  ["Work & Evidence", "/impact"],
  ["Expertise", "/expertise"],
  ["Experience", "/experience"],
  ["Blog", "/blog"],
  ["Contact", "/#contact"],
];

try {
  for (const width of [375, 768, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(base, { waitUntil: "networkidle", timeout: 120000 });
    const reject = page.getByRole("button", {
      name: "Reject analytics",
      exact: true,
    });
    if (await reject.isVisible()) await reject.click();

    for (const [name, destination] of destinations) {
      const mobile = width < 1024;
      if (mobile)
        await page
          .getByRole("button", { name: "Open navigation", exact: true })
          .click();
      const navigation = page.getByRole("navigation", {
        name: mobile ? "Mobile navigation" : "Primary navigation",
        exact: true,
      });
      await navigation.getByRole("link", { name, exact: true }).click();
      await page.waitForURL(base + destination);
      assert.ok((await page.locator("main h1").innerText()).trim());
      assert.ok(
        !(
          await page
            .locator("body")
            .evaluate((element) => getComputedStyle(element).overflow)
        ).includes("hidden"),
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth + 2,
        ),
        false,
      );
      if (mobile)
        assert.equal(
          await page
            .locator("#mobile-nav")
            .evaluate((element) => element.hidden),
          true,
        );
      console.log(width + "px: " + name + " works");
    }

    await page.goto(base, { waitUntil: "networkidle" });
    for (const section of [
      "#impact-preview",
      "#expertise-preview",
      "#experience-preview",
    ]) {
      assert.equal(
        await page.locator(`${section} h2`).count(),
        1,
      );
    }
    if (width < 1024) {
      const menuButton = page.getByRole("button", {
        name: "Open navigation",
        exact: true,
      });
      await menuButton.click();
      await page.keyboard.press("Escape");
      await page
        .getByRole("button", { name: "Open navigation", exact: true })
        .waitFor();
      assert.equal(
        await menuButton.evaluate(
          (element) => element === document.activeElement,
        ),
        true,
      );
    }
    assert.deepEqual(errors, []);
    await page.screenshot({
      path: path.join(output, "home-" + width + ".png"),
      animations: "disabled",
    });
    if (width === 1440) {
      const selectedWork = page.locator("#impact-preview");
      await selectedWork.scrollIntoViewIfNeeded();
      await page.waitForFunction(() => {
        const content = document.querySelector(
          "#impact-preview .section-frame",
        );
        return content && getComputedStyle(content).opacity === "1";
      });
      await selectedWork.screenshot({
        path: path.join(output, "selected-work.png"),
        animations: "disabled",
      });
    }
    results.push({ width, navigation: "passed", errors });
    await context.close();
  }

  const page = await browser.newPage({ viewport: { width: 375, height: 850 } });
  await page.goto(base, { waitUntil: "networkidle" });
  const reject = page.getByRole("button", {
    name: "Reject analytics",
    exact: true,
  });
  if (await reject.isVisible()) await reject.click();
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .click();
  assert.equal(
    await page
      .locator("body")
      .evaluate((element) => getComputedStyle(element).overflow),
    "hidden",
  );
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForFunction(
    () =>
      document.querySelector("#mobile-nav")?.hidden &&
      document.body.style.overflow !== "hidden",
  );
  assert.equal(
    await page
      .locator(".desktop-nav")
      .evaluate((element) => element.contains(document.activeElement)),
    true,
  );
  await page.mouse.wheel(0, 700);
  await page.waitForFunction(() => window.scrollY > 50);
  await page.setViewportSize({ width: 375, height: 850 });
  assert.equal(
    await page.locator("#mobile-nav").evaluate((element) => element.hidden),
    true,
  );
  await page.close();

  await writeFile(
    path.join(output, "results.json"),
    JSON.stringify({ results, resizeScrollLock: "passed" }, null, 2),
  );
  console.log(
    "PASS: original navigation, keyboard menu access, and mobile-to-desktop scroll-lock regression",
  );
} finally {
  await browser.close();
}
