import { BasePage } from './base.page.js';
import { CategoryComponents } from '../components/category.components.js';
import { ProductsComponents } from '../components/products.components.js';
import { ModalComponents } from '../components/modal.components.js';
import { ProductCardComponents } from '../components/productCard.components.js';
import { test } from '@playwright/test';

export class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    this.products = new ProductsComponents(page);
    this.modal = new ModalComponents(page);
    this.productCard = new ProductCardComponents(page);
    this.category = new CategoryComponents(page);

    this.saleBanner = page.locator('img#sale_image');
    this.searchInput = page.locator('input#search_product');
    this.searchButton = page.locator('button#submit_search');
  }

  /**
   * Поиск товаров по тексту
   * @param text - текст для поиска
   * @returns {Promise<void>}
   */
  async searchProducts(text) {
    await test.step('Search product', async () => {
      await this.searchInput.fill(text);
      await this.searchButton.click();
    });
  }
}
