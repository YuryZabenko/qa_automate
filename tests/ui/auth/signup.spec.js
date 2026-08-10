import { test, expect } from '../../../fixtures/fixtures.js';
import { ApiHelper } from '../../../helpers/api.helper.js';

test.describe('Signup tests', () => {
  test.describe('Signup tests - positive', () => {
    test(
      'should register random user and delete him',
      { tag: ['@smoke', '@regression', '@positive', '@ui'] },
      async ({ loginPage }) => {
        await expect(loginPage.newUserText).toBeVisible();
        const user = await loginPage.signUpUser(true);
        await expect(loginPage.enterInformationText).toBeVisible();
        const newUser = await loginPage.createAccountRandom();
        user.password = newUser.password;
        await expect(loginPage.accountCreatedText).toBeVisible();
        await loginPage.continueButton.click();
        await expect(loginPage.loggedText).toBeVisible();
        await loginPage.header.deleteAccountButton.click();
        await expect(loginPage.deletedText).toBeVisible();
        await ApiHelper.deleteUser(user.email, user.password);
      },
    );
  });

  test.describe('Signup tests - negative', () => {
    test(
      'should not register user with existing email',
      { tag: ['@regression', '@negative', '@ui'] },
      async ({ loginPage }) => {
        await expect(loginPage.newUserText).toBeVisible();
        await loginPage.signUpUser(false);
        await expect(loginPage.emailExistText).toBeVisible();
      },
    );
  });
});
