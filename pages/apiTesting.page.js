import { BasePage } from './base.page.js';

export class ApiTestingPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    this.titleText = 'APIs List for practice';
    /** @type {import('@playwright/test').Locator} */
    this.titleTextLocator = page.locator('.title.text-center');
  }
}
