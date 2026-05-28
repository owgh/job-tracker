import { useEffect } from 'react'
import { Button } from './Button'

export function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onCancel()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onCancel])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <h3 id="confirm-dialog-title" className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{message}</p>
        <div className="mt-6 flex gap-3 justify-end">
          <Button autoFocus variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </div>
  )
}
