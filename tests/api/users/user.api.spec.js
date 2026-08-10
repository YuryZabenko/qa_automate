import { expect, test } from '@playwright/test';
import { ApiHelper } from '../../../helpers/api.helper.js';
import { UserData } from '../../../test-data/user.data.js';
import { ApiUrl } from '../../../test-data/api.data.js';

test.describe('user API tests', () => {
  test.describe('positive API user tests', { tag: ['@api', '@positive'] }, () => {
    test(
      'should return status 200 and "User exists!" with valid POST method and existing user',
      { tag: ['@regression', '@positive', '@api'] },
      async () => {
        const result = await ApiHelper.createNewUser();
        const data = await ApiHelper.getResponse('post', ApiUrl.verifyLogin, {
          form: {
            email: result.user.email,
            password: result.user.password,
          },
        });
        expect(data.responseCode).toEqual(200);
        expect(data.message).toEqual('User exists!');
        await ApiHelper.deleteUser(result.user.email, result.user.password);
      },
    );

    test(
      'should return status 201 and "User created!" with valid POST method and valid parameters',
      { tag: ['@regression', '@positive', '@api'] },
      async () => {
        const result = await ApiHelper.createNewUser();
        expect(result.response.responseCode).toEqual(201);
        expect(result.response.message).toEqual('User created!');
        await ApiHelper.deleteUser(result.user.email, result.user.password);
      },
    );

    test(
      'should return status 200 and "Account deleted!" with valid DELETE method and valid parameters',
      { tag: ['@regression', '@positive', '@api'] },
      async () => {
        const result = await ApiHelper.createNewUser();
        const data = await ApiHelper.deleteUser(result.user.email, result.user.password);
        expect(data.responseCode).toEqual(200);
        expect(data.message).toEqual('Account deleted!');
      },
    );

    test(
      'should return status 200 and "User updated!" with valid PUT method and valid parameters',
      { tag: ['@regression', '@positive', '@api'] },
      async () => {
        const result = await ApiHelper.createNewUser();
        const newUser = UserData.getInformationDataRandom();

        const data = await ApiHelper.getResponse('put', ApiUrl.updateAccount, {
          form: {
            name: result.user.name,
            email: result.user.email,
            password: result.user.password,
            title: newUser.gender,
            birth_date: newUser.birthDate,
            birth_month: newUser.birthMonth,
            birth_year: newUser.birthYear,
            firstname: newUser.firstName,
            lastname: newUser.lastName,
            company: newUser.company,
            address1: newUser.address1,
            address2: newUser.address2,
            country: newUser.country,
            zipcode: newUser.zipcode,
            state: newUser.state,
            city: newUser.city,
            mobile_number: newUser.mobileNumber,
          },
        });
        expect(data.responseCode).toEqual(200);
        expect(data.message).toEqual('User updated!');
        await ApiHelper.deleteUser(result.user.email, result.user.password);
      },
    );

    test(
      'should return status 200 and User detail json with valid GET method and valid parameters',
      { tag: ['@regression', '@positive', '@api'] },
      async () => {
        const result = await ApiHelper.createNewUser();

        const data = await ApiHelper.getResponse('get', ApiUrl.getUserByEmail, {
          params: {
            email: result.user.email,
          },
        });
        const isValid = await ApiHelper.validateSchema(data, 'userDetail');
        expect(isValid).toBe(true);
        expect(data.responseCode).toEqual(200);
        expect(data.user.email).toEqual(result.user.email);
        await ApiHelper.deleteUser(result.user.email, result.user.password);
      },
    );
  });

  test.describe('negative API user tests', { tag: ['@api', '@negative'] }, () => {
    test(
      'should return status 400 with POST method login without parameters',
      { tag: ['@regression', '@negative', '@api'] },
      async () => {
        const data = await ApiHelper.getResponse('post', ApiUrl.verifyLogin);
        expect(data.responseCode).toEqual(400);
        expect(data.message).toEqual('Bad request, email or password parameter is missing in POST request.');
      },
    );

    test(
      'should return status 405 with DELETE method login',
      { tag: ['@regression', '@negative', '@api'] },
      async () => {
        const data = await ApiHelper.getResponse('delete', ApiUrl.verifyLogin);
        expect(data.responseCode).toEqual(405);
        expect(data.message).toEqual('This request method is not supported.');
      },
    );

    test(
      'should return status 404 with POST method login with invalid user',
      { tag: ['@regression', '@negative', '@api'] },
      async () => {
        const user = UserData.getRandomUser();
        const data = await ApiHelper.getResponse('post', ApiUrl.verifyLogin, {
          form: {
            email: user.email,
            password: user.password,
          },
        });
        expect(data.responseCode).toEqual(404);
        expect(data.message).toEqual('User not found!');
      },
    );
  });
});
