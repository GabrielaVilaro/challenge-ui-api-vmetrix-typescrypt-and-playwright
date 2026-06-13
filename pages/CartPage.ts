import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await super.navigate('/cart.html');
  }

  async checkout() {
    await this.page.getByTestId('checkout').click();
  }

  async continueShopping() {
    await this.page.getByTestId('continue-shopping').click();
  }
}