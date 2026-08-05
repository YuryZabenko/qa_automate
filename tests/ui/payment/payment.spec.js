import { test, expect } from '../../../fixtures/fixtures.js';
import { UserData } from '../../../test-data/user.data.js';
import { ApiHelper } from '../../../helpers/api.helper.js';
import fs from 'fs';
import { getRandom } from '../../../helpers/test.helper.js';

test.describe('Payment tests', () => {
  test.describe('Payment tests - positive', () => {
    test(
      'should pay the bill with the correct payment card details',
      { tag: ['@smoke', '@regression', '@positive', '@ui'] },
      async ({ loggedUser, productsPage }) => {
        await productsPage.productList.addToCart(1);
        const cartPage = await productsPage.modal.viewCart();
        await cartPage.clickElement(cartPage.proceedButton, 'Proceed to checkout');
        const paymentPage = await cartPage.placeOrder();
        const paymentData = UserData.getPaymentData();
        await paymentPage.payOrder(paymentData);
        await expect(paymentPage.confirmedTextLocator).toBeVisible();
        await ApiHelper.deleteUser(loggedUser.email, loggedUser.password);
      },
    );
  });

  test(
    'should download invoice with correct sum and name',
    { tag: ['@regression', '@positive', '@ui'] },
    async ({ loggedUser, productsPage }) => {
      const countProducts = await productsPage.productList.getProductsCount();
      const position = getRandom(1, countProducts);
      const quantity = getRandom(1, 99);
      const productDetailPage = await productsPage.productList.openProduct(position);
      await productDetailPage.changeQuantity(String(quantity));
      await productDetailPage.addToCart();
      const cartPage = await productDetailPage.modal.viewCart();
      await cartPage.clickElement(cartPage.proceedButton, 'Proceed to checkout');
      let totalSum = await cartPage.getTotalSumCheckout();
      totalSum = totalSum.toString();
      const paymentPage = await cartPage.placeOrder();
      const paymentData = UserData.getPaymentData();
      await paymentPage.payOrder(paymentData);
      const filePath = await paymentPage.downloadInvoice();
      expect(fs.existsSync(filePath)).toBeTruthy();
      const fileData = fs.readFileSync(filePath, 'utf8');
      expect(fileData).toContain(totalSum);
      expect(fileData).toContain(loggedUser.firstName);
      expect(fileData).toContain(loggedUser.lastName);
      await ApiHelper.deleteUser(loggedUser.email, loggedUser.password);
    },
  );
});
