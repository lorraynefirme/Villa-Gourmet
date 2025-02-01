import { onGetProductById } from "@/domains/product/actions/onGetProductById";
import { onGetProductList } from "@/domains/product/actions/onGetProductList";

export class ProductModel {
  constructor(
    readonly id: number = -1,
    readonly name: string = "",
    readonly category: string = "",
    readonly tags: string[] = [],
    readonly price: number = 0,
    readonly rating: number = 0,
    readonly imagePath: string = "",
    readonly description: string = ""
  ) {}

  static getProductList = async (page: number, pageSize: number ): Promise<{ data: ProductModel[], totalCount: number }> => {
    try {
      const response = await onGetProductList(page, pageSize);

      if (response) {
        const totalCount = response.totalCount
        const data = response.data.map(
          (item) =>
            new ProductModel(
              item.id,
              item.name,
              item.category,
              item.tags,
              item.price,
              item.rating,
              item.image,
              item.description
            )
        );
        return { data, totalCount };
      } else {
        throw new Error("Erro ao buscar dados na API");
      }
    } catch (error) {
      throw new Error("Erro ao buscar dados na API");
    }
  };

  static getProductById = async (
    id: string
  ): Promise<{ data: ProductModel }> => {
    try {
      const response = await onGetProductById(id);

      if (response) {
        const product = response.data;
        const data = new ProductModel(
          product.id,
          product.name,
          product.category,
          product.tags,
          product.price,
          product.rating,
          product.image,
          product.description
        );

        return { data };
      } else {
        throw new Error("Erro ao buscar dados na API");
      }
    } catch (error) {
      throw new Error("Erro ao buscar dados na API");
    }
  };
}
