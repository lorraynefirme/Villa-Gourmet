"use client";

import { Accordion } from "@/components/accordion/accordion";
import { ProductCard } from "@/components/productCard/productCard";
import { State, useGridProdutcs } from "@/controllers/useGridProdutcs";

export const GridProdutcs = () => {
  const {
    productListToView,
    showCategory,
    showTag,
    state,
    setShowTag,
    setShowCategory,
    handleCheckboxChange,
  } = useGridProdutcs();

  return (
    <div className="flex justify-between">
      <aside className="w-60 px-2">
        <Accordion
          show={showCategory}
          setShow={setShowCategory}
          title="Categoria"
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
                  id="refeicao_leve"
                  name="refeicao_leve"
                  checked={state.refeicao_leve.selected}
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
      <div className="grid grid-cols-4 items-center gap-6">
        {productListToView.map((item) => (
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
    </div>
  );
};
