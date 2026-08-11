const {test, expect} = require('@playwright/test');

test('Child Windows Handling', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/LoginpagePractise/");
    const username = page.locator("#username");
    const documentLink = page.locator("[href*=documents-request]"); //Locates the blinking text on the page
    const [newPage] = await Promise.all([
         context.waitForEvent('page'),
         documentLink.click() //Clicks on the blinking text to open a new child window
    ]);

    const text = await newPage.locator(".red").textContent(); //Locates the text in the child window
    console.log(text);
    const arrayText = text.split("@"); //Splits the text based on the @ symbol
    const domain = arrayText[1].split(" ")[0]; //Splits the text based on the space and gets the domain name
    // console.log(domain);
    await username.fill(domain); //Fills the domain name in the username field of the parent window
    console.log(await username.inputValue()); //Prints the value in the username field of the parent window
    await page.pause(); //Pauses the execution to view the child window

    // expect(domain).toEqual("rahulshettyacademy.com"); //Asserts the domain name with the expected value
    // await newPage.close(); //Closes the child window    
});