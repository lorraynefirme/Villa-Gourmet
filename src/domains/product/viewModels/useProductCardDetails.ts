import { ButtonFactory } from "@/components/button/button";
import { ProductModel } from "@/domains/product/models/productModel";
import useCartStore from "@/store/cartStore";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface UseGridProdutcsProps {
  loadProductlistDetailsById: () => Promise<{ data: ProductModel }>;
}

export const useProductCardDetails = ({
  loadProductlistDetailsById,
}: UseGridProdutcsProps) => {
  const PrimaryButton = ButtonFactory({ type: "primary" });
  const SecondaryRoundedButton = ButtonFactory({ type: "secondaryRounded" });
  const [productDetails, setProductDetails] = useState<ProductModel>(
    new ProductModel()
  );
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
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
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    productDetails,
    PrimaryButton,
    SecondaryRoundedButton,
    setCount,
    count,
    addToCart,
    loading
  };
};
