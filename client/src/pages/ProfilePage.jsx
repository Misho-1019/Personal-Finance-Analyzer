import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import analyticsService from "../services/analyticsService";
import { formatMoney } from "../utils/money";
import { formatPeriodLabel } from "../utils/date";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { id, firstName, lastName, email } = useAuth();
  const [currency] = useState("EUR"); // keep it simple for now (can wire later)
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [insightsError, setInsightsError] = useState("");
  const [monthlySummary, setMonthlySummary] = useState(null);
  const [isLoggingOut, _setIsLoggingOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoadingInsights(true);
        setInsightsError("");

        const data = await analyticsService.getMonthlySummary();

        if (!cancelled) setMonthlySummary(data);
      } catch (e) {
        if (!cancelled) setInsightsError(e?.message || "Failed to load insights");
      } finally {
        if (!cancelled) setLoadingInsights(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const computed = useMemo(() => {
    const periods = Array.isArray(monthlySummary?.periods) ? monthlySummary.periods : [];

    // latest period = last item (assuming backend returns chronological)
    const latest = periods.length ? periods[periods.length - 1] : null;    

    // best/worst net month
    let best = null;
    let worst = null;
    for (const p of periods) {
      if (!best || Number(p.netCents || 0) > Number(best.netCents || 0)) best = p;
      if (!worst || Number(p.netCents || 0) < Number(worst.netCents || 0)) worst = p;
    }

    return { periods, latest, best, worst };
  }, [monthlySummary]);  

  const initials = `${(firstName || "U")[0] || "U"}${(lastName || "S")[0] || "S"}`.toUpperCase();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-slate-400 mt-1">Account details and a quick snapshot of your finances</p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#003399]/10 border border-[#003399]/30 text-[10px] font-bold uppercase tracking-widest text-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#003399] shadow-[0_0_10px_rgba(0,51,153,0.6)]" />
            Signed in
          </div>
        </div>

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account card */}
          <section className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#003399]/20 border border-[#003399]/30 flex items-center justify-center font-black text-lg">
                {initials}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold">
                      {firstName} {lastName}
                    </h2>
                    <p className="text-slate-400 text-sm">{email}</p>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                    ID: <span className="text-slate-300 font-mono">{id}</span>
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Name</p>
                    <p className="mt-1 text-sm font-bold text-slate-200">
                      {firstName} {lastName}
                    </p>
                  </div>

                  <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Email</p>
                    <p className="mt-1 text-sm font-bold text-slate-200 break-all">{email}</p>
                  </div>
                </div>

                <p className="mt-4 text-[11px] text-slate-500">
                  Tip: your profile stays simple — the real power is in categories, keywords, and analytics.
                </p>
              </div>
            </div>
          </section>

          {/* Quick actions */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold">Quick actions</h3>

            <button
              onClick={() => navigate('/transactions/list')}
              className="w-full text-left px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">View transactions</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">List</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Search, filter, edit and keep things tidy</p>
            </button>

            <button
              onClick={() => navigate("/categories")}
              className="w-full text-left px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">Manage categories</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Rules</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Colors, structure, and better reporting</p>
            </button>

            <button
              onClick={() => navigate("/category-keywords")}
              className="w-full text-left px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">Auto-categorization</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Keywords</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Make imports smarter automatically</p>
            </button>
          </section>
        </div>

        {/* Insights */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold">Your data at a glance</h3>
              <p className="text-xs text-slate-500">
                Based on your recent monthly summary (last periods returned by the API).
              </p>
            </div>

            <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
              Currency: <span className="text-slate-300">{currency}</span>
            </div>
          </div>

          {loadingInsights ? (
            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 text-sm text-slate-400">
              Loading insights…
            </div>
          ) : insightsError ? (
            <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-5 text-sm text-rose-300">
              {insightsError}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Latest month net</p>
                  <p className="mt-2 text-xl font-black">
                    {formatMoney(computed.latest?.netCents, currency)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {formatPeriodLabel(computed.latest?.period)}
                  </p>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Total income (range)</p>
                  <p className="mt-2 text-xl font-black">
                    {formatMoney(monthlySummary.totalIncomeCents, currency)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    From <span className="text-slate-300">{monthlySummary?.from || "—"}</span> to{" "}
                    <span className="text-slate-300">{monthlySummary?.to || "—"}</span>
                  </p>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Total expenses (range)</p>
                  <p className="mt-2 text-xl font-black">
                    {formatMoney(monthlySummary.totalExpenseCents, currency)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Net: <span className="text-slate-300">{formatMoney(monthlySummary.totalNetCents, currency)}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Best month (net)</p>
                  <p className="mt-2 text-lg font-black">{formatMoney(computed.best?.netCents, currency)}</p>
                  <p className="text-xs text-slate-500 mt-1">{formatPeriodLabel(computed.best?.period)}</p>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Worst month (net)</p>
                  <p className="mt-2 text-lg font-black">{formatMoney(computed.worst?.netCents, currency)}</p>
                  <p className="text-xs text-slate-500 mt-1">{formatPeriodLabel(computed.worst?.period)}</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 rounded-xl bg-[#003399]/15 border border-[#003399]/30 text-sm font-bold hover:bg-[#003399]/20 transition-all"
                >
                  Open Analytics
                </button>
              </div>
            </>
          )}
        </section>

        {/* “Danger Zone” -> Logout */}
        <section className="bg-rose-500/5 border border-rose-500/15 rounded-2xl p-6 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-rose-300">Logout</h3>
              <p className="text-xs text-slate-400 mt-1">
                End this session on this device. You can sign back in anytime.
              </p>
            </div>

            <button
              onClick={() => navigate('/logout')}
              disabled={isLoggingOut}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all border ${
                isLoggingOut
                  ? "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed opacity-70"
                  : "bg-rose-500/20 border-rose-500/30 text-rose-200 hover:bg-rose-500/25"
              }`}
            >
              {isLoggingOut ? "Logging out…" : "Logout"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
