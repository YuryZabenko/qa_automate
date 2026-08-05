import { test } from '@playwright/test';
import { BaseComponents } from './base.components.js';
import { cleanPrice } from '../../helpers/test.helper.js';
import { ProductDetailPage } from '../productDetail.page.js';

export class ProductListComponents extends BaseComponents {
  constructor(page) {
    super(page);
    this.page = page;

    this.products = page.locator('//*[@class="product-image-wrapper"]');
    this.openProductButton = page.getByRole('link', { name: 'View Product' });

    this.productPrice = page.locator('//div[contains(@class, "productinfo")]//h2');
    this.productName = page.locator('//div[contains(@class, "productinfo")]//p');

    /** @type {import('@playwright/test').Locator} */
    this.titleTextLocator = page.locator('.title.text-center');
    this.titleText = 'All Products';

    this.addProductOverlayLocator = '.product-overlay .btn.btn-default.add-to-cart';
  }

  /**
   * Переходит в карточку товара
   * @param position - позиция товара на странице (1, 2 ...)
   * @returns {Promise<ProductDetailPage>}
   */
  async openProduct(position) {
    return await test.step(`Click to view product № ${position}`, async () => {
      await this.openProductButton.nth(position - 1).click();
      return new ProductDetailPage(this.page);
    });
  }

  /**
   * Добавляет товар в корзину
   * @param position - позиция товара на странице (1, 2 ...)
   * @returns {Promise<void>}
   */
  async addToCart(position) {
    await test.step(`Add product № ${position} to cart`, async () => {
      const product = this.products.nth(position - 1);
      await product.locator('..').locator(this.openProductButton).scrollIntoViewIfNeeded();
      await product.hover();
      const addButton = product.locator('..').locator(this.addProductOverlayLocator);
      await addButton.waitFor({ state: 'visible', timeout: 5000 });
      await addButton.dispatchEvent('click');
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
      return cleanPrice(priceText);
    });
  }

  /**
   * Возвращает название товара, указанное на карточке товара
   * @param position - позиция товара на странице (1, 2 ...)
   * @returns {Promise<string>}
   */
  async getProductName(position) {
    return await test.step(`Get name of product № ${position}`, async () => {
      const result = await this.productName.nth(position - 1).textContent();
      return result.toLowerCase();
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
    return await test.step('Get products count', async () => await this.products.count());
  }
}
