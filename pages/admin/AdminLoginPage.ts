import { Page, Locator, expect } from '@playwright/test';

export class AdminLoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorNotification: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#basic_email');
    this.passwordInput = page.locator('#basic_password');
    this.loginButton = page.getByRole('button', { name: 'Sign in' });
    this.errorNotification = page.locator('.ant-notification-notice-description');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    const captchaFrame = this.page.locator('iframe');
    if (await captchaFrame.count() > 0) {
      console.warn('CAPTCHA iframe detected on page.');
    }

    await this.loginButton.click();
  }

  async expectErrorMessage(message: string) {
    await this.errorNotification.waitFor({ state: 'visible', timeout: 10_000 });
    await expect(this.errorNotification).toContainText(message);
  }

  async expectLoginFailed() {
    await this.expectErrorMessage('Failed to login');
  }

  async expectIncorrectUsername() {
    await this.expectErrorMessage("couldn't find that email address");
  }
}