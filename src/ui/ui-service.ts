import { APIRequestContext } from '@playwright/test';
import { requireEnv } from '../utils/env';

export class ShoppingApi {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string = requireEnv(process.env.UI_URL as string)
  ) {}

  /**
   * Adds an item to the cart via an API call
   * @param itemId id of the item to add to the cart
   * @returns API response of the add-to-cart operation
   */
  async addItemToCartViaAPI(itemId: number) {
    return this.request.post(this.baseUrl + `/add_to_cart/${itemId}`, {
      form: {
        itemId,
      },
    });
  }

  /**
   * Verifies the login credentials of a given user via the shopping API
   * @param email email of the user
   * @param password password for the user
   * @returns API response of the login verification
   */
  async verifyLogin(email: string, password: string) {
    return this.request.post(this.baseUrl + '/api/verifyLogin', {
      form: {
        email,
        password,
      },
    });
  }
}
