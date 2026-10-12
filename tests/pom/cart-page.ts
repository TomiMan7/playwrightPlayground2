import { Page, Locator } from '@playwright/test';

export class CartPagePOM {
  readonly page: Page;

  readonly proceedToCheckoutButton: Locator;
  readonly registerPopup: Locator;
  readonly registerPopupButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
    this.registerPopup = page.getByText('Checkout Register / Login');
    this.registerPopupButton = page.getByRole('button', {
      name: 'Continue On Cart',
    });
  }

  /**
   * Returns the cart item with the given ID
   * @param value - the accessible name of the cart item heading to look for
   * @returns locator of the cart item
   */
  async getCartItem(value: string): Promise<Locator> {
    return this.page.getByRole('heading', { name: value });
  }

  /**
   * Returns the quantity text for a specific cart item.
   * @param id - the product id of the cart item
   * @param page - the Playwright Page to query
   * @returns the quantity value as text
   */
  async getCartItemQuantity(id: number, page: Page): Promise<string> {
    return page.locator(`#product-${id} .cart_quantity`).innerText();
  }
}
