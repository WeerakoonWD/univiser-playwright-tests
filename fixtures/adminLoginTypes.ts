export interface AdminLoginTestCase {
  scenario: string;
  email: string;
  password: string;
  expectedType: 'incorrectUsername' | 'loginFailed';
}