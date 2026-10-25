const styles = {
  Confirmed: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Completed: 'bg-slate-100 text-slate-700 ring-slate-200',
  Cancelled: 'bg-rose-50 text-rose-700 ring-rose-100',
  Pending: 'bg-amber-50 text-amber-700 ring-amber-100',
  Available: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  'Please wait': 'bg-sky-50 text-sky-700 ring-sky-100',
}

export default function StatusBadge({ status, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status] || 'bg-slate-100 text-slate-700 ring-slate-200'} ${className}`}
    >
      {status}
    </span>
  )
}
