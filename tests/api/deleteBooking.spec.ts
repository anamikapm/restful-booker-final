import { test, expect } from '@playwright/test';

test('Delete a booking and confirm it is deleted', async ({ request }) => {
  // Step 1: Create a new booking
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

  // Step 2: Get auth token
  const authRes = await request.post('/auth', {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });
  const token = (await authRes.json()).token;

  // Step 3: Delete booking using the valid token
  const delRes = await request.delete(`/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${token}`
    }
  });

  // Step 4: Expect 201 (successful deletion)
  expect(delRes.status()).toBe(201);
});
