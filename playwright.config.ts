import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: {
    baseURL: process.env.BASE_URL,
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
