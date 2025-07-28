import { test, expect } from '@playwright/test';

test('Retry test simulation', async ({ page }) => {
  await page.goto('https://restful-booker.herokuapp.com');
  const header = page.locator('h1');

  // This will fail if h1 doesn't exist to demonstrate retry
  await expect(header).toHaveText(/Welcome/i);
});
