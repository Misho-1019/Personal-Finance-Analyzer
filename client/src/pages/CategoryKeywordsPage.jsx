/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import categoryKeywordService from '../services/categoryKeywordService';
import categoriesService from "../services/categoriesService";
import { showToast } from '../utils/toastUtils';

const CategoryKeywordsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [keywords, setKeywords] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [keywordData, setKeywordData] = useState({ keyword: '' })
  const [category, setCategory] = useState('cmlitmb870004esv443bfg999')

  
  const handleCreate = () => {
    setSelectedKeyword(null);
    setKeywordData({ keyword: '' })
    setCategory('cmlitmb870004esv443bfg999')
    setShowModal(true);
  };

  useEffect(() => {
    setIsLoading(true);

    categoryKeywordService.getKeywords()
    .then(setKeywords)
    .finally(() => setIsLoading(false))
  }, [])
  
  useEffect(() => {
    setIsLoading(true);
    
    categoriesService.getCategories()
    .then(setCategories)
    .finally(() => setIsLoading(false))
  }, [])
  
  const getCategoryName = (id) => categories.find(c => c.id === id)?.name || 'Unknown';

  const createKeywordClickHandler = async () => {
    const payload = {
      keyword: keywordData.keyword.trim(),
      categoryId: category,
    }

    if (!payload.keyword || !payload.categoryId) {
      showToast('Category Keyword and ID are required!', 'error')
    }

    try {
      const newKeyword = await categoryKeywordService.createKeyword(payload)
  
      setKeywords((prev) => [...prev, newKeyword])
  
      setShowModal(false)
      showToast('Category Keyword successfully created!', 'success')
    } catch (error) {
      showToast(error?.message || 'Failed to create category keyword', 'error')
    }
  }

  const deleteKeywordClickHandler = async () => {
    if (!selectedKeyword) return;

    try {
      await categoryKeywordService.deleteKeyword(selectedKeyword.id)

      setKeywords((prev) => prev.filter((k) => k.id !== selectedKeyword.id))

      setSelectedKeyword(null)
      setShowDeleteConfirm(false)
      showToast('Category Keyword Deleted!', 'success')
    } catch (error) {
      showToast(error?.message || 'Failed to delete category keyword', 'error')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-300">
        Loading keywords...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Auto-Categorization Rules</h1>
            <p className="text-slate-400 mt-1">Define keywords that automatically map transactions to categories</p>
          </div>
          <button 
            onClick={handleCreate}
            className="bg-linear-to-r from-teal-400 to-indigo-500 hover:from-teal-500 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-teal-500/10 transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Rule
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keywords.map((kw) => (
            <div key={kw.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between group hover:border-slate-700 transition-all shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Keyword</p>
                  <h3 className="text-xl font-bold text-white">"{kw.keyword}"</h3>
                </div>
                <button onClick={() => {setShowDeleteConfirm(true); setSelectedKeyword(kw)}} className="text-slate-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100 p-1">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                   </svg>
                </button>
              </div>
              
              <div className="mt-8 pt-4 border-t border-slate-800">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Category Mapping</p>
                <span className="inline-flex items-center text-sm font-medium text-indigo-400">
                   <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span>
                   {getCategoryName(kw.categoryId)}
                </span>
              </div>
            </div>
          ))}

          {/* Empty state hint card */}
          <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 opacity-60 hover:opacity-100 transition-all cursor-pointer" onClick={handleCreate}>
             <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
             </div>
             <p className="text-sm font-medium text-slate-400">Add another mapping rule</p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
            <h2 className="text-2xl font-bold">New Keyword Mapping</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Keyword</label>
                <input 
                  type="text" 
                  onChange={(e) => setKeywordData((prev) => ({ ...prev, keyword: e.target.value }))}
                  value={keywordData.keyword}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  placeholder="e.g. Amazon"
                />
                <p className="text-[10px] text-slate-600 mt-2">Transactions containing this text will be auto-categorized.</p>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Target Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none">
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
               <button onClick={() => setShowModal(false)} className="flex-1 px-6 py-3 text-slate-400 font-medium bg-slate-800/50 rounded-xl transition-all hover:bg-slate-800">Cancel</button>
               <button onClick={createKeywordClickHandler} className="flex-1 bg-linear-to-r from-indigo-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all">
                 Create Rule
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation UI */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
           <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                 </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">Delete Category Keyword?</h3>
                <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                  Transactions will no longer be automatically assigned to this category when this keyword is detected. This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-4 pt-2">
                 <button onClick={() => {setShowDeleteConfirm(false); setSelectedKeyword(null)}} className="flex-1 px-6 py-2 text-slate-300 font-medium cursor-pointer">Wait, Keep it</button>
                 <button onClick={deleteKeywordClickHandler} className="flex-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold py-2 px-6 rounded-lg cursor-pointer">Yes, Delete</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CategoryKeywordsPage;
