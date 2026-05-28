import { describe, it, expect } from 'vitest'
import { reducer } from './JobsContext'

const baseJob = {
  id: 'test-1',
  company: 'Acme',
  role: 'Frontend',
  location: 'Remote',
  url: '',
  status: 'applied',
  appliedDate: '2026-05-01',
  followUpDate: '',
  salary: '',
  notes: '',
  createdAt: '2026-05-01T00:00:00.000Z',
  updatedAt: '2026-05-01T00:00:00.000Z',
}

describe('reducer', () => {
  it('ADD_JOB appends a job with auto-generated id and timestamps', () => {
    const result = reducer([], { type: 'ADD_JOB', payload: { company: 'Acme', role: 'FE', location: '', url: '', status: 'applied', appliedDate: '2026-05-28', followUpDate: '', salary: '', notes: '' } })
    expect(result).toHaveLength(1)
    expect(result[0].company).toBe('Acme')
    expect(result[0].id).toBeTruthy()
    expect(result[0].createdAt).toBeTruthy()
  })

  it('UPDATE_JOB changes fields and updates updatedAt', () => {
    const state = [baseJob]
    const result = reducer(state, { type: 'UPDATE_JOB', payload: { id: 'test-1', role: 'Senior FE' } })
    expect(result[0].role).toBe('Senior FE')
    expect(result[0].updatedAt).not.toBe(baseJob.updatedAt)
  })

  it('DELETE_JOB removes job by id', () => {
    const result = reducer([baseJob], { type: 'DELETE_JOB', payload: 'test-1' })
    expect(result).toHaveLength(0)
  })

  it('MOVE_JOB changes status and updates updatedAt', () => {
    const result = reducer([baseJob], { type: 'MOVE_JOB', payload: { id: 'test-1', newStatus: 'interview' } })
    expect(result[0].status).toBe('interview')
    expect(result[0].updatedAt).not.toBe(baseJob.updatedAt)
  })

  it('unknown action returns state unchanged', () => {
    const state = [baseJob]
    expect(reducer(state, { type: 'NOOP' })).toBe(state)
  })
})
