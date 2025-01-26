import apiService from "../apiService";
import {
  ResponseGetProductById,
  ResponseGetProductList,
} from "./productService.interface";

export const ProductService = {
  getProductList: async (): Promise<ResponseGetProductList | undefined> => {
    try {
      const response = await apiService.get("/products");
      const products = await response.data;

      return {
        data: products,
        message: "",
      };
    } catch (error) {
      console.error("Erro:", error);
    }
  },

  getProductById: async (id: string): Promise<ResponseGetProductById | undefined> => {
    try {
      const response = await apiService.get(`/products/${id}`);
      const product = await response.data;

      return {
        data: product,
        message: "",
      };
    } catch (error) {
      console.error("Erro:", error);
    }
  },
};
