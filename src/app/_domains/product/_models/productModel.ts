import { onGetProductById } from "@/app/_domains/product/actions/product/onGetProductById";
import { onGetProductList } from "@/app/_domains/product/actions/product/onGetProductList";

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

  static getProductList = async (): Promise<{ data: ProductModel[] }> => {
    try {
      const response = await onGetProductList();

      if (response) {
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
        return { data };
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
