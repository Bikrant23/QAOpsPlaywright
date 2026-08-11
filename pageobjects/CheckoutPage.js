const {expect} = require('@playwright/test');

class CheckoutPage {

  constructor(page) {
    this.page = page;
    
    this.cvv = page.locator("(//input[@type='text'])[2]")
    this.name = page.locator("(//input[@type='text'])[3]");
    this.coupon = page.locator("[name='coupon']");
    this.couponSubmit = page.locator("[type='submit']");

    this.selectCountry = page.locator("[placeholder*='Country']"); 
    this.dropdown = page.locator(".ta-results");

    this.optionsCount = this.dropdown.locator("button");

    this.userName = page.locator(".user__name [type='text']").first();
    this.submitButton = page.locator(".action__submit");

    this.confirmMessage = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");

  }

  async placeOrder(cvv, name, coupon, countryCode, countryName) {

    await this.cvv.fill(cvv);
    await this.name.fill(name);
    await this.coupon.fill(coupon);
    await this.couponSubmit.click();

    await this.page.waitForLoadState('networkidle'); 

    await this.selectCountry.click();
    await this.selectCountry.pressSequentially(countryCode,{delay: 300});
    await this.page.pause();
    await this.dropdown.waitFor();

    const count = await this.dropdown.locator("button").count();

    for(let i = 0; i< count ;++i){
        const text = await this.dropdown.locator("button").nth(i).textContent();
        if(text.trim() === countryName){
            await this.dropdown.locator("button").nth(i).click();
            break;  
        }
    }   
  }

  async verifyEmailId(email) {
    await expect( this.userName).toHaveText(email);
  }

  async submitAndGetOrderId(){
    
    await this.submitButton.click();
    await expect(this.confirmMessage).toHaveText(" Thankyou for the order. ");    
    const orderId = await this.orderId.textContent();
    console.log(orderId);

    return orderId; 
  }
}

module.exports = CheckoutPage;
