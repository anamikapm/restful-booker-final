import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  //retries: 1,
  timeout: 60000, 
  use: {
    baseURL: 'https://restful-booker.herokuapp.com',
    headless: false,
    //trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }
    },
    /*{
      name: 'firefox',
      use: { browserName: 'firefox' }
    }*/
  ],
  reporter: [
    ['list'],
    ['allure-playwright'],
  ],
});
