const {test, expect} = require('@playwright/test');

test('Popup Validations', async ({page}) =>
{
    await page.goto("http://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://amazon.in");
    // await page.goBack();
    // await page.goForward();



    //To check whether elements are in visible mode or not
    // await expect( page.locator("#displayed-text")).toBeVisible();
    // await page.locator("#hide-textbox").click();
    // await expect( page.locator("#displayed-text")).toBeHidden();

    // //To handle alert pop ups or dialog box
    // await page.locator("#confirmbtn").click();
    // page.on('dialog', dialog => dialog.accept());

    // await page.locator("#confirmbtn").click();
    // page.on('dialog', dialog => dialog.dismiss());

    // //To Hover on an element
    // await page.locator("#mousehover").hover();
    // await page.getByText("Reload").click();

    //Handle Frames
    //Navigating Frame
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click(); // Filters out the visible element from           the DOM if Invisible Element is present
    const textcheck = await framesPage.locator(".text h2").textContent();
    console.log(textcheck.split(" ")[1]);
});
