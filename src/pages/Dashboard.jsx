import { useEffect, useState } from 'react'
import { StatsBar } from '../components/stats/StatsBar'
import { KanbanBoard } from '../components/kanban/KanbanBoard'
import { JobModal } from '../components/ui/JobModal'
import { Button } from '../components/ui/Button'
import { useJobs } from '../hooks/useJobs'

export function Dashboard() {
  const { addJob } = useJobs()
  const [showAdd, setShowAdd] = useState(false)

  useEffect(() => {
    function handler() { setShowAdd(true) }
    window.addEventListener('job-tracker:open-add', handler)
    return () => window.removeEventListener('job-tracker:open-add', handler)
  }, [])

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Board</h1>
          <p className="text-sm text-gray-400 mt-1">Drag cards between columns to update status</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>+ Add Job</Button>
      </div>
      <StatsBar />
      <KanbanBoard />
      <JobModal
        isOpen={showAdd}
        onSave={fields => { addJob(fields); setShowAdd(false) }}
        onClose={() => setShowAdd(false)}
      />
    </div>
  )
}
