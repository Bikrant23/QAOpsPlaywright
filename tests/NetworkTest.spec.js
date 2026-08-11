const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const loginPayLoad = { userEmail: "kamra.k@gmail.com", userPassword: "Kunal@123" }; //JS Object
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };  //JS Object
const fakePayLoadOrders = { data: [], message: "No Orders" };

// let token; 
// let orderId;
let response;

test.beforeAll(async () => {
    //Login API
    const apiContext = await request.newContext();

    //Create an Object for APIUtils class
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

});

test("@API Network Response Test", async ({ page }) => {

    // const apiUtils = new APIUtils(apiContext,loginPayLoad);
    // const orderId = new createOrder(orderPayLoad);

    //Insert the token using JS Expressions
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value); //Write a code which can insert the item into the Local Storage
    }, response.token); //Completely bypass the Login Step

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    //Mock the Orders call
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            //First get the actual response
            const response = await page.request.fetch(route.request()); //Turning our Page Mode to the API Mode
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill({
                response,
                body,
            });//Sending the response back to the browser
            //Intercepting the response - API will give back the response(Palywright Fake Response) and we will send that response to the browser  and using that response browser will render the data on Frontend

        }
    )

    await page.locator("button[routerlink*='/myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent());
    // await page.locator("tbody").waitFor();

    // const rows = await page.locator("tbody tr");   

});