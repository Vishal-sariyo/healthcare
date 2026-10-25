import { useState } from 'react'
import Button from '../components/ui/Button'

export default function Settings() {
  const [reminders, setReminders] = useState(true)
  const [queueAlerts, setQueueAlerts] = useState(true)

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="font-display text-2xl font-bold text-slate-900">Settings</h1>
      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-slate-900">Notifications</h2>
        <Toggle label="Appointment reminders" checked={reminders} onChange={setReminders} />
        <Toggle label="Queue approaching alerts" checked={queueAlerts} onChange={setQueueAlerts} />
      </section>
      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-slate-900">Privacy</h2>
        <p className="mt-2 text-sm text-slate-500">
          CarePath uses a secure login and keeps patient information protected in this demo. Review the Privacy Policy and Terms before sharing records.
        </p>
        <Button className="mt-4" variant="secondary">Download my data preview</Button>
      </section>
    </div>
  )
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-700">
      {label}
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4" />
    </label>
  )
}
