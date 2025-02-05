<div align="center">

&nbsp;&nbsp;

<h1 align="center">Villa Gourmet 🥗🍔🍝</h1>
&nbsp;&nbsp;
</div>

## 🚀 Sobre o projeto

Aplicação de catálogo de pratos com filtros dinâmicos, carrinho e página com informações detalhadas de um prato.

</br>

## 🧰 Pré-requisitos

- Node.js
- VSCode ou editor da sua preferência

</br>

## 🔧 Tecnologias utilizadas

- Next.js
- Typescript
- Axios
- Tailwind
- Zustand
- Framer Motion

</br>

## 🧭 Como executar o projeto?

```bash
# Clone este repositório
$ git clone https://github.com/lorraynefirme/Villa-Gourmet.git

# Acesse a pasta do projeto no terminal/cmd
$ cd <nome_da_pasta>

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev
```

&nbsp;&nbsp;

## ☕ Arquitetura MVVM

<div  align="center">
</br>
    <img src="./public//images//assets//diagrama.jpeg" width="500"/>
    
</div>
</br>

<div>
<p>
A arquitetura MVVM promove uma separação clara entre a interface e a lógica de negócios, permitindo a criação de aplicativos mais organizados, testáveis e fáceis de manter. Essa abordagem facilita a colaboração entre as áreas de design e desenvolvimento e se adapta a diferentes tecnologias e plataformas.
</p>
</div>
</br>

## 1️⃣ View

Responsável pela apresentação dos dados para o usuário. A View contém os elementos de interface (como botões, listas, formulários) e interage com o usuário, mas não deve conter lógica de negócios.
</br>
</br>

Exemplo:

```bash
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
```

## 2️⃣ View-Model

Atua como intermediário entre a Model e a View. Ele expõe os dados da Model de forma que a View consiga consumi-los facilmente e implementa comandos e lógica de apresentação.
</br>
</br>

Exemplo:

```bash
export const useProductCardDetails = ({
  loadProductlistDetailsById,
}: UseGridProdutcsProps) => {
  const PrimaryButton = ButtonFactory({ type: "primary" });
  const SecondaryRoundedButton = ButtonFactory({ type: "secondaryRounded" });
  const [productDetails, setProductDetails] = useState<ProductModel>(
    new ProductModel()
  );
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCartStore();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try {
      const response = await loadProductlistDetailsById();
      if (response) {
        setProductDetails(response?.data);
      }
    } catch (error) {
      if (error instanceof AxiosError || error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    productDetails,
    PrimaryButton,
    SecondaryRoundedButton,
    setCount,
    count,
    addToCart,
    loading
  };
};
```

## 3️⃣ Model

Representa os dados e a lógica de negócios da aplicação. Essa camada é independente da interface e lida com a comunicação com fontes de dados (bancos de dados, APIs, session storage, local storage e etc.).
</br>
</br>

Exemplo:

```bash
export class ProductModel {
  constructor(
    readonly id: number = -1,
    readonly name: string = "",
    readonly category: string = "",
    readonly tags: string[] = [],
    readonly price: number = 0,
    readonly rating: number = 0,
    readonly imagePath: string = "",
    readonly description: string = ""
  ) {}

  static getProductList = async (page: number, pageSize: number ): Promise<{ data: ProductModel[], totalCount: number }> => {
    try {
      const response = await onGetProductList(page, pageSize);

      if (response) {
        const totalCount = response.totalCount
        const data = response.data.map(
          (item) =>
            new ProductModel(
              item.id,
              item.name,
              item.category,
              item.tags,
              item.price,
              item.rating,
              item.image,
              item.description
            )
        );
        return { data, totalCount };
      } else {
        throw new Error("Erro ao buscar dados na API");
      }
    } catch (error) {
      throw new Error("Erro ao buscar dados na API");
    }
  };

  static getProductById = async (
    id: string
  ): Promise<{ data: ProductModel }> => {
    try {
      const response = await onGetProductById(id);

      if (response) {
        const product = response.data;
        const data = new ProductModel(
          product.id,
          product.name,
          product.category,
          product.tags,
          product.price,
          product.rating,
          product.image,
          product.description
        );

        return { data };
      } else {
        throw new Error("Erro ao buscar dados na API");
      }
    } catch (error) {
      throw new Error("Erro ao buscar dados na API");
    }
  };
}
```

</br>

## 🎯 Benefícios da Arquitetura MVVM

<ul>
  <li>Separa bem as responsabilidades (Modelo, Lógica e UI)</li>
  <li>A Model encapsula as regras de negócio (métodos da classe)</li>
  <li>Fácil de testar, pois a lógica está desacoplada da UI</li>
  <li>Segue o padrão MVVM clássico com classe na Model (fácil adaptação e aprendizado para o time de desenvolvimento)</li>
</ul>
