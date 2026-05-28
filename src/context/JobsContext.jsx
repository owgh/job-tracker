import { createContext, useContext, useReducer, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { SEED_JOBS } from '../utils/seed'

const STORAGE_KEY = 'job-tracker-jobs'

function loadJobs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : SEED_JOBS
  } catch {
    return SEED_JOBS
  }
}

export function reducer(state, action) {
  switch (action.type) {
    case 'ADD_JOB': {
      const now = new Date().toISOString()
      return [...state, { ...action.payload, id: uuidv4(), createdAt: now, updatedAt: now }]
    }
    case 'UPDATE_JOB':
      return state.map(j =>
        j.id === action.payload.id
          ? { ...j, ...action.payload, updatedAt: new Date().toISOString() }
          : j
      )
    case 'DELETE_JOB':
      return state.filter(j => j.id !== action.payload)
    case 'MOVE_JOB':
      return state.map(j =>
        j.id === action.payload.id
          ? { ...j, status: action.payload.newStatus, updatedAt: new Date().toISOString() }
          : j
      )
    default:
      return state
  }
}

const JobsContext = createContext(null)

export function JobsProvider({ children }) {
  const [jobs, dispatch] = useReducer(reducer, null, loadJobs)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
  }, [jobs])

  return <JobsContext.Provider value={{ jobs, dispatch }}>{children}</JobsContext.Provider>
}

export function useJobsContext() {
  const ctx = useContext(JobsContext)
  if (!ctx) throw new Error('useJobsContext must be inside JobsProvider')
  return ctx
}
