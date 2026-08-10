import { test } from '@playwright/test';
import { BaseComponents } from './base.components.js';

export class CategoryComponents extends BaseComponents {
  constructor(page) {
    super(page);

    // category
    this.womenCategory = page.locator('a[href="#Women"]');
    this.menCategory = page.locator('a[href="#Men"]');
    this.kidsCategory = page.locator('a[href="#Kids"]');
    this.womenDress = page.locator('a[href="/category_products/1"]');
    this.womenTops = page.locator('a[href="/category_products/2"]');
    this.womenSaree = page.locator('a[href="/category_products/7"]');
    this.menTshirts = page.locator('a[href="/category_products/3"]');
    this.menJeans = page.locator('a[href="/category_products/6"]');
    this.kidsDress = page.locator('a[href="/category_products/4"]');
    this.kidsTops = page.locator('a[href="/category_products/5"]');

    // brands
    this.poloBrand = page.locator('a[href="/brand_products/Polo"]');
    this.hmBrand = page.locator('a[href="/brand_products/H&M"]');
    this.madameBrand = page.locator('a[href="/brand_products/Madame"]');
    this.mastHarbourBrand = page.locator('a[href="/brand_products/Mast & Harbour"]');
    this.babyhugBrand = page.locator('a[href="/brand_products/Babyhug"]');
    this.allenSollyBrand = page.locator('a[href="/brand_products/Allen Solly Junior"]');
    this.kookieKidsBrand = page.locator('a[href="/brand_products/Kookie Kids"]');
    this.bibaBrand = page.locator('a[href="/brand_products/Biba"]');
  }

  /**
   * Заходит в нужную категорию продуктов
   * @param category - основная категория (локатор)
   * @param subCategory - подкатегория (локатор)
   * @returns {Promise<void>}
   */
  async navigateToCategory(category, subCategory) {
    await test.step(`Navigate to category ${subCategory}`, async () => {
      await category.click();
      await subCategory.click();
      await this.waitLoad();
    });
  }

  /**
   * Выбирает бренд
   * @param brand - локатор бренда
   * @returns {Promise<void>}
   */
  async navigateToBrand(brand) {
    await test.step(`Navigate to brand ${brand}`, async () => {
      await brand.click();
    });
  }

  /**
   * Возвращает данные для тестов категорий с локаторами
   * @returns {Array}
   */
  getCategoriesData() {
    return [
      {
        category: 'Women',
        subCategory: 'Dress',
        categoryLocator: this.womenCategory,
        subCategoryLocator: this.womenDress,
        expectedText: 'Women - Dress Products',
      },
      {
        category: 'Women',
        subCategory: 'Tops',
        categoryLocator: this.womenCategory,
        subCategoryLocator: this.womenTops,
        expectedText: 'Women - Tops Products',
      },
      {
        category: 'Women',
        subCategory: 'Saree',
        categoryLocator: this.womenCategory,
        subCategoryLocator: this.womenSaree,
        expectedText: 'Women - Saree Products',
      },
      {
        category: 'Men',
        subCategory: 'Tshirts',
        categoryLocator: this.menCategory,
        subCategoryLocator: this.menTshirts,
        expectedText: 'Men - Tshirts Products',
      },
      {
        category: 'Men',
        subCategory: 'Jeans',
        categoryLocator: this.menCategory,
        subCategoryLocator: this.menJeans,
        expectedText: 'Men - Jeans Products',
      },
      {
        category: 'Kids',
        subCategory: 'Dress',
        categoryLocator: this.kidsCategory,
        subCategoryLocator: this.kidsDress,
        expectedText: 'Kids - Dress Products',
      },
      {
        category: 'Kids',
        subCategory: 'Tops & Shirts',
        categoryLocator: this.kidsCategory,
        subCategoryLocator: this.kidsTops,
        expectedText: 'Kids - Tops & Shirts Products',
      },
    ];
  }

  /**
   * Возвращает данные для тестов брендов с локаторами
   * @returns {Array}
   */
  getBrandsData() {
    return [
      {
        brand: 'Polo',
        brandLocator: this.poloBrand,
        expectedText: 'Brand - Polo Products',
      },
      {
        brand: 'H&M',
        brandLocator: this.hmBrand,
        expectedText: 'Brand - H&M Products',
      },
      {
        brand: 'Madame',
        brandLocator: this.madameBrand,
        expectedText: 'Brand - Madame Products',
      },
      {
        brand: 'Mast & Harbour',
        brandLocator: this.mastHarbourBrand,
        expectedText: 'Brand - Mast & Harbour Products',
      },
      {
        brand: 'Babyhug',
        brandLocator: this.babyhugBrand,
        expectedText: 'Brand - Babyhug Products',
      },
      {
        brand: 'Allen Solly Junior',
        brandLocator: this.allenSollyBrand,
        expectedText: 'Brand - Allen Solly Junior Products',
      },
      {
        brand: 'Kookie Kids',
        brandLocator: this.kookieKidsBrand,
        expectedText: 'Brand - Kookie Kids Products',
      },
      {
        brand: 'Biba',
        brandLocator: this.bibaBrand,
        expectedText: 'Brand - Biba Products',
      },
    ];
  }
}
