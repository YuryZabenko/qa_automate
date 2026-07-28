import { HeaderComponents } from '../components/header.components.js';
import { FooterComponents } from '../components/footer.components.js';
import { test } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
    this.header = new HeaderComponents(page);
    this.footer = new FooterComponents(page);

    this.scrollUpButton = page.locator('#scrollUp');
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
   * Получить название страницы
   * @returns {Promise<*>}
   */
  async getTitle() {
    return await test.step('Get tittle of page', async () => {
      await this.page.waitForLoadState({ state: 'networkidle' });
      return await this.page.title();
    });
  }

  /**
   * Нажимает кнопку возврата в начало страницы
   * @returns {Promise<void>}
   */
  async scrollUp() {
    await test.step('Scroll page up', async () => {
      await this.scrollUpButton.click();
    });
  }

  /**
   * Ожидание загрузки страницы
   * @returns {Promise<void>}
   */
  async waitLoad() {
    await this.page.waitForLoadState({ state: 'networkidle' });
  }
}
