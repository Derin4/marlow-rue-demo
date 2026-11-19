"use client";
import { useEffect, useRef, useState } from "react";

// "Batch No. 03 · 17 of 40 left" with a bar that fills when scrolled into view.
export default function BatchMeter({ batch, compact = false }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const pct = batch.size ? (batch.left / batch.size) * 100 : 0;
  const color =
    batch.left === 0 ? "#B9B2A0" : batch.left <= 5 ? "#C9522E" : "#6E7A5E";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div
        className={`flex items-baseline justify-between font-body ${compact ? "text-[11px]" : "text-xs"} uppercase tracking-wider text-ink/60`}
      >
        <span>Batch No. {String(batch.no).padStart(2, "0")}</span>
        <span
          className='font-semibold'
          style={{ color: batch.left === 0 ? undefined : color }}
        >
          {batch.left === 0
            ? "Sold out"
            : `${batch.left} of ${batch.size} left`}
        </span>
      </div>
      <div
        className={`mt-1.5 overflow-hidden rounded-full bg-ink/10 ${compact ? "h-1" : "h-1.5"}`}
        role='img'
        aria-label={
          batch.left === 0
            ? "Sold out"
            : `${batch.left} of ${batch.size} left in this batch`
        }
      >
        <div
          className='h-full rounded-full transition-[width] duration-[1200ms] ease-out'
          style={{ width: on ? `${pct}%` : 0, background: color }}
        />
      </div>
    </div>
  );
}
