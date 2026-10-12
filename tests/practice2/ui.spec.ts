import { test, expect } from '../../src/fixtures/fixtures';
import { readFile } from 'node:fs/promises';
import { StatusCodes } from 'http-status-codes';
import { SignUpDataFactory } from '../../src/test-data/ui-sign-up-data-factory';

test.describe('auth tests', () => {
  test('Test the sign up functionality, with api validation at the end', async ({ shoppingApi }) => {
    const authState = JSON.parse(await readFile('.customerAuth.json', 'utf8'));
    const email = authState.email;
    const password = authState.password;

    const verificationBody = await test.step('Verify the signed up user exists via API', async () => {
      const verificationResponse = await shoppingApi.verifyLogin(email, password);
      return await verificationResponse.json();
    });

    await test.step('Validate the API verification response', async () => {
      expect(verificationBody.responseCode).toBe(StatusCodes.OK);
      expect(verificationBody.message).toMatch('User exists!');
    });
  });

  /*
  test('Add items to cart via API validate them on UI', async ({ request, productsPage, shoppingApi}) => {

    const itemId1 = SignUpDataFactory.createProductId(2, 3);
    const itemId2 = SignUpDataFactory.createProductId(4, 6);

    //Blocked by cloudeflare
    await shoppingApi.addItemToCartViaAPI(itemId1);
    await shoppingApi.addItemToCartViaAPI(itemId2);

    await productsPage.goToCartPage();
    //add checks if workaround is found
  });
  */

  test('Add items to cart, via ui, then validate them on the checkout page', async ({ page, productsPage, productInfoPage, checkoutPage, cartPage }) => {
    const itemId1 = SignUpDataFactory.createProductId(1, 3);
    const itemId2 = SignUpDataFactory.createProductId(4, 6);

    const productName1 = await test.step('Add the first product to the cart', async () => {
      await productsPage.goToSpecificProductInfoPageAndCloseAdIfVisible(itemId1);
      return await productInfoPage.addProductToCartAndReturnItsName();
    });

    const productName2 = await test.step('Add the second product to the cart', async () => {
      await productsPage.goToSpecificProductInfoPageAndCloseAdIfVisible(itemId2);
      return await productInfoPage.addProductToCartAndReturnItsName();
    });

    await test.step('Proceed to checkout from the cart', async () => {
      await productsPage.goToCartPage();
      await cartPage.proceedToCheckoutButton.waitFor({ state: 'visible' });
      await cartPage.proceedToCheckoutButton.click();
    });

    await test.step('Validate the products on the checkout page', async () => {
      expect(await (await checkoutPage.getCartItem(productName1)).isVisible()).toBe(true);
      expect(await (await checkoutPage.getCartItem(productName2)).isVisible()).toBe(true);
      expect(await checkoutPage.getCartItemQuantity(itemId1, page)).toBe('1');
      expect(await checkoutPage.getCartItemQuantity(itemId2, page)).toBe('1');
    });
  });
});

test.describe('unauth tests', () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test('Add items to cart, via ui, then validate them on the checkout page', async ({ page, productsPage, productInfoPage, loginPage, cartPage }) => {
    const itemId1 = SignUpDataFactory.createProductId(2, 3);
    const itemId2 = SignUpDataFactory.createProductId(4, 6);

    await test.step('Navigate to the login page without authentication', async () => {
      await loginPage.goToLoginWithoutAuth();
    });

    const productName1 = await test.step('Add the first product to the cart', async () => {
      await productsPage.goToSpecificProductInfoPageAndCloseAdIfVisible(itemId1);
      const name = await productInfoPage.addProductToCartAndReturnItsName();
      await productsPage.closeAdIfVisible();
      return name;
    });

    const productName2 = await test.step('Add the second product to the cart', async () => {
      await productsPage.goToSpecificProductInfoPageAndCloseAdIfVisible(itemId2);
      const name = await productInfoPage.addProductToCartAndReturnItsName();
      await productsPage.closeAdIfVisible();
      return name;
    });

    await test.step('Validate the products in the cart', async () => {
      await productsPage.goToCartPage();
      expect(await (await cartPage.getCartItem(productName1)).isVisible()).toBe(true);
      expect(await (await cartPage.getCartItem(productName2)).isVisible()).toBe(true);
      expect(await cartPage.getCartItemQuantity(itemId1, page)).toBe('1');
      expect(await cartPage.getCartItemQuantity(itemId2, page)).toBe('1');
    });

    await test.step('Proceed to checkout and expect the register popup', async () => {
      await cartPage.proceedToCheckoutButton.waitFor({ state: 'visible' });
      await cartPage.proceedToCheckoutButton.click();

      expect(cartPage.registerPopup).toBeVisible();
      expect(cartPage.registerPopupButton).toBeVisible();
    });

    await test.step('Dismiss the register popup', async () => {
      await cartPage.registerPopupButton.click();
      expect(cartPage.registerPopup).not.toBeVisible();
    });
  });
});
