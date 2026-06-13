import { test, expect } from '@playwright/test';
import { ProductsApi } from '../../api/ProductsApi';

test.describe('Products API', () => {

  test('should get products with pagination', async ({ request }) => {
    const productsApi = new ProductsApi(request);
    const { response, body } = await productsApi.getAll(10, 0);

    expect(response.status()).toBe(200);
    expect(body.products).toHaveLength(10);
    expect(body.limit).toBe(10);
    expect(body.skip).toBe(0);
    expect(body.total).toBeGreaterThan(0);
  });
});