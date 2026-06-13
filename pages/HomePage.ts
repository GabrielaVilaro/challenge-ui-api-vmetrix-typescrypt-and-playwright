import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await super.navigate('/inventory.html');
  }

  async goToCart() {
    await this.page.getByTestId('shopping-cart-link').click();
  }

  async addToCartByName(productName: string) {
    const id = productName.toLowerCase().replace(/ /g, '-');
    await this.page.getByTestId(`add-to-cart-${id}`).click();
  }

  async removeFromCartByName(productName: string) {
    const id = productName.toLowerCase().replace(/ /g, '-');
    await this.page.getByTestId(`remove-${id}`).click();
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.getByTestId('product-sort-container').selectOption(value);
  }

  async getCartCount(): Promise<string> {
    return await this.page.getByTestId('shopping-cart-badge').innerText();
  }

  async isCartEmpty(): Promise<boolean> {
    return !(await this.page.getByTestId('shopping-cart-badge').isVisible());
  }

  async getProductNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allInnerTexts();
  }

  async getProductPrices(): Promise<string[]> {
    return await this.page.locator('.inventory_item_price').allInnerTexts();
  }

  async clickProduct(productName: string) {
    await this.page.getByText(productName).click();
  }
}