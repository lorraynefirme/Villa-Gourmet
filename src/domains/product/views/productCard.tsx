import Image from "next/image";
import { ButtonFactory } from "@/components/button/button";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center bg-slate-300 px-4 py-6 rounded-md h-full">
      <div>
        <Image
          src={`/images/products/${imagePath}`}
          width={140}
          height={140}
          alt="Picture of the author"
          style={{
            width: "140px",
            height: "140px",
          }}
        />
      </div>
      <div className="mb-2">
        <p className="text-base font-semibold text-center mt-3 mb-2">{name}</p>
        <p className="text-sm text-center mb-3">{description}</p>
        <p className="text-sm">
          Preço:{" "}
          <span className="font-semibold text-base ">R${price.toFixed(2)}</span>
        </p>
        <p className="text-sm">
          Nota: <span className="font-semibold text-base ">{rating}</span>
        </p>
      </div>
      <PrimaryButton onClick={() => router.push(`/detalhes/${id}`)}>
        Ver detalhes
      </PrimaryButton>
    </div>
  );
};
