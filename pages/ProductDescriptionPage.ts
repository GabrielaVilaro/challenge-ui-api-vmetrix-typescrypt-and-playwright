import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async addToCart() {
    await this.page.getByTestId('add-to-cart').click();
  }

  async removeFromCart() {
    await this.page.getByTestId('remove').click();
  }

  async getProductName(): Promise<string> {
    return await this.page.locator('.inventory_details_name').innerText();
  }

  async getProductDescription(): Promise<string> {
    return await this.page.locator('.inventory_details_desc').innerText();
  }

  async getProductPrice(): Promise<string> {
    return await this.page.locator('.inventory_details_price').innerText();
  }

  async isProductImageVisible(): Promise<boolean> {
    return await this.page.locator('.inventory_details_img').isVisible();
  }

  async getProductImageSrc(): Promise<string> {
    return await this.page.locator('.inventory_details_img').getAttribute('src') ?? '';
  }

  async backToProducts() {
    await this.page.getByTestId('back-to-products').click();
  }
}