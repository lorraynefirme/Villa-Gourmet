"use client";

import { ProductCard } from "@/components/productCard/productCard";
import { useGridProdutcs } from "@/controllers/useGridProdutcs";

export const GridProdutcs = () => {
  const { productList } = useGridProdutcs();
  console.log(productList);
  return (
    <div className="grid grid-cols-4 items-center gap-6">
      {productList.map((item) => (
        <ProductCard
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          rating={item.rating}
          price={item.price}
          imagePath={item.imagePath}
        />
      ))}
    </div>
  );
};
