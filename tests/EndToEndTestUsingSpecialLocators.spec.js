const {test, expect} = require('@playwright/test');

test('Special Locators End To End Test',async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email = "kamra.k@gmail.com";
    const password = "Kunal@123"
    const emailAddress = page.getByPlaceholder("email@example.com");
    const passwordField =  page.getByPlaceholder("enter your passsword");
    const loginButton =  page.getByRole("button",{name: 'Login'});

    //Login to the Website
    await emailAddress.fill(email);
    await passwordField.fill(password);
    await loginButton.click();

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    //Add a Prodcut to Cart
    await page.locator(".card-body").filter({hasText: "ADIDAS ORIGINAL"}).getByRole("button",{name: 'Cart'}).click();
 
    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
    //await page.pause();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();
 
    await page.getByRole("button",{name :"Checkout"}).click();``
 
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
    await page.getByRole("button",{name :"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
 
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

});