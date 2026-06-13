import { test, expect } from '@playwright/test';
import { ProductsApi } from '../../api/ProductsApi';
import { newProduct, updatedProduct } from '../../fixtures/products.data';

test.describe('Products CRUD', () => {

  test('should create a product', async ({ request }) => {
    const productsApi = new ProductsApi(request);

    const { response: createResponse, body: createdProduct } = await productsApi.create(newProduct);
    expect(createResponse.status()).toBe(201);
    expect(createdProduct.title).toBe(newProduct.title);
    expect(createdProduct.price).toBe(newProduct.price);
    expect(createdProduct.id).toBeDefined();
  });

  test('should update an existing product', async ({ request }) => {
    const productsApi = new ProductsApi(request);

    const { response: updateResponse, body: updatedProductResponse } = await productsApi.update(1, updatedProduct);
    expect(updateResponse.status()).toBe(200);
    expect(updatedProductResponse.title).toBe(updatedProduct.title);
    expect(updatedProductResponse.price).toBe(updatedProduct.price);
  });

  test('should delete an existing product', async ({ request }) => {
    const productsApi = new ProductsApi(request);

    const { response: deleteResponse, body: deletedProduct } = await productsApi.remove(1);
    expect(deleteResponse.status()).toBe(200);
    expect(deletedProduct.isDeleted).toBe(true);
  });
});