import { test, expect } from '@playwright/test';
import { BookingPage } from '../../pages/BookingPage';

test.only('Fill booking form with valid details', async ({ page }) => {
  // Step 1: Navigate to the booking form page
  await page.goto('https://automationintesting.online/');

  // Step 2: Create instance of BookingPage
  const bookingPage = new BookingPage(page);
  await bookingPage.scrollToBottom();
  await bookingPage.validateFormVisible();
  await bookingPage.booking();

  // Step 3: Fill the form with valid inputs
  await bookingPage.fillForm(
    'Anamika',        
    'Mohan',          
    'anamika@gmail.com',  
    456777866567          
  );

// Click the Reserve Now button
await page.click('button.btn.btn-primary:has-text("Reserve Now")');

// Wait explicitly for confirmation to appear
const confirmationMessage = page.locator('//h2[contains(normalize-space(),"Booking Confirmed")]');
await expect(confirmationMessage).toHaveText('Booking Confirmed', { timeout: 10000 });

});