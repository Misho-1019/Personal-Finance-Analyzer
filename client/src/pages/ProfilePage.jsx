import React, { useState } from 'react';

const ProfilePage = () => {
  const [showToast, setShowToast] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currency, setCurrency] = useState('EUR');

  const mockUser = {
    id: "u_9283741",
    email: "misho@finance.com",
    firstName: "Misho",
    lastName: "Finance",
    createdAt: "2023-11-12T09:00:00.000Z"
  };

  const handleSave = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-slate-400 mt-1">Manage your account details and security settings</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
             Signed in as Admin
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Account & Security */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Account Overview */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
               <div className="flex items-start gap-6 relative">
                  <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-indigo-500 via-violet-500 to-cyan-500 p-0.5 shadow-lg">
                     <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-2xl font-black text-slate-100">
                        MF
                     </div>
                  </div>
                  <div className="space-y-1 flex-1">
                     <h2 className="text-xl font-bold">{mockUser.firstName} {mockUser.lastName}</h2>
                     <p className="text-slate-400 text-sm font-medium">{mockUser.email}</p>
                     <div className="pt-2 flex flex-wrap gap-4 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                        <span className="flex items-center gap-1.5">
                           ID: <span className="text-slate-300 font-mono">{mockUser.id}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                           Member Since: <span className="text-slate-300">{new Date(mockUser.createdAt).toLocaleDateString()}</span>
                        </span>
                     </div>
                  </div>
                  <button className="text-xs font-bold bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all border border-slate-700/50">
                     Edit Details
                  </button>
               </div>
            </section>

            {/* Personal Details Form */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl space-y-8">
               <h3 className="text-lg font-bold">Personal Preferences</h3>
               <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Display Name</label>
                     <input 
                        type="text" 
                        disabled 
                        placeholder="Coming soon..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-600 cursor-not-allowed opacity-60"
                     />
                     <p className="text-[10px] text-slate-600 italic px-1">This feature is currently under development.</p>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Preferred Currency</label>
                     <select 
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none transition-all cursor-pointer"
                     >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="BGN">BGN (лв)</option>
                        <option value="GBP">GBP (£)</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Timezone</label>
                     <input 
                        type="text" 
                        readOnly 
                        value="UTC (Greenwich Mean Time)"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-400 font-medium"
                     />
                  </div>
                  <div className="md:col-span-2 pt-4 flex justify-end">
                     <button type="submit" className="bg-linear-to-r from-teal-400 to-indigo-500 hover:from-teal-500 hover:to-indigo-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-teal-500/10 active:scale-[0.98] transition-all cursor-pointer">
                        Save Preferences
                     </button>
                  </div>
               </form>
            </section>

            {/* Security Section */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl space-y-8">
               <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-bold">Password & Security</h3>
               </div>
               
               <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">New Password</label>
                        <input type="password" placeholder="Min. 8 chars" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Confirm Password</label>
                        <input type="password" placeholder="Repeat new" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                     </div>
                  </div>
                  <button type="button" className="text-sm font-bold bg-slate-800 hover:bg-slate-700 px-6 py-2.5 rounded-xl border border-slate-700 transition-all">
                     Update Password
                  </button>
               </form>

               <div className="space-y-4 pt-4">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Active Sessions</h4>
                  <div className="space-y-3">
                     {[
                        { device: "MacBook Pro M1", location: "Sofia, BG", time: "Active Now", current: true },
                        { device: "iPhone 15", location: "Sofia, BG", time: "2 hours ago", current: false }
                     ].map((session, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800/50 rounded-2xl">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                                 {session.device.includes('Mac') ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                 ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                 )}
                              </div>
                              <div>
                                 <p className="text-sm font-bold flex items-center gap-2">
                                    {session.device}
                                    {session.current && <span className="text-[8px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded uppercase">Current</span>}
                                 </p>
                                 <p className="text-[10px] text-slate-500 font-medium">{session.location} • {session.time}</p>
                              </div>
                           </div>
                           <button className="text-[10px] font-bold text-slate-500 hover:text-rose-400 transition-colors">Revoke</button>
                        </div>
                     ))}
                  </div>
                  <button className="w-full py-3 text-xs font-bold text-rose-400 hover:bg-rose-500/5 rounded-xl border border-rose-500/10 transition-all mt-2">
                     Revoke All Other Sessions
                  </button>
               </div>
            </section>
          </div>

          {/* Right Column: Actions & Danger */}
          <div className="space-y-8">
            
            {/* Data & Export */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
               <h3 className="text-lg font-bold">Data & Insights</h3>
               <p className="text-xs text-slate-500 leading-relaxed font-medium">Export your financial data in various formats for offline analysis or tax reporting.</p>
               <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 transition-all group">
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-sm font-bold">Export Transactions</span>
                     </div>
                     <span className="text-[10px] text-slate-600 group-hover:text-slate-400">CSV</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 transition-all group">
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        <span className="text-sm font-bold">Download Reports</span>
                     </div>
                     <span className="text-[10px] text-slate-600 group-hover:text-slate-400">PDF</span>
                  </button>
               </div>
               <p className="text-[9px] text-slate-600 font-bold uppercase tracking-wider text-center pt-2">Generated securely on server</p>
            </section>

            {/* Danger Zone */}
            <section className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-8 shadow-xl space-y-6">
               <div className="flex items-center gap-2 text-rose-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <h3 className="text-lg font-bold text-rose-500">Danger Zone</h3>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed font-medium">Deleting your account is irreversible. All your transactions, categories, and settings will be permanently erased.</p>
               
               <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                     <div className="relative mt-0.5">
                        <input 
                           type="checkbox" 
                           checked={confirmDelete}
                           onChange={(e) => setConfirmDelete(e.target.checked)}
                           className="sr-only" 
                        />
                        <div className={`w-5 h-5 rounded border-2 transition-all ${confirmDelete ? 'bg-rose-500 border-rose-500' : 'bg-slate-900 border-slate-800 group-hover:border-rose-500/50'}`}>
                           {confirmDelete && <svg className="w-4 h-4 text-white mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                     </div>
                     <span className="text-[10px] font-bold text-slate-500 select-none">I understand that this action cannot be undone.</span>
                  </label>
                  
                  <button 
                     disabled={!confirmDelete}
                     onClick={() => setIsDeleting(true)}
                     className={`w-full py-4 rounded-xl text-white font-bold transition-all shadow-lg ${confirmDelete ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/20 active:scale-[0.98] cursor-pointer' : 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'}`}
                  >
                     Delete My Account Permanently
                  </button>
               </div>
            </section>
          </div>
        </div>

        {/* Mock Saved Toast */}
        {showToast && (
          <div className="fixed bottom-10 right-10 bg-linear-to-r from-teal-500 to-indigo-600 text-white font-black py-4 px-8 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
             <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
             Changes Saved Successfully!
          </div>
        )}

        {/* Mock Deletion Overlay */}
        {isDeleting && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center z-50 p-6">
             <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center space-y-6 shadow-2xl animate-pulse">
                <div className="w-20 h-20 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </div>
                <h3 className="text-2xl font-bold">Processing Account Deletion...</h3>
                <p className="text-slate-500 text-sm leading-relaxed">This mock action simulated a permanent deletion of your profile and data.</p>
                <button onClick={() => setIsDeleting(false)} className="text-xs font-bold text-slate-400 hover:text-white transition-all underline decoration-slate-800 decoration-2 underline-offset-8">Return to Profile (Mock-only)</button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProfilePage;
