import { chromium } from "playwright";

(async () => {
  //ブラウザが立ち上がる
  const browser = await chromium.launch({ headless: false, slowMo: 500 });

  //新しいページを立ち上げる
  const page = await browser.newPage();

  //どこのページに遷移するか
  await page.goto(
    "https://search.rakuten.co.jp/search/mall/%E3%83%A2%E3%83%AB%E3%82%B8%E3%83%A5+%E3%83%86%E3%83%B3%E3%83%88%E3%82%B5%E3%82%A6%E3%83%8A/"
  );

  const itemsLocator = page.locator(
    ".dui-cards.searchresultitems .dui-card.searchresultitem"
  );
  const count = await itemsLocator.count();
  for (let i = 0; i < count; i++) {
    const title = await itemsLocator
      .nth(i)
      .locator(".title-link-wrapper--2sUFJ")
      .innerText();
    const price = await itemsLocator
      .nth(i)
      .locator(".price--OX_YW")
      .innerText();
    const score = await itemsLocator
      .nth(i)
      .locator(".score")
      .innerText()
      .catch(() => "N/A");
    const legend = await itemsLocator
      .nth(i)
      .locator(".legend")
      .innerText()
      .catch(() => "N/A");
    const link = await itemsLocator
      .nth(i)
      .locator(".image-wrapper--1ROeD a")
      .getAttribute("href")
      .catch(() => "N/A");
    console.log({ title, price, link, score, legend });
  }

  //ブラウザを閉じる
  await browser.close();
})();
