import { expect, test } from '@playwright/test';
import { ProductData } from '../../../test-data/product.data.js';
import { ApiHelper } from '../../../helpers/api.helper.js';
import { ApiUrl } from '../../../test-data/api.data.js';

test.describe('products API tests', () => {
  test.describe('products API tests - positive', { tag: ['@api', '@positive'] }, () => {
    test(
      'should return status 200 and product list json with valid GET method',
      { tag: ['@regression', '@positive', '@api'] },
      async () => {
        const data = await ApiHelper.getResponse('get', ApiUrl.productList);
        const isValid = await ApiHelper.validateSchema(data, 'productList');
        expect(isValid).toBe(true);
        expect(data.responseCode).toEqual(200);
      },
    );

    test(
      'should return status 200 and brands list json with valid GET method',
      { tag: ['@regression', '@positive', '@api'] },
      async () => {
        const data = await ApiHelper.getResponse('get', ApiUrl.brandList);
        const isValid = await ApiHelper.validateSchema(data, 'brandsList');
        expect(isValid).toBe(true);
        expect(data.responseCode).toEqual(200);
      },
    );

    ProductData.getProductsToSearch().forEach((product) => {
      test(
        `should return status 200 and Searched products list with ${product} json with valid POST method and parameters`,
        { tag: ['@regression', '@positive', '@api'] },
        async () => {
          const data = await ApiHelper.getResponse('post', ApiUrl.searchProduct, {
            form: {
              search_product: product,
            },
          });
          const isValid = await ApiHelper.validateSchema(data, 'productList');
          expect(isValid).toBe(true);
          expect(data.responseCode).toEqual(200);
        },
      );
    });
  });

  test.describe('products API tests - negative', { tag: ['@api', '@negative'] }, () => {
    test(
      'should return code 405 with POST method productsList',
      { tag: ['@regression', '@negative', '@api'] },
      async () => {
        const data = await ApiHelper.getResponse('post', ApiUrl.productList);
        expect(data.responseCode).toEqual(405);
        expect(data.message).toEqual('This request method is not supported.');
      },
    );

    test(
      'should return code 405 with PUT method brandsList',
      { tag: ['@regression', '@negative', '@api'] },
      async () => {
        const data = await ApiHelper.getResponse('post', ApiUrl.brandList);
        expect(data.responseCode).toEqual(405);
        expect(data.message).toEqual('This request method is not supported.');
      },
    );

    test(
      'should return status 400 with POST method search without parameters',
      { tag: ['@regression', '@negative', '@api'] },
      async () => {
        const data = await ApiHelper.getResponse('post', ApiUrl.searchProduct);
        expect(data.responseCode).toEqual(400);
        expect(data.message).toEqual('Bad request, search_product parameter is missing in POST request.');
      },
    );
  });
});
