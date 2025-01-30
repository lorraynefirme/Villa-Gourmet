interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imagePath: string;
}

export interface Cart {
  products: Product[];
  totalPrice: number;
  totalProducts: number;
}
