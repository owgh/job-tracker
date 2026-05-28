import { useState } from 'react'
import { Badge } from '../ui/Badge'
import { ConfirmDialog } from '../ui/ConfirmDialog'
import { JobModal } from '../ui/JobModal'
import { useJobs } from '../../hooks/useJobs'
import { formatDate } from '../../utils/helpers'

const COLS = [
  { key: 'company',     label: 'Company'  },
  { key: 'role',        label: 'Role'     },
  { key: 'appliedDate', label: 'Applied'  },
  { key: 'status',      label: 'Status'   },
]

export function JobTable({ jobs }) {
  const { updateJob, deleteJob } = useJobs()
  const [sort, setSort] = useState({ key: 'appliedDate', dir: 'desc' })
  const [editJob, setEditJob] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  function toggleSort(key) {
    setSort(s => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }))
  }

  const sorted = [...jobs].sort((a, b) => {
    const cmp = String(a[sort.key] ?? '').localeCompare(String(b[sort.key] ?? ''))
    return sort.dir === 'asc' ? cmp : -cmp
  })

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              {COLS.map(col => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="px-4 py-3 text-left cursor-pointer select-none hover:bg-gray-100 whitespace-nowrap"
                >
                  {col.label}{' '}
                  <span className="text-gray-300">
                    {sort.key === col.key ? (sort.dir === 'asc' ? '↑' : '↓') : '↕'}
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 w-8" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                  No applications match your filters.
                </td>
              </tr>
            )}
            {sorted.map(job => (
              <tr
                key={job.id}
                onClick={() => setEditJob(job)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-900">{job.company}</td>
                <td className="px-4 py-3 text-gray-600">{job.role}</td>
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{formatDate(job.appliedDate)}</td>
                <td className="px-4 py-3"><Badge status={job.status} /></td>
                <td className="px-4 py-3 text-gray-400">{job.location}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={e => { e.stopPropagation(); setDeleteId(job.id) }}
                    className="text-gray-300 hover:text-red-500 transition-colors text-lg leading-none"
                    aria-label="Delete"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <JobModal
        isOpen={!!editJob}
        job={editJob}
        onSave={fields => { updateJob(editJob.id, fields); setEditJob(null) }}
        onClose={() => setEditJob(null)}
      />
      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete application?"
        message="This action cannot be undone."
        onConfirm={() => { deleteJob(deleteId); setDeleteId(null) }}
        onCancel={() => setDeleteId(null)}
      />
    </>
  )
}
