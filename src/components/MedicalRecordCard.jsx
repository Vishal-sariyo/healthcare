import { FileText } from 'lucide-react'
import Button from './ui/Button'

export default function MedicalRecordCard({ record, onView }) {
  return (
    <article className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <FileText size={18} />
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-medium text-slate-900">{record.name}</h3>
          <p className="text-sm text-slate-500">
            {record.type} · {record.date}
          </p>
        </div>
      </div>
      <Button size="sm" variant="secondary" onClick={() => onView?.(record)}>
        View
      </Button>
    </article>
  )
}
