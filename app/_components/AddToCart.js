"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "../_context/CartContext";

export default function AddToCart({ product }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const t = useRef(0);
  const left = product.batch.left;
  const inCart = items.find((i) => i.slug === product.slug)?.qty || 0;
  const room = Math.max(0, left - inCart);
  const soldOut = left === 0;

  useEffect(() => () => clearTimeout(t.current), []);

  function handleAdd() {
    addItem(product, Math.min(qty, room));
    setAdded(true);
    setQty(1);
    clearTimeout(t.current);
    t.current = setTimeout(() => setAdded(false), 1800);
  }

  if (soldOut) {
    return (
      <div className='mt-8'>
        <button
          type='button'
          disabled
          className='w-full cursor-not-allowed bg-stone px-8 py-3 font-body text-sm text-ink/60 sm:w-auto'
        >
          Sold out
        </button>
        <p className='mt-3 font-body text-sm text-ink/60'>
          This run has sold out. The next one will be a little different.
        </p>
      </div>
    );
  }

  return (
    <div className='mt-8'>
      <div className='flex flex-wrap items-center gap-4'>
        <div
          className='inline-flex items-center border border-ink/25'
          role='group'
          aria-label='Quantity'
        >
          <button
            type='button'
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className='h-11 w-11 font-body text-lg transition-colors hover:bg-oat disabled:opacity-30'
            aria-label='Decrease quantity'
          >
            −
          </button>
          <span
            className='w-10 text-center font-body text-sm'
            aria-live='polite'
          >
            {Math.min(qty, Math.max(1, room))}
          </span>
          <button
            type='button'
            onClick={() => setQty((q) => Math.min(room, q + 1))}
            disabled={qty >= room}
            className='h-11 w-11 font-body text-lg transition-colors hover:bg-oat disabled:opacity-30'
            aria-label='Increase quantity'
          >
            +
          </button>
        </div>
        <button
          type='button'
          onClick={handleAdd}
          disabled={room === 0}
          className='relative min-w-44 flex-1 bg-ink px-8 py-3 font-body text-sm text-plaster transition-colors hover:bg-rust disabled:cursor-not-allowed disabled:bg-stone disabled:text-ink/60 sm:flex-none'
        >
          {room === 0
            ? "All in your cart"
            : added
              ? "Added to cart"
              : "Add to cart"}
          {added ? (
            <span
              aria-hidden='true'
              className='stamp-press absolute -right-3 -top-4 rounded-full border-2 border-rust bg-plaster px-2 py-0.5 font-display text-xs italic text-rust'
            >
              ✓ Added
            </span>
          ) : null}
        </button>
      </div>
      {inCart > 0 ? (
        <p className='mt-3 font-body text-xs text-ink/50'>
          {inCart} in your cart
          {room === 0 ? ". That is every piece left in this batch." : ""}
        </p>
      ) : null}
    </div>
  );
}
