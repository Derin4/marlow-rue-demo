"use client";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../_context/CartContext";

// One-click add on the product card. Sits outside the card's link so the markup stays valid.
export default function QuickAdd({ product }) {
  const { addItem } = useCart();
  const [done, setDone] = useState(false);
  const t = useRef(0);
  const soldOut = product.batch.left === 0;

  useEffect(() => () => clearTimeout(t.current), []);

  const add = () => {
    addItem(product);
    setDone(true);
    clearTimeout(t.current);
    t.current = setTimeout(() => setDone(false), 1500);
  };

  return (
    <button
      type='button'
      onClick={add}
      disabled={soldOut}
      aria-label={
        soldOut ? `${product.name} is sold out` : `Add ${product.name} to cart`
      }
      className='absolute inset-x-3 bottom-3 z-10 translate-y-0 bg-ink py-2.5 font-body text-xs font-medium uppercase tracking-wider text-plaster transition-all hover:bg-rust disabled:bg-stone disabled:text-ink/60 [@media(hover:hover)]:translate-y-[140%] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:translate-y-0 [@media(hover:hover)]:group-hover:translate-y-0'
    >
      {soldOut ? "Sold out" : done ? "Added ✓" : "Quick add"}
    </button>
  );
}
