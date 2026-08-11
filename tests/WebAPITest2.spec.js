const {test, expect, request} = require('@playwright/test');
let webContext;

test.beforeAll(async ({browser}) =>{
    
    //To open a Fresh Browser Instance 
    const context = await browser.newContext();

    //To create a Page out of the Instance
    const page = await context.newPage();    

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginButton = page.locator("#login");

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await email.fill("kamra.k@gmail.com");

    await password.fill("Kunal@123");

    await loginButton.click();  

    await page.waitForLoadState('networkidle'); //After the page is loaded, we can perform the next steps. This is a better approach than using waitForTimeout.

    await context.storageState({path : 'state.json'}); //Storage State - This will capture all the data from the logs like cookies, tokens, storages etc which will help to create one JSON File which will have the content of all the storage session data in the test level which will login only once and capture all the data in state.json File

    //Invoke a Browser by injecting the state.json File    
    webContext = await browser.newContext({
        storageState:'state.json', //Injecting the existing storage data
    });
});

test('Save Session Storage', async () => {
    
    const page = await webContext.newPage(); //Dynamically creating a page
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const cvv = page.locator("(//input[@type='text'])[2]");
    const nameOnCard = page.locator("(//input[@type='text'])[3]");
    const coupon = page.locator("[name='coupon']");
 
    const cardTitles = page.locator(".card-body b");    

    await page.locator(".card-body b").first().waitFor(); 

    console.log(await cardTitles.first().textContent());

    //Get all the Products in the List Format
    const allTitles = await cardTitles.allTextContents(); //Returns a list of all the tiles in an Array.
    console.log(allTitles);

    //Find ZARA COAT 3 Product and Click on Add to Cart Button
    const count = await products.count(); //Get the Count of all the Products in the List
    for(let i=0; i<count; ++i)
    {
        if(await products.nth(i).locator("b").textContent() === productName)
        {
            //Add the desired Product to Cart by Clicking on the Add to Cart Button
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    //Jump to Cart Page
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor(); //Wait for the first element to be visible on the page before performing any action on it.

    //Check whether the Product is Visible in the Cart Page
    const bool = await page.locator(`h3:has-text('${productName}')`).isVisible(); 
    expect(bool).toBeTruthy();

    //Click Checkout Button
    await page.locator("text=Checkout").click();

    await cvv.fill("123");
    await nameOnCard.fill("Kunal Kamra");
    await coupon.fill("rahulshettyacademy");

    await page.locator("[type='submit']").click();

    await page.waitForLoadState('networkidle'); //After the page is loaded, we can perform the next steps. This is a better approach than using waitForTimeout.

    await page.getByRole('textbox', { name: 'Select Country' }).pressSequentially("ind",{delay: 300}); //Type the Country Name in the Input Box with a Delay of 100ms between each keystroke to simulate a real user typing.

    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor(); //Wait for the Dropdown to be visible on the page before performing any action on it.

    const optionsCOunt =await page.locator("button").count();

    for(let i = 0; i<optionsCOunt ;++i){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text.trim() === "India"){
            await dropdown.locator.nth(i).click();
            break;  
        }
    }

    expect(await page.locator(".user__name [type='text']").first()).toHaveText(email);

    await page.locator(".action__submit").click();

    expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorder']").click();

    await page.locator("tbody").waitFor(); //Wait for the Table to be visible on the page before performing any action on it.

    const rows = await page.locator("tbody tr");

    for(let i=0; i< await rows.count(); ++i)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("td").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locatorlocator(".col-text").textContent();

    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    await page.pause();
});

test('Test 2',async () =>{   
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const cvv = page.locator("(//input[@type='text'])[2]");
    const nameOnCard = page.locator("(//input[@type='text'])[3]");
    const coupon = page.locator("[name='coupon']");

    const cardTitles = page.locator(".card-body b");

    await page.locator(".card-body b").first().waitFor(); //Wait for the first element to be visible on the page before performing any action on it.

    console.log(await cardTitles.first().textContent());

    //Get all the Products in the List Format
    const allTitles = await cardTitles.allTextContents(); //Returns a list of all the tiles in an Array.
    console.log(allTitles);
});