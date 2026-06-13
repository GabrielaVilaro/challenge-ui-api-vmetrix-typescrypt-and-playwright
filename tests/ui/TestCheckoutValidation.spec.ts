import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout validation', () => {

  test('should show error when checkout fields are empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login(
    process.env.SAUCEDEMO_USERNAME!,
    process.env.SAUCEDEMO_PASSWORD!
    );

    await homePage.addToCartByName('sauce-labs-backpack');
    await homePage.goToCart();
    await cartPage.checkout();

    await checkoutPage.clickContinueWithoutFilling();

    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain('First Name is required');
  });
});