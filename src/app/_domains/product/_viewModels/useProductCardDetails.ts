import { ButtonFactory } from "@/components/button/button";
import { ProductModel } from "@/app/_domains/product/_models/productModel";
import useCartStore from "@/store/cartStore";
import { useEffect, useState } from "react";

interface UseGridProdutcsProps {
  loadProductlistDetailsById: () => Promise<{ data: ProductModel }>;
}

export const useProductCardDetails = ({
  loadProductlistDetailsById,
}: UseGridProdutcsProps) => {
  const PrimaryButton = ButtonFactory({ type: "primary" });
  const SecondaryRoundedButton = ButtonFactory({ type: "secondaryRounded" });
  const [productDetails, setProductDetails] = useState<ProductModel>(new ProductModel())
  const [count, setCount] = useState(0);
  const { addToCart, cart } = useCartStore();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try {
      const response = await loadProductlistDetailsById();
      if (response) {
        setProductDetails(response?.data);
      }
    } catch (error) {}
  };

  return {
    productDetails,
    PrimaryButton,
    SecondaryRoundedButton,
    setCount,
    count,
    addToCart,
  };
};
