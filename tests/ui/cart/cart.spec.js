import { test, expect } from '../../../fixtures/fixtures.js';
import { ProductData } from '../../../test-data/product.data.js';
import { getRandom } from '../../../helpers/test.helper.js';
import { ApiHelper } from '../../../helpers/api.helper.js';

test.describe('Cart tests', () => {
  test.describe('Cart tests - positive', () => {
    test(
      'should add products to cart',
      { tag: ['@smoke', '@regression', '@positive', '@ui'] },
      async ({ productsPage }) => {
        const productsToCart = [];
        productsToCart.push(await productsPage.productList.getProductInfo(1));
        await productsPage.productList.addToCart(1);
        await productsPage.modal.clickElement(productsPage.modal.continueShoppingButton, 'Continue Shopping');
        productsToCart.push(await productsPage.productList.getProductInfo(2));
        await productsPage.productList.addToCart(2);
        const cartPage = await productsPage.modal.viewCart();
        const productsInCart = await cartPage.getAllCartProducts();
        expect(productsToCart).toEqual(productsInCart);
        await cartPage.checkTotalSum();
      },
    );

    test('should delete product from cart', { tag: ['@regression', '@positive', '@ui'] }, async ({ productsPage }) => {
      const countProducts = await productsPage.productList.getProductsCount();
      await productsPage.productList.addToCart(getRandom(1, countProducts));
      const cartPage = await productsPage.modal.viewCart();
      expect(await cartPage.getAllCartProducts()).toHaveLength(1);
      await cartPage.deleteProduct(1);
      await cartPage.waitLoad();
      await expect(cartPage.emptyCart).toBeVisible();
    });

    ProductData.getQuantityDataPositive().forEach(({ position, quantity }) => {
      test(
        `should add ${quantity} products at position ${position} to cart`,
        { tag: ['@regression', '@positive', '@ui'] },
        async ({ productsPage }) => {
          const needProduct = await productsPage.productList.getProductInfo(position);
          const productDetailPage = await productsPage.productList.openProduct(position);
          const openProduct = await productDetailPage.getProductInfo();
          expect(needProduct).toEqual(openProduct);
          await productDetailPage.changeQuantity(String(quantity));
          await productDetailPage.addToCart();
          const cartPage = await productDetailPage.modal.viewCart();
          const cartProduct = await cartPage.getProductInfo(1);
          expect(cartProduct).toEqual(needProduct);
          const quantityProduct = await cartPage.getQuantityOfProduct(1);
          expect(quantityProduct).toEqual(quantity);
          await cartPage.checkTotalSum();
        },
      );
    });

    test(
      'should validate checkout delivery info, totals and product consistency',
      { tag: ['@regression', '@positive', '@ui'] },
      async ({ loggedUser, productsPage }) => {
        const countProducts = await productsPage.productList.getProductsCount();
        const needProductIndex1 = getRandom(1, countProducts);
        const needProductIndex2 = getRandom(1, countProducts);
        await productsPage.productList.addToCart(needProductIndex1);
        await productsPage.modal.clickElement(productsPage.modal.continueShoppingButton, 'Continue Shopping');
        await productsPage.productList.addToCart(needProductIndex2);
        const cartPage = await productsPage.modal.viewCart();
        const allProductsInCart = await cartPage.getAllCartProducts();
        const totalCartSum = await cartPage.getTotalSumInCart();
        await cartPage.clickElement(cartPage.proceedButton, 'Proceed to checkout');
        await cartPage.placeOrderButton.waitFor({ state: 'visible' });
        const totalBillingSum = await cartPage.getTotalSumCheckout();
        expect(totalCartSum).toEqual(totalBillingSum);
        const allProductsInOrder = await cartPage.getAllCartProducts();
        expect(allProductsInCart).toEqual(allProductsInOrder);
        await cartPage.checkDeliveryInfo(loggedUser);
        await ApiHelper.deleteUser(loggedUser.email, loggedUser.password);
      },
    );
  });

  test.describe('Cart tests - negative', () => {
    ProductData.getQuantityDataNegative().forEach(({ position, quantity }) => {
      test.fail(
        `should not add ${quantity} products at position ${position} to cart`,
        { tag: ['@regression', '@negative', '@ui'] },
        async ({ productsPage }) => {
          const productDetailPage = await productsPage.productList.openProduct(position);
          await productDetailPage.changeQuantity(String(quantity));
          let isError = false;
          try {
            await productDetailPage.addToCart();
            const cartPage = await productDetailPage.modal.viewCart();
            const productInCart = await cartPage.getAllCartProducts();
            expect(productInCart).toHaveLength(0);
          } catch {
            isError = true;
          }
          expect(isError).toBeFalsy();
          await expect(productsPage.modal.accesText).toBeHidden();
        },
      );
    });
  });
});
