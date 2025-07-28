import { test, expect } from '@playwright/test';

test('Invalid auth credentials should fail', async ({ request }) => {
  const response = await request.post('/auth', {
    data: { username: 'wrongUser', password: 'wrongPass' }
  });
  expect(response.status()).toBe(200); // Auth always returns 200 even if failed
  const res = await response.json();
  expect(res).not.toHaveProperty('token');
});
