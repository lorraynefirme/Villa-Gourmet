import Image from "next/image";
import { useParams } from "next/navigation";

import { useProductCardDetails } from "@/domains/product/viewModels/useProductCardDetails";
import { ProductModel } from "@/domains/product/models/productModel";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LoadingSpinner from "@/components/loadingSpinner/loadingSpinner";

export const ProductCardDetails = () => {
  const { id } = useParams();

  const loadProductlistDetailsById = async () =>
    await ProductModel.getProductById(id as string);

  const {
    productDetails,
    PrimaryButton,
    SecondaryRoundedButton,
    setCount,
    count,
    addToCart,
    loading,
  } = useProductCardDetails({
    loadProductlistDetailsById,
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-slate-300 px-4 py-6 rounded-md sm:h-[70vh] h-[90vh] gap-4 lg:gap-24">
      <div>
        <Image
          src={`/images/products/${productDetails.imagePath}`}
          width={100}
          height={100}
          className="w-40 h-40 md:w-72 md:h-72"
          alt="Imagem do prato"
        />
      </div>
      <div>
        <div>
          <p className="text-base font-semibold text-center mt-3 mb-2">
            {productDetails.name}
          </p>
          <p className="text-sm text-center mb-3">
            {productDetails.description}
          </p>
          <p className="text-sm">
            Preço:{" "}
            <span className="font-semibold text-base ">
              R${productDetails.price.toFixed(2)}
            </span>
          </p>
          <p className="text-sm">
            Nota:{" "}
            <span className="font-semibold text-base ">
              {productDetails.rating}
            </span>
          </p>
        </div>
        <div className="flex justify-center items-center flex-col">
          <div className="flex justify-center items-center">
            <SecondaryRoundedButton
              onClick={() => setCount((prev) => prev - 1)}
              disabled={count === 0}
              style={{ margin: "1rem" }}
            >
              <RemoveIcon fontSize="small" />
            </SecondaryRoundedButton>
            <span className="font-semibold text-base ">{count}</span>
            <SecondaryRoundedButton
              onClick={() => setCount((prev) => prev + 1)}
              style={{ margin: "1rem" }}
            >
              <AddIcon fontSize="small" />
            </SecondaryRoundedButton>
          </div>
          <PrimaryButton
            onClick={() => {
              addToCart({
                id: productDetails.id,
                name: productDetails.name,
                price: productDetails.price,
                quantity: count,
                imagePath: productDetails.imagePath,
              });
              setCount(0);
            }}
          >
            Adicionar ao Carrinho
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
