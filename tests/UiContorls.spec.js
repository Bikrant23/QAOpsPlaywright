const {test, expect} = require('@playwright/test');

test('UI Controls', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/LoginpagePractise/");
    const username = page.locator("#username");
    const password = page.locator("#password"); 
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult"); //Selects the option from the dropdown list
    await page.locator(".checkmark").last().click(); //Clicks on the last checkbox in the list
    await page.locator("#okayBtn").click(); //Clicks on the OK button in the pop-up
    await expect(page.locator(".checkmark").last()).toBeChecked(); //Validates the text in the usertype field
    console.log(await page.locator(".checkmark").last().isChecked()); //Returns true or false based on the checkbox status
    await page.locator("#terms").click(); //Clicks on the Terms and Conditions checkbox
    console.log(await page.locator("#terms").isChecked()); //Returns true or false based on the checkbox status
    await page.locator("#terms").uncheck(); //Unchecks the Terms and Conditions checkbox
    expect (await page.locator("#terms").isChecked()).toBeFalsy(); //Validates the checkbox is unchecked      
    
    const documentLink = page.locator("[href*=documents-request]"); //Locates the blinking text on the page
    await expect(documentLink).toHaveAttribute("class", "blinkingText"); //Validates the class attribute of the blinking text
    // await page.pause();
});