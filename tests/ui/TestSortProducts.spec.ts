import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';

test.describe('Sort products', () => {

  test('should sort products by price low to high', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.navigate();
    await loginPage.login(
    process.env.SAUCEDEMO_USERNAME!,
    process.env.SAUCEDEMO_PASSWORD!
    );

    await homePage.sortBy('lohi');

    const prices = await homePage.getProductPrices();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));

    for (let i = 0; i < numericPrices.length - 1; i++) {
      expect(numericPrices[i]).toBeLessThanOrEqual(numericPrices[i + 1]);
    }
  });

  test('should sort products by price high to low', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.navigate();
    await loginPage.login(
    process.env.SAUCEDEMO_USERNAME!,
    process.env.SAUCEDEMO_PASSWORD!
    );

    await homePage.sortBy('hilo');

    const prices = await homePage.getProductPrices();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));

    for (let i = 0; i < numericPrices.length - 1; i++) {
      expect(numericPrices[i]).toBeGreaterThanOrEqual(numericPrices[i + 1]);
    }
  });
});