interface Product {
  id: number;
  name: string;
  category: string;
  tags: string[];
  price: number;
  rating: number;
  image: string;
  description: string;
}

export interface ResponseGetProductList {
  data: Product[];
  message: string;
}

export interface ResponseGetProductById {
  data: Product;
  message: string;
}
