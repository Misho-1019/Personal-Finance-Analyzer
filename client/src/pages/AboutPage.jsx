import React from 'react';
import { Link } from "react-router";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">
        
        {/* 1) Hero Section */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-widest text-indigo-400">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
             </span>
             Full-Stack Portfolio Project
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            About <span className="bg-linear-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">Personal Finance Analyzer</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed">
            Personal Finance Analyzer is a mission-driven platform designed to provide total clarity over your financial health. By combining smart transaction tracking with automated categorization and deep analytics, we empower you to understand your habits and optimize your future.
          </p>
        </section>

        {/* 2) Product Principles */}
        <section className="space-y-12">
          <h2 className="text-2xl font-bold flex items-center gap-3">
             <div className="w-8 h-px bg-slate-800"></div>
             Product Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-slate-700 transition-all group">
               <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
               </div>
               <h3 className="text-lg font-bold mb-3">Clarity</h3>
               <p className="text-slate-400 text-sm leading-relaxed">
                 Simple, high-contrast money views that eliminate noise and highlight what matters most.
               </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-slate-700 transition-all group">
               <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
               </div>
               <h3 className="text-lg font-bold mb-3">Automation</h3>
               <p className="text-slate-400 text-sm leading-relaxed">
                 Intelligent keyword-based rules that categorize your transactions so you don't have to.
               </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-slate-700 transition-all group">
               <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
               </div>
               <h3 className="text-lg font-bold mb-3">Insight</h3>
               <p className="text-slate-400 text-sm leading-relaxed">
                 Comprehensive monthly summaries and category breakdowns to uncover trends and patterns.
               </p>
            </div>
          </div>
        </section>

        {/* 3) What You Can Do */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -mr-32 -mt-32"></div>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Capabilities</h2>
              <p className="text-slate-400 leading-relaxed">
                The platform is architected to handle full-lifecycle transaction management with a focus on ease of use.
              </p>
              <ul className="space-y-4">
                {[
                  "Track every income and expense entry",
                  "Create and manage custom categories",
                  "Set automated rules via Category Keywords",
                  "Visualize spending shares with Donut charts",
                  "Filter history by dates and transaction types"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <svg className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Mock Preview Mini-UI */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
               <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Recent Rule</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
               </div>
               <div className="space-y-1">
                  <p className="text-xs text-slate-500">Keyword</p>
                  <p className="text-lg font-bold">"Amazon Prime"</p>
               </div>
               <div className="h-px bg-slate-800"></div>
               <div className="space-y-1">
                  <p className="text-xs text-slate-500">Target Category</p>
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.4)]"></div>
                     <span className="text-sm font-bold">Entertainment</span>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* 4) How It Works */}
        <section className="space-y-16">
          <div className="text-center space-y-4">
             <h2 className="text-3xl font-bold">How It Works</h2>
             <p className="text-slate-400 max-w-xl mx-auto">From data entry to financial wisdom in four simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0">
             {[
               { title: "Capture", desc: "Log your transactions as they happen.", icon: "01" },
               { title: "Organize", desc: "Assign categories or let auto-rules handle it.", icon: "02" },
               { title: "Analyze", desc: "Review charts to find spending leaks.", icon: "03" },
               { title: "Optimize", desc: "Adjust your rules and refine habits.", icon: "04" }
             ].map((step, i) => (
               <div key={i} className="relative group p-8 bg-slate-900 border border-slate-800 md:border-0 md:bg-transparent text-center space-y-4">
                  <div className="relative z-10 w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-xl font-black text-slate-600 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-xl">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-indigo-300 transition-colors uppercase tracking-tight">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                  {i < 3 && <div className="hidden md:block absolute top-14 left-[75%] w-1/2 h-px bg-linear-to-r from-slate-800 to-transparent z-0"></div>}
               </div>
             ))}
          </div>
        </section>

        {/* 5) Security & Privacy */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
             <h2 className="text-2xl font-bold flex items-center gap-3">
                <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Security by Design
             </h2>
             <p className="text-slate-400 leading-relaxed">
               Your financial data deserves enterprise-grade care. We implement modern security protocols to ensure your session and data remain private.
             </p>
             <div className="grid grid-cols-1 gap-4">
                {[
                  "Cookie-based authentication (HTTP-only)",
                  "Refresh tokens with rotation strategy",
                  "No plaintext sensitive data storage"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                     <span className="text-sm font-medium text-slate-300">{text}</span>
                  </div>
                ))}
             </div>
          </div>
          <div className="bg-linear-to-br from-indigo-500/10 via-slate-900 to-slate-950 p-12 rounded-3xl border border-slate-800 flex items-center justify-center text-center">
             <div className="space-y-4">
                 <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto text-indigo-400">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                 </div>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Trust Protocol</p>
                 <p className="text-sm text-slate-400">Deterministic security with zero-trust architecture at heart.</p>
             </div>
          </div>
        </section>

        {/* 6) About the Creator */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-12 shadow-2xl">
           <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-linear-to-br from-indigo-500 via-violet-500 to-cyan-500 p-1 shrink-0 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl font-black text-indigo-400 select-none">MF</div>
           </div>
           <div className="space-y-6 text-center md:text-left">
              <div>
                <h2 className="text-2xl font-bold">Misho Finance</h2>
                <p className="text-indigo-400 font-bold text-sm">Full-Stack Engineer & UX Designer</p>
              </div>
              <p className="text-slate-400 max-w-xl leading-relaxed text-sm">
                 Specializing in data-heavy applications and high-performance financial interfaces. This project demonstrates my focus on clean state management, modular architecture, and the intersection of technical engineering with pixel-perfect design.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                 <button className="text-xs bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all font-bold">GitHub</button>
                 <button className="text-xs bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all font-bold">LinkedIn</button>
              </div>
           </div>
        </section>

        {/* 7) Footer CTA */}
        <section className="text-center py-12">
            <div className="bg-linear-to-br from-indigo-500 to-violet-600 rounded-3xl p-12 space-y-8 shadow-2xl shadow-indigo-500/20">
               <div className="space-y-2">
                 <h2 className="text-4xl font-black text-white">Ready for Clarity?</h2>
                 <p className="text-indigo-100/70 font-medium">Join thousands of users organizing their financial destiny today.</p>
               </div>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Link to='/dashboard' className="w-full sm:w-auto bg-white text-indigo-600 font-black py-4 px-10 rounded-2xl shadow-xl hover:scale-105 transition-transform cursor-pointer">
                    Explore Dashboard
                  </Link>
                  <Link to='/transactions/create' className="w-full sm:w-auto bg-indigo-800/40 text-white font-black py-4 px-10 rounded-2xl hover:bg-indigo-800/60 transition-all border border-indigo-400/30 cursor-pointer backdrop-blur-sm">
                    Create Transaction
                  </Link>
               </div>
            </div>
            <p className="mt-12 text-[10px] text-slate-700 uppercase tracking-[0.2em] font-black">
               © 2026 FinanceAnalyzer — Built for Excellence
            </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
