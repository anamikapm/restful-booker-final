import { test, expect, request } from '@playwright/test';
import bookings from '../../test-data/bookings.json';

test.describe('Booking API', () => {
  for (const { firstname, lastname } of bookings) {
    test(`Create booking for ${firstname} ${lastname}`, async ({ request }) => {
      const response = await request.post('/booking', {
        data: {
          firstname,
          lastname,
          totalprice: 200,
          depositpaid: true,
          bookingdates: {
            checkin: '2024-01-01',
            checkout: '2024-12-31',
          },
          additionalneeds: 'Lunch',
        },
      });

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body).toHaveProperty('bookingid');
    });
  }
});
