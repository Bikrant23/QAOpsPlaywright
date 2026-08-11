const {expect} = require('@playwright/test');

class MyOrderPage {

  constructor(page) {

    this.page = page;

    this.myOrderLink = page.locator("button[routerlink*='myorder']");
    this.allOrders = page.locator("tbody");

    this.rows = page.locator("tbody tr");
  }

  async navigateMyOrderPage(){

    await this.myOrderLink.click();
    await this.allOrders.waitFor(); //Wait for the Table to be visible on the page before performing any action on it
  }

  async getProductDetails(orderId){

     for(let i=0; i< await this.rows.count(); ++i){

        await this.allOrders.waitFor();

        const rowOrderId = await this.rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId))
        {
            await this.rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await this.page.locator(".col-text").textContent();

    await expect(orderId.includes(orderIdDetails)).toBeTruthy();

    if(orderId.split("|")[1].trim() === orderIdDetails.trim()){
        console.log("Order Id matches perfectly !")
    }
    else{
        console.log("Oops! Order Id don't match");
    }
  }
}

module.exports = MyOrderPage;
