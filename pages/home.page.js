import { BasePage } from './base.page.js';
import { CategoryComponents } from './components/category.components.js';
import { ProductListComponents } from './components/productList.components.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.categoy = new CategoryComponents(page);
    this.products = new ProductListComponents(page);

    this.sliderCount = 3;

    /** @type {import('@playwright/test').Locator} */
    this.sliderContainer = page.locator('#slider-carousel.carousel.slide');
    this.indicators = page.locator('.carousel-indicators li');
    this.activeIndicator = page.locator('.carousel-indicators li.active');

    this.slides = page.locator('.carousel-inner .item h1');

    this.prevButton = page.locator('.left.control-carousel');
    this.nextButton = page.locator('.right.control-carousel');

    /** @type {import('@playwright/test').Locator} */
    this.testCasesButton = page.locator('.item.active .test_cases_list button');
    /** @type {import('@playwright/test').Locator} */
    this.apiListButton = page.locator('.item.active .apis_list button');
  }

  async getActiveSlideIndex() {
    const index = await this.activeIndicator.getAttribute('data-slide-to');
    return parseInt(index);
  }
}
