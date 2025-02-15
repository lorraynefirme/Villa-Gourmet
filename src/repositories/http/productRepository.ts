import ApiUnknownError from "@/services/apiUnknownError ";
import {
  ResponseGetProductById,
  ResponseGetProductList,
} from "./productRepository.interface";

export const ProductRepository = {
  getProductList: async (
    page: number,
    pageSize: number
  ): Promise<ResponseGetProductList> => {
    try {
      const response = await fetch(
        `https://api-produtos-one.vercel.app/api/products?page=${page}&limit=${pageSize}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      const products = await response.json();

      return {
        data: products,
        totalCount: parseInt(response.headers.get("x-total-count") || "0", 10),
        message: "Produtos retornados com sucesso",
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new ApiUnknownError();
      }
    }
  },

  getProductById: async (id: string): Promise<ResponseGetProductById> => {
    try {
      const response = await fetch(
        `https://api-produtos-one.vercel.app/api/products/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      const product = await response.json();

      return {
        data: product,
        message: "Produto retornado com sucesso",
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new ApiUnknownError();
      }
    }
  },
};
