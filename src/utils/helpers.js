import { formatDistanceToNow, format, isPast, parseISO } from 'date-fns'

export function daysAgo(isoDate) {
  if (!isoDate) return '—'
  return formatDistanceToNow(parseISO(isoDate), { addSuffix: true })
}

export function formatDate(isoDate) {
  if (!isoDate) return '—'
  return format(parseISO(isoDate), 'MMM d, yyyy')
}

export function isOverdue(isoDate) {
  if (!isoDate) return false
  return isPast(parseISO(isoDate))
}

export function calcStats(jobs) {
  const total = jobs.length
  const active = jobs.filter(j => j.status !== 'rejected').length
  const responses = jobs.filter(j => ['phone_screen', 'interview', 'offer'].includes(j.status)).length
  const interviews = jobs.filter(j => j.status === 'interview').length
  const offers = jobs.filter(j => j.status === 'offer').length
  const responseRate = total > 0 ? Math.round((responses / total) * 100) : 0
  return { total, active, responseRate, interviews, offers }
}
