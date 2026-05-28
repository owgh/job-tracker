import { useState, useMemo } from 'react'
import { FilterBar } from './FilterBar'
import { JobTable } from './JobTable'
import { useJobs } from '../../hooks/useJobs'

export function ListView() {
  const { jobs } = useJobs()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = useMemo(() => jobs.filter(job => {
    const q = search.toLowerCase()
    return (
      (!q || job.company.toLowerCase().includes(q) || job.role.toLowerCase().includes(q)) &&
      (!statusFilter || job.status === statusFilter)
    )
  }), [jobs, search, statusFilter])

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Applications</h1>
          <p className="text-sm text-gray-400 mt-1">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <FilterBar search={search} onSearch={setSearch} statusFilter={statusFilter} onStatusFilter={setStatusFilter} />
      <JobTable jobs={filtered} />
    </div>
  )
}
