import { test, expect } from '../../../fixtures/fixtures.js';

test.describe('Category products tests', () => {
  test(
    'should navigate to all categories and verify products',
    { tag: ['@regression', '@positive', '@ui'] },
    async ({ productsPage }) => {
      const categories = productsPage.category.getCategoriesData();

      for (const { category, subCategory, categoryLocator, subCategoryLocator, expectedText } of categories) {
        await test.step(`Navigate to ${category} > ${subCategory}`, async () => {
          await productsPage.category.navigateToCategory(categoryLocator, subCategoryLocator);
          await expect(productsPage.productList.titleTextLocator).toHaveText(expectedText);
          const productCount = await productsPage.productList.products.count();
          expect(productCount).toBeGreaterThan(0);
        });
      }
    },
  );

  test(
    'should navigate to all brands and verify products',
    { tag: ['@regression', '@positive', '@ui'] },
    async ({ productsPage }) => {
      const brands = productsPage.category.getBrandsData();

      for (const { brand, brandLocator, expectedText } of brands) {
        await test.step(`Navigate to brand ${brand}`, async () => {
          await productsPage.category.navigateToBrand(brandLocator);
          await expect(productsPage.productList.titleTextLocator).toHaveText(expectedText);
          const productCount = await productsPage.productList.products.count();
          expect(productCount).toBeGreaterThan(0);
        });
      }
    },
  );
});
