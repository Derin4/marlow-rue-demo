"use client";
import { useState } from "react";

export default function Accordion({ items }) {
  const [open, setOpen] = useState(-1);
  return (
    <div className='divide-y divide-divider border-y border-divider'>
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={it.q}>
            <button
              type='button'
              aria-expanded={on}
              onClick={() => setOpen(on ? -1 : i)}
              className='flex w-full items-center justify-between gap-4 py-4 text-left font-body text-sm font-medium'
            >
              {it.q}
              <span
                aria-hidden='true'
                className={`font-display text-xl transition-transform duration-300 ${on ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-400 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className='overflow-hidden'>
                <p className='pb-4 font-body text-sm leading-relaxed text-ink/70'>
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
