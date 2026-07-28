import { test } from '@playwright/test';

export class ProductsComponents {
  constructor(page) {
    this.page = page;

    this.products = page.locator('//*[@class="product-image-wrapper"]');
    this.addToCartButton = page.locator('//*[@class="btn btn-default add-to-cart"]');
    this.viewProductButton = page.getByRole('link', { name: 'View Product' });

    this.productPrice = page.locator('//div[contains(@class, "productinfo")]//h2');
    this.productName = page.locator('//div[contains(@class, "productinfo")]//p');

    this.titleTextLocator = page.locator('.title.text-center');
    this.titleText = 'All Products';
  }

  /**
   * Переходит в карточку товара
   * @param position - позиция товара на странице (1, 2 ...)
   * @returns {Promise<void>}
   */
  async viewProduct(position) {
    await test.step(`Click to view product № ${position}`, async () => {
      await this.viewProductButton.nth(position - 1).click();
    });
  }

  /**
   * Добавляет товар в корзину
   * @param position - позиция товара на странице (1, 2 ...)
   * @returns {Promise<void>}
   */
  async addToCart(position) {
    await test.step(`Add product № ${position} to cart`, async () => {
      await this.products.nth(position - 1).hover();
      await this.addToCartButton.nth(position).waitFor({ state: 'visible' });
      await this.addToCartButton.nth(position).click();
    });
  }

  /**
   * Возвращает цену товара, указанную на карточке товара
   * @param position - позиция товара на странице (1, 2 ...)
   * @returns {Promise<number>}
   */
  async getProductPrice(position) {
    return await test.step(`Get price of product № ${position}`, async () => {
      const priceText = await this.productPrice.nth(position - 1).textContent();
      return parseInt(priceText.replace(/[^0-9]/g, ''));
    });
  }

  /**
   * Возвращает название товара, указанное на карточке товара
   * @param position - позиция товара на странице (1, 2 ...)
   * @returns {Promise<string>}
   */
  async getProductName(position) {
    return await test.step(`Get name of product № ${position}`, async () => {
      return await this.productName.nth(position - 1).textContent();
    });
  }

  /**
   * Возвращает объект товара на странице
   * @param position - позиция товара на странице (1, 2 ...)
   * @returns {Promise<{name: string, price: number}>}
   */
  async getProductInfo(position) {
    return await test.step(`Get info of product № ${position}`, async () => {
      const name = await this.getProductName(position);
      const price = await this.getProductPrice(position);
      return { name: name, price: price };
    });
  }

  /**
   * Возвращает количество товаров на странице
   * @returns {Promise<number>}
   */
  async getProductsCount() {
    return await test.step('Get products count', async () => {
      return await this.products.count();
    });
  }
}
