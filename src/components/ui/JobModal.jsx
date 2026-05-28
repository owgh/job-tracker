import { useEffect, useRef, useState } from 'react'
import { Button } from './Button'
import { STATUSES } from '../../utils/constants'

const EMPTY = {
  company: '', role: '', location: '', url: '',
  status: 'applied',
  appliedDate: new Date().toISOString().slice(0, 10),
  followUpDate: '', salary: '', notes: '',
}

export function JobModal({ isOpen, job, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const firstRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setForm(job ? { ...EMPTY, ...job } : EMPTY)
      setErrors({})
      setTimeout(() => firstRef.current?.focus(), 50)
    }
  }, [isOpen, job])

  useEffect(() => {
    function handler(e) { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  function change(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  function submit(e) {
    e.preventDefault()
    const errs = {}
    if (!form.company.trim()) errs.company = 'Required'
    if (!form.role.trim()) errs.role = 'Required'
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {job ? 'Edit Application' : 'Add Application'}
          </h2>
          <form onSubmit={submit} className="space-y-4">
            <Field label="Company *" error={errors.company}>
              <input ref={firstRef} name="company" value={form.company} onChange={change}
                className={cls(errors.company)} placeholder="e.g. Stripe" />
            </Field>
            <Field label="Role *" error={errors.role}>
              <input name="role" value={form.role} onChange={change}
                className={cls(errors.role)} placeholder="e.g. Frontend Engineer" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Location">
                <input name="location" value={form.location} onChange={change} className={cls()} placeholder="Remote" />
              </Field>
              <Field label="Status">
                <select name="status" value={form.status} onChange={change} className={cls()}>
                  {STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Job URL">
              <input name="url" type="url" value={form.url} onChange={change} className={cls()} placeholder="https://..." />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Date Applied">
                <input name="appliedDate" type="date" value={form.appliedDate} onChange={change} className={cls()} />
              </Field>
              <Field label="Follow-up Date">
                <input name="followUpDate" type="date" value={form.followUpDate} onChange={change} className={cls()} />
              </Field>
            </div>
            <Field label="Salary Range">
              <input name="salary" value={form.salary} onChange={change} className={cls()} placeholder="e.g. 80k–100k" />
            </Field>
            <Field label="Notes">
              <textarea name="notes" value={form.notes} onChange={change} rows={3}
                className={cls()} placeholder="Recruiter name, referral, interview notes..." />
            </Field>
            <div className="flex gap-3 justify-end pt-2">
              <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
              <Button type="submit">{job ? 'Save Changes' : 'Add Job'}</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

function cls(error) {
  return `w-full rounded-lg border ${error ? 'border-red-400' : 'border-gray-300'} px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`
}
