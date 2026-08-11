const {test, expect} = require('@playwright/test');

test('Playwright Test', async ({browser}) =>
{
    //To open a Fresh Browser Instance
    const context = await browser.newContext();

    //To create a Page out of the Instance
    const page = await context.newPage();

    const username = page.locator("#username");
    const password = page.locator("#password");
    const singnInButton = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a"); 

    await page.goto("https://rahulshettyacademy.com/LoginpagePractise/");

    //CSS and XPath Selectors - We can write to identify the elements on the page
    // await username.fill("rahulshetty"); 

    // await password.fill("learning");

    // await singnInButton.click();

    // //Extracting the text from browser and inserting valid expect assertions in test
    // console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator("[style*='block']")).toContainText("Old");

    await username.fill(""); //Wipes out the username field and makes it empty
    await username.fill("rahulshettyacademy"); //Fills the username field with new value

    await password.fill(""); //Wipes out the password field and makes it empty
    await password.fill("Learning@830$3mK2"); //Fills the password field with new value

    await singnInButton.click();

    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());

    //Get all the Products in the List Format
    const allTitles =  await cardTitles.allTextContents(); //Returns a list of all the tiles in an Array.
    console.log(allTitles);
});

// test('Browser Context Declaration', async ({page}) =>
// {
//     await page.goto("https://udemy.com/");
//     //Get the title of the Page 
//     // var title = await page.title();
//     console.log(await page.title());
//     await expect(page).toHaveTitle("Udemy: Online Courses for Skills, Careers & AI");
// });