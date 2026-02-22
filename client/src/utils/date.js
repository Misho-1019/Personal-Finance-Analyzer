export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const turnDateFormat = (dateIso) => {
  return dateIso.split('T')[0] 
}

export const getMonthDifference = (date1Str, date2Str) => {
  const d1 = new Date(date1Str)
  const d2 = new Date(date2Str)

  const years = d1.getFullYear() - d2.getFullYear()
  const months = d1.getMonth() - d2.getMonth()

  return Math.abs(years * 12 + months);
}

export function formatPeriodLabel(period) {
  // period: "YYYY-MM"
  if (!period || typeof period !== "string") return "—";
  const [y, m] = period.split("-").map(Number);
  if (!y || !m) return period;
  const d = new Date(Date.UTC(y, m - 1, 1));
  return d.toLocaleDateString(undefined, { month: "short", year: "numeric" });
}