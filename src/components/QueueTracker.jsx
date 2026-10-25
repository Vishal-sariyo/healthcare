export default function QueueTracker({ appointment }) {
  if (!appointment) return null
  const total = appointment.patientsAhead + 1
  const progress = Math.min(100, Math.round(((total - appointment.patientsAhead) / total) * 100))

  return (
    <section className="rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50 p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Live queue tracker</p>
          <h3 className="mt-1 font-display text-xl font-bold text-slate-900">Your visit is on the way</h3>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">Please wait</span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Your Token" value={appointment.token} emphasize />
        <Stat label="Now Serving" value={appointment.nowServing} />
        <Stat label="Patients Ahead" value={appointment.patientsAhead} />
        <Stat label="Estimated Wait" value={`${appointment.estimatedWait} min`} />
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs font-medium text-slate-500">
          <span>Queue progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-brand-100" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-brand-700 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-600">You will receive a notification when your turn is approaching.</p>
    </section>
  )
}

function Stat({ label, value, emphasize }) {
  return (
    <div className="rounded-xl bg-white p-3 shadow-sm">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`mt-1 font-display text-lg font-bold ${emphasize ? 'text-brand-700' : 'text-slate-900'}`}>{value}</p>
    </div>
  )
}
