import { getRandomString } from '../../../helpers/test.helper.js';
import { test, expect } from '../../../fixtures/fixtures.js';

test.describe('Contact us tests', () => {
  test.describe('Contact us tests - positive', () => {
    test(
      'should successfully send the message through the contact form',
      { tag: ['@regression', '@positive', '@ui'] },
      async ({ contactPage }) => {
        await expect(contactPage.submitButton).toBeVisible();
        await contactPage.fillContactFormRandom(null, true);
        await contactPage.sendMessage();
        await expect(contactPage.succesTextLocator).toHaveText(contactPage.succesText);
        await contactPage.successButton.click();
        await expect(contactPage.homePageText).toBeVisible();
      },
    );
  });

  test.describe('Contact us tests - negative', () => {
    test(
      'should not send the message with invalid email',
      { tag: ['@regression', '@negative', '@ui'] },
      async ({ contactPage }) => {
        await expect(contactPage.submitButton).toBeVisible();
        const emailInvalid = getRandomString(5);
        await contactPage.emailInput.fill(emailInvalid);
        await contactPage.sendMessage();
        await expect(contactPage.validationEmail).toBeVisible();
      },
    );
  });
});
