import {BasePage} from "./base.page.js";
import {CategoryComponents} from "../components/category.components.js";
import {ProductsComponents} from "../components/products.components.js";

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.categoy = new CategoryComponents(page);
    this.products = new ProductsComponents(page);

    this.slideBannerLeft = page.locator(`//*[@data-slide='prev']`).nth(0);
    this.slideBannerRight = page.locator(`//*[@data-slide='next']`).nth(0);
    this.slideBanner0 = page.locator(`//*[@data-slide-to='0']`);
    this.slideBanner1 = page.locator(`//*[@data-slide-to='1']`);
    this.slideBanner2 = page.locator(`//*[@data-slide-to='2']`);

  }
}