import apiService from "../apiService";
import { ResponseGetProductList } from "./productService.interface";

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
};
