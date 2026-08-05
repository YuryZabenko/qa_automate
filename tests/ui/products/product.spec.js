import { test, expect } from '../../../fixtures/fixtures.js';
import { getRandom } from '../../../helpers/test.helper.js';

test.describe('Products tests', () => {
  test.describe('Products tests - positive', () => {
    test(
      'should product card and information to be visible',
      { tag: ['@smoke', '@regression', '@positive', '@ui'] },
      async ({ productsPage }) => {
        expect(await productsPage.productList.getProductsCount()).toBeGreaterThan(0);
        const productDetailPage = await productsPage.productList.openProduct(1);
        await productDetailPage.submitButton.waitFor({ state: 'visible' });
        await expect(await productDetailPage.productName).toBeVisible();
        await expect(await productDetailPage.productCategory).toBeVisible();
        await expect(await productDetailPage.price).toBeVisible();
        await expect(await productDetailPage.availability).toBeVisible();
        await expect(await productDetailPage.condition).toBeVisible();
        await expect(await productDetailPage.brand).toBeVisible();
      },
    );

    test(
      'should add review on product with correct name and e-mail',
      { tag: ['@regression', '@positive', '@ui'] },
      async ({ productsPage }) => {
        const productDetailPage = await productsPage.productList.openProduct(1);
        await expect(productDetailPage.submitButton).toBeVisible();
        await productDetailPage.fillProductReview();
        await expect(await productDetailPage.alertLocator).toBeVisible();
        await expect(await productDetailPage.alertLocator).toHaveText(productDetailPage.alertText);
      },
    );

    test(
      'should product list info to equal product detail info',
      { tag: ['@regression', '@positive', '@ui'] },
      async ({ productsPage }) => {
        expect(await productsPage.productList.getProductsCount()).toBeGreaterThan(0);
        const countProducts = await productsPage.productList.getProductsCount();
        const randomProduct = getRandom(1, countProducts);
        const randomProductInfo = await productsPage.productList.getProductInfo(randomProduct);
        const ProductDetailPage = await productsPage.productList.openProduct(randomProduct);
        const randomProductDetailInfo = await ProductDetailPage.getProductInfo();
        expect(randomProductInfo).toEqual(randomProductDetailInfo);
      },
    );
  });
});
