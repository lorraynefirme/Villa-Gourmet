"use client";

import { ProductService } from "@/service/http/productService";
import { ResponseGetProductList } from "@/service/http/productService.interface";

export const onGetProductList = async (): Promise<
  ResponseGetProductList | undefined
> => {
  try {
    const response = await ProductService.getProductList();

    if (response) {
      return {
        data: response.data,
        message: response.message,
      };
    }
  } catch (error) {}
};
