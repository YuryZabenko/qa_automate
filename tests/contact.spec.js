import { test, expect } from '@playwright/test';
import { addBlock } from '../helpers/test.helper.js';
import { ContactPage } from '../pages/contact.page.js';

test.describe('Contact us tests', () => {
  let contactPage;

  test.beforeEach(async ({ page }) => {
    await addBlock(page);
    contactPage = new ContactPage(page);
    await contactPage.open();
    await expect(contactPage.header.logo).toBeVisible();
    await contactPage.header.goToContactUs();
    expect(await contactPage.getTitle()).toEqual(await contactPage.title);
  });

  test('should successfully send the message through the contact form', async () => {
    await expect(contactPage.submitButton).toBeVisible();
    await contactPage.fillContactFormRandom();
    await contactPage.addFile();
    await contactPage.sendMessage();
    await expect(contactPage.succesTextLocator).toHaveText(contactPage.succesText);
    await contactPage.successButton.click();
    await expect(contactPage.homePageText).toBeVisible();
  });
});
