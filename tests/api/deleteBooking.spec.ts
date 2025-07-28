import { test, expect } from '@playwright/test';

test('Delete a booking and confirm it is deleted', async ({ request }) => {
  const createRes = await request.post('/booking', {
    data: {
      firstname: 'ToDelete',
      lastname: 'User',
      totalprice: 100,
      depositpaid: false,
      bookingdates: { checkin: '2024-05-01', checkout: '2024-06-01' },
      additionalneeds: 'None'
    }
  });
  const bookingId = (await createRes.json()).bookingid;

  const delRes = await request.delete(`/booking/${bookingId}`, {
    headers: { Cookie: 'token=abc123' }
  });
  expect(delRes.status()).toBe(201);
});
