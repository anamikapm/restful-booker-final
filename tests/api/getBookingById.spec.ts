import { test, expect } from '@playwright/test';

test('Fetch a booking by ID', async ({ request }) => {
  const createRes = await request.post('/booking', {
    data: {
      firstname: 'FetchMe',
      lastname: 'Test',
      totalprice: 300,
      depositpaid: true,
      bookingdates: { checkin: '2024-03-01', checkout: '2024-07-01' },
      additionalneeds: 'WiFi'
    }
  });
  const bookingId = (await createRes.json()).bookingid;

  const getRes = await request.get(`/booking/${bookingId}`);
  expect(getRes.status()).toBe(200);
  const data = await getRes.json();
  console.log(expect(data.firstname).toBe('FetchMe'));

});
