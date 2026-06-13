import { test, expect } from '@playwright/test';
import { ProductsApi } from '../../api/ProductsApi';

test.describe('Products CRUD', () => {

  test('should create a product', async ({ request }) => {
    const productsApi = new ProductsApi(request);

    const newProduct = {
      title: 'Test Product',
      price: 99.99,
      description: 'Product created for testing',
      category: 'smartphones',
      stock: 10,
    };

    const { response: createResponse, body: createdProduct } = await productsApi.create(newProduct);
    expect(createResponse.status()).toBe(201);
    expect(createdProduct.title).toBe(newProduct.title);
    expect(createdProduct.price).toBe(newProduct.price);
    expect(createdProduct.id).toBeDefined();
  });

  test('should update an existing product', async ({ request }) => {
    const productsApi = new ProductsApi(request);

    const updatedData = {
      title: 'Updated Test Product',
      price: 149.99,
    };

    const { response: updateResponse, body: updatedProduct } = await productsApi.update(1, updatedData);
    expect(updateResponse.status()).toBe(200);
    expect(updatedProduct.title).toBe(updatedData.title);
    expect(updatedProduct.price).toBe(updatedData.price);
  });

  test('should delete an existing product', async ({ request }) => {
    const productsApi = new ProductsApi(request);

    const { response: deleteResponse, body: deletedProduct } = await productsApi.remove(1);
    expect(deleteResponse.status()).toBe(200);
    expect(deletedProduct.isDeleted).toBe(true);
  });
});