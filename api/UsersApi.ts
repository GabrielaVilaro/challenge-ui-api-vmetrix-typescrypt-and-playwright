import { ApiBase } from './ApiBase';

export class UsersApi extends ApiBase {
  async getAll(sortBy: string, order: string) {
    return await this.get(`/users?sortBy=${sortBy}&order=${order}`);
  }

  async getById(id: number) {
    return await this.get(`/users/${id}`);
  }

  async create(user: object) {
    return await this.post('/users/add', user);
  }

  async getCartsByUser(userId: number) {
    return await this.get(`/carts/user/${userId}`);
  }
}