// src/services/analyticsService.js
import prisma from "../prismaClient.js";

export default {
  async monthlySummary(userId, { from, to } = {}) {
    // ---------- Date helpers (UTC, deterministic) ----------
    const pad2 = (n) => String(n).padStart(2, "0");

    const toISODateUTC = (d) =>
      `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;

    const startOfDayUTC = (d) =>
      new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0));

    const endOfDayUTC = (d) =>
      new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 23, 59, 59, 999));

    const startOfMonthUTC = (d) =>
      new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1, 0, 0, 0, 0));

    const addMonthsUTC = (d, months) => {
      const year = d.getUTCFullYear();
      const month = d.getUTCMonth();
      const day = d.getUTCDate();

      const target = new Date(Date.UTC(year, month + months, 1, 0, 0, 0, 0));
      // clamp day to last day of target month if needed
      const lastDay = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0))
        .getUTCDate();
      const safeDay = Math.min(day, lastDay);

      return new Date(
        Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), safeDay, 0, 0, 0, 0)
      );
    };

    const parseISODateToUTC = (s) => {
      // expects YYYY-MM-DD (already validated by Zod)
      // Make it explicit UTC midnight to avoid environment-dependent parsing.
      return new Date(`${s}T00:00:00.000Z`);
    };

    const formatYearMonthUTC = (d) => `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}`;

    const monthsBetweenInclusiveUTC = (fromDate, toDate) => {
      const start = startOfMonthUTC(fromDate);
      const end = startOfMonthUTC(toDate);

      const out = [];
      let cur = start;

      while (cur.getTime() <= end.getTime()) {
        out.push(formatYearMonthUTC(cur));
        cur = addMonthsUTC(cur, 1);
      }
      return out;
    };

    // ---------- Defaults ----------
    const now = new Date();
    const defaultTo = endOfDayUTC(now);
    const defaultFrom = startOfMonthUTC(addMonthsUTC(now, -5)); // 6-month window incl. current

    const fromDate = from ? startOfDayUTC(parseISODateToUTC(from)) : defaultFrom;
    const toDate = to ? endOfDayUTC(parseISODateToUTC(to)) : defaultTo;

    // Echo back the effective bounds
    const effectiveFrom = toISODateUTC(fromDate);
    const effectiveTo = toISODateUTC(toDate);

    // ---------- DB aggregation (single query) ----------
    // NOTE: Prisma parameterization is automatic with tagged template literals.
    const rows = await prisma.$queryRaw`
      SELECT
        date_trunc('month', "date") AS "period",
        COALESCE(SUM(CASE WHEN "type" = 'INCOME' THEN "amountCents" ELSE 0 END), 0)::bigint AS "incomeCents",
        COALESCE(SUM(CASE WHEN "type" = 'EXPENSE' THEN "amountCents" ELSE 0 END), 0)::bigint AS "expenseCents"
      FROM "Transaction"
      WHERE "userId" = ${userId}
        AND "date" >= ${fromDate}
        AND "date" <= ${toDate}
      GROUP BY 1
      ORDER BY 1 ASC
    `;

    // Build a lookup by YYYY-MM
    const byMonth = new Map();
    for (const r of rows) {
      const periodDate = r.period instanceof Date ? r.period : new Date(r.period);
      const key = formatYearMonthUTC(periodDate);

      // BigInt may come back depending on driver; normalize to Number for API.
      const income = typeof r.incomeCents === "bigint" ? Number(r.incomeCents) : Number(r.incomeCents);
      const expense =
        typeof r.expenseCents === "bigint" ? Number(r.expenseCents) : Number(r.expenseCents);

      byMonth.set(key, { incomeCents: income, expenseCents: expense });
    }

    // ---------- Fill missing months ----------
    const monthKeys = monthsBetweenInclusiveUTC(fromDate, toDate);

    const periods = [];
    let totalIncomeCents = 0;
    let totalExpenseCents = 0;

    for (const key of monthKeys) {
      const found = byMonth.get(key);
      const incomeCents = found ? found.incomeCents : 0;
      const expenseCents = found ? found.expenseCents : 0;
      const netCents = incomeCents - expenseCents;

      totalIncomeCents += incomeCents;
      totalExpenseCents += expenseCents;

      periods.push({ period: key, incomeCents, expenseCents, netCents });
    }

    const totalNetCents = totalIncomeCents - totalExpenseCents;

    return {
      from: effectiveFrom,
      to: effectiveTo,
      periods,
      totalIncomeCents,
      totalExpenseCents,
      totalNetCents,
    };
  },
};
