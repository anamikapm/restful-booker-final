import { test, expect } from '@playwright/test';

test('Visual check of main page', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  expect(await page.screenshot()).toMatchSnapshot('homepage.png', {
    maxDiffPixelRatio: 0.2, // Allows 20% pixel difference
  });
});
