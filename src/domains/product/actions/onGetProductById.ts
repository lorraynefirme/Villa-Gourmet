"use server";

import { assertionIsNotNulish } from "@/utils/asserts/index";
import { ProductRepository } from "@/repositories/http/productRepository";
import { ResponseGetProductById } from "@/repositories/http/productRepository.interface";

export const onGetProductById = async (
  id: string
): Promise<ResponseGetProductById | undefined> => {
  try {
    const response = await ProductRepository.getProductById(id);

    assertionIsNotNulish(response);

    if (response) {
      return {
        data: response.data,
        message: response.message,
      };
    }
  } catch (error) {
    throw error
  }
};
