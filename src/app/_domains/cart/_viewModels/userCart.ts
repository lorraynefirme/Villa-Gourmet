import useCartStore from "@/store/cartStore";
import { ButtonFactory } from "@/components/button/button";
import { useEffect } from "react";
import { CartModel } from "../_models/cartModel";

export const userCart = () => {
  const { cart, getTotalPrice, getTotalProducts, addToCart } = useCartStore();
  const PrimaryButton = ButtonFactory({ type: "primary" });

  useEffect(() => {
    if (cart.length > 0) {
      const cartModel = new CartModel(
        cart,
        getTotalPrice(),
        getTotalProducts()
      );
      cartModel.saveOnLocalStorage();
    } else {
      const cartModel = CartModel.getOnLocalStorage();
      if (cartModel) {
        cartModel.products.map((item) => addToCart(item));
      }
    }
  }, [cart, getTotalPrice, getTotalProducts]);

  return {
    cart,
    getTotalPrice,
    getTotalProducts,
    PrimaryButton,
  };
};
