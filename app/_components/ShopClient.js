"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { CATEGORIES, products } from "../_lib/products";
import ProductCard from "./ProductCard";

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "low", label: "Price: low to high" },
  { id: "high", label: "Price: high to low" },
  { id: "name", label: "Name A–Z" },
  { id: "left", label: "Fewest left" },
];
const BANDS = [
  { id: "any", label: "Any price", test: () => true },
  { id: "u50", label: "Under $50", test: (p) => p.price < 50 },
  {
    id: "50-75",
    label: "$50 – $75",
    test: (p) => p.price >= 50 && p.price <= 75,
  },
  { id: "75+", label: "Over $75", test: (p) => p.price > 75 },
];

export default function ShopClient() {
  const sp = useSearchParams();
  const initCat = CATEGORIES.includes(sp.get("category"))
    ? sp.get("category")
    : "All";
  const [cat, setCat] = useState(initCat);
  const [sort, setSort] = useState("featured");
  const [band, setBand] = useState("any");
  const [q, setQ] = useState("");
  const [stockOnly, setStockOnly] = useState(
    sp.get("stock") === "low" ? "low" : "",
  );

  const counts = useMemo(() => {
    const c = { All: products.length };
    CATEGORIES.forEach(
      (k) => (c[k] = products.filter((p) => p.category === k).length),
    );
    return c;
  }, []);

  const list = useMemo(() => {
    const b = BANDS.find((x) => x.id === band);
    let out = products.filter(
      (p) => (cat === "All" || p.category === cat) && b.test(p),
    );
    const term = q.trim().toLowerCase();
    if (term)
      out = out.filter((p) =>
        `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(term),
      );
    if (stockOnly === "in") out = out.filter((p) => p.batch.left > 0);
    if (stockOnly === "low")
      out = out.filter((p) => p.batch.left > 0 && p.batch.left <= 10);
    const by = {
      featured: (a, c) => Number(c.featured) - Number(a.featured),
      low: (a, c) => a.price - c.price,
      high: (a, c) => c.price - a.price,
      name: (a, c) => a.name.localeCompare(c.name),
      left: (a, c) => (a.batch.left || 999) - (c.batch.left || 999),
    }[sort];
    return [...out].sort(by);
  }, [cat, sort, band, q, stockOnly]);

  const pickCat = (c) => {
    setCat(c);
    try {
      const u = new URL(window.location.href);
      if (c === "All") u.searchParams.delete("category");
      else u.searchParams.set("category", c);
      window.history.replaceState(null, "", u);
    } catch {}
  };

  const reset = () => {
    pickCat("All");
    setBand("any");
    setQ("");
    setStockOnly("");
    setSort("featured");
  };

  const chip = (on) =>
    `border px-3.5 py-1.5 font-body text-sm transition-colors ${on ? "border-ink bg-ink text-plaster" : "border-ink/25 hover:border-ink"}`;

  return (
    <div className='grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]'>
      <aside className='space-y-8'>
        <div>
          <label
            htmlFor='shop-q'
            className='mb-2 block font-body text-xs font-semibold uppercase tracking-wider text-ink/60'
          >
            Search
          </label>
          <input
            id='shop-q'
            type='search'
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder='Linen, candle, bowl…'
            className='w-full border border-ink/25 bg-plaster px-3.5 py-2.5 font-body text-sm outline-none focus:border-rust'
          />
        </div>
        <div>
          <p className='mb-2 font-body text-xs font-semibold uppercase tracking-wider text-ink/60'>
            Category
          </p>
          <div
            className='no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 lg:mx-0 lg:flex-col lg:gap-1 lg:px-0'
            role='group'
            aria-label='Category'
          >
            {["All", ...CATEGORIES].map((c) => (
              <button
                key={c}
                type='button'
                aria-pressed={cat === c}
                onClick={() => pickCat(c)}
                className={`shrink-0 lg:hidden ${chip(cat === c)}`}
              >
                {c}
              </button>
            ))}
            {["All", ...CATEGORIES].map((c) => (
              <button
                key={c + "-d"}
                type='button'
                aria-pressed={cat === c}
                onClick={() => pickCat(c)}
                className={`hidden items-center justify-between py-1.5 text-left font-body text-sm transition-colors lg:flex ${cat === c ? "font-semibold text-rust" : "text-ink/70 hover:text-ink"}`}
              >
                <span>{c}</span>
                <span className='text-xs text-ink/40'>{counts[c]}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className='mb-2 font-body text-xs font-semibold uppercase tracking-wider text-ink/60'>
            Price
          </p>
          <div className='flex flex-wrap gap-2' role='group' aria-label='Price'>
            {BANDS.map((b) => (
              <button
                key={b.id}
                type='button'
                aria-pressed={band === b.id}
                onClick={() => setBand(b.id)}
                className={chip(band === b.id)}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
        <fieldset>
          <legend className='mb-2 font-body text-xs font-semibold uppercase tracking-wider text-ink/60'>
            Availability
          </legend>
          {[
            ["", "Everything"],
            ["in", "In stock"],
            ["low", "Last of the run"],
          ].map(([v, l]) => (
            <label
              key={v}
              className='flex cursor-pointer items-center gap-2 py-1 font-body text-sm'
            >
              <input
                type='radio'
                name='stock'
                checked={stockOnly === v}
                onChange={() => setStockOnly(v)}
                className='accent-[#C9522E]'
              />{" "}
              {l}
            </label>
          ))}
        </fieldset>
      </aside>

      <div>
        <div className='mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-divider pb-4'>
          <p className='font-body text-sm text-ink/60' aria-live='polite'>
            {list.length} piece{list.length === 1 ? "" : "s"}
            {cat !== "All" ? ` in ${cat}` : ""}
          </p>
          <div className='flex items-center gap-2'>
            <label htmlFor='sort' className='font-body text-sm text-ink/60'>
              Sort by
            </label>
            <select
              id='sort'
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className='border border-ink/25 bg-plaster px-3 py-2 font-body text-sm outline-none focus:border-rust'
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {list.length === 0 ? (
          <div className='py-20 text-center'>
            <p className='font-display text-2xl'>Nothing matches that</p>
            <button
              type='button'
              onClick={reset}
              className='mt-3 border-b border-ink/40 pb-1 font-body text-sm hover:border-ink'
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div
            key={cat + sort + band + q + stockOnly}
            className='grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3'
          >
            {list.map((p, i) => (
              <div
                key={p.slug}
                className='step-in'
                style={{ "--d": `${Math.min(i, 8) * 50}ms` }}
              >
                <ProductCard product={p} delay={-i * 0.7} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
