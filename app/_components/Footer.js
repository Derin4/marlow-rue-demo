import Link from "next/link";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className='relative z-10 mt-24 border-t border-divider'>
      <div className='mx-auto grid max-w-6xl gap-10 px-6 py-14 font-body text-sm text-ink/60 sm:grid-cols-4'>
        <div>
          <p className='mb-2 font-display text-lg text-ink'>Marlow &amp; Rue</p>
          <p>Small-batch home goods, made slowly on purpose.</p>
        </div>
        <div>
          <p className='mb-2 text-ink'>Visit</p>
          <p>
            14 Foundry Lane
            <br />
            Studio 3<br />
            Open Thu–Sun, 11–5
          </p>
        </div>
        <div>
          <p className='mb-2 text-ink'>Shop</p>
          <nav className='flex flex-col gap-1.5' aria-label='Footer'>
            <Link href='/shop' className='hover:text-ink'>
              All pieces
            </Link>
            <Link href='/shop?category=Ceramics' className='hover:text-ink'>
              Ceramics
            </Link>
            <Link href='/shop?category=Textiles' className='hover:text-ink'>
              Textiles
            </Link>
            <Link href='/shop?category=Home' className='hover:text-ink'>
              Home
            </Link>
            <Link href='/about' className='hover:text-ink'>
              About
            </Link>
          </nav>
        </div>
        <div>
          <p className='mb-2 text-ink'>Notes</p>
          <p>
            This is a demo storefront built for the MyClickAid gallery. No
            orders are processed here.
          </p>
        </div>
      </div>
      <div className='mx-auto max-w-6xl px-6 pb-10'>
        <Newsletter />
      </div>
      <div className='border-t border-divider px-6 py-4 text-center font-body text-xs text-ink/40'>
        &copy; {new Date().getFullYear()} Marlow &amp; Rue — demo site
      </div>
    </footer>
  );
}
