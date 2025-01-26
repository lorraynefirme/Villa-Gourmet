import Image from "next/image";
import { useParams } from "next/navigation";

import { useProductCardDetails } from "@/controllers/useProductCardDetails";
import { ProductModel } from "@/models/product";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const ProductCardDetails = () => {
  const { id } = useParams();

  const loadProductlistDetailsById = async () =>
    await ProductModel.getProductById(id as string);

  const {   
    productDetails,
    PrimaryButton,
    SecondaryButton,
    setCount,
    count
   } =
    useProductCardDetails({
      loadProductlistDetailsById,
    });

  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-slate-500 px-4 py-6 rounded-md sm:h-[70vh] h-[90vh] gap-4 lg:gap-24">
      <div>
        <Image
          src={`/images/products/${productDetails?.imagePath}`}
          width={100}
          height={100}
          className="w-40 h-40 md:w-72 md:h-72"
          alt="Imagem do prato"
        />
      </div>
      <div>
        <div>
          <p className="text-base font-semibold text-center mt-3 mb-2">
            {productDetails?.name}
          </p>
          <p className="text-sm text-center mb-3">
            {productDetails?.description}
          </p>
          <p className="text-sm">
            Preço:{" "}
            <span className="font-semibold text-base ">
              R${productDetails?.price}
            </span>
          </p>
          <p className="text-sm">
            Nota:{" "}
            <span className="font-semibold text-base ">
              {productDetails?.rating}
            </span>
          </p>
        </div>
        <div className="flex justify-center items-center flex-col">
          <div>
            <SecondaryButton
              onClick={() => setCount((prev) => prev - 1)}
              disabled={count === 0}
              style={{ borderRadius: "7rem", margin: "2rem" }}
            >
              <RemoveIcon  fontSize="small" />
            </SecondaryButton>
            <span className="font-semibold text-base ">{count}</span>
            <SecondaryButton
              onClick={() => setCount((prev) => prev + 1)}
              style={{ borderRadius: "7rem", margin: "2rem" }}
            >
              <AddIcon fontSize="small" />
            </SecondaryButton>
          </div>
          <PrimaryButton>Comprar</PrimaryButton>
        </div>
      </div>
    </div>
  );
};
