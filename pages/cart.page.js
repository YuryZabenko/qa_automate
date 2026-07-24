import {BasePage} from "./base.page.js";
import {test} from "@playwright/test";

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.title = 'Automation Exercise - Checkout';

    this.proceedButton = page.getByText('Proceed To Checkout');
    this.cartPrice = page.locator(`//*[@class='cart_price']`);
    this.cartQuantity = page.locator(`//*[@class='cart_quantity']//*[@class='disabled']`);
    this.cartTotalPrice = page.locator(`//*[@class='cart_total_price']`);
    this.cartDeleteButton = page.locator(`//*[@class='cart_quantity_delete']`);
    this.cartName = page.locator(`//td[contains(@class, "cart_description")]//a`);

  }

  /**
   * Нажимает кнопку удаления товара из корзины
   * @param position - позиция товара в корзине (1, 2 ...)
   * @returns {Promise<void>}
   */
  async deleteProduct(position) {
    await test.step(`Delete product № ${position}`, async () => {
      await this.cartDeleteButton.nth(position - 1).hover();
      await this.cartDeleteButton.nth(position - 1).click();
      await this.waitLoad();
    })
  }

  /**
   * Возвращает название товара, указанное в корзине
   * @param position - позиция товара в корзине (1, 2 ...)
   * @returns {Promise<string>}
   */
  async getNameProduct(position) {
    return await test.step(`Get name of product № ${position}`, async () => {
      return await this.cartName.nth(position - 1).textContent();
    })
  }

  /**
   * Возвращает количество товара, указанное в корзине
   * @param position - позиция товара в корзине (1, 2 ...)
   * @returns {Promise<number>}
   */
  async getQuantityOfProduct(position) {
    return await test.step(`Get quantity of product № ${position}`, async () => {
      const productQuantity = await this.cartQuantity.nth(position - 1).textContent();
      return parseInt(productQuantity);
    })
  }

  /**
   * Возвращает цену товара, указанную в корзине
   * @param position - позиция товара в корзине (1, 2 ...)
   * @returns {Promise<number>}
   */
  async getPriceOfProduct(position) {
    return await test.step(`Get price of product № ${position}`, async () => {
      const productPrice = await this.cartPrice.nth(position - 1).textContent();
      return parseInt(productPrice.replace(/[^0-9]/g, ''));
    })
  }

  /**
   * Возвращает общую сумму товара, указанную в корзине
   * @param position - позиция товара в корзине (1, 2 ...)
   * @returns {Promise<number>}
   */
  async getTotalPriceOfProduct(position) {
    return await test.step(`Get total price of product № ${position}`, async () => {
      const productTotal = await this.cartTotalPrice.nth(position - 1).textContent();
      return parseInt(productTotal.replace(/[^0-9]/g, ''));
    })
  }

  /**
   * Возвращает объект товара в корзине {name, price}
   * @param position - позиция товара в корзине (1, 2 ...)
   * @returns {Promise<{name: *, price: number}>}
   */
  async getProductInfo(position) {
    return await test.step(`Get info of product № ${position}`, async () => {
      const name = await this.getNameProduct(position);
      const price = await this.getPriceOfProduct(position);
      return {name: name, price: price}
    })
  }

  /**
   * Возвращает массив объектов всех товаров в корзине [{name, price}]
   * @returns {Promise<*[]>}
   */
  async getAllCartProducts() {
    return await test.step(`Get all products in cart`, async () => {
      const cartProducts = [];
      const productCount = await this.cartName.count();
      for (let i = 1; i <= productCount; i++) {
        cartProducts.push(await this.getProductInfo(i));
      }
      return cartProducts;
    })
  }

  /**
   * Возвращает массив всех цен товаров в корзине
   * @returns {Promise<*[]>}
   */
  async getAllTotalPrices() {
    return await test.step(`Get all total prices in cart`, async () => {
      const prices = [];
      const countPrices = await this.cartTotalPrice.count();

      for (let i = 0; i < countPrices; i++) {
        const priceText = await this.cartTotalPrice.nth(i).textContent();
        prices.push(parseInt(priceText.replace(/[^0-9]/g, '')))
      }
      return prices;
    })
  }

  /**
   * Подсчитывает общую сумму для товара
   * @param position - позиция товара в корзине (1, 2 ...)
   * @returns {Promise<number>}
   */
  async calculateTotalSumOfProduct(position) {
    return await test.step(`Calculate total price of product № ${position}`, async () => {
      const price = await this.getPriceOfProduct(position);
      const quantity = await this.getQuantityOfProduct(position);
      return price * quantity;
    })
  }

  /**
   * Подсчитывает общую сумму каждого товара и сравнивает с фактической в корзине
   * @returns {Promise<boolean>} возвращает true, если всё совпало
   */
  async checkTotalSum() {
    return await test.step(`Check total prices of products`, async () => {
      let result;
      const count = await this.cartTotalPrice.count();
      for (let i = 1; i <= count; i++) {
        const sum = await this.calculateTotalSumOfProduct(i);
        const total = await this.getTotalPriceOfProduct(i)
        result = sum === total;
      }
      return result;
    })
  }
}