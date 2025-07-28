import { test, expect } from '@playwright/test';
import { BookingPage } from '../../pages/BookingPage';

test.describe('Full E2E Booking Flow API + UI Combo Tests', () => {

  let bookingId: number;
  let bookingData = {
    firstname: 'Anamika',
    lastname: 'Mohan',
    totalprice: 999,
    depositpaid: true,
    bookingdates: {
      checkin: '2025-08-01',
      checkout: '2025-08-15'
    },
    additionalneeds: 'Breakfast'
  };

  test('01 - Create Booking via API and store bookingId', async ({ request }) => {
    const response = await request.post('/booking', { data: bookingData });
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    bookingId = responseBody.bookingid;
    expect(bookingId).toBeGreaterThan(0);
  });

  test('02 - Fetch created booking via API and validate data', async ({ request }) => {
    const res = await request.get(`/booking/${bookingId}`);
    expect(res.status()).toBe(200);
    const resJson = await res.json();
    expect(resJson.firstname).toBe(bookingData.firstname);
    expect(resJson.lastname).toBe(bookingData.lastname);
  });

  test('03 - Open Booking App in browser and verify title', async ({ page }) => {
    await page.goto('https://restful-booker.herokuapp.com');
    await expect(page).toHaveTitle(/Restful-Booker/i);
  });

  test('04 - Scroll to bottom of the page', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500); // Just to simulate slow scroll
    expect(await page.title()).toContain('Restful');
  });

  test('05 - Fill UI booking form with sample data', async ({ page }) => {
    const bookingPage = new BookingPage(page);
    await bookingPage.fillForm('Achu', 'Mohan', 500, 'true', '2025-09-01', '2025-09-10', 'Lunch');
    await expect(page.locator('input[name="firstname"]')).toHaveValue('Achu');
  });

  test('06 - Visual check: take screenshot of booking form section', async ({ page }) => {
    const formSection = page.locator('form');
    await expect(formSection).toBeVisible();
    await expect(await formSection.screenshot()).toMatchSnapshot('booking-form.png');
  });

  test('07 - Retry Logic: Intentionally flaky element', async ({ page }) => {
    await page.goto('https://restful-booker.herokuapp.com');
    const locator = page.locator('h1'); // Non-existent sometimes
    await expect(locator).toHaveText(/Welcome/i, { timeout: 3000 }); // Will retry if not found
  });

  test('08 - Create multiple bookings using loop', async ({ request }) => {
    const names = ['Sree', 'Nila', 'Kiran'];
    for (const name of names) {
      const res = await request.post('/booking', {
        data: {
          ...bookingData,
          firstname: name
        }
      });
      expect(res.ok()).toBeTruthy();
    }
  });

  test('09 - Update booking via API and validate response', async ({ request }) => {
    const res = await request.put(`/booking/${bookingId}`, {
      headers: {
        Cookie: 'token=abc123' // Use valid token if needed
      },
      data: {
        ...bookingData,
        firstname: 'Anu',
        lastname: 'Updated'
      }
    });
    expect(res.status()).toBe(200);
    const updated = await res.json();
    expect(updated.firstname).toBe('Anu');
  });

  test('10 - Delete booking via API and confirm deletion', async ({ request }) => {
    const res = await request.delete(`/booking/${bookingId}`, {
      headers: { Cookie: 'token=abc123' }
    });
    expect(res.status()).toBe(201);
  });

  test('11 - Confirm deleted booking no longer exists', async ({ request }) => {
    const res = await request.get(`/booking/${bookingId}`);
    expect(res.status()).toBe(404);
  });

  test('12 - Create booking + Validate UI Form Interaction Combo', async ({ page, request }) => {
    // API create
    const res = await request.post('/booking', {
      data: {
        ...bookingData,
        firstname: 'Combo',
        lastname: 'Check'
      }
    });
    const id = (await res.json()).bookingid;
    expect(id).toBeDefined();

    // UI validate
    await page.goto('https://restful-booker.herokuapp.com');
    const bookingPage = new BookingPage(page);
    await bookingPage.fillForm('Combo', 'Check', 700, 'true', '2025-10-01', '2025-10-15', 'Dinner');

    const firstName = await page.locator('input[name="firstname"]').inputValue();
    const lastName = await page.locator('input[name="lastname"]').inputValue();
    expect(firstName).toBe('Combo');
    expect(lastName).toBe('Check');
  });

});
