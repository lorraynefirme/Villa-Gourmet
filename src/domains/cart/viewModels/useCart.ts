import useCartStore from "@/store/cartStore";
import { ButtonFactory } from "@/components/button/button";
import { useEffect, useState } from "react";
import { CartModel } from "../models/cartModel";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const useCart = () => {
  const PrimaryButton = ButtonFactory({ type: "primary" });

  const {
    cart,
    getTotalPrice,
    getTotalProducts,
    addToCart,
    setIsCollapsed,
    isCollapsed,
  } = useCartStore();

  const isSmallScreen = useMediaQuery("(max-width: 500px)");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isReady) {
      setIsReady(true);
    }
  }, [isSmallScreen, isReady]);

  useEffect(() => {
    if (isReady && isSmallScreen) {
      console.log("isSmallScreen", isSmallScreen);
      setIsCollapsed(true);
    }
  }, [isReady, isSmallScreen]);

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
    isCollapsed,
    setIsCollapsed,
  };
};
