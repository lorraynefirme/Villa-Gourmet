import apiService from "../../services/apiService";
import {
  ResponseGetProductById,
  ResponseGetProductList,
} from "./productRepository.interface";

export const ProductRepository = {
  getProductList: async (): Promise<ResponseGetProductList> => {
    try {
      const response = await apiService.get("/products");
      const products = await response.data;

      return {
        data: products,
        message: "",
      };
    } catch (error) {
      throw new Error("Erro ao buscar dados na API");
    }
  },

  getProductById: async (id: string): Promise<ResponseGetProductById> => {
    try {
      const response = await apiService.get(`/products/${id}`);
      const product = await response.data;

      return {
        data: product,
        message: "",
      };
    } catch (error) {
      throw new Error("Erro ao buscar dados na API");
    }
  },
};
