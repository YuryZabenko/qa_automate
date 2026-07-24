import {test} from "@playwright/test";

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

  async #selectSubCategories(category, subCategory) {
    const isVisibleSub = await subCategory.isVisible({timeout: 500});
    if (!isVisibleSub) {
      await category.click();
    }
    await subCategory.click();
  }

  /**
   * Выбрать категорию Women Dress
   */
  async selectWomenDress() {
    await test.step('Select category "Women Dress"', async () => {
      await this.#selectSubCategories(this.women, this.womenDress);
    })
  }

  /**
   * Выбрать категорию Women Tops
   */
  async selectWomenTops() {
    await test.step('Select category "Women Tops"', async () => {
      await this.#selectSubCategories(this.women, this.womenTops);
    })
  }

  /**
   * Выбрать категорию Women Saree
   */
  async selectWomenSaree() {
    await test.step('Select category "Women Saree"', async () => {
      await this.#selectSubCategories(this.women, this.womenSaree);
    })
  }

  /**
   * Выбрать категорию Men Tshirts
   */
  async selectMenTshirts() {
    await test.step('Select category "Men Tshirts"', async () => {
      await this.#selectSubCategories(this.men, this.menTshirts);
    })
  }

  /**
   * Выбрать категорию Men Jeans
   */
  async selectMenJeans() {
    await test.step('Select category "Men Tshirts"', async () => {
      await this.#selectSubCategories(this.men, this.menJeans);
    })
  }

  /**
   * Выбрать категорию Kids Dress
   */
  async selectKidsDress() {
    await test.step('Select category "Kids Dress"', async () => {
      await this.#selectSubCategories(this.kids, this.kidsDress);
    })
  }

  /**
   * Выбрать категорию Kids Tops
   */
  async selectKidsTops() {
    await test.step('Select category "Kids Tops"', async () => {
      await this.#selectSubCategories(this.kids, this.kidsTops);
    })
  }

  /**
   * Выбрать брэнд POLO
   */
  async selectPoloBrand() {
    await test.step('Select brand "POLO"', async () => {
      await this.poloBrand.click();
    })
  }

  /**
   * Выбрать брэнд H&M
   */
  async selectHmBrand() {
    await test.step('Select brand "H&M"', async () => {
      await this.hmBrand.click();
    })
  }

  /**
   * Выбрать брэнд MADAME
   */
  async selectMadameBrand() {
    await test.step('Select brand "MADAME"', async () => {
      await this.madameBrand.click();
    })
  }

  /**
   * Выбрать брэнд MAST & HARBOUR
   */
  async selectMastHarbourBrand() {
    await test.step('Select brand "MAST & HARBOUR"', async () => {
      await this.mastHarbourBrand.click();
    })
  }

  /**
   * Выбрать брэнд BABYHYG
   */
  async selectBabyhugBrand() {
    await test.step('Select brand "BABYHYG"', async () => {
      await this.babyhugBrand.click();
    })
  }

  /**
   * Выбрать брэнд ALLEN SOLLY JUNIOR
   */
  async selectAllenSollyBrand() {
    await test.step('Select brand "ALLEN SOLLY JUNIOR"', async () => {
      await this.allenSollyBrand.click();
    })
  }

  /**
   * Выбрать брэнд KOOKIE KIDS
   */
  async selectKookieKidsBrand() {
    await test.step('Select brand "KOOKIE KIDS"', async () => {
      await this.kookieKidsBrand.click();
    })
  }

  /**
   * Выбрать брэнд BIBA
   */
  async selectBibaBrand() {
    await test.step('Select brand "BIBA"', async () => {
      await this.bibaBrand.click();
    })
  }
}