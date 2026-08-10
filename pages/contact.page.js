import { BasePage } from './base.page.js';
import { UserData } from '../test-data/user.data.js';
import { test } from '@playwright/test';

export class ContactPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    this.title = 'Automation Exercise - Contact Us';
    this.pathToTestFile = './test-files/test.file.txt';
    /** @type {import('@playwright/test').Locator} */
    this.submitButton = page.locator('input[data-qa="submit-button"]');
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.subjectInput = page.locator('input[data-qa="subject"]');
    this.messageInput = page.locator('textarea[data-qa="message"]');
    this.selectFileButton = page.locator('input[name="upload_file"]');
    this.succesText = 'Success! Your details have been submitted successfully.';
    /** @type {import('@playwright/test').Locator} */
    this.succesTextLocator = page.locator('//*[@class="status alert alert-success"]');
    this.successButton = page.locator('//*[@class="btn btn-success"]');
    /** @type {import('@playwright/test').Locator} */
    this.homePageText = page.getByText('Features Items');
    /** @type {import('@playwright/test').Locator} */
    this.validationEmail = page.locator('[data-qa="email"]:invalid');
  }

  /**
   * Заполнить поля формы отправки
   * @param {object} user - существующий юзер (если нет, то рандомный)
   * @param {boolean} addFile - добавить файл в форму отправки
   * @returns {Promise<void>}
   */
  async fillContactFormRandom(user = null, addFile = false) {
    await test.step('Fill contact form', async () => {
      const contactUser = user || UserData.getContactDataRandom();
      await this.nameInput.fill(contactUser.name);
      await this.emailInput.fill(contactUser.email);
      await this.subjectInput.fill(contactUser.subject);
      await this.messageInput.fill(contactUser.message);
      if (addFile) {
        await this.addFile();
      }
    });
  }

  /**
   * Добавить файл в форму отправки
   */
  async addFile() {
    await test.step('Add file in contact form', async () => {
      await this.selectFileButton.setInputFiles(this.pathToTestFile);
    });
  }

  /**
   * Отправка сообщения (нажать "Submit", подтвердить диалог)
   */
  async sendMessage() {
    await test.step('Send message in contact form', async () => {
      this.page.on('dialog', async (dialog) => {
        await dialog.accept();
      });
      await this.page.waitForLoadState('domcontentloaded');
      await this.submitButton.click();
    });
  }
}
