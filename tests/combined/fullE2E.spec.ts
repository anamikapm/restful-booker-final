import { test, expect } from '@playwright/test';
import { BookingPage } from '../../pages/BookingPage';

let bookingId: number;

const bookingData = {
  firstname: 'Anamika',
  lastname: 'Mohan',
  totalprice: 750,
  depositpaid: true,
  bookingdates: {
    checkin: '2025-09-01',
    checkout: '2025-09-05'
  },
  additionalneeds: 'Dinner'  
};

test.describe('Full E2E Booking API + UI Flow', () => {

  test('E2E 01 - Create Booking via API and Validate Presence on UI', async ({ request, page }) => {
    // Step 1: Create booking via API
    const apiResponse = await request.post('/booking', { data: bookingData });
    expect(apiResponse.ok()).toBeTruthy();
    const json = await apiResponse.json();
    bookingId = json.bookingid;

    // Step 2: Navigate to UI and verify presence
    await page.goto('https://automationintesting.online');
    const bookingPage = new BookingPage(page);
    await bookingPage.scrollToBottom();
    await bookingPage.validateFormVisible();

    // Step 3: Check if any element on UI has matching name (basic validation)
    const bookingCard = page.locator(`.row .col .booking .booking-details:has-text("${bookingData.firstname}")`);
    await expect(bookingCard).toContainText(bookingData.firstname);

    await page.screenshot({ path: 'screenshots/api-to-ui-booking.png', fullPage: true });
  });

  test('E2E 02 - Submit Booking via UI and Confirm via API', async ({ request, page }) => {
  await page.goto('https://automationintesting.online');
  const bookingPage = new BookingPage(page);
  await bookingPage.scrollToBottom();
  await bookingPage.validateFormVisible();
  await bookingPage.booking();
  await bookingPage.fillForm('Arjun', 'Mohan', 'arjun@test.com', 9876543210);
  await page.click('button:has-text("Reserve Now")');

  // Wait for form to reset after success
  await expect(page.locator('#form input[name="firstname"]')).toHaveValue('');

  // Step 3: Validate via API (optional check if data syncing works)
  const getAllBookings = await request.get('/booking');
  const allBookings = await getAllBookings.json();

  const newlyCreated = allBookings.find((booking: any) => booking.firstname === 'Arjun' && booking.lastname === 'Mohan');
  expect(newlyCreated).toBeTruthy();

  await page.screenshot({ path: 'screenshots/ui-to-api-booking.png', fullPage: true });
});

});
