"use client";

import useCartStore, { Product } from "@/store/cartStore";
import Image from "next/image";
import { ButtonFactory } from "@/components/button/button";
import { useEffect, useState } from "react";

interface CartItemProps {
  product: Product;
}

export const CartItem = ({ product }: CartItemProps) => {
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

  return (
    <div className="flex gap-2 my-3 justify-start">
      <Image
        src={`/images/products/${product.imagePath}`}
        width={80}
        height={80}
        className="w-30 h-30"
        alt="Imagem do prato"
      />

      <div>
        <p className="font-bold text-sm">{product.name}</p>
        <p>R${(product.price * product.quantity).toFixed(2)}</p>
        <div className="flex items-center justify-start mt-3">
          <SecondaryRoundedButton
            onClick={() => handleSubtractProuct()}
            disabled={count === 0}
          >
            -
          </SecondaryRoundedButton>
          <p className="m-2">{product.quantity}</p>
          <SecondaryRoundedButton onClick={() => handleAddProuct()}>
            +
          </SecondaryRoundedButton>
        </div>
      </div>
    </div>
  );
};
