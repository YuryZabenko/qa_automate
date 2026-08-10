import { request } from '@playwright/test';
import { UserData } from '../test-data/user.data.js';
import { ApiUrl } from '../test-data/api.data.js';
import { brandsListSchema, productListSchema, userDetailSchema } from '../schemas/response.schemas.js';
import Ajv from 'ajv';

const ajv = new Ajv();

const validators = {
  productList: ajv.compile(productListSchema),
  brandsList: ajv.compile(brandsListSchema),
  userDetail: ajv.compile(userDetailSchema),
};

export class ApiHelper {
  /**
   * Создает нового случайного юзера
   * @returns {Promise<{user: {name: *, email: string, password: *, firstName: *, lastName: *, company: *, address1: *, address2: *, state: *, city: *, zipcode: *, mobileNumber: *, gender: *, birthDate: *, birthMonth: *, birthYear: *, country: *}, response: *}>}
   */
  static async createNewUser() {
    const user = UserData.getInformationDataRandom();
    const response = await this.getResponse('post', ApiUrl.createAccount, {
      form: {
        name: user.name,
        email: user.email,
        password: user.password,
        title: user.gender,
        birth_date: user.birthDate,
        birth_month: user.birthMonth,
        birth_year: user.birthYear,
        firstname: user.firstName,
        lastname: user.lastName,
        company: user.company,
        address1: user.address1,
        address2: user.address2,
        country: user.country,
        zipcode: user.zipcode,
        state: user.state,
        city: user.city,
        mobile_number: user.mobileNumber,
      },
    });
    return {
      user: user,
      response: response,
    };
  }

  /**
   * Удаляет юзера
   * @param email
   * @param password
   * @returns {Promise<*>}
   */
  static async deleteUser(email, password) {
    return await this.getResponse('delete', ApiUrl.deleteAccount, {
      form: {
        email: email,
        password: password,
      },
    });
  }

  /**
   * Отправка http запроса
   * @param {string} method - метод запроса (post, get, put, delete)
   * @param {string} url - адрес запроса
   * @param options - тело запроса
   * @returns {Promise<any>} возвращает JSON ответа
   */
  static async getResponse(method, url, options = {}) {
    const context = await request.newContext();
    let response;
    if (method === 'post') {
      response = await context.post(url, options);
    } else if (method === 'get') {
      response = await context.get(url, options);
    } else if (method === 'put') {
      response = await context.put(url, options);
    } else if (method === 'delete') {
      response = await context.delete(url, options);
    } else {
      throw new Error(`Method "${method}" not supported`);
    }

    return await response.json();
  }

  /**
   * Валидация данных по указанной схеме
   * @param {any} data - данные для валидации
   * @param schema - схема валидации
   * @returns {Promise<*>} - результат валидации
   */
  static async validateSchema(data, schema) {
    const validator = validators[schema];
    if (!validator) {
      throw new Error(`Schema "${schema}" not found`);
    }

    return validator(data);
  }
}
