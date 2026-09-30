import { chromium } from "@playwright/test";

const base = process.env.PORTFOLIO_PREVIEW_URL || "http://localhost:3010";
const browser = await chromium.launch();

const shots = [
  { route: "/", name: "home-desktop", width: 1440, height: 900 },
  { route: "/", name: "home-mobile", width: 375, height: 812 },
  { route: "/impact", name: "impact-desktop", width: 1440, height: 900 },
  { route: "/impact", name: "impact-mobile", width: 375, height: 812 },
  { route: "/impact#relationships", name: "relationships-desktop", width: 1440, height: 900, target: "#relationships" },
  { route: "/impact#relationships", name: "relationships-light", width: 1440, height: 900, target: "#relationships", theme: "light" },
  { route: "/experience", name: "experience-desktop", width: 1440, height: 900 },
  { route: "/blog", name: "blog-desktop", width: 1440, height: 900 },
];

for (const shot of shots) {
  const page = await browser.newPage({ viewport: { width: shot.width, height: shot.height } });
  await page.addInitScript((theme) => {
    localStorage.setItem("popeblack-theme", theme);
    localStorage.setItem("popeblack-analytics-consent", "rejected");
  }, shot.theme || "dark");
  await page.goto(`${base}${shot.route}`, { waitUntil: "domcontentloaded" });
  if (shot.target) {
    await page.locator(shot.target).scrollIntoViewIfNeeded();
    await page.waitForFunction(() =>
      [...document.querySelectorAll("#relationships img")].every((image) => image.complete),
    );
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: `docs/portfolio-review/after/${shot.name}.png` });
  console.log(`Captured ${shot.name}`);
  await page.close();
}

await browser.close();
