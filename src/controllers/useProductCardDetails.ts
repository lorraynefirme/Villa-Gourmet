import { ButtonFactory } from "@/components/button/button";
import { ProductModel } from "@/models/product";
import { useEffect, useState } from "react";

interface UseGridProdutcsProps {
  loadProductlistDetailsById: () => Promise<{ data: ProductModel } | undefined>;
}

export const useProductCardDetails = ({
  loadProductlistDetailsById,
}: UseGridProdutcsProps) => {
  const PrimaryButton = ButtonFactory({ type: "primary" });
  const SecondaryButton = ButtonFactory({ type: "secondary" });

  const [productDetails, setProductDetails] = useState<ProductModel>();
  const [count, setCount] = useState(0);

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
    SecondaryButton,
    setCount,
    count
  };
};
