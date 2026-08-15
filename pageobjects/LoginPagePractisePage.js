const { expect } = require('@playwright/test');

class LoginPagePractisePage {

  constructor(page) {
    this.page = page;

    this.username = page.locator("input[name='username']");
    this.password = page.locator("input[name='password']");
    this.checkbox = page.locator("input[type='checkbox']");
    this.signInButton = page.locator("button:has-text('Sign In')");
    this.productCards = page.locator('.card');
    this.iphoneXProduct = page.locator('.card').filter({ hasText: 'iphone X' });
  }

  async gotoLoginPage() {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.checkbox.check();
    await this.signInButton.click();
    await this.page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop', { timeout: 20000 });
  }

  async verifyIphoneXProduct() {
    await expect(this.iphoneXProduct).toBeVisible();
  }
}

module.exports = LoginPagePractisePage;
