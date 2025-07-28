import { Page, Locator } from '@playwright/test';

export class BookingPage {
  readonly page: Page;
  readonly form: Locator;
  //readonly scrollTarget: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator('#booking-form');
    //this.scrollTarget = page.locator('//h4[contains(normalize-space(),"Buy Testing Web APIs")]');
  }

  async fillForm(name: string, price: string) {
    await this.form.locator('input[name="firstname"]').fill(name);
    await this.form.locator('input[name="totalprice"]').fill(price);
  }

  async scrollToFooter() {
    await this.page.evaluate(() => {
       window.scrollTo(0, document.body.scrollHeight);
});

  }
}
