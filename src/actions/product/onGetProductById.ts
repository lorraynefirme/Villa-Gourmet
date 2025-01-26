"use client";

import { assertionIsNotNulish } from "@/functions/asserts/index";
import { ProductService } from "@/service/http/productService";
import { ResponseGetProductById } from "@/service/http/productService.interface";

export const onGetProductById = async (
  id: string
): Promise<ResponseGetProductById | undefined> => {
  try {
    const response = await ProductService.getProductById(id);

    assertionIsNotNulish(response);

    if (response) {
      return {
        data: response.data,
        message: response.message,
      };
    }
  } catch (error) {}
};
