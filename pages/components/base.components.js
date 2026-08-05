import { test } from '@playwright/test';

export class BaseComponents {
  constructor(page) {
    this.page = page;
  }

  /**
   * Универсальная функция для клика по элементу
   * @param {import('@playwright/test').Locator} element - локатор элемента
   * @param {string} elementName - название элемента для логирования
   * @returns {Promise<void>}
   */
  async clickElement(element, elementName) {
    await test.step(`Click on element: ${elementName}`, async () => {
      await this.waitLoad();
      await element.waitFor({ state: 'visible', timeout: 15000 });
      await element.click();
    });
  }

  async waitLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}
