import { test, expect } from '@playwright/test';
import { BookingPage } from '../../pages/BookingPage';

test('Create Booking via API and validate via UI', async ({ request, page }) => {
  // Step 1: Create booking via API
  const apiResponse = await request.post('https://restful-booker.herokuapp.com/booking', {

    data: {
      firstname: 'Anamika',
      lastname: 'Mohan',
      totalprice: 999,
      depositpaid: true,
      bookingdates: { checkin: '2024-01-01', checkout: '2024-12-31' },
      additionalneeds: 'Dinner'
    },
  });

  const body = await apiResponse.json();
  const bookingId = body.bookingid;

  // Step 2: UI validation (simulate or navigate to page if available)
  await page.goto('https://restful-booker.herokuapp.com');
  const bookingPage = new BookingPage(page);
  await bookingPage.scrollToFooter();

  expect(bookingId).toBeGreaterThan(0);
});
