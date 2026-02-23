// src/api/analyticsApi.js
import { useCallback, useEffect, useMemo, useState } from "react";
import request from "../utils/requester.js"; // adjust path if necessary

const baseUrl = "http://localhost:3030/analytics";

const EMPTY = Object.freeze({});

function qs(params = {}) {
  const p = new URLSearchParams();
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    p.set(k, String(v));
  });
  return p.toString();
}

async function safeGet(url) {
  try {
    return await request.get(url);
  } catch (err) {
    console.error("analytics safeGet error:", err);
    return null;
  }
}

export function useMonthlySummary(initialParams) {
  const params = initialParams ?? EMPTY;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // string key used to trigger effect when params semantically change
  const key = useMemo(() => JSON.stringify(params), [params]);

  // fetcher accepts paramsArg to avoid closing over `initialParams`
  const fetcher = useCallback(
    async (paramsArg) => {
      const finalParams = paramsArg ?? JSON.parse(key)

      setIsLoading(true);
      try {
        const q = qs(finalParams);
        const url = q ? `${baseUrl}/monthly-summary?${q}` : `${baseUrl}/monthly-summary`;
        const res = await safeGet(url);
        setData(res);
        return res;
      } finally {
        setIsLoading(false);
      }
    },
    [key] // depending on initialParams is OK; callers can pass overrides
  );

  useEffect(() => {
    fetcher().catch(() => {})
  }, [fetcher])

  const computed = useMemo(() => {
    const periods = Array.isArray(data?.periods) ? data.periods : [];
    const latest = periods.length ? periods[periods.length - 1] : null;
    let best = null,
      worst = null;
    for (const p of periods) {
      const net = Number(p.netCents || 0);
      if (!best || net > Number(best.netCents || 0)) best = p;
      if (!worst || net < Number(worst.netCents || 0)) worst = p;
    }
    return { periods, latest, best, worst };
  }, [data]);

  return { data, computed, isLoading, refetch: fetcher };
}

export function useCategoriesSummary(initialParams) {
  const params = initialParams ?? EMPTY;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const key = useMemo(() => JSON.stringify(params), [params]);

  const fetcher = useCallback(
    async (paramsArg) => {
      const finalParams = paramsArg ?? JSON.parse(key)

      // skip fetch if we don't have a date range (common pattern)
      if (!finalParams?.from || !finalParams?.to) {
        // clear previous data if needed
        setData(null);
        return null;
      }

      setIsLoading(true);
      try {
        const q = qs(finalParams);
        const url = q ? `${baseUrl}/categories-summary?${q}` : `${baseUrl}/categories-summary`;
        const res = await safeGet(url);
        setData(res);
        return res;
      } finally {
        setIsLoading(false);
      }
    },
    [key]
  );

  useEffect(() => {
    fetcher().catch(() => {})
  }, [fetcher])

  return { data, isLoading, refetch: fetcher };
}