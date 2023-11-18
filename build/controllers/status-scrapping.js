import puppeteer from "puppeteer";

export async function getStatus(link) {
    const browser = await puppeteer.launch({
        headless: 'new',
        slowMo: 100,
    });
    const page = await browser.newPage();
    // await page.setViewport({ width: 412, height: 1115 });
    await page.goto(link);
    // await page.locator('button[aria-label="Expand Store Info"]').click()
    await page.waitForSelector("span[color='#00872F']");
    let spanTexts = await page.$$eval("span[color='#00872F']", spans => spans.map(span => span.textContent));
    await browser.close();
    return spanTexts
}