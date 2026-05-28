import { useJobs } from '../../hooks/useJobs'
import { calcStats } from '../../utils/helpers'

export function StatsBar() {
  const { jobs } = useJobs()
  const { total, active, responseRate, interviews, offers } = calcStats(jobs)

  const stats = [
    { label: 'Total Applied',   value: total,             color: 'text-gray-900' },
    { label: 'Active',          value: active,            color: 'text-indigo-600' },
    { label: 'Response Rate',   value: `${responseRate}%`, color: 'text-blue-600' },
    { label: 'Interviews',      value: interviews,        color: 'text-purple-600' },
    { label: 'Offers',          value: offers,            color: 'text-green-600' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
      {stats.map(s => (
        <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
          <div className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-wide">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
