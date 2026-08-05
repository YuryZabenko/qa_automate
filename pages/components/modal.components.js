import { CartPage } from '../cart.page.js';
import { test } from '@playwright/test';
import { BaseComponents } from './base.components.js';

export class ModalComponents extends BaseComponents {
  constructor(page) {
    super(page);
    this.page = page;

    this.viewCartButton = page.getByRole('link', { name: 'View Cart' });
    this.loginOrRegisterButton = page.getByRole('link', { name: 'Register / Login' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.continueOnCartButton = page.getByRole('button', { name: 'Continue On Cart' });
    /** @type {import('@playwright/test').Locator} */
    this.accesText = page.getByText('Your product has been added to cart.');
  }

  /**
   * Нажимает на переход в корзину, возвращает новый экземпляр страницы CartPage
   * @returns {Promise<CartPage>}
   */
  async viewCart() {
    return await test.step('Click view Cart in modal', async () => {
      await this.viewCartButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.viewCartButton.click();
      await this.waitLoad();
      return new CartPage(this.page);
    });
  }
}
