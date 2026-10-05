import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./types";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;
        const existing = items.find((i) => i.product.id === product.id);

        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { product, quantity: 1 }] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.product.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.product.id === id ? { ...i, quantity } : i
          ),
        });
      },

      clear: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        ),
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);