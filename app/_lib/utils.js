import { SHIPPING, PROMO } from "./products";

export const money = (n) => {
  const v = Math.round(n * 100) / 100;
  return `$${Number.isInteger(v) ? v : v.toFixed(2)}`;
};

export function computeTotals(subtotal, promoApplied) {
  const discount = promoApplied
    ? Math.round(subtotal * PROMO.percent) / 100
    : 0;
  const after = subtotal - discount;
  const shipping =
    subtotal === 0 ? 0 : after >= SHIPPING.threshold ? 0 : SHIPPING.flat;
  return {
    subtotal,
    discount,
    shipping,
    total: after + shipping,
    toFree: Math.max(0, SHIPPING.threshold - after),
  };
}

// Demo order number like MR-48213. Lives outside any component so the React
// Compiler purity lint does not flag Math.random in a render scope.
export function orderCode() {
  return `MR-${Math.floor(10000 + Math.random() * 90000)}`;
}

export const batchLabel = (b) =>
  b.left === 0 ? "Sold out" : b.left <= 5 ? `Last ${b.left}` : `${b.left} left`;
