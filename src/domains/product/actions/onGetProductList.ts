"use server";

import { assertionIsNotNulish } from "@/utils/asserts/index";
import { ProductRepository } from "@/repositories/http/productRepository";
import { ResponseGetProductList } from "@/repositories/http/productRepository.interface";

export const onGetProductList = async (
  page: number,
  pageSize: number
): Promise<ResponseGetProductList | undefined> => {
  try {
    const response = await ProductRepository.getProductList(page, pageSize);

    assertionIsNotNulish(response);

    if (response) {
      return {
        data: response.data,
        totalCount: response.totalCount,
        message: response.message,
      };
    }
  } catch (error) {
    throw error;
  }
};
