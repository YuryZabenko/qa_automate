import { BasePage } from './base.page.js';
import { CategoryComponents } from './components/category.components.js';
import { ProductListComponents } from './components/productList.components.js';
import { ModalComponents } from './components/modal.components.js';
import { test } from '@playwright/test';

export class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    this.productList = new ProductListComponents(page);
    this.modal = new ModalComponents(page);
    this.category = new CategoryComponents(page);

    this.searchInput = page.locator('input#search_product');
    this.searchButton = page.locator('button#submit_search');
    this.searchTextLocator = page.locator('h2.title.text-center:has-text("Searched Products")');
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
