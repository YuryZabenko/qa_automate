import { test, expect } from '../../../fixtures/fixtures.js';

test.describe('Subscription tests', () => {
  test.describe('Subscription tests - positive', () => {
    test(
      'should subscribe with valid email from homepage',
      { tag: ['@regression', '@positive', '@ui'] },
      async ({ homePage }) => {
        await homePage.footer.subscribeNewsletter(true);
        await expect(await homePage.footer.subscribeTextLocator).toHaveText(homePage.footer.subscribeText);
      },
    );
  });

  test.describe('Subscription tests - negative', () => {
    test(
      'should not subscribe with invalid email from homepage',
      { tag: ['@regression', '@negative', '@ui'] },
      async ({ homePage }) => {
        await homePage.footer.subscribeNewsletter(false);
        await homePage.waitLoad();
        await expect(homePage.footer.validationEmail).toBeVisible();
        await expect(await homePage.footer.subscribeTextLocator).toBeHidden();
      },
    );
  });
});
