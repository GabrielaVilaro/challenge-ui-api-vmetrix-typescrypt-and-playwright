import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
test.describe('Checkout flow', () => {

  test('should complete checkout with 3 products successfully', async ({ page }) => {
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
    await homePage.addToCartByName('sauce-labs-bike-light');
    await homePage.addToCartByName('sauce-labs-bolt-t-shirt');

    const cartCount = await homePage.getCartCount();
    expect(cartCount).toBe('3');

    await homePage.goToCart();
    await cartPage.checkout();

    await checkoutPage.fillContactInfo('Test', 'Testing', '1234');

  const subtotal = await checkoutPage.getSubtotal();
  const tax = await checkoutPage.getTax();
  const total = await checkoutPage.getTotalAmount();

  expect(total).toBeCloseTo(subtotal + tax, 2);

  await checkoutPage.finish();

  const confirmation = await checkoutPage.getConfirmationMessage();
  expect(confirmation).toBe('Thank you for your order!');
  });
});