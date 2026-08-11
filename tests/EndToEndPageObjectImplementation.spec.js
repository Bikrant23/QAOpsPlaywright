const {test} = require('@playwright/test');
const {customtest} = require('../utils/test-base');
const {PageObjectManager} = require('../pageobjects/PageObjectManager');

// Convert the JSON to a String and convert that String into a JS Object
const dataset = JSON.parse(
  JSON.stringify(require('../utils/PlaceOrderTestData.json'))
);

for(const data of dataset){
  //Parameterization of the test case using the data from the JSON file
  test(`End To End Page Object Implementation for ${data.productName}`, async ({page}) => {
    const cvv = "123";
    const name = "Kunam Kamra";
    const coupon = "rahulshettyacademy";
    const countryCode = "ind";
    const countryName = "India";   

    const pageObjectManager = new PageObjectManager(page); 
    
   
    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.landOnLoginPage();
    await loginPage.validLogin(data.username, data.password);   
    
    const dashboardPage = pageObjectManager.getDashboardPage();
    await dashboardPage.searchProduct(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = pageObjectManager.getCartPage();
    await cartPage.navigateToCheckout(data.productName);

    const checkoutPage = pageObjectManager.getCheckoutPage();
    await checkoutPage.placeOrder(cvv, name, coupon, countryCode, countryName);
    await checkoutPage.verifyEmailId(data.username);
    // await checkoutPage.submitAndGetOrderId();
    const orderId = await checkoutPage.submitAndGetOrderId();

    const myOrderPage = pageObjectManager.getMyOrderPage();
    await myOrderPage.navigateMyOrderPage();
    await myOrderPage.getProductDetails(orderId);
  });
  
} 

//Pass test data from fixture to the test case using the custom test
customtest(`@Web End To End Page Object Implementation`, async ({page, testDataForOrder}) => {

    const cvv = "123";
    const name = "Kunam Kamra";
    const coupon = "rahulshettyacademy";
    const countryCode = "ind";
    const countryName = "India";   

    const pageObjectManager = new PageObjectManager(page); 
    
   
    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.landOnLoginPage();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);   
    
    const dashboardPage = pageObjectManager.getDashboardPage();
    await dashboardPage.searchProduct(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = pageObjectManager.getCartPage();
    await cartPage.navigateToCheckout(testDataForOrder.productName);
  });