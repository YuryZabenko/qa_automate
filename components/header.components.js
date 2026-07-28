import { test } from '@playwright/test';

export class HeaderComponents {
  constructor(page) {
    this.page = page;

    this.homePage = page.getByRole('link', { name: ' Home' });
    this.products = page.getByRole('link', { name: ' Products' });
    this.cart = page.getByRole('link', { name: ' Cart' });
    this.login = page.getByRole('link', { name: ' Signup / Login' });
    this.contact = page.getByRole('link', { name: ' Contact us' });
    this.testCases = page.getByRole('link', { name: ' Test Cases' });
    this.apiTesting = page.getByRole('link', { name: ' API Testing' });
    this.videoTutorials = page.getByRole('link', { name: ' Video Tutorials' });

    /** @type {import('@playwright/test').Locator} */
    this.logo = page.getByAltText('Website for automation practice');

    this.deleteAccountButton = page.getByRole('link', { name: ' Delete Account' });
    this.logoutButton = page.getByRole('link', { name: ' Logout' });
  }

  /**
   * Выход из учетной записи пользователя
   */
  async logout() {
    await test.step('Logout user', async () => {
      await this.logoutButton.click();
    });
  }

  /**
   * Переход на вкладку 'Products'
   */
  async goToProducts() {
    await test.step('Navigate to Product Page', async () => {
      await this.products.click();
    });
  }

  /**
   * Переход на вкладку 'Cart'
   */
  async goToCart() {
    await test.step('Navigate to Cart Page', async () => {
      await this.cart.click();
    });
  }

  /**
   * Переход на вкладку 'Signup / Login'
   */
  async goToLogin() {
    await test.step('Navigate to Login / Sign Up Page', async () => {
      await this.login.click();
    });
  }

  /**
   * Переход на вкладку 'Contact us'
   */
  async goToContactUs() {
    await test.step('Navigate to Contact Us Page', async () => {
      await this.contact.click();
    });
  }

  /**
   * Переход на вкладку 'Test Cases'
   */
  async goToTestCases() {
    await this.testCases.click();
  }

  /**
   * Переход на вкладку 'Api Testing'
   */
  async goToApiTesting() {
    await this.apiTesting.click();
  }

  /**
   * Переход на вкладку 'Video Tutorials'
   */
  async goToVideoTutorials() {
    await test.step('Navigate to Video Tutorials Page', async () => {
      await this.videoTutorials.click();
    });
  }
}
