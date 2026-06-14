import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";

interface CartState {
  items: CartItem[];
  addItem: (productId: string, quantity?: number, size?: string, color?: string) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
}

function itemKey(productId: string, size?: string, color?: string) {
  return `${productId}__${size ?? ""}__${color ?? ""}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (productId, quantity = 1, size, color) =>
        set((state) => {
          const key = itemKey(productId, size, color);
          const existing = state.items.find(
            (i) => itemKey(i.productId, i.size, i.color) === key
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                itemKey(i.productId, i.size, i.color) === key
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { productId, quantity, size, color }] };
        }),

      removeItem: (productId, size, color) =>
        set((state) => {
          const key = itemKey(productId, size, color);
          return {
            items: state.items.filter(
              (i) => itemKey(i.productId, i.size, i.color) !== key
            ),
          };
        }),

      updateQuantity: (productId, quantity, size, color) =>
        set((state) => {
          const key = itemKey(productId, size, color);
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (i) => itemKey(i.productId, i.size, i.color) !== key
              ),
            };
          }
          return {
            items: state.items.map((i) =>
              itemKey(i.productId, i.size, i.color) === key
                ? { ...i, quantity }
                : i
            ),
          };
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "gmg-cart",
    }
  )
);
