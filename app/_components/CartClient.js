"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../_context/CartContext";
import { PROMO } from "../_lib/products";
import { money } from "../_lib/utils";
import FreeShipBar from "./FreeShipBar";
import Photo from "./Photo";

export default function CartClient() {
  const {
    items,
    removeItem,
    updateQty,
    subtotal,
    totals,
    promo,
    setPromo,
    hydrated,
  } = useCart();
  const [code, setCode] = useState("");
  const [codeMsg, setCodeMsg] = useState("");

  if (!hydrated) {
    return (
      <div className='mx-auto max-w-4xl px-6 py-16'>
        <div className='h-80 animate-pulse bg-oat/60' />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className='mx-auto max-w-6xl px-6 py-24 text-center'>
        <p className='mb-4 font-display text-2xl text-ink'>
          Your cart is empty
        </p>
        <Link
          href='/shop'
          className='border-b border-ink/40 pb-1 font-body text-sm text-ink hover:border-ink'
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const apply = (e) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === PROMO.code) {
      setPromo(true);
      setCodeMsg(`Code applied: ${PROMO.percent}% off.`);
    } else {
      setCodeMsg("That code isn't valid. Try SLOW10.");
    }
  };

  return (
    <div className='mx-auto max-w-4xl px-6 py-16'>
      <h1 className='mb-10 font-display text-4xl text-ink'>Cart</h1>

      <div className='mb-8 border border-divider bg-oat/50 p-5'>
        <FreeShipBar toFree={totals.toFree} />
      </div>

      <ul className='divide-y divide-divider border-y border-divider'>
        {items.map((item) => (
          <li
            key={item.slug}
            className='step-in flex flex-wrap items-center gap-x-6 gap-y-3 py-6'
          >
            <Link href={`/product/${item.slug}`} className='shrink-0'>
              <Photo
                id={`p-${item.slug}`}
                label={item.name}
                swatch={item.swatch}
                sizes='80px'
                className='h-24 w-20 rounded-sm'
              />
            </Link>
            <div className='min-w-0 flex-1 basis-40'>
              <Link
                href={`/product/${item.slug}`}
                className='font-display text-lg text-ink hover:text-rust'
              >
                {item.name}
              </Link>
              <p className='font-body text-sm text-ink/50'>
                {money(item.price)}
              </p>
              {item.batch.left <= 5 ? (
                <p className='mt-1 font-body text-xs text-rust-deep'>
                  Only {item.batch.left} left in this batch
                </p>
              ) : null}
            </div>
            <label className='sr-only' htmlFor={`qty-${item.slug}`}>
              Quantity for {item.name}
            </label>
            <input
              id={`qty-${item.slug}`}
              type='number'
              min={1}
              max={item.batch.left}
              value={item.qty}
              onChange={(e) =>
                updateQty(item.slug, parseInt(e.target.value, 10) || 1)
              }
              className='w-16 border border-divider bg-transparent px-2 py-1.5 text-center font-body text-sm'
            />
            <p className='w-16 text-right font-body text-sm text-ink'>
              {money(item.price * item.qty)}
            </p>
            <button
              type='button'
              onClick={() => removeItem(item.slug)}
              className='font-body text-xs text-ink/50 transition-colors hover:text-rust'
              aria-label={`Remove ${item.name}`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className='mt-10 grid gap-10 sm:grid-cols-2'>
        <form onSubmit={apply} noValidate>
          <label htmlFor='promo' className='font-body text-sm font-medium'>
            Promo code
          </label>
          <div className='mt-2 flex gap-2'>
            <input
              id='promo'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder='SLOW10'
              className='w-full border border-ink/25 bg-plaster px-4 py-2.5 font-body text-sm uppercase outline-none focus:border-rust'
            />
            <button
              type='submit'
              className='border border-ink px-5 py-2.5 font-body text-sm transition-colors hover:bg-ink hover:text-plaster'
            >
              Apply
            </button>
          </div>
          <p className='mt-2 font-body text-xs text-ink/55' aria-live='polite'>
            {codeMsg || "Demo code: SLOW10."}
          </p>
        </form>

        <div className='w-full sm:ml-auto sm:w-72'>
          <div className='mb-2 flex justify-between font-body text-sm text-ink/60'>
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </div>
          {promo ? (
            <div className='mb-2 flex justify-between font-body text-sm text-moss'>
              <span>
                {PROMO.code} (−{PROMO.percent}%)
              </span>
              <span>−{money(totals.discount)}</span>
            </div>
          ) : null}
          <div className='mb-2 flex justify-between font-body text-sm text-ink/60'>
            <span>Shipping</span>
            <span>
              {totals.shipping === 0 ? "Free" : money(totals.shipping)}
            </span>
          </div>
          <div className='relative flex justify-between pt-3 font-display text-xl text-ink'>
            <span>Total</span>
            <span className='relative'>
              {money(totals.total)}
              <svg
                className='absolute -bottom-1.5 left-0 w-full'
                height='6'
                viewBox='0 0 100 6'
                preserveAspectRatio='none'
                aria-hidden='true'
              >
                <path
                  d='M0,4 Q25,0 50,4 T100,4'
                  stroke='#C9522E'
                  strokeWidth='2'
                  fill='none'
                />
              </svg>
            </span>
          </div>
          <Link
            href='/checkout'
            className='mt-8 block w-full bg-ink py-3 text-center font-body text-sm text-plaster transition-colors hover:bg-rust'
          >
            Checkout (demo)
          </Link>
          <p className='mt-3 text-center font-body text-xs text-ink/40'>
            This is a demo storefront. No payment is processed.
          </p>
        </div>
      </div>
    </div>
  );
}
