import { BADGE_CLASSES, STATUS_MAP } from '../../utils/constants'

export function Badge({ status }) {
  const s = STATUS_MAP[status]
  if (!s) return null
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${BADGE_CLASSES[s.color]}`}>
      {s.label}
    </span>
  )
}
