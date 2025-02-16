import { HttpClient, HttpRequest } from "../http";

const baseURL = 'https://api-produtos-one.vercel.app/'

export class FetchHttpClientAdapter implements HttpClient {
  async request(data: HttpRequest) {
    try {
      const response = await fetch(`${baseURL}${data.url}`, {
        method: data.method,
        body: data.body
      });

      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      const responseToJson =  await response.json()

      return {
        statusCode: response.status,
        body: responseToJson,
        headers: response.headers
      }
    } catch (error) {
      const _error = error as Error
      throw new Error(_error?.message)
    }
  }
}
