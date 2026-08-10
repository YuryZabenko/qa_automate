import { test, expect } from '../../../fixtures/fixtures.js';
import { ApiHelper } from '../../../helpers/api.helper.js';

test.describe('Login tests', () => {
  test.describe('Login tests - positive', () => {
    test(
      'should login and logout user with correct email and password',
      { tag: ['@smoke', '@regression', '@positive', '@ui'] },
      async ({ loginPage }) => {
        await expect(loginPage.loginText).toBeVisible();
        const user = await loginPage.loginUser(true);
        await expect(loginPage.loggedText).toBeVisible();
        await loginPage.clickElement(loginPage.header.logoutButton, 'logout');
        await expect(loginPage.loginText).toBeVisible();
        await ApiHelper.deleteUser(user.email, user.password);
      },
    );
  });

  test.describe('Login tests - negative', () => {
    test(
      'should not login user with incorrect email and password',
      { tag: ['@regression', '@negative', '@ui'] },
      async ({ loginPage }) => {
        await expect(loginPage.loginText).toBeVisible();
        await loginPage.loginUser(false);
        await expect(loginPage.incorrectEmailText).toBeVisible();
      },
    );
  });
});
