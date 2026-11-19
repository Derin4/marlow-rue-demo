import Link from "next/link";
import CountUp from "../_components/CountUp";
import Photo from "../_components/Photo";
import Reveal from "../_components/Reveal";
import { makers } from "../_lib/products";

export const metadata = {
  title: "About — Marlow & Rue",
};

export default function AboutPage() {
  return (
    <div>
      <div className='mx-auto grid max-w-6xl items-start gap-12 px-6 py-16 sm:grid-cols-2'>
        <Photo
          id='about'
          label='The studio'
          swatch={["#DAD5C8", "#2B2E28"]}
          sizes='(min-width:640px) 50vw, 100vw'
          priority
          className='aspect-[4/5] w-full rounded-sm'
        />
        <div className='max-w-prose sm:pt-4'>
          <h1 className='mb-6 font-display text-4xl text-ink'>
            Started in a garage, still run like one.
          </h1>
          <p className='mb-4 font-body leading-relaxed text-ink/70'>
            Marlow &amp; Rue began as a way to keep a handful of makers working
            through slow seasons — a potter, a weaver, a chandler, all within a
            few streets of each other. We never set out to become a shop with a
            catalog; we just kept saying yes to one more small run.
          </p>
          <p className='mb-4 font-body leading-relaxed text-ink/70'>
            Everything here is made in batches under fifty. When something sells
            out, we don&apos;t reorder it exactly — the next run is allowed to
            be a little different, because the people making it are, too.
          </p>
          <p className='font-body leading-relaxed text-ink/70'>
            If you&apos;re ever nearby, the studio is open Thursday through
            Sunday. Come see what&apos;s on the wheel.
          </p>
          <div className='mt-10 grid grid-cols-3 gap-4 border-t border-divider pt-8'>
            {[
              { to: 50, pre: "<", l: "pieces in any run" },
              { to: 3, l: "makers" },
              { to: 4, l: "open days a week" },
            ].map((s) => (
              <div key={s.l}>
                <p className='font-display text-4xl text-rust'>
                  {s.pre}
                  <CountUp to={s.to} />
                </p>
                <p className='font-body text-xs text-ink/60'>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className='border-y border-divider bg-oat/50'>
        <div className='mx-auto max-w-6xl px-6 py-20'>
          <h2 className='mb-10 font-display text-3xl'>The makers</h2>
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
        <div className='grid items-center gap-10 border border-divider p-8 sm:grid-cols-[1fr_auto] sm:p-12'>
          <div>
            <p className='font-body text-sm uppercase tracking-wide text-rust'>
              Visit the studio
            </p>
            <h2 className='mt-2 font-display text-3xl'>
              14 Foundry Lane, Studio 3
            </h2>
            <p className='mt-2 font-body text-ink/65'>
              Open Thursday to Sunday, 11 to 5. Kettle on, wheel running.
            </p>
          </div>
          <Link
            href='/shop'
            className='bg-ink px-8 py-3.5 text-center font-body text-sm text-plaster transition-colors hover:bg-rust'
          >
            Shop the collection
          </Link>
        </div>
      </section>
    </div>
  );
}
