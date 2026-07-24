import {getRandomEmail} from "../helpers/test.helper.js";
import {test} from "@playwright/test";

export class FooterComponents {
  constructor(page) {
    this.emailInput = page.locator(`#susbscribe_email`);
    this.subscribeButton = page.locator(`#subscribe`);
    this.subscribeTextLocator = page.locator(`.alert-success alert`);
    this.subscribeText = `You have been successfully subscribed!`
  }

  /**
   * Подписаться на рассылку
   * @returns {Promise<void>}
   */
  async subscribe() {
    await test.step('Subscribe to the newsletter', async () => {
      const email = getRandomEmail();
      await this.emailInput.fill(email);
      await this.subscribeButton.click();
    })
  }
}