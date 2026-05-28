import { STATUSES } from '../../utils/constants'

export function FilterBar({ search, onSearch, statusFilter, onStatusFilter }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        type="text"
        value={search}
        onChange={e => onSearch(e.target.value)}
        placeholder="Search company or role..."
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <select
        value={statusFilter}
        onChange={e => onStatusFilter(e.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
      >
        <option value="">All Statuses</option>
        {STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
      </select>
    </div>
  )
}
