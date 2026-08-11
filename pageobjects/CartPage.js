const {expect} = require('@playwright/test');

class CartPage {

  constructor(page) {

    this.page = page;

    this.cartItems = page.locator("div li"); 
    this.cartProducts = page.locator(".cartSection h3");``
    this.countCartProducts = this.cartProducts.count();
    this.match = false;
    this.checkOutButton = page.locator("text = Checkout");   
  }

  async navigateToCheckout(productName) {

    await this.cartItems.first().waitFor(); //Wait for the first element to be visible on the page before performing any action on it.
    const bool = await this.page.locator(`h3:has-text('${productName}')`).isVisible(); //Check if the Product is Visible in the Cart Page
    await expect(bool).toBeTruthy();
    this.checkOutButton.click();

    // await this.page.pause();
  }
}

module.exports = CartPage;