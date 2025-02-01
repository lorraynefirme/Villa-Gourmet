import { cartRepository } from "@/repositories/client/cartRepository";

export class ProductModel {
  constructor(
    readonly id: number = -1,
    readonly name: string = "",
    readonly price: number = 0,
    readonly quantity: number = 0,
    readonly imagePath: string = ""
  ) {}
}

export class CartModel {
  constructor(
    readonly products: ProductModel[],
    readonly totalPrice: number,
    readonly totalProducts: number
  ) {}

  saveOnLocalStorage() {
    cartRepository.saveCartOnLocalStorage({
      products: this.products,
      totalPrice: this.totalPrice,
      totalProducts: this.totalProducts,
    });
  }

  static getOnLocalStorage(): CartModel | null {
    const cart = cartRepository.getCartOnLocalStorage();
    if (cart) {
      const products = cart.products.map(
        (item) =>
          new ProductModel(
            item.id,
            item.name,
            item.price,
            item.quantity,
            item.imagePath
          )
      );

      return new CartModel(products, cart.totalPrice, cart.totalProducts);
    }

    return null;
  }
}
