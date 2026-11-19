import { Suspense } from "react";
import ShopClient from "../_components/ShopClient";

export const metadata = { title: "Shop — Marlow & Rue" };

export default function ShopPage() {
  return (
    <div className='mx-auto max-w-6xl px-6 py-16'>
      <div className='mb-12 max-w-xl'>
        <h1 className='mb-3 font-display text-4xl text-ink'>Shop</h1>
        <p className='font-body text-ink/60'>
          Everything currently in stock. Quantities are limited by design — once
          a run sells out, it doesn&apos;t come back the same way.
        </p>
      </div>
      <Suspense fallback={<div className='h-96 animate-pulse bg-oat/60' />}>
        <ShopClient />
      </Suspense>
    </div>
  );
}
