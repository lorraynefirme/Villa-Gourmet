"use server";

import { assertionIsNotNulish } from "@/utils/asserts/index";
import { ProductRepository } from "@/repositories/http/productRepository";
import { ResponseGetProductById } from "@/repositories/http/productRepository.interface";
import { HttpClientFactory } from "@/infra/factory/httpClientFactory";

export const onGetProductById = async (
  id: string
): Promise<ResponseGetProductById | undefined> => {
  try {
    const response = await new ProductRepository(HttpClientFactory("fetch")).getProductById(id)

    assertionIsNotNulish(response);

    if (response.body) {
      return {
        data: response.body.data,
        message: response.body.message,
      };
    }
  } catch (error) {
    throw error
  }
};
