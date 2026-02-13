import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
            Personal Finance Analyzer
          </h1>

          <span className="text-sm text-slate-500">
            Analytics Dashboard
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-xl font-medium text-slate-700">
          Welcome 👋
        </h2>
      </main>
    </div>
  )
}

export default App
