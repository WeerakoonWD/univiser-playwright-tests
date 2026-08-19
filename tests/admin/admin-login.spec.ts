import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../../pages/admin/AdminLoginPage';
import { readCsvData } from '../../utils/csvReader';
import { AdminLoginTestCase } from '../../fixtures/adminLoginTypes';

const loginTestData = readCsvData<AdminLoginTestCase>('fixtures/admin-login-data.csv');

test.describe('Admin Login Test', () => {
  let loginPage: AdminLoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new AdminLoginPage(page);
    await loginPage.goto();
  });

  for (const data of loginTestData) {
    test(`${data.scenario} scenario`, async () => {
      await loginPage.login(data.email, data.password);

      if (data.expectedType === 'incorrectUsername') {
        await loginPage.expectIncorrectUsername();
      } else {
        await loginPage.expectLoginFailed();
      }
    });
  }
});