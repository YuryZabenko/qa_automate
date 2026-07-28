import { test, expect } from '@playwright/test';
import { addBlock } from '../helpers/test.helper.js';
import { ProductsPage } from '../pages/products.page.js';
import { ProductData } from '../test-data/product.data.js';

test.describe('Positive products tests', () => {
  let productPage;

  test.beforeEach(async ({ page }) => {
    await addBlock(page);
    productPage = new ProductsPage(page);
    await productPage.open();
    await productPage.header.goToProducts();
    await expect(await productPage.products.titleTextLocator).toHaveText(productPage.products.titleText);
  });

  test('should product card and information to be visible', async () => {
    expect(await productPage.products.getProductsCount()).toBeGreaterThan(0);
    await productPage.products.viewProduct(1);
    await expect(await productPage.productCard.productName).toBeVisible();
    await expect(await productPage.productCard.productCategory).toBeVisible();
    await expect(await productPage.productCard.price).toBeVisible();
    await expect(await productPage.productCard.availability).toBeVisible();
    await expect(await productPage.productCard.condition).toBeVisible();
    await expect(await productPage.productCard.brand).toBeVisible();
  });

  test('should add products to cart', async () => {
    const productsToCart = [];
    productsToCart.push(await productPage.products.getProductInfo(1));
    await productPage.products.addToCart(1);
    await productPage.modal.continueShopping();

    productsToCart.push(await productPage.products.getProductInfo(2));
    await productPage.products.addToCart(2);
    const cartPage = await productPage.modal.viewCart();

    const productsInCart = await cartPage.getAllCartProducts();
    expect(productsToCart).toEqual(productsInCart);
    expect(await cartPage.checkTotalSum()).toBeTruthy();
  });

  ProductData.getQuantityDataPositive().forEach(({ position, quantity }) => {
    test(`should add ${quantity} products at position ${position} to cart`, async () => {
      const needProduct = await productPage.products.getProductInfo(position);
      await productPage.products.viewProduct(position);

      const openProduct = await productPage.productCard.getProductInfo();
      expect(needProduct).toEqual(openProduct);

      await productPage.productCard.changeQuantity(String(quantity));
      await productPage.productCard.addToCart();
      const cartPage = await productPage.modal.viewCart();

      const cartProduct = await cartPage.getProductInfo(1);
      expect(cartProduct).toEqual(needProduct);
      const quantityProduct = await cartPage.getQuantityOfProduct(1);
      expect(quantityProduct).toEqual(quantity);
      expect(await cartPage.checkTotalSum()).toBeTruthy();
    });
  });

  test('should delete product from cart', async () => {
    await productPage.products.addToCart(1);
    const cartPage = await productPage.modal.viewCart();
    expect(await cartPage.getAllCartProducts()).toHaveLength(1);
    await cartPage.deleteProduct(1);
    expect(await cartPage.getAllCartProducts()).toHaveLength(0);
  });

  test('should add review on product with correct name and e-mail', async () => {
    await productPage.products.viewProduct(1);
    await expect(productPage.productCard.submitButton).toBeVisible();
    await productPage.productCard.fillReview();
    await expect(await productPage.productCard.alertLocator).toBeVisible();
    await expect(await productPage.productCard.alertLocator).toHaveText(productPage.productCard.alertText);
  });
});
