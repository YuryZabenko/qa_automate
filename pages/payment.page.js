import { BasePage } from './base.page.js';
import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export class PaymentPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.filePath = path.join(process.cwd(), 'test-files', 'downloads');

    this.nameOnCardInput = page.locator('input[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('input[data-qa="card-number"]');
    this.cvcInput = page.locator('input[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
    this.payButton = page.locator('#submit');

    /** @type {import('@playwright/test').Locator} */
    this.confirmedTextLocator = page.locator('p:has-text("Congratulations! Your order has been confirmed!")');
    /** @type {import('@playwright/test').Locator} */
    this.downloadInvoiceButton = page.locator('a:has-text("Download Invoice")');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  /**
   * Заполнить поля и нажать оплатить заказ
   * @param data
   * @returns {Promise<void>}
   */
  async payOrder(data) {
    await test.step('Fill order info and pay', async () => {
      await this.nameOnCardInput.fill(data.name);
      await this.cardNumberInput.fill(data.cardNumber);
      await this.cvcInput.fill(data.cvc);
      await this.expiryMonthInput.fill(data.month);
      await this.expiryYearInput.fill(data.year);
      await this.payButton.click();
    });
  }

  /**
   * Скачать инвойс
   * @returns {Promise<string>} - путь к скачанному файлу
   */
  async downloadInvoice() {
    return await test.step('Download invoice', async () => {
      await this.downloadInvoiceButton.waitFor({ state: 'visible', timeout: 10000 });
      const [download] = await Promise.all([
        this.page.waitForEvent('download', { timeout: 10000 }),
        this.downloadInvoiceButton.click(),
      ]);
      if (!fs.existsSync(this.filePath)) {
        fs.mkdirSync(this.filePath, { recursive: true });
      }
      const fileName = download.suggestedFilename();
      const filePath = `${this.filePath}/${fileName}`;
      await download.saveAs(filePath);
      return filePath;
    });
  }
}
