import { test, expect } from '@playwright/test';

test('Get list of bookings', async ({ request }) => {
  const res = await request.get('/booking');
  expect(res.status()).toBe(200);
  const bookings = await res.json();
  expect(bookings.length).toBeGreaterThan(0);
});
