import Image from "next/image";
import Link from "next/link";
import BatchMeter from "./_components/BatchMeter";
import Marquee from "./_components/Marquee";
import Photo from "./_components/Photo";
import ProductCard from "./_components/ProductCard";
import Reveal from "./_components/Reveal";
import Stamp from "./_components/Stamp";
import TrustIcon from "./_components/TrustIcon";
import {
  CATEGORIES,
  MATERIALS,
  NOTES,
  TRUST,
  getFeaturedProducts,
  getLowStock,
  makers,
  products,
} from "./_lib/products";
import { PICTURES } from "./_lib/pictures";
import { money } from "./_lib/utils";

const CAT_TONES = {
  Ceramics: ["#C7C2B4", "#8A6F4E"],
  Textiles: ["#DAD5C8", "#6E7A5E"],
  Home: ["#A8672E", "#2B2E28"],
};
const CAT_LINES = {
  Ceramics: "Carafes, bowls and vases",
  Textiles: "Linen, cotton and wool",
  Home: "Candles and small things",
};

export default function HomePage() {
  const featured = getFeaturedProducts();
  const lowStock = getLowStock(10);

  return (
    <>
      <section className='relative overflow-hidden'>
        <div
          className='relative flex h-[70vh] min-h-[440px] w-full items-end'
          style={{
            background:
              "linear-gradient(155deg, #DAD5C8 0%, #8A6F4E 55%, #2B2E28 100%)",
          }}
        >
          {PICTURES.hero ? (
            <>
              <Image
                src={PICTURES.hero}
                alt=''
                fill
                priority
                sizes='100vw'
                className='object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/35 to-ink/10' />
            </>
          ) : null}
          <div className='relative mx-auto w-full max-w-6xl px-6 pb-14'>
            <p
              className='fade-up mb-3 font-body text-sm uppercase tracking-wide text-plaster/70'
              style={{ "--d": "100ms" }}
            >
              New this season
            </p>
            <h1
              className='fade-up max-w-xl font-display text-5xl leading-[1.05] text-plaster sm:text-6xl'
              style={{ "--d": "220ms" }}
            >
              Objects made slowly, for a home that isn&apos;t in a hurry.
            </h1>
            <Link
              href='/shop'
              className='fade-up mt-8 inline-block border-b border-plaster/50 pb-1 font-body text-sm text-plaster transition-colors hover:border-plaster'
              style={{ "--d": "380ms" }}
            >
              Shop the collection
            </Link>
          </div>
          <Stamp
            size={140}
            className='absolute right-6 top-8 hidden text-plaster/80 sm:block lg:right-16'
          />
        </div>
      </section>

      <section
        className='overflow-hidden border-b border-divider bg-oat/60 py-3 text-ink/70'
        aria-hidden='true'
      >
        <Marquee items={MATERIALS} />
      </section>

      <section className='mx-auto grid max-w-6xl gap-6 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4'>
        {TRUST.map((t, i) => (
          <Reveal key={t.title} delay={i * 80}>
            <div className='flex gap-4'>
              <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 text-rust'>
                <TrustIcon name={t.icon} />
              </span>
              <div>
                <p className='font-display text-base'>{t.title}</p>
                <p className='font-body text-sm text-ink/60'>{t.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className='mx-auto max-w-6xl px-6 pb-8'>
        <h2 className='mb-8 font-display text-2xl text-ink'>
          Shop by room of the house
        </h2>
        <div className='grid gap-5 sm:grid-cols-3'>
          {CATEGORIES.map((c, i) => (
            <Reveal key={c} delay={i * 100}>
              <Link
                href={`/shop?category=${c}`}
                className='group relative block overflow-hidden rounded-sm'
              >
                <Photo
                  id={`cat-${c.toLowerCase()}`}
                  label={c}
                  swatch={CAT_TONES[c]}
                  sizes='(min-width:640px) 33vw, 100vw'
                  className='aspect-[4/5] w-full'
                  imgClassName='transition-transform duration-700 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent' />
                <div className='absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-plaster'>
                  <div>
                    <p className='font-display text-2xl'>{c}</p>
                    <p className='font-body text-xs text-plaster/75'>
                      {CAT_LINES[c]} ·{" "}
                      {products.filter((p) => p.category === c).length} pieces
                    </p>
                  </div>
                  <span
                    aria-hidden='true'
                    className='flex h-10 w-10 items-center justify-center rounded-full border border-plaster/60 transition-all group-hover:bg-plaster group-hover:text-ink'
                  >
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className='mx-auto max-w-6xl px-6 py-20'>
        <div className='mb-8 flex items-baseline justify-between'>
          <h2 className='font-display text-2xl text-ink'>Featured</h2>
          <Link
            href='/shop'
            className='font-body text-sm text-ink/60 hover:text-ink'
          >
            View all
          </Link>
        </div>
        <div className='grid gap-8 sm:grid-cols-3'>
          {featured.map((product, i) => (
            <Reveal key={product.slug} delay={i * 90}>
              <ProductCard product={product} delay={-i * 1.3} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className='bg-ink text-plaster'>
        <div className='mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 sm:grid-cols-2'>
          <p className='font-display text-3xl leading-snug'>
            Each piece is made in runs of fewer than fifty, by hand, in a single
            studio.
          </p>
          <p className='max-w-prose font-body text-plaster/70'>
            We work with a small group of makers across ceramics, textiles, and
            small-batch fragrance — no factory runs, no reorders that look quite
            the same twice. What you see is what exists.
          </p>
        </div>
      </section>

      <section className='mx-auto max-w-6xl px-6 py-20'>
        <div className='grid gap-10 lg:grid-cols-[1fr_1.4fr]'>
          <Reveal>
            <p className='font-body text-sm uppercase tracking-wide text-rust'>
              Batch watch
            </p>
            <h2 className='mt-2 font-display text-4xl leading-tight'>
              Nearly gone, and not coming back the same.
            </h2>
            <p className='mt-4 max-w-sm font-body text-ink/65'>
              When a run sells out, the next one is allowed to be a little
              different. These are the last of theirs.
            </p>
          </Reveal>
          <div className='divide-y divide-divider border-y border-divider'>
            {lowStock.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <Link
                  href={`/product/${p.slug}`}
                  className='group grid grid-cols-[72px_1fr_auto] items-center gap-5 py-5'
                >
                  <Photo
                    id={`p-${p.slug}`}
                    label={p.name}
                    swatch={p.swatch}
                    sizes='72px'
                    className='h-20 w-[72px] rounded-sm'
                  />
                  <div className='min-w-0'>
                    <p className='font-display text-lg transition-colors group-hover:text-rust'>
                      {p.name}
                    </p>
                    <div className='mt-2 max-w-xs'>
                      <BatchMeter batch={p.batch} compact />
                    </div>
                  </div>
                  <p className='font-body text-sm'>{money(p.price)}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className='border-y border-divider bg-oat/50'>
        <div className='mx-auto max-w-6xl px-6 py-20'>
          <h2 className='mb-10 font-display text-3xl'>
            Three makers, a few streets apart
          </h2>
          <div className='grid gap-8 sm:grid-cols-3'>
            {makers.map((m, i) => (
              <Reveal key={m.id} delay={i * 100}>
                <Photo
                  id={m.pic}
                  label={m.name}
                  swatch={m.tone}
                  sizes='(min-width:640px) 33vw, 100vw'
                  className='aspect-[4/5] w-full rounded-sm'
                />
                <p className='mt-4 font-body text-xs uppercase tracking-widest text-rust'>
                  {m.craft}
                </p>
                <p className='font-display text-xl'>{m.name}</p>
                <p className='mt-1 font-body text-sm text-ink/65'>{m.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-6xl px-6 py-20'>
        <h2 className='mb-10 font-display text-3xl'>
          Notes from the kitchen table
        </h2>
        <div className='grid gap-8 sm:grid-cols-3'>
          {NOTES.map((n, i) => (
            <Reveal key={n.name} delay={i * 100}>
              <figure className='h-full border-l-2 border-rust pl-5'>
                <blockquote className='font-display text-lg italic leading-snug'>
                  &ldquo;{n.quote}&rdquo;
                </blockquote>
                <figcaption className='mt-3 font-body text-xs uppercase tracking-wider text-ink/55'>
                  {n.name} · {n.item}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
