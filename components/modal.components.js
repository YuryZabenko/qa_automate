import {CartPage} from "../pages/cart.page.js";
import {test} from "@playwright/test";

export class ModalComponents {
  constructor(page) {
    this.page = page;
    this.viewCartButton = page.getByRole('link', {name: 'View Cart'});
    this.continueShoppingButton = page.getByRole('button', {name: 'Continue Shopping'});
  }

  /**
   * Нажимает 'продолжить покупки'
   * @returns {Promise<void>}
   */
  async continueShopping() {
    await test.step('Click continue shopping in modal', async () => {
      await this.continueShoppingButton.click();
    })
  }

  /**
   * Нажимает на переход в корзину, возвращает новый экземпляр страницы CartPage
   * @returns {Promise<CartPage>}
   */
  async viewCart() {
    return await test.step('Click view Cart in modal', async () => {
      await this.viewCartButton.click();
      return new CartPage(this.page);
    })
  }
}