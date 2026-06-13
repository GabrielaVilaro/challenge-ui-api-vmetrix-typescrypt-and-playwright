import { test, expect } from '@playwright/test';
import { ProductsApi } from '../../api/ProductsApi';
import { UsersApi } from '../../api/UsersApi';
import { CartsApi } from '../../api/CartsApi';

test.describe('E2E Products, Users and Carts', () => {

  test('should create product, user and cart and validate cart by user', async ({ request }) => {
    const productsApi = new ProductsApi(request);
    const usersApi = new UsersApi(request);
    const cartsApi = new CartsApi(request);

    const newProduct = {
      title: 'VMetrix Test Product',
      price: 99.99,
      description: 'Product for E2E test',
      category: 'smartphones',
      stock: 10,
    };

    const { response: productResponse, body: createdProduct } = await productsApi.create(newProduct);
    expect(productResponse.status()).toBe(201);
    expect(createdProduct.id).toBeDefined();
    expect(createdProduct.title).toBe(newProduct.title);

    const newUser = {
      firstName: 'Test',
      lastName: 'Testing',
      age: 30,
      email: 'test@test.com',
      username: 'gabrielatest',
      password: 'test1234',
    };

    const { response: userResponse, body: createdUser } = await usersApi.create(newUser);
    expect(userResponse.status()).toBe(201);
    expect(createdUser.id).toBeDefined();
    expect(createdUser.firstName).toBe(newUser.firstName);

    const existingUserId = 1;

    const newCart = {
      userId: existingUserId,
      products: [
        {
          id: createdProduct.id,
          quantity: 2,
        }
      ]
    };

const { response: cartResponse, body: createdCart } = await cartsApi.create(newCart);
expect(cartResponse.status()).toBe(201);
expect(createdCart.id).toBeDefined();
expect(createdCart.userId).toBe(existingUserId);
expect(createdCart.products).toBeDefined();

const { response: getCartResponse, body: userCarts } = await usersApi.getCartsByUser(existingUserId);
expect(getCartResponse.status()).toBe(200);
expect(userCarts.carts).toBeDefined();
expect(userCarts.carts.length).toBeGreaterThan(0);
  });
});