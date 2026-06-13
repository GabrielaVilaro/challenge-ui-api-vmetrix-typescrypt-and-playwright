import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillContactInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.getByTestId('firstName').fill(firstName);
    await this.page.getByTestId('lastName').fill(lastName);
    await this.page.getByTestId('postalCode').fill(postalCode);
    await this.page.getByTestId('continue').click();
  }

  async getTotalLabel(): Promise<string> {
    return await this.page.locator('.summary_total_label').innerText();
  }

  async getSubtotal(): Promise<number> {
  const text = await this.page.locator('.summary_subtotal_label').innerText();
  return parseFloat(text.replace('Item total: $', ''));
}

async getTax(): Promise<number> {
  const text = await this.page.locator('.summary_tax_label').innerText();
  return parseFloat(text.replace('Tax: $', ''));
}

async getTotalAmount(): Promise<number> {
  const text = await this.page.locator('.summary_total_label').innerText();
  return parseFloat(text.replace('Total: $', ''));
}

async clickContinueWithoutFilling() {
  await this.page.getByTestId('continue').click();
}

async getErrorMessage(): Promise<string> {
  return await this.page.locator('[data-test="error"]').innerText();
}

  async finish() {
    await this.page.getByTestId('finish').click();
  }

  async getConfirmationMessage(): Promise<string> {
    return await this.page.locator('h2').innerText();
  }
}