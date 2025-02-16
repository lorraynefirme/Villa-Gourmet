import {
  ResponseGetProductById,
  ResponseGetProductList,
} from "./productRepository.interface";
import { HttpClient, HttpResponse } from "@/infra";

export class ProductRepository {
  constructor(private readonly httpClient: HttpClient) {}

  getProductList = async (
    page: number,
    pageSize: number
  ): Promise<HttpResponse<ResponseGetProductList>> => {
    const responseApi = await this.httpClient.request({
      url: `products?_page=${page}&_limit=${pageSize}`,
      method: "get",
    });

    return {
      body: {
        data: responseApi.body,
        totalCount: parseInt(responseApi.headers["x-total-count"] || "0", 10),
        message: "Produtos retornados com sucesso",
      },
      statusCode: responseApi.statusCode,
    };
  };

  getProductById = async (
    id: string
  ): Promise<HttpResponse<ResponseGetProductById>> => {
    const responseApi = await this.httpClient.request({
      url: `products/${id}`,
      method: "get",
    });

    return {
      body: {
        data: responseApi.body,
        message: "Produto retornado com sucesso",
      },
      statusCode: responseApi.status,
    };
  };
}
