import { describe, it, expect } from 'vitest'
import { calcStats, isOverdue } from './helpers'

describe('calcStats', () => {
  it('returns zeros for empty array', () => {
    expect(calcStats([])).toEqual({ total: 0, active: 0, responseRate: 0, interviews: 0, offers: 0 })
  })

  it('calculates response rate as percentage of total that responded', () => {
    const jobs = [
      { status: 'applied' },
      { status: 'applied' },
      { status: 'interview' },
      { status: 'rejected' },
    ]
    const stats = calcStats(jobs)
    expect(stats.total).toBe(4)
    expect(stats.responseRate).toBe(25)
    expect(stats.active).toBe(3)
    expect(stats.interviews).toBe(1)
    expect(stats.offers).toBe(0)
  })
})

describe('isOverdue', () => {
  it('returns false for null', () => {
    expect(isOverdue(null)).toBe(false)
  })

  it('returns true for a past date', () => {
    expect(isOverdue('2020-01-01')).toBe(true)
  })

  it('returns false for a future date', () => {
    const future = new Date(Date.now() + 86400000).toISOString().slice(0, 10)
    expect(isOverdue(future)).toBe(false)
  })
})
