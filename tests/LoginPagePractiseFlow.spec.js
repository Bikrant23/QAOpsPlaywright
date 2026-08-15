const { test, expect } = require('@playwright/test');
const { PageObjectManager } = require('../pageobjects/PageObjectManager');

test('@web LoginPage Practise flow navigates to shop and shows iPhone X', async ({ page }) => {
  const pageObjectManager = new PageObjectManager(page);
  const loginPagePractisePage = pageObjectManager.getLoginPagePractisePage();

  await loginPagePractisePage.gotoLoginPage();
  await loginPagePractisePage.login('rahulshettyacademy', 'learning');
  await loginPagePractisePage.verifyIphoneXProduct();

  await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
  await expect(page.locator('.card')).toContainText('iphone X');
});
