import Link from "next/link";

export default function NotFound() {
  return (
    <div className='mx-auto max-w-xl px-6 py-28 text-center'>
      <p className='font-display text-6xl italic text-rust'>404</p>
      <h1 className='mt-4 font-display text-3xl'>
        That piece isn&apos;t on the shelf.
      </h1>
      <p className='mt-3 font-body text-ink/60'>
        It may have sold out, or the link is a little off.
      </p>
      <Link
        href='/shop'
        className='mt-8 inline-block bg-ink px-8 py-3 font-body text-sm text-plaster transition-colors hover:bg-rust'
      >
        Back to the shop
      </Link>
    </div>
  );
}
