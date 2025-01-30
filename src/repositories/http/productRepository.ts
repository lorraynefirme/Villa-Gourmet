import apiService from "../../services/apiService";
import {
  ResponseGetProductById,
  ResponseGetProductList,
} from "./productRepository.interface";

export const ProductRepository = {
  getProductList: async (page: number, pageSize: number): Promise<ResponseGetProductList> => {
    console.log(page, pageSize)
    try {
      const response = await apiService.get("/products",  {
        params: {
          _page: page,
          _limit: pageSize,
        },
      });
      const products = await response.data;
      console.log(response.headers)

      return {
        data: products,
        totalPages: response.headers["x-total-count"],
        message: "Produtos retornados com sucesso",
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
