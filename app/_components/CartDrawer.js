"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "../_context/CartContext";
import { money } from "../_lib/utils";
import FreeShipBar from "./FreeShipBar";
import Photo from "./Photo";

export default function CartDrawer() {
  const {
    items,
    drawer,
    closeDrawer,
    removeItem,
    updateQty,
    subtotal,
    totals,
  } = useCart();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!drawer) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [drawer, closeDrawer]);

  return (
    <div
      className={`fixed inset-0 z-[60] ${drawer ? "" : "pointer-events-none"}`}
      aria-hidden={!drawer}
      inert={!drawer}
    >
      <div
        onClick={closeDrawer}
        className={`absolute inset-0 bg-ink/45 transition-opacity duration-300 ${drawer ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role='dialog'
        aria-modal='true'
        aria-label='Your cart'
        className={`absolute right-0 top-0 flex h-full w-[min(430px,100vw)] flex-col bg-plaster ${drawer ? "shadow-2xl" : ""} transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${drawer ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className='flex items-center justify-between border-b border-divider px-6 py-5'>
          <h2 className='font-display text-2xl'>Your cart</h2>
          <button
            ref={closeRef}
            type='button'
            onClick={closeDrawer}
            className='flex h-10 w-10 items-center justify-center rounded-full text-xl transition-colors hover:bg-oat'
            aria-label='Close cart'
          >
            ×
          </button>
        </div>

        <div className='border-b border-divider px-6 py-4'>
          <FreeShipBar toFree={totals.toFree} empty={items.length === 0} />
        </div>

        {items.length === 0 ? (
          <div className='flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center'>
            <p className='font-display text-2xl'>Nothing here yet</p>
            <p className='font-body text-sm text-ink/60'>
              Everything is made in runs of fewer than fifty. Have a look.
            </p>
            <Link
              href='/shop'
              onClick={closeDrawer}
              className='mt-2 bg-ink px-7 py-3 font-body text-sm text-plaster transition-colors hover:bg-rust'
            >
              Shop the collection
            </Link>
          </div>
        ) : (
          <>
            <ul className='flex-1 divide-y divide-divider overflow-y-auto px-6'>
              {items.map((it) => (
                <li key={it.slug} className='flex gap-4 py-5'>
                  <Photo
                    id={`p-${it.slug}`}
                    label={it.name}
                    swatch={it.swatch}
                    sizes='80px'
                    className='h-24 w-20 shrink-0 rounded-sm'
                  />
                  <div className='flex min-w-0 flex-1 flex-col'>
                    <Link
                      href={`/product/${it.slug}`}
                      onClick={closeDrawer}
                      className='font-display text-base leading-snug hover:text-rust'
                    >
                      {it.name}
                    </Link>
                    <p className='font-body text-xs text-ink/50'>
                      {money(it.price)}
                    </p>
                    <div className='mt-auto flex items-center justify-between pt-2'>
                      <div
                        className='inline-flex items-center border border-ink/25'
                        role='group'
                        aria-label={`Quantity for ${it.name}`}
                      >
                        <button
                          type='button'
                          onClick={() =>
                            it.qty > 1
                              ? updateQty(it.slug, it.qty - 1)
                              : removeItem(it.slug)
                          }
                          className='h-8 w-8 hover:bg-oat'
                          aria-label={
                            it.qty > 1
                              ? "Decrease quantity"
                              : `Remove ${it.name}`
                          }
                        >
                          −
                        </button>
                        <span className='w-8 text-center font-body text-sm'>
                          {it.qty}
                        </span>
                        <button
                          type='button'
                          onClick={() => updateQty(it.slug, it.qty + 1)}
                          disabled={it.qty >= it.batch.left}
                          className='h-8 w-8 hover:bg-oat disabled:opacity-30'
                          aria-label='Increase quantity'
                        >
                          +
                        </button>
                      </div>
                      <p className='font-body text-sm'>
                        {money(it.price * it.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className='border-t border-divider px-6 py-5'>
              <div className='flex justify-between font-body text-sm text-ink/70'>
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <p className='mt-1 font-body text-xs text-ink/50'>
                Shipping and any code are added at the cart.
              </p>
              <div className='mt-4 grid gap-2'>
                <Link
                  href='/checkout'
                  onClick={closeDrawer}
                  className='bg-ink py-3 text-center font-body text-sm text-plaster transition-colors hover:bg-rust'
                >
                  Checkout (demo)
                </Link>
                <Link
                  href='/cart'
                  onClick={closeDrawer}
                  className='border border-ink/30 py-3 text-center font-body text-sm transition-colors hover:border-ink'
                >
                  View cart
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
