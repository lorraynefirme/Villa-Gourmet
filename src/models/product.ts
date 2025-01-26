import { onGetProductById } from "@/actions/product/onGetProductById";
import { onGetProductList } from "@/actions/product/onGetProductList";

export class ProductModel {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly category: string,
    readonly tags: string[],
    readonly price: number,
    readonly rating: number,
    readonly imagePath: string,
    readonly description: string
  ) {}

  static getProductList = async (): Promise<
    { data: ProductModel[] } | undefined
  > => {
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
      }
    } catch (error) {}
  };

  static getProductById = async (
    id: string
  ): Promise<{ data: ProductModel } | undefined> => {
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
      }
    } catch (error) {}
  };
}
