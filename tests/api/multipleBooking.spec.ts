import { test, expect } from '@playwright/test';

const names = ['Arjun', 'Mohan', 'Aravind', 'Raisy'];

for (const name of names) {
  test(`Create booking for ${name}`, async ({ request }) => {
    const res = await request.post('/booking', {
      data: {
        firstname: name,
        lastname: 'Test',
        totalprice: 400,
        depositpaid: true,
        bookingdates: { checkin: '2024-01-01', checkout: '2024-12-01' },
        additionalneeds: 'Breakfast'
      }
    });
    expect(res.status()).toBe(200);
  });
}
