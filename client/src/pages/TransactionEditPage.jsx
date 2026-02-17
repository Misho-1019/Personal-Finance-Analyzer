import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router";
import transactionService from '../services/transactionService';
import { turnDateFormat } from '../utils/date';

const TransactionEditPage = () => {
  const { id: transactionId } = useParams()
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState('')
  const [type, setType] = useState('')
  const [isLoading, setIsLoading] = useState(false); 
  
  useEffect(() => {
    transactionService.getOne(transactionId)
    .then(data => {
      setTransaction(data);
      setType(data.type)
    })
    .finally(() => setIsLoading(false))
  }, [transactionId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-300">
        Loading transaction...
      </div>
    );
  }
  console.log(transaction);

  const defaultDate = transaction.date ? turnDateFormat(String(transaction.date)) : '';

  const categoryInfo = transaction.category || {}

  const transactionDeleteClickHandler = async() => {
    const hasConfirm = confirm(`Are you sure you want to delete this transaction?`)

    if (!hasConfirm) return

    await transactionService.delete(transactionId)

    navigate('/transactions/list')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Transaction</h1>
            <p className="text-slate-400 mt-1">Modify an existing financial record</p>
          </div>
          <button onClick={transactionDeleteClickHandler} className="text-rose-400 hover:bg-rose-500/10 px-4 py-2 rounded-lg border border-rose-500/20 transition-all font-semibold text-sm">
             Delete Permanentely
          </button>
        </div>

        <form className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="flex gap-4 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              type="button"
              name='type'
              onClick={() => setType('EXPENSE')}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${type === 'EXPENSE' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-lg shadow-rose-500/5' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Expense
            </button>
            <button
              type="button"
              name='type'
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
                  defaultValue={transaction.amountCents}
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 text-xs font-mono">CENTS</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</label>
              <input
                type="date"
                name='date'
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                defaultValue={defaultDate}
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
              defaultValue={transaction.description}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</label>
            <select
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all appearance-none"
              defaultValue={transaction.categoryId}
              name='category'
            >
              <option key={categoryInfo.id} defaultValue={categoryInfo.id}>{categoryInfo.name}</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Notes</label>
            <textarea
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all min-h-25 resize-none"
              defaultValue={transaction.notes}
              name='notes'
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-4">
            <Link
              to={-1}
              className="px-6 py-3 text-slate-400 hover:text-slate-200 font-medium transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500 hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isLoading ? 'Updating...' : 'Update Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionEditPage;
