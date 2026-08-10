import { BasePage } from './base.page.js';

export class TestCasesPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    this.titleText = 'Test Cases';
    /** @type {import('@playwright/test').Locator} */
    this.titleTextLocator = page.locator('.title.text-center');
  }
}
