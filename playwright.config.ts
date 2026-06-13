import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
  baseURL: process.env.BASE_URL_UI,
  testIdAttribute: 'data-test',
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
  video: 'on-first-retry',
},

  projects: [
    {
      name: 'ui',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'] },
    },
    {
  name: 'api',
  testDir: './tests/api',
  use: {
    baseURL: process.env.BASE_URL_API,
  },
},
  ],
});