/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import categoriesService from '../services/categoriesService';
import { showToast } from '../utils/toastUtils';

const CategoriesPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([])
  const [color, setColor] = useState('#10b981')
  const [categoryData, setCategoryData] = useState({name: ''})

  useEffect(() => {
    setIsLoading(true);

    categoriesService.getCategories()
      .then(setCategories)
      .finally(() => setIsLoading(false))
  }, [])

  const handleCreate = () => {
    setSelectedCategory(null);
    setCategoryData({ name: '' })
    setColor('#10b981')
    setShowModal(true);
  };

  const handleEdit = (cat) => {
    setSelectedCategory(cat);
    setCategoryData({ name: cat.name })
    setColor(cat.color || '#10b981')
    setShowModal(true);
  };

  const createCategoryClickHandler = async () => {
    const payload = {
      name: categoryData.name.trim(),
      color,
    }

    if (!payload.name) {
      showToast('Name is required', 'error')
      return;
    }

    try {
      const created = await categoriesService.createCategory(payload)

      setCategories((prev) => [created, ...prev])
  
      setShowModal(false)
      showToast('Category Created Successfully!', 'success')
    } catch (error) {
      showToast(error?.message || 'Failed to create category', 'error')
    }
  }

  const updateCategoryClickHandler = async () => {
    if (!selectedCategory) return;

    const payload = {
      name: categoryData.name.trim(),
      color,
    }

    if (!payload.name) {
      showToast('Name is required', 'error')
      return;
    }

    try {
      const updated = await categoriesService.updateCategory(selectedCategory.id, payload)

      setCategories((prev) => prev.map((cat) => cat.id === selectedCategory.id ? updated : cat))
  
      setShowModal(false)
      setSelectedCategory(null)
      showToast('Category Updated Successfully!', 'success')
    } catch (error) {
      showToast(error?.message || 'Failed to update category', 'error')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-300">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Categories</h1>
            <p className="text-slate-400 mt-1">Organize your finances with custom labels</p>
          </div>
          <button 
            onClick={handleCreate}
            className="bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 text-indigo-400 font-semibold py-3 px-6 rounded-xl transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Category
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                  <th className="px-6 py-4">Color</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Transactions</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm font-medium">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div 
                        className="w-10 h-6 rounded-md shadow-sm border border-white/10" 
                        style={{ backgroundColor: cat.color }}
                      ></div>
                    </td>
                    <td className="px-6 py-4 text-slate-100">
                      {cat.name}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      Placeholder count
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                       <button onClick={() => handleEdit(cat)} className="text-slate-400 hover:text-indigo-400 transition-colors">Edit</button>
                       <button onClick={() => setShowDeleteConfirm(true)} className="text-slate-500 hover:text-rose-400 transition-colors font-medium">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mock Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
            <h2 className="text-2xl font-bold">{selectedCategory ? 'Edit Category' : 'Create Category'}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Category Name</label>
                <input 
                  type="text" 
                  name='name'
                  onChange={(e) => setCategoryData((prev) => ({ ...prev, name: e.target.value }))}
                  value={categoryData.name}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  placeholder="e.g. Groceries"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Pick a Color</label>
                <div className="flex flex-wrap gap-2">
                   {['#10b981', '#6366f1', '#22d3ee', '#f43f5e', '#f59e0b', '#ec4899', '#8b5cf6'].map((preset) => (
                     <button 
                       key={preset}
                       name='color'
                       type='button'
                       onClick={() => setColor(preset)}
                       className={`w-8 h-8 rounded-full border-2 transition-all
                         ${
                           color === preset
                             ? "border-white scale-110"
                             : "border-transparent hover:border-white"
                         }`}
                       style={{ backgroundColor: preset }}
                     ></button>
                   ))}
                   
                   {/* Custom Color Picker */}
                   <input
                     type="color"
                     value={color}
                     onChange={(e) => setColor(e.target.value)}
                     className="w-8 h-8 rounded-full overflow-hidden cursor-pointer border-2 border-slate-700"
                   />
                </div>
              </div>

              {/* Selected Color Preview */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-slate-400">Selected:</span>
                <div
                  className="w-6 h-6 rounded-full border border-slate-700"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-slate-300">{color}</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
               <button onClick={() => setShowModal(false)} className="flex-1 px-6 py-3 text-slate-400 font-medium bg-slate-800/50 rounded-xl">Cancel</button>
               <button
                onClick={selectedCategory ? updateCategoryClickHandler : createCategoryClickHandler} 
                className="flex-1 bg-linear-to-r from-indigo-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/20">
                {selectedCategory ? 'Update' : 'Create'}
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
                <h3 className="text-xl font-bold">Delete Category?</h3>
                <p className="text-slate-400 mt-2 text-sm leading-relaxed">All transactions in this category will become uncategorized. This action is irreversible.</p>
              </div>
              <div className="flex gap-4 pt-2">
                 <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 px-6 py-2 text-slate-300 font-medium">Wait, Keep it</button>
                 <button className="flex-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold py-2 px-6 rounded-lg">Yes, Delete</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
