import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
console.log('ADMIN_BASE_URL is:', process.env.ADMIN_BASE_URL);

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'admin',
      testDir: './tests/admin',
      use: { ...devices['Desktop Chrome'], baseURL: process.env.ADMIN_BASE_URL },
    },
    {
      name: 'buddy',
      testDir: './tests/buddy',
      use: { ...devices['Desktop Chrome'], baseURL: process.env.BUDDY_BASE_URL },
    },
    {
      name: 'prospect',
      testDir: './tests/prospect',
      use: { ...devices['Desktop Chrome'], baseURL: process.env.PROSPECT_BASE_URL },
    },
    {
      name: 'support',
      testDir: './tests/support',
      use: { ...devices['Desktop Chrome'], baseURL: process.env.SUPPORT_BASE_URL },
    },
  ],
});