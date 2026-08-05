import { test, expect } from '../../../fixtures/fixtures.js';
import { ProductData } from '../../../test-data/product.data.js';

test.describe('Search product tests', () => {
  test.describe('Search product tests - positive', { tag: ['@regression', '@positive', '@ui'] }, () => {
    const products = ProductData.getProductsToSearch();

    products.forEach((product) => {

      // test fail on top and dress products. todo delete 'testFunction - test.fail' after fix BUG on site
      const knownBugs = ['top', 'dress'];
      const testFunction = knownBugs.includes(product) ? test.fail : test;

      testFunction(`should search product: ${product}`, async ({ productsPage }) => {
        await productsPage.searchProducts(product);
        await productsPage.searchTextLocator.waitFor({ state: 'visible' });
        const productsCount = await productsPage.productList.getProductsCount();
        expect(productsCount).toBeGreaterThan(0);
        let productName;
        for (let i = 0; i < productsCount; i++) {
          productName = await productsPage.productList.getProductName(i);
          expect(productName).toContain(product);
        }
      });
    });
  });
});
