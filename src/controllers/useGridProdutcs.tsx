import { ProductModel } from "@/models/product";
import { useEffect, useState } from "react";

export const useGridProdutcs = () => {
  const [productList, setProductList] = useState<ProductModel[]>([]);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    try {
      const response = await ProductModel.getProductList();
      if (response) setProductList(response?.data);
    } catch (error) {
      console.log(error, "eero na getProductList");
    }
  };

  return {
    productList,
  };
};
