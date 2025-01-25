import Image from "next/image";
import { ButtonFactory } from "@/components/button/button";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  rating: number;
  imagePath: string;
  description: string;
}

export const ProductCard = ({
  id,
  name,
  price,
  rating,
  imagePath,
  description,
}: ProductCardProps) => {
  const PrimaryButton = ButtonFactory({ type: "primary" });

  return (
    <div className="flex flex-col justify-center items-center bg-slate-500 px-4 py-6 rounded-md">
      <div>
        <Image
          src={`/images/products/${imagePath}`}
          width={150}
          height={150}
          alt="Picture of the author"
          style={{
            width: "150px",
            height: "150px",
          }}
        />
      </div>
      <div>
        <p className="text-base font-semibold text-center mt-3 mb-2">{name}</p>
        <p className="text-sm text-center mb-3">{description}</p>
        <p className="text-sm">
          Preço: <span className="font-semibold text-base ">R${price}</span>
        </p>
        <p className="text-sm">
          Nota: <span className="font-semibold text-base ">{rating}</span>
        </p>
      </div>
      <PrimaryButton>Ver detalhes</PrimaryButton>
    </div>
  );
};
