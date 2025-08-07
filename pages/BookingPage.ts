import { Page, Locator } from '@playwright/test';

export class BookingPage {
  readonly page: Page;
  readonly bookingForm: Locator;
  readonly checkIn: Locator;
  readonly singleRoom: Locator;
  constructor(page: Page) {
    this.page = page;
    this.bookingForm = page.locator('//a[contains(normalize-space(),"Book Now")]');
    this.checkIn = page.locator('button.btn.btn-primary.w-100.py-2');
    this.singleRoom = page.locator('a[href^="/reservation/1"]');
  }

  async fillForm(
    firstName: string,
    lastName: string,
    email: string,
    phone: number
  ) {

    await this.page.fill('input[name="firstname"]', firstName);
    await this.page.fill('input[name="lastname"]', lastName);
    await this.page.fill('input[name="email"]',email);
    await this.page.fill('input[name="phone"]', phone.toString());
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.checkIn.click();
  }

  async takeBookingFormScreenshot() {
    await this.bookingForm.screenshot({ path: 'screenshots/booking-form.png' });
  }

  async validateFormVisible() {
    await this.bookingForm.waitFor({ state: 'visible' });
    await this.singleRoom.click(); 

  }

  async booking() {
    //await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.locator('//button[text()="Reserve Now"]').click();
  }
}
