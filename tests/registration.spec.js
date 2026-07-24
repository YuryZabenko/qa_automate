import {test, expect} from '@playwright/test';
import {LoginPage} from "../pages/login.page.js";
import {addBlock} from "../helpers/test.helper.js";

test.describe('Signup and login tests', async () => {

  let loginPage;

  test.beforeEach(async ({page}) => {
    await addBlock(page);
    loginPage = new LoginPage(page);
    await loginPage.open();
    await expect(loginPage.header.logo).toBeVisible();
    await loginPage.header.goToLogin();
    expect(await loginPage.getTitle()).toEqual(loginPage.title);
  })

  test('should register random user and delete him', async () => {
    await expect(loginPage.newUserText).toBeVisible();
    await loginPage.signUpRandom();
    await expect(loginPage.enterInformationText).toBeVisible();
    await loginPage.createAccountRandom();
    await expect(loginPage.accountCreatedText).toBeVisible();
    await loginPage.continueButton.click();
    await expect(loginPage.loggedText).toBeVisible();
    await loginPage.header.deleteAccountButton.click();
    await expect(loginPage.deletedText).toBeVisible();
  });

  test('should login and logout user with correct email and password', async () => {
    await expect(loginPage.loginText).toBeVisible();
    await loginPage.loginCorrect();
    await expect(loginPage.loggedText).toBeVisible();
    await loginPage.header.logout();
    await expect(loginPage.loginText).toBeVisible();
  })

  test('should not login user with incorrect email and password', async () => {
    await expect(loginPage.loginText).toBeVisible();
    await loginPage.loginIncorrect();
    await expect(loginPage.incorrectEmailText).toBeVisible();
  })

  test('should not register user with existing email', async () => {
    await expect(loginPage.newUserText).toBeVisible();
    await loginPage.signUpIncorrect();
    await expect(loginPage.emailExistText).toBeVisible();
  })
})