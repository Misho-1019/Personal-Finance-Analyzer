// src/services/analyticsService.js
import prisma from "../prismaClient.js";

function startOfDay(dateStr) {
  // Safe because dateStr is validated as YYYY-MM-DD upstream
  return new Date(`${dateStr}T00:00:00.000Z`);
}

function startOfNextDayUtc(dateStr) {
  const d = startOfDay(dateStr);
  d.setUTCDate(d.getUTCDate() + 1);
  return d;
}

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
  async categoriesSummary(userId, { from, to, type } = {}) {
    const fromStartUtc = startOfDay(from);
    const toEndExclusiveUtc = startOfNextDayUtc(to);
  
    const where = {
      userId,
      date: {
        gte: fromStartUtc,
        lt: toEndExclusiveUtc,
      },
      ...(type ? { type } : {}),
    };
  
    // 1) Aggregate transactions by categoryId
    const grouped = await prisma.transaction.groupBy({
      by: ["categoryId"],
      where,
      _sum: { amountCents: true },
      _count: { _all: true },
    });
  
    // 2) Fetch category names for non-null categoryId
    const categoryIds = grouped
      .map((g) => g.categoryId)
      .filter((id) => id !== null);
  
    const categories =
      categoryIds.length > 0
        ? await prisma.category.findMany({
            where: {
              userId,
              id: { in: categoryIds },
            },
            select: { id: true, name: true },
          })
        : [];
  
    const nameById = new Map(categories.map((c) => [c.id, c.name]));
  
    // 3) Build buckets
    const items = grouped
      .map((g) => {
        const amountCents = g._sum.amountCents ?? 0;
        const txCount = g._count?._all ?? 0;
  
        if (g.categoryId === null) {
          return {
            categoryId: null,
            categoryName: "Uncategorized",
            amountCents,
            txCount,
          };
        }
  
        return {
          categoryId: g.categoryId,
          categoryName: nameById.get(g.categoryId) ?? "Unknown category",
          amountCents,
          txCount,
        };
      })
      .sort((a, b) => b.amountCents - a.amountCents);
  
    const totalCents = items.reduce((acc, x) => acc + x.amountCents, 0);
  
    const itemsWithShare = items.map((x) => ({
      ...x,
      share: totalCents > 0 ? x.amountCents / totalCents : 0,
    }));
  
    return {
      from,
      to,
      type: type ?? null,
      totalCents,
      items: itemsWithShare,
    };
  }
};
