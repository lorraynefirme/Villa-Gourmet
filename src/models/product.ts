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
        console.log(data, "model");
        return { data };
      }
    } catch (error) {
      console.log("error na model");
    }
  };
}
