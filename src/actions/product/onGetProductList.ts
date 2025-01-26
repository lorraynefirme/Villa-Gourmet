"use client";

import { assertionIsNotNulish } from "@/functions/asserts/index";
import { ProductService } from "@/service/http/productService";
import { ResponseGetProductList } from "@/service/http/productService.interface";

export const onGetProductList = async (): Promise<
  ResponseGetProductList | undefined
> => {
  try {
    const response = await ProductService.getProductList();

    assertionIsNotNulish(response);

    if (response) {
      return {
        data: response.data,
        message: response.message,
      };
    }
  } catch (error) {}
};
