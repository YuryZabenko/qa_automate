import { test } from '@playwright/test';

export class CategoryComponents {
  constructor(page) {
    // category
    this.women = page.locator('a[href="#Women"]');
    this.men = page.locator('a[href="#Men"]');
    this.kids = page.locator('a[href="#Kids"]');
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

  async selectSubCategories(category, subCategory) {
    await test.step('Select product category', async () => {
      const isVisibleSub = await subCategory.isVisible({ timeout: 500 });
      if (!isVisibleSub) {
        await category.click();
      }
      await subCategory.click();
    });
  }
}
