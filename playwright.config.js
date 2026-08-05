import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 2 * 60 * 1000,

  reporter: [
    ['html'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['json', { outputFile: 'test-results/test-results.json' }],
    ['list'],
  ],


  use: {
    baseURL: process.env.BASE_URL,
    headless: true,

    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'api-tests',
      testMatch: /.*\.spec\.js/,
      grep: /@api/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'smoke-tests',
      testMatch: /.*\.spec\.js/,
      grep: /@smoke/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'regression-tests',
      testMatch: /.*\.spec\.js/,
      grep: /@regression/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],

});
