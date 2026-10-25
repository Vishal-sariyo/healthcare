import { Bell, CheckCircle2, Info } from 'lucide-react'

const icons = {
  success: CheckCircle2,
  alert: Bell,
  info: Info,
}

export default function NotificationCard({ notification, onRead }) {
  const Icon = icons[notification.type] || Bell
  return (
    <button
      type="button"
      onClick={() => onRead?.(notification.id)}
      className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
        notification.read ? 'border-slate-100 bg-white' : 'border-brand-100 bg-brand-50/60'
      }`}
    >
      <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${notification.read ? 'bg-slate-100 text-slate-500' : 'bg-brand-100 text-brand-700'}`}>
        <Icon size={16} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="font-medium text-slate-900">{notification.title}</span>
          {!notification.read && <span className="h-2 w-2 rounded-full bg-brand-600" aria-label="Unread" />}
        </span>
        <span className="mt-1 block text-sm text-slate-600">{notification.message}</span>
        <span className="mt-2 block text-xs text-slate-400">{notification.time}</span>
      </span>
    </button>
  )
}
