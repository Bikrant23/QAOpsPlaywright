const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');

const loginPayLoad = {userEmail: "kamra.k@gmail.com", userPassword: "Kunal@123"}; //JS Object
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};  //JS Object

// let token; 
// let orderId;
let response;

test.beforeAll( async () => {
    //Login API
    const apiContext = await request.newContext();

    //Create an Object for APIUtils class
    const apiUtils = new APIUtils(apiContext,loginPayLoad);  
    response = await apiUtils.createOrder(orderPayLoad);

});

test("Web API Test",async({page}) =>{

    // const apiUtils = new APIUtils(apiContext,loginPayLoad);
    // const orderId = new createOrder(orderPayLoad);

    //Insert the token using JS Expressions
    await page.addInitScript(value => {    
        window.localStorage.setItem('token',value); //Write a code which can insert the item into the Local Storage
    }, response.token); //Completely bypass the Login Step
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("button[routerlink*='/myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");

    for(let i=0; i< await rows.count(); ++i)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").first().textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
           
});