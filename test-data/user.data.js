import {getRandomEmail, getRandomString} from "../helpers/test.helper.js";

export class UserData {
  /**
   * Возвращает рандомные позитивные значения для тестов регистрации пользователей
   * @returns {{name: string, email: string, password: string, firstName: string, lastName: string, company: string, address1: string, address2: string, state: string, city: string, zipcode: string, mobileNumber: string}}
   */
  static getInformationDataRandom() {
    return {
      name: getRandomString(8, 'string'),
      email: getRandomEmail(),
      password: getRandomString(10, 'all'),
      firstName: getRandomString(8, 'string'),
      lastName: getRandomString(10, 'string'),
      company: getRandomString(10, 'string'),
      address1: getRandomString(10, 'string'),
      address2: getRandomString(10, 'string'),
      state: getRandomString(6, 'string'),
      city: getRandomString(6, 'string'),
      zipcode: getRandomString(6, 'number'),
      mobileNumber: getRandomString(11, 'string')
    }
  }

  /**
   * Возвращает фиксированные данные существующего пользователя
   * @returns {{email: string, password: string, name: string}}
   */
  static getValidUser() {
    return {
      email: 'ivan@ivanov.by',
      password: 'Ivanov',
      name: 'Ivan'
    }
  }

  /**
   * Возвращает рандомные данные несуществующего пользователя
   * @returns {{email: string, password: string, name: string}}
   */
  static getRandomUser() {
    return {
      email: getRandomEmail(),
      password: getRandomString(10, 'all'),
      name: getRandomString(10, 'string')
    }
  }

  /**
   * Возвращает рандомные валидные данные для отправки сообщений
   * @returns {{email: string, name: string, subject: string, message: string}}
   */
  static getContactDataRandom() {
    return {
      email: getRandomEmail(),
      name: getRandomString(10, 'string'),
      subject: getRandomString(10, 'string'),
      message: getRandomString(100, 'string')
    }
  }
}
