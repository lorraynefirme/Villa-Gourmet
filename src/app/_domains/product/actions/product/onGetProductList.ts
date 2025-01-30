"use server";

import { assertionIsNotNulish } from "@/functions/asserts/index";
import { ProductRepository } from "@/repositories/http/productRepository";
import { ResponseGetProductList } from "@/repositories/http/productRepository.interface";
import { AxiosError } from "axios";

export const onGetProductList = async (): Promise<
  ResponseGetProductList | undefined
> => {
  try {
    const response = await ProductRepository.getProductList();

    assertionIsNotNulish(response);

    if (response) {
      return {
        data: response.data,
        message: response.message,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError || error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};
