import { Cart } from "@/repositories/client/cartRepository.interface"

export const cartRepository = {
  saveCartOnLocalStorage(cart: Cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  },

  getCartOnLocalStorage(): Cart | null {
    const cart = localStorage.getItem("cart");

    if (cart) {
      return JSON.parse(cart);
    }

    return null;
  },
};
