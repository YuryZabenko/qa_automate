import { test as base } from '@playwright/test';
import { addBlock } from '../helpers/test.helper.js';
import { LoginPage } from '../pages/login.page.js';
import { ProductsPage } from '../pages/products.page.js';
import { ContactPage } from '../pages/contact.page.js';
import { HomePage } from '../pages/home.page.js';

export const test = base.extend({
  homePage: async ({ page }, use) => {
    await addBlock(page);
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.waitLoad();
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    await addBlock(page);
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.clickElement(loginPage.header.loginLink, 'header - login / sign up');
    await loginPage.waitLoad();
    await use(loginPage);
  },

  productsPage: async ({ page }, use) => {
    await addBlock(page);
    const productsPage = new ProductsPage(page);
    await productsPage.open();
    await productsPage.clickElement(productsPage.header.productsLink, 'header - products');
    await productsPage.waitLoad();
    await use(productsPage);
  },

  contactPage: async ({ page }, use) => {
    await addBlock(page);
    const contactPage = new ContactPage(page);
    await contactPage.open();
    await contactPage.clickElement(contactPage.header.contactLink, 'header - contact us');
    await contactPage.waitLoad();
    await use(contactPage);
  },

  loggedUser: async ({ loginPage }, use) => {
    const user = await loginPage.loginUser(true);
    await use(user);
  },
});

export { expect } from '@playwright/test';
