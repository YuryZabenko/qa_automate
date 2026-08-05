import { getRandomEmail, getRandomString } from '../../helpers/test.helper.js';
import { test } from '@playwright/test';
import { BaseComponents } from './base.components.js';

export class FooterComponents extends BaseComponents {
  constructor(page) {
    super(page);

    this.emailInput = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
    /** @type {import('@playwright/test').Locator} */
    this.subscribeTextLocator = page.locator('#success-subscribe');
    this.subscribeText = 'You have been successfully subscribed!';
    /** @type {import('@playwright/test').Locator} */
    this.validationEmail = page.locator('#susbscribe_email:invalid');
  }

  /**
   * Подписаться на рассылку с (валидным / невалидным) email
   * @param {boolean} valid - true / false (валидный / невалидный) email
   * @returns {Promise<void>}
   */
  async subscribeNewsletter(valid) {
    await test.step(`Subscribe to the newsletter with ${valid} email`, async () => {
      let email;
      if (valid) {
        email = getRandomEmail();
      } else {
        email = getRandomString(8);
      }
      await this.emailInput.fill(email);
      await this.subscribeButton.click();
    });
  }
}
