import {UserData} from "../test-data/user.data.js";
import {getRandomIndex} from "../helpers/test.helper.js";
import {BasePage} from "./base.page.js";
import {test} from "@playwright/test";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.title = `Automation Exercise - Signup / Login`;

    // signup
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.genders = [
      page.locator('#id_gender1'),
      page.locator('#id_gender2')
    ]
    this.passwordInput = page.locator('#password');
    this.daysSelect = page.locator('#days');
    this.monthsSelect = page.locator('#months');
    this.yearsSelect = page.locator('#years');
    this.newsletter = page.locator('#newsletter')
    this.optin = page.locator('#optin');
    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.company = page.locator('#company');
    this.address1 = page.locator('#address1');
    this.address2 = page.locator('#address2');
    this.country = page.locator('#country');
    this.state = page.locator('#state');
    this.city = page.locator('#city');
    this.zipcode = page.locator('#zipcode');
    this.mobileNumber = page.locator('#mobile_number');
    this.createAccountButton = page.locator("button[data-qa='create-account']");
    this.continueButton = page.getByRole('link', {name: 'continue'});
    /** @type {import('@playwright/test').Locator} */
    this.newUserText = page.getByText('New User Signup!');
    /** @type {import('@playwright/test').Locator} */
    this.accountCreatedText = page.locator("h2[data-qa='account-created']");
    /** @type {import('@playwright/test').Locator} */
    this.enterInformationText = page.getByText('Enter Account Information');
    /** @type {import('@playwright/test').Locator} */
    this.loggedText = page.getByText('Logged in as', {exact: false});
    /** @type {import('@playwright/test').Locator} */
    this.deletedText = page.locator("h2[data-qa='account-deleted']");
    /** @type {import('@playwright/test').Locator} */
    this.emailExistText = page.getByText(`Email Address already exist!`);

    // login
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    /** @type {import('@playwright/test').Locator} */
    this.loginText = page.getByText('Login to your account');
    /** @type {import('@playwright/test').Locator} */
    this.incorrectEmailText = page.getByText(`Your email or password is incorrect!`);
  }

  /**
   * Заполнение формы "Login to your account" не валидными значениями и нажатие на кнопку 'Login'
   */
  async loginIncorrect() {
    await test.step(`Login incorrect`, async () => {
      const user = UserData.getRandomUser();
      await this.loginEmailInput.fill(user.email);
      await this.loginPasswordInput.fill(user.password);
      await this.loginButton.click();
    })
  }

  /**
   * Заполнение формы "Login to your account" валидными значениями и нажатие на кнопку 'Login'
   */
  async loginCorrect() {
    await test.step(`Login correct`, async () => {
      const user = UserData.getValidUser();
      await this.loginEmailInput.fill(user.email);
      await this.loginPasswordInput.fill(user.password);
      await this.loginButton.click();
    })
  }

  /**
   * Заполнение формы "Account & Address Information" рандомными валидными значениями и создание аккаунта
   */
  async createAccountRandom() {
    await test.step(`Create account correct`, async () => {
      const user = UserData.getInformationDataRandom();
      await this.#selectGenderRandom(this.genders);
      await this.passwordInput.fill(user.password);
      await this.#selectRandomDate();
      await this.newsletter.check();
      await this.optin.check();
      await this.firstName.fill(user.firstName);
      await this.lastName.fill(user.lastName);
      await this.company.fill(user.company);
      await this.address1.fill(user.address1);
      await this.address2.fill(user.address2);
      await this.#selectRandom(this.country);
      await this.state.fill(user.state);
      await this.city.fill(user.city);
      await this.zipcode.fill(user.zipcode);
      await this.mobileNumber.fill(user.mobileNumber);
      await this.createAccountButton.click();
    })
  }

  /**
   * Заполнение формы "New User Signup!" рандомными валидными значениями и переход на вкладку создания аккаунта
   */
  async signUpRandom() {
    await test.step(`Sign Up correct`, async () => {
      const user = UserData.getRandomUser();
      await this.signupNameInput.fill(user.name);
      await this.signupEmailInput.fill(user.email);
      await this.signupButton.click();
    })
  }

  /**
   * Заполнение формы "New User Signup!" рандомными не валидными значениями и переход на вкладку создания аккаунта
   */
  async signUpIncorrect() {
    await test.step(`Sign Up incorrect`, async () => {
      const user = UserData.getValidUser();
      await this.signupNameInput.fill(user.name);
      await this.signupEmailInput.fill(user.email);
      await this.signupButton.click();
    })
  }

  /**
   * Выбор рандомного гендера
   */
  async #selectGenderRandom(gender) {
    await test.step(`Select gender`, async () => {
      const index = getRandomIndex(gender.length);
      await gender[index].check();
    })
  }

  /**
   * Выбор рандомной даты (день, месяц, год) из выпадающих списков
   */
  async #selectRandomDate() {
    await test.step(`Select date`, async () => {
      await this.#selectRandom(this.daysSelect);
      await this.#selectRandom(this.monthsSelect);
      await this.#selectRandom(this.yearsSelect);
    })
  }

  /**
   * Выбор рандомного значения из выпадающего списка
   * @param {import('@playwright/test').Locator} locator - локатор выпадающего списка
   */
  async #selectRandom(locator) {
    await test.step(`Select random value`, async () => {
      const count = await locator.locator('option').count();
      const index = getRandomIndex(count, true);
      await locator.selectOption({index: index});
    })
  }
}