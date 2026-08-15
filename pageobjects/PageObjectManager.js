const {LoginPage} = require('../pageobjects/loginPage');
const DashboardPage = require('../pageobjects/DashboardPage');
const CartPage = require('../pageobjects/CartPage');
const CheckoutPage = require('../pageobjects/CheckoutPage');
const MyOrderPage = require('../pageobjects/MyOrderPage');
const LoginPagePractisePage = require('../pageobjects/LoginPagePractisePage');


class PageObjectManager {

  constructor(page) {

    this.page = page;

    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.myOrderPage = new MyOrderPage(this.page);
    this.loginPagePractisePage = new LoginPagePractisePage(this.page);

  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getCartPage(){
    return this.cartPage;
  }

  getCheckoutPage(){
    return this.checkoutPage;
  }

  getMyOrderPage(){
    return this.myOrderPage;
  }

  getLoginPagePractisePage(){
    return this.loginPagePractisePage;
  }
}

module.exports = {PageObjectManager};
