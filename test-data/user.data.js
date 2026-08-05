import { getRandom, getRandomEmail, getRandomItem, getRandomString } from '../helpers/test.helper.js';

export class UserData {
  /**
   * Возвращает рандомные позитивные значения для тестов регистрации пользователей
   * @returns {{name: *, email: string, password: *, firstName: *, lastName: *, company: *, address1: *, address2: *, state: *, city: *, zipcode: *, mobileNumber: *, gender: *, birthDate: *, birthMonth: *, birthYear: *, country: *}}
   */
  static getInformationDataRandom() {
    const genders = ['mr', 'ms'];
    const countries = ['India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore'];
    return {
      name: getRandomString(8, 'str'),
      email: getRandomEmail(),
      password: getRandomString(10, 'all'),
      firstName: getRandomString(8, 'str'),
      lastName: getRandomString(10, 'str'),
      company: getRandomString(10, 'str'),
      address1: getRandomString(10, 'str'),
      address2: getRandomString(10, 'str'),
      state: getRandomString(6, 'str'),
      city: getRandomString(6, 'str'),
      zipcode: getRandomString(6, 'num'),
      mobileNumber: getRandomString(11, 'num'),
      gender: getRandomItem(genders),
      birthDate: getRandom(1, 31),
      birthMonth: getRandom(1, 12),
      birthYear: getRandom(1900, 2021),
      country: getRandomItem(countries),
    };
  }

  /**
   * Возвращает рандомные данные несуществующего пользователя
   * @returns {{email: string, password: string, name: string}}
   */
  static getRandomUser() {
    return {
      email: getRandomEmail(),
      password: getRandomString(10, 'all'),
      name: getRandomString(10, 'str'),
    };
  }

  /**
   * Возвращает рандомные валидные данные для отправки сообщений
   * @returns {{email: string, name: string, subject: string, message: string}}
   */
  static getContactDataRandom() {
    return {
      email: getRandomEmail(),
      name: getRandomString(10, 'str'),
      subject: getRandomString(10, 'str'),
      message: getRandomString(100, 'str'),
    };
  }

  /**
   * Возвращает данные для оплаты
   * @returns {{name: string, cardNumber: string, cvc: string, month: string, year: string}}
   */
  static getPaymentData() {
    const firstName = getRandomString(6, 'str');
    const lastName = getRandomString(8, 'str');
    return {
      name: `${firstName} ${lastName}`,
      cardNumber: getRandomString(16, 'num'),
      cvc: getRandomString(3, 'num'),
      month: getRandom(1, 12).toString(),
      year: getRandom(2026, 2100).toString(),
    };
  }
}
