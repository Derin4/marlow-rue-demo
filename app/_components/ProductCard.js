import Link from "next/link";
import { money } from "../_lib/utils";
import Photo from "./Photo";
import QuickAdd from "./QuickAdd";

export default function ProductCard({ product, priority = false, delay = 0 }) {
  const { batch } = product;
  const soldOut = batch.left === 0;
  const low = batch.left > 0 && batch.left <= 5;

  return (
    <article className='group relative'>
      <div className='relative overflow-hidden rounded-sm'>
        <Link
          href={`/product/${product.slug}`}
          className='block'
          aria-label={`${product.name}, ${money(product.price)}`}
        >
          <Photo
            id={`p-${product.slug}`}
            label={product.name}
            swatch={product.swatch}
            priority={priority}
            sizes='(min-width:640px) 33vw, 50vw'
            className={`aspect-[4/5] w-full rounded-sm ${soldOut ? "opacity-60 saturate-50" : ""}`}
            imgClassName='transition-transform duration-700 group-hover:scale-[1.04]'
          />
          <span
            aria-hidden='true'
            className='absolute inset-0 rounded-sm bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10'
          />
        </Link>
        <div
          aria-hidden='true'
          className='tag-swing pointer-events-none absolute right-3 top-0 z-10'
          style={{ "--d": `${delay}s` }}
        >
          <span className='mx-auto block h-5 w-px bg-ink/50' />
          <div
            className='relative bg-kraft px-2.5 pb-2 pt-3 text-center shadow-[0_6px_14px_-6px_rgba(43,46,40,.5)]'
            style={{
              clipPath: "polygon(12% 0,88% 0,100% 14%,100% 100%,0 100%,0 14%)",
            }}
          >
            <span className='absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-plaster ring-1 ring-ink/30' />
            <p className='font-body text-[9px] uppercase tracking-widest text-ink/60'>
              No. {String(batch.no).padStart(2, "0")}
            </p>
            <p
              className={`font-display text-xs italic ${low ? "text-rust-deep" : "text-ink"}`}
            >
              {soldOut
                ? "Sold out"
                : low
                  ? `Last ${batch.left}`
                  : `${batch.left} left`}
            </p>
          </div>
        </div>
        <QuickAdd product={product} />
      </div>
      <Link
        href={`/product/${product.slug}`}
        className='mt-3 flex items-baseline justify-between gap-3'
      >
        <div>
          <p className='font-display text-lg leading-snug text-ink'>
            {product.name}
          </p>
          <p className='mt-0.5 font-body text-xs uppercase tracking-wide text-ink/50'>
            {product.category}
          </p>
        </div>
        <p className='font-body text-sm text-ink/80'>{money(product.price)}</p>
      </Link>
    </article>
  );
}
