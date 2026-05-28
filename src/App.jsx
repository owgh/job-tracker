import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { JobsProvider } from './context/JobsContext'
import { Dashboard } from './pages/Dashboard'
import { ListView } from './components/list/ListView'

export default function App() {
  return (
    <BrowserRouter>
      <JobsProvider>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center gap-8 sticky top-0 z-10">
            <span className="font-bold text-indigo-600 text-lg tracking-tight">JobTracker</span>
            <div className="flex items-center gap-6">
              <NavLink to="/" end className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`
              }>
                Board
              </NavLink>
              <NavLink to="/list" className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`
              }>
                List
              </NavLink>
            </div>
            <div className="ml-auto">
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded border border-gray-200 text-xs text-gray-400 font-mono">
                N
              </kbd>
              <span className="hidden sm:inline text-xs text-gray-400 ml-1">new job</span>
            </div>
          </nav>
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/list" element={<ListView />} />
            </Routes>
          </main>
        </div>
        <KeyboardShortcuts />
      </JobsProvider>
    </BrowserRouter>
  )
}

function KeyboardShortcuts() {
  useEffect(() => {
    function handler(e) {
      const tag = e.target.tagName
      if (e.key === 'n' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) && !e.ctrlKey && !e.metaKey) {
        window.dispatchEvent(new CustomEvent('job-tracker:open-add'))
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
  return null
}
