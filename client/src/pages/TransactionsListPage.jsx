import React, { useState } from 'react';
import { mockTransactions } from '../mocks/transactions';
import { mockCategories } from '../mocks/categories';

const TransactionsListPage = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: 'ALL',
    categoryId: '',
    search: '',
    from: '',
    to: ''
  });

  const formatCents = (cents) => `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <p className="text-slate-400 mt-1">Review and manage your financial activity</p>
          </div>
          <button className="bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500 hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Transaction
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
             <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Search</label>
                <input 
                  type="text" 
                  placeholder="Filter description..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
             </div>
             <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Type</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all appearance-none"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="ALL">All Types</option>
                  <option value="INCOME">Income</option>
                  <option value="EXPENSE">Expense</option>
                </select>
             </div>
             <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all appearance-none"
                  value={filters.categoryId}
                  onChange={(e) => setFilters({...filters, categoryId: e.target.value})}
                >
                  <option value="">All Categories</option>
                  {mockCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
             </div>
             <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">From</label>
                <input 
                  type="date" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  value={filters.from}
                  onChange={(e) => setFilters({...filters, from: e.target.value})}
                />
             </div>
             <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">To</label>
                <input 
                  type="date" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  value={filters.to}
                  onChange={(e) => setFilters({...filters, to: e.target.value})}
                />
             </div>
          </div>
        </div>

        {/* Transactions Table Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm">
                {mockTransactions.items.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400 font-medium">
                      {formatDate(tx.date)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-slate-100 font-semibold">{tx.description}</span>
                        {tx.notes && <span className="text-xs text-slate-500 truncate max-w-xs">{tx.notes}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {tx.category ? (
                        <span 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                          style={{ 
                            backgroundColor: `${tx.category.color}20`, 
                            color: tx.category.color,
                            borderColor: `${tx.category.color}40`
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: tx.category.color }}></span>
                          {tx.category.name}
                        </span>
                      ) : (
                        <span className="text-slate-600 italic">Uncategorized</span>
                      )}
                    </td>
                    <td className={`px-6 py-4 text-right font-bold whitespace-nowrap ${tx.type === 'INCOME' ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {tx.type === 'INCOME' ? '+' : '-'}{formatCents(tx.amountCents)}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="text-slate-500 hover:text-indigo-400 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination UI */}
          <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Showing <span className="text-slate-200 font-semibold">1-5</span> of <span className="text-slate-200 font-semibold">5</span> transactions
            </span>
            <div className="flex items-center gap-2">
              <button disabled className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-500 rounded-lg text-xs font-bold opacity-50 cursor-not-allowed transition-all">
                Previous
              </button>
              <button className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-xs font-bold hover:bg-indigo-500/20 transition-all">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsListPage;
