import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(
    "https://search.rakuten.co.jp/search/mall/%E3%83%A2%E3%83%AB%E3%82%B8%E3%83%A5+%E3%83%86%E3%83%B3%E3%83%88%E3%82%B5%E3%82%A6%E3%83%8A/"
  );
  await page.waitForSelector(".dui-cards.searchresultitems");

  const itemsLocator = page.locator(
    ".dui-cards.searchresultitems .dui-card.searchresultitem"
  );
  const count = await itemsLocator.count();
  const items = [];

  for (let i = 0; i < count; i++) {
    const item = itemsLocator.nth(i);
    const title = await item
      .locator(".title-link-wrapper--2sUFJ")
      .innerText()
      .catch(() => "N/A");
    const price = await item
      .locator(".price--OX_YW")
      .innerText()
      .catch(() => "N/A");
    const score = await item
      .locator(".score")
      .innerText()
      .catch(() => "N/A");
    const legend = await item
      .locator(".legend")
      .innerText()
      .catch(() => "N/A");
    const link = await item
      .locator(".image-wrapper--1ROeD a")
      .getAttribute("href")
      .catch(() => "N/A");
    items.push({ title, price, link, score, legend });
  }

  console.log(items);

  await browser.close();
})();
