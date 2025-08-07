import { test, expect } from '@playwright/test';

test('Update a booking record', async ({ request }) => {
  // Step 1: Create Booking
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

  // Step 2: Get a valid token
  const authRes = await request.post('/auth', {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });
  const token = (await authRes.json()).token;

  // Step 3: Update the booking with valid token
  const updateRes = await request.put(`/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${token}`,           // ✅ Use real token
      'Content-Type': 'application/json'  // ✅ Required header
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

  // Step 4: Assert the update status
  expect(updateRes.status()).toBe(200);
});
