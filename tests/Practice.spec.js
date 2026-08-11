const {test, expect} = require('@playwright/test');

test.describe.configure({mode: 'parallel'}); //Configure the test to run in parallel mode
test('Registration', async ({browser}) =>
{
     //To open a Fresh Browser Instance 
    const context = await browser.newContext();

    //To create a Page out of the Instance
    const page = await context.newPage();

    const firstName = page.locator("#firstName");
    const lastName = page.locator("#lastName");
    const email = page.locator("#userEmail");
    const mobile = page.locator("#userMobile");
    const password = page.locator("#userPassword");
    const confirmPassword = page.locator("#confirmPassword");
    const checkBox = page.locator("[type='checkbox']");
    const submitButton = page.locator("#login");
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.locator('.text-reset').click();

    await firstName.fill("Kunal");

    await lastName.fill("Kamra");

    await email.fill("kamra.k@gmail.com");

    await mobile.fill("9876543210");

    await password.fill("Kunal@123");

    await confirmPassword.fill("Kunal@123");

    await checkBox.click();

    await submitButton.click();
    await page.waitForTimeout(5000);

});

test('Login', async ({browser}) =>
{
    //To open a Fresh Browser Instance 
    const context = await browser.newContext();

    //To create a Page out of the Instance
    const page = await context.newPage();
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginButton = page.locator("#login");

    const cardTitles = page.locator(".card-body b");

    await email.fill("kamra.k@gmail.com");

    await password.fill("Kunal@123");

    await loginButton.click();  

    // await page.waitForLoadState('networkidle'); //After the page is loaded, we can perform the next steps. This is a better approach than using waitForTimeout.

    // await page.locator(".card-body b").waitFor(); //Wait for the elements to be visible on the page before performing any action on it.

    await page.locator(".card-body b").first().waitFor(); //Wait for the first element to be visible on the page before performing any action on it.

    console.log(await cardTitles.first().textContent());

    //Get all the Products in the List Format
    const allTitles = await cardTitles.allTextContents(); //Returns a list of all the tiles in an Array.
    console.log(allTitles);

    await page.waitForTimeout(5000);
});


