import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ConfirmDialog } from '../ui/ConfirmDialog'
import { JobModal } from '../ui/JobModal'
import { useJobs } from '../../hooks/useJobs'
import { daysAgo, isOverdue } from '../../utils/helpers'

export function JobCard({ job }) {
  const { updateJob, deleteJob } = useJobs()
  const [showEdit, setShowEdit] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: job.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => setShowEdit(true)}
        className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-indigo-200 transition-all group"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-900 text-sm truncate">{job.company}</p>
            <p className="text-gray-500 text-xs truncate mt-0.5">{job.role}</p>
            {job.location && <p className="text-gray-400 text-xs truncate mt-0.5">{job.location}</p>}
          </div>
          <button
            onClick={e => { e.stopPropagation(); setShowConfirm(true) }}
            className="shrink-0 w-5 h-5 flex items-center justify-center rounded text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 md:opacity-100"
            aria-label="Delete application"
          >
            ✕
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-xs text-gray-400">{daysAgo(job.appliedDate)}</span>
          {job.followUpDate && isOverdue(job.followUpDate) && (
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Follow up</span>
          )}
        </div>
        {job.salary && (
          <p className="mt-1 text-xs text-gray-400">{job.salary}</p>
        )}
      </div>

      <JobModal
        isOpen={showEdit}
        job={job}
        onSave={fields => { updateJob(job.id, fields); setShowEdit(false) }}
        onClose={() => setShowEdit(false)}
      />
      <ConfirmDialog
        isOpen={showConfirm}
        title="Delete application?"
        message={`Remove ${job.company} – ${job.role}? This can't be undone.`}
        onConfirm={() => { deleteJob(job.id); setShowConfirm(false) }}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  )
}
