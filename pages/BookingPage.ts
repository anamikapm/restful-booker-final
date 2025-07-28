import { Page, Locator } from '@playwright/test';

export class BookingPage {
  readonly page: Page;
  readonly form: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator('#booking-form');
  }

  async fillForm(
    firstName: string,
    lastName: string,
    price: number,
    depositPaid: string,
    checkin: string,
    checkout: string,
    additionalNeeds: string
  ) {
    await this.page.fill('input[name="firstname"]', firstName);
    await this.page.fill('input[name="lastname"]', lastName);
    await this.page.fill('input[name="totalprice"]', price.toString());
    await this.page.selectOption('select[name="depositpaid"]', depositPaid);
    await this.page.fill('input[name="checkin"]', checkin);
    await this.page.fill('input[name="checkout"]', checkout);
    await this.page.fill('input[name="additionalneeds"]', additionalNeeds);
  }
}
