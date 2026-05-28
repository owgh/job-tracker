export const STATUSES = [
  { id: 'applied',      label: 'Applied',      color: 'blue'   },
  { id: 'phone_screen', label: 'Phone Screen',  color: 'amber'  },
  { id: 'interview',    label: 'Interview',     color: 'purple' },
  { id: 'offer',        label: 'Offer',         color: 'green'  },
  { id: 'rejected',     label: 'Rejected',      color: 'red'    },
]

export const STATUS_MAP = Object.fromEntries(STATUSES.map(s => [s.id, s]))

export const BADGE_CLASSES = {
  blue:   'bg-blue-100 text-blue-700',
  amber:  'bg-amber-100 text-amber-700',
  purple: 'bg-purple-100 text-purple-700',
  green:  'bg-green-100 text-green-700',
  red:    'bg-red-100 text-red-700',
}
