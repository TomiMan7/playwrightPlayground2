import { test as base } from '@playwright/test';
import { ProductInfoPOM } from '../../tests/pom/product-detail-page';
import { CheckoutPagePOM } from '../../tests/pom/checkout-page';
import { LoginSignUpPOM } from '../../tests/pom/login-sign-up';
import { CartPagePOM } from '../../tests/pom/cart-page';
import { ProductsCartPOM } from '../../tests/pom/product-page';
import { ShoppingApi } from '../ui/ui-service';

type Fixtures = {
  productsPage: ProductsCartPOM;
  productInfoPage: ProductInfoPOM;
  checkoutPage: CheckoutPagePOM;
  cartPage: CartPagePOM;
  loginPage: LoginSignUpPOM;
  shoppingApi: ShoppingApi;
};

export const test = base.extend<Fixtures>({
  productsPage: async ({ page }, use) => {
    await use(new ProductsCartPOM(page));
  },

  productInfoPage: async ({ page }, use) => {
    await use(new ProductInfoPOM(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPagePOM(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPagePOM(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginSignUpPOM(page));
  },

  shoppingApi: async ({ request }, use) => {
    await use(new ShoppingApi(request));
  },
});

export const expect = test.expect;
