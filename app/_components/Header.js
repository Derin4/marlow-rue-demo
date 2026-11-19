"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../_context/CartContext";
import { CATEGORIES, SHIPPING } from "../_lib/products";

function Bag({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <path d='M5 8h14l-1 12H6z' />
      <path d='M9 8V6a3 3 0 0 1 6 0v2' />
    </svg>
  );
}

export default function Header() {
  const { count, openDrawer } = useCart();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const tick = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (tick.current) return;
      tick.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);
        tick.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);
  const link = (href) =>
    `relative py-1 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-ink after:transition-all after:duration-300 ${path === href || path.startsWith(href + "/") ? "text-ink after:w-full" : "text-ink/70 after:w-0 hover:text-ink hover:after:w-full"}`;

  return (
    <>
      <div className='relative z-40 bg-ink px-4 py-2 text-center font-body text-xs tracking-wide text-plaster'>
        Free shipping over ${SHIPPING.threshold} · Small batches ship every
        Thursday
      </div>
      <header
        className={`sticky top-0 z-40 border-b border-divider bg-plaster/95 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_8px_24px_-18px_rgba(43,46,40,.6)]" : ""}`}
      >
        <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-4'>
          <button
            type='button'
            className='-ml-2 flex h-11 w-11 items-center justify-center sm:hidden'
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls='mobile-menu'
            onClick={() => setOpen((v) => !v)}
          >
            <span className='relative block h-3 w-5' aria-hidden='true'>
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-ink transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-5 bg-ink transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
          <Link
            href='/'
            onClick={close}
            className='font-display text-2xl tracking-tight text-ink'
          >
            Marlow &amp; Rue
          </Link>
          <nav
            className='hidden items-center gap-8 font-body text-sm sm:flex'
            aria-label='Main'
          >
            <Link href='/shop' className={link("/shop")}>
              Shop
            </Link>
            <Link href='/about' className={link("/about")}>
              About
            </Link>
          </nav>
          <button
            type='button'
            onClick={openDrawer}
            className='-mr-2 flex h-11 items-center gap-2 px-2 font-body text-sm text-ink/80 transition-colors hover:text-ink'
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
          >
            <span className='hidden sm:inline'>Cart</span>
            <span className='relative'>
              <Bag />
              {count > 0 ? (
                <span
                  key={count}
                  className='bump absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-rust px-1 text-[10px] font-semibold text-plaster'
                >
                  {count}
                </span>
              ) : null}
            </span>
          </button>
        </div>
        <div
          className={`hidden grid-rows-[1fr] transition-[grid-template-rows] duration-300 sm:grid ${scrolled ? "!grid-rows-[0fr]" : ""}`}
        >
          <div className='overflow-hidden'>
            <nav
              className='mx-auto flex max-w-6xl gap-7 border-t border-divider/70 px-6 py-2.5 font-body text-xs uppercase tracking-[0.14em] text-ink/60'
              aria-label='Departments'
            >
              <Link href='/shop' className='transition-colors hover:text-rust'>
                All pieces
              </Link>
              {CATEGORIES.map((c) => (
                <Link
                  key={c}
                  href={`/shop?category=${c}`}
                  className='transition-colors hover:text-rust'
                >
                  {c}
                </Link>
              ))}
              <Link
                href='/shop?stock=low'
                className='ml-auto text-rust transition-colors hover:text-rust-deep'
              >
                Last of the run
              </Link>
            </nav>
          </div>
        </div>
        <div
          id='mobile-menu'
          aria-hidden={!open}
          className={`absolute inset-x-0 top-full h-[100dvh] bg-plaster transition-opacity duration-300 sm:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <nav className='flex flex-col px-6 pt-6' aria-label='Mobile'>
            {[
              ["/shop", "Shop all"],
              ...CATEGORIES.map((c) => [`/shop?category=${c}`, c]),
              ["/about", "About"],
            ].map(([href, label], i) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                tabIndex={open ? 0 : -1}
                className='border-b border-divider py-4 font-display text-3xl'
                style={{
                  transition: "transform .5s, opacity .5s",
                  transitionDelay: `${i * 60}ms`,
                  transform: open ? "none" : "translateY(14px)",
                  opacity: open ? 1 : 0,
                }}
              >
                {label}
              </Link>
            ))}
            <p className='mt-8 font-body text-sm text-ink/60'>
              Studio open Thu–Sun, 11–5
              <br />
              14 Foundry Lane, Studio 3
            </p>
          </nav>
        </div>
      </header>
    </>
  );
}
