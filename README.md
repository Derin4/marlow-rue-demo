# Marlow & Rue

A demo online store for **Marlow & Rue**, a fictional shop selling small-batch ceramics, textiles and candles.

**Live demo:** https://marlow-rue-demo.derin-obasa.workers.dev/

> Marlow & Rue, its makers, products, prices, reviews and studio address are all fictional. This site was built for the MyClickAid demo gallery and does not represent a real business. No real orders or payments are taken. Do not use any of the content as real.

## What it shows

- **Working storefront flow:** browse the shop, open a product page, add to cart, review the cart and go through a demo checkout that ends with an order number
- **Cart drawer** that slides in from any page, with quick-add buttons on product cards
- **Free-shipping progress bar** that shows how far the cart is from free shipping (free over $100, otherwise a flat $9)
- **Promo code** field (the demo code is `SLOW10` for 10% off) with the discount and shipping worked out in the totals
- **"Batch" system** that makes the small-batch idea visible: every product shows its run number, run size and how many are left, with a meter and labels such as "Last 4" and "Sold out"
- **"Batch watch" section** on the home page that lists the products closest to selling out
- **Shop page** with category filtering (Ceramics, Textiles, Home), also reachable from the "Shop by room of the house" tiles
- **Maker profiles** for the three people behind the products, shown on the home page and linked to each product
- **Home page details:** a hero with a rotating stamp, a scrolling materials ticker, trust icons (shipping, handmade, returns, visit the studio), customer notes and a newsletter signup
- Related products, an expandable FAQ and scroll reveal animations

## Built with

- [Next.js](https://nextjs.org/) (App Router, JavaScript)
- [Tailwind CSS v4](https://tailwindcss.com/)
- Fraunces and Inter, self-hosted with `@fontsource`
- React context for the cart
- Static export (`output: "export"`), hosted on Cloudflare

## Getting started

```bash
npm install
npm install @fontsource/fraunces @fontsource/inter
npm run dev
```

Open http://localhost:3000 to view it.

To build the static site:

```bash
npm run build
```

The output goes to the `out/` folder.

## Project structure

```
app/
  _components/   Header, Footer, CartDrawer, CartClient, CheckoutClient,
                 ShopClient, ProductCard, ProductImage, QuickAdd, AddToCart,
                 BatchMeter, FreeShipBar, Marquee, Stamp, TrustIcon, Photo,
                 Accordion, Newsletter, CountUp, Reveal
  _context/      CartContext.js (cart state)
  _lib/          products.js (catalog, makers, shipping, promo), utils.js
                 (prices, totals, order number), pictures.js (photo paths)
  _styles/       globals.css
  layout.js      Fonts, cart provider, header, footer and cart drawer
  page.js        Home page
public/          Photos (mr-*.webp)
```

## Photos

Every photo slot shows a coloured placeholder until a picture is added. The photos live in `public/` and are listed in `app/_lib/pictures.js`:

| Slot                 | File                                                               | Shape                  |
| -------------------- | ------------------------------------------------------------------ | ---------------------- |
| Home hero            | `mr-hero.webp`                                                     | Landscape, 1800 x 1200 |
| Three category tiles | `mr-cat-ceramics.webp`, `mr-cat-textiles.webp`, `mr-cat-home.webp` | Portrait 4:5           |
| Eight products       | `mr-p-<product>.webp`                                              | Portrait 4:5           |
| Three makers         | `mr-maker-ines.webp`, `mr-maker-odette.webp`, `mr-maker-wren.webp` | Portrait 4:5           |
| About page           | `mr-about.webp`                                                    | Portrait 4:5           |

Product photos are matched by the product's slug with `p-` in front, so `ash-glaze-carafe` uses the key `p-ash-glaze-carafe`. Rename a product and its key together.

## Editing the content

- **Products, prices, batch sizes, makers, trust points, customer notes and ticker words:** `app/_lib/products.js`
- **Shipping threshold, flat rate and promo code:** the `SHIPPING` and `PROMO` values at the bottom of `products.js`
- **Photos:** `app/_lib/pictures.js`

## Deployment

The site exports to static files (`out/`) and deploys to Cloudflare Workers with static assets. Connect the GitHub repo, use `npm run build` as the build command, and let Cloudflare serve the `out` directory.

## About MyClickAid

MyClickAid builds websites for small businesses. This project is one of a gallery of fictional demo sites that show what we can do for different industries.
