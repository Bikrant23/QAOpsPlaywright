const { test, expect } = require('@playwright/test');

test('@web LoginPage Practise flow using inline locators', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // CSS locators target the input attributes observed on the login form.
  await page.locator("input[name='username']").fill('rahulshettyacademy');
  await page.locator("input[name='password']").fill('Learning@830$3mK2');
  await page.locator("input[type='checkbox']").check();

  // The Sign In control is an input whose value is "Sign In".
  await page.locator("input[value='Sign In']").click();

  await page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop');

  // Filter product cards by their displayed name, then assert the match is visible.
  const iphoneXProduct = page.locator('.card').filter({ hasText: 'iphone X' });
  await expect(iphoneXProduct).toBeVisible();
});
