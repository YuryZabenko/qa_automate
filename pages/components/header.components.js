import { BaseComponents } from './base.components.js';

export class HeaderComponents extends BaseComponents {
  constructor(page) {
    super(page);

    this.homePageLink = page.getByRole('link', { name: ' Home' });
    this.productsLink = page.getByRole('link', { name: ' Products' });
    this.cartLink = page.getByRole('link', { name: ' Cart' });
    this.loginLink = page.getByRole('link', { name: ' Signup / Login' });
    this.contactLink = page.getByRole('link', { name: ' Contact us' });
    this.testCasesLink = page.getByRole('link', { name: ' Test Cases' });
    this.apiTestingLink = page.getByRole('link', { name: ' API Testing' });
    this.videoTutorialsLink = page.getByRole('link', { name: ' Video Tutorials' });

    /** @type {import('@playwright/test').Locator} */
    this.logo = page.getByAltText('Website for automation practice');

    this.deleteAccountButton = page.getByRole('link', { name: ' Delete Account' });
    this.logoutButton = page.getByRole('link', { name: ' Logout' });
  }
}
