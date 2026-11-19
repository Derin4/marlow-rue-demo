import { SHIPPING } from "../_lib/products";
import { money } from "../_lib/utils";

export default function FreeShipBar({ toFree, empty = false }) {
  const done = toFree <= 0 && !empty;
  const pct = empty
    ? 0
    : Math.min(100, ((SHIPPING.threshold - toFree) / SHIPPING.threshold) * 100);
  return (
    <div>
      <p className='font-body text-sm' aria-live='polite'>
        {empty ? (
          `Free shipping on orders over ${money(SHIPPING.threshold)}.`
        ) : done ? (
          "You've unlocked free shipping."
        ) : (
          <>
            You&apos;re <strong>{money(toFree)}</strong> away from free
            shipping.
          </>
        )}
      </p>
      <div className='mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10'>
        <div
          className='h-full rounded-full transition-[width] duration-700'
          style={{ width: `${pct}%`, background: done ? "#6E7A5E" : "#C9522E" }}
        />
      </div>
    </div>
  );
}
