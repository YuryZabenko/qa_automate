import { UserData } from '../test-data/user.data.js';
import { test } from '@playwright/test';

export class ProductCardComponents {
  constructor(page) {
    this.page = page;

    // product info
    this.productName = page.locator('.product-information h2');
    this.productCategory = page.locator('.product-information p').first();
    this.availability = page.locator('p:has-text("Availability:")');
    this.condition = page.locator('p:has-text("Condition:")');
    this.brand = page.locator('p:has-text("Brand:")');
    this.price = page.locator('.product-information span span');
    this.quantity = page.locator('#quantity');
    this.addButton = page.locator('.btn-default.cart');

    // review
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.reviewInput = page.locator('#review');
    /** @type {import('@playwright/test').Locator} */
    this.submitButton = page.locator('#button-review');
    this.alertLocator = page.locator(' .alert-success.alert span');
    this.alertText = 'Thank you for your review.';
  }

  /**
   * Заполняет форму отзыва валидными рандомными значениями и отправляет отзыв
   * @returns {Promise<void>}
   */
  async fillReview() {
    await test.step('Fill the fields in the form review', async () => {
      const data = UserData.getContactDataRandom();
      await this.nameInput.fill(data.name);
      await this.emailInput.fill(data.email);
      await this.reviewInput.fill(data.message);
      await this.submitButton.click();
    });
  }

  /**
   * Возвращает название товара
   * @returns {Promise<string>}
   */
  async getName() {
    return await test.step('Get name of product', async () => {
      return await this.productName.textContent();
    });
  }

  /**
   * Возвращает цену товара
   * @returns {Promise<number>}
   */
  async getPrice() {
    return await test.step('Get price of product', async () => {
      const priceText = await this.price.textContent();
      return parseInt(priceText.replace(/[^0-9]/g, ''));
    });
  }

  /**
   * Возвращает объект товара (название, цена)
   * @returns {Promise<{name: string, price: number}>}
   */
  async getProductInfo() {
    return await test.step('Get info of product', async () => {
      const name = await this.getName();
      const price = await this.getPrice();
      return { name: name, price: price };
    });
  }

  /**
   * Изменяет количество товара
   * @param quantity - количество товара
   * @returns {Promise<void>}
   */
  async changeQuantity(quantity) {
    await test.step('Change product quantity', async () => {
      await this.quantity.fill(quantity);
      await this.page.waitForLoadState('networkidle');
    });
  }

  /**
   * Добавляет товар в корзину
   * @returns {Promise<void>}
   */
  async addToCart() {
    await test.step('Add product to cart', async () => {
      await this.addButton.click();
      await this.page.waitForLoadState('networkidle');
    });
  }
}
