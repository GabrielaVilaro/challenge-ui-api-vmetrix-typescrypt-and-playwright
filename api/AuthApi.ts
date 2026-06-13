import { ApiBase } from './ApiBase';

export class AuthApi extends ApiBase {
  async login(username: string, password: string) {
    return await this.post('/auth/login', { username, password });
  }
}