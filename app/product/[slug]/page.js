import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getRelated,
  makerById,
  products,
} from "../../_lib/products";
import { money } from "../../_lib/utils";
import Accordion from "../../_components/Accordion";
import AddToCart from "../../_components/AddToCart";
import BatchMeter from "../../_components/BatchMeter";
import Photo from "../../_components/Photo";
import ProductCard from "../../_components/ProductCard";
import ProductImage from "../../_components/ProductImage";
import Reveal from "../../_components/Reveal";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.name} — Marlow & Rue` : "Marlow & Rue" };
}

const INFO = [
  {
    q: "Shipping",
    a: "Orders ship every Thursday, packed in recycled paper. Free over $100, otherwise a flat $9. Every piece is wrapped by the person who made it.",
  },
  {
    q: "Returns",
    a: "Return anything within 30 days in its original packaging. Because each run is small, we may not be able to replace a piece, but we will always refund it.",
  },
  {
    q: "Care",
    a: "Natural materials change with use. That is the point. Follow the care line above and your piece will soften and settle into the room.",
  },
];

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const maker = makerById(product.maker);
  const related = getRelated(product, 3);

  return (
    <div className='mx-auto max-w-6xl px-6 py-12'>
      <nav
        aria-label='Breadcrumb'
        className='mb-8 font-body text-xs text-ink/50'
      >
        <Link href='/shop' className='hover:text-ink'>
          Shop
        </Link>{" "}
        <span aria-hidden='true'>/</span>{" "}
        <Link
          href={`/shop?category=${product.category}`}
          className='hover:text-ink'
        >
          {product.category}
        </Link>{" "}
        <span aria-hidden='true'>/</span>{" "}
        <span className='text-ink/80'>{product.name}</span>
      </nav>

      <div className='grid gap-12 sm:grid-cols-2'>
        <div>
          <ProductImage
            id={`p-${product.slug}`}
            name={product.name}
            swatch={product.swatch}
          />
          <p className='mt-3 font-body text-xs text-ink/40'>
            Drag to pan while zoomed in. Double-click to reset.
          </p>
        </div>

        <div className='sm:pt-2'>
          <p className='mb-2 font-body text-xs uppercase tracking-wide text-ink/40'>
            {product.category}
          </p>
          <h1 className='mb-3 font-display text-4xl text-ink'>
            {product.name}
          </h1>
          <p className='mb-6 font-body text-lg text-ink/70'>
            {money(product.price)}
          </p>
          <p className='max-w-prose font-body leading-relaxed text-ink/70'>
            {product.description}
          </p>

          <ul className='mt-6 space-y-1.5 font-body text-sm text-ink/60'>
            {product.details.map((d) => (
              <li key={d} className='flex gap-2'>
                <span className='text-ink/30'>—</span>
                {d}
              </li>
            ))}
          </ul>

          <div className='mt-8 max-w-sm border border-divider bg-oat/50 p-4'>
            <BatchMeter batch={product.batch} />
          </div>

          <AddToCart product={product} />

          {maker ? (
            <div className='mt-10 flex items-center gap-4 border-t border-divider pt-6'>
              <Photo
                id={maker.pic}
                label={maker.name}
                swatch={maker.tone}
                sizes='56px'
                className='h-14 w-14 shrink-0 rounded-full'
              />
              <p className='font-body text-sm text-ink/70'>
                Made by <strong className='text-ink'>{maker.name}</strong>,{" "}
                {maker.craft.toLowerCase()}, in a run of {product.batch.size}.
              </p>
            </div>
          ) : null}

          <div className='mt-8'>
            <Accordion items={INFO} />
          </div>
        </div>
      </div>

      <section className='mt-24'>
        <h2 className='mb-8 font-display text-2xl'>You may also like</h2>
        <div className='grid gap-8 sm:grid-cols-3'>
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <ProductCard product={p} delay={-i * 1.1} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
