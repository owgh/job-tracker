import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { JobCard } from './JobCard'
import { BADGE_CLASSES } from '../../utils/constants'

export function KanbanColumn({ status, jobs }) {
  const { setNodeRef, isOver } = useDroppable({ id: status.id })

  return (
    <div className="flex flex-col min-w-[260px] w-[260px] shrink-0">
      <div className="flex items-center justify-between mb-3 px-1">
        <span className={`text-sm font-semibold px-2.5 py-1 rounded-full ${BADGE_CLASSES[status.color]}`}>
          {status.label}
        </span>
        <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5 font-medium">
          {jobs.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={`flex-1 rounded-xl p-2 min-h-[200px] transition-colors ${isOver ? 'bg-indigo-50 ring-2 ring-indigo-200' : 'bg-gray-50'}`}
      >
        <SortableContext items={jobs.map(j => j.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {jobs.map(job => <JobCard key={job.id} job={job} />)}
          </div>
        </SortableContext>
        {jobs.length === 0 && (
          <p className="text-center text-xs text-gray-400 pt-8 select-none">Drop here</p>
        )}
      </div>
    </div>
  )
}
