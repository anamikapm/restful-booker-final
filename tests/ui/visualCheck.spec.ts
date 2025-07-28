import { test, expect } from '@playwright/test';

test('Visual check of main page', async ({ page }) => {
  await page.goto('https://restful-booker.herokuapp.com');
  expect(await page.screenshot()).toMatchSnapshot('homepage.png');
});
