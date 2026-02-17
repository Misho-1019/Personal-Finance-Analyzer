import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Navigation Placeholder */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.3)]"></div>
          <span className="text-xl font-bold tracking-tight">Finance<span className="text-indigo-400">Analyzer</span></span>
        </div>
        <Link to='/login' className="text-sm font-semibold bg-slate-900 border border-slate-800 px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all cursor-pointer">
          Log In
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            Take Control of Your <br />
            <span className="bg-linear-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">Finances</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Smart tracking, automated categorization, and powerful analytics. 
            The modern way to manage your personal wealth with precision and clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link to='/register' className="w-full sm:w-auto bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500 hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-[0.98] transition-all cursor-pointer">
              Get Started Free
            </Link>
            <Link to='/login' className="w-full sm:w-auto bg-slate-900 border border-slate-800 text-slate-300 font-bold py-4 px-10 rounded-2xl hover:bg-slate-800 transition-all cursor-pointer">
              Log In
            </Link>
          </div>
        </div>

        {/* Hero Preview Card */}
        <div className="flex-1 w-full max-w-lg">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-all duration-700"></div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                   <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Total Balance</p>
                   <h3 className="text-3xl font-bold">$12,450.80</h3>
                </div>
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Income</p>
                  <p className="text-lg font-bold text-emerald-400">+$5,200</p>
                </div>
                <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Expenses</p>
                  <p className="text-lg font-bold text-rose-400">-$2,140</p>
                </div>
              </div>

              {/* Mini Chart Mock */}
              <div className="pt-4 h-24 flex items-end gap-1.5">
                {[40, 60, 35, 80, 50, 70, 90, 45, 65, 55, 75, 85].map((h, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 rounded-t-sm transition-all duration-500 ${i === 6 ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-slate-800 group-hover:bg-slate-700'}`} 
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-900/30 py-24 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
             <h2 className="text-3xl md:text-4xl font-bold">Built for Modern Finance</h2>
             <p className="text-slate-400 max-w-xl mx-auto">Everything you need to visualize and manage your cash flow in one high-performance dashboard.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all group shadow-sm">
               <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
               </div>
               <h3 className="text-xl font-bold mb-3">Track Transactions</h3>
               <p className="text-slate-400 leading-relaxed text-sm">
                 Effortlessly log every movement. Use advanced filters by date, type, or category to see exactly where your money goes.
               </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-violet-500/50 hover:bg-slate-800/50 transition-all group shadow-sm">
               <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
               </div>
               <h3 className="text-xl font-bold mb-3">Smart Auto-Categorization</h3>
               <p className="text-slate-400 leading-relaxed text-sm">
                 Save hours with keyword-based rules. Define your own mapping and watch your dashboard organize itself automatically.
               </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all group shadow-sm">
               <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
               </div>
               <h3 className="text-xl font-bold mb-3">Powerful Analytics</h3>
               <p className="text-slate-400 leading-relaxed text-sm">
                 Deep dive into monthly summaries and category distributions. Understand your spending share with rich visual data.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-1 md:p-4 shadow-2xl relative overflow-hidden">
          
          {/* Gradient Glow Background Accent */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"></div>
      
          {/* CTA Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/30 to-slate-950 p-12 flex items-end justify-center">
            <div className="text-center z-10">
              <p className="text-slate-300 text-sm mb-5 max-w-xl mx-auto">
                Preview a sample dashboard: automated categorization, real-time summaries,
                and clear visual insights.
              </p>
      
              <Link
                to="/register"
                className="bg-linear-to-r from-indigo-500 via-violet-500 to-cyan-500 
                           hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600
                           text-white font-bold py-3 px-8 rounded-xl shadow-xl shadow-indigo-500/20 
                           hover:scale-105 transition-all inline-block"
              >
                See All Features
              </Link>
            </div>
          </div>
      
          {/* Mock Dashboard Preview */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 h-125 overflow-hidden opacity-90 select-none relative">
            
            {/* Sample badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase
                               bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                Sample dashboard
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              </span>
            </div>
      
            <div className="p-8 space-y-8">
              {/* Top Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Monthly Income", value: "+$5,200", color: "text-emerald-400", glow: "shadow-emerald-500/20" },
                  { label: "Monthly Expenses", value: "-$2,140", color: "text-rose-400", glow: "shadow-rose-500/20" },
                  { label: "Net", value: "+$3,060", color: "text-indigo-400", glow: "shadow-indigo-500/20" },
                  { label: "Top Category", value: "Food • 28%", color: "text-cyan-400", glow: "shadow-cyan-500/20" },
                ].map((c) => (
                  <div
                    key={c.label}
                    className={`bg-slate-900 rounded-2xl border border-slate-800/50 p-5 
                                hover:border-indigo-500/40 transition-all shadow-lg ${c.glow}`}
                  >
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {c.label}
                    </p>
                    <p className={`mt-2 text-lg font-extrabold ${c.color}`}>
                      {c.value}
                    </p>
                    <p className="mt-2 text-xs text-slate-600">
                      Example • last 30 days
                    </p>
                  </div>
                ))}
              </div>
      
              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Monthly Summary Chart */}
                <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800/50 p-5 hover:border-violet-500/40 transition-all">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">
                    Monthly Summary
                  </p>
                  <div className="h-48 flex items-end gap-2">
                    {[35, 55, 40, 70, 50, 65, 85, 45, 60, 52, 68, 78].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-sm transition-all duration-500 ${
                          i === 6
                            ? "bg-linear-to-t from-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                            : "bg-slate-800"
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
      
                {/* Category Breakdown */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800/50 p-5 hover:border-cyan-500/40 transition-all">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">
                    Category Breakdown
                  </p>
                  <div className="space-y-4">
                    {[
                      { name: "Food", w: "72%", color: "bg-indigo-500" },
                      { name: "Transport", w: "55%", color: "bg-violet-500" },
                      { name: "Bills", w: "42%", color: "bg-cyan-500" },
                      { name: "Shopping", w: "34%", color: "bg-slate-700" },
                    ].map((c) => (
                      <div key={c.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">{c.name}</span>
                          <span className="text-slate-600">{c.w}</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className={`h-full ${c.color}`} style={{ width: c.w }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
      
              </div>
      
              {/* Disclaimer */}
              <p className="text-center text-xs text-slate-600">
                Example data shown. Create an account to see your real analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
           <div>
              <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                <div className="w-6 h-6 bg-linear-to-r from-indigo-500 to-cyan-500 rounded text-center"></div>
                <span className="text-lg font-bold tracking-tight">FinanceAnalyzer</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                A modern personal finance dashboard for professionals who care about data.
              </p>
           </div>

           <div className="flex flex-col gap-3 text-slate-400 text-sm font-medium">
              <button className="hover:text-slate-100 transition-colors cursor-pointer">Features</button>
              <button className="hover:text-slate-100 transition-colors cursor-pointer">Security</button>
              <button className="hover:text-slate-100 transition-colors cursor-pointer">About Us</button>
              <button className="hover:text-slate-100 transition-colors cursor-pointer">Contact</button>
           </div>

           <div className="space-y-4">
              <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50 inline-block md:block">
                 <p className="text-xs text-slate-500 font-medium italic">
                   "Built as a full-stack portfolio project"
                 </p>
              </div>
              <p className="text-sm text-slate-400 font-semibold">
                Designed & Developed by <span className="text-slate-200">Misho Finance</span>
              </p>
           </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800/50 text-center text-[10px] text-slate-600 uppercase tracking-widest font-bold">
           © 2026 FinanceAnalyzer Dashboard — Premium Experience
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
