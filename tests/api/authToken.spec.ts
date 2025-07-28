import { test, expect } from '@playwright/test';

test('Create auth token', async ({ request }) => {
  const response = await request.post('/auth', {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });
  expect(response.ok()).toBeTruthy();
  const res = await response.json();
  expect(res).toHaveProperty('token');
});
