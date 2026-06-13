import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { ProductDetailPage } from '../../pages/ProductDescriptionPage';

test.describe('Product detail', () => {

  test('should display product details and add/remove from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productDetailPage = new ProductDetailPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    await homePage.clickProduct('Sauce Labs Backpack');

    const productName = await productDetailPage.getProductName();
    expect(productName).toBe('Sauce Labs Backpack');

    const productDescription = await productDetailPage.getProductDescription();
    expect(productDescription).not.toBe('');

    const isImageVisible = await productDetailPage.isProductImageVisible();
    expect(isImageVisible).toBe(true);

    const imageSrc = await productDetailPage.getProductImageSrc();
    expect(imageSrc).not.toBe('');

    await productDetailPage.addToCart();
    const cartCount = await homePage.getCartCount();
    expect(cartCount).toBe('1');

    await productDetailPage.removeFromCart();
    const isEmpty = await homePage.isCartEmpty();
    expect(isEmpty).toBe(true);
  });
});