import { ApiBase } from './ApiBase';

export class ProductsApi extends ApiBase {
  async getAll(limit: number, skip: number) {
    return await this.get(`/products?limit=${limit}&skip=${skip}`);
  }

  async getById(id: number) {
    return await this.get(`/products/${id}`);
  }

  async create(product: object) {
    return await this.post('/products/add', product);
  }

  async update(id: number, product: object) {
    return await this.put(`/products/${id}`, product);
  }

  async remove(id: number) {
    return await this.delete(`/products/${id}`);
  }
}