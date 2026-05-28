import { useJobsContext } from '../context/JobsContext'

export function useJobs() {
  const { jobs, dispatch } = useJobsContext()

  return {
    jobs,
    addJob:    fields => dispatch({ type: 'ADD_JOB',    payload: fields }),
    updateJob: (id, changes) => dispatch({ type: 'UPDATE_JOB', payload: { id, ...changes } }),
    deleteJob: id => dispatch({ type: 'DELETE_JOB', payload: id }),
    moveJob:   (id, newStatus) => dispatch({ type: 'MOVE_JOB', payload: { id, newStatus } }),
  }
}
