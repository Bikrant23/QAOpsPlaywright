const {test, expect} = require('@playwright/test');

test('Playwright Special Locators', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");     
    //   await page.getByLabel("Employed").check();
    await page.getByPlaceholder("Password").fill("Hello");
    await page.getByRole("button", {name: "Submit"}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();// This is used to check if the text is visible or not

    //5 Second default timeout for Expect assertions
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10000}); //Overriding the default timeout for this specific assertion to 10 seconds in Step Level

    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator("app-card", {hasText: "Blackberry"}).getByRole("button").click(); // hasText is used to find the element which has the text "Blackberry" and then click on the button inside that element
  

});

test('Playwright Test Level Timeout', async ({page}) =>
{
    const slowExpect = expect.configure({timeout: 10000});//set timeout of assertions
    test.setTimeout(60000); //Override the default timeout for the test which is 30*1000
    page.setDefaultTimeout(10000);//Set ACtion Timout in Test Level
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click({timeout:5000});//Set Action Timeout in Step LEvel
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");     
    //   await page.getByLabel("Employed").check();
    await page.getByPlaceholder("Password").fill("Hello");
    await page.getByRole("button", {name: "Submit"}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();//This is used to check if the text is visible or not

    //5 Second default timeout for Expect assertions
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible(); //Test Level Assertion Timeout   

    await page.getByRole("link", {name: "Shop"}).click();

    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop");
    //Multiple Assertions

    await page.locator("app-card", {hasText: "Blackberry"}).getByRole("button").click(); // hasText is used to find the element which has the text "Blackberry" and then click on the button inside that element
  

});