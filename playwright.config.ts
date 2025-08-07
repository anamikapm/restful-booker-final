import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: {
    baseURL: 'https://restful-booker.herokuapp.com',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    launchOptions: {
      args: ['--start-maximized'],
    },
    viewport: null, // Important: disable default viewport so the browser can use full screen
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      }
    },
    /*
    {
      name: 'firefox',
      use: { browserName: 'firefox' }
    }
    */
  ],
  reporter: [
    ['list'],
    ['allure-playwright'],
  ],
});
