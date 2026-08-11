import { test, expect } from '@playwright/test';

test('Scri[t using Google Codegen', async ({ page }) => {
  await page.goto('https://workspace.google.com/');
  await page.locator('section').filter({ hasText: 'The better way to work Join' }).getByLabel('Get started with Google').click();
  await page.goto('https://workspace.google.com/');
  await page.getByRole('img', { name: 'Docs', exact: true }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('section').filter({ hasText: 'Online, collaborative' }).getByLabel('Sign in to use Google Docs').click();
  const page1 = await page1Promise;
  await page.pause();
});