"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getProductBySlug } from "../_lib/products";
import { computeTotals } from "../_lib/utils";

const CartContext = createContext(null);
const KEY = "marlow-rue-cart-v1";

// Largest quantity of a product that can be in the cart (what is left in the batch).
const maxFor = (slug) => getProductBySlug(slug)?.batch.left ?? 0;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [promo, setPromo] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const loaded = useRef(false);

  // Restore the cart after the first paint so server and client markup match.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(KEY) || "null");
        if (saved && Array.isArray(saved.items)) {
          const clean = saved.items
            .map((i) => {
              const p = getProductBySlug(i.slug);
              return p && p.batch.left > 0
                ? { ...p, qty: Math.min(Math.max(1, i.qty | 0), p.batch.left) }
                : null;
            })
            .filter(Boolean);
          setItems(clean);
          setPromo(Boolean(saved.promo));
        }
      } catch {}
      loaded.current = true;
      setHydrated(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(
        KEY,
        JSON.stringify({
          items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
          promo,
        }),
      );
    } catch {}
  }, [items, promo]);

  const addItem = useCallback((product, qty = 1) => {
    const max = maxFor(product.slug);
    if (max === 0) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === product.slug
            ? { ...i, qty: Math.min(max, i.qty + qty) }
            : i,
        );
      }
      return [...prev, { ...product, qty: Math.min(max, qty) }];
    });
    setDrawer(true);
  }, []);

  const removeItem = useCallback(
    (slug) => setItems((prev) => prev.filter((i) => i.slug !== slug)),
    [],
  );

  const updateQty = useCallback((slug, qty) => {
    const max = maxFor(slug);
    setItems((prev) =>
      prev.map((i) =>
        i.slug === slug
          ? {
              ...i,
              qty: Math.min(max, Math.max(1, Number.isFinite(qty) ? qty : 1)),
            }
          : i,
      ),
    );
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setPromo(false);
  }, []);

  const value = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);
    const totals = computeTotals(subtotal, promo);
    return {
      items,
      addItem,
      removeItem,
      updateQty,
      clear,
      subtotal,
      total: totals.total,
      totals,
      count,
      hydrated,
      promo,
      setPromo,
      drawer,
      openDrawer: () => setDrawer(true),
      closeDrawer: () => setDrawer(false),
    };
  }, [items, promo, drawer, hydrated, addItem, removeItem, updateQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
