"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { buildCheckoutUrl } from "@/lib/shopify";

export type CartLine = {
  variantId: number;
  handle: string;
  title: string;
  size: string;
  price: string;
  image?: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  removeItem: (variantId: number) => void;
  checkout: () => void;
};

const STORAGE_KEY = "arcticc-shopify-cart";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      setLines([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [hydrated, lines]);

  const addItem = useCallback(
    (line: Omit<CartLine, "quantity">, quantity = 1) => {
      setLines((prev) => {
        const existing = prev.find((item) => item.variantId === line.variantId);
        if (existing) {
          return prev.map((item) =>
            item.variantId === line.variantId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { ...line, quantity }];
      });
      setOpen(true);
    },
    []
  );

  const updateQuantity = useCallback((variantId: number, quantity: number) => {
    setLines((prev) =>
      prev
        .map((item) =>
          item.variantId === variantId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((variantId: number) => {
    setLines((prev) => prev.filter((item) => item.variantId !== variantId));
  }, []);

  const checkout = useCallback(() => {
    if (!lines.length) return;
    window.location.href = buildCheckoutUrl(lines);
  }, [lines]);

  const count = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      count,
      open,
      setOpen,
      addItem,
      updateQuantity,
      removeItem,
      checkout,
    }),
    [lines, count, open, addItem, updateQuantity, removeItem, checkout]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
