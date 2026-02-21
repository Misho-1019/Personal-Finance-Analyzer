import { useEffect, useMemo, useState } from 'react';
import analyticsService from '../services/analyticsService';
import { getMonthDifference } from '../utils/date';

const AnalyticsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState('EXPENSE');
  const [monthlySummary, setMonthlySummary] = useState({});
  const [categoriesSummary, setCategoriesSummary] = useState({});
  const [dateFilters, setDateFilters] = useState({ from: '', to: '' });
  
  const monthsLength = useMemo(() => {
    if (!monthlySummary.from || !monthlySummary.to) return 0;
    return getMonthDifference(monthlySummary.to, monthlySummary.from) + 1;
  }, [monthlySummary.from, monthlySummary.to]);

  const fetchMonthlySummary = async ({from, to} = {}) => {
    setIsLoading(true)

    try {
      const data = await analyticsService.getMonthlySummary({
        from: from || undefined,
        to: to || undefined,
      })
  
      setMonthlySummary(data)
  
      setDateFilters({ from: data.from, to: data.to })

      return data;
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategoriesSummary = async ({from, to, type} = {}) => {
    if (!from || !to) return;

    try {
      const data = await analyticsService.getCategoriesSummary({
        from: from,
        to: to,
        type: type === "ALL" ? undefined : type,
      })

      setCategoriesSummary(data)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const ms = await fetchMonthlySummary();
        await fetchCategoriesSummary({ from: ms.from, to: ms.to, type: filterType === "ALL" ? undefined : filterType, })
      } finally {
        setIsLoading(false)
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const applyDateFilters = async () => {
    setIsLoading(true);

    try {
      if (dateFilters.from && dateFilters.to) {
        const from = dateFilters.from <= dateFilters.to ? dateFilters.from : dateFilters.to;
        const to = dateFilters.from <= dateFilters.to ? dateFilters.to : dateFilters.from;

        await fetchMonthlySummary({ from, to })

        await fetchCategoriesSummary({ from, to, type: filterType === "ALL" ? undefined : filterType, })
        return
      }
  
      const ms = await fetchMonthlySummary()
      await fetchCategoriesSummary({ from: ms.from, to: ms.to, type: filterType === "ALL" ? undefined : filterType, })
    } finally {
      setIsLoading(false)
    }
  }

  const clearDateFilters = async () => {
    setIsLoading(true);

    try {
      setDateFilters({ from: '', to: '' })
      
      const ms = await fetchMonthlySummary()
      await fetchCategoriesSummary({ from: ms.from, to: ms.to, type: filterType === "ALL" ? undefined : filterType, })
    } finally {
      setIsLoading(false)
    }
  }

  const formatCents = (cents) => `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  useEffect(() => {
    if (!monthlySummary.from || !monthlySummary.to) return;
  
    fetchCategoriesSummary({
      from: monthlySummary.from,
      to: monthlySummary.to,
      type: filterType,
    });
  }, [filterType, monthlySummary.from, monthlySummary.to]);

  const visiblePeriods = useMemo(() => {
    const periods = monthlySummary.periods || [];

    if (filterType === 'ALL') return periods;

    return periods.map((p) => {
      if (filterType === 'INCOME') {
        return { ...p, expenseCents: 0, netCents: p.incomeCents }
      }

      return { ...p, incomeCents: 0, netCents: -p.expenseCents }
    })
  }, [monthlySummary.periods, filterType])

  const incomeChangePercent = useMemo(() => {
    const periods = monthlySummary.periods || [];

    if (periods.length < 2) return null;

    const last = periods[periods.length - 1];
    const prev = periods[periods.length - 2];

    if (!prev.incomeCents) return null;

    return ((last.incomeCents - prev.incomeCents) / prev.incomeCents) * 100;
  }, [monthlySummary.periods])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-300">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Financial Analytics</h1>
            <p className="text-slate-400 mt-1">Detailed insights into your spending and income patterns</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterType === 'ALL' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('INCOME')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterType === 'INCOME' ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10 border border-emerald-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Income
            </button>
            <button
              onClick={() => setFilterType('EXPENSE')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterType === 'EXPENSE' ? 'bg-rose-500/20 text-rose-400 shadow-lg shadow-rose-500/10 border border-rose-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Expense
            </button>
          </div>
        </div>

        {/* Date filters bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-end lg:justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    From
                  </label>
                  <input
                    type="date"
                    value={dateFilters.from}
                    onChange={(e) =>
                      setDateFilters((prev) => ({ ...prev, from: e.target.value }))
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    To
                  </label>
                  <input
                    type="date"
                    value={dateFilters.to}
                    onChange={(e) =>
                      setDateFilters((prev) => ({ ...prev, to: e.target.value }))
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={clearDateFilters}
                  className="px-4 py-2.5 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all"
                >
                  Reset
                </button>
                <button
                  onClick={applyDateFilters}
                  className="px-4 py-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-xl text-sm font-semibold hover:bg-indigo-500/20 transition-all"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-500">
              Showing{" "}
              <span className="text-slate-300 font-semibold">
                {monthlySummary.from || "—"}
              </span>{" "}
              to{" "}
              <span className="text-slate-300 font-semibold">
                {monthlySummary.to || "—"}
              </span>
            </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <p className="text-slate-400 text-sm font-medium">Total Net Balance</p>
            <h2 className={`text-2xl font-bold mt-2 ${monthlySummary.totalNetCents >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {formatCents(monthlySummary.totalNetCents)}
            </h2>
            <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-indigo-500 to-cyan-400 transition-all duration-700"
                style={{
                  width: `${
                    monthlySummary.totalIncomeCents > 0
                      ? Math.min(
                          100,
                          (monthlySummary.totalNetCents /
                            monthlySummary.totalIncomeCents) *
                            100
                        )
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <p className="text-slate-400 text-sm font-medium">Monthly Income</p>
            <h2 className="text-2xl font-bold mt-2 text-indigo-300">
              {formatCents(monthlySummary.totalIncomeCents)}
            </h2>
            {incomeChangePercent !== null && (
              <p
                className={`text-xs mt-2 flex items-center gap-1 ${
                  incomeChangePercent >= 0
                    ? "text-emerald-400"
                    : "text-rose-400"
                }`}
              >
                {incomeChangePercent >= 0 ? "▲" : "▼"}
                {Math.abs(incomeChangePercent).toFixed(1)}% vs last month
              </p>
            )}
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <p className="text-slate-400 text-sm font-medium">Monthly Expenses</p>
            <h2 className="text-2xl font-bold mt-2 text-rose-400ish text-orange-300">
              {formatCents(monthlySummary.totalExpenseCents)}
            </h2>
            <p className="text-xs text-slate-500 mt-2">-4% from last period</p>
          </div>
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              Monthly Trends
              <span className="text-xs font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Last {monthsLength <= 1 ? `${monthsLength} Month` : `${monthsLength} Months`}</span>
            </h3>
            
            {/* Chart Placeholder */}
            <div className="h-64 flex items-end justify-between gap-1 mb-6">
              {visiblePeriods.map((p) => (
                <div key={p.period} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex justify-center items-end gap-1 h-48">
                    <div 
                      className="w-full bg-indigo-500/40 border-t-2 border-indigo-400/60 rounded-t-sm" 
                      style={{ height: `${(p.incomeCents / 600000) * 100}%` }}
                    ></div>
                    <div 
                      className="w-full bg-rose-500/40 border-t-2 border-rose-400/60 rounded-t-sm" 
                      style={{ height: `${(p.expenseCents / 600000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-500 rotate-45 mt-2 origin-left">{p.period}</span>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="pb-3 font-medium">Period</th>
                    <th className="pb-3 font-medium text-right">Income</th>
                    <th className="pb-3 font-medium text-right">Expense</th>
                    <th className="pb-3 font-medium text-right">Net</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {visiblePeriods.map(period => (
                    <tr key={period.period} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-3 font-medium">{period.period}</td>
                      <td className="py-3 text-right text-emerald-400/80">{formatCents(period.incomeCents)}</td>
                      <td className="py-3 text-right text-rose-400/80">{formatCents(period.expenseCents)}</td>
                      <td className="py-3 text-right font-semibold">{formatCents(period.netCents)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Categories Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-6">Spending by Category</h3>
            
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
               {/* Donut Chart Placeholder */}
               <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="70" fill="transparent" stroke="#1e293b" strokeWidth="15" />
                    <circle 
                      cx="80" 
                      cy="80" 
                      r="70" 
                      fill="transparent" 
                      stroke="url(#iridescent-gradient)" 
                      strokeWidth="15" 
                      strokeDasharray="440" 
                      strokeDashoffset="110"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="iridescent-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">{formatCents(categoriesSummary.totalCents).split('.')[0]}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Spent</span>
                  </div>
               </div>

               <div className="flex-1 space-y-4 w-full">
                  {categoriesSummary?.items?.map((item, idx) => (
                    <div key={item.categoryId || item.categoryName} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">{item.categoryName}</span>
                        <span className="text-slate-500">{Math.round(item.share * 100)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-linear-to-r ${idx === 0 ? 'from-indigo-500 to-indigo-400' : 'from-slate-600 to-slate-500'} transition-all duration-1000`} 
                          style={{ width: `${item.share * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium text-right">Amount</th>
                    <th className="pb-3 font-medium text-right">Transactions</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {categoriesSummary?.items?.map(item => (
                    <tr key={item.categoryId || item.categoryName} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${item.categoryName === 'Uncategorized' ? 'bg-slate-600' : 'bg-indigo-500'}`}></div>
                          {item.categoryName}
                        </div>
                      </td>
                      <td className="py-3 text-right font-medium">{formatCents(item.amountCents)}</td>
                      <td className="py-3 text-right text-slate-500">{item.txCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
