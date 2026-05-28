import { useState } from 'react'
import { DndContext, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core'
import { KanbanColumn } from './KanbanColumn'
import { useJobs } from '../../hooks/useJobs'
import { STATUSES } from '../../utils/constants'

export function KanbanBoard() {
  const { jobs, moveJob } = useJobs()
  const [activeJob, setActiveJob] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  function onDragStart({ active }) {
    setActiveJob(jobs.find(j => j.id === active.id) ?? null)
  }

  function onDragEnd({ active, over }) {
    setActiveJob(null)
    if (!over) return
    const job = jobs.find(j => j.id === active.id)
    if (!job) return

    // over.id may be a column id (when dropped on empty column) or a card id (when dropped on a card)
    let targetStatusId = over.id
    if (!STATUSES.find(s => s.id === over.id)) {
      // dropped onto a card — use that card's column as the target
      const overJob = jobs.find(j => j.id === over.id)
      if (!overJob) return
      targetStatusId = overJob.status
    }

    if (job.status !== targetStatusId) {
      moveJob(job.id, targetStatusId)
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STATUSES.map(status => (
          <KanbanColumn
            key={status.id}
            status={status}
            jobs={jobs.filter(j => j.status === status.id)}
          />
        ))}
      </div>
      <DragOverlay>
        {activeJob && (
          <div className="rotate-1 scale-105 bg-white rounded-lg border border-indigo-300 shadow-xl p-3 w-[244px]">
            <p className="font-semibold text-gray-900 text-sm truncate">{activeJob.company}</p>
            <p className="text-gray-500 text-xs truncate mt-0.5">{activeJob.role}</p>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
