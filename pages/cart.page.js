import { BasePage } from './base.page.js';
import { expect, test } from '@playwright/test';
import { cleanPrice } from '../helpers/test.helper.js';
import { PaymentPage } from './payment.page.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.title = 'Automation Exercise - Checkout';

    //cart
    this.proceedButton = page.getByText('Proceed To Checkout');
    this.cartPrice = page.locator('//*[@class="cart_price"]');
    this.cartQuantity = page.locator('//*[@class="cart_quantity"]//*[@class="disabled"]');
    this.cartTotalPrice = page.locator('//*[@class="cart_total_price"]');
    this.cartDeleteButton = page.locator('//*[@class="cart_quantity_delete"]');
    this.cartName = page.locator('//td[contains(@class, "cart_description")]//a');
    /** @type {import('@playwright/test').Locator} */
    this.emptyCart = page.locator('#empty_cart');

    // checkout
    /** @type {import('@playwright/test').Locator} */
    this.deliveryName = page.locator('#address_delivery .address_firstname');
    /** @type {import('@playwright/test').Locator} */
    this.deliveryCompany = page.locator('#address_delivery .address_address1').nth(0);
    /** @type {import('@playwright/test').Locator} */
    this.deliveryAddress1 = page.locator('#address_delivery .address_address1').nth(1);
    /** @type {import('@playwright/test').Locator} */
    this.deliveryCountry = page.locator('#address_delivery .address_address1').nth(2);
    /** @type {import('@playwright/test').Locator} */
    this.deliveryStateCityZip = page.locator('#address_delivery .address_city');
    /** @type {import('@playwright/test').Locator} */
    this.deliveryCountry = page.locator('#address_delivery .address_country_name');
    /** @type {import('@playwright/test').Locator} */
    this.deliveryPhone = page.locator('#address_delivery .address_phone');
    /** @type {import('@playwright/test').Locator} */
    this.totalPriceCheckout = page.locator('.cart_total_price').last();
    /** @type {import('@playwright/test').Locator} */
    this.placeOrderButton = page.getByText('Place Order');
  }

  async checkDeliveryInfo(user) {
    await expect(this.deliveryName).toContainText(user.firstName);
    await expect(this.deliveryName).toContainText(user.lastName);
    await expect(this.deliveryCompany).toHaveText(user.company);
    await expect(this.deliveryAddress1).toHaveText(user.address1);
    await expect(this.deliveryCountry).toHaveText(user.country);
    await expect(this.deliveryPhone).toHaveText(user.mobileNumber);
    await expect(this.deliveryStateCityZip).toContainText(user.city);
    await expect(this.deliveryStateCityZip).toContainText(user.state);
    await expect(this.deliveryStateCityZip).toContainText(user.zipcode);
  }

  /**
   * Возвращает общую сумму счета
   * @returns {Promise<*>} - сумма счета
   */
  async getTotalSumCheckout() {
    return await test.step('Get total sum checkout', async () => {
      const totalText = await this.totalPriceCheckout.textContent();
      return cleanPrice(totalText);
    });
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
    });
  }

  /**
   * Возвращает название товара, указанное в корзине
   * @param position - позиция товара в корзине (1, 2 ...)
   * @returns {Promise<string>}
   */
  async getNameProduct(position) {
    return await test.step(`Get name of product № ${position}`, async () => {
      const result = await this.cartName.nth(position - 1).textContent();
      return result.toLowerCase();
    });
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
    });
  }

  /**
   * Возвращает цену товара, указанную в корзине
   * @param position - позиция товара в корзине (1, 2 ...)
   * @returns {Promise<number>}
   */
  async getPriceOfProduct(position) {
    return await test.step(`Get price of product № ${position}`, async () => {
      const productPrice = await this.cartPrice.nth(position - 1).textContent();
      return cleanPrice(productPrice);
    });
  }

  /**
   * Возвращает общую сумму товара, указанную в корзине
   * @param position - позиция товара в корзине (1, 2 ...)
   * @returns {Promise<number>}
   */
  async getTotalPriceOfProduct(position) {
    return await test.step(`Get total price of product № ${position}`, async () => {
      const productTotal = await this.cartTotalPrice.nth(position - 1).textContent();
      return cleanPrice(productTotal);
    });
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
      return { name: name, price: price };
    });
  }

  /**
   * Возвращает массив объектов всех товаров в корзине [{name, price}]
   * @returns {Promise<*[]>}
   */
  async getAllCartProducts() {
    return await test.step('Get all products in cart', async () => {
      const cartProducts = [];
      const productCount = await this.cartName.count();
      for (let i = 1; i <= productCount; i++) {
        cartProducts.push(await this.getProductInfo(i));
      }
      return cartProducts;
    });
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
    });
  }

  /**
   * Считает общую сумму корзины
   * @returns {Promise<number>}
   */
  async getTotalSumInCart() {
    return await test.step('Get total sum in cart', async () => {
      const countTotal = await this.cartTotalPrice.count();
      let totalSumOfCart = 0;
      for (let i = 0; i < countTotal; i++) {
        const total = await this.cartTotalPrice.nth(i).textContent();
        const totalNum = cleanPrice(total);
        totalSumOfCart += totalNum;
      }
      return totalSumOfCart;
    });
  }

  /**
   * Подсчитывает общую сумму каждого товара и сравнивает с фактической в корзине
   * @returns {Promise<void>}
   */
  async checkTotalSum() {
    return await test.step('Check total prices of products', async () => {
      let result;
      const count = await this.cartTotalPrice.count();
      for (let i = 1; i <= count; i++) {
        const sum = await this.calculateTotalSumOfProduct(i);
        const total = await this.getTotalPriceOfProduct(i);
        result = sum === total;
      }
      expect(result).toBeTruthy();
    });
  }

  /**
   * Нажимает на "place order button" и возвращает новую страницу PaymentPage
   * @returns {Promise<PaymentPage>} - new PaymentPage()
   */
  async placeOrder() {
    return await test.step('Click to place order button', async () => {
      await this.placeOrderButton.click();
      await this.waitLoad();
      return new PaymentPage(this.page);
    });
  }
}
