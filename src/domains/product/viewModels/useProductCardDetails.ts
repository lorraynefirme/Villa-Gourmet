import { ButtonFactory } from "@/components/button/button";
import { ProductModel } from "@/domains/product/models/productModel";
import ApiUnknownError from "@/services/apiUnknownError ";
import useCartStore from "@/store/cartStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UseGridProdutcsProps {
  loadProductlistDetailsById: () => Promise<{ data: ProductModel }>;
}

export const useProductCardDetails = ({
  loadProductlistDetailsById,
}: UseGridProdutcsProps) => {
  const PrimaryButton = ButtonFactory({ type: "primary" });
  const SecondaryRoundedButton = ButtonFactory({ type: "secondaryRounded" });
  const [productDetails, setProductDetails] = useState<ProductModel | null>(
    null
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
        setProductDetails(response.data);
      }
    } catch (error) {
      if (error instanceof Error ||error instanceof ApiUnknownError) {
        toast.error(error.message);
      } else {
        toast.error('Erro desconhecido');
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
    loading,
  };
};
