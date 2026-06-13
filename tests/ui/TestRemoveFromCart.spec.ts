import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';

test.describe('Remove from cart', () => {

  test('should remove products from home and cart should be empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.navigate();
    await loginPage.login(
    process.env.SAUCEDEMO_USERNAME!,
    process.env.SAUCEDEMO_PASSWORD!
    );

    await homePage.addToCartByName('sauce-labs-backpack');
    await homePage.addToCartByName('sauce-labs-bike-light');
    await homePage.addToCartByName('sauce-labs-bolt-t-shirt');

    const cartCountAfterAdd = await homePage.getCartCount();
    expect(cartCountAfterAdd).toBe('3');

    await homePage.removeFromCartByName('sauce-labs-backpack');
    const cartCountAfter1 = await homePage.getCartCount();
    expect(cartCountAfter1).toBe('2');

    await homePage.removeFromCartByName('sauce-labs-bike-light');
    const cartCountAfter2 = await homePage.getCartCount();
    expect(cartCountAfter2).toBe('1');

    await homePage.removeFromCartByName('sauce-labs-bolt-t-shirt');
    const isEmpty = await homePage.isCartEmpty();
    expect(isEmpty).toBe(true);
  });
});