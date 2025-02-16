"use server";

import { assertionIsNotNulish } from "@/utils/asserts/index";
import { ProductRepository } from "@/repositories/http/productRepository";
import { ResponseGetProductList } from "@/repositories/http/productRepository.interface";
import { HttpClientFactory } from "@/infra/factory/httpClientFactory";

export const onGetProductList = async (
  page: number,
  pageSize: number
): Promise<ResponseGetProductList | undefined> => {
  try {
    const response = await new ProductRepository(HttpClientFactory("fetch")).getProductList(page, pageSize)

    assertionIsNotNulish(response);

    if (response.body) {
      return {
        data: response.body.data,
        totalCount: response.body.totalCount,
        message: response.body.message,
      };
    }
  } catch (error) {
    throw error;
  }
};
