import { ProductModel } from "@/domains/product/models/productModel";
import { useEffect, useState, useReducer } from "react";

type TypeFilter = "category" | "tag";

export interface State {
  vegetariano: { selected: boolean; typeFilter: TypeFilter };
  vegano: { selected: boolean; typeFilter: TypeFilter };
  com_carne: { selected: boolean; typeFilter: TypeFilter };
  saudavel: { selected: boolean; typeFilter: TypeFilter };
  refeiçao_leve: { selected: boolean; typeFilter: TypeFilter };
  fast_food: { selected: boolean; typeFilter: TypeFilter };
}

const initialState: State = {
  vegetariano: { selected: false, typeFilter: "category" },
  vegano: { selected: false, typeFilter: "category" },
  com_carne: { selected: false, typeFilter: "category" },
  saudavel: { selected: false, typeFilter: "tag" },
  refeiçao_leve: { selected: false, typeFilter: "tag" },
  fast_food: { selected: false, typeFilter: "tag" },
};

type Action =
  | { type: "TOGGLE_OPTION"; payload: keyof State }
  | { type: "RESET" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_OPTION":
      return {
        ...state,
        [action.payload]: {
          selected: !state[action.payload].selected,
          typeFilter: state[action.payload].typeFilter,
        },
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

interface UseGridProdutcsProps {
  loadProductlist: () => Promise<{data: ProductModel[]; totalPages: number;}>
  page: number,
  pageSize: number
}

export const useGridProdutcs = ({ loadProductlist, page, pageSize }: UseGridProdutcsProps) => {
  const [totalPages, setTotalPages] = useState(1);
  const [productList, setProductList] = useState<ProductModel[]>([]);
  const [productListToView, setProductListToView] = useState<ProductModel[]>(
    []
  );
  const [showCategory, setShowCategory] = useState(false);
  const [showTag, setShowTag] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    handleFilter();
  }, [state]);

  useEffect(() => {
    getProductList();
  }, [page]);

  const handleCheckboxChange = (option: keyof State) => {
    dispatch({ type: "TOGGLE_OPTION", payload: option });
  };

  const resetFilters = () => {
    dispatch({ type: "RESET" });
  };

  const getProductList = async () => {
    try {
      const response = await loadProductlist();
      if (response) {
        setProductList(response.data);
        setProductListToView(response.data);
        setTotalPages(Math.ceil(Number(response.totalPages) / pageSize));
      }
    } catch (error) {}
  };

  const handleFilter = () => {
    const arrayCategories = Object.entries(state)
      .filter(
        ([key, { selected, typeFilter }]) =>
          selected && typeFilter === "category"
      )
      .map(([key]) => key);

    const arrayTags = Object.entries(state)
      .filter(
        ([key, { selected, typeFilter }]) => selected && typeFilter === "tag"
      )
      .map(([key]) => key);

    if (arrayCategories.length > 0 || arrayTags.length > 0) {
      const resultCategories = productList.filter((item) => {
        return arrayCategories.includes(item.category);
      });

      const resulTtags = productList.filter((item) => {
        return arrayTags.some((value) => item.tags.includes(value));
      });

      const resultFilter = [...new Set([...resultCategories, ...resulTtags])];

      setProductListToView(resultFilter);
    } else {
      setProductListToView(productList);
    }
  };

  return {
    productListToView,
    showCategory,
    showTag,
    state,
    setShowTag,
    setShowCategory,
    handleCheckboxChange,
    totalPages,
    setTotalPages
  };
};
