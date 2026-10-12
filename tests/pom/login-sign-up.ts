import { Page, Locator } from '@playwright/test';

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  state: string;
  city: string;
  zipCode: string;
  mobileNumber: string;
}

export class LoginSignUpPOM {
  readonly page: Page;

  private readonly signupNameInput: Locator;
  private readonly signupEmailInput: Locator;
  private readonly signupButton: Locator;
  private readonly accountNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly firstnameInput: Locator;
  private readonly lastnameInput: Locator;
  private readonly addressInput: Locator;
  private readonly stateInput: Locator;
  private readonly cityInput: Locator;
  private readonly zipCodeInput: Locator;
  private readonly mobileNumberInput: Locator;
  private readonly createAccountButton: Locator;
  private readonly accountCreatedText: Locator;
  private readonly continueLink: Locator;
  private readonly consentButton: Locator;
  private readonly adCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.signupNameInput = page.getByRole('textbox', { name: 'Name' });
    this.signupEmailInput = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
    this.signupButton = page.getByRole('button', { name: 'Signup' });
    this.accountNameInput = page.getByRole('textbox', {
      name: 'Name *',
      exact: true,
    });
    this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
    this.firstnameInput = page.getByRole('textbox', {
      name: 'First name *',
    });
    this.lastnameInput = page.getByRole('textbox', { name: 'Last name *' });
    this.addressInput = page.getByRole('textbox', {
      name: 'Address * (Street address, P.',
    });
    this.stateInput = page.getByRole('textbox', { name: 'State *' });
    this.cityInput = page.getByRole('textbox', { name: 'City *' });
    this.zipCodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.getByRole('textbox', {
      name: 'Mobile Number *',
    });
    this.createAccountButton = page.getByRole('button', {
      name: 'Create Account',
    });
    this.accountCreatedText = page.getByText('Account Created!');
    this.continueLink = page.getByRole('link', { name: 'Continue' });
    this.consentButton = page.getByRole('button', { name: 'Consent' });
    this.adCloseButton = page.locator('iframe').locator('button').filter({ hasText: /close/i }).first();
  }

  /**
   * Navigates to the login/signup page using the UI_URL environment variable.
   * @returns a promise that resolves once the login page has loaded
   */
  async gotoLoginPage() {
    const url = process.env.UI_URL;
    await this.page.goto(url + '/login');
  }

  /**
   * Closes the advertisement overlay if its close button is visible.
   * @returns a promise that resolves once the ad is closed or skipped
   */
  async closeAdIfVisible(): Promise<void> {
    if (await this.adCloseButton.isVisible().catch(() => false)) {
      await this.adCloseButton.click();
    }
  }

  /**
   * Handles the cookie consent dialog when not running in CI.
   * @returns a promise that resolves once consent is handled or skipped
   */
  async handleCookieConsent(): Promise<void> {
    const isCI = !!process.env.CI || !!process.env.GITHUB_ACTIONS;
    if (!isCI) {
      await this.consentButton.waitFor({ state: 'visible' });
      await this.consentButton.click();
    }
  }

  /**
   * Submits the initial signup form with the provided name and email.
   * @param name name to register with
   * @param email email address to register with
   * @returns a promise that resolves once the signup form is submitted
   */
  async signupUser(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  /**
   * Fills in the full account details form with the provided signup data.
   * @param data signup data used to populate the account details form
   * @returns a promise that resolves once all account fields are filled
   */
  async fillAccountDetails(data: SignUpData): Promise<void> {
    await this.accountNameInput.fill(data.name);
    await this.passwordInput.fill(data.password);
    await this.firstnameInput.fill(data.firstname);
    await this.lastnameInput.fill(data.lastname);
    await this.addressInput.fill(data.address);
    await this.stateInput.fill(data.state);
    await this.cityInput.fill(data.city);
    await this.zipCodeInput.fill(data.zipCode);
    await this.mobileNumberInput.fill(data.mobileNumber);
  }

  /**
   * Verifies that the account was created and continues past the confirmation.
   * @returns a promise that resolves once the continue link is clicked
   */
  async verifyAndContinue(): Promise<void> {
    await this.accountCreatedText.waitFor({
      state: 'visible',
      timeout: 10000,
    });
    await this.continueLink.click();
  }

  /**
   * Completes the full signup flow from navigation to account confirmation.
   * @param data signup data used throughout the signup flow
   * @returns a promise that resolves once the signup flow is complete
   */
  async completeSignup(data: SignUpData): Promise<void> {
    await this.gotoLoginPage();
    await this.handleCookieConsent();
    await this.signupUser(data.name, data.email);
    await this.fillAccountDetails(data);
    await this.createAccountButton.click();
    await this.verifyAndContinue();
    await this.closeAdIfVisible();
  }

  /**
   * Navigates to the login page and handles consent and ads without signing up.
   * @returns a promise that resolves once the login page is ready
   */
  async goToLoginWithoutAuth(): Promise<void> {
    await this.gotoLoginPage();
    await this.handleCookieConsent();
    await this.closeAdIfVisible();
  }
}
