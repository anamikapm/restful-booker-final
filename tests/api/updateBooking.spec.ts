import { test, expect } from '@playwright/test';

test('Update a booking record', async ({ request }) => {
  const createRes = await request.post('/booking', {
    data: {
      firstname: 'Anamika',
      lastname: 'M',
      totalprice: 500,
      depositpaid: false,
      bookingdates: { checkin: '2024-01-01', checkout: '2024-12-31' },
      additionalneeds: 'Breakfast'
    }
  });
  const bookingId = (await createRes.json()).bookingid;

  const updateRes = await request.put(`/booking/${bookingId}`, {
    headers: {
      Cookie: 'token=abc123' // Replace with real token if needed
    },
    data: {
      firstname: 'Updated',
      lastname: 'Name',
      totalprice: 750,
      depositpaid: true,
      bookingdates: { checkin: '2024-02-01', checkout: '2024-12-01' },
      additionalneeds: 'Dinner'
    }
  });
  expect(updateRes.status()).toBe(200);
});
