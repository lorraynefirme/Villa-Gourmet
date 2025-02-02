"use client";

import { Accordion } from "@/components/accordion/accordion";
import { ProductCard } from "@/domains/product/views/productCard";
import {
  State,
  useGridProdutcs,
} from "@/domains/product/viewModels/useGridProdutcs";
import { ProductModel } from "@/domains/product/models/productModel";
import { generateUUID } from "@/functions/generateUUID";
import { useState } from "react";
import { Pagination } from "@/components/pagination/pagination";

export const GridProdutcs = () => {
  const PAGE_SIZE = 8
  const [page, setPage] = useState(1);

  const loadProductlist = async () => await ProductModel.getProductList(page, PAGE_SIZE);

  const {
    productListToView,
    showCategory,
    showTag,
    state,
    setShowTag,
    setShowCategory,
    handleCheckboxChange,
    totalPages
  } = useGridProdutcs({ loadProductlist , page, pageSize: PAGE_SIZE});

  return (
    <div className="flex justify-center items-center flex-col">
    <div className="flex justify-between sm:flex-row flex-col p-2">
      <aside className="w-60 px-2 sm:mb-0 mb-5">
        <Accordion
          show={showCategory}
          setShow={setShowCategory}
          title="Categorias"
        >
          <ul>
            <li className="flex justify-start">
              <label className="flex justify-center items-center gap-1">
                <input
                  type="checkbox"
                  id="vegetariano"
                  name="vegetariano"
                  checked={state.vegetariano.selected}
                  onChange={(e) =>
                    handleCheckboxChange(e.target.name as keyof State)
                  }
                />
                vegetariano
              </label>
            </li>
            <li className="flex justify-start">
              <label className="flex justify-center items-center gap-1">
                <input
                  type="checkbox"
                  id="vegano"
                  name="vegano"
                  checked={state.vegano.selected}
                  onChange={(e) =>
                    handleCheckboxChange(e.target.name as keyof State)
                  }
                />
                vegano
              </label>
            </li>
            <li className="flex justify-start">
              <label className="flex justify-center items-center gap-1">
                <input
                  type="checkbox"
                  id="com_carne"
                  name="com_carne"
                  checked={state.com_carne.selected}
                  onChange={(e) =>
                    handleCheckboxChange(e.target.name as keyof State)
                  }
                />
                com carne
              </label>
            </li>
          </ul>
        </Accordion>

        <Accordion show={showTag} setShow={setShowTag} title="Tags">
          <ul>
            <li className="flex justify-start">
              <label className="flex justify-center items-center gap-1">
                <input
                  type="checkbox"
                  id="saudavel"
                  name="saudavel"
                  checked={state.saudavel.selected}
                  onChange={(e) =>
                    handleCheckboxChange(e.target.name as keyof State)
                  }
                />
                saudável
              </label>
            </li>
            <li className="flex justify-start">
              <label className="flex justify-center items-center gap-1">
                <input
                  type="checkbox"
                  id="refeiçao_leve"
                  name="refeiçao_leve"
                  checked={state.refeiçao_leve.selected}
                  onChange={(e) =>
                    handleCheckboxChange(e.target.name as keyof State)
                  }
                />
                refeicão leve
              </label>
            </li>
            <li className="flex justify-start">
              <label className="flex justify-center items-center gap-1">
                <input
                  type="checkbox"
                  id="fast_food"
                  name="fast_food"
                  checked={state.fast_food.selected}
                  onChange={(e) =>
                    handleCheckboxChange(e.target.name as keyof State)
                  }
                />
                fast food
              </label>
            </li>
          </ul>
        </Accordion>
      </aside>
      <div className="grid grid-cols-[300px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-3 justify-center">
        {productListToView.map((item) => (
          <ProductCard
            key={generateUUID()}
            id={item.id}
            name={item.name}
            description={item.description}
            rating={item.rating}
            price={item.price}
            imagePath={item.imagePath}
          />
        ))}
      </div>
    </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>

  );
};
