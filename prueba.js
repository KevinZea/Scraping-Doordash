import puppeteer from "puppeteer";

async function openWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 915 });
  await page.goto("https://www.doordash.com/store/subway-new-york-342653/");
  await page.locator('button[aria-label="Expand Store Info"]').click()
  await page.waitForSelector("span[color='#00872F']");
  let spanTexts = await page.$$eval("span[color='#00872F']", spans => spans.map(span => span.textContent));
  await browser.close();
  return spanTexts
}

openWebPage().then((value) => {
  console.log(value)
})