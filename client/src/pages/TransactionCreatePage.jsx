import { useState } from 'react';
import { Link, useNavigate } from "react-router";
import { mockCategories } from '../mocks/categories';
import useAuth from '../hooks/useAuth';
import transactionService from '../services/transactionService';

const TransactionCreatePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('EXPENSE');
  const { userId } = useAuth()

  const submitAction = async (formData) => {
    const transactionData = Object.fromEntries(formData)

    const payload = {
      type,
      amountCents: Number(transactionData.amountCents),
      date: transactionData.date,
      description: transactionData.description?.trim(),
      categoryId: transactionData.categoryId || undefined,
      notes: transactionData.notes?.trim() || undefined,
    }

    const transaction = await transactionService.create({ ...payload }, userId)
    
    navigate('/transactions/list')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Add Transaction</h1>
          <p className="text-slate-400 mt-1">Record a new financial movement</p>
        </div>

        <form action={submitAction} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="flex gap-4 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setType('EXPENSE')}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${type === 'EXPENSE' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-lg shadow-rose-500/5' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType('INCOME')}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${type === 'INCOME' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Income
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount (in cents)</label>
              <div className="relative">
                <input
                  type="number"
                  name='amountCents'
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all font-mono"
                  placeholder="0"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 text-xs font-mono">CENTS</span>
              </div>
              <p className="text-[10px] text-slate-600 italic">Example: 1000 = $10.00</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</label>
              <input
                type="date"
                name='date'
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</label>
            <input
              type="text"
              name='description'
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
              placeholder="What was this for?"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</label>
            <select
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all appearance-none"
              name='categoryId'
            >
              <option value="">Select Category (Optional)</option>
              {mockCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Notes</label>
            <textarea
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all min-h-25 resize-none"
              placeholder="Additional details..."
              name='notes'
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-4">
            <Link
              to={-1}
              className="px-6 py-3 text-slate-400 hover:text-slate-200 font-medium transition-colors"
            >
              Discard
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500 hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionCreatePage;
