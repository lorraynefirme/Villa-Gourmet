import useCartStore, { Product } from "@/store/cartStore";
import { ButtonFactory } from "@/components/button/button";
import { useEffect, useState } from "react";

interface UseCartItemProps {
  product: Product;
}
export const useCartItem = ({ product }: UseCartItemProps) => {
  const { cart, updateQuantity, removeFromCart } = useCartStore();
  const SecondaryRoundedButton = ButtonFactory({ type: "secondaryRounded" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(product.quantity);
  }, []);

  const handleAddProuct = () => {
    updateQuantity(product.id, count + 1);
    setCount((prev) => prev + 1);
  };

  const handleSubtractProuct = () => {
    updateQuantity(product.id, count - 1);
    setCount((prev) => prev - 1);

    if (count - 1 === 0) {
      removeFromCart(product.id);

      if (cart.length === 1) {
        localStorage.removeItem("cart");
      }
    }
  };

  return {
    SecondaryRoundedButton,
    handleSubtractProuct,
    handleAddProuct,
    count,
  };
};
