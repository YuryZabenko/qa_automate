import { HeaderComponents } from './components/header.components.js';
import { FooterComponents } from './components/footer.components.js';
import { test } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
    this.header = new HeaderComponents(page);
    this.footer = new FooterComponents(page);
  }

  /**
   * Переход на страницу сайта
   * @returns {Promise<void>}
   */
  async open() {
    await test.step('Go to Main Page', async () => {
      await this.page.goto('');
    });
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

  /**
   * Ожидание загрузки страницы
   * @returns {Promise<void>}
   */
  async waitLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}
