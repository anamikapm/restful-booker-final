import { test, expect } from '@playwright/test';
import { BookingPage } from '../../pages/BookingPage';

test('Fill booking form with valid details', async ({ page }) => {
  // Step 1: Navigate to the booking form page
  await page.goto('https://restful-booker.herokuapp.com/');

  // Step 2: Create instance of BookingPage
  const bookingPage = new BookingPage(page);

  // Step 3: Fill the form with valid inputs
  await bookingPage.fillForm(
    'Anamika',        // firstName
    'Mohan',          // lastName
    150,              // price
    'true',           // depositPaid: 'true' or 'false' as string
    '2025-08-01',     // checkin (YYYY-MM-DD)
    '2025-08-05',     // checkout (YYYY-MM-DD)
    'Breakfast'       // additionalNeeds
  );

  // Optional: Add assertions if there's a submit button or confirmation
  // Example: await page.click('button[type="submit"]');
  // await expect(page.locator('.success-message')).toHaveText('Booking created successfully');
});
