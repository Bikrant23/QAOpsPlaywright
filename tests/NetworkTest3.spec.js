const { test, expect, request } = require('@playwright/test');

test("Abort Network Calls", async ({ browser }) => {
        
   const context = await browser.newContext();
   const page = await context.newPage();

   //Aborting Network Call
   page.route('**/*.css',route => route.abort());
   page.route('**/*.{jpg,png,jpeg}',route => route.abort());

   const username = page.locator("#username");
   const password = page.locator("#password");
   const singnInButton = page.locator("#signInBtn");
   const cardTitles = page.locator(".card-body a");    

   //Tracking Network Traffic
   page.on('request',request => console.log(request.url()));
   page.on('response', response => console.log(response.url(), response.status()));

   await page.goto("https://rahulshettyacademy.com/loginPagePractise");

   await username.fill("rahulshettyacademy"); 
   await password.fill("Learning@830$3mK2");
   await singnInButton.click();

   await page.waitForLoadState('networkidle'); 

   await page.locator(cardTitles).first().waitFor(); 
   await page.pause();

});