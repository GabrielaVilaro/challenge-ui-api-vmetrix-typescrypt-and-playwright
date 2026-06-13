import { test, expect } from '@playwright/test';
import { AuthApi } from '../../api/AuthApi';

test.describe('Auth API', () => {

  test('should login successfully with valid credentials', async ({ request }) => {
    const authApi = new AuthApi(request);

    const { response, body } = await authApi.login('emilys', 'emilyspass');

    expect(response.status()).toBe(200);
    expect(body.accessToken).toBeDefined();
    expect(body.username).toBe('emilys');
    expect(body.email).toBeDefined();
  });

  test('should fail login with invalid credentials', async ({ request }) => {
    const authApi = new AuthApi(request);

    const { response, body } = await authApi.login('no_existe_user', 'no_existe_pass');

    expect(response.status()).toBe(400);
    expect(body.message).toBeDefined();
  });
});