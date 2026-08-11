const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const loginPayLoad = { userEmail: "kamra.k@gmail.com", userPassword: "Kunal@123" }; //JS Object
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };  //JS Object
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {
    //Login API
    const apiContext = await request.newContext();

    //Create an Object for APIUtils class
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

});

test("@API Security Test Request Intercept", async ({ page }) => {
        
    //Login & Reach Orders Page //Insert the token using JS Expressions
    await page.addInitScript(value => {    
        window.localStorage.setItem('token',value); //Write a code which can insert the item into the Local Storage
    }, response.token); //Completely bypass the Login Step
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); 

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();  

    await page.locator("button[routerlink*='/myorders']").click();

    //Mock the Request Calls
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6v65e0a885b8849b490edd2a',
        }), //Intercept Request Calls
    );

    await page.locator("button:has-text('View')").first().click();
    await page.pause();
    const unAutorizationMessage =  await page.locator("p").last().allTextContents();

    console.log(unAutorizationMessage);

});