import axios, { AxiosError } from "axios";

import { HttpClient, HttpRequest } from "../http";

const axiosInstance = axios.create({ baseURL: "https://api-produtos-one.vercel.app/" });

export class AxiosHttpClientAdapter implements HttpClient {
  async request(data: HttpRequest) {
    try {
      const response = await axiosInstance.request({
        url: data.url,
        method: data.method,
        data: data.body,
      });

      return {
        statusCode: response.status,
        body: response.data,
        headers: response.headers
      }
    } catch (error) {
      const _error = error as AxiosError<{message: string}>
      throw new Error(_error.response?.data?.message)
    }
  }
}
