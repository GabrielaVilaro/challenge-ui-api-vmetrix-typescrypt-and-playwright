import { ApiBase } from './ApiBase';

export class CartsApi extends ApiBase {
  async create(cart: object) {
    return await this.post('/carts/add', cart);
  }
}