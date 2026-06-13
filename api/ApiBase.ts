import { APIRequestContext } from '@playwright/test';

export class ApiBase {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get(endpoint: string) {
    console.log(`GET ${endpoint}`);
    const response = await this.request.get(endpoint);
    const body = await response.json();
    console.log(`Response status: ${response.status()}`);
    console.log(`Response body: ${JSON.stringify(body, null, 2)}`);
    return { response, body };
  }

  async post(endpoint: string, data: object) {
    console.log(`POST ${endpoint}`);
    console.log(`Request body: ${JSON.stringify(data, null, 2)}`);
    const response = await this.request.post(endpoint, { data });
    const body = await response.json();
    console.log(`Response status: ${response.status()}`);
    console.log(`Response body: ${JSON.stringify(body, null, 2)}`);
    return { response, body };
  }

  async put(endpoint: string, data: object) {
    console.log(`PUT ${endpoint}`);
    console.log(`Request body: ${JSON.stringify(data, null, 2)}`);
    const response = await this.request.put(endpoint, { data });
    const body = await response.json();
    console.log(`Response status: ${response.status()}`);
    console.log(`Response body: ${JSON.stringify(body, null, 2)}`);
    return { response, body };
  }

  async delete(endpoint: string) {
    console.log(`DELETE ${endpoint}`);
    const response = await this.request.delete(endpoint);
    const body = await response.json();
    console.log(`Response status: ${response.status()}`);
    console.log(`Response body: ${JSON.stringify(body, null, 2)}`);
    return { response, body };
  }
}