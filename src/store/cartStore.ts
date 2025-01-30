import { create } from "zustand";

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imagePath: string;
}

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalProducts: () => number;
  getTotalPrice: () => number;
}

const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  addToCart: (product: Product) => {
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          ),
        };
      }
      return { cart: [...state.cart, product] };
    });
  },

  removeFromCart: (productId: number) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    }));
  },

  updateQuantity: (productId: number, quantity: number) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => set({ cart: [] }),

  getTotalProducts: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    const total = get().cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return +total.toFixed(2);
  },
}));

export default useCartStore;
