import { test, expect } from '@playwright/test';
import { UsersApi } from '../../api/UsersApi';

test.describe('Users API', () => {

  test('should sort users ascending by last name', async ({ request }) => {
    const usersApi = new UsersApi(request);

    const { response, body } = await usersApi.getAll('lastName', 'asc');

    expect(response.status()).toBe(200);
    expect(body.users).toBeDefined();
    expect(body.users.length).toBeGreaterThan(0);

    const lastNames = body.users.map((u: { lastName: string }) => u.lastName);
    for (let i = 0; i < lastNames.length - 1; i++) {
      expect(lastNames[i].localeCompare(lastNames[i + 1])).toBeLessThanOrEqual(0);
    }
  });

  test('should sort users descending by last name', async ({ request }) => {
    const usersApi = new UsersApi(request);

    const { response, body } = await usersApi.getAll('lastName', 'desc');

    expect(response.status()).toBe(200);
    expect(body.users).toBeDefined();

    const lastNames = body.users.map((u: { lastName: string }) => u.lastName);
    for (let i = 0; i < lastNames.length - 1; i++) {
      expect(lastNames[i].localeCompare(lastNames[i + 1])).toBeGreaterThanOrEqual(0);
    }
  });
});