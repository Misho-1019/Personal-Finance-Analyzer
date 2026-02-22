export const formatCents = (cents) => `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

export function formatMoney(cents, currency = "EUR") {
  const value = (Number(cents || 0) / 100) || 0;
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}