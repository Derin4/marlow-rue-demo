"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useCart } from "../_context/CartContext";
import { PROMO } from "../_lib/products";
import { money, orderCode } from "../_lib/utils";
import Photo from "./Photo";

const field =
  "w-full border border-ink/25 bg-plaster px-4 py-3 font-body text-[15px] outline-none transition-colors focus:border-rust";

export default function CheckoutClient() {
  const { items, totals, subtotal, promo, clear, hydrated } = useCart();
  const [f, setF] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    postal: "",
  });
  const [errs, setErrs] = useState({});
  const [order, setOrder] = useState(null);
  const top = useRef(null);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  if (order) {
    return (
      <div
        ref={top}
        className='step-in mx-auto max-w-xl px-6 py-20 text-center'
      >
        <span className='stamp-press mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-rust font-display text-3xl italic text-rust'>
          M&amp;R
        </span>
        <h1 className='font-display text-4xl'>Thank you, {order.name}.</h1>
        <p className='mt-3 font-body text-ink/70'>
          Order <strong className='text-ink'>{order.code}</strong> is on the
          bench. Everything ships on Thursday.
        </p>
        <ul className='mx-auto mt-8 max-w-sm divide-y divide-divider border-y border-divider text-left font-body text-sm'>
          {order.items.map((i) => (
            <li key={i.slug} className='flex justify-between py-2.5'>
              <span>
                {i.qty} × {i.name}
              </span>
              <span>{money(i.price * i.qty)}</span>
            </li>
          ))}
          <li className='flex justify-between py-2.5 font-semibold'>
            <span>Total</span>
            <span>{money(order.total)}</span>
          </li>
        </ul>
        <p className='mt-6 font-body text-xs text-ink/50'>
          This is a demo confirmation — no order was placed and no payment was
          taken.
        </p>
        <Link
          href='/shop'
          className='mt-8 inline-block bg-ink px-8 py-3 font-body text-sm text-plaster transition-colors hover:bg-rust'
        >
          Keep shopping
        </Link>
      </div>
    );
  }

  if (!hydrated)
    return (
      <div className='mx-auto max-w-5xl px-6 py-16'>
        <div className='h-96 animate-pulse bg-oat/60' />
      </div>
    );

  if (items.length === 0) {
    return (
      <div className='mx-auto max-w-6xl px-6 py-24 text-center'>
        <p className='mb-4 font-display text-2xl'>Your cart is empty</p>
        <Link
          href='/shop'
          className='border-b border-ink/40 pb-1 font-body text-sm hover:border-ink'
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = "Enter a valid email.";
    if (!f.name.trim()) er.name = "Tell us your name.";
    if (!f.address.trim()) er.address = "Add a street address.";
    if (!f.city.trim()) er.city = "Add your city.";
    if (f.postal.trim().length < 5) er.postal = "Add a postal code.";
    setErrs(er);
    if (Object.keys(er).length) return;
    setOrder({
      code: orderCode(),
      name: f.name.trim().split(" ")[0],
      items: items.map((i) => ({ ...i })),
      total: totals.total,
    });
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const err = (k) =>
    errs[k] ? (
      <p className='mt-1.5 font-body text-sm text-rust-deep' role='alert'>
        {errs[k]}
      </p>
    ) : null;

  return (
    <form
      onSubmit={submit}
      noValidate
      className='mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_360px]'
    >
      <div className='min-w-0'>
        <h1 className='mb-2 font-display text-4xl'>Checkout</h1>
        <p className='mb-10 font-body text-sm text-ink/60'>
          A demo checkout. Nothing you type is stored or sent, and no payment is
          taken.
        </p>
        <div className='grid gap-5 sm:grid-cols-2'>
          <div className='sm:col-span-2'>
            <label
              htmlFor='c-email'
              className='mb-1.5 block font-body text-sm font-medium'
            >
              Email
            </label>
            <input
              id='c-email'
              type='email'
              className={field}
              value={f.email}
              onChange={set("email")}
              autoComplete='email'
              aria-invalid={!!errs.email}
            />
            {err("email")}
          </div>
          <div className='sm:col-span-2'>
            <label
              htmlFor='c-name'
              className='mb-1.5 block font-body text-sm font-medium'
            >
              Full name
            </label>
            <input
              id='c-name'
              className={field}
              value={f.name}
              onChange={set("name")}
              autoComplete='name'
              aria-invalid={!!errs.name}
            />
            {err("name")}
          </div>
          <div className='sm:col-span-2'>
            <label
              htmlFor='c-address'
              className='mb-1.5 block font-body text-sm font-medium'
            >
              Street address
            </label>
            <input
              id='c-address'
              className={field}
              value={f.address}
              onChange={set("address")}
              autoComplete='street-address'
              aria-invalid={!!errs.address}
            />
            {err("address")}
          </div>
          <div>
            <label
              htmlFor='c-city'
              className='mb-1.5 block font-body text-sm font-medium'
            >
              City
            </label>
            <input
              id='c-city'
              className={field}
              value={f.city}
              onChange={set("city")}
              autoComplete='address-level2'
              aria-invalid={!!errs.city}
            />
            {err("city")}
          </div>
          <div>
            <label
              htmlFor='c-postal'
              className='mb-1.5 block font-body text-sm font-medium'
            >
              Postal code
            </label>
            <input
              id='c-postal'
              className={field}
              value={f.postal}
              onChange={set("postal")}
              autoComplete='postal-code'
              aria-invalid={!!errs.postal}
            />
            {err("postal")}
          </div>
        </div>
        <div className='mt-8 border border-dashed border-ink/30 bg-oat/50 p-5 font-body text-sm text-ink/60'>
          Payment: no card needed in this demo.
        </div>
      </div>

      <aside className='lg:sticky lg:top-28 lg:self-start'>
        <div className='border border-divider bg-oat/50 p-6'>
          <h2 className='font-display text-xl'>Your order</h2>
          <ul className='mt-4 divide-y divide-divider'>
            {items.map((i) => (
              <li key={i.slug} className='flex items-center gap-3 py-3'>
                <Photo
                  id={`p-${i.slug}`}
                  label={i.name}
                  swatch={i.swatch}
                  sizes='56px'
                  className='h-16 w-14 shrink-0 rounded-sm'
                />
                <div className='min-w-0 flex-1'>
                  <p className='truncate font-display text-sm'>{i.name}</p>
                  <p className='font-body text-xs text-ink/50'>Qty {i.qty}</p>
                </div>
                <p className='font-body text-sm'>{money(i.price * i.qty)}</p>
              </li>
            ))}
          </ul>
          <div className='mt-3 space-y-1.5 border-t border-divider pt-4 font-body text-sm'>
            <div className='flex justify-between text-ink/60'>
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            {promo ? (
              <div className='flex justify-between text-moss'>
                <span>{PROMO.code}</span>
                <span>−{money(totals.discount)}</span>
              </div>
            ) : null}
            <div className='flex justify-between text-ink/60'>
              <span>Shipping</span>
              <span>
                {totals.shipping === 0 ? "Free" : money(totals.shipping)}
              </span>
            </div>
            <div className='flex justify-between pt-2 font-display text-xl'>
              <span>Total</span>
              <span>{money(totals.total)}</span>
            </div>
          </div>
          <button
            type='submit'
            className='mt-6 w-full bg-ink py-3.5 font-body text-sm text-plaster transition-colors hover:bg-rust'
          >
            Place order (demo)
          </button>
        </div>
      </aside>
    </form>
  );
}
