"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  sizeId: string;
  sizeLabel: string;
  price: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, sizeId?: string) => void;
  removeItem: (productId: string, sizeId: string) => void;
  updateQuantity: (productId: string, sizeId: string, quantity: number) => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const addItem = useCallback(
    (product: Product, sizeId = product.sizes[0]?.id) => {
      const size = product.sizes.find((s) => s.id === sizeId) ?? product.sizes[0];
      if (!size) return;

      setItems((prev) => {
        const existing = prev.find(
          (i) => i.product.id === product.id && i.sizeId === size.id
        );
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id && i.sizeId === size.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [
          ...prev,
          {
            product,
            sizeId: size.id,
            sizeLabel: size.label,
            price: size.price,
            quantity: 1,
          },
        ];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((productId: string, sizeId: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.sizeId === sizeId))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, sizeId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, sizeId);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.sizeId === sizeId
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeItem]
  );

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      count,
      subtotal,
    }),
    [
      items,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      count,
      subtotal,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
