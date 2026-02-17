import { useState } from 'react';
import { Link, Outlet } from "react-router";

const AppLayout = ({ title = "Dashboard" }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: 'Analytics', path: '/dashboard', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )},
    { name: 'Transactions', path: '/transactions/list', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )},
    { name: 'Categories', path: '/categories', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    )},
    { name: 'Category Keywords', path: '/category-keywords', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    )},
    { name: 'Profile', path: '/profile', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
    { name: 'About', path: '/about', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-slate-950 border-r border-slate-800 transition-all duration-300 z-50 flex flex-col ${
          isCollapsed ? 'w-18' : 'w-60'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 mb-4 flex items-center justify-between overflow-hidden">
          {!isCollapsed && (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="w-8 h-8 bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.3)] shrink-0"></div>
              <span className="text-lg font-bold tracking-tight whitespace-nowrap">Finance<span className="text-indigo-400">Analyzer</span></span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.3)] mx-auto shrink-0"></div>
          )}
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-3 space-y-2">
           {navItems.map((item) => (
             <div key={item.name} className="relative group">
               <Link 
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all relative ${
                    item.name === title 
                    ? 'bg-linear-to-r from-indigo-500/20 via-violet-500/20 to-cyan-500/20 text-indigo-100 shadow-[inset_0_0_12px_rgba(99,102,241,0.1)] border border-indigo-500/20' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                  }`}
               >
                 <div className={`${item.name === title ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'} transition-colors shrink-0`}>
                   {item.icon}
                 </div>
                 {!isCollapsed && (
                   <span className="text-sm font-semibold whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                     {item.name}
                   </span>
                 )}
                 {item.name === title && !isCollapsed && (
                    <div className="absolute left-0 w-1 h-5 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                 )}
               </Link>
               
               {/* Tooltip for collapsed mode */}
               {isCollapsed && (
                 <div className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-800 text-slate-100 text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-100 border border-slate-700 shadow-2xl">
                    {item.name}
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-800 border-l border-b border-slate-700 rotate-45"></div>
                 </div>
               )}
             </div>
           ))}
        </nav>

        {/* Sidebar Footer / Toggle */}
        <div className="p-4 border-t border-slate-800 space-y-4">
           {!isCollapsed && (
             <Link to='/logout' className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-rose-400 hover:bg-rose-500/5 transition-all text-sm font-semibold">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
               </svg>
               Logout
             </Link>
           )}
           {isCollapsed && (
             <Link to='/logout' className="w-10 h-10 mx-auto flex items-center justify-center rounded-xl text-rose-500 hover:bg-rose-500/5 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
             </Link>
           )}
           
           <button 
             onClick={() => setIsCollapsed(!isCollapsed)}
             className="w-full h-8 flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-slate-900 rounded-lg transition-all"
           >
             <svg 
               className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} 
               fill="none" viewBox="0 0 24 24" stroke="currentColor"
             >
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
             </svg>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main 
        className={`flex-1 transition-all duration-300 flex flex-col min-h-screen ${
          isCollapsed ? 'pl-18' : 'pl-60'
        }`}
      >
        {/* Header */}
        <header className="h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
           <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
             {title}
           </h2>
           <div className="flex items-center gap-6">
              <button className="text-slate-500 hover:text-indigo-400 transition-colors">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
              </button>
              <div className="flex items-center gap-3">
                 <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-100 uppercase tracking-wider leading-none mb-1">Misho Admin</p>
                    <p className="text-[10px] text-emerald-400/80 font-bold leading-none">Pro Plan</p>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-cyan-500 p-0.5">
                    <div className="w-full h-full rounded-[10px] bg-slate-900 flex items-center justify-center text-xs font-black text-slate-200 uppercase">
                       MA
                    </div>
                 </div>
              </div>
           </div>
        </header>

        {/* Content Container */}
        <div className="bg-slate-900 rounded-tl-3xl border-t border-l border-slate-800 flex-1 relative">
           <div className="absolute inset-0 bg-linear-to-b from-slate-900 via-transparent to-transparent pointer-events-none rounded-tl-3xl"></div>
           <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
             {/* {children} */}
             <Outlet />
           </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
